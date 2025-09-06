import './globals.css'
import type { Metadata } from 'next'
import { metadata } from '../lib/metadata'
import { ClientProviders } from '../components/ClientProviders'

export { metadata }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <body>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  )
}
