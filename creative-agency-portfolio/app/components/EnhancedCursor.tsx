"use client"

import { useState, useEffect } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export default function EnhancedCursor() {
  const [cursorText, setCursorText] = useState("")
  const [cursorVariant, setCursorVariant] = useState("default")
  const [isVisible, setIsVisible] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setIsVisible(true)
    }

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      if (target.tagName === "A" || target.tagName === "BUTTON" || target.closest("a") || target.closest("button")) {
        setCursorVariant("button")
        setCursorText("Click")
      } else if (target.dataset.cursor === "explore") {
        setCursorVariant("explore")
        setCursorText("Explore")
      } else if (target.dataset.cursor === "reveal") {
        setCursorVariant("reveal")
        setCursorText("Reveal")
      } else if (target.dataset.cursor === "scroll") {
        setCursorVariant("scroll")
        setCursorText("Scroll")
      } else {
        setCursorVariant("default")
        setCursorText("")
      }
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener("mousemove", moveCursor)
    document.addEventListener("mouseover", handleMouseEnter)
    document.addEventListener("mouseout", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      document.removeEventListener("mouseover", handleMouseEnter)
      document.removeEventListener("mouseout", handleMouseLeave)
    }
  }, [cursorX, cursorY])

  const variants = {
    default: {
      width: 32,
      height: 32,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.5)",
      x: "-50%",
      y: "-50%",
    },
    button: {
      width: 80,
      height: 80,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      mixBlendMode: "difference",
      x: "-50%",
      y: "-50%",
    },
    explore: {
      width: 100,
      height: 100,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      mixBlendMode: "difference",
      x: "-50%",
      y: "-50%",
    },
    reveal: {
      width: 120,
      height: 120,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      mixBlendMode: "difference",
      x: "-50%",
      y: "-50%",
    },
    scroll: {
      width: 60,
      height: 60,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      mixBlendMode: "difference",
      x: "-50%",
      y: "-50%",
    },
  }

  return (
    <motion.div
      className="fixed top-0 left-0 z-50 flex items-center justify-center rounded-full pointer-events-none"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
      animate={cursorVariant}
      variants={variants}
      initial="default"
    >
      {cursorText && <span className="text-xs font-medium text-white select-none">{cursorText}</span>}
    </motion.div>
  )
}

