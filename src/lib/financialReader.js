import * as XLSX from 'xlsx';

const API_KEY = 'AIzaSyCOwQ3p3TqilNzPEDWWcMGaOUuARD_be0k';

export async function getFinancialDocs(slug) {
  // Slug format: source_fileId
  const [source, fileId] = slug.split('_');

  const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${API_KEY}`;
  
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch file from Drive');

  const arrayBuffer = await response.arrayBuffer();
  const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' });

  const sheets = workbook.SheetNames.map(sheetName => ({
    name: sheetName,
    data: XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: '' }),
  }));

  // Get filename for the title
  const metaUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?key=${API_KEY}`;
  const metaRes = await fetch(metaUrl);
  const metaData = await metaRes.json();

  return { 
    title: metaData.name.replace('.xlsx', ''), 
    sheets 
  };
}