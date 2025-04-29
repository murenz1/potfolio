"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

export default function InteractiveGrid() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const cells: HTMLDivElement[] = Array.from(container.querySelectorAll(".grid-cell"))

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top

      cells.forEach((cell) => {
        const cellRect = cell.getBoundingClientRect()
        const cellCenterX = cellRect.left + cellRect.width / 2 - rect.left
        const cellCenterY = cellRect.top + cellRect.height / 2 - rect.top

        const distanceX = mouseX - cellCenterX
        const distanceY = mouseY - cellCenterY
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

        const maxDistance = 150
        const scale = Math.max(0, 1 - distance / maxDistance)

        cell.style.transform = `scale(${1 + scale * 0.3})`
        cell.style.opacity = `${0.3 + scale * 0.7}`
        cell.style.filter = `blur(${(1 - scale) * 2}px)`
      })
    }

    container.addEventListener("mousemove", handleMouseMove)

    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div ref={containerRef} className="w-full h-[40vh] relative overflow-hidden" data-cursor="explore">
      <div className="absolute inset-0 grid grid-cols-10 grid-rows-5 gap-1">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="grid-cell bg-white/10 rounded-md transition-all duration-200"
            style={{ opacity: 0.3 }}
          />
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.p
          className="text-white text-xl md:text-3xl font-bold z-10 text-center px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Move your cursor to interact with our digital fabric
        </motion.p>
      </div>
    </div>
  )
}

