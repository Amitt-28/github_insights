import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Hardcode default dark theme for first mount to prevent flash
if (!localStorage.getItem('theme')) {
  localStorage.setItem('theme', 'dark');
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
