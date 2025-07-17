// pages/api/community-files.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const baseDir = path.join(process.cwd(), 'public', 'Community Building Files');

  const readPdfFiles = (folder) => {
    const dirPath = path.join(baseDir, folder);
    if (!fs.existsSync(dirPath)) return [];

    return fs
      .readdirSync(dirPath)
      .filter((file) => file.endsWith('.pdf'))
      .sort((a, b) => b.localeCompare(a)) // Newest first
      .map((file) => ({
        label: file,
        value: `/Community Building Files/${folder}/${file}`,
      }));
  };

  const pptFiles = readPdfFiles('PowerPoint');
  const noteFiles = readPdfFiles('Notes');

  res.status(200).json({ pptFiles, noteFiles });
}
