"use client"

import { usePathname } from "next/navigation"
import Header from "./Header"

export default function ConditionalHeader() {
  const pathname = usePathname()

  // Don't render header on the digital experience page
  if (pathname === "/digital-experience") {
    return null
  }

  return <Header />
}

