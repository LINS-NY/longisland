import { NextResponse } from 'next/server';

const API_KEY = 'AIzaSyCOwQ3p3TqilNzPEDWWcMGaOUuARD_be0k';

// We put the IDs in lists so we can add more years easily in the future
const BANK_FOLDERS = [
  '107y4WqVvlu_N7v0n725kAW4ezBHW_AiV', // 2024
  '160KkAPVH2Bpyi5PrswqFA7H0Rdg9xLs1',  // 2025
  '1kCAyDjNbeO6OlDLlDMOUe2MvTnDwu_xT'  // 2026
];

const EVENT_FOLDERS = [
  '1e6lY1NgWP6FaGKKKuksXVu9SjKErkcki', // 2024
  '1VgLfFKdlTcR7rSpgevnOru51JQFLvf8Z',  // 2025
  '14B12ttCJx4MUn2Calp74zbYuqiCZ-pVj'  // 2026
];

async function fetchFilesFromDrive(folderId) {
  const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+trashed=false&fields=files(id,name)&key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.files || [];
}

export async function GET() {
  const results = { bank: {}, events: {} };

  try {
    // 1. Process Bank Folders
    for (const folderId of BANK_FOLDERS) {
      const files = await fetchFilesFromDrive(folderId);
      processFiles(files, 'bank', results);
    }

    // 2. Process Event Folders
    for (const folderId of EVENT_FOLDERS) {
      const files = await fetchFilesFromDrive(folderId);
      processFiles(files, 'events', results);
    }

  } catch (error) {
    console.error("Drive Fetch Error:", error);
  }

  return NextResponse.json(results);
}

function processFiles(files, source, results) {
  files.forEach(file => {
    if (!file.name.endsWith('.xlsx')) return;

    const cleanName = file.name.replace('.xlsx', '');
    const parts = cleanName.split('-');
    
    // Fallback if filename isn't perfect
    const month = parts[0] || 'Report';
    const year = parts[1] || 'Other';

    if (!results[source][year]) {
      results[source][year] = [];
    }

    results[source][year].push({
      title: cleanName.replace(/-/g, ' '),
      month: month,
      year: year,
      slug: `${source}_${file.id}` 
    });
  });
}