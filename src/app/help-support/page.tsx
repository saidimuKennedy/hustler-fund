'use client'

import { PageHeader } from '@/components/PageHeader'
import { CheckCircle2, MapPin, MessageCircle, Phone, PhoneCall } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'

function HelpSupportInner() {
  const searchParams = useSearchParams()
  const action = searchParams.get('action')

  const [callbackRequested, setCallbackRequested] = useState(false)
  const [chatStarted, setChatStarted] = useState(false)

  useEffect(() => {
    if (action === 'callback') setCallbackRequested(true)
    if (action === 'chat') setChatStarted(true)
  }, [action])

  const offices = [
    {
      name: 'Nairobi CBD Office',
      address: 'Teleposta Towers, 5th Floor, Kenyatta Ave',
      hours: 'Mon–Fri 8am–5pm',
    },
    {
      name: 'Westlands Branch',
      address: 'Sarit Centre, Wing B, Ground Floor',
      hours: 'Mon–Sat 8am–6pm',
    },
    {
      name: 'Eastleigh Service Centre',
      address: 'Eastleigh House, 1st Ave',
      hours: 'Mon–Fri 8am–5pm',
    },
    {
      name: 'Mombasa Road Branch',
      address: 'Belle Vue Plaza, Ground Floor',
      hours: 'Mon–Fri 8am–5pm',
    },
    {
      name: 'Thika Road Branch',
      address: 'Garden City Mall, 2nd Floor',
      hours: 'Mon–Sat 9am–6pm',
    },
  ] as const

  return (
    <>
      <PageHeader title="Need Help?" showBack />
      <div className="px-4 py-4 space-y-4">

      <p className="tg-section-title">Contact Options</p>

      <div className="space-y-3">
        <div className="tg-card border-2 border-[var(--tg-blue)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--tg-blue-light)] flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 text-[var(--tg-blue)]" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-sm">Call Support</div>
              <div className="text-xs text-[var(--tg-gray)]">Speak to an agent directly</div>
              <div className="font-bold text-[var(--tg-blue)] mt-1">0700 000 000</div>
            </div>
          </div>
          <a href="tel:0700000000" className="block mt-3">
            <div className="tg-btn-primary flex items-center justify-center gap-2"><Phone className="h-4 w-4" /> Call Now</div>
          </a>
        </div>

        <div
          className={[
            'tg-card',
            action === 'callback' || callbackRequested ? 'border-2 border-[var(--tg-blue)]' : '',
          ].join(' ')}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--tg-blue-light)] flex items-center justify-center shrink-0">
              <PhoneCall className="w-5 h-5 text-[var(--tg-blue)]" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-sm">Request a Callback</div>
              <div className="text-xs text-[var(--tg-gray)]">We&apos;ll call you within 2 hours</div>
            </div>
          </div>

          {callbackRequested ? (
            <div className="bg-[var(--tg-blue-light)] rounded-xl p-3 flex items-center gap-2 mt-3 text-sm">
              <CheckCircle2 className="w-5 h-5 text-[var(--tg-green)]" />
              <span>Callback requested! We&apos;ll call you shortly.</span>
            </div>
          ) : (
            <button
              type="button"
              className="tg-btn-outline mt-3"
              onClick={() => setCallbackRequested(true)}
            >
              <span className="inline-flex items-center gap-2"><PhoneCall className="h-4 w-4" /> Request Callback</span>
            </button>
          )}
        </div>

        <div
          className={[
            'tg-card',
            action === 'chat' || chatStarted ? 'border-2 border-[var(--tg-blue)]' : '',
          ].join(' ')}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--tg-blue-light)] flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5 text-[var(--tg-blue)]" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-sm">Chat with Agent</div>
              <div className="text-xs text-[var(--tg-gray)]">Available Mon–Fri, 8am–6pm</div>
            </div>
          </div>

          {chatStarted ? (
            <div className="bg-[var(--tg-blue-light)] rounded-xl p-3 flex items-center gap-2 mt-3 text-sm">
              <CheckCircle2 className="w-5 h-5 text-[var(--tg-green)]" />
              <span>Connecting you to an agent...</span>
            </div>
          ) : (
            <button
              type="button"
              className="tg-btn-outline mt-3"
              onClick={() => setChatStarted(true)}
            >
              <span className="inline-flex items-center gap-2"><MessageCircle className="h-4 w-4" /> Start Chat</span>
            </button>
          )}
        </div>
      </div>

      <p className="tg-section-title">Visit Us</p>

      <div className="space-y-3">
        {offices.map((o) => (
          <div key={o.name} className="tg-card flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[var(--tg-blue-light)] flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-[var(--tg-blue)]" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-sm">{o.name}</div>
              <div className="text-xs text-[var(--tg-gray)] mt-0.5">{o.address}</div>
              <div className="inline-block mt-1 tg-pill text-[10px]">{o.hours}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default function HelpSupportPage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-4 px-5 py-4">
          <PageHeader title="Need Help?" showBack />
          <div className="tg-card">
            <div className="text-sm font-semibold">Loading…</div>
            <div className="text-xs text-[var(--tg-gray)] mt-1">
              Preparing support options
            </div>
          </div>
        </div>
      }
    >
      <HelpSupportInner />
    </Suspense>
  )
}

