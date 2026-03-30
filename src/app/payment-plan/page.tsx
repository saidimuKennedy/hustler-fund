'use client'

import { PageHeader } from '@/components/PageHeader'
import { Input } from '@/components/ui/input'
import { MOCK_LOAN } from '@/lib/mock'
import {
  ArrowRight,
  Building2,
  Calendar,
  CalendarDays,
  CheckCircle2,
  SlidersHorizontal,
  Smartphone,
  Star,
  Wallet,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

type Plan = 'full' | 'daily' | 'weekly' | 'custom'
type PaymentMethod = 'mpesa_push' | 'paybill'
type Step = 'choose' | 'processing' | 'success'

export default function PaymentPlanPage() {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const [customAmount, setCustomAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('mpesa_push')
  const [step, setStep] = useState<Step>('choose')

  const paybillAmount = useMemo(() => {
    if (!selectedPlan) return '—'
    if (selectedPlan === 'full') return MOCK_LOAN.amount
    if (selectedPlan === 'daily') return '117'
    if (selectedPlan === 'weekly') return '583'
    return customAmount || '—'
  }, [customAmount, selectedPlan])

  function PlanCard({
    plan,
    icon,
    title,
    description,
    right,
    secondaryRight,
  }: {
    plan: Plan
    icon: React.ComponentType<{ className?: string }>
    title: string
    description: string
    right?: React.ReactNode
    secondaryRight?: React.ReactNode
  }) {
    const Icon = icon
    const isSelected = selectedPlan === plan

    return (
      <div
        role="button"
        tabIndex={0}
        onClick={() => setSelectedPlan(plan)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') setSelectedPlan(plan)
        }}
        className={[
          'tg-card cursor-pointer flex items-center justify-between gap-3',
          isSelected ? 'border-2 border-[var(--tg-blue)]' : '',
        ].join(' ')}
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--tg-blue-light)] flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5 text-[var(--tg-blue)]" />
          </div>
          <div>
            <div className="font-semibold text-sm">{title}</div>
            <div className="text-xs text-[var(--tg-gray)] mt-0.5">{description}</div>
          </div>
        </div>

        <div className="flex flex-col items-end shrink-0">
          {right ? <div>{right}</div> : null}
          {secondaryRight ? <div className="mt-1">{secondaryRight}</div> : null}
          <div className="mt-2">
            <div
              className={[
                'w-5 h-5 rounded-full border-2 flex items-center justify-center',
                isSelected ? 'border-[var(--tg-blue)]' : 'border-[var(--border)]',
              ].join(' ')}
            >
              {isSelected ? (
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--tg-blue)]" />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <PageHeader title="Choose Your Payment Plan" showBack />
      <div className="px-4 py-4 space-y-4">

      <p className="tg-section-title">Select a plan</p>

      <PlanCard
        plan="full"
        icon={Wallet}
        title="Pay in Full"
        description="Clear your balance in one payment"
        right={<div className="font-bold text-[var(--tg-blue)]">KES {MOCK_LOAN.amount}</div>}
        secondaryRight={
          <div className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--tg-green)]"><Star className="h-3 w-3" /> Recommended</div>
        }
      />

      <p className="tg-section-title">Pay in parts</p>

      <PlanCard
        plan="daily"
        icon={Calendar}
        title="Daily Payment"
        description="Small daily contributions"
        right={<div className="text-xs text-[var(--tg-gray)]">~KES 117/day</div>}
      />

      <PlanCard
        plan="weekly"
        icon={CalendarDays}
        title="Weekly Payment"
        description="Pay once a week"
        right={<div className="text-xs text-[var(--tg-gray)]">~KES 583/week</div>}
      />

      <div className="space-y-2">
        <PlanCard
          plan="custom"
          icon={SlidersHorizontal}
          title="Custom Amount"
          description="You decide the amount"
        />

        {selectedPlan === 'custom' ? (
          <div className="transition-all">
            <Input
              type="number"
              inputMode="numeric"
              placeholder="Enter amount (KES)"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="rounded-xl h-12 focus-visible:border-[var(--tg-blue)] focus-visible:ring-[var(--tg-blue)]"
            />
          </div>
        ) : null}
      </div>

      {selectedPlan !== null ? (
        <div className="space-y-3">
          <p className="tg-section-title">Payment method</p>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setPaymentMethod('mpesa_push')}
              className={[
                'h-12 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all active:scale-[0.98]',
                paymentMethod === 'mpesa_push'
                  ? 'bg-[var(--tg-blue)] text-white'
                  : 'tg-btn-outline',
              ].join(' ')}
            >
              <Smartphone className="w-4 h-4" />
              M-Pesa Push
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod('paybill')}
              className={[
                'h-12 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all active:scale-[0.98]',
                paymentMethod === 'paybill'
                  ? 'bg-[var(--tg-blue)] text-white'
                  : 'tg-btn-outline',
              ].join(' ')}
            >
              <Building2 className="w-4 h-4" />
              Paybill
            </button>
          </div>

          {paymentMethod === 'mpesa_push' ? (
            <div className="bg-[var(--tg-blue-light)] rounded-xl p-3 text-sm space-y-1">
              <div className="flex items-center gap-1"><Smartphone className="h-4 w-4 shrink-0" /> Push will be sent to {MOCK_LOAN.phone_display}</div>
              <div>Enter your M-Pesa PIN when prompted</div>
            </div>
          ) : (
            <div className="bg-[var(--tg-blue-light)] rounded-xl p-3 text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-[var(--tg-gray)]">Paybill Number</span>
                <span className="font-semibold">{MOCK_LOAN.paybill}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--tg-gray)]">Account Number</span>
                <span className="font-semibold">{MOCK_LOAN.account}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--tg-gray)]">Amount</span>
                <span className="font-semibold">KES {paybillAmount}</span>
              </div>
            </div>
          )}
        </div>
      ) : null}

      <div className="space-y-3">
        {step === 'choose' ? (
          <button
            type="button"
            className={[
              'tg-btn-primary',
              !selectedPlan ? 'opacity-50 cursor-not-allowed' : '',
            ].join(' ')}
            disabled={!selectedPlan}
            onClick={() => {
              setStep('processing')
              window.setTimeout(() => setStep('success'), 2000)
            }}
          >
            Confirm Payment
          </button>
        ) : null}

        {step === 'processing' ? (
          <button
            type="button"
            className="tg-btn-primary opacity-80 cursor-not-allowed flex items-center justify-center gap-2"
            disabled
          >
            <span className="inline-block w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
            Processing...
          </button>
        ) : null}

        {step === 'success' ? (
          <div className="tg-card text-center py-6">
            <CheckCircle2 className="w-12 h-12 text-[var(--tg-green)] mx-auto mb-3" />
            <div className="font-bold text-lg">Payment Initiated!</div>
            <div className="text-sm text-[var(--tg-gray)] mt-1 px-4">
              Your M-Pesa push was sent to {MOCK_LOAN.phone_masked}. Enter your PIN
              to complete.
            </div>
            <button
              type="button"
              className="tg-btn-primary mt-4"
              onClick={() => router.push('/')}
            >
              Back to Loan Summary
            </button>
          </div>
        ) : null}

        <div className="text-center text-xs text-[var(--tg-gray)] px-4">
          You can repay in small amounts at your own pace. No penalties for partial
          payments.
        </div>
      </div>
    </div>
    </>
  )
}

