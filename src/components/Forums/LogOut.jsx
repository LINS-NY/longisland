'use client';
import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebaseconfig';

export default function LogOut() {
  return (
    <button
      onClick={() => signOut(auth)}
      className="px-4 py-2 rounded-lg text-white bg-gray-700 hover:bg-gray-800 transition"
    >
      Logout
    </button>
  );
}
