'use client'
import Link from 'next/link'
export default function CancelledPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-100 text-red-900">
      <h1 className="text-3xl font-bold mb-4">Platba zrušena ❌</h1>
      <p>Platba nebyla dokončena.</p>
      <p>Můžeš to zkusit znovu.</p>
      {/* Tady je tlačítko pro návrat na web */}
      <Link href="/" className="bg-red-900 text-white font-bold py-2 px-4 rounded hover:bg-red-900 transition-colors">
        Zpět na hlavní stránku
      </Link>
    </div>
  )
}
