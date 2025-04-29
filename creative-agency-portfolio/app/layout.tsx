import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import ConditionalHeader from "./components/ConditionalHeader"
import ConditionalFooter from "./components/ConditionalFooter"
import FloatingCubes from "./components/FloatingCubes"
import PageTransition from "./components/PageTransition"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Lumion dev | Digital Marketing & Software Development",
  description: "Innovative digital solutions for businesses, startups, and enterprises worldwide",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-screen bg-background">
            <PageTransition />
            <FloatingCubes />
            <ConditionalHeader />
            <main>{children}</main>
            <ConditionalFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'