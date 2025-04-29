"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion"
import Link from "next/link"
import RainingLetters from "./RainingLetters"
import { ArrowRight, Code, Cpu, Database, Globe } from "lucide-react"
import ThreeDBackgrounds from "./ThreeDBackgrounds"
import { Section, SectionTitle, SectionText, ScrollIndicator } from "./ScrollSections"

// Custom cursor component
const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === "A" || (e.target as HTMLElement).tagName === "BUTTON") {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseover", handleMouseOver)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseover", handleMouseOver)
    }
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 z-50 pointer-events-none mix-blend-difference"
      animate={{
        x: mousePosition.x - (isHovering ? 24 : 8),
        y: mousePosition.y - (isHovering ? 24 : 8),
        scale: isHovering ? 2.5 : 1,
      }}
      transition={{ type: "spring", mass: 0.1, stiffness: 800, damping: 30 }}
    >
      <div className="w-4 h-4 bg-white rounded-full" />
    </motion.div>
  )
}

// Text reveal animation component
const RevealText = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  return (
    <div className="overflow-hidden relative">
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay }}
        viewport={{ once: true, margin: "-100px" }}
      >
        {children}
      </motion.div>
    </div>
  )
}

// 3D Card component
const Card3D = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX
    const mouseY = e.clientY

    const rotateXValue = ((mouseY - centerY) / (rect.height / 2)) * 10
    const rotateYValue = ((centerX - mouseX) / (rect.width / 2)) * 10

    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative p-6 rounded-xl bg-black/30 backdrop-blur-sm border border-white/10 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      <div style={{ transform: "translateZ(20px)" }}>{children}</div>
    </motion.div>
  )
}

// Split text animation
const SplitTextAnimation = ({ text }: { text: string }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.03 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-7xl md:text-9xl font-bold text-white"
        >
          {char === " " ? <span>&nbsp;</span> : char}
        </motion.span>
      ))}
    </div>
  )
}

