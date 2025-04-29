"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowDown, ArrowRight } from "lucide-react"
import MinimalistBackground from "./MinimalistBackground"
import GeometricPatterns from "./GeometricPatterns"
import MinimalistImagery from "./MinimalistImagery"
import MinimalistParticles from "./MinimalistParticles"
import {
  MinimalistSection,
  MinimalistHeading,
  MinimalistText,
  MinimalistGrid,
  MinimalistCard,
} from "./MinimalistLayout"
import EnhancedCursor from "./EnhancedCursor"
import MindReadingQuestions from "./MindReadingQuestions"
import DigitalFootprint from "./DigitalFootprint"
import AIInsights from "./AIInsights"
import PredictivePrompts from "./PredictivePrompts"
import MouseTrail from "./MouseTrail"

// Loading screen with minimalist design
function MinimalistLoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const increment = Math.random() * 5 + 1
        const newProgress = prev + increment

        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => onComplete(), 500)
          return 100
        }

        return newProgress
      })
    }, 200)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50"
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
        <div className="text-3xl font-light text-gray-900 mb-8 tracking-tight">
          Lumion<span className="text-gray-400 font-extralight">dev</span>
        </div>

        <div className="w-64 h-px bg-gray-200 mb-8">
          <motion.div className="h-full bg-gray-900" initial={{ width: 0 }} animate={{ width: `${progress}%` }} />
        </div>

        <div className="text-gray-500 text-sm">
          {progress < 30 && "Preparing your experience..."}
          {progress >= 30 && progress < 60 && "Analyzing design preferences..."}
          {progress >= 60 && progress < 90 && "Crafting your interface..."}
          {progress >= 90 && "Almost ready..."}
        </div>
      </motion.div>
    </motion.div>
  )
}

// Scroll indicator with minimalist design
function MinimalistScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 1 }}
      className="fixed bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-gray-400 z-40"
      data-cursor="scroll"
    >
      <p className="text-sm mb-2 font-light">Scroll to explore</p>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
      >
        <ArrowDown size={16} />
      </motion.div>
    </motion.div>
  )
}

