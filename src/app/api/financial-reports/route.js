import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import AdmZip from 'adm-zip';

export async function GET() {
  const base = process.cwd();
  const reportDir = path.join(base, 'data', 'financial-reports');
  const results = { bank: {}, events: {} };

  try {
    // 1. Get all zip files in the directory
    const zipFiles = fs.readdirSync(reportDir).filter(f => f.endsWith('.zip'));

    zipFiles.forEach(zipFileName => {
      const source = zipFileName.startsWith('bank') ? 'bank' : 'events';
      const zipPath = path.join(reportDir, zipFileName);
      const zip = new AdmZip(zipPath);
      const entries = zip.getEntries();

      entries.forEach(entry => {
        // Skip folders and system files
        if (entry.isDirectory || entry.entryName.includes('__MACOSX')) return;
        if (!entry.entryName.endsWith('.xlsx')) return;

        // Inside the zip, we expect a structure like "2024/January-2024.xlsx"
        const parts = entry.entryName.split('/');
        const year = parts[0]; 
        const filename = parts[parts.length - 1];

        const cleanName = filename.replace('.xlsx', '');
        const nameParts = cleanName.split('-');
        if (nameParts.length < 2) return;

        const month = nameParts[0];

        if (!results[source][year]) {
          results[source][year] = [];
        }

        results[source][year].push({
          title: cleanName.replace(/-/g, ' '),
          month: month,
          year: year,
          slug: `${source}-${year}-${month.toLowerCase()}`
        });
      });
    });
  } catch (error) {
    console.error("Failed to read zips for list:", error);
  }

  return NextResponse.json(results);
}