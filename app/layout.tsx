import './globals.css'
import type { Metadata } from 'next'
import { metadata } from '@/lib/metadata' // jen import, ne export

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <body>{children}</body>
    </html>
  )
}
