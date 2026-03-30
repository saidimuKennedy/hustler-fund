import { MOCK_LOAN } from '@/lib/mock'

export const STORAGE_KEY_REMAINING = 'hf_remaining_balance'
export const PENDING_PAYMENT_KEY = 'hf_pending_payment'

export function getOutstandingCents(): number {
  if (typeof window === 'undefined') return MOCK_LOAN.amountRaw
  const raw = sessionStorage.getItem(STORAGE_KEY_REMAINING)
  if (raw === null) return MOCK_LOAN.amountRaw
  const n = Number(raw)
  return Number.isFinite(n) ? n : MOCK_LOAN.amountRaw
}

/** Subtract paid amount from stored outstanding and persist. Returns new remaining (KES). */
export function applyPaymentAndGetRemaining(paidAmountStr: string): number {
  const paid = Number(paidAmountStr.replace(/,/g, ''))
  const next = Math.max(0, getOutstandingCents() - paid)
  sessionStorage.setItem(STORAGE_KEY_REMAINING, String(next))
  return next
}
