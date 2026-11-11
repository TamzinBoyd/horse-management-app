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
  | 'other'
  | 'weight'
  | 'delivery';

export const ACTIVITY_TYPES: Record<ActivityType, ActivityTypeDef> = {
  ride: {
    label: 'Exercise',
    color: '#bfe0f5',
    fields: [
      { key: 'type', label: 'Select an activity', input: 'select', options: ['Ride', 'Inhand inc poles', 'Lunge', 'Groundwork'] },
      { key: 'durtion', label: 'Duration in mins', input: 'number' },
      { key: 'location', label: 'Location',  input: 'select', options: ['School', 'Field', 'Hack', 'Lane', 'Other']},
       { key: 'focus', label: 'Session focus', input: 'textarea' },
       { key: 'What went well', label: 'What went well', input: 'textarea' },
       { key: 'What did not go went well', label: 'Negatives', input: 'textarea' },
       { key: 'notes', label: 'Notes', input: 'textarea' },
    ],
  },
  feed: {
    label: 'Feed / routine',
    color: '#cdeccb',
    fields: [
      { key: 'change', label: 'Change type', input: 'select', options: ['Feed', 'Grazing', 'Hay', 'Routine'] },
      { key: 'notes', label: 'Notes', input: 'textarea' },
    ],
  },
  vet: {
    label: 'Vet',
    color: '#f7c9dc',
    fields: [
      { key: 'reason', label: 'Reason', input: 'select', options: ['Vaccinations', 'Other'] },
      { key: 'locations', label: 'Location', input: 'select', options: ['Home', 'Vets'] },
      { key: 'vetName', label: 'Vets name', input: 'text' },
      { key: 'issue', label: 'Issue', input: 'textarea' },
      { key: 'resolution', label: 'Resolution / treatment', input: 'textarea' },
    ],
  },
  farrier: {
    label: 'Farrier',
    color: '#fbeeb0',
    fields: [
      { key: 'weeks', label: 'Number of weeks', input: 'number' },
      { key: 'notes', label: 'Notes', input: 'textarea' },
    ],
  },
  dentist: {
    label: 'Dentist',
    color: '#d9ccf2',
    fields: [
      { key: 'notes', label: 'Notes', input: 'textarea' },
      { key: 'followup', label: 'Follow up', input: 'text' },

    ],
  },
  worming: {
    label: 'Worming',
    color: '#ffd6b0',
    fields: [
      { key: 'type', label: 'Type', input: 'select', options: ['Wormer', 'FEC', 'Taperworm'] },
      { key: 'product', label: 'Product', input: 'text' },
      { key: 'results', label: 'Results', input: 'text' },
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
      { key: 'name', label: 'Name', input: 'text' },
      { key: 'reason', label: 'Reason', input: 'textarea' },
      { key: 'notes', label: 'Notes', input: 'textarea' },

    ],
  },
  observation: {
    label: 'Observation',
    color: '#dcdcdc',
    fields: [
      { key: 'notes', label: 'Notes', input: 'textarea' },
    ],
  },
  other: {
    label: 'Other',
    color: '#ffb8b8',
    fields: [
      { key: 'type', label: 'Type', input: 'select', options: ['Saddlers', 'clipped', 'lice treatment', 'misc'] },
      { key: 'notes', label: 'Notes', input: 'textarea' },
    ],
  },
  weight: {
    label: 'Weight',
    color: '#d4f0f0',
    fields: [
      { key: 'weight', label: 'Weight in KG', input: 'number' },
      { key: 'photo', label: 'Photo', input: 'image' },
      { key: 'notes', label: 'Notes', input: 'textarea' },
    ],
  },
    delivery: {
    label: 'Delivery',
    color: '#b1eabaff',
    fields: [
      { key: 'type', label: 'Type', input: 'select', options: ['Hay', 'Bedding', 'Feed', 'Other'] },
      { key: 'notes', label: 'Notes', input: 'textarea' },
    ],
  },
};

export const ACTIVITY_TYPE_KEYS = Object.keys(ACTIVITY_TYPES) as ActivityType[];

/** Types that usually apply to both horses, so the horse picker defaults to Both. */
export const SHARED_ACTIVITY_TYPES: ActivityType[] = [
  'feed',
  'vet',
  'farrier',
  'dentist',
  'worming',
  'saddler',
  'physio',
  'other',
  'delivery',
];
