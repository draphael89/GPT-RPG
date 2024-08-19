'use client';

import React, { useEffect, useState, createContext, useContext } from 'react';
import { FirebaseApp } from 'firebase/app';
import { getApp } from '../lib/firebase';

interface FirebaseContextType {
  app: FirebaseApp | null;
}

const FirebaseContext = createContext<FirebaseContextType>({ app: null });

export function useFirebase() {
  return useContext(FirebaseContext);
}

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [app, setApp] = useState<FirebaseApp | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const initializeFirebase = async () => {
      try {
        const firebaseApp = await getApp();
        setApp(firebaseApp);
      } catch (error) {
        console.error('Failed to initialize Firebase:', error);
        setError(error instanceof Error ? error : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    initializeFirebase();
  }, []);

  if (loading) return <div>Loading Firebase...</div>;
  if (error) return <div>Error initializing Firebase: {error.message}</div>;

  return (
    <FirebaseContext.Provider value={{ app }}>
      {children}
    </FirebaseContext.Provider>
  );
}