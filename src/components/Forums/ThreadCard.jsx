'use client';
import React from 'react';
import Link from 'next/link';

function formatDate(ts) {
  try {
    const date =
      ts && typeof ts.toDate === 'function'
        ? ts.toDate()
        : ts instanceof Date
        ? ts
        : ts
        ? new Date(ts)
        : null;
    if (!date) return '';
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  } catch {
    return '';
  }
}

export default function ThreadCard({ id, title, description, creatorName, replies, createdAt }) {
  return (
    <Link href={`/Forum/${id}`} className="block">
      <article className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{title}</h3>
        <p className="mt-2 text-sm text-gray-600 line-clamp-3">{description}</p>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-600">
          <span>By {creatorName}</span>
          <span>•</span>
          <span>{replies} Replies</span>
          <span>•</span>
          <span>{formatDate(createdAt)}</span>
        </div>
      </article>
    </Link>
  );
}
