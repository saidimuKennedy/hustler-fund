'use client'

import { PageHeader } from '@/components/PageHeader'
import { MOCK_LOAN } from '@/lib/mock'
import { getOutstandingCents } from '@/lib/outstanding-balance'
import {
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  CircleDot,
  Lock,
  TrendingUp,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

export default function LoanSummaryPage() {
  const router = useRouter()
  const pathname = usePathname()
  const [outstanding, setOutstanding] = useState(MOCK_LOAN.amountRaw)

  useEffect(() => {
    const sync = () => setOutstanding(getOutstandingCents())
    sync()
    window.addEventListener('pageshow', sync)
    return () => window.removeEventListener('pageshow', sync)
  }, [pathname])

  const balanceLabel = outstanding <= 0 ? '0' : outstanding.toLocaleString()

  const status =
    outstanding <= 0 ? (
      <span className="inline-flex items-center gap-1 rounded-full bg-white/25 px-2 py-0.5 text-xs text-white">
        <CheckCircle className="h-3 w-3" /> Fully paid
      </span>
    ) : MOCK_LOAN.status === 'active' ? (
      <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-xs text-white">
        <CheckCircle className="h-3 w-3" /> Active
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 rounded-full bg-[#e53935]/80 px-2 py-0.5 text-xs text-white">
        <AlertTriangle className="h-3 w-3" /> Overdue
      </span>
    )

  return (
    <>
      <PageHeader title="Your Hustler Fund Account" />
      <div className="px-4 py-4 space-y-4">

        <div className="mb-1 overflow-hidden rounded-2xl shadow-md">
          <div className="bg-gradient-to-br from-[#2AABEE] to-[#0d7fc4] p-6">
            <p className="mb-1 text-sm text-white/70">Outstanding Balance</p>
            <p className="text-5xl font-extrabold tracking-tight text-white">
              KES {balanceLabel}
            </p>
            <div className="mt-3">{status}</div>
          </div>

          <div className="flex justify-between bg-white px-6 py-4">
            <div>
              <div className="text-xs text-[var(--tg-gray)]">Last Payment</div>
              <div className="text-sm font-semibold">{MOCK_LOAN.last_payment}</div>
            </div>
            <div className="mx-2 w-px self-stretch bg-[var(--border)]" />
            <div className="text-right">
              <div className="text-xs text-[var(--tg-gray)]">Due Date</div>
              <div className="text-sm font-semibold">{MOCK_LOAN.due_date}</div>
            </div>
          </div>
        </div>

        <div>
          <div className="text-[17px] font-bold">Hello, {MOCK_LOAN.name}</div>
          <div className="mt-1 text-sm text-[var(--tg-gray)]">
            {outstanding <= 0
              ? 'Your loan balance is cleared. Great job staying on track.'
              : 'You have an active loan. Repay anytime in small, flexible amounts.'}
          </div>
        </div>

        <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-1">
          <span className="tg-pill inline-flex items-center gap-1 shrink-0 whitespace-nowrap">
            <CircleDot className="h-3 w-3 text-[var(--tg-green)]" /> 0% penalty today
          </span>
          <span className="tg-pill inline-flex items-center gap-1 shrink-0 whitespace-nowrap">
            <TrendingUp className="h-3 w-3" /> Repay to grow limit
          </span>
          <span className="tg-pill inline-flex items-center gap-1 shrink-0 whitespace-nowrap">
            <Lock className="h-3 w-3" /> Secured &amp; private
          </span>
        </div>

        {outstanding > 0 ? (
          <button
            type="button"
            className="tg-btn-primary flex items-center justify-center gap-2"
            onClick={() => router.push('/payment-plan')}
          >
            Go to Payment Plan <ArrowRight className="h-4 w-4" />
          </button>
        ) : null}
      </div>
    </>
  )
}
