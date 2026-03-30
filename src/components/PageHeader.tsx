'use client'

import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

type PageHeaderProps = {
  title: string
  subtitle?: string
  showBack?: boolean
}

export function PageHeader({ title, subtitle, showBack }: PageHeaderProps) {
  const router = useRouter()

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-[var(--border)] bg-white px-5">
      <div className="w-9 shrink-0">
        {showBack ? (
          <button
            type="button"
            aria-label="Go back"
            onClick={() => router.back()}
            className="-ml-2 rounded-lg p-2 transition active:scale-[0.98]"
          >
            <ArrowLeft className="h-5 w-5 text-black" />
          </button>
        ) : (
          <span className="text-xs font-semibold text-[var(--tg-blue)]">Hustler Fund</span>
        )}
      </div>

      <div className="min-w-0 flex-1 px-2 text-center">
        <div className="text-[17px] font-semibold leading-tight text-black">{title}</div>
        {subtitle ? (
          <div className="mt-0.5 text-xs leading-tight text-[var(--tg-gray)]">{subtitle}</div>
        ) : null}
      </div>

      <div className="w-9 shrink-0" aria-hidden />
    </header>
  )
}
