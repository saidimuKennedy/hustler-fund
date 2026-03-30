'use client'

import { PageHeader } from '@/components/PageHeader'
import { Input } from '@/components/ui/input'
import { MOCK_LOAN } from '@/lib/mock'
import {
  PENDING_PAYMENT_KEY,
  applyPaymentAndGetRemaining,
  getOutstandingCents,
} from '@/lib/outstanding-balance'
import {
  Building2,
  Calendar,
  CalendarDays,
  CheckCircle2,
  SlidersHorizontal,
  Smartphone,
  Star,
  Wallet,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

type Plan = 'full' | 'daily' | 'weekly' | 'custom'
type PaymentMethod = 'mpesa_push' | 'paybill'
type Step = 'choose' | 'waiting' | 'success'

export default function PaymentPlanPage() {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const [customAmount, setCustomAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('paybill')
  const [step, setStep] = useState<Step>('choose')

  const paybillAmount = useMemo(() => {
    if (!selectedPlan) return '—'
    if (selectedPlan === 'full') return MOCK_LOAN.amount
    if (selectedPlan === 'daily') return '117'
    if (selectedPlan === 'weekly') return '583'
    return customAmount || '—'
  }, [customAmount, selectedPlan])

  const selectedAmount =
    selectedPlan === 'full'
      ? MOCK_LOAN.amount
      : selectedPlan === 'daily'
        ? '117'
        : selectedPlan === 'weekly'
          ? '583'
          : selectedPlan === 'custom'
            ? customAmount || '0'
            : '0'

  useEffect(() => {
    if (step !== 'success') return
    const pending = sessionStorage.getItem(PENDING_PAYMENT_KEY)
    if (!pending) return
    sessionStorage.removeItem(PENDING_PAYMENT_KEY)
    applyPaymentAndGetRemaining(pending)
  }, [step])

  const isPushOnlyPlan = selectedPlan === 'daily' || selectedPlan === 'custom'

  useEffect(() => {
    if (selectedPlan === 'daily' || selectedPlan === 'custom') {
      setPaymentMethod('mpesa_push')
    } else if (selectedPlan === 'full' || selectedPlan === 'weekly') {
      setPaymentMethod('paybill')
    }
  }, [selectedPlan])

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

  if (step === 'success') {
    const paidNum = Number(selectedAmount.replace(/,/g, ''))
    const remaining = Math.max(0, getOutstandingCents() - paidNum)
    return (
      <div className="px-4 py-6 flex flex-col gap-4">
        <div className="tg-card flex flex-col items-center text-center py-8 gap-2">
          <div className="w-16 h-16 rounded-full bg-[#4fae4e] flex items-center justify-center animate-bounce-once">
            <CheckCircle2 size={32} color="white" />
          </div>
          <p className="text-xl font-extrabold mt-2">Payment Confirmed!</p>
          <p className="text-3xl font-extrabold text-[#4fae4e]">KES {selectedAmount}</p>
          <p className="text-xs text-[var(--tg-gray)]">
            {paymentMethod === 'mpesa_push'
              ? `Paid via M-Pesa · ${MOCK_LOAN.phone_display}`
              : `Paid via Paybill ${MOCK_LOAN.paybill}`}
          </p>
        </div>

        <div className="tg-card flex justify-between items-center">
          <div>
            <p className="text-xs text-[var(--tg-gray)]">Remaining Balance</p>
            <p className="text-xl font-extrabold text-[var(--tg-blue)] mt-0.5">
              {remaining <= 0
                ? 'KES 0 — Fully Paid! 🎉'
                : `KES ${remaining.toLocaleString()}`}
            </p>
          </div>
          <CheckCircle2 size={24} color="#4fae4e" />
        </div>

        <button type="button" className="tg-btn-primary" onClick={() => router.push('/')}>
          ← Back to Summary
        </button>

        <p className="text-xs text-center text-[var(--tg-gray)]">
          A confirmation SMS has been sent to {MOCK_LOAN.phone_masked}
        </p>
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
            <div className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--tg-green)]">
              <Star className="h-3 w-3" /> Recommended
            </div>
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

            {isPushOnlyPlan ? (
              <>
                <p className="text-xs text-[var(--tg-gray)] px-0.5">
                  Daily and custom amounts are collected via STK push to your registered number.
                </p>
                <div className="bg-[var(--tg-blue-light)] rounded-xl p-3 text-sm space-y-1">
                  <div className="flex items-center gap-1">
                    <Smartphone className="h-4 w-4 shrink-0" /> Push will be sent to{' '}
                    {MOCK_LOAN.phone_display}
                  </div>
                  <div>Enter your M-Pesa PIN when prompted</div>
                </div>
              </>
            ) : (
              <div className="bg-[var(--tg-blue-light)] rounded-xl p-3 text-sm space-y-2">
                <div className="flex items-center gap-2 font-semibold text-[var(--tg-blue)]">
                  <Building2 className="h-4 w-4 shrink-0" />
                  Paybill
                </div>
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
                sessionStorage.setItem(PENDING_PAYMENT_KEY, selectedAmount)
                setStep('waiting')
                window.setTimeout(() => setStep('success'), 2000)
              }}
            >
              {paymentMethod === 'mpesa_push' ? 'Send STK Push →' : 'I Have Paid via Paybill →'}
            </button>
          ) : null}

          {step === 'waiting' ? (
            <div className="tg-card flex flex-col items-center text-center py-6 gap-3">
              <div className="w-10 h-10 rounded-full border-4 border-[var(--tg-blue-light)] border-t-[var(--tg-blue)] animate-spin" />
              {paymentMethod === 'mpesa_push' ? (
                <>
                  <p className="font-semibold text-sm">STK Push Sent</p>
                  <p className="text-xs text-[var(--tg-gray)]">
                    Check your phone {MOCK_LOAN.phone_display} and complete the M-Pesa prompt
                  </p>
                </>
              ) : (
                <>
                  <p className="font-semibold text-sm">Confirming Payment...</p>
                  <p className="text-xs text-[var(--tg-gray)]">Verifying your paybill transaction</p>
                </>
              )}
            </div>
          ) : null}

          <div className="text-center text-xs text-[var(--tg-gray)] px-4">
            You can repay in small amounts at your own pace. No penalties for partial payments.
          </div>
        </div>
      </div>
    </>
  )
}
