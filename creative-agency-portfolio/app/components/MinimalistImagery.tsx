"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

// Abstract shapes for minimalist design
const MinimalistShape = ({ className }: { className?: string }) => {
  return (
    <motion.div
      className={`absolute bg-gray-100 rounded-full ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    />
  )
}

export default function MinimalistImagery() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Abstract minimalist shapes */}
      <MinimalistShape className="w-96 h-96 top-[-10%] left-[-5%] opacity-20" />
      <MinimalistShape className="w-64 h-64 bottom-[-5%] right-[-5%] opacity-15" />
      <MinimalistShape className="w-48 h-48 top-[30%] right-[10%] opacity-10" />

      {/* High-quality desaturated imagery */}
      <div className="absolute top-[20%] right-[5%] w-64 h-64 opacity-20 overflow-hidden rounded-full">
        <Image
          src="/placeholder.svg?height=400&width=400"
          alt="Minimalist design element"
          width={400}
          height={400}
          className="object-cover grayscale"
        />
      </div>

      <div className="absolute bottom-[15%] left-[8%] w-48 h-48 opacity-15 overflow-hidden rounded-full">
        <Image
          src="/placeholder.svg?height=400&width=400"
          alt="Minimalist design element"
          width={400}
          height={400}
          className="object-cover grayscale"
        />
      </div>
    </div>
  )
}

