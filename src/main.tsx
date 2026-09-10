import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// NOTE: QueryClientProvider is intentionally NOT mounted here. Every
// react-query consumer (booking modal, contact form) lives in a lazy chunk
// and mounts its own provider over the shared singleton client — so the
// 72KB query runtime never joins the critical-path bundle.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
