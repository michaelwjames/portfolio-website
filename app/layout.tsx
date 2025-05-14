import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { getMetaInfo } from "@/lib/data"
import Providers from "./providers"

const inter = Inter({ subsets: ["latin"] })
const metaInfo = getMetaInfo()

export const metadata: Metadata = {
  title: metaInfo.title,
  description: metaInfo.description,
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head />
      <body className={`${inter.className} min-h-screen bg-zinc-900 text-zinc-100`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
