# Snacks Dictionary

A snack cataloging app where you can rate and track snacks like Pepero, Honey Butter Chips, Choco Pie, and more.

Live app target: [https://federicoroldos.github.io/snacks-dictionary/](https://federicoroldos.github.io/snacks-dictionary/)

## Features

- Catalog snacks with name, optional English name, brand, rating, notes, and optional image. Example entries can include Korean favorites like Pepero, Honey Butter Chips, and Choco Pie.
- Google sign-in to keep each user's data separate.
- Google Drive `appDataFolder` sync (JSON file auto-created and updated on every change).
- CRUD operations: add, edit, delete entries with confirmation.
- 5-star rating with half-star support.
- Sorting options (in order): Latest, Best rated, Alphabetical (Hangul), Alphabetical (English).
- Search by name, brand, or notes.

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` from the example:

```bash
cp .env.example .env
```

3. Fill in your Firebase web app credentials in `.env`.

4. Start the dev server:

```bash
npm run dev
```

## Google OAuth + Drive Setup

1. Create a new project in Google Cloud Console and add Firebase to that same project.
2. In Firebase Console, create a Web App and copy its config values.
3. In Google Cloud Console, enable:
   - `Google Drive API`
   - `Identity Toolkit API` (usually enabled by Firebase Auth)
4. Configure OAuth consent screen (`APIs & Services` -> `OAuth consent screen`):
   - User type: `External` (or `Internal` for organization-only use)
   - Add scopes:
     - `https://www.googleapis.com/auth/userinfo.email`
     - `https://www.googleapis.com/auth/userinfo.profile`
     - `https://www.googleapis.com/auth/drive.appdata`
     - `https://www.googleapis.com/auth/drive.file`
   - Add test users while app is in testing mode
5. Create an OAuth Client ID (`APIs & Services` -> `Credentials` -> `OAuth client ID`) with type `Web application`.
6. Add authorized JavaScript origins:
   - `http://localhost:5173`
   - `https://<your-domain>`
   - `https://<your-project-id>.firebaseapp.com`
7. Add authorized redirect URI:
   - `https://<your-project-id>.firebaseapp.com/__/auth/handler`
8. In Firebase Console (`Authentication` -> `Sign-in method`), enable `Google` provider.
9. In Firebase Console (`Authentication` -> `Settings` -> `Authorized domains`), ensure your local and production domains are listed.
10. Create `.env` from `.env.example` and fill:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=<your-project-id>.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=<your-project-id>
VITE_FIREBASE_APP_ID=...
```

11. Run the app and verify Google sign-in plus Drive sync:

```bash
npm install
npm run dev
```

Common issues:
- `auth/unauthorized-domain`: add the domain in Firebase authorized domains.
- OAuth popup fails: verify OAuth consent/test user settings and JS origins.
- Drive `403`: confirm Drive API is enabled and required scopes are approved.
- Redirect mismatch: verify the `/__/auth/handler` URI exactly matches OAuth settings.

## Data Storage

Snack data is stored as JSON in the user's Google Drive `appDataFolder`.
Uploaded images are stored in the user's Google Drive under `Snacks Dictionary/images`.

## Deployment Notes

- Vite base path is set to `/snacks-dictionary/` in `vite.config.ts` for GitHub Pages project deployment.
- Legal pages are at `privacy.html` and `terms.html`.
- If you use a custom domain, configure your own `CNAME`.

