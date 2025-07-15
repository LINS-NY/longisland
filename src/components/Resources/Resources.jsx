import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

const resourcesDirectory = path.join(process.cwd(), 'data/resources');

export default function Resources() {
  const files = fs.readdirSync(resourcesDirectory).filter(file => file.endsWith('.md'));

  const resources = files.map(file => {
    const filePath = path.join(resourcesDirectory, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);
    return {
      slug: file.replace(/\.md$/, ''),
      title: data.title || file.replace(/\.md$/, ''),
      description: data.description || '',
      date: data.date || '',
    };
  });

  const sortedResources = resources.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-pale-yellow">Resources</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sortedResources.map(resource => (
          <Link key={resource.slug} href={`/resources/${resource.slug}`}>
            <article className="p-5 rounded-xl border bg-white dark:bg-gray-800 dark:border-gray-600 shadow hover:shadow-md transition-shadow duration-300">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
                {resource.title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                {resource.date ? new Date(resource.date).toLocaleDateString() : ''}
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {resource.description || 'No description provided.'}
              </p>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
