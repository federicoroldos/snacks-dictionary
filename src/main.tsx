import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Capacitor } from '@capacitor/core'
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth'
import './index.css'
import App from './App.tsx'

const webClientId = import.meta.env.VITE_GOOGLE_WEB_CLIENT_ID;
if (Capacitor.isNativePlatform() && webClientId) {
  GoogleAuth.initialize({
    clientId: webClientId,
    scopes: [
      'profile',
      'email',
      'https://www.googleapis.com/auth/drive.appdata',
      'https://www.googleapis.com/auth/drive.file'
    ]
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
