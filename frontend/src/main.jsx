import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../components/styles/App.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)