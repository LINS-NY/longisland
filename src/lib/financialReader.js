import path from 'path';
import AdmZip from 'adm-zip';
import * as XLSX from 'xlsx';
import fs from 'fs';

export async function getFinancialDocs(slug) {
  const [source, year, month] = slug.split('-');
  const base = process.cwd();
  const reportDir = path.join(base, 'data', 'financial-reports');

  // 1. Find all zip files that start with "bank" or "events"
  const zipFiles = fs.readdirSync(reportDir).filter(f => 
    f.startsWith(source) && f.endsWith('.zip')
  );

  let match = null;
  let activeZip = null;

  try {
    // 2. Loop through all zips (e.g., bank-2023.zip, bank-2024.zip) to find the file
    for (const file of zipFiles) {
      const tempZip = new AdmZip(path.join(reportDir, file));
      const entries = tempZip.getEntries();
      
      const found = entries.find(entry => {
        const entryPath = entry.entryName.toLowerCase();
        return !entry.isDirectory && 
               entryPath.includes(month.toLowerCase()) && 
               entryPath.includes(year.toLowerCase());
      });

      if (found) {
        match = found;
        activeZip = tempZip;
        break; // Stop looking once we find the right file
      }
    }

    if (!match || !activeZip) {
      throw new Error(`No matching file found for: ${slug}`);
    }

    // 3. Read the file buffer directly from the zip we found
    const fileBuffer = match.getData();
    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });

    const sheets = workbook.SheetNames.map(sheetName => ({
      name: sheetName,
      data: XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: '' }),
    }));

    return { 
      title: match.name.replace(/\.xlsx$/, ''), 
      sheets 
    };
    
  } catch (err) {
    throw new Error(`Failed to process zip for ${slug}: ${err.message}`);
  }
}