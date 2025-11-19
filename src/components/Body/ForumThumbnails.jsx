'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '@/firebaseconfig'; // adjust if you use a relative path

export default function ForumThumbnails() {
  const DISPLAY_LIMIT = 1;

  // helper: build primary (ordered) query and fallback (no orderBy)
  const makeQueries = (sectionKey) => {
    const primary = query(
      collection(db, 'Forum'),
      where('section', '==', sectionKey),
      orderBy('createdAt', 'desc'),
      limit(DISPLAY_LIMIT)
    );

    const fallback = query(
      collection(db, 'Forum'),
      where('section', '==', sectionKey),
      limit(DISPLAY_LIMIT * 5)
    );

    return { primary, fallback };
  };

  const roomQ = useMemo(() => makeQueries('room'), []);
  const jobsQ = useMemo(() => makeQueries('jobs'), []);

  // useCollection for primary queries (fast when indices exist)
  const [roomPrimarySnap, roomPrimaryLoading, roomPrimaryError] = useCollection(roomQ.primary);
  const [jobsPrimarySnap, jobsPrimaryLoading, jobsPrimaryError] = useCollection(jobsQ.primary);

  // local state to hold final posts after fallback logic
  const [roomPost, setRoomPost] = useState(null);
  const [jobPost, setJobPost] = useState(null);

  // utility: safe map doc -> plain object
  const mapDoc = (d) => ({ id: d.id, ...d.data() });

  // client-side sort helper
  const sortByCreatedAtDesc = (arr) =>
    arr
      .map((p) => {
        // try to normalize timestamp to milliseconds
        const ms = p.createdAt?.toMillis?.() ?? (typeof p.createdAt === 'number' ? p.createdAt : null);
        return { ...p, _ts: ms ?? 0 };
      })
      .sort((a, b) => b._ts - a._ts);

  // fallback fetcher: runs when primary is missing/errored/empty
  const runFallbackIfNeeded = async (sectionKey, primarySnap, primaryError, setPost) => {
    try {
      // if primary has docs, use that
      if (!primaryError && primarySnap && primarySnap.docs && primarySnap.docs.length > 0) {
        const doc = primarySnap.docs[0];
        setPost(mapDoc(doc));
        return;
      }

      // otherwise run fallback getDocs and sort client-side
      const { fallback } = makeQueries(sectionKey);
      const snap = await getDocs(fallback);
      const docs = snap.docs.map(mapDoc);

      // debug: log useful info so you can inspect mismatches
      console.debug(`[ForumThumbnails][${sectionKey}] fallback fetched ${docs.length} docs`);
      docs.forEach((d) => {
        console.debug(`[ForumThumbnails][${sectionKey}] doc id=${d.id} section='${d.section}' createdAt=`, d.createdAt);
      });

      if (docs.length === 0) {
        setPost(null);
        return;
      }

      const sorted = sortByCreatedAtDesc(docs);
      setPost(sorted[0]);
    } catch (err) {
      console.error(`[ForumThumbnails] fallback error for ${sectionKey}:`, err);
      setPost(null);
    }
  };

  // Effect: try for room
  useEffect(() => {
    runFallbackIfNeeded('room', roomPrimarySnap, roomPrimaryError, setRoomPost);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomPrimarySnap, roomPrimaryError]);

  // Effect: try for jobs
  useEffect(() => {
    runFallbackIfNeeded('jobs', jobsPrimarySnap, jobsPrimaryError, setJobPost);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobsPrimarySnap, jobsPrimaryError]);

  const excerpt = (text = '', n = 120) =>
    String(text || '').length > n ? String(text).slice(0, n).trim() + '…' : String(text || '');

  const formatDate = (ts) => {
    try {
      if (!ts) return '';
      const d = ts?.toDate ? ts.toDate() : (ts?.toMillis ? new Date(ts.toMillis()) : new Date(ts));
      return d.toLocaleDateString();
    } catch {
      return '';
    }
  };

  return (
    <section className="container mx-auto w-[90%] my-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Room thumbnail */}
        <Link href="/Forums/room" className="group">
          <article className="relative overflow-hidden rounded-2xl border border-gray-300 bg-white shadow hover:shadow-lg transition p-5 h-full flex flex-col">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 text-white flex items-center justify-center text-xl font-bold">
                🏠
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-blue-800 group-hover:underline">Room Rental</h3>
                <p className="text-sm text-gray-500 mt-1">Latest listing in Room Rental</p>
              </div>
            </div>

            <div className="mt-4 flex-1">
              {roomPost ? (
                <>
                  <h4 className="text-md font-semibold text-gray-800">{roomPost.title}</h4>
                  <p className="text-sm text-gray-700 mt-2">{excerpt(roomPost.description)}</p>
                </>
              ) : (
                <p className="text-sm text-gray-600">No recent room listings.</p>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
              <div>{roomPost?.firstName ? roomPost.firstName : roomPost?.creatorName ?? '—'}</div>
              <div>{formatDate(roomPost?.createdAt)}</div>
            </div>

            <div className="mt-4">
              <span className="inline-block text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-700">
                View all Room posts →
              </span>
            </div>
          </article>
        </Link>

        {/* Job thumbnail */}
        <Link href="/Forums/jobs" className="group">
          <article className="relative overflow-hidden rounded-2xl border border-gray-300 bg-white shadow hover:shadow-lg transition p-5 h-full flex flex-col">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-400 text-white flex items-center justify-center text-xl font-bold">
                💼
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-blue-800 group-hover:underline">Job Search</h3>
                <p className="text-sm text-gray-500 mt-1">Latest job posting</p>
              </div>
            </div>

            <div className="mt-4 flex-1">
              {jobPost ? (
                <>
                  <h4 className="text-md font-semibold text-gray-800">{jobPost.title}</h4>
                  <p className="text-sm text-gray-700 mt-2">{excerpt(jobPost.description)}</p>
                </>
              ) : (
                <p className="text-sm text-gray-600">No recent job posts.</p>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
              <div>{jobPost?.firstName ? jobPost.firstName : jobPost?.creatorName ?? '—'}</div>
              <div>{formatDate(jobPost?.createdAt)}</div>
            </div>

            <div className="mt-4">
              <span className="inline-block text-xs px-3 py-1 rounded-full bg-green-50 text-green-700">
                View all Job posts →
              </span>
            </div>
          </article>
        </Link>
      </div>
    </section>
  );
}
