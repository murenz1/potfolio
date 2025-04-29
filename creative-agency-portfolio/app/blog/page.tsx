import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Blog | Lumion dev",
  description:
    "Insights, tips, and trends in digital marketing, software development, e-commerce, and AI from our experts.",
}

const blogPosts = [
  {
    id: 1,
    title: "10 SEO Strategies That Actually Work in 2025",
    excerpt:
      "Discover the most effective SEO techniques that are driving results in today's competitive digital landscape.",
    date: "March 15, 2025",
    author: "Sarah Johnson",
    category: "Digital Marketing",
    image: "/placeholder.svg?height=400&width=600",
    slug: "seo-strategies-2025",
  },
  {
    id: 2,
    title: "The Future of E-Commerce: Trends to Watch",
    excerpt:
      "Explore emerging e-commerce technologies and consumer behaviors that will shape the future of online retail.",
    date: "March 10, 2025",
    author: "Michael Chen",
    category: "E-Commerce",
    image: "/placeholder.svg?height=400&width=600",
    slug: "future-of-ecommerce",
  },
  {
    id: 3,
    title: "How AI is Transforming Customer Service",
    excerpt:
      "Learn how artificial intelligence is revolutionizing customer support and creating better user experiences.",
    date: "March 5, 2025",
    author: "Priya Sharma",
    category: "AI & Automation",
    image: "/placeholder.svg?height=400&width=600",
    slug: "ai-transforming-customer-service",
  },
  {
    id: 4,
    title: "Building Scalable Web Applications with Next.js",
    excerpt: "A comprehensive guide to developing high-performance, scalable web applications using Next.js and React.",
    date: "February 28, 2025",
    author: "David Wilson",
    category: "Software Development",
    image: "/placeholder.svg?height=400&width=600",
    slug: "scalable-nextjs-applications",
  },
  {
    id: 5,
    title: "The Complete Guide to Content Marketing in 2025",
    excerpt:
      "Everything you need to know about creating a successful content marketing strategy in today's digital environment.",
    date: "February 20, 2025",
    author: "Emma Rodriguez",
    category: "Digital Marketing",
    image: "/placeholder.svg?height=400&width=600",
    slug: "content-marketing-guide-2025",
  },
  {
    id: 6,
    title: "Optimizing E-Commerce Conversion Rates",
    excerpt: "Practical tips and strategies to improve your online store's conversion rates and boost sales.",
    date: "February 15, 2025",
    author: "James Lee",
    category: "E-Commerce",
    image: "/placeholder.svg?height=400&width=600",
    slug: "ecommerce-conversion-optimization",
  },
]

export default function BlogPage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Our Blog</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Insights, tips, and trends in digital marketing, software development, e-commerce, and AI from our experts.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48 w-full">
              <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
            </div>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-primary font-medium">{post.category}</span>
                <span className="text-sm text-muted-foreground">{post.date}</span>
              </div>
              <CardTitle className="line-clamp-2">{post.title}</CardTitle>
              <CardDescription className="text-sm">By {post.author}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href={`/blog/${post.slug}`}>Read More</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button variant="outline">Load More Articles</Button>
      </div>

      <div className="mt-20 bg-secondary/30 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Stay updated with the latest insights and trends in digital marketing, software development, and more.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <Button>Subscribe</Button>
        </div>
      </div>
    </div>
  )
}

