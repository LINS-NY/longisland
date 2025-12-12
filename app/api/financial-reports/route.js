import fs from 'fs';
import path from 'path';

// Capitalize month for filename reconstruction later
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function parseFileInfo(fileName, source, year) {
  const cleanName = fileName.replace(/\.xlsx$/, '');
  const parts = cleanName.split('-');

  if (parts.length < 2) return null;

  const month = parts[0];
  return {
    title: cleanName.replace(/-/g, ' '),
    month,
    year,
    slug: `${source}-${year}-${month.toLowerCase()}`, // ✅ Include source
    path: path.join(source, year, fileName), // e.g. "bank/2025/February-2025.xlsx"
  };
}

function readReportsFromDir(baseDir, source) {
  const results = {};

  if (!fs.existsSync(baseDir)) return results;

  const years = fs.readdirSync(baseDir);
  for (const year of years) {
    const yearPath = path.join(baseDir, year);
    if (!fs.lstatSync(yearPath).isDirectory()) continue;

    const files = fs.readdirSync(yearPath).filter(f => f.endsWith('.xlsx'));

    const parsed = files.map((fileName) => {
      const cleanName = fileName.replace(/\.xlsx$/, '');
      const parts = cleanName.split('-');

      if (parts.length < 2) return null;

      const month = parts[0];
      const yearPart = parts[1];

      return {
        title: cleanName.replace(/-/g, ' '),
        month,
        year: yearPart,
        slug: `${source}-${yearPart}-${month.toLowerCase()}`,
        path: `${year}/${fileName}`,
      };
    }).filter(Boolean);

    if (parsed.length) {
      results[year] = parsed;
    }
  }

  return results;
}


export async function GET() {
  const base = process.cwd();
  const bankPath = path.join(base, 'data', 'financial-reports', 'bank');
  const eventsPath = path.join(base, 'data', 'financial-reports', 'events');

  const bank = readReportsFromDir(bankPath, 'bank');
  const events = readReportsFromDir(eventsPath, 'events');

  return new Response(JSON.stringify({ bank, events }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
