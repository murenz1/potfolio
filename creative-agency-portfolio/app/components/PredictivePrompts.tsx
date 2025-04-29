"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { LightbulbIcon } from "lucide-react"

const predictions = [
  {
    text: "Looking for our portfolio?",
    link: "/#portfolio",
    linkText: "View our work",
  },
  {
    text: "Want to learn about our services?",
    link: "/#services",
    linkText: "Explore services",
  },
  {
    text: "Ready to discuss your project?",
    link: "/#contact",
    linkText: "Contact us",
  },
  {
    text: "Curious about our team?",
    link: "/#about",
    linkText: "Meet our team",
  },
  {
    text: "Interested in our process?",
    link: "/#process",
    linkText: "See how we work",
  },
]

export default function PredictivePrompts() {
  const [currentPrediction, setCurrentPrediction] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show after some scrolling
    const handleScroll = () => {
      if (window.scrollY > 300 && !isVisible) {
        setIsVisible(true)
      }
    }

    window.addEventListener("scroll", handleScroll)

    // Also show after some time if no scrolling
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 20000)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(timer)
    }
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    // Rotate through predictions
    const interval = setInterval(() => {
      setCurrentPrediction((prev) => (prev + 1) % predictions.length)
    }, 7000)

    return () => clearInterval(interval)
  }, [isVisible])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-1/2 right-10 transform -translate-y-1/2 z-40"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPrediction}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-black/30 backdrop-blur-md border border-white/10 p-4 rounded-lg max-w-xs"
              data-cursor="reveal"
            >
              <div className="flex items-center mb-2">
                <LightbulbIcon className="w-4 h-4 mr-2 text-white" />
                <h3 className="text-white text-sm font-bold">We predict you're...</h3>
              </div>

              <p className="text-white/80 text-sm mb-3">{predictions[currentPrediction].text}</p>

              <Link
                href={predictions[currentPrediction].link}
                className="inline-block text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-full transition-colors"
              >
                {predictions[currentPrediction].linkText}
              </Link>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

