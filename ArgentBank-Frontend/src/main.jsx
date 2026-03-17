import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // Ajout : active le système de routing
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* BrowserRouter permet à React Router de gérer les URL */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
