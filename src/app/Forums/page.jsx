'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { auth, db } from '@/firebaseconfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
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

// normalize timestamp to milliseconds (robust to different shapes)
function createdAtToMs(docSnap, data) {
  if (data?.createdAt?.toMillis) return data.createdAt.toMillis();
  if (typeof data?.createdAt?.seconds === 'number') {
    return data.createdAt.seconds * 1000 + Math.floor((data.createdAt.nanoseconds || 0) / 1e6);
  }
  if (typeof data?.createdAt?._seconds === 'number') {
    return data.createdAt._seconds * 1000 + Math.floor((data.createdAt._nanoseconds || 0) / 1e6);
  }
  try {
    const ct = docSnap?.createTime || docSnap?.metadata?.createTime;
    if (ct) return new Date(ct).getTime();
  } catch {}
  if (typeof data?.createdAt === 'number') return data.createdAt;
  if (typeof data?.createdAt === 'string') {
    const t = Date.parse(data.createdAt);
    if (!isNaN(t)) return t;
  }
  return 0;
}

export default function ForumsHome() {
  const [user] = useAuthState(auth);

  // Build queries (top-level, deterministic)
  const roomQuery = useMemo(
    () =>
      query(
        collection(db, 'Forum'),
        where('section', '==', 'room'),
        orderBy('createdAt', 'desc'),
        limit(DISPLAY_LIMIT)
      ),
    []
  );

  const jobsQuery = useMemo(
    () =>
      query(
        collection(db, 'Forum'),
        where('section', '==', 'jobs'),
        orderBy('createdAt', 'desc'),
        limit(DISPLAY_LIMIT)
      ),
    []
  );

  const generalQuery = useMemo(
    () =>
      query(
        collection(db, 'Forum'),
        where('section', '==', 'general'),
        orderBy('createdAt', 'desc'),
        limit(DISPLAY_LIMIT)
      ),
    []
  );

  // Call hooks at top-level for each section
  const [roomSnap, roomLoading, roomError] = useCollection(roomQuery);
  const [jobsSnap, jobsLoading, jobsError] = useCollection(jobsQuery);
  const [generalSnap, generalLoading, generalError] = useCollection(generalQuery);

  // Local state for fallback / normalized data
  const [roomPosts, setRoomPosts] = useState([]);
  const [jobsPosts, setJobsPosts] = useState([]);
  const [generalPosts, setGeneralPosts] = useState([]);

  // helper to convert doc snapshot -> plain object with normalized _createdAtMs
  const mapDocSnap = (docSnap) => {
    const data = docSnap.data();
    const ms = createdAtToMs(docSnap, data);
    return { id: docSnap.id, _createdAtMs: ms, ...data };
  };

  // Fallback fetch + normalize function (runs if primary ordered query missing/empty)
  const runFallback = async (sectionKey, setPosts) => {
    try {
      // fallback query: no orderBy to avoid index requirement; fetch more and sort client-side
      const fallbackQ = query(collection(db, 'Forum'), where('section', '==', sectionKey), limit(DISPLAY_LIMIT * 5));
      const snap = await getDocs(fallbackQ);
      const docs = snap.docs.map(mapDocSnap);
      docs.sort((a, b) => b._createdAtMs - a._createdAtMs);
      setPosts(docs.slice(0, DISPLAY_LIMIT));
    } catch (err) {
      console.error('Fallback fetch error for', sectionKey, err);
      setPosts([]);
    }
  };

  // Populate roomPosts (use server-sorted snap when available, otherwise fallback)
  useEffect(() => {
    if (roomError) {
      runFallback('room', setRoomPosts);
      return;
    }
    if (roomSnap && roomSnap.docs.length > 0) {
      setRoomPosts(roomSnap.docs.map(mapDocSnap));
      return;
    }
    // roomSnap exists but empty -> try fallback to catch docs without createdAt or indexing differences
    runFallback('room', setRoomPosts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomSnap, roomError]);

  // Populate jobsPosts
  useEffect(() => {
    if (jobsError) {
      runFallback('jobs', setJobsPosts);
      return;
    }
    if (jobsSnap && jobsSnap.docs.length > 0) {
      setJobsPosts(jobsSnap.docs.map(mapDocSnap));
      return;
    }
    runFallback('jobs', setJobsPosts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobsSnap, jobsError]);

  // Populate generalPosts
  useEffect(() => {
    if (generalError) {
      runFallback('general', setGeneralPosts);
      return;
    }
    if (generalSnap && generalSnap.docs.length > 0) {
      setGeneralPosts(generalSnap.docs.map(mapDocSnap));
      return;
    }
    runFallback('general', setGeneralPosts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generalSnap, generalError]);

  const dataBySection = [roomPosts, jobsPosts, generalPosts];
  const loadingAll = roomLoading || jobsLoading || generalLoading;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-violet-50">      
    <Header />
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-serif font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-700 to-violet-700">
            Community Forum
          </h1>
          <div className="flex items-center gap-3">
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
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10 space-y-12">
        {sections.map((s, idx) => {
          const threads = dataBySection[idx] ?? [];
          return (
            <section key={s.key} id={s.key} className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b">
                <h2 className="text-xl md:text-2xl font-bold text-blue-800">
                  {s.emoji} {s.label}
                </h2>
                <p className="text-sm text-gray-600 mt-1">{s.description}</p>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 border-b border-gray-200 pb-6 mb-6">
                {loadingAll && threads.length === 0 ? (
                  <p className="text-gray-600">Loading posts…</p>
                ) : (
                  threads.map((t) => (
                    <ThreadCard
                      key={t.id}
                      id={t.id}
                      title={t.title}
                      description={t.description}
                      creatorName={t.creatorName}
                      replies={t.replies ?? 0}
                      createdAt={t.createdAt}
                    />
                  ))
                )}

                {(!threads || threads.length === 0) && !loadingAll && (
                  <p className="text-gray-600">No posts yet. Be the first to start a conversation.</p>
                )}
              </div>

              <div className="px-6 pb-6 flex items-center justify-between">
                <Link href={`/Forums/${s.key}`} className="text-blue-600 font-medium hover:underline">
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
