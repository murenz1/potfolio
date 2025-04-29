"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

export default function MinimalistBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Set mounted state
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drawTexture()
    }

    window.addEventListener("resize", updateCanvasSize)
    updateCanvasSize()

    // Draw subtle noise texture
    function drawTexture() {
      const imageData = ctx.createImageData(canvas.width, canvas.height)
      const data = imageData.data
      
      // Get the current theme
      const currentTheme = theme === 'system' ? systemTheme : theme

      for (let i = 0; i < data.length; i += 4) {
        // Generate subtle noise (very light gray variations)
        const value = currentTheme === 'dark' ? 10 + Math.random() * 10 : 245 + Math.random() * 10
        data[i] = value // R
        data[i + 1] = value // G
        data[i + 2] = value // B
        data[i + 3] = 10 // A (very transparent)
      }

      ctx.putImageData(imageData, 0, 0)
    }

    return () => {
      window.removeEventListener("resize", updateCanvasSize)
    }
  }, [theme, systemTheme, mounted])

  if (!mounted) {
    return null
  }

  // Get the current theme for the background color
  const currentTheme = theme === 'system' ? systemTheme : theme

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-30"
      style={{ backgroundColor: currentTheme === 'dark' ? 'black' : 'white' }}
    />
  )
}

