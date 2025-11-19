'use client';
import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebaseconfig';
import {
  addDoc,
  collection,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  doc,
  increment,
} from 'firebase/firestore';
import { useParams, useSearchParams } from 'next/navigation';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const Forums = () => {
  const [input, setInput] = useState('');
  const [user] = useAuthState(auth);
  const id = useParams();
  const searchParams = useSearchParams();
  const topic = searchParams.get('Topic');
  const creator = searchParams.get('creator');
  const q = query(collection(db, `Forum/${id.id}/messages`), orderBy('timestamp'));
  const [messages] = useCollectionData(q);
  const bottomRef = useRef();
  const forumRef = doc(db, 'Forum', id.id);

const sendMessage = async (e) => {
  e.preventDefault();
  if (!input.trim()) return;

  await addDoc(collection(db, `Forum/${id.id}/messages`), {
    text: input,
    name: user.displayName,
    sender: user.email,
    timestamp: serverTimestamp(),
  });

  await updateDoc(forumRef, {
    Reply: increment(1),
  });

  setInput('');

  // ✅ Scroll after sending
  setTimeout(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 z-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h2 className="text-xl font-bold text-blue-800">{topic}</h2>
              <p className="text-sm text-gray-500">Posted by: {creator}</p>
            </div>
            <a
              href="https://www.linsny.org/Forums"
              className="text-sm text-blue-600 hover:underline font-medium"
            >
              ← Back to Forums
            </a>
          </div>
        </div>

        {/* Messages */}
        <div className="px-6 py-4 h-[400px] overflow-y-auto space-y-4">
          {messages?.map((msg, i) => (
            <MessageBubble key={i} object={msg} />
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={sendMessage}
          className="flex items-center border-t px-6 py-4 bg-white"
        >
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-grow px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            disabled={!user || !input.trim()}
            className={`px-4 py-2 rounded-r-lg text-white font-medium transition ${
              user && input.trim()
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

const MessageBubble = ({ object }) => {
  const date = object.timestamp
    ? new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      }).format(object.timestamp.toDate())
    : '';

  return (
    <div className="bg-gray-100 rounded-lg p-3 shadow-sm">
      <div className="flex justify-between items-center mb-1">
        <span className="font-semibold text-gray-800">{object.sender}</span>
        <span className="text-xs text-gray-500">{date}</span>
      </div>
      <p className="text-gray-700">{object.text}</p>
    </div>
  );
};

export default Forums;
