import { useState, useEffect } from 'react';
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { getFunctions, Functions } from 'firebase/functions';
import { getAnalytics, Analytics } from 'firebase/analytics';
import { getFirebaseConfig } from '../utils/envCheck';

interface FirebaseServices {
  app: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
  storage: FirebaseStorage;
  functions: Functions;
  analytics: Analytics | null;
}

const useFirebase = (): { services: FirebaseServices | null; error: Error | null } => {
  const [services, setServices] = useState<FirebaseServices | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const initializeFirebase = async () => {
      if (typeof window === 'undefined' || getApps().length > 0) {
        return;
      }

      try {
        const firebaseConfig = getFirebaseConfig();
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        const firestore = getFirestore(app);
        const storage = getStorage(app);
        const functions = getFunctions(app);
        let analytics: Analytics | null = null;

        // Only initialize analytics on the client-side and in production
        if (process.env.NODE_ENV === 'production') {
          analytics = getAnalytics(app);
        }

        setServices({
          app,
          auth,
          firestore,
          storage,
          functions,
          analytics,
        });
      } catch (err) {
        console.error('Failed to initialize Firebase:', err);
        setError(err instanceof Error ? err : new Error('Unknown error initializing Firebase'));
      }
    };

    initializeFirebase();
  }, []);

  return { services, error };
};

export default useFirebase;