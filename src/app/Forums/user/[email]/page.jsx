'use client';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { auth, db } from '@/firebaseconfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  collection,
  query,
  where,
  orderBy,
  deleteDoc,
  doc
} from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import ThreadCard from '@/components/Forums/ThreadCard';
import Link from 'next/link';

export default function UserPostsPage() {
  const { email: emailParam } = useParams();
  const [user] = useAuthState(auth);
  const router = useRouter();

  const email = decodeURIComponent(emailParam || '');
  const isEmailValid = typeof email === 'string' && email.includes('@');

  // Primary query (requires composite index). We’ll quietly fall back if it errors.
  const primaryQuery = isEmailValid
    ? query(
        collection(db, 'Forum'),
        where('creatorName', '==', email),
        orderBy('createdAt', 'desc')
      )
    : null;

  // Fallback query: no orderBy, sort client-side.
  const fallbackQuery = isEmailValid
    ? query(collection(db, 'Forum'), where('creatorName', '==', email))
    : null;

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

  const handleDelete = async (postId, creatorName) => {
    if (!user?.email || user.email !== creatorName) {
      alert('You can only delete your own posts.');
      return;
    }
    try {
      await deleteDoc(doc(db, 'Forum', postId));
      router.refresh?.();
    } catch (e) {
      console.error('Error deleting post:', e);
      alert('Failed to delete the post. Please try again.');
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
        {!isEmailValid && (
          <p className="text-gray-600">Invalid user email in URL.</p>
        )}

        {loading && <p className="text-gray-600">Loading your posts…</p>}

        {!loading && isEmailValid && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 border-b-2 border-gray-500 pb-6 mb-6">
            {posts.map((post) => (
              <div key={post.id} className="relative">
                <ThreadCard
                  id={post.id}
                  title={post.title}
                  description={post.description}
                  creatorName={post.creatorName}
                  replies={post.replies ?? 0}
                  createdAt={post.createdAt}
                />
                {user?.email === post.creatorName && (
                  <button
                    onClick={() => handleDelete(post.id, post.creatorName)}
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
          !loading &&
          isEmailValid && (
            <p className="text-gray-600">You haven’t posted anything yet.</p>
          )
        )}
        <Footer />
      </main>
    </div>
  );
}
