// pages/api/submitMembership.js
// Increase bodyParser limit so large base64 attachments are not truncated
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '20mb' // adjust if you expect larger payloads
    }
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
   const APPS_SCRIPT_WEBAPP = process.env.APPS_SCRIPT_WEBAPP;

    if (!APPS_SCRIPT_WEBAPP) {
      console.error('Missing NEXT_PUBLIC_APPS_SCRIPT_WEBAPP environment variable');
      return res.status(500).json({ message: 'Missing Apps Script URL' });
    }

    // Basic sanity check
    if (!req.body || typeof req.body !== 'object') {
      console.warn('Proxy received non-JSON or empty body');
      return res.status(400).json({ message: 'Bad request: expected JSON body' });
    }

    // Compact preview of attachments (no full base64 logging)
    try {
      if (Array.isArray(req.body.attachments) && req.body.attachments.length) {
        const preview = req.body.attachments.map((a, i) => ({
          index: i,
          name: a?.name || null,
          mimeType: a?.mimeType || null,
          dataPreviewLength: a?.data ? a.data.length : 0
        }));
        console.log('Proxy attachments preview:', preview);
      } else {
        console.log('Proxy received no attachments');
      }
    } catch (logErr) {
      console.warn('Preview log failed', logErr);
    }

    // Forward the JSON body to Apps Script
    const appsRes = await fetch(APPS_SCRIPT_WEBAPP, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const text = await appsRes.text();
    try {
      const json = JSON.parse(text);
      return res.status(appsRes.status).json(json);
    } catch (e) {
      res.status(appsRes.status).setHeader('Content-Type', 'text/plain; charset=utf-8');
      return res.send(text);
    }
  } catch (err) {
    console.error('Proxy error forwarding to Apps Script:', err);
    return res.status(500).json({ message: 'Proxy error', error: String(err) });
  }
}
