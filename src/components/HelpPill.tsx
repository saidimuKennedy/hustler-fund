'use client'

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { LifeBuoy, MessageCircle, Phone, PhoneCall } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function HelpPill() {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  function goTo(href: string) {
    router.push(href)
    setOpen(false)
  }

  return (
    <div className="pointer-events-none fixed bottom-20 right-4 z-50 sm:right-[calc(50%-260px+16px)]">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="pointer-events-auto rounded-full bg-[var(--tg-blue)] text-white shadow-lg px-4 py-2 flex items-center gap-2 text-sm font-semibold active:scale-[0.98] transition">
          <LifeBuoy className="w-4 h-4" />
          Help
        </SheetTrigger>

        <SheetContent
          side="bottom"
          className="rounded-t-2xl border-t border-[var(--border)] p-0"
          showCloseButton={false}
        >
          <SheetHeader className="p-4 pb-2">
            <div className="w-10 h-1 rounded-full bg-black/10 mx-auto mb-3" />
            <SheetTitle className="text-center text-base font-semibold">
              How can we help?
            </SheetTitle>
          </SheetHeader>

          <div className="px-4 pb-4">
            <a
              href="tel:0700000000"
              className="flex items-center gap-3 w-full py-4 border-b border-[var(--border)]"
            >
              <div className="w-10 h-10 rounded-xl bg-[var(--tg-blue-light)] flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-[var(--tg-blue)]" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm">Call Support</div>
                <div className="text-xs text-[var(--tg-gray)]">0700 000 000</div>
              </div>
            </a>

            <button
              type="button"
              onClick={() => goTo('/help-support?action=callback')}
              className="flex items-center gap-3 w-full py-4 border-b border-[var(--border)] text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-[var(--tg-blue-light)] flex items-center justify-center shrink-0">
                <PhoneCall className="w-5 h-5 text-[var(--tg-blue)]" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm">Request Callback</div>
                <div className="text-xs text-[var(--tg-gray)]">We&apos;ll call you back</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => goTo('/help-support?action=chat')}
              className="flex items-center gap-3 w-full py-4 text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-[var(--tg-blue-light)] flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5 text-[var(--tg-blue)]" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm">Chat with Agent</div>
                <div className="text-xs text-[var(--tg-gray)]">Mon–Fri, 8am–6pm</div>
              </div>
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

