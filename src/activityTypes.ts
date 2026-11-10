// Single source of truth for activity types. Forms, calendar colours and the
// summary view are all generated from this file. Field titles are placeholders.

export type FieldDef = {
  key: string;
  label: string;
  /** 'image' stores the photo as a compressed data URL string. */
  input: 'text' | 'number' | 'textarea' | 'select' | 'image';
  options?: string[];
};

export type ActivityTypeDef = {
  label: string;
  /** Pastel colour used for calendar events and the legend. */
  color: string;
  fields: FieldDef[];
};

export type ActivityType =
  | 'ride'
  | 'feed'
  | 'vet'
  | 'farrier'
  | 'dentist'
  | 'worming'
  | 'saddler'
  | 'physio'
  | 'observation'
  | 'treatment'
  | 'weight';

export const ACTIVITY_TYPES: Record<ActivityType, ActivityTypeDef> = {
  ride: {
    label: 'Exercise',
    color: '#bfe0f5',
    fields: [
      { key: 'field1', label: 'Field 1 (placeholder)', input: 'text' },
      { key: 'field2', label: 'Field 2 (placeholder)', input: 'number' },
      { key: 'notes', label: 'Notes', input: 'textarea' },
    ],
  },
  feed: {
    label: 'Feed',
    color: '#cdeccb',
    fields: [
      { key: 'field1', label: 'Field 1 (placeholder)', input: 'select', options: ['Option A', 'Option B'] },
      { key: 'field2', label: 'Field 2 (placeholder)', input: 'text' },
      { key: 'notes', label: 'Notes', input: 'textarea' },
    ],
  },
  vet: {
    label: 'Vet',
    color: '#f7c9dc',
    fields: [
      { key: 'field1', label: 'Field 1 (placeholder)', input: 'text' },
      { key: 'field2', label: 'Field 2 (placeholder)', input: 'text' },
      { key: 'notes', label: 'Notes', input: 'textarea' },
    ],
  },
  farrier: {
    label: 'Farrier',
    color: '#fbeeb0',
    fields: [
      { key: 'field1', label: 'Field 1 (placeholder)', input: 'select', options: ['Option A', 'Option B'] },
      { key: 'notes', label: 'Notes', input: 'textarea' },
    ],
  },
  dentist: {
    label: 'Dentist',
    color: '#d9ccf2',
    fields: [
      { key: 'field1', label: 'Field 1 (placeholder)', input: 'text' },
      { key: 'field2', label: 'Field 2 (placeholder)', input: 'text' },
      { key: 'notes', label: 'Notes', input: 'textarea' },
    ],
  },
  worming: {
    label: 'Worming',
    color: '#ffd6b0',
    fields: [
      { key: 'field1', label: 'Field 1 (placeholder)', input: 'select', options: ['Option A', 'Option B'] },
      { key: 'field2', label: 'Field 2 (placeholder)', input: 'text' },
      { key: 'notes', label: 'Notes', input: 'textarea' },
    ],
  },
  saddler: {
    label: 'Saddler',
    color: '#b8e6e1',
    fields: [
      { key: 'field1', label: 'Field 1 (placeholder)', input: 'text' },
      { key: 'field2', label: 'Field 2 (placeholder)', input: 'text' },
      { key: 'notes', label: 'Notes', input: 'textarea' },
    ],
  },
  physio: {
    label: 'Physio',
    color: '#e8d3b9',
    fields: [
      { key: 'field1', label: 'Field 1 (placeholder)', input: 'text' },
      { key: 'field2', label: 'Field 2 (placeholder)', input: 'text' },
      { key: 'notes', label: 'Notes', input: 'textarea' },
    ],
  },
  observation: {
    label: 'Observation',
    color: '#dcdcdc',
    fields: [
      { key: 'field1', label: 'Field 1 (placeholder)', input: 'text' },
      { key: 'notes', label: 'Notes', input: 'textarea' },
    ],
  },
  treatment: {
    label: 'Treatment',
    color: '#ffb8b8',
    fields: [
      { key: 'field1', label: 'Field 1 (placeholder)', input: 'text' },
      { key: 'field2', label: 'Field 2 (placeholder)', input: 'text' },
      { key: 'notes', label: 'Notes', input: 'textarea' },
    ],
  },
  weight: {
    label: 'Weight',
    color: '#d4f0f0',
    fields: [
      { key: 'field1', label: 'Weight (placeholder)', input: 'number' },
      { key: 'photo', label: 'Photo', input: 'image' },
      { key: 'notes', label: 'Notes', input: 'textarea' },
    ],
  },
};

export const ACTIVITY_TYPE_KEYS = Object.keys(ACTIVITY_TYPES) as ActivityType[];
