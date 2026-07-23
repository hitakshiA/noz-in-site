import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './global.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

// The staggered entrance runs only on first load; after that, cross-route
// View Transitions own the motion. Clear the flag on first interaction (before
// any navigation captures the destination) or once the entrance has finished.
const clearFirstLoad = () => document.documentElement.classList.remove('first-load')
window.addEventListener('pointerdown', clearFirstLoad, { once: true })
window.setTimeout(clearFirstLoad, 1400)
