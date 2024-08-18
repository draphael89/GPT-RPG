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

  useEffect(() => {
    const initializeFirebase = async () => {
      try {
        const firebaseApp = await getApp();
        setApp(firebaseApp);
      } catch (error) {
        console.error('Failed to initialize Firebase:', error);
      }
    };

    initializeFirebase();
  }, []);

  return (
    <FirebaseContext.Provider value={{ app }}>
      {app ? children : <div>Loading...</div>}
    </FirebaseContext.Provider>
  );
}