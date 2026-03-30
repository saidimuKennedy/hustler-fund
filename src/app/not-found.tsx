'use client'

import { LifeBuoy } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="tg-card w-full text-center py-10">
        <LifeBuoy className="w-12 h-12 mx-auto text-[var(--tg-blue)] mb-3" />
        <div className="text-lg font-bold">Link not found</div>
        <div className="text-sm text-[var(--tg-gray)] mt-1">
          Please use the link sent to you via WhatsApp.
        </div>
        <button
          type="button"
          className="tg-btn-primary mt-6"
          onClick={() => router.push('/')}
        >
          Go to Demo
        </button>
      </div>
    </div>
  )
}