// Main component
export default function AdvancedDigitalExperience() {
  const [showRainingLetters, setShowRainingLetters] = useState(true)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [currentScene, setCurrentScene] = useState(0)
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 300], [1, 0.9])
  const springOpacity = useSpring(opacity, { stiffness: 100, damping: 30 })
  const springScale = useSpring(scale, { stiffness: 100, damping: 30 })

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100 && !hasScrolled) {
        setHasScrolled(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [hasScrolled])

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      if (latest > 800 && showRainingLetters) {
        setShowRainingLetters(false)
      } else if (latest <= 800 && !showRainingLetters) {
        setShowRainingLetters(true)
      }

      // Change 3D background based on scroll position
      if (latest < 1000) {
        setCurrentScene(0)
      } else if (latest < 2000) {
        setCurrentScene(1)
      } else {
        setCurrentScene(2)
      }
    })

    return () => unsubscribe()
  }, [scrollY, showRainingLetters])

  return (
    <div className="bg-black text-white">
      <CustomCursor />
      <ThreeDBackgrounds sceneIndex={currentScene} />

      {/* First section - Raining Letters */}
      <motion.section style={{ opacity: springOpacity, scale: springScale }} className="h-screen sticky top-0 z-10">
        <AnimatePresence>{showRainingLetters && <RainingLetters />}</AnimatePresence>
        <ScrollIndicator />
      </motion.section>

      {/* Content sections */}
      <div className="relative z-20">
        {/* Transition section */}
        <Section id="intro" className="h-screen">
          <SectionTitle>Digital Excellence</SectionTitle>
          <SectionText>
            Scroll to discover how we're redefining digital experiences with innovative solutions.
          </SectionText>
        </Section>

        {/* Services section */}
        <Section id="services" className="min-h-screen">
          <SectionTitle>Our Expertise</SectionTitle>
          <SectionText>
            We combine creativity, technology, and strategy to build exceptional digital solutions.
          </SectionText>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            <Card3D className="h-[300px]">
              <div className="h-full flex flex-col justify-between">
                <div>
                  <Globe className="w-10 h-10 mb-4 text-white" />
                  <h3 className="text-2xl font-bold mb-2">Digital Marketing</h3>
                  <p className="text-white/70">Strategic campaigns that drive traffic, engagement, and conversions.</p>
                </div>
                <motion.div whileHover={{ x: 5 }} className="flex items-center text-white/80">
                  <span>Learn more</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </motion.div>
              </div>
            </Card3D>

            <Card3D className="h-[300px]">
              <div className="h-full flex flex-col justify-between">
                <div>
                  <Code className="w-10 h-10 mb-4 text-white" />
                  <h3 className="text-2xl font-bold mb-2">Software Development</h3>
                  <p className="text-white/70">Custom solutions built with cutting-edge technologies.</p>
                </div>
                <motion.div whileHover={{ x: 5 }} className="flex items-center text-white/80">
                  <span>Learn more</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </motion.div>
              </div>
            </Card3D>

            <Card3D className="h-[300px]">
              <div className="h-full flex flex-col justify-between">
                <div>
                  <Database className="w-10 h-10 mb-4 text-white" />
                  <h3 className="text-2xl font-bold mb-2">E-Commerce</h3>
                  <p className="text-white/70">Powerful online stores that deliver exceptional shopping experiences.</p>
                </div>
                <motion.div whileHover={{ x: 5 }} className="flex items-center text-white/80">
                  <span>Learn more</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </motion.div>
              </div>
            </Card3D>

            <Card3D className="h-[300px]">
              <div className="h-full flex flex-col justify-between">
                <div>
                  <Cpu className="w-10 h-10 mb-4 text-white" />
                  <h3 className="text-2xl font-bold mb-2">AI & Automation</h3>
                  <p className="text-white/70">
                    Intelligent systems that streamline operations and enhance productivity.
                  </p>
                </div>
                <motion.div whileHover={{ x: 5 }} className="flex items-center text-white/80">
                  <span>Learn more</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </motion.div>
              </div>
            </Card3D>
          </div>
        </Section>

        {/* Process section */}
        <Section id="process" className="min-h-screen">
          <SectionTitle>Our Process</SectionTitle>
          <SectionText>A methodical approach to delivering exceptional results for every project.</SectionText>

          <div className="mt-16 relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/20 transform -translate-x-1/2"></div>

            {[
              {
                number: "01",
                title: "Discovery",
                description: "We dive deep to understand your business, goals, and challenges.",
              },
              {
                number: "02",
                title: "Strategy",
                description: "We develop a comprehensive plan tailored to your specific needs.",
              },
              {
                number: "03",
                title: "Design",
                description: "We create intuitive, engaging experiences that captivate your audience.",
              },
              {
                number: "04",
                title: "Development",
                description: "We build robust, scalable solutions using cutting-edge technologies.",
              },
              {
                number: "05",
                title: "Launch",
                description: "We ensure a smooth deployment and provide ongoing support.",
              },
            ].map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`flex items-start mb-16 relative ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                <div className="w-full md:w-1/2 flex justify-center md:justify-end md:pr-12">
                  <div className="relative">
                    <div className="absolute -left-2 top-3 w-4 h-4 bg-white rounded-full z-10"></div>
                    <div className="text-6xl font-bold text-white/10">{step.number}</div>
                    <h3 className="text-2xl font-bold mt-2">{step.title}</h3>
                  </div>
                </div>
                <div className="w-full md:w-1/2 md:pl-12 mt-4 md:mt-0">
                  <p className="text-white/70">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Final CTA section */}
        <Section id="cta" className="min-h-screen">
          <SplitTextAnimation text="INNOVATE" />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl text-white/70 mt-8 mb-12 text-center"
          >
            Ready to transform your business with cutting-edge digital solutions?
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-6"
          >
            <Link
              href="/#services"
              className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-white/90 transition-colors duration-300"
            >
              Explore Our Services
            </Link>
            <Link
              href="/#contact"
              className="px-8 py-4 bg-transparent border-2 border-white/20 text-white rounded-full hover:border-white/40 transition-colors duration-300"
            >
              Contact Us
            </Link>
          </motion.div>
        </Section>
      </div>
    </div>
  )
}

