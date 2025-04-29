"use client"

import { motion } from "framer-motion"
import { Code, Megaphone, ShoppingCart, Bot } from "lucide-react"

const services = [
  {
    icon: <Megaphone className="w-12 h-12 mb-4 text-primary" />,
    title: "Digital Marketing",
    description:
      "SEO, social media marketing, content strategies, and paid advertising campaigns that drive traffic and conversions.",
  },
  {
    icon: <Code className="w-12 h-12 mb-4 text-primary" />,
    title: "Software Development",
    description:
      "Custom software, mobile apps, and web development using React, Next.js, and other cutting-edge technologies.",
  },
  {
    icon: <ShoppingCart className="w-12 h-12 mb-4 text-primary" />,
    title: "E-Commerce Solutions",
    description:
      "Online store development, payment integration, and hyperlocal commerce solutions for modern businesses.",
  },
  {
    icon: <Bot className="w-12 h-12 mb-4 text-primary" />,
    title: "AI & Automation",
    description: "AI chatbots, automated marketing tools, and data analytics solutions that streamline operations.",
  },
]

export default function Services() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="container mx-auto">
        <motion.h2
          className="text-4xl font-bold mb-16 text-center text-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Our Services
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="bg-secondary p-6 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              {service.icon}
              <h3 className="text-xl font-bold mb-2 text-foreground">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

