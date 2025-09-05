'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link' // Importujte Link

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const pkg = searchParams.get('pkg')

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100 text-green-900">
      <h1 className="text-3xl font-bold mb-4">Platba úspěšná ✅</h1>
      <p>Zakoupený balíček: {pkg}</p>
      <p className="mb-8">Děkujeme za podporu serveru!</p>
      {/* Tady je tlačítko pro návrat na web */}
      <Link href="/" className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition-colors">
        Zpět na hlavní stránku
      </Link>
    </div>
  )
}