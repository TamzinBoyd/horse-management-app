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
import { HORSE_IDS, type HorseId } from '../horses';

export type ActivityValues = Record<string, string | number>;

export type Activity = {
  id: string;
  /** ISO date, YYYY-MM-DD */
  date: string;
  type: ActivityType;
  /** Which horses this activity is for. Older entries without this field count as both. */
  horses: HorseId[];
  data: ActivityValues;
};

const COLLECTION = 'activities';

function getDb(): Firestore {
  if (!db) throw new Error('Firebase is not configured. Check your .env file.');
  return db;
}

function toActivity(snap: DocumentSnapshot): Activity {
  const v = snap.data() ?? {};
  return {
    id: snap.id,
    date: v.date,
    type: v.type,
    horses: Array.isArray(v.horses) ? v.horses : HORSE_IDS,
    data: v.data ?? {},
  };
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

export async function addActivity(
  date: string,
  type: ActivityType,
  horses: HorseId[],
  data: ActivityValues,
) {
  await addDoc(collection(getDb(), COLLECTION), {
    date,
    type,
    horses,
    data,
    createdAt: serverTimestamp(),
  });
}

export async function updateActivity(
  id: string,
  date: string,
  horses: HorseId[],
  data: ActivityValues,
) {
  await updateDoc(doc(getDb(), COLLECTION, id), {
    date,
    horses,
    data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteActivity(id: string) {
  await deleteDoc(doc(getDb(), COLLECTION, id));
}
