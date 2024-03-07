import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { CREDENTIALS } from './credentials/index.ts'
import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={CREDENTIALS.clientID}>

    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleOAuthProvider>,

)
