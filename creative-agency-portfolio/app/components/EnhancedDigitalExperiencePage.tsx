"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import EnhancedCursor from "./EnhancedCursor"
import MindReadingQuestions from "./MindReadingQuestions"
import InteractiveGrid from "./InteractiveGrid"
import DigitalFootprint from "./DigitalFootprint"
import AIInsights from "./AIInsights"
import PredictivePrompts from "./PredictivePrompts"
import MouseTrail from "./MouseTrail"
import EnhancedParticleBackground from "./EnhancedParticleBackground"
import CompellingCopy from "./CompellingCopy"
import { ArrowDown, ArrowRight } from "lucide-react"

// Loading screen with typing effect
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("")
  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  const loadingTexts = [
    "Analyzing your digital profile...",
    "Calibrating experience parameters...",
    "Personalizing your journey...",
    "Establishing neural connection...",
    "Preparing your unique experience...",
  ]

  useEffect(() => {
    // Typing effect for loading text
    const textIndex = 0
    let charIndex = 0

    const typingInterval = setInterval(() => {
      if (charIndex < loadingTexts[currentTextIndex].length) {
        setLoadingText(loadingTexts[currentTextIndex].substring(0, charIndex + 1))
        charIndex++
      } else {
        clearInterval(typingInterval)

        // Move to next text after delay
        setTimeout(() => {
          setCurrentTextIndex((prev) => (prev + 1) % loadingTexts.length)
        }, 1000)
      }
    }, 50)

    // Progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const increment = Math.random() * 5 + 1
        const newProgress = prev + increment

        if (newProgress >= 100) {
          clearInterval(progressInterval)
          setTimeout(() => onComplete(), 500)
          return 100
        }

        return newProgress
      })
    }, 200)

    return () => {
      clearInterval(typingInterval)
      clearInterval(progressInterval)
    }
  }, [currentTextIndex, onComplete])

  return (
    <motion.div
      className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: progress === 100 ? 0 : 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center px-4"
      >
        <div className="text-3xl font-bold text-white mb-8">
          Lumion<span className="text-white/70 font-light">dev</span>
        </div>

        <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mb-4">
          <motion.div className="h-full bg-white" initial={{ width: 0 }} animate={{ width: `${progress}%` }} />
        </div>

        <div className="text-white/80 text-sm h-6">
          {loadingText}
          <span className="inline-block w-1 h-4 bg-white ml-1 animate-pulse"></span>
        </div>

        <div className="mt-8 text-white/40 text-xs max-w-xs mx-auto">
          We're analyzing your device and preferences to create a personalized experience
        </div>
      </motion.div>
    </motion.div>
  )
}

// Scroll indicator
function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 1 }}
      className="fixed bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/50 z-40"
      data-cursor="scroll"
    >
      <p className="text-sm mb-2">Scroll to explore your digital future</p>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
      >
        <ArrowDown size={20} />
      </motion.div>
    </motion.div>
  )
}

// Interactive section with typing effect
function InteractiveSection({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children?: React.ReactNode
}) {
  const [typedTitle, setTypedTitle] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    setIsTyping(true)
    let index = 0

    const typingInterval = setInterval(() => {
      if (index < title.length) {
        setTypedTitle(title.substring(0, index + 1))
        index++
      } else {
        clearInterval(typingInterval)
        setIsTyping(false)
      }
    }, 50)

    return () => clearInterval(typingInterval)
  }, [title])

  return (
    <motion.section
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white min-h-[4rem]">
          {typedTitle}
          {isTyping && <span className="inline-block w-2 h-10 bg-white ml-1 animate-pulse"></span>}
        </h2>

        <motion.p
          className="text-xl text-white/70 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          {description}
        </motion.p>

        {children}
      </div>
    </motion.section>
  )
}

// Main component
export default function EnhancedDigitalExperiencePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentPattern, setCurrentPattern] = useState("sphere")
  const [thoughtIndex, setThoughtIndex] = useState(0)

  const userThoughts = [
    "This is unlike any website I've seen before...",
    "How did they know what I was thinking?",
    "It feels like the site is responding to my movements...",
    "I wonder what happens if I scroll down more?",
    "This is actually pretty cool technology...",
    "I should contact them about my project...",
  ]

  useEffect(() => {
    // Rotate through "thoughts" to create mind-reading illusion
    const thoughtInterval = setInterval(() => {
      setThoughtIndex((prev) => (prev + 1) % userThoughts.length)
    }, 8000)

    return () => clearInterval(thoughtInterval)
  }, [])

  return (
    <main className="min-h-screen bg-black text-white">
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <>
          <EnhancedCursor />
          <MouseTrail />
          <EnhancedParticleBackground pattern={currentPattern} />
          <MindReadingQuestions />
          <DigitalFootprint />
          <AIInsights />
          <PredictivePrompts />

          <div className="relative z-10">
            {/* Hero section */}
            <section className="min-h-screen flex items-center justify-center relative">
              <div className="max-w-4xl mx-auto px-4 text-center">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="text-6xl md:text-8xl font-bold mb-6"
                >
                  <span className="block">Digital</span>
                  <span className="block">Transformation</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30">
                    Reimagined
                  </span>
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.5 }}
                  className="mb-8 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg"
                >
                  <p className="text-white/70 italic">"{userThoughts[thoughtIndex]}"</p>
                  <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-white"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 8, ease: "linear" }}
                      key={thoughtIndex}
                    />
                  </div>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="text-xl md:text-2xl text-white/70 mb-12"
                >
                  We don't just build digital solutions. We architect experiences that captivate, convert, and create
                  lasting impact.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1.1 }}
                >
                  <Link
                    href="#discover"
                    className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-white/90 transition-colors duration-300"
                  >
                    Discover Our Approach
                  </Link>
                </motion.div>
              </div>
            </section>

            {/* Interactive grid section */}
            <InteractiveSection
              title="Interact With Our Digital Fabric"
              description="Move your cursor across the grid to experience how we bring digital experiences to life."
            >
              <InteractiveGrid />
            </InteractiveSection>

            {/* Compelling copy section */}
            <section id="discover" className="min-h-screen">
              <CompellingCopy />
            </section>

            {/* Interactive call to action */}
            <InteractiveSection
              title="Ready To Transform Your Digital Presence?"
              description="Let's create something extraordinary together."
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
                className="flex flex-wrap justify-center gap-6"
              >
                <Link
                  href="/#contact"
                  className="group px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-white/90 transition-colors duration-300 flex items-center"
                >
                  Start Your Transformation
                  <motion.div
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <ArrowRight size={16} />
                  </motion.div>
                </Link>
                <Link
                  href="/"
                  className="px-8 py-4 bg-transparent border-2 border-white/20 text-white rounded-full hover:border-white/40 transition-colors duration-300"
                >
                  Return Home
                </Link>
              </motion.div>
            </InteractiveSection>
          </div>

          <ScrollIndicator />
        </>
      )}
    </main>
  )
}

