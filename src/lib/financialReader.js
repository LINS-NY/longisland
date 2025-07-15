import fs from 'fs';
import path from 'path';
import * as XLSX from 'xlsx';

export async function getFinancialDocs(slug) {
  const [source, year, month] = slug.split('-');
  const base = process.cwd();
  const dirPath = path.join(base, 'data', 'financial-reports', source, year);

  if (!fs.existsSync(dirPath)) {
    throw new Error(`Directory does not exist: ${dirPath}`);
  }

  const files = fs.readdirSync(dirPath);
  const match = files.find(file =>
    file.toLowerCase().includes(`${month.toLowerCase()}-${year}`)
  );

  if (!match) {
    throw new Error(`No matching file found for slug: ${slug}`);
  }

  const filePath = path.join(dirPath, match);

  try {
    const fileBuffer = fs.readFileSync(filePath);
    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });

    const sheets = workbook.SheetNames.map(sheetName => ({
      name: sheetName,
      data: XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: '' }),
    }));

    return { title: match.replace(/\.xlsx$/, ''), sheets };
  } catch (err) {
    throw new Error(`XLSX.readFile failed for: ${filePath}\n${err.message}`);
  }
}




