"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Linkedin, Twitter, Mail } from "lucide-react"

const founders = [
  {
    name: "Murenzi Dan",
    role: "CEO & Technical Lead",
    image: "/placeholder-user.jpg",
    description: "Leading technical innovation and strategic direction",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "dan@lumiondev.com"
    }
  },
  {
    name: "Hirwa Hertier",
    role: "Creative Director",
    image: "/hertier-profile.jpg",
    description: "Driving creative vision and design excellence",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "hertier@lumiondev.com"
    }
  },
  {
    name: "Nsengiyumva Didier Junior",
    role: "Product Strategist",
    image: "/images/didier-profile.jpg",
    description: "Overseeing product development and client solutions",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "didier@lumiondev.com"
    }
  }
]

export default function AboutUs() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="container mx-auto">
        <motion.h2
          className="text-4xl font-bold mb-8 text-center text-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          About Us
        </motion.h2>
        <div className="max-w-3xl mx-auto mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-muted-foreground mb-6 text-center">
              At Lumion dev, we're passionate about creating innovative digital solutions that drive business growth.
              Founded with a vision to bridge the gap between technology and business needs, we've grown into a
              full-service digital agency serving clients globally.
            </p>
            <p className="text-muted-foreground mb-6 text-center">
              Our mission is to empower businesses with cutting-edge digital tools and strategies that enhance their
              online presence, streamline operations, and drive sustainable growth in an increasingly digital world.
            </p>
            <p className="text-muted-foreground text-center">
              What sets us apart is our holistic approach to digital transformation. We don't just build websites or run
              marketing campaigns—we create comprehensive digital ecosystems tailored to your unique business goals.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl font-bold text-foreground">Meet Our Founders</h3>
          <p className="mt-4 text-muted-foreground">The innovative minds behind Lumion dev</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {founders.map((founder, index) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="relative w-48 h-48 mb-6">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-primary/40 animate-pulse" />
                <div className="absolute inset-1 rounded-full overflow-hidden bg-background">
                  <Image
                    src={founder.image}
                    alt={founder.name}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-1">{founder.name}</h4>
              <p className="text-primary font-medium mb-2">{founder.role}</p>
              <p className="text-muted-foreground text-sm mb-4 text-center px-4">{founder.description}</p>
              <div className="flex space-x-4">
                <a href={founder.social.linkedin} className="text-muted-foreground hover:text-primary transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href={founder.social.twitter} className="text-muted-foreground hover:text-primary transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href={`mailto:${founder.social.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