// Main component
export default function MinimalistDigitalExperience() {
  const [isLoading, setIsLoading] = useState(true)
  const [thoughtIndex, setThoughtIndex] = useState(0)

  const userThoughts = [
    "This design is so clean and elegant...",
    "I like how the whitespace makes everything breathe...",
    "The subtle animations are quite engaging...",
    "This minimalist approach is exactly what I was looking for...",
    "I wonder how they achieved this balance of simplicity and functionality...",
    "I should contact them about designing my project...",
  ]

  useEffect(() => {
    // Rotate through "thoughts" to create mind-reading illusion
    const thoughtInterval = setInterval(() => {
      setThoughtIndex((prev) => (prev + 1) % userThoughts.length)
    }, 8000)

    return () => clearInterval(thoughtInterval)
  }, [])

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {isLoading ? (
        <MinimalistLoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <>
          <EnhancedCursor />
          <MouseTrail />
          <MinimalistBackground />
          <GeometricPatterns />
          <MinimalistImagery />
          <MinimalistParticles />
          <MindReadingQuestions />
          <DigitalFootprint />
          <AIInsights />
          <PredictivePrompts />

          <div className="relative z-10">
            {/* Hero section */}
            <MinimalistSection>
              <div className="text-center">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="text-6xl md:text-8xl font-extralight tracking-tight mb-6"
                >
                  <span className="block">Digital</span>
                  <span className="block">Transformation</span>
                  <span className="block text-gray-400">Reimagined</span>
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.5 }}
                  className="mb-12 p-6 bg-gray-50 rounded-sm max-w-xl mx-auto"
                >
                  <p className="text-gray-500 italic font-light">"{userThoughts[thoughtIndex]}"</p>
                  <div className="mt-4 h-px bg-gray-200">
                    <motion.div
                      className="h-full bg-gray-400"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 8, ease: "linear" }}
                      key={thoughtIndex}
                    />
                  </div>
                </motion.div>

                <MinimalistText>
                  We don't just build digital solutions. We architect experiences that captivate, convert, and create
                  lasting impact through minimalist design principles.
                </MinimalistText>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1.1 }}
                >
                  <Link
                    href="#discover"
                    className="px-8 py-3 bg-gray-900 text-white font-light rounded-sm hover:bg-gray-800 transition-colors duration-300"
                  >
                    Discover Our Approach
                  </Link>
                </motion.div>
              </div>
            </MinimalistSection>

            {/* Philosophy section */}
            <MinimalistSection id="discover" className="bg-gray-50">
              <MinimalistHeading>Our Design Philosophy</MinimalistHeading>

              <MinimalistGrid columns={2}>
                <MinimalistCard className="border border-gray-100">
                  <h3 className="text-xl font-light mb-4 text-gray-900">Minimalist Approach</h3>
                  <p className="text-gray-600 font-light leading-relaxed">
                    We embrace simplicity and clarity in our designs, removing unnecessary elements to focus on what
                    truly matters. This creates a sense of calm and purpose in every digital experience we craft.
                  </p>
                </MinimalistCard>

                <MinimalistCard className="border border-gray-100">
                  <h3 className="text-xl font-light mb-4 text-gray-900">Thoughtful Whitespace</h3>
                  <p className="text-gray-600 font-light leading-relaxed">
                    We believe in the power of negative space to create balance, improve readability, and guide the
                    user's attention. Our designs breathe, allowing content to stand out naturally.
                  </p>
                </MinimalistCard>

                <MinimalistCard className="border border-gray-100">
                  <h3 className="text-xl font-light mb-4 text-gray-900">Monochromatic Palette</h3>
                  <p className="text-gray-600 font-light leading-relaxed">
                    By limiting our color palette, we create a sense of harmony and sophistication. Subtle variations in
                    tone and shade add depth without overwhelming the visual experience.
                  </p>
                </MinimalistCard>

                <MinimalistCard className="border border-gray-100">
                  <h3 className="text-xl font-light mb-4 text-gray-900">Subtle Interactions</h3>
                  <p className="text-gray-600 font-light leading-relaxed">
                    We design interactions that enhance the user experience without distracting from the content. Every
                    animation and transition serves a purpose, creating moments of delight.
                  </p>
                </MinimalistCard>
              </MinimalistGrid>
            </MinimalistSection>

            {/* Portfolio showcase */}
            <MinimalistSection>
              <MinimalistHeading>Our Work</MinimalistHeading>

              <MinimalistText>
                We've helped brands across industries transform their digital presence through minimalist design
                principles and innovative technology.
              </MinimalistText>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((item) => (
                  <motion.div
                    key={item}
                    className="bg-gray-50 aspect-square relative overflow-hidden group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: item * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-gray-200 rounded-full" />
                    </div>

                    <div className="absolute inset-0 bg-white bg-opacity-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-center p-6">
                        <h3 className="text-xl font-light mb-2">Project {item}</h3>
                        <p className="text-gray-600 font-light">Minimalist design for a modern brand</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </MinimalistSection>

            {/* Call to action */}
            <MinimalistSection className="bg-gray-900 text-white">
              <div className="text-center">
                <motion.h2
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                  className="text-5xl md:text-7xl font-extralight tracking-tight mb-8"
                >
                  Let's create together
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="text-xl text-gray-300 mb-12 font-light max-w-2xl mx-auto"
                >
                  Ready to transform your digital presence with minimalist design principles?
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="flex flex-wrap justify-center gap-6"
                >
                  <Link
                    href="/#contact"
                    className="group px-8 py-3 bg-white text-gray-900 font-light rounded-sm hover:bg-gray-100 transition-colors duration-300 flex items-center"
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
                    className="px-8 py-3 bg-transparent border border-white/20 text-white font-light rounded-sm hover:border-white/40 transition-colors duration-300"
                  >
                    Return Home
                  </Link>
                </motion.div>
              </div>
            </MinimalistSection>
          </div>

          <MinimalistScrollIndicator />
        </>
      )}
    </main>
  )
}

