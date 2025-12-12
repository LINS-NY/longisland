import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { components } from './component';
const { google } = require('googleapis');

/* Helpers */
function sanitizeId(id) {
  if (typeof id !== 'string') return id;
  return id.replace(/[\u0000-\u001F\u007F-\u009F]/g, '').trim();
}

function safeString(s) {
  return String(s || '').replace(/[\u0000-\u001F\u007F-\u009F]/g, '');
}

/**
 * Create a GoogleAuth instance that prefers:
 * 1) GOOGLE_APPLICATION_CREDENTIALS (file path) or ADC
 * 2) If a legacy base64 env var exists, decode it (optional)
 *
 * If no credentials are available, this returns null so callers can
 * gracefully skip Google calls during build.
 */
function getGoogleAuthIfAvailable() {
  // Prefer ADC / GOOGLE_APPLICATION_CREDENTIALS (no manual JSON parsing required)
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    return new google.auth.GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/drive.metadata.readonly'],
    });
  }

  // Optional: support legacy base64 env var if still present
  if (process.env.GOOGLE_SERVICE_KEY) {
    try {
      const decoded = Buffer.from(process.env.GOOGLE_SERVICE_KEY, 'base64').toString('utf8');
      const credential = JSON.parse(decoded);
      return new google.auth.GoogleAuth({
        credentials: {
          client_email: credential.client_email,
          private_key: credential.private_key,
        },
        scopes: ['https://www.googleapis.com/auth/drive.metadata.readonly'],
      });
    } catch (err) {
      console.error('Warning: GOOGLE_SERVICE_KEY present but invalid; ignoring it.', err && err.message ? err.message : err);
      return null;
    }
  }

  // No credentials available in environment
  return null;
}

