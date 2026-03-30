'use client'

import { CreditCard, LifeBuoy, TrendingUp, Wallet } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

const TABS = [
  { label: 'Summary', icon: Wallet, href: '/' },
  { label: 'Payment', icon: CreditCard, href: '/payment-plan' },
  { label: 'Why Repay', icon: TrendingUp, href: '/why-repay' },
  { label: 'Help', icon: LifeBuoy, href: '/help-support' },
] as const

export function BottomNav() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <nav
      className="absolute bottom-0 left-0 right-0 z-50 flex h-16 items-center border-t border-[var(--border)] bg-white pb-[env(safe-area-inset-bottom)]"
    >
      <div className="grid h-full w-full grid-cols-4">
        {TABS.map((tab) => {
          const isActive =
            tab.href === '/' ? pathname === '/' : pathname.startsWith(tab.href)
          const Icon = tab.icon

          return (
            <button
              key={tab.href}
              type="button"
              onClick={() => router.push(tab.href)}
              className="flex flex-col items-center justify-center gap-1"
            >
              <Icon
                className={[
                  'h-5 w-5',
                  isActive ? 'fill-current text-[var(--tg-blue)]' : 'text-[var(--tg-gray)]',
                ].join(' ')}
              />
              <span
                className={[
                  'text-[10px] font-medium',
                  isActive ? 'text-[var(--tg-blue)]' : 'text-[var(--tg-gray)]',
                ].join(' ')}
              >
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
