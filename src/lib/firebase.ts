// Import necessary Firebase modules
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, Firestore, DocumentData, QuerySnapshot } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User, Auth, onAuthStateChanged } from 'firebase/auth';
import { getAnalytics, Analytics } from "firebase/analytics";

// Import the CharacterState type from the correct relative path
import type { CharacterState } from './characterSlice';
import { checkRequiredEnvVars } from '../utils/envCheck';

// Check for required environment variables
const envVarsAvailable = checkRequiredEnvVars();

// Log the result of environment variable check
console.log(`Environment variables check: ${envVarsAvailable ? 'Passed' : 'Failed'}`);

// Firebase configuration object
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Log Firebase config (be careful not to log this in production)
console.log('Firebase config:', JSON.stringify(firebaseConfig, null, 2));

// Initialize Firebase
let app: FirebaseApp;
let db: Firestore;
let auth: Auth;
let analytics: Analytics | undefined;

try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  db = getFirestore(app);
  auth = getAuth(app);
  
  // Initialize Analytics only on the client side
  if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
    console.log('Firebase Analytics initialized');
  }
  
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase:', error);
  throw error;
}

// Export initialized Firebase instances
export { app, db, auth, analytics };

// Add the getApp function
export const getApp = (): Promise<FirebaseApp> => {
  return new Promise((resolve, reject) => {
    if (app) {
      resolve(app);
    } else {
      const unsubscribe = onAuthStateChanged(auth, () => {
        unsubscribe();
        if (app) {
          resolve(app);
        } else {
          reject(new Error('Firebase app not initialized'));
        }
      });
    }
  });
};

/**
 * Sign up a new user
 * @param email - User's email
 * @param password - User's password
 * @returns Promise resolving to the created User object
 */
export const signUp = async (email: string, password: string): Promise<User> => {
  console.log(`Attempting to sign up user with email: ${email}`);
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log(`User signed up successfully: ${userCredential.user.uid}`);
    return userCredential.user;
  } catch (error) {
    console.error('Error during sign up:', error);
    throw error;
  }
};

/**
 * Sign in an existing user
 * @param email - User's email
 * @param password - User's password
 * @returns Promise resolving to the signed-in User object
 */
export const signIn = async (email: string, password: string): Promise<User> => {
  console.log(`Attempting to sign in user with email: ${email}`);
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log(`User signed in successfully: ${userCredential.user.uid}`);
    return userCredential.user;
  } catch (error) {
    console.error('Error during sign in:', error);
    throw error;
  }
};

/**
 * Sign out the current user
 * @returns Promise that resolves when sign out is complete
 */
export const signOutUser = async (): Promise<void> => {
  console.log('Attempting to sign out user');
  try {
    await signOut(auth);
    console.log('User signed out successfully');
  } catch (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
};

/**
 * Save a character to Firestore
 * @param character - The character data to save
 * @returns Promise that resolves to the ID of the saved document
 */
export const saveCharacter = async (character: CharacterState): Promise<string> => {
  console.log('Attempting to save character:', character);
  try {
    const docRef = await addDoc(collection(db, 'characters'), character);
    console.log('Character saved successfully with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error saving character:', error);
    throw error;
  }
};

/**
 * Get all characters for the current user
 * @returns Promise resolving to an array of character documents
 */
export const getCharacters = async (): Promise<DocumentData[]> => {
  console.log('Fetching characters for current user');
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('No user is currently signed in');

    const querySnapshot: QuerySnapshot = await getDocs(collection(db, 'characters'));
    const characters = querySnapshot.docs
      .map(doc => {
        const data = doc.data();
        return { id: doc.id, ...data, userId: data.userId };
      })
      .filter(char => char.userId === user.uid);

    console.log(`Fetched ${characters.length} characters for user ${user.uid}`);
    return characters;
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw error;
  }
};

/**
 * Update an existing character
 * @param characterId - The ID of the character to update
 * @param updates - The updates to apply to the character
 * @returns Promise that resolves when the update is complete
 */
export const updateCharacter = async (characterId: string, updates: Partial<CharacterState>): Promise<void> => {
  console.log(`Attempting to update character with ID: ${characterId}`);
  try {
    const characterRef = doc(db, 'characters', characterId);
    await updateDoc(characterRef, updates);
    console.log('Character updated successfully');
  } catch (error) {
    console.error('Error updating character:', error);
    throw error;
  }
};

/**
 * Delete a character
 * @param characterId - The ID of the character to delete
 * @returns Promise that resolves when the deletion is complete
 */
export const deleteCharacter = async (characterId: string): Promise<void> => {
  console.log(`Attempting to delete character with ID: ${characterId}`);
  try {
    await deleteDoc(doc(db, 'characters', characterId));
    console.log('Character deleted successfully');
  } catch (error) {
    console.error('Error deleting character:', error);
    throw error;
  }
};

/**
 * Listen to auth state changes
 * @param callback - Function to call when auth state changes
 * @returns Unsubscribe function
 */
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Export types for use in other files
export type { User, Auth, Firestore, Analytics };