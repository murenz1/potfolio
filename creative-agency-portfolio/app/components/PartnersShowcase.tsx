"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

const partners = [
  {
    name: "Norrsken Kigali",
    logo: "/placeholder.svg",
    description: "Innovation hub empowering entrepreneurs"
  },
  {
    name: "Haha Online",
    logo: "/placeholder.svg",
    description: "Leading e-commerce platform"
  },
  {
    name: "TechHub Rwanda",
    logo: "/placeholder.svg",
    description: "Technology innovation center"
  }
]

const testimonials = [
  {
    name: "David K.",
    text: "Lumion dev transformed our digital presence completely. Their innovative approach exceeded our expectations.",
    rating: 5
  },
  {
    name: "Sarah M.",
    text: "Working with Lumion dev was a game-changer for our business. Their expertise is unmatched.",
    rating: 5
  },
  {
    name: "Jean-Paul H.",
    text: "The team helped us launch our MVP in record time. Excellent work!",
    rating: 5
  }
]

const services = [
  {
    title: "Web Development",
    icon: "🌐",
    description: "Custom websites and web applications"
  },
  {
    title: "Mobile Apps",
    icon: "📱",
    description: "Native and cross-platform apps"
  },
  {
    title: "UI/UX Design",
    icon: "🎨",
    description: "User-centered design solutions"
  },
  {
    title: "Digital Marketing",
    icon: "📈",
    description: "Strategic marketing campaigns"
  }
]

export default function PartnersShowcase() {
  const [currentSection, setCurrentSection] = useState(0)
  const sections = ["Partners", "Services", "Testimonials"]
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrentSection((prev) => (prev + 1) % sections.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0
    })
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  const renderPartners = () => (
    <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
      {partners.map((partner) => (
        <motion.div
          key={partner.name}
          className="flex-shrink-0 w-60 bg-secondary/50 p-4 rounded-xl flex flex-col items-center"
        >
          <div className="relative w-24 h-24 mb-4 bg-background rounded-lg p-2">
            <Image
              src={partner.logo}
              alt={partner.name}
              fill
              className="object-contain p-2"
            />
          </div>
          <h4 className="text-lg font-semibold mb-2">{partner.name}</h4>
          <p className="text-sm text-muted-foreground text-center">{partner.description}</p>
        </motion.div>
      ))}
    </div>
  )

  const renderServices = () => (
    <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
      {services.map((service) => (
        <motion.div
          key={service.title}
          className="flex-shrink-0 w-48 bg-secondary/50 p-4 rounded-xl text-center"
        >
          <div className="text-3xl mb-3">{service.icon}</div>
          <h4 className="text-lg font-semibold mb-2">{service.title}</h4>
          <p className="text-sm text-muted-foreground">{service.description}</p>
        </motion.div>
      ))}
    </div>
  )

  const renderTestimonials = () => (
    <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
      {testimonials.map((testimonial) => (
        <motion.div
          key={testimonial.name}
          className="flex-shrink-0 w-72 bg-secondary/50 p-4 rounded-xl"
        >
          <div className="flex items-center justify-between mb-3">
            <p className="font-medium">{testimonial.name}</p>
            <div className="flex">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-primary text-primary" />
              ))}
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{testimonial.text}</p>
        </motion.div>
      ))}
    </div>
  )

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentSection((prev) => (prev + newDirection + sections.length) % sections.length)
  }

  return (
    <section className="py-12 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <motion.h2
            className="text-2xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {sections[currentSection]}
          </motion.h2>
          <div className="flex space-x-2">
            <button
              onClick={() => paginate(-1)}
              className="p-2 rounded-full bg-background/80 backdrop-blur-sm shadow-lg hover:bg-background pointer-events-auto transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => paginate(1)}
              className="p-2 rounded-full bg-background/80 backdrop-blur-sm shadow-lg hover:bg-background pointer-events-auto transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={sections[currentSection]}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 100, damping: 20, duration: 0.8 },
              opacity: { duration: 0.5 }
            }}
            className="w-full"
          >
            {currentSection === 0 && renderPartners()}
            {currentSection === 1 && renderServices()}
            {currentSection === 2 && renderTestimonials()}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
} 