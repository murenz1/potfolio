import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Digital Marketing Services | Lumion dev",
  description:
    "Boost your online presence with our comprehensive digital marketing services including SEO, social media, content marketing, and paid advertising.",
}

export default function DigitalMarketingPage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h1 className="text-4xl font-bold mb-4">Digital Marketing Services</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Drive traffic, generate leads, and increase conversions with our data-driven digital marketing strategies.
          </p>
          <div className="space-y-4">
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
              <div>
                <h3 className="font-medium">Search Engine Optimization (SEO)</h3>
                <p className="text-muted-foreground">Improve your search rankings and drive organic traffic</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
              <div>
                <h3 className="font-medium">Social Media Marketing</h3>
                <p className="text-muted-foreground">Build brand awareness and engage with your audience</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
              <div>
                <h3 className="font-medium">Content Marketing</h3>
                <p className="text-muted-foreground">Create valuable content that attracts and retains customers</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
              <div>
                <h3 className="font-medium">Pay-Per-Click Advertising</h3>
                <p className="text-muted-foreground">Generate immediate traffic and conversions</p>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <Button asChild className="mr-4">
              <Link href="/contact">Get Started</Link>
            </Button>
            <Button asChild>
              <Link href="/case-studies">View Case Studies</Link>
            </Button>
          </div>
        </div>
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image
            src="/placeholder.svg?height=800&width=600"
            alt="Digital Marketing Services"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Digital Marketing Process</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              step: "1",
              title: "Research & Analysis",
              description: "We analyze your business, competitors, and target audience to develop a tailored strategy.",
            },
            {
              step: "2",
              title: "Strategy Development",
              description: "We create a comprehensive marketing plan aligned with your business goals.",
            },
            {
              step: "3",
              title: "Implementation",
              description: "Our team executes the strategy across all relevant digital channels.",
            },
            {
              step: "4",
              title: "Monitoring & Optimization",
              description: "We continuously track performance and optimize for better results.",
            },
          ].map((item) => (
            <div key={item.step} className="bg-secondary/50 p-6 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-4">
                {item.step}
              </div>
              <h3 className="text-xl font-medium mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-secondary/30 p-8 rounded-lg">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Grow Your Online Presence?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Let's discuss how our digital marketing services can help you achieve your business goals.
          </p>
        </div>
        <div className="flex justify-center">
          <Button asChild>
            <Link href="/contact">Schedule a Consultation</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

