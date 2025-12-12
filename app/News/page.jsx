import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

export const metadata = {
  title: 'News',
};

export default async function NewsPage() {
  const newsDir = path.join(process.cwd(), 'data/news');
  const years = fs.readdirSync(newsDir);

  const groupedNews = {};

  years.forEach((year) => {
    const files = fs.readdirSync(path.join(newsDir, year));

    const newsItems = files.map((filename) => {
      const filePath = path.join(newsDir, year, filename);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(fileContent);

      return {
        title: data.Title || data.title || 'Untitled',
        description: data.Description || data.description || '',
        date: data.Date || data.date || '',
        displayDate: data.displayDate || data.date || '',
        slug: `/news/${year}/${filename.replace('.md', '')}`,
      };
    });

    groupedNews[year] = newsItems.sort((a, b) => new Date(b.date) - new Date(a.date));
  });

  const sortedYears = Object.keys(groupedNews).sort((a, b) => b.localeCompare(a));

  return (
    <main className="flex flex-col min-h-screen">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-10 text-center text-blue-900">Recent News</h1>

        {sortedYears.map((year) => (
          <div key={year} className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-red border-b border-gray-300 dark:border-gray-600 pb-2">
              {year} News
            </h2>
            {groupedNews[year].map((news, idx) => (
              <Link key={idx} href={news.slug}>
                <div className="mb-6 p-4 border rounded-xl shadow hover:shadow-lg transition hover:border-red-400 cursor-pointer bg-white dark:bg-gray-900">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {news.title}
                  </h3>
                  <p className="text-sm text-gray-500">{news.displayDate}</p>
                  <p className="text-gray-700 dark:text-gray-300">{news.description}</p>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>

      <Footer />
    </main>
  );
}
