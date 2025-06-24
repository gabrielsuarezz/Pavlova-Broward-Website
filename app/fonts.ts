// Centralised font loading (Next.js 13/14/15 App Router)
import { Inter } from "next/font/google"

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter", // exposes a CSS var if you ever need it
  weight: ["300", "400", "500", "600", "700"], // available weights
})
