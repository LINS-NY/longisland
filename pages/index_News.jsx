import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

const NEWS_DIR = path.join(process.cwd(), 'data/news');

export async function getStaticProps() {
  const years = fs.readdirSync(NEWS_DIR);

  const groupedNews = {};

  years.forEach((yearFolder) => {
    const folderPath = path.join(NEWS_DIR, yearFolder);
    const files = fs.readdirSync(folderPath);

    const year = yearFolder.replace(/\s+/g, '');

    const newsItems = files.map((filename) => {
      const slug = filename.replace('.md', '');
      const filePath = path.join(folderPath, filename);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(fileContent);

      return {
        slug,
        title: data.title || 'Untitled',
        description: data.description || '',
        displayDate: data.displayDate || '', // optional human-readable date
        date: data.date || '', // machine-readable
        year,
      };
    });

    // ✅ Sort by machine-readable date (latest first)
    groupedNews[year] = newsItems.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
  });

  // ✅ Sort years descending
  const sortedYears = Object.keys(groupedNews).sort((a, b) => b.localeCompare(a));

  return {
    props: {
      groupedNews,
      sortedYears,
    },
  };
}



export default function Home({ groupedNews, sortedYears }) {
  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Recent News</h1>

      {groupedNews[year].map((news) => (
  <Link key={news.slug} href={`/news/${year}/${news.slug}`}>
    <div className="mb-4 p-4 border rounded-xl shadow hover:shadow-lg transition hover:border-red-400 cursor-pointer bg-white dark:bg-gray-900">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{news.title}</h3>
      <p className="text-sm text-gray-500">{news.displayDate}</p> {/* 👈 use displayDate here */}
      <p className="text-gray-700 dark:text-gray-300">{news.description}</p>
    </div>
  </Link>
))}
    </div>
  );
}

