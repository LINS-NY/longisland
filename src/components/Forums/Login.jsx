'use client';
import React from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebaseconfig';

export default function Login() {
  const [signInWithGoogle, loading] = useSignInWithGoogle(auth);
  return (
    <button
      onClick={() => signInWithGoogle()}
      disabled={loading}
      className={`px-4 py-2 rounded-lg text-white ${loading ? 'bg-gray-300' : 'bg-blue-600 hover:bg-blue-700'} transition`}
    >
      {loading ? 'Signing in…' : 'Login'}
    </button>
  );
}
