import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Megaphone, ShoppingCart, Bot } from "lucide-react"

export const metadata: Metadata = {
  title: "Services | Lumion dev",
  description:
    "Explore our comprehensive range of digital services including marketing, development, e-commerce and AI solutions.",
}

const services = [
  {
    icon: <Megaphone className="w-12 h-12 mb-4 text-blue-500" />,
    title: "Digital Marketing",
    description:
      "Comprehensive digital marketing strategies including SEO, social media marketing, content creation, and paid advertising campaigns that drive traffic and conversions.",
    link: "/services/digital-marketing",
    features: [
      "Search Engine Optimization (SEO)",
      "Social Media Marketing",
      "Content Marketing Strategy",
      "Pay-Per-Click Advertising",
      "Email Marketing Campaigns",
      "Analytics & Reporting",
    ],
  },
  {
    icon: <Code className="w-12 h-12 mb-4 text-green-500" />,
    title: "Software Development",
    description:
      "Custom software, mobile apps, and web development using React, Next.js, and other cutting-edge technologies tailored to your business needs.",
    link: "/services/software-development",
    features: [
      "Web Application Development",
      "Mobile App Development",
      "Custom Software Solutions",
      "API Development & Integration",
      "UI/UX Design",
      "Maintenance & Support",
    ],
  },
  {
    icon: <ShoppingCart className="w-12 h-12 mb-4 text-yellow-500" />,
    title: "E-Commerce Solutions",
    description:
      "End-to-end e-commerce development including online store creation, payment integration, and hyperlocal commerce solutions for modern businesses.",
    link: "/services/ecommerce",
    features: [
      "E-commerce Website Development",
      "Payment Gateway Integration",
      "Inventory Management Systems",
      "Order Fulfillment Solutions",
      "Customer Relationship Management",
      "E-commerce SEO & Marketing",
    ],
  },
  {
    icon: <Bot className="w-12 h-12 mb-4 text-purple-500" />,
    title: "AI & Automation",
    description:
      "Cutting-edge AI solutions including chatbots, automated marketing tools, and data analytics solutions that streamline operations and enhance customer experiences.",
    link: "/services/ai-automation",
    features: [
      "AI Chatbot Development",
      "Marketing Automation",
      "Business Process Automation",
      "Data Analytics & Insights",
      "Machine Learning Solutions",
      "Predictive Analysis Tools",
    ],
  },
]

export default function ServicesPage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Our Services</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          We offer a comprehensive range of digital services to help your business thrive in the digital landscape.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {services.map((service) => (
          <Card key={service.title} className="border-2 border-primary/10 hover:border-primary/30 transition-all">
            <CardHeader>
              <div className="mb-2">{service.icon}</div>
              <CardTitle className="text-2xl">{service.title}</CardTitle>
              <CardDescription className="text-base">{service.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <h4 className="font-medium mb-2">Key Features:</h4>
              <ul className="space-y-1">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={service.link}>Learn More</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Not Sure What You Need?</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Our team of experts can help you identify the right solutions for your business. Get in touch for a free
          consultation.
        </p>
        <Button asChild size="lg">
          <Link href="/contact">Contact Us</Link>
        </Button>
      </div>
    </div>
  )
}

