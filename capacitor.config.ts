import 'dotenv/config';
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.federicoroldos.snacksdictionary',
  appName: 'Snacks Dictionary',
  webDir: 'dist',
  plugins: {
    GoogleAuth: {
      clientId: process.env.VITE_GOOGLE_WEB_CLIENT_ID || '',
      scopes: [
        'profile',
        'email',
        'https://www.googleapis.com/auth/drive.appdata',
        'https://www.googleapis.com/auth/drive.file'
      ],
      serverClientId: process.env.VITE_GOOGLE_WEB_CLIENT_ID || '',
      androidClientId: process.env.VITE_GOOGLE_ANDROID_CLIENT_ID || ''
    }
  }
};

export default config;
