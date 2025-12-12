// src/app/resources/page.jsx
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ResourcesPage from '@/components/ResourcesList/ResourcesPage';
import { decode } from 'html-entities';

// static lists (categories + district notices)
const RESOURCE_CATEGORIES = [
  { id: 'chambers', title: 'Chambers and Civics', url: 'https://oysterbaytown.com/community-resources/chambers-and-civics/', excerpt: 'Local chambers of commerce and civic groups.', group: 'community' },
  { id: 'centers', title: 'Community Centers', url: 'https://oysterbaytown.com/community-resources/community-centers/', excerpt: 'Town-run community and recreation centers.', group: 'community' },
  { id: 'fire', title: 'Fire Departments and Companies', url: 'https://oysterbaytown.com/community-resources/fire-departments-and-companies/', excerpt: 'Volunteer and career fire companies serving Oyster Bay.', group: 'community' },
  { id: 'govlinks', title: 'Helpful Government Links', url: 'https://oysterbaytown.com/community-resources/helpful-links/', excerpt: 'Key government links and services.', group: 'community' },
  { id: 'hospitals', title: 'Hospitals', url: 'https://oysterbaytown.com/community-resources/hospitals/', excerpt: 'Nearby hospitals and urgent care resources.', group: 'community' },
  { id: 'villages', title: 'Incorporated Villages and Areas', url: 'https://oysterbaytown.com/community-resources/incorporated-villages-unincorporated-areas/', excerpt: 'Incorporated villages and unincorporated neighborhoods.', group: 'community' },
  { id: 'libraries', title: 'Libraries', url: 'https://oysterbaytown.com/community-resources/libraries/', excerpt: 'Local public library branches and services.', group: 'community' },
  { id: 'police', title: 'Police Precincts and Departments', url: 'https://oysterbaytown.com/community-resources/police-precincts-departments/', excerpt: 'Precincts, non-emergency numbers, and resources.', group: 'community' },
  { id: 'schools', title: 'School Districts', url: 'https://oysterbaytown.com/community-resources/school-districts/', excerpt: 'School districts serving the Town of Oyster Bay.', group: 'community' },
  { id: 'scouting', title: 'Scouting', url: 'https://oysterbaytown.com/community-resources/scouting/', excerpt: 'Boy Scouts, Girl Scouts and youth scouting contacts.', group: 'community' },
  { id: 'utilities', title: 'Utility Companies', url: 'https://oysterbaytown.com/community-resources/utility-companies/', excerpt: 'Electric, gas and communications providers.', group: 'utilities' },
  { id: 'water', title: 'Water Districts and Companies', url: 'https://oysterbaytown.com/community-resources/water-districts-companies/', excerpt: 'Water providers and district contacts.', group: 'utilities' }
];

const DISTRICT_NOTICES = [
  { id: 'fire-notices', title: 'Fire District Notices', url: 'https://oysterbaytown.com/community-resources/fire-district-notices/', excerpt: 'Notices from local fire districts.' },
  { id: 'sanitation-notices', title: 'Sanitation District Notices', url: 'https://oysterbaytown.com/community-resources/sanitation-district-notices/', excerpt: 'Sanitation district schedules and notices.' },
  { id: 'sewer-notices', title: 'Sewer District Notices', url: 'https://oysterbaytown.com/community-resources/sewer-district-notices/', excerpt: 'Sewer district announcements and hearings.' },
  { id: 'water-notices', title: 'Water District Notices', url: 'https://oysterbaytown.com/community-resources/water-district-notices/', excerpt: 'Water district bulletins and outages.' }
];

// possible local resource folders
const possiblePaths = [
  path.join(process.cwd(), 'data', 'resources'),
  path.join(process.cwd(), 'src', 'data', 'resources'),
  path.join(process.cwd(), 'src', 'app', 'data', 'resources')
];

function findResourcesDir() {
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

// Helper: strip known site suffixes
function stripSiteSuffix(title) {
  if (!title) return title;
  return title.replace(/\s*[-–—:·|]\s*Town of Oyster Bay$/i, '').trim();
}

// Helper: decode and normalize text
function normalizeAndDecode(raw) {
  if (!raw) return null;
  let decoded = decode(raw);
  decoded = decoded.replace(/[\u0000-\u001F\u007F-\u009F]/g, ''); // remove control chars
  decoded = decoded.replace(/\s+/g, ' ').trim(); // normalize whitespace
  decoded = stripSiteSuffix(decoded);
  if (decoded.length > 140) decoded = decoded.slice(0, 137).trim() + '...';
  return decoded || null;
}

// Extract <title> and meta description (simple regex)
function extractMeta(html) {
  if (!html) return { title: null, description: null };
  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  const rawTitle = titleMatch ? titleMatch[1].trim() : null;

  let desc = null;
  const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i);
  if (descMatch && descMatch[1]) desc = descMatch[1].trim();
  else {
    const ogMatch = html.match(/<meta[^>]+property=["']og:description["'][^>]*content=["']([^"']*)["'][^>]*>/i);
    if (ogMatch && ogMatch[1]) desc = ogMatch[1].trim();
  }

  return {
    title: normalizeAndDecode(rawTitle),
    description: desc ? normalizeAndDecode(desc) : null
  };
}

async function fetchMetadata(url) {
  try {
    const res = await fetch(url, { next: { revalidate: 86400 }, headers: { 'User-Agent': 'LINS-ResourcesBot/1.0' } });
    if (!res.ok) return null;
    const text = await res.text();
    return extractMeta(text);
  } catch (err) {
    console.error('fetchMetadata failed for', url, err);
    return null;
  }
}

export default async function Page() {
  const resourcesDirectory = findResourcesDir();

  // Read local markdown resources
  let localResources = [];
  if (resourcesDirectory) {
    try {
      const files = fs.readdirSync(resourcesDirectory).filter((f) => f.endsWith('.md'));
      localResources = files.map((file) => {
        const raw = fs.readFileSync(path.join(resourcesDirectory, file), 'utf8');
        const { data } = matter(raw);
        return {
          slug: file.replace(/\.md$/, ''),
          title: data.title || file.replace(/\.md$/, ''),
          date: data.date || '',
          description: data.description || ''
        };
      }).sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
    } catch (err) {
      console.error('Error reading local resources:', err);
      localResources = [];
    }
  } else {
    console.warn('Resources directory not found. Checked:', possiblePaths);
  }

  // Fetch external metadata in parallel, fallback to static excerpts if fetch fails
  const combinedExternal = [...RESOURCE_CATEGORIES, ...DISTRICT_NOTICES];
  const fetchPromises = combinedExternal.map(async (item) => {
    const meta = await fetchMetadata(item.url);
    return { ...item, liveTitle: meta?.title || null, liveDescription: meta?.description || null };
  });

  let externalWithMeta = [];
  try {
    externalWithMeta = await Promise.all(fetchPromises);
  } catch (err) {
    console.error('Error fetching external metadata, falling back to static list:', err);
    externalWithMeta = combinedExternal.map(i => ({ ...i, liveTitle: null, liveDescription: null }));
  }

  const externalResources = externalWithMeta.filter(i => i.group);
  const externalNotices = externalWithMeta.filter(i => !i.group);

  // Debug log
  console.log('localResources:', localResources.length, 'externalResources:', externalResources.length, 'externalNotices:', externalNotices.length);

  return (
    <div className="min-h-screen bg-gradient-to-br via-indigo-50 to-violet-50">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <ResourcesPage
          localResources={localResources}
          externalResources={externalResources}
          externalNotices={externalNotices}
        />
      </main>
      <Footer />
    </div>
  );
}