/* Drive / Docs / Sheets helpers */
export async function getAllResourcesID(location) {
  const auth = getGoogleAuthIfAvailable();
  if (!auth) {
    console.warn('getAllResourcesID: no Google credentials available; returning empty list.');
    return [];
  }

  const client = google.drive({ version: 'v3', auth });
  const res = await client.files.list({
    q: `'${location}' in parents and trashed=false`,
  });
  const resourcesRemoved = (res.data.files || []).filter((name) => name.name != 'Resources');
  return resourcesRemoved.map((name) => ({
    params: { documentId: sanitizeId(name.id) },
  }));
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getDocValue(response, title, location, month, year, sheetId, date) {
  let startingPoint = response.filter((name) => response.indexOf(name) > 9);
  const rowRegular = ['Description', 'Invoice Number', 'Income (Cash)', 'Income (Cheque)', 'Expenses'];
  const rowBank = ['Description', 'Begining Balance', 'Deposit', 'Withdraw', 'Ending Balance'];
  const content = startingPoint.map((value) => {
    let totalItems = ['', '', '', '', ''];
    value.map((item, index) => {
      totalItems[index] = item;
    });
    return totalItems;
  });
  return {
    title: title,
    rowHeading: rowRegular,
    content: content,
    location: location,
    balanceHeading: rowBank,
    month: month,
    year: year,
    sheetId: sheetId,
    date: date,
  };
}

export async function getFinancialDocsIN(location) {
  const auth = getGoogleAuthIfAvailable();
  if (!auth) {
    console.warn('getFinancialDocsIN: no Google credentials available; returning empty list.');
    return [];
  }

  const client = google.sheets({ version: 'v4', auth });
  const res = await client.spreadsheets.get({
    spreadsheetId: location,
  });
  const fullTitle = res.data.properties.title || '';
  if (fullTitle.includes('Bank Statement')) {
    const found = fullTitle.match(/^(\w*)\s(\d*)\s.*-\s.*Bank Statement/) || [];
    const month = found[1] || '';
    const year = found[2] || '';
    const sheetsFiltered = (res.data.sheets || []).filter((_, index) => index < 3);
    const totalValue = await Promise.all(
      sheetsFiltered.map(async (item) => {
        const value = await client.spreadsheets.values.get({
          spreadsheetId: location,
          range: `${item.properties.title}!A1:E86`,
        });
        return getDocValue(value.data.values, item.properties.title, location, month, year, item.properties.sheetId, value.headers?.date);
      })
    );
    return totalValue;
  }
  const title = res.data.sheets[0].properties.title;
  const value = await client.spreadsheets.values.get({
    spreadsheetId: location,
    range: `${title}!A1:E86`,
  });

  return getDocValue(value.data.values, title, location, '', '', 0, value.headers?.date);
}

export async function getFinancialDocs(location) {
  const auth = getGoogleAuthIfAvailable();
  if (!auth) {
    console.warn('getFinancialDocs: no Google credentials available; returning empty list.');
    return [];
  }

  const client = google.sheets({ version: 'v4', auth });
  const res = await client.spreadsheets.get({
    spreadsheetId: location,
  });
  const fullTitle = res.data.properties.title || '';
  if (fullTitle.includes('Bank Statement')) {
    const found = fullTitle.match(/^(\w*)\s(\d*)\s.*-\s.*Bank Statement/) || [];
    const month = found[1] || '';
    const year = found[2] || '';
    const sheetsFiltered = (res.data.sheets || []).filter((_, index) => index < 3);
    const totalValue = await Promise.all(
      sheetsFiltered.map(async (item) => {
        const value = await client.spreadsheets.values.get({
          spreadsheetId: location,
          range: `${item.properties.title}!A1:E86`,
        });
        return getDocValue(value.data.values, item.properties.title, location, month, year, item.properties.sheetId, value.headers?.date);
      })
    );
    return totalValue;
  }
  const title = res.data.sheets[0].properties.title;
  const value = await client.spreadsheets.values.get({
    spreadsheetId: location,
    range: `${title}!A1:E86`,
  });

  return getDocValue(value.data.values, title, location, '', '', 0, value.headers?.date);
}

export async function getAllFinances(location) {
  const auth = getGoogleAuthIfAvailable();
  if (!auth) {
    console.warn('getAllFinances: no Google credentials available; returning empty list.');
    return [];
  }

  const client = google.drive({ version: 'v3', auth });
  const res = await client.files.list({
    files: location,
  });
  const resourcesRemoved = (res.data.files || []).filter((name) => name.mimeType == 'application/vnd.google-apps.spreadsheet');
  return resourcesRemoved.map((name) => ({
    params: { documentId: sanitizeId(name.id) },
  }));
}

export async function getAllResources(location) {
  const auth = getGoogleAuthIfAvailable();
  if (!auth) {
    console.warn('getAllResources: no Google credentials available; returning empty list.');
    return [];
  }

  const client = google.drive({ version: 'v3', auth });
  const res = await client.files.list({
    files: location,
  });
  const resourcesRemoved = (res.data.files || []).filter((name) => name.name != 'Resources');
  return resourcesRemoved.map((name) => ({
    params: { id: sanitizeId(name.name.replace(/\.md$/, '')) },
  }));
}

export async function googleDocsGet(id) {
  const auth = getGoogleAuthIfAvailable();
  if (!auth) {
    throw new Error('googleDocsGet: Google credentials not configured in environment.');
  }

  const client = google.docs({ version: 'v1', auth });
  const safeId = sanitizeId(id);

  const res = await client.documents.get({
    documentId: safeId,
  });

  // filter paragraphs and build text safely (sanitize control chars)
  const contents = (res.data.body?.content || []).filter((value) => value.paragraph != undefined);
  const text = contents.reduce((fullContent, value) => {
    const paragraphText = (value.paragraph.elements || []).reduce((joinText, element) => {
      const raw = element?.textRun?.content ?? '';
      const cleaned = safeString(raw);
      return joinText + cleaned;
    }, '');
    return fullContent + paragraphText;
  }, '');

  // parse frontmatter and mdx content
  const { data, content } = matter(String(text));
  const contentRd = <MDXRemote source={content} components={components} />;

  return {
    id: safeId,
    contentRd,
    content,
    ...data,
  };
}
