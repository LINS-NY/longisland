import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import Image from 'next/image';

const NEWS_DIR = path.join(process.cwd(), 'data/news');

export async function getStaticPaths() {
  const years = fs.readdirSync(NEWS_DIR);

  const paths = years.flatMap((yearFolder) => {
    const files = fs.readdirSync(path.join(NEWS_DIR, yearFolder));
    return files.map((filename) => ({
      params: {
        slug: [yearFolder, filename.replace('.md', '')],
      },
    }));
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const [yearFolder, slug] = params.slug;
  const filePath = path.join(NEWS_DIR, yearFolder, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return { notFound: true };
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  const item = {
    Title: data.title || 'Untitled',
    Description: data.description || '',
    Date: data.date || '',
    imageUrl: data.imageUrl || null,
    contentRd: marked.parse(content),
  };

  return {
    props: { item },
  };
}

export default function NewsPage({ item }) {
  if (!item) return <div className="text-center py-10">No news item found.</div>;

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-gray-900 flex items-center justify-center py-12 px-4">
      <article className="bg-white dark:bg-gray-800 max-w-2xl w-full shadow-xl rounded-xl border border-gray-200 dark:border-gray-700">
        {/* Header Image */}
        {item.imageUrl && (
          <div className="relative w-full h-72 rounded-t-xl overflow-hidden">
            <Image
              src={item.imageUrl}
              alt={item.Title}
              width={350}
              height={350}
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="p-6 md:p-8 font-serif">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gray-800 dark:text-white leading-tight">
            {item.Title}
          </h1>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-6">
            {item.Date}
          </p>
          <div
            className="prose prose-lg prose-neutral dark:prose-invert max-w-none prose-img:rounded-lg prose-a:text-blue-600 dark:prose-a:text-blue-400"
            dangerouslySetInnerHTML={{ __html: item.contentRd }}
          />
        </div>
      </article>
    </div>
  );
}
