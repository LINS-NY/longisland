// pages/api/gallery.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  try {
    const { year } = req.query;
    if (!year) return res.status(400).json({ images: [] });

    const dir = path.join(process.cwd(), 'public', 'images', String(year), 'NepaliBhasaClass');
    if (!fs.existsSync(dir)) return res.status(200).json({ images: [] });

    const files = fs.readdirSync(dir)
      .filter(f => /\.(jpe?g|png|webp|gif|avif|svg)$/i.test(f))
      .sort((a,b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

    const images = files.map(f => `/images/${year}/NepaliBhasaClass/${encodeURIComponent(f)}`);
    return res.status(200).json({ images });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ images: [] });
  }
}
