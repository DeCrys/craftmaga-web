import { Poppins } from 'next/font/google'
import { Toaster } from "../src/components/ui/toaster"
import { Toaster as Sonner } from "../src/components/ui/sonner"
import { TooltipProvider } from "../src/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins'
})

const queryClient = new QueryClient()

export const metadata = {
  title: 'CraftMaga - Nejlepší Český Minecraft Server',
  description: 'Připoj se k naší úžasné komunitě a objevuj nekonečné možnosti v našich unikátních herních módech! Server IP: play.craftmaga.cz',
  keywords: 'minecraft, server, czech, český, survival, skyblock, craftmaga',
  authors: [{ name: 'DeCrys' }],
  creator: 'DeCrys',
  publisher: 'CraftMaga',
  openGraph: {
    title: 'CraftMaga - Nejlepší Český Minecraft Server',
    description: 'Připoj se k naší úžasné komunitě a objevuj nekonečné možnosti v našich unikátních herních módech!',
    url: 'https://craftmaga.cz',
    siteName: 'CraftMaga',
    locale: 'cs_CZ',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {children}
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs" className={poppins.variable}>
      <head>
        <link rel="canonical" href="https://craftmaga.cz" />
        <meta name="theme-color" content="#8b5cf6" />
      </head>
      <body className={poppins.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}