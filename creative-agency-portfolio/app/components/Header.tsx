"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { MoonIcon, SunIcon, Menu } from "lucide-react"
import FullScreenMenu from "./FullScreenMenu"
import { cn } from "@/lib/utils"

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  return (
    <>
      <motion.header
        className="sticky top-0 z-50 bg-background/80 backdrop-blur-md"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo - kept on the left */}
            <div className="flex">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Lumion dev</span>
                <div className="flex items-center">
                  <span className={cn(
                    "text-xl font-bold",
                    theme === "dark" 
                      ? "bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-white"
                      : "text-gray-900"
                  )}>
                    Lumion<span className={cn(
                      "font-light",
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    )}>dev</span>
                  </span>
                </div>
              </Link>
            </div>

            {/* Theme toggle and mobile menu */}
            <div className="flex items-center gap-4">
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="rounded-full p-2 bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                >
                  {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
                </button>
              )}
              <button
                className="md:hidden rounded-full p-2 bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                onClick={() => setIsMenuOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <FullScreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}

