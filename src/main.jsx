import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Assignment from './Assignment.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Assignment />
  </StrictMode>,
)
