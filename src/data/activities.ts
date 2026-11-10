import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  type DocumentSnapshot,
  type Firestore,
} from 'firebase/firestore';
import { db } from '../firebase';
import type { ActivityType } from '../activityTypes';

export type ActivityValues = Record<string, string | number>;

export type Activity = {
  id: string;
  /** ISO date, YYYY-MM-DD */
  date: string;
  type: ActivityType;
  data: ActivityValues;
};

const COLLECTION = 'activities';

function getDb(): Firestore {
  if (!db) throw new Error('Firebase is not configured. Check your .env file.');
  return db;
}

function toActivity(snap: DocumentSnapshot): Activity {
  const v = snap.data() ?? {};
  return { id: snap.id, date: v.date, type: v.type, data: v.data ?? {} };
}

export function subscribeActivities(
  onChange: (items: Activity[]) => void,
  onError: (err: Error) => void,
) {
  return onSnapshot(
    collection(getDb(), COLLECTION),
    (snap) => onChange(snap.docs.map(toActivity)),
    onError,
  );
}

export function subscribeActivity(
  id: string,
  onChange: (item: Activity | null) => void,
  onError: (err: Error) => void,
) {
  return onSnapshot(
    doc(getDb(), COLLECTION, id),
    (snap) => onChange(snap.exists() ? toActivity(snap) : null),
    onError,
  );
}

export async function addActivity(date: string, type: ActivityType, data: ActivityValues) {
  await addDoc(collection(getDb(), COLLECTION), {
    date,
    type,
    data,
    createdAt: serverTimestamp(),
  });
}

export async function updateActivity(id: string, date: string, data: ActivityValues) {
  await updateDoc(doc(getDb(), COLLECTION, id), {
    date,
    data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteActivity(id: string) {
  await deleteDoc(doc(getDb(), COLLECTION, id));
}
