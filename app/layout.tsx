import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { inter } from "./fonts"

export const metadata: Metadata = {
  title: "Pavlova Broward",
  description: "Heavenly pavlovas made fresh in Broward County",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
