import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { SettingContextProvider } from './features/context/SettingsContext.tsx'
import { HashRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <SettingContextProvider>

        <App />

      </SettingContextProvider>
  </React.StrictMode>,
)
