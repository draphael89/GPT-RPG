'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { RootState } from '../lib/store';

const HomeContent: React.FC = () => {
  const user = useSelector((state: RootState) => state.user?.user);

  return (
    <>
      {user ? (
        <div>
          <p className="mb-4">Welcome back, {user.email}!</p>
          <Link href="/game" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Start Playing
          </Link>
        </div>
      ) : (
        <div>
          <p className="mb-4">Please sign up or log in to start your adventure!</p>
          <div className="space-x-4">
            <Link href="/signup" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Sign Up
            </Link>
            <Link href="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Log In
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeContent;