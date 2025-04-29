"use client"

import { useRef, useEffect } from "react"

interface Point {
  x: number
  y: number
  alpha: number
  size: number
}

export default function MouseTrail() {
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
    }

    window.addEventListener("resize", updateCanvasSize)
    updateCanvasSize()

    // Mouse trail points
    const points: Point[] = []
    const maxPoints = 50
    let mouseX = 0
    let mouseY = 0
    let isMouseMoving = false
    let lastMouseMoveTime = 0

    const addPoint = (x: number, y: number) => {
      points.push({
        x,
        y,
        alpha: 1,
        size: Math.random() * 2 + 1,
      })

      if (points.length > maxPoints) {
        points.shift()
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      isMouseMoving = true
      lastMouseMoveTime = Date.now()

      addPoint(mouseX, mouseY)
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Fade out points
      for (let i = 0; i < points.length; i++) {
        points[i].alpha -= 0.02
        if (points[i].alpha < 0) points[i].alpha = 0
      }

      // Draw trail
      for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i]
        const p2 = points[i + 1]

        if (p1.alpha <= 0 || p2.alpha <= 0) continue

        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)

        const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y)
        gradient.addColorStop(0, `rgba(255, 255, 255, ${p1.alpha * 0.5})`)
        gradient.addColorStop(1, `rgba(255, 255, 255, ${p2.alpha * 0.5})`)

        ctx.strokeStyle = gradient
        ctx.lineWidth = (p1.size + p2.size) / 2
        ctx.stroke()
      }

      // Check if mouse has stopped moving
      if (isMouseMoving && Date.now() - lastMouseMoveTime > 100) {
        isMouseMoving = false
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", updateCanvasSize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-30" />
}

