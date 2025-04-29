"use client"

import { usePathname } from "next/navigation"
import Footer from "./Footer"

export default function ConditionalFooter() {
  const pathname = usePathname()

  // Don't render footer on the digital experience page
  if (pathname === "/digital-experience") {
    return null
  }

  return <Footer />
}

