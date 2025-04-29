"use client"

import type React from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import { motion } from "framer-motion"

interface Character {
  char: string
  x: number
  y: number
  speed: number
  color?: string
  size?: number
}

class TextScramble {
  el: HTMLElement
  chars: string
  queue: Array<{
    from: string
    to: string
    start: number
    end: number
    char?: string
  }>
  frame: number
  frameRequest: number
  resolve: (value: void | PromiseLike<void>) => void

  constructor(el: HTMLElement) {
    this.el = el
    this.chars = "!<>-_\\/[]{}—=+*^?#"
    this.queue = []
    this.frame = 0
    this.frameRequest = 0
    this.resolve = () => {}
    this.update = this.update.bind(this)
  }

  setText(newText: string) {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise<void>((resolve) => (this.resolve = resolve))
    this.queue = []

    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ""
      const to = newText[i] || ""
      const start = Math.floor(Math.random() * 40)
      const end = start + Math.floor(Math.random() * 40)
      this.queue.push({ from, to, start, end })
    }

    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
  }

  update() {
    let output = ""
    let complete = 0

    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i]
      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.chars[Math.floor(Math.random() * this.chars.length)]
          this.queue[i].char = char
        }
        output += `<span class="dud">${char}</span>`
      } else {
        output += from
      }
    }

    this.el.innerHTML = output
    if (complete === this.queue.length) {
      this.resolve()
    } else {
      this.frameRequest = requestAnimationFrame(this.update)
      this.frame++
    }
  }
}

const ScrambledTitle: React.FC = () => {
  const elementRef = useRef<HTMLHeadingElement>(null)
  const scramblerRef = useRef<TextScramble | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (elementRef.current && !scramblerRef.current) {
      scramblerRef.current = new TextScramble(elementRef.current)
      setMounted(true)
    }
  }, [])

  useEffect(() => {
    if (mounted && scramblerRef.current) {
      // Updated phrases with psychological triggers
      const phrases = [
        "Lumion dev",
        "Digital Innovation",
        "Transform Your Reality",
        "Unlock Your Potential",
        "Redefine What's Possible",
        "The Future Is Now",
      ]

      let counter = 0
      const next = () => {
        if (scramblerRef.current) {
          scramblerRef.current.setText(phrases[counter]).then(() => {
            setTimeout(next, 2000)
          })
          counter = (counter + 1) % phrases.length
        }
      }

      next()
    }
  }, [mounted])

  return (
    <h1
      ref={elementRef}
      className="text-white text-6xl font-bold tracking-wider justify-center"
      style={{ fontFamily: "monospace" }}
    >
      DIGITAL INNOVATION
    </h1>
  )
}

// Floating logo with psychological impact
const FloatingLogo: React.FC = () => {
  return (
    <motion.div
      className="absolute top-8 left-1/2 transform -translate-x-1/2 z-30"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, delay: 1 }}
    >
      <div className="text-3xl font-bold text-white">
        Lumion<span className="text-white/70 font-light">dev</span>
      </div>
    </motion.div>
  )
}

// Interactive code snippets with psychological triggers
const CodeSnippet: React.FC<{ delay: number; position: { x: string; y: string } }> = ({ delay, position }) => {
  const snippets = [
    "function transformYourBusiness() {",
    "const results = await optimize(yourPresence);",
    "return <ExponentialGrowth strategy={digital} />",
    "while(competitors.sleep()) { you.grow() }",
    "export default DigitalDomination;",
  ]

  const snippet = snippets[Math.floor(Math.random() * snippets.length)]

  return (
    <motion.div
      className="absolute text-white/70 font-mono text-sm"
      style={{ left: position.x, top: position.y }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.8, 0.5] }}
      transition={{ duration: 2, delay, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
    >
      {snippet}
    </motion.div>
  )
}

const RainingLetters: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([])
  const [activeIndices, setActiveIndices] = useState<Set<number>>(new Set())
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const createCharacters = useCallback(() => {
    const allChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?"
    const charCount = 300
    const newCharacters: Character[] = []

    // Add company-specific characters with psychological impact
    const specialChars = "LUMIONDEVELOPMENT"
    const specialCharCount = 20

    // Regular characters
    for (let i = 0; i < charCount; i++) {
      newCharacters.push({
        char: allChars[Math.floor(Math.random() * allChars.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        speed: 0.1 + Math.random() * 0.3,
      })
    }

    // Special company characters (slightly larger and with custom color)
    for (let i = 0; i < specialCharCount; i++) {
      newCharacters.push({
        char: specialChars[Math.floor(Math.random() * specialChars.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        speed: 0.1 + Math.random() * 0.2,
        color: "#ffffff",
        size: 2.2,
      })
    }

    return newCharacters
  }, [])

  useEffect(() => {
    setCharacters(createCharacters())
  }, [createCharacters])

  useEffect(() => {
    const updateActiveIndices = () => {
      const newActiveIndices = new Set<number>()
      const numActive = Math.floor(Math.random() * 3) + 3
      for (let i = 0; i < numActive; i++) {
        newActiveIndices.add(Math.floor(Math.random() * characters.length))
      }
      setActiveIndices(newActiveIndices)
    }

    const flickerInterval = setInterval(updateActiveIndices, 50)
    return () => clearInterval(flickerInterval)
  }, [characters.length])

  useEffect(() => {
    let animationFrameId: number

    const updatePositions = () => {
      setCharacters((prevChars) =>
        prevChars.map((char) => ({
          ...char,
          y: char.y + char.speed,
          ...(char.y >= 100 && {
            y: -5,
            x: Math.random() * 100,
            char: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?"[
              Math.floor(Math.random() * "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?".length)
            ],
          }),
        })),
      )
      animationFrameId = requestAnimationFrame(updatePositions)
    }

    animationFrameId = requestAnimationFrame(updatePositions)
    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  // Handle mouse movement for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Create a ripple effect around the mouse
  const createRippleEffect = () => {
    if (mousePosition.x === 0 && mousePosition.y === 0) return null

    return (
      <motion.div
        className="absolute rounded-full border border-white/30 pointer-events-none z-20"
        style={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          translateX: "-50%",
          translateY: "-50%",
        }}
        initial={{ width: 0, height: 0, opacity: 1 }}
        animate={{ width: 200, height: 200, opacity: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />
    )
  }

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden">
      {/* Floating Logo */}
      <FloatingLogo />

      {/* Code Snippets with psychological triggers */}
      <CodeSnippet delay={1.5} position={{ x: "15%", y: "20%" }} />
      <CodeSnippet delay={2.2} position={{ x: "75%", y: "30%" }} />
      <CodeSnippet delay={3.1} position={{ x: "25%", y: "70%" }} />
      <CodeSnippet delay={4.0} position={{ x: "65%", y: "80%" }} />

      {/* Mouse Ripple Effect */}
      {createRippleEffect()}

      {/* Title */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <ScrambledTitle />
      </div>

      {/* Raining Characters */}
      {characters.map((char, index) => (
        <span
          key={index}
          className={`absolute text-xs transition-colors duration-100 ${
            activeIndices.has(index)
              ? "text-white text-base scale-125 z-10 font-bold animate-pulse"
              : char.color
                ? ""
                : "text-white/40 font-light"
          }`}
          style={{
            left: `${char.x}%`,
            top: `${char.y}%`,
            transform: `translate(-50%, -50%) ${activeIndices.has(index) ? "scale(1.25)" : "scale(1)"}`,
            textShadow: activeIndices.has(index)
              ? "0 0 8px rgba(255,255,255,0.8), 0 0 12px rgba(255,255,255,0.4)"
              : "none",
            opacity: activeIndices.has(index) ? 1 : char.color ? 0.8 : 0.4,
            transition: "color 0.1s, transform 0.1s, text-shadow 0.1s",
            willChange: "transform, top",
            fontSize: char.size ? `${char.size}rem` : "1.8rem",
            color: char.color || "inherit",
          }}
        >
          {char.char}
        </span>
      ))}

      {/* Ambient Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black opacity-50 pointer-events-none"></div>

      {/* Bottom Info with psychological triggers */}
      <motion.div
        className="absolute bottom-8 left-0 right-0 text-center text-white/70 font-mono text-sm z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 2 }}
      >
        Transform • Innovate • Dominate • Succeed
      </motion.div>

      <style jsx global>{`
        .dud {
          color: white;
          opacity: 0.7;
        }
      `}</style>
    </div>
  )
}

export default RainingLetters

