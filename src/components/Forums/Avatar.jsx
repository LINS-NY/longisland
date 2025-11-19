'use client';
import React from 'react';

export default function Avatar({ name = '' }) {
  const initials = name
    ? name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'U';
  return (
    <div className="mx-1 inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-200 rounded-full">
      <span className="text-sm font-semibold text-gray-700">{initials}</span>
    </div>
  );
}
