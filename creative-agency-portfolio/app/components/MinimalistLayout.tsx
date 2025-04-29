"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface MinimalistSectionProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function MinimalistSection({ children, className = "", delay = 0 }: MinimalistSectionProps) {
  return (
    <motion.section
      className={`min-h-screen flex items-center justify-center py-20 px-4 ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1, delay }}
      viewport={{ once: true }}
    >
      <div className="max-w-4xl w-full mx-auto">{children}</div>
    </motion.section>
  )
}

interface MinimalistHeadingProps {
  children: ReactNode
  className?: string
}

export function MinimalistHeading({ children, className = "" }: MinimalistHeadingProps) {
  return (
    <motion.h2
      className={`text-4xl md:text-6xl font-light tracking-tight text-gray-900 mb-16 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.h2>
  )
}

interface MinimalistTextProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function MinimalistText({ children, className = "", delay = 0.2 }: MinimalistTextProps) {
  return (
    <motion.p
      className={`text-lg md:text-xl text-gray-600 mb-12 leading-relaxed ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
    >
      {children}
    </motion.p>
  )
}

interface MinimalistGridProps {
  children: ReactNode
  columns?: number
  className?: string
}

export function MinimalistGrid({ children, columns = 2, className = "" }: MinimalistGridProps) {
  return <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-12 ${className}`}>{children}</div>
}

interface MinimalistCardProps {
  children: ReactNode
  className?: string
}

export function MinimalistCard({ children, className = "" }: MinimalistCardProps) {
  return (
    <motion.div
      className={`bg-white p-8 rounded-sm shadow-sm ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  )
}

