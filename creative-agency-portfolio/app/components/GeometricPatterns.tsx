"use client"

import { useEffect, useRef } from "react"

export default function GeometricPatterns() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drawPatterns()
    }

    window.addEventListener("resize", updateCanvasSize)
    updateCanvasSize()

    // Draw subtle geometric patterns
    function drawPatterns() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Set very light gray color
      ctx.strokeStyle = "rgba(200, 200, 200, 0.1)"
      ctx.lineWidth = 1

      // Draw grid pattern
      const gridSize = 40

      // Horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Draw some circles at intersections (randomly)
      ctx.fillStyle = "rgba(220, 220, 220, 0.1)"

      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          if (Math.random() > 0.95) {
            ctx.beginPath()
            ctx.arc(x, y, 3, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }
    }

    return () => {
      window.removeEventListener("resize", updateCanvasSize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
}

