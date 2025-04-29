"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Redirect } from "next"

interface Shape {
  id: number
  x: number
  y: number
  size: number
  rotation: number
  type: "circle" | "square" | "triangle"
  delay: number
}

export default function GeometricBackground() {
  const [shapes, setShapes] = useState<Shape[]>([])
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  })

  const colors = [
    "rgba(59, 130, 246, 0.6)", // blue-500
    "rgba(99, 102, 241, 0.6)", // indigo-500
    "rgba(139, 92, 246, 0.6)", // purple-500
    "rgba(255, 255, 255, 0.6)", // pink-500
    "rgba(245, 245, 245, 0.6)", // sky-500
  ]

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const types: ("circle" | "square" | "triangle")[] = ["circle", "square", "triangle"]

    const generateShapes = () => {
      const newShapes: Shape[] = []
      const numShapes = Math.floor(windowSize.width / 100) // Responsive number of shapes

      for (let i = 0; i < numShapes; i++) {
        newShapes.push({
          id: i,
          x: Math.random() * windowSize.width,
          y: Math.random() * windowSize.height,
          size: 20 + Math.random() * 60,
          rotation: Math.random() * 360,
          type: types[Math.floor(Math.random() * types.length)],
          delay: Math.random() * 2,
        })
      }
      setShapes(newShapes)
    }

    generateShapes()
  }, [windowSize])

  const renderShape = (shape: Shape) => {
    const color = colors[Math.floor(Math.random() * colors.length)];
    switch (shape.type) {
      case "circle":
        return <circle cx={shape.size / 2} cy={shape.size / 2} r={shape.size / 2} fill={color} />
      case "square":
        return <rect width={shape.size} height={shape.size} fill={color} />
      case "triangle":
        return <polygon points={`${shape.size / 2},0 ${shape.size},${shape.size} 0,${shape.size}`} fill={color} />
      default:
        return null
    }
  }

  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute"
          style={{
            left: shape.x,
            top: shape.y,
            width: shape.size,
            height: shape.size,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 0.7,
            scale: 1,
            x: [0, Math.random() * 40 - 20, 0],
            y: [0, Math.random() * 40 - 20, 0],
            rotate: [shape.rotation, shape.rotation + (Math.random() > 0.5 ? 20 : -20), shape.rotation],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: shape.delay,
          }}
        >
          <svg width={shape.size} height={shape.size} viewBox={`0 0 ${shape.size} ${shape.size}`}>
            {renderShape(shape)}
          </svg>
        </motion.div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
    </div>
  )
}

