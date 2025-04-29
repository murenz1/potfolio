"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { ArrowDown } from "lucide-react"
import Link from "next/link"

interface SectionProps {
  children: React.ReactNode
  id: string
  className?: string
  background?: "black" | "white"
  textColor?: "black" | "white"
}

export const Section = ({ children, id, className = "", background = "black", textColor = "white" }: SectionProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  const springY = useSpring(y, { stiffness: 100, damping: 30 })
  const springOpacity = useSpring(opacity, { stiffness: 100, damping: 30 })
  const springScale = useSpring(scale, { stiffness: 100, damping: 30 })

  return (
    <section
      id={id}
      ref={ref}
      className={`min-h-screen flex items-center justify-center relative ${className}`}
      style={{
        backgroundColor: background === "black" ? "black" : "white",
        color: textColor === "black" ? "black" : "white",
      }}
    >
      <motion.div
        style={{
          y: springY,
          opacity: springOpacity,
          scale: springScale,
        }}
        className="w-full max-w-7xl mx-auto px-4 py-20"
      >
        {children}
      </motion.div>
    </section>
  )
}

export const ScrollIndicator = () => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 1 }}
      className="fixed bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/50 z-50"
    >
      <p className="text-sm mb-2">Scroll to explore</p>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
      >
        <ArrowDown size={20} />
      </motion.div>
    </motion.div>
  )
}

export const SectionTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
      className="text-5xl md:text-7xl font-bold mb-8 text-center"
    >
      {children}
    </motion.h2>
  )
}

export const SectionText = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true, margin: "-100px" }}
      className="text-xl md:text-2xl text-center max-w-3xl mx-auto mb-12 opacity-70"
    >
      {children}
    </motion.p>
  )
}

export const SectionButton = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      viewport={{ once: true, margin: "-100px" }}
      className="flex justify-center"
    >
      <Link
        href={href}
        className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-white/90 transition-colors duration-300"
      >
        {children}
      </Link>
    </motion.div>
  )
}

