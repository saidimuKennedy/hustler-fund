'use client'

import { PageHeader } from '@/components/PageHeader'
import {
  ArrowRight,
  CreditCard,
  Landmark,
  RefreshCcw,
  ShieldCheck,
  Star,
  TrendingUp,
  Users,
} from 'lucide-react'
import { useRouter } from 'next/navigation'

const benefits = [
  {
    icon: TrendingUp,
    title: 'Increase Your Loan Limit',
    description:
      'Every repayment grows your borrowing power. Start at KES 500, qualify for up to KES 50,000.',
    color: '#2AABEE',
  },
  {
    icon: RefreshCcw,
    title: 'Access Future Loans',
    description:
      'Settle this loan to unlock the next one — instantly, 24/7 from your phone.',
    color: '#4fae4e',
  },
  {
    icon: ShieldCheck,
    title: 'Build Your Credit Profile',
    description:
      'Your repayment history creates a financial identity that opens doors to banks and SACCOs.',
    color: '#9c27b0',
  },
  {
    icon: Star,
    title: '0% Penalty Window',
    description:
      'Repay before your due date and avoid any penalties. Every shilling counts.',
    color: '#f59e0b',
  },
  {
    icon: Users,
    title: 'Support Other Kenyans',
    description:
      'The Hustler Fund recycles repaid loans to other Kenyans. Your repayment helps someone else start their business.',
    color: '#e53935',
  },
] as const

export default function WhyRepayPage() {
  const router = useRouter()

  return (
    <>
      <PageHeader title="Why Repayment Matters" showBack />
      <div className="px-4 py-4 space-y-4">

      <div className="tg-card bg-gradient-to-br from-[#2AABEE] to-[#1a8ac4] text-white text-center py-8 px-4">
        <div className="flex items-center justify-center gap-3 mb-3">
          <CreditCard className="h-8 w-8 text-white/80" />
          <TrendingUp className="h-8 w-8 text-white/80" />
          <Landmark className="h-8 w-8 text-white/80" />
        </div>
        <div className="font-bold text-lg">
          Repaying on time unlocks your financial future
        </div>
        <div className="text-white/70 text-sm mt-1">
          Every repayment is an investment in yourself
        </div>
      </div>

      <div className="space-y-3">
        {benefits.map((b, index) => {
          const Icon = b.icon
          return (
            <div
              key={b.title}
              className="tg-card flex gap-3 items-start fade-slide-up"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${b.color}1A` }}
              >
                <Icon className="w-5 h-5" style={{ color: b.color }} />
              </div>
              <div>
                <div className="font-semibold text-sm">{b.title}</div>
                <div className="text-xs text-[var(--tg-gray)] mt-0.5">
                  {b.description}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <button
        type="button"
        className="tg-btn-primary"
        onClick={() => router.push('/payment-plan')}
      >
        <span className="inline-flex items-center gap-2">Set Up My Payment Plan <ArrowRight className="h-4 w-4" /></span>
      </button>
    </div>
    </>
  )
}

