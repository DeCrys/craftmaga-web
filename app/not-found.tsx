import Link from 'next/link'

export const metadata = {
  title: '404 - Stránka nenalezena - CraftMaga',
  description: 'Hledaná stránka nebyla nalezena. Vraťte se zpět na hlavní stránku CraftMaga serveru.',
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Stranka nenalezena</p>
        <Link href="/" className="text-blue-500 hover:text-blue-700 underline">
          Zpět domu
        </Link>
      </div>
    </div>
  )
}