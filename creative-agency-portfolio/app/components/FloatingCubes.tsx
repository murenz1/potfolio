"use client"

import { useRef, useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"

// Define the Cube class before it's used
class Cube {
  x: number
  y: number
  size: number
  rotation: number
  rotationSpeed: number
  speedX: number
  speedY: number

  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = Math.random() * canvasWidth
    this.y = Math.random() * canvasHeight
    this.size = Math.random() * 40 + 20 // Increased size
    this.rotation = Math.random() * Math.PI * 2
    this.rotationSpeed = (Math.random() - 0.5) * 0.04 // Doubled rotation speed
    this.speedX = (Math.random() - 0.5) * 2 // Doubled movement speed
    this.speedY = (Math.random() - 0.5) * 2 // Doubled movement speed
  }

  update(mouse: { x: number; y: number }, canvas: HTMLCanvasElement) {
    // Move cubes
    this.x += this.speedX
    this.y += this.speedY
    this.rotation += this.rotationSpeed

    // Boundary check
    if (this.x > canvas.width + this.size) this.x = -this.size
    if (this.x < -this.size) this.x = canvas.width + this.size
    if (this.y > canvas.height + this.size) this.y = -this.size
    if (this.y < -this.size) this.y = canvas.height + this.size

    // Mouse interaction - increased effect radius and strength
    const dx = mouse.x - this.x
    const dy = mouse.y - this.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance < 200) { // Increased interaction radius
      const angle = Math.atan2(dy, dx)
      this.speedX += Math.cos(angle) * 0.2 // Doubled effect strength
      this.speedY += Math.sin(angle) * 0.2
      this.rotationSpeed += 0.02 // Doubled rotation effect
    }

    // Limit speed - increased max speed
    const maxSpeed = 3
    const currentSpeed = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY)
    if (currentSpeed > maxSpeed) {
      this.speedX = (this.speedX / currentSpeed) * maxSpeed
      this.speedY = (this.speedY / currentSpeed) * maxSpeed
    }

    // Dampen rotation less for more persistent spinning
    this.rotationSpeed *= 0.995
  }

  draw(ctx: CanvasRenderingContext2D, isDark: boolean) {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.rotation)

    // Draw cube (wireframe) - theme-aware colors
    ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)"
    ctx.lineWidth = 1.5
    ctx.beginPath()

    // Front face
    const halfSize = this.size / 2
    ctx.moveTo(-halfSize, -halfSize)
    ctx.lineTo(halfSize, -halfSize)
    ctx.lineTo(halfSize, halfSize)
    ctx.lineTo(-halfSize, halfSize)
    ctx.lineTo(-halfSize, -halfSize)

    // Back face connections
    ctx.moveTo(-halfSize * 0.7, -halfSize * 0.7)
    ctx.lineTo(halfSize * 0.7, -halfSize * 0.7)
    ctx.lineTo(halfSize * 0.7, halfSize * 0.7)
    ctx.lineTo(-halfSize * 0.7, halfSize * 0.7)
    ctx.lineTo(-halfSize * 0.7, -halfSize * 0.7)

    // Connect front to back
    ctx.moveTo(-halfSize, -halfSize)
    ctx.lineTo(-halfSize * 0.7, -halfSize * 0.7)

    ctx.moveTo(halfSize, -halfSize)
    ctx.lineTo(halfSize * 0.7, -halfSize * 0.7)

    ctx.moveTo(halfSize, halfSize)
    ctx.lineTo(halfSize * 0.7, halfSize * 0.7)

    ctx.moveTo(-halfSize, halfSize)
    ctx.lineTo(-halfSize * 0.7, halfSize * 0.7)

    ctx.stroke()
    ctx.restore()
  }
}

export default function FloatingCubes() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const { theme, systemTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const renderBackground = pathname !== "/" && mounted

  useEffect(() => {
    if (!renderBackground) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let cubes: Cube[] = []

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initCubes()
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    // Mouse interaction
    const mouse = { x: 0, y: 0 }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    window.addEventListener("mousemove", handleMouseMove)

    function initCubes() {
      cubes = []
      if (!canvas) return;
      const numberOfCubes = Math.min(Math.floor((canvas.width * canvas.height) / 30000), 40) // Increased number of cubes

      for (let i = 0; i < numberOfCubes; i++) {
        cubes.push(new Cube(canvas.width, canvas.height))
      }
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Determine if dark mode is active
      const currentTheme = theme === 'system' ? systemTheme : theme
      const isDark = currentTheme === 'dark'

      for (let i = 0; i < cubes.length; i++) {
        cubes[i].update(mouse, canvas)
        cubes[i].draw(ctx, isDark)
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [pathname, renderBackground, theme, systemTheme])

  if (!renderBackground) return null

  // Get current theme for background color
  const currentTheme = theme === 'system' ? systemTheme : theme
  const isDark = currentTheme === 'dark'

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 -z-10 opacity-50"
      style={{ backgroundColor: isDark ? 'black' : 'white' }}
    />
  )
}

