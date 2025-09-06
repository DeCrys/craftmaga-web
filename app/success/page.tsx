// app/success/page.tsx
import { Suspense } from 'react'
import SuccessContent from './SuccessContent'

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Načítám...</div>}>
      <SuccessContent />
    </Suspense>
  )
}