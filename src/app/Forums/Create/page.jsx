'use client';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth, db } from '@/firebaseconfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  collection,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';

export default function CreatePostPage() {
  const router = useRouter();
  const [user] = useAuthState(auth);

  // Form state
  const [section, setSection] = useState('room');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fullName, setfullName] = useState('');
  const [rentalAddress, setRentalAddress] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [loading, setLoading] = useState(false);

  // Simple client validation
  const isValid = section && title.trim().length >= 3 && description.trim().length >= 3;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('You must be logged in to create a post.');
      return;
    }
    if (!isValid) {
      alert('Please provide a valid section, title and description (min 3 characters).');
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, 'Forum'), {
        section,
        title: title.trim(),
        description: description.trim(),
        fullName: fullName.trim() || null,
        rentalAddress: rentalAddress.trim() || null,
        contactInfo: contactInfo.trim() || null,
        creatorName: user.email,
        createdAt: serverTimestamp(),
        replies: 0
      });

      // redirect to user's posts page
      router.push(`/Forums/user/${encodeURIComponent(user.email)}`);
    } catch (err) {
      console.error('Error creating post:', err);
      alert('Failed to submit. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br via-indigo-50 to-violet-50 py-10">      
      <main className="max-w-3xl mx-auto bg-white rounded-lg shadow-md border border-gray-100">
        <Header />
        <div className="px-6 py-5 border-b">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-blue-800">Create Post</h1>
            <Link
              href="/Forums"
              className="text-sm text-blue-600 hover:underline"
            >
              ← Back to Forum
            </Link>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Add a post to the community forum. Fields marked optional are not required.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
          {/* Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
            <select
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="room">Room Rental</option>
              <option value="jobs">Job Search</option>
              <option value="general">General Information</option>
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a title"
              className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              minLength={3}
            />
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name (optional)</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setfullName(e.target.value)}
              placeholder="Your Full Name"
              className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Rental Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rental Address (optional)</label>
            <input
              type="text"
              value={rentalAddress}
              onChange={(e) => setRentalAddress(e.target.value)}
              placeholder="Street, city, (optional)"
              className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Contact Info */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Information (optional)</label>
            <input
              type="text"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              placeholder="Email or phone (optional)"
              className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write your post here..."
              rows={6}
              className="w-full rounded-md border border-gray-300 bg-white py-3 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-vertical"
              required
              minLength={3}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              By posting, your email will be associated with this post.
            </div>

            <div className="flex items-center gap-3">
              <Link href="/Forums" className="text-sm text-gray-600 hover:underline">
                Cancel
              </Link>

              <button
                type="submit"
                disabled={!isValid || loading}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white ${
                  loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                } focus:outline-none`}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        </form>
        <Footer />
      </main>
    </div>
  );
}
