import dynamic from 'next/dynamic';
import React from 'react';

const DynamicFirebaseProvider = dynamic<{ children: React.ReactNode }>(
  () => import('./FirebaseProvider').then((mod) => mod.FirebaseProvider),
  { ssr: false }
);

export default DynamicFirebaseProvider;