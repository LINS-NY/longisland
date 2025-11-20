// src/components/ResourcesList/ResourcesPage.jsx
'use client';

import React, { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';

const ITEMS_PER_PAGE = 9;

export default function ResourcesPage({ localResources = [], externalResources = [], externalNotices = [] }) {
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState('all'); // all | community | utilities | notices
  const [page, setPage] = useState(1);

  // Normalize search string
  const q = (query || '').trim().toLowerCase();

  // Filter local resources by query (title, description, date)
  const filteredLocal = useMemo(() => {
    if (!q) return localResources;
    return localResources.filter((r) => {
      const title = (r.title || '').toLowerCase();
      const desc = (r.description || '').toLowerCase();
      const date = (r.date || '').toLowerCase();
      return title.includes(q) || desc.includes(q) || date.includes(q);
    });
  }, [localResources, q]);

  // Filter external categories by tab + search (uses liveTitle/liveDescription when available)
  const filteredExternal = useMemo(() => {
    const qLocal = q; // reuse normalized query
    let items = externalResources.slice();
    if (tab === 'community') items = items.filter(i => i.group === 'community');
    if (tab === 'utilities') items = items.filter(i => i.group === 'utilities');
    if (qLocal) {
      items = items.filter(i => {
        const title = (i.liveTitle || i.title || '').toLowerCase();
        const excerpt = (i.liveDescription || i.excerpt || '').toLowerCase();
        return title.includes(qLocal) || excerpt.includes(qLocal);
      });
    }
    return items;
  }, [externalResources, tab, q]);

  const totalPages = Math.max(1, Math.ceil(filteredExternal.length / ITEMS_PER_PAGE));
  const pageItems = filteredExternal.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  // Reset page when filters change
  useEffect(() => setPage(1), [query, tab]);

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <header className="mb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900">Resources</h1>
        <p className="text-gray-700 max-w-3xl mt-2">Local resources (below) followed by Town of Oyster Bay categories with live titles and descriptions.</p>

<div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:gap-4">
  <div className="flex gap-2 flex-wrap">
    <button
      onClick={() => setTab('all')}
      aria-pressed={tab === 'all'}
      className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 ${
        tab === 'all'
          ? 'bg-blue-600 text-white shadow'
          : 'bg-white/90 text-gray-800 border border-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700'
      }`}
    >
      All
    </button>

    <button
      onClick={() => setTab('community')}
      aria-pressed={tab === 'community'}
      className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 ${
        tab === 'community'
          ? 'bg-blue-600 text-white shadow'
          : 'bg-white/90 text-gray-800 border border-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700'
      }`}
    >
      Community
    </button>

    <button
      onClick={() => setTab('utilities')}
      aria-pressed={tab === 'utilities'}
      className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 ${
        tab === 'utilities'
          ? 'bg-blue-600 text-white shadow'
          : 'bg-white/90 text-gray-800 border border-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700'
      }`}
    >
      Utilities
    </button>

    <button
      onClick={() => setTab('notices')}
      aria-pressed={tab === 'notices'}
      className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 ${
        tab === 'notices'
          ? 'bg-blue-600 text-white shadow'
          : 'bg-white/90 text-gray-800 border border-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700'
      }`}
    >
      District Notices
    </button>
  </div>

          <div className="mt-3 sm:mt-0 sm:ml-auto max-w-md w-full">
            <div className="relative">
              <input
                aria-label="Search resources"
                placeholder="Search resources by name or description"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {query && <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">Clear</button>}
            </div>
          </div>
        </div>
      </header>

      {/* Local markdown resources (your existing content) */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">Local Resources</h2>

        {filteredLocal.length === 0 ? (
          <div className="rounded-md p-4 bg-white border text-gray-600">No local resources found matching your search</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredLocal.map((r) => (
              <Link key={r.slug} href={`/resources/${r.slug}`}>
                <article className="p-4 rounded-xl border bg-white hover:shadow-md transition-shadow duration-200 cursor-pointer">
                  <h3 className="text-lg font-semibold text-gray-900">{r.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{r.date ? new Date(r.date).toLocaleDateString() : ''}</p>
                  <p className="text-sm text-gray-600 mt-2">{r.description || 'No description provided.'}</p>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>

      <hr className="my-8 border-gray-200" />

      {/* External Oyster Bay categories (with live metadata when available) */}
      {tab !== 'notices' && (
        <>
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">{tab === 'utilities' ? 'Utilities' : 'Community Resources'}</h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pageItems.map((r) => (
                <a key={r.id} href={r.url} target="_blank" rel="noopener noreferrer" className="block p-5 rounded-xl border bg-white hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-900">{r.liveTitle || r.title}</h3>
                  <p className="text-sm text-gray-600 mt-2">{r.liveDescription || r.excerpt || 'Open link for details.'}</p>
                  <div className="mt-4 text-sm text-blue-600 font-medium">Open resource →</div>
                </a>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-gray-600">Showing {filteredExternal.length} resource{filteredExternal.length !== 1 ? 's' : ''}</div>
              <div className="flex items-center gap-2">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} className="px-3 py-1 rounded border" disabled={page === 1}>Prev</button>
                <div className="px-3 py-1 text-sm">Page {page} / {totalPages}</div>
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} className="px-3 py-1 rounded border" disabled={page === totalPages}>Next</button>
              </div>
            </div>
          </section>
        </>
      )}

      {/* District Notices tab */}
      {tab === 'notices' && (
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">District Notices</h2>
          <div className="grid gap-4">
            {externalNotices.map((n) => (
              <a key={n.id} href={n.url} target="_blank" rel="noopener noreferrer" className="block p-4 rounded-lg border bg-white hover:bg-blue-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">{n.liveTitle || n.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{n.liveDescription || n.excerpt}</p>
                  </div>
                  <div className="text-blue-600 text-sm font-medium">Open →</div>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      <footer className="mt-10 text-sm text-gray-500">
        <p>Local resources come from your repository's data/resources/*.md files. External links point to the Town of Oyster Bay site; titles and descriptions are fetched and cached server-side.</p>
      </footer>
    </section>
  );
}
