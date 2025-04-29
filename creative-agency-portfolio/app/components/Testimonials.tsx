"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const testimonials = [
  {
    quote:
      "Lumion dev transformed our online presence completely. Their strategic approach to digital marketing and custom software development helped us achieve a 200% increase in conversions.",
    author: "Sarah Johnson",
    position: "CEO, TechGrowth Inc.",
    image: "/images/testimonial-1.png",
  },
  {
    quote:
      "The e-commerce solution Lumion dev built for us revolutionized our business model. Their team's expertise in both development and marketing created a seamless shopping experience that our customers love.",
    author: "Michael Chen",
    position: "Founder, EcoShop Global",
    image: "/images/testimonial-2.png",
  },
  {
    quote:
      "Working with Lumion dev on our AI chatbot implementation was a game-changer. Not only did they deliver an exceptional product, but their ongoing support has been invaluable to our growth.",
    author: "Priya Sharma",
    position: "CTO, InnovateTech Solutions",
    image: "/images/testimonial-3.png",
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="container mx-auto">
        <motion.h2
          className="text-5xl font-black mb-16 text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          What Our Clients Say
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              className="bg-gray-800 p-6 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <p className="text-gray-300 mb-4">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.author}
                  width={50}
                  height={50}
                  className="rounded-full mr-4"
                />
                <div>
                  <p className="font-bold text-white">{testimonial.author}</p>
                  <p className="text-gray-400">{testimonial.position}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

