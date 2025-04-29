"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface ShapeProps {
  className?: string
}

export function FloatingCircle({ className = "" }: ShapeProps) {
  return (
    <motion.div
      className={`absolute rounded-full ${className}`}
      animate={{
        y: ["0%", "10%", "0%"],
        x: ["0%", "5%", "0%"],
      }}
      transition={{
        duration: 5,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    />
  )
}

export function FloatingSquare({ className = "" }: ShapeProps) {
  return (
    <motion.div
      className={`absolute rounded-md ${className}`}
      animate={{
        rotate: [0, 10, 0],
        y: ["0%", "-10%", "0%"],
        x: ["0%", "-5%", "0%"],
      }}
      transition={{
        duration: 7,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    />
  )
}

export function FloatingTriangle({ className = "" }: ShapeProps) {
  return (
    <motion.div
      className={`absolute ${className}`}
      style={{
        clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
      }}
      animate={{
        rotate: [0, -10, 0],
        y: ["0%", "10%", "0%"],
        x: ["0%", "5%", "0%"],
      }}
      transition={{
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    />
  )
}

export default function FloatingShapes() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      <FloatingCircle className="w-64 h-64 bg-blue-500/10 blur-3xl -top-20 -left-20" />
      <FloatingSquare className="w-72 h-72 bg-purple-500/10 blur-3xl top-1/3 -right-20" />
      <FloatingTriangle className="w-96 h-96 bg-pink-500/10 blur-3xl bottom-0 left-1/4" />
      <FloatingCircle className="w-80 h-80 bg-indigo-500/10 blur-3xl bottom-1/4 right-1/4" />
    </div>
  )
}

