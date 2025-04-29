"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Cpu, Globe, MousePointer, Clock, Eye, Zap } from "lucide-react"

export default function DigitalFootprint() {
  const [isVisible, setIsVisible] = useState(false)
  const [stats, setStats] = useState({
    browserName: "",
    deviceType: "",
    screenSize: "",
    timeOnPage: 0,
    mouseDistance: 0,
    scrollDepth: 0,
  })

  useEffect(() => {
    // Detect browser
    const userAgent = navigator.userAgent
    let browserName = "Unknown"

    if (userAgent.match(/chrome|chromium|crios/i)) {
      browserName = "Chrome"
    } else if (userAgent.match(/firefox|fxios/i)) {
      browserName = "Firefox"
    } else if (userAgent.match(/safari/i)) {
      browserName = "Safari"
    } else if (userAgent.match(/opr\//i)) {
      browserName = "Opera"
    } else if (userAgent.match(/edg/i)) {
      browserName = "Edge"
    }

    // Detect device type
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    const deviceType = isMobile ? "Mobile" : "Desktop"

    // Get screen size
    const screenSize = `${window.innerWidth}x${window.innerHeight}`

    setStats((prev) => ({
      ...prev,
      browserName,
      deviceType,
      screenSize,
    }))

    // Show after a delay to create the impression of "scanning"
    setTimeout(() => {
      setIsVisible(true)
    }, 3000)

    // Track mouse movement
    let lastX = 0
    let lastY = 0
    let totalDistance = 0

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastX
      const dy = e.clientY - lastY
      const distance = Math.sqrt(dx * dx + dy * dy)

      totalDistance += distance
      lastX = e.clientX
      lastY = e.clientY

      setStats((prev) => ({
        ...prev,
        mouseDistance: Math.round(totalDistance / 100) / 10,
      }))
    }

    // Track scroll depth
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.body.offsetHeight
      const winHeight = window.innerHeight
      const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100

      setStats((prev) => ({
        ...prev,
        scrollDepth: Math.min(100, Math.round(scrollPercent)),
      }))
    }

    // Track time on page
    const timeInterval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        timeOnPage: prev.timeOnPage + 1,
      }))
    }, 1000)

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
      clearInterval(timeInterval)
    }
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" + secs : secs}`
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-10 left-10 z-40 bg-black/30 backdrop-blur-md border border-white/10 p-4 rounded-lg max-w-xs"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          data-cursor="reveal"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white text-sm font-bold">Your Digital Footprint</h3>
            <button onClick={() => setIsVisible(false)} className="text-white/60 hover:text-white">
              ×
            </button>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center text-white/80">
              <Globe className="w-4 h-4 mr-2" />
              <span>Browser: {stats.browserName}</span>
            </div>
            <div className="flex items-center text-white/80">
              <Cpu className="w-4 h-4 mr-2" />
              <span>Device: {stats.deviceType}</span>
            </div>
            <div className="flex items-center text-white/80">
              <Eye className="w-4 h-4 mr-2" />
              <span>Screen: {stats.screenSize}</span>
            </div>
            <div className="flex items-center text-white/80">
              <Clock className="w-4 h-4 mr-2" />
              <span>Time on page: {formatTime(stats.timeOnPage)}</span>
            </div>
            <div className="flex items-center text-white/80">
              <MousePointer className="w-4 h-4 mr-2" />
              <span>Mouse movement: {stats.mouseDistance}m</span>
            </div>
            <div className="flex items-center text-white/80">
              <Zap className="w-4 h-4 mr-2" />
              <span>Scroll depth: {stats.scrollDepth}%</span>
            </div>
          </div>

          <div className="mt-3 text-xs text-white/60 italic">We're analyzing your digital behavior in real-time.</div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

