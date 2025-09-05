// app/page.tsx
import { Suspense } from 'react'
import HomePageContent from './HomePageContent'

export default function HomePage() {
  return (
    <Suspense fallback={<div>Načítám...</div>}>
      <HomePageContent />
    </Suspense>
  )
}