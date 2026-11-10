# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm install` — install dependencies
- `npm run dev` — start the Vite dev server
- `npm run build` — type-check (`tsc -b`) then production build
- `npm run lint` — oxlint
- `npm run preview` — serve the production build

There is no test suite yet.

Firebase config must be in `.env` (copy `.env.example`, fill from Firebase console → Project settings → Web app). Without it the app shows a setup notice instead of routes. Restart the dev server after editing `.env`.

## Architecture

Single-user React + Vite + TypeScript app. No auth; Firestore is accessed directly from the browser.

- **Routing** (`src/App.tsx`): `/` is the calendar home page, `/activity/:id` is the activity summary/editor.
- **Activity type registry** (`src/activityTypes.ts`): the single source of truth. Each type defines its label, pastel `color`, and `fields`. The log form, edit form, summary view, calendar event colours and legend are all generated from it. To change what a type records, edit only this file. Field titles are placeholders for now.
- **Data layer** (`src/data/activities.ts`): the only module that touches Firestore. Collection `activities`, document shape `{ date: "YYYY-MM-DD", type, data: {...fields}, createdAt/updatedAt }`. Type-specific values live in the nested `data` map, so form changes need no migration. Reads use `onSnapshot`, so the calendar and summary update live.
- **Firebase init** (`src/firebase.ts`): reads `VITE_FIREBASE_*` env vars; exports `db` (null when unconfigured) and `isFirebaseConfigured`.
- **Log flow** (`components/LogNewModal.tsx`): step 1 picks date and type; step 2 renders `DynamicForm` for that type and saves. Opened from the "Log new" button or by clicking a calendar day, which pre-fills the date.
- **Forms** (`components/DynamicForm.tsx`): generic form driven by a type's `fields`. Number inputs are stored as numbers; empty fields are omitted.
- **Calendar** (`pages/HomePage.tsx`): FullCalendar month view. Event click navigates to the activity page.
- **Summary/edit** (`pages/ActivityPage.tsx`): read-only summary with Edit (changes date and fields) and Delete (with confirm).
- **Styling**: all colours are CSS variables on `:root` in `src/styles.css`. Pastel type colours live in `activityTypes.ts`.
