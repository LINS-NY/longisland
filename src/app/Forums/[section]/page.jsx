'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { db } from '@/firebaseconfig';
import { collection, query, where, orderBy } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import ThreadCard from '@/components/Forums/ThreadCard';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

const SECTION_META = {
  room: {
    label: 'Room Rental',
    emoji: '🏠',
    description: 'Find or offer rooms, sublets, and shared housing.',
  },
  jobs: {
    label: 'Job Search',
    emoji: '💼',
    description: 'Job postings, referrals, and career opportunities.',
  },
  general: {
    label: 'General Information',
    emoji: '📢',
    description: 'Announcements, events, and community updates.',
  },
};

export default function SectionPage() {
  const params = useParams();
  const sectionParam = params?.section || 'room'; // if using dynamic [section]
  const sectionKey = decodeURIComponent(sectionParam);

  const meta = SECTION_META[sectionKey] ?? {
    label: 'Unknown',
    emoji: '❓',
    description: 'This section is not recognized.',
  };

  // Primary query (requires composite index: section + createdAt desc)
  const primaryQuery = query(
    collection(db, 'Forum'),
    where('section', '==', sectionKey),
    orderBy('createdAt', 'desc')
  );

  // Fallback query (no orderBy; we’ll sort client-side)
  const fallbackQuery = query(collection(db, 'Forum'), where('section', '==', sectionKey));

  const [primarySnap, primaryLoading, primaryError] = useCollection(primaryQuery);
  const [fallbackSnap, fallbackLoading] = useCollection(fallbackQuery);

  const usingPrimary = !primaryError && !!primarySnap;
  const rawDocs = usingPrimary ? primarySnap?.docs : fallbackSnap?.docs;

  let posts = rawDocs?.map((d) => ({ id: d.id, ...d.data() })) ?? [];
  if (!usingPrimary && posts.length > 0) {
    posts = posts.sort((a, b) => {
      const ta = a.createdAt?.toMillis?.() ?? 0;
      const tb = b.createdAt?.toMillis?.() ?? 0;
      return tb - ta;
    });
  }

  const loading = usingPrimary ? primaryLoading : fallbackLoading;

  return (
    <div className="min-h-screen bg-gradient-to-br via-indigo-50 to-violet-50">
      <Header />
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-serif font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-700 to-violet-700 ">
            {meta.emoji} {meta.label}
          </h1>
          <div className="flex items-center gap-3">
            <Link href="/Forums" className="text-sm text-blue-600 hover:underline">
              ← Back to Community Forum
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10 space-y-6 ">
        
        <p className="text-sm text-gray-600">{meta.description}</p>

        {loading && <p className="text-gray-600">Loading posts…</p>}

        {!loading && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 border-b-2 border-gray-500 pb-6 mb-6">
            {posts.map((post) => (
              <ThreadCard
                key={post.id}
                id={post.id}
                title={post.title}
                description={post.description}
                creatorName={post.creatorName}
                replies={post.replies ?? 0}
                createdAt={post.createdAt}
              />
            ))}
          </div>
        ) : (
          !loading && (
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <p className="text-gray-600">No posts yet in {meta.label}.</p>
            </div>
          )
        )}
        <Footer />
      </main>
    </div>
  );
}
