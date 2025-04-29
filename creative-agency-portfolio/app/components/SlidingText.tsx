"use client"

import { motion } from "framer-motion"

export default function SlidingText() {
  return (
    <div className="bg-background py-4 overflow-hidden border-y border-border/5">
      <div className="relative h-6 overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap gap-4 absolute"
          animate={{
            x: [0, -1000],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 15,
              ease: "linear",
            },
          }}
        >
          <span className="text-muted-foreground font-medium">Lumion Dev</span>
          <span className="text-primary">•</span>
          <span className="text-muted-foreground font-medium">Creative Solutions</span>
          <span className="text-primary">•</span>
          <span className="text-muted-foreground font-medium">Lumion Dev</span>
          <span className="text-primary">•</span>
          <span className="text-muted-foreground font-medium">Digital Excellence</span>
          <span className="text-primary">•</span>
          <span className="text-muted-foreground font-medium">Lumion Dev</span>
          <span className="text-primary">•</span>
          <span className="text-muted-foreground font-medium">Creative Solutions</span>
          <span className="text-primary">•</span>
          <span className="text-muted-foreground font-medium">Lumion Dev</span>
          <span className="text-primary">•</span>
          <span className="text-muted-foreground font-medium">Digital Excellence</span>
        </motion.div>
      </div>
    </div>
  )
} 