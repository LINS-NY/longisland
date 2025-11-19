'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { auth, db } from '@/firebaseconfig'; // switched to alias for reliability
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, query, orderBy, limit, where } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import LogOut from '@/components/Forums/LogOut';
import Login from '@/components/Forums/Login';
import ThreadCard from '@/components/Forums/ThreadCard';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

const sections = [
  { key: 'room', label: 'Room Rental', emoji: '🏠', description: 'Find or offer rooms, sublets, and shared housing.' },
  { key: 'jobs', label: 'Job Search', emoji: '💼', description: 'Job postings, referrals, and career opportunities.' },
  { key: 'general', label: 'General Information', emoji: '📢', description: 'Announcements, events, and community updates.' },
];

const DISPLAY_LIMIT = 5;

export default function ForumsHome() {
  const [user] = useAuthState(auth);

  // Primary queries (require composite index: section + createdAt desc)
  const primaryQueries = useMemo(() => {
    return sections.map((s) =>
      query(
        collection(db, 'Forum'),
        where('section', '==', s.key),
        orderBy('createdAt', 'desc'),
        limit(DISPLAY_LIMIT)
      )
    );
  }, []);

  // Fallback queries (no orderBy → no index needed; we’ll sort client-side)
  const fallbackQueries = useMemo(() => {
    return sections.map((s) =>
      query(
        collection(db, 'Forum'),
        where('section', '==', s.key),
        limit(DISPLAY_LIMIT * 2) // fetch a few more, then slice after sorting
      )
    );
  }, []);

  // Run hooks for each section
  const primarySnaps = primaryQueries.map((q) => useCollection(q));   // [snapshot, loading, error]
  const fallbackSnaps = fallbackQueries.map((q) => useCollection(q)); // [snapshot, loading, error]

  // Build per-section data, using primary if no error; otherwise fallback and sort locally
  const dataBySection = sections.map((_, i) => {
    const [pSnap, pLoading, pError] = primarySnaps[i];
    const [fSnap] = fallbackSnaps[i];

    const usePrimary = !pError && !!pSnap; // if primary errors (index missing), use fallback
    const docs = usePrimary ? pSnap?.docs : fSnap?.docs;

    let posts = docs?.map((d) => ({ id: d.id, ...d.data() })) ?? [];

    if (!usePrimary && posts.length > 0) {
      // Client-side sort by createdAt desc and slice to DISPLAY_LIMIT
      posts = posts
        .sort((a, b) => {
          const ta = a.createdAt?.toMillis?.() ?? 0;
          const tb = b.createdAt?.toMillis?.() ?? 0;
          return tb - ta;
        })
        .slice(0, DISPLAY_LIMIT);
    }

    return posts;
  });

  return (    
    <div className="min-h-screen bg-gradient-to-br via-indigo-50 to-violet-50">
      <Header />
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-serif font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-700 to-violet-700">
            Community Forum
          </h1>
          <div className="flex items-center gap-3">
            {user ? <LogOut /> : <Login />}

            {user?.email ? (
              <Link
                href={`/Forums/user/${encodeURIComponent(user.email)}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow hover:opacity-90 transition"
              >
                ✍️ Create post
              </Link>
            ) : (
              <Link
                href="/Forums/Create"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow hover:opacity-90 transition"
              >
                ✍️ Create post
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10 space-y-12">
        
        {sections.map((s, idx) => {
          const threads = dataBySection[idx];

          return (
            <section key={s.key} id={s.key} className="bg-white rounded-xl shadow-sm border border-gray-100 border-b-2 border-gray-500">
              <div className="p-6 border-b">
                <h2 className="text-xl md:text-2xl font-bold text-blue-800 ">
                  {s.emoji} {s.label}
                </h2>
                <p className="text-sm text-gray-600 mt-1 ">{s.description}</p>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                {(threads ?? []).map((t) => (
                  <ThreadCard
                    key={t.id}
                    id={t.id}
                    title={t.title}
                    description={t.description}
                    creatorName={t.creatorName}
                    replies={t.replies ?? 0}
                    createdAt={t.createdAt}
                  />
                ))}

                {(!threads || threads.length === 0) && (
                  <p className="text-gray-600">
                    No posts yet. Be the first to start a conversation.
                  </p>
                )}
              </div>

              <div className="px-6 pb-6 flex items-center justify-between">
                <Link
                  href={`/Forums/${s.key}`}
                  className="text-blue-600 font-medium hover:underline"
                >
                  View all posts in {s.label} →
                </Link>
                <button
                  type="button"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-gray-500 hover:text-blue-600 text-sm"
                >
                  ↑ Back to Top
                </button>
              </div>
            </section>
          );
        })}
        <Footer />
      </main>
    </div>
  );
}
