import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#111118',
            color: '#f0f0f5',
            border: '1px solid #2a2a38',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.875rem',
            borderRadius: '12px',
          },
          success: {
            iconTheme: { primary: '#3ddc84', secondary: '#111118' },
          },
          error: {
            iconTheme: { primary: '#ff5757', secondary: '#111118' },
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>,
)
