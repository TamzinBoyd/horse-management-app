import { initializeApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';

// Config comes from .env (see .env.example). Nothing here is secret for a
// Firebase web app, but the .env file itself is git-ignored.
const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const isFirebaseConfigured = Boolean(config.apiKey && config.projectId);

export const db: Firestore | null = isFirebaseConfigured
  ? getFirestore(initializeApp(config))
  : null;
