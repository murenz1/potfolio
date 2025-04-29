"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

export default function PageTransition() {
  const router = useRouter()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [destination, setDestination] = useState("")

  useEffect(() => {
    // Add click event listeners to all internal links
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest("a")

      if (
        link &&
        link.href &&
        link.href.startsWith(window.location.origin) &&
        !link.hasAttribute("data-no-transition")
      ) {
        e.preventDefault()

        // Extract the path from the full URL
        const path = link.href.replace(window.location.origin, "")
        setDestination(path)
        setIsTransitioning(true)

        // Wait for animation to complete before navigating
        setTimeout(() => {
          router.push(path)

          // Reset after navigation
          setTimeout(() => {
            setIsTransitioning(false)
          }, 800)
        }, 800)
      }
    }

    document.addEventListener("click", handleLinkClick)
    return () => document.removeEventListener("click", handleLinkClick)
  }, [router])

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          initial={{ scaleY: 0, originY: 0 }}
          animate={{ scaleY: 1 }}
          exit={{ scaleY: 0, originY: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 bg-black z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-white text-2xl font-bold"
          >
            {destination === "/digital-experience" ? "Entering Digital Experience..." : "Loading..."}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

