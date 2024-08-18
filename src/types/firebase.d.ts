import { FirebaseApp } from 'firebase/app';
import { Auth, User } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';

declare global {
  interface Window {
    firebase?: {
      app: FirebaseApp;
      auth: Auth;
      firestore: Firestore;
    };
  }
}

declare module 'firebase/app' {
  interface FirebaseApp {
    auth(): Auth;
    firestore(): Firestore;
  }
}

declare module 'next' {
  interface NextApiRequest {
    firebaseUser?: User;
  }
}

// You can add more Firebase-related type declarations here as needed

export {};