import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

// This is a placeholder for Vite compatibility
// Your Next.js app runs independently
function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">CraftMaga</h1>
        <p className="text-lg text-muted-foreground">
          Toto je Vite placeholder. Hlavní aplikace běží na Next.js.
        </p>
        <p className="text-sm mt-4 text-muted-foreground">
          Návštivte hlavní stránku pro plnou funkcionalitu.
        </p>
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)