"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import GeometricBackground from "./GeometricBackground"

export default function Hero() {
  return (
    <div className="relative isolate overflow-hidden min-h-[90vh] flex items-center">
      <GeometricBackground />

      <div className="mx-auto max-w-7xl px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="backdrop-blur-sm bg-background/30 p-8 rounded-2xl border border-white/10"
            >
              <motion.h1
                className="text-4xl md:text-6xl font-bold tracking-tight text-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="text-gradient">Lumion dev</span>
              </motion.h1>
              <motion.p
                className="mt-6 text-lg leading-8 text-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Innovative digital solutions for businesses, startups, and enterprises worldwide. We transform ideas
                into powerful digital experiences.
              </motion.p>
              <motion.div
                className="mt-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Link href="/#contact" className="apple-button">
                  Get Started <span aria-hidden="true">→</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative h-[400px] md:h-[500px] w-full">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-2xl blur opacity-30"></div>
              <div className="relative bg-background/5 backdrop-blur-sm rounded-2xl overflow-hidden h-full border border-white/10">
                <Image
                  src="/images/hero-image.png"
                  alt="Lumion dev digital solutions"
                  fill
                  className="object-cover mix-blend-luminosity opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent"></div>
              </div>
            </div>

            <motion.div
              className="absolute -bottom-6 -right-6 bg-background/80 backdrop-blur-md p-4 rounded-lg shadow-xl border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
                <p className="font-medium">Digital Innovation Partner</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
    </div>
  )
}

