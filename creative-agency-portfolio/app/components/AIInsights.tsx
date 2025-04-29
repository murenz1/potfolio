"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Brain, Sparkles } from "lucide-react"

const insights = [
  "You seem interested in interactive experiences. Our team specializes in creating engaging digital interactions.",
  "Based on your exploration pattern, you might be looking for innovative design solutions.",
  "Your careful examination suggests you value attention to detail. So do we.",
  "You appear to be methodically exploring our capabilities. Would you like to see our portfolio?",
  "Your engagement indicates you're researching digital partners. We'd love to discuss your project.",
  "You seem to appreciate minimalist design with powerful functionality.",
  "Your navigation pattern suggests you're comparing different agencies. Here's what makes us unique...",
  "You've spent significant time on this page. Would you like to schedule a consultation?",
  "Based on your interaction, you might be interested in our case studies.",
  "Your exploration style suggests you're detail-oriented and thorough in your research.",
]

export default function AIInsights() {
  const [currentInsight, setCurrentInsight] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [typedText, setTypedText] = useState("")

  useEffect(() => {
    // Show insights after some user interaction
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 15000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isVisible) return

    // Simulate typing effect
    setIsTyping(true)
    setTypedText("")

    const text = insights[currentInsight]
    let index = 0

    const typingInterval = setInterval(() => {
      if (index < text.length) {
        setTypedText((prev) => prev + text.charAt(index))
        index++
      } else {
        clearInterval(typingInterval)
        setIsTyping(false)

        // Schedule next insight
        const nextTimer = setTimeout(() => {
          setCurrentInsight((prev) => (prev + 1) % insights.length)
        }, 8000)

        return () => clearTimeout(nextTimer)
      }
    }, 30)

    return () => clearInterval(typingInterval)
  }, [currentInsight, isVisible])

  const handleDismiss = () => {
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-10 left-10 z-40 bg-black/30 backdrop-blur-md border border-white/10 p-4 rounded-lg max-w-xs"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          data-cursor="reveal"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Brain className="w-4 h-4 mr-2 text-white" />
              <h3 className="text-white text-sm font-bold">AI Insight</h3>
            </div>
            <button onClick={handleDismiss} className="text-white/60 hover:text-white">
              ×
            </button>
          </div>

          <div className="min-h-[80px] flex items-start">
            <div className="text-white/80 text-sm">
              {typedText}
              {isTyping && <span className="inline-block w-2 h-4 bg-white/80 ml-1 animate-pulse"></span>}
            </div>
          </div>

          <div className="mt-3 flex items-center text-xs text-white/60">
            <Sparkles className="w-3 h-3 mr-1" />
            <span>Generated just for you</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

