import * as React from 'react';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';

export default async function IndividualItem({ items }) {
  const mdxContent = await renderMdx(items.content);

  return (
    <article className="flex flex-col justify-between gap-3 border rounded-xl shadow-sm bg-white dark:bg-gray-800 dark:border-gray-600 hover:shadow-md transition-shadow duration-300">
      <Link href={`/resources/${encodeURIComponent(items.id)}`} className="flex flex-col h-full p-4">
        <header className="mb-2">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">{items.Title}</h2>
        </header>

        <div className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
          {mdxContent}
        </div>

        <footer className="mt-auto flex justify-between items-center text-xs text-gray-400 dark:text-gray-500">
          <span>LINS</span>
          <time>{items.Date}</time>
        </footer>
      </Link>
    </article>
  );
}

async function renderMdx(source) {
  return <MDXRemote source={source} />;
}
