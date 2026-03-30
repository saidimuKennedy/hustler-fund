import type { Metadata, Viewport } from "next"
import "./globals.css"

import { BottomNav } from "@/components/BottomNav"
import { HelpPill } from "@/components/HelpPill"

export const metadata: Metadata = {
  title: "Hustler Fund",
  description: "Manage your Hustler Fund loan",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#2AABEE",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="w-full max-w-[600px] mx-auto relative bg-white min-h-screen">
          <main className="pb-24">
            {children}
          </main>
          <BottomNav />
          <HelpPill />
        </div>
      </body>
    </html>
  )
}
