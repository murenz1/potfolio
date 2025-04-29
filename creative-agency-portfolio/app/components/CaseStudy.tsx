"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ChevronRight } from "lucide-react"

const caseStudies = [
  {
    id: 1,
    title: "E-Commerce Transformation for RetailPlus",
    challenge:
      "RetailPlus, a traditional brick-and-mortar retailer with 15+ physical stores, needed to rapidly transition to e-commerce during the pandemic.",
    solution:
      "We developed a comprehensive e-commerce platform with inventory management, payment processing, and delivery logistics integration.",
    results: [
      "200% increase in online sales within 6 months",
      "35% reduction in operational costs",
      "Customer retention rate improved by 28%",
    ],
    imageUrl: "/placeholder.svg?height=600&width=800",
    category: "E-Commerce",
  },
  {
    id: 2,
    title: "AI Chatbot Implementation for FinServe",
    challenge:
      "FinServe, a financial services provider, struggled with high customer service costs and long response times.",
    solution:
      "We developed a custom AI chatbot that could handle 80% of common customer inquiries and seamlessly escalate complex issues to human agents.",
    results: [
      "40% reduction in customer service costs",
      "Average response time decreased from 15 minutes to instant",
      "Customer satisfaction scores increased by 22%",
    ],
    imageUrl: "/placeholder.svg?height=600&width=800",
    category: "AI Solutions",
  },
  {
    id: 3,
    title: "Digital Marketing Campaign for GreenTech",
    challenge:
      "GreenTech, an eco-friendly product manufacturer, needed to increase brand awareness and market penetration in a competitive space.",
    solution:
      "We created an integrated digital marketing strategy including SEO, content marketing, and targeted social media campaigns.",
    results: [
      "350% increase in organic traffic within 6 months",
      "15,000+ new leads generated",
      "ROI of 320% on marketing spend",
    ],
    imageUrl: "/placeholder.svg?height=600&width=800",
    category: "Digital Marketing",
  },
]

export default function CaseStudy() {
  const [activeCase, setActiveCase] = useState(0)

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Case Studies</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Real results for real businesses. See how we've helped our clients succeed.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {caseStudies.map((study, index) => (
            <button
              key={study.id}
              onClick={() => setActiveCase(index)}
              className={`p-4 text-left rounded-lg transition-all ${
                activeCase === index ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-secondary/80"
              }`}
            >
              <h3 className="font-medium mb-1">{study.title}</h3>
              <p className={`text-sm ${activeCase === index ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                {study.category}
              </p>
            </button>
          ))}
        </div>

        <motion.div
          key={activeCase}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 gap-8 bg-background rounded-xl p-8 shadow-lg border border-primary/10"
        >
          <div>
            <Image
              src={caseStudies[activeCase].imageUrl || "/placeholder.svg"}
              alt={caseStudies[activeCase].title}
              width={600}
              height={400}
              className="rounded-lg object-cover w-full h-full"
            />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">{caseStudies[activeCase].title}</h3>

            <div className="mb-4">
              <h4 className="text-lg font-semibold text-primary mb-2">The Challenge</h4>
              <p className="text-muted-foreground">{caseStudies[activeCase].challenge}</p>
            </div>

            <div className="mb-4">
              <h4 className="text-lg font-semibold text-primary mb-2">Our Solution</h4>
              <p className="text-muted-foreground">{caseStudies[activeCase].solution}</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-primary mb-2">The Results</h4>
              <ul className="space-y-2">
                {caseStudies[activeCase].results.map((result, index) => (
                  <li key={index} className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mr-2" />
                    <span className="text-muted-foreground">{result}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

