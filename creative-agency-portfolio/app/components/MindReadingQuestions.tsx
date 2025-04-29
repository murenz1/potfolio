"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const questions = [
  "Are you wondering how we created this?",
  "Thinking about your digital presence?",
  "Curious about what we can do for you?",
  "Imagining the possibilities?",
  "Wondering how this would look for your brand?",
  "Trying to decide if we're the right fit?",
  "Considering how to stand out online?",
  "Thinking about your next digital move?",
  "Wondering what makes us different?",
  "Curious about our process?",
]

export default function MindReadingQuestions() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [userActivity, setUserActivity] = useState({
    scrollCount: 0,
    clickCount: 0,
    mouseMovement: 0,
    timeOnPage: 0,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentQuestion((prev) => (prev + 1) % questions.length)
        setIsVisible(true)
      }, 500)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    let lastMouseX = 0
    let lastMouseY = 0
    let movementAccumulator = 0
    let timeCounter = 0

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })

      // Calculate mouse movement distance
      const dx = e.clientX - lastMouseX
      const dy = e.clientY - lastMouseY
      const distance = Math.sqrt(dx * dx + dy * dy)

      movementAccumulator += distance
      lastMouseX = e.clientX
      lastMouseY = e.clientY

      if (movementAccumulator > 500) {
        setUserActivity((prev) => ({
          ...prev,
          mouseMovement: prev.mouseMovement + 1,
        }))
        movementAccumulator = 0
      }
    }

    const handleScroll = () => {
      setUserActivity((prev) => ({
        ...prev,
        scrollCount: prev.scrollCount + 1,
      }))
    }

    const handleClick = () => {
      setUserActivity((prev) => ({
        ...prev,
        clickCount: prev.clickCount + 1,
      }))
    }

    // Track time on page
    const timeInterval = setInterval(() => {
      timeCounter++
      setUserActivity((prev) => ({
        ...prev,
        timeOnPage: timeCounter,
      }))

      // Change question based on user activity
      if (timeCounter % 10 === 0) {
        const activitySum = userActivity.scrollCount + userActivity.clickCount + userActivity.mouseMovement
        const questionIndex = Math.min(Math.floor(activitySum / 3) % questions.length, questions.length - 1)

        setIsVisible(false)
        setTimeout(() => {
          setCurrentQuestion(questionIndex)
          setIsVisible(true)
        }, 500)
      }
    }, 1000)

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("click", handleClick)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("click", handleClick)
      clearInterval(timeInterval)
    }
  }, [userActivity])

  return (
    <div className="fixed bottom-10 right-10 z-40">
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-black/30 backdrop-blur-md border border-white/10 p-4 rounded-lg max-w-xs"
          >
            <p className="text-white text-sm">{questions[currentQuestion]}</p>
            <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 5, ease: "linear" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

