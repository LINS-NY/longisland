'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth, db } from '@/firebaseconfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

function formatDate(ts) {
  try {
    if (!ts) return '';
    // Firestore Timestamp has toMillis()
    const date = ts?.toDate ? ts.toDate() : (ts?.toMillis ? new Date(ts.toMillis()) : new Date(ts));
    return date.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  } catch {
    return '';
  }
}

export default function PostDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [user] = useAuthState(auth);

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    let mounted = true;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const ref = doc(db, 'Forum', id);
        const snap = await getDoc(ref);
        if (!mounted) return;
        if (!snap.exists()) {
          setPost(null);
        } else {
          setPost({ id: snap.id, ...snap.data() });
        }
      } catch (e) {
        console.error('Error loading post', e);
        setError('Failed to load post.');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, [id]);

  const handleDelete = async () => {
    if (!post) return;
    if (!user?.email || user.email !== post.creatorName) {
      alert('You can only delete your own posts.');
      return;
    }
    if (!confirm('Delete this post? This cannot be undone.')) return;
    try {
      await deleteDoc(doc(db, 'Forum', id));
      router.push('/Forums');
    } catch (e) {
      console.error('Delete failed', e);
      alert('Failed to delete the post.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br via-indigo-50 to-violet-50 py-8">  
    <Header />    
      <main className="max-w-5xl mx-auto px-4">
        
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/Forums" className="text-sm text-blue-600 hover:underline">
              ← Back to Forum
            </Link>
            {post?.section && (
              <Link
                href={`/Forums/${post.section}`}
                className="text-sm text-gray-600 hover:underline"
              >
                View all in {post.section}
              </Link>
            )}
          </div>

          <div className="flex items-center gap-3">
            {user?.email && (
              <Link
                href={`/Forums/user/${encodeURIComponent(user.email)}`}
                className="text-sm text-blue-600 hover:underline"
              >
                View my posts
              </Link>
            )}
            {post && user?.email === post.creatorName && (
              <button
                onClick={handleDelete}
                className="px-3 py-1.5 bg-red-600 text-white text-sm rounded hover:bg-red-700"
              >
                Delete
              </button>
            )}
          </div>
        </div>

        {loading && <p className="text-gray-600">Loading post…</p>}

        {!loading && error && (
          <div className="rounded-md p-4 bg-red-50 text-red-700">{error}</div>
        )}

        {!loading && !error && !post && (
          <div className="rounded-md p-6 bg-white border text-gray-600">
            Post not found.
          </div>
        )}

        {!loading && post && (
          <article className="bg-white rounded-xl shadow p-6 border">
            <header className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-blue-800 leading-tight">
                {post.title}
              </h1>
              <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:gap-4 text-sm text-gray-600">
                <span><strong>Posted by</strong> {post.fullName ? `${post.fullName} (${post.creatorName})` : post.creatorName}</span>
                <span>•</span>
                <span>{formatDate(post.createdAt)}</span>
                {post.section && <span className="ml-2 px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-xs font-medium">{post.section}</span>}
                {typeof post.replies !== 'undefined' && <span className="ml-auto text-gray-500">{post.replies} Replies</span>}
              </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <section className="lg:col-span-2 prose prose-sm max-w-none">
                <h2 className="sr-only">Description</h2>
                <p className="whitespace-pre-wrap text-gray-800">{post.description}</p>

                {post.contactInfo && (
                  <div className="mt-6 bg-gray-50 p-4 rounded">
                    <h3 className="font-medium text-gray-700">Contact</h3>
                    <div className="mt-1 text-gray-800">{post.contactInfo}</div>
                  </div>
                )}
              </section>

              <aside className="space-y-4">
                <div className="bg-blue-50 border border-blue-100 p-4 rounded">
                  <h3 className="text-sm font-semibold text-blue-800">Listing details</h3>
                  <dl className="mt-2 text-sm text-gray-700 space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Full Name</dt>
                      <dd>{post.fullName ?? '—'}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Rental address</dt>
                      <dd className="text-right">{post.rentalAddress ?? '—'}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Contact</dt>
                      <dd className="text-right">{post.contactInfo ?? '—'}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Posted</dt>
                      <dd className="text-right">{formatDate(post.createdAt)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Section</dt>
                      <dd className="text-right">{post.section ?? '—'}</dd>
                    </div>
                  </dl>
                </div>

                <div className="bg-white border p-4 rounded">
                  <h4 className="text-sm font-medium text-gray-700">Actions</h4>
                  <div className="mt-3 flex flex-col gap-2">
                    <Link
                      href={`/Forums/user/${encodeURIComponent(post.creatorName)}`}
                      className="text-left text-sm text-blue-600 hover:underline"
                    >
                      More posts from this user
                    </Link>
                    <Link
                      href={`/Forums/${post.section}`}
                      className="text-left text-sm text-gray-600 hover:underline"
                    >
                      See all in {post.section}
                    </Link>
                    {user?.email === post.creatorName && (
                      <button
                        onClick={handleDelete}
                        className="w-full mt-2 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Delete post
                      </button>
                    )}
                  </div>
                </div>
              </aside>
            </div>
          </article>
        )}
        <Footer />
      </main>
    </div>
  );
}
