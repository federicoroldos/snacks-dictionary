# Android Setup (Capacitor)

This project uses Capacitor to wrap the existing React + Vite web app in a native Android shell. Google Sign-In is handled natively and the same Drive `appDataFolder` data format is preserved.

## 1) Prerequisites

- Android Studio (includes Android SDK + emulator)
- Java 17+ (Android Studio bundled JDK is fine)
- Node.js (same version you use for the web app)

## 2) Configure Google OAuth + Firebase

You will need TWO OAuth client IDs:

- **Web client ID** (used by Firebase Auth and required by native Google Sign-In for ID tokens)
- **Android client ID** (used for package name + SHA-1 validation)

Steps:

1. Create (or select) a Google Cloud project.
2. Enable APIs:
   - Google Drive API
   - Identity Toolkit API (Firebase Auth)
3. Configure OAuth consent screen:
   - Add scopes:
     - `https://www.googleapis.com/auth/userinfo.email`
     - `https://www.googleapis.com/auth/userinfo.profile`
     - `https://www.googleapis.com/auth/drive.appdata`
     - `https://www.googleapis.com/auth/drive.file`
   - Add test users while in testing mode
4. In Firebase Console:
   - Add a **Web App** and copy its config into `.env` (see below)
   - Enable **Google** provider under Authentication
5. Create OAuth Client IDs in Google Cloud Console:
   - **Web application** client ID
     - Authorized JavaScript origins: `http://localhost:5173`, your production domain, and `https://<project-id>.firebaseapp.com`
     - Authorized redirect URI: `https://<project-id>.firebaseapp.com/__/auth/handler`
   - **Android** client ID
     - Package name: `com.federicoroldos.snacksdictionary` (update if you change `appId` in `capacitor.config.ts`)
     - SHA-1 certificate fingerprint (see next section)

## 3) Get SHA-1 Fingerprints (Debug + Release)

Debug keystore (emulator + local builds):

```bash
keytool -list -v -keystore "$env:USERPROFILE\.android\debug.keystore" -alias androiddebugkey -storepass android -keypass android
```

If you're using Command Prompt instead of PowerShell:

```bash
keytool -list -v -keystore %USERPROFILE%\.android\debug.keystore -alias androiddebugkey -storepass android -keypass android
```

Release keystore (for Play Store):

```bash
keytool -list -v -keystore <path-to-your-release.keystore> -alias <your-alias>
```

Add BOTH SHA-1 values to the **Android OAuth client** in Google Cloud Console.

## 4) Configure Environment Variables

Create `.env` from `.env.example` and fill in:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_APP_ID=...
VITE_GOOGLE_WEB_CLIENT_ID=your_web_client_id.apps.googleusercontent.com
VITE_GOOGLE_ANDROID_CLIENT_ID=your_android_client_id.apps.googleusercontent.com
```

## 5) Build and Run (Android)

Install dependencies:

```bash
npm install
```

Build + sync Android:

```bash
npm run android:build
```

Open Android Studio:

```bash
npm run android:open
```

Run on emulator/device (from the project root):

```bash
npx cap run android
```

### Live reload (optional)

Terminal 1:

```bash
npm run dev -- --host
```

Terminal 2:

```bash
npm run android:dev
```

If you use an emulator, you can reach the dev server at `http://10.0.2.2:5173`.

## 6) Build APK / AAB

From Android Studio:

- **APK**: `Build > Build Bundle(s) / APK(s) > Build APK(s)`
- **AAB (Play Store)**: `Build > Generate Signed Bundle / APK > Android App Bundle`

You can also use Gradle directly:

```bash
cd android
./gradlew assembleDebug
./gradlew bundleRelease
```

## 7) Notes

- Native Google Sign-In is used on Android, and the Google Drive access token is stored in local storage (same as web) to keep Drive sync consistent.
- Data format and Google Drive storage locations are unchanged.
