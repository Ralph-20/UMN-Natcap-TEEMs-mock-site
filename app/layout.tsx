import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { UMNHeader } from "@/components/umn-header"
import { UMNFooter } from "@/components/umn-footer"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NatCap TEEMs | The Earth-Economy Modelers | University of Minnesota",
  description:
    "Natural Capital Project: The Earth-Economy Modelers aims to improve our understanding of the integrated earth-economy system and inform decision-making for sustainable development.",
  generator: "v0.app",
  icons: {
    icon: "/images/University_of_Minnesota_Logo.svg.png",
    apple: "/images/University_of_Minnesota_Logo.svg.png",
    shortcut: "/images/University_of_Minnesota_Logo.svg.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <div className="min-h-screen flex flex-col">
          <UMNHeader />
          <main className="flex-1">
            {children}
          </main>
          <UMNFooter />
        </div>
        <Analytics />
      </body>
    </html>
  )
}
