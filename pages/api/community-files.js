// pages/api/community-files.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  try {
    const baseDir = path.join(process.cwd(), 'public', 'Community-Building-Files');

    const readPdfFiles = (folder) => {
      const dirPath = path.join(baseDir, folder);
      if (!fs.existsSync(dirPath)) return [];

      return fs
        .readdirSync(dirPath)
        .filter((file) => file.toLowerCase().endsWith('.pdf'))
        .sort((a, b) => b.localeCompare(a)) // Sort descending (latest first)
        .map((file) => ({
          label: file,
          value: `/Community-Building-Files/${folder.toLowerCase()}/${file}`
        }));
    };

    const pptFiles = readPdfFiles('PowerPoint');
    const noteFiles = readPdfFiles('Notes');

    res.status(200).json({ pptFiles, noteFiles });
  } catch (error) {
    console.error('Error reading community files:', error);
    res.status(500).json({ error: 'Failed to load community files.' });
  }
}
