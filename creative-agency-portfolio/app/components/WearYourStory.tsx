"use client"

import { motion } from "framer-motion"

export default function TechStack() {
  return (
    <section className="bg-background py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">Our Tech Stack</h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12">
            We leverage cutting-edge technologies to build powerful, scalable, and efficient digital solutions.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <TechItem name="JavaScript" icon="JS" />
            <TechItem name="React.js" icon="⚛️" />
            <TechItem name="Next.js" icon="N" />
            <TechItem name="Node.js" icon="🟢" />
            <TechItem name="GitHub" icon="🐙" />
            <TechItem name="Cursor" icon="📝" />
            <TechItem name="v0 by Vercel" icon="v0" />
            <TechItem name="InVidio" icon="🎬" />
          </div>

          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <a href="#contact" className="apple-button inline-flex items-center">
              Start Your Project
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function TechItem({ name, icon }: { name: string; icon: string }) {
  return (
    <motion.div
      className="p-6 bg-background rounded-xl shadow-md border border-primary/10 hover-lift"
      whileHover={{ scale: 1.05 }}
    >
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-lg font-medium">{name}</h3>
    </motion.div>
  )
}

