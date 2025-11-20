'use client';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { auth, db } from '@/firebaseconfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  getDocs,
  deleteDoc,
  doc
} from 'firebase/firestore';
import ThreadCard from '@/components/Forums/ThreadCard';
import Link from 'next/link';

/**
 * UserPostsPage (reliable)
 *
 * - Uses onSnapshot wrapped in try/catch to capture realtime query errors (indexes/permissions)
 * - Falls back to getDocs(no orderBy) and sorts client-side when realtime fails
 * - Shows clear error message and console.error with Firestore error object (copy that into Firebase console to create index)
 * - Delete button only shown to authenticated owner (checks uid then email)
 */

export default function UserPostsPage() {
  const { email: emailParam } = useParams();
  const decodedEmail = (() => {
    try {
      return emailParam ? decodeURIComponent(emailParam) : '';
    } catch {
      return emailParam || '';
    }
  })();

  const [user] = useAuthState(auth);
  const router = useRouter();

  const isEmailValid = typeof decodedEmail === 'string' && decodedEmail.includes('@');

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  // keep a ref to the active unsubscribe to cleanup
  const unsubRef = useRef(null);

  useEffect(() => {
    setErrorMsg(null);
    setPosts([]);
    setLoading(true);

    // prefer querying by signed-in user's UID (realtime + ordered)
    if (user?.uid) {
      const q = query(
        collection(db, 'Forum'),
        where('creatorUid', '==', user.uid),
        orderBy('createdAt', 'desc')
      );

      // Use onSnapshot inside try/catch by creating a wrapper that attempts to subscribe.
      try {
        const unsub = onSnapshot(
          q,
          (snapshot) => {
            const docs = [];
            snapshot.forEach((d) => docs.push({ id: d.id, ...d.data() }));
            setPosts(docs);
            setLoading(false);
          },
          (err) => {
            // Real-time listener error (e.g., permission or index). Fall back
            console.error('Realtime snapshot error (uid query):', err);
            setErrorMsg('Failed to load your posts (Realtime query). Falling back to non-realtime load.');
            // cleanup and fallback
            if (unsub) unsub();
            unsubRef.current = null;
            fallbackByEmailOrUid();
          }
        );
        unsubRef.current = unsub;
      } catch (err) {
        // Synchronous error creating listener (rare), fallback
        console.error('Realtime listener failed to initialize (uid query):', err);
        setErrorMsg('Realtime load failed (uid query). Falling back to non-realtime load.');
        fallbackByEmailOrUid();
      }

      return () => {
        if (unsubRef.current) {
          unsubRef.current();
          unsubRef.current = null;
        }
      };
    }

    // If not signed-in but URL has email, try realtime by email WITHOUT orderBy (safer),
    // but many setups still error; we'll try realtime and fallback to getDocs.
    if (!user?.uid && isEmailValid) {
      const qEmailRealtime = query(collection(db, 'Forum'), where('creatorName', '==', decodedEmail));

      try {
        const unsub = onSnapshot(
          qEmailRealtime,
          (snapshot) => {
            const docs = [];
            snapshot.forEach((d) => docs.push({ id: d.id, ...d.data() }));
            // sort client-side by createdAt (since query didn't include orderBy)
            docs.sort((a, b) => {
              const ta = a.createdAt?.toMillis?.() ?? (a.createdAt ? Number(new Date(a.createdAt)) : 0);
              const tb = b.createdAt?.toMillis?.() ?? (b.createdAt ? Number(new Date(b.createdAt)) : 0);
              return tb - ta;
            });
            setPosts(docs);
            setLoading(false);
          },
          (err) => {
            console.error('Realtime snapshot error (email query):', err);
            setErrorMsg('Failed to load posts realtime (email query). Falling back to non-realtime load.');
            if (unsub) unsub();
            unsubRef.current = null;
            fallbackByEmailOrUid();
          }
        );
        unsubRef.current = unsub;
      } catch (err) {
        console.error('Realtime listener failed to initialize (email query):', err);
        setErrorMsg('Realtime load failed (email query). Falling back to non-realtime load.');
        fallbackByEmailOrUid();
      }

      return () => {
        if (unsubRef.current) {
          unsubRef.current();
          unsubRef.current = null;
        }
      };
    }

    // If neither UID nor email is available, nothing to query
    setLoading(false);
    setPosts([]);
    return () => {
      if (unsubRef.current) unsubRef.current();
      unsubRef.current = null;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid, decodedEmail]);

  // fallback loader: try getDocs with best available filter (uid then email then nothing)
  const fallbackByEmailOrUid = async () => {
    setLoading(true);
    setErrorMsg(null);

    try {
      let q;
      if (user?.uid) {
        // Try simple getDocs with where + orderBy (may still require index) — but we'll remove orderBy to be safe:
        q = query(collection(db, 'Forum'), where('creatorUid', '==', user.uid));
      } else if (isEmailValid) {
        q = query(collection(db, 'Forum'), where('creatorName', '==', decodedEmail));
      } else {
        // no filter; return empty
        setPosts([]);
        setLoading(false);
        return;
      }

      const snap = await getDocs(q);
      const docs = [];
      snap.forEach((d) => docs.push({ id: d.id, ...d.data() }));

      // sort client-side by createdAt when possible
      docs.sort((a, b) => {
        const ta = a.createdAt?.toMillis?.() ?? (a.createdAt ? Number(new Date(a.createdAt)) : 0);
        const tb = b.createdAt?.toMillis?.() ?? (b.createdAt ? Number(new Date(b.createdAt)) : 0);
        return tb - ta;
      });

      setPosts(docs);
      setLoading(false);
      setErrorMsg(null);
    } catch (err) {
      console.error('Fallback getDocs failed:', err);
      setErrorMsg('Failed to load your posts (fallback). See console for Firestore error details.');
      setLoading(false);
      setPosts([]);
    }
  };

  // ownership helper
  const isOwner = (p) => {
    if (!user || !p) return false;
    if (user.uid && p.creatorUid) return user.uid === p.creatorUid;
    if (user.email && p.creatorEmail) return user.email === p.creatorEmail;
    if (user.email && p.creatorName) return user.email === p.creatorName;
    return false;
  };

  const handleDelete = async (postId, p) => {
    if (!isOwner(p)) {
      alert('You can only delete your own posts. Sign in with the account that created this post.');
      return;
    }
    if (!confirm('Delete this post? This cannot be undone.')) return;
    try {
      await deleteDoc(doc(db, 'Forum', postId));
      // reload posts: prefer realtime, but ensure fallback loads again
      if (user?.uid) {
        // realtime should pick it up automatically
      } else {
        // manual refresh for fallback
        fallbackByEmailOrUid();
      }
    } catch (e) {
      console.error('Delete failed:', e);
      alert('Failed to delete the post.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br via-indigo-50 to-violet-50">
      <Header />
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold text-blue-800">Your Posts</h1>
          <div className="flex items-center gap-4">
            <Link href="/Forums" className="text-sm text-blue-600 hover:underline">
              ← Back to Forum
            </Link>
            <Link
              href="/Forums/Create"
              className="px-3 py-1.5 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Create a New Post
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10 space-y-6">
        {errorMsg && (
          <div className="rounded-md p-4 bg-red-50 text-red-700">
            {errorMsg}
          </div>
        )}

        {loading && <p className="text-gray-600">Loading your posts…</p>}

        {!loading && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 border-b-2 border-gray-500 pb-6 mb-6">
            {posts.map((post) => (
              <div key={post.id} className="relative">
                <ThreadCard
                  id={post.id}
                  title={post.title}
                  description={post.description}
                  creatorName={post.creatorName ?? post.creatorEmail ?? ''}
                  replies={post.replies ?? 0}
                  createdAt={post.createdAt}
                />
                {isOwner(post) && (
                  <button
                    onClick={() => handleDelete(post.id, post)}
                    className="absolute top-2 right-2 px-3 py-1 text-xs rounded bg-red-600 text-white hover:bg-red-700"
                    title="Delete this post"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          !loading && (
            <p className="text-gray-600">{(isEmailValid || user?.uid) ? "You haven't posted anything yet." : 'No user specified.'}</p>
          )
        )}
        <Footer />
      </main>
    </div>
  );
}
