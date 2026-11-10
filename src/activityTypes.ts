// Single source of truth for activity types. Forms, calendar colours and the
// summary view are all generated from this file. Field titles are placeholders.

export type FieldDef = {
  key: string;
  label: string;
  input: 'text' | 'number' | 'textarea' | 'select';
  options?: string[];
};

export type ActivityTypeDef = {
  label: string;
  /** Pastel colour used for calendar events and the legend. */
  color: string;
  fields: FieldDef[];
};

export type ActivityType = 'ride' | 'feed' | 'vet' | 'farrier';

export const ACTIVITY_TYPES: Record<ActivityType, ActivityTypeDef> = {
  ride: {
    label: 'Ride',
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
};

export const ACTIVITY_TYPE_KEYS = Object.keys(ACTIVITY_TYPES) as ActivityType[];
