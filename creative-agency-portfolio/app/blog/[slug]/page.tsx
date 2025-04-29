import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, User, Tag } from "lucide-react"

export const metadata: Metadata = {
  title: "Blog Post | Lumion dev",
  description: "Read our latest insights on digital marketing, software development, e-commerce, and AI.",
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // This would normally fetch the specific blog post data based on the slug
  // For now, we'll use placeholder content

  const post = {
    title: "10 SEO Strategies That Actually Work in 2025",
    date: "March 15, 2025",
    author: "Sarah Johnson",
    category: "Digital Marketing",
    image: "/placeholder.svg?height=600&width=1200",
    content: `
      <p>Search Engine Optimization (SEO) continues to evolve at a rapid pace. What worked a few years ago may not be effective today. In this article, we'll explore the most effective SEO strategies that are driving results in 2025.</p>
      
      <h2>1. Focus on User Experience</h2>
      <p>Google's algorithms are increasingly prioritizing websites that provide excellent user experiences. This includes factors like page load speed, mobile responsiveness, and intuitive navigation. Investing in UX improvements can significantly boost your search rankings.</p>
      
      <h2>2. Create High-Quality, In-Depth Content</h2>
      <p>Content remains king in SEO. However, the bar for what constitutes "quality" content continues to rise. In 2025, successful content needs to be comprehensive, well-researched, and provide genuine value to readers.</p>
      
      <h2>3. Optimize for Voice Search</h2>
      <p>With the increasing popularity of voice assistants, optimizing for voice search has become essential. This means focusing on natural language queries and providing direct answers to common questions in your content.</p>
      
      <h2>4. Leverage AI for Content Creation and Optimization</h2>
      <p>AI tools can help analyze top-performing content in your niche and provide insights for creating competitive content. They can also assist with keyword research, content optimization, and identifying content gaps.</p>
      
      <h2>5. Build High-Quality Backlinks</h2>
      <p>Backlinks remain a crucial ranking factor. Focus on earning links from reputable, relevant websites through creating linkable assets, guest posting, and building relationships with industry influencers.</p>
      
      <h2>6. Optimize for Core Web Vitals</h2>
      <p>Google's Core Web Vitals have become increasingly important for rankings. These metrics measure loading performance, interactivity, and visual stability of your pages. Optimizing these factors can give you an edge in search results.</p>
      
      <h2>7. Implement Schema Markup</h2>
      <p>Schema markup helps search engines understand your content better and can result in rich snippets in search results. This can significantly improve click-through rates and visibility.</p>
      
      <h2>8. Focus on E-E-A-T</h2>
      <p>Experience, Expertise, Authoritativeness, and Trustworthiness (E-E-A-T) are key factors in Google's evaluation of content quality. Demonstrating these qualities in your content can improve rankings, especially for YMYL (Your Money or Your Life) topics.</p>
      
      <h2>9. Optimize for Local Search</h2>
      <p>For businesses with physical locations, local SEO remains crucial. This includes optimizing your Google Business Profile, gathering positive reviews, and ensuring NAP (Name, Address, Phone) consistency across the web.</p>
      
      <h2>10. Analyze and Adapt</h2>
      <p>Finally, successful SEO in 2025 requires continuous analysis and adaptation. Regularly monitor your performance, stay updated on algorithm changes, and be ready to adjust your strategy as needed.</p>
      
      <h2>Conclusion</h2>
      <p>SEO continues to be a vital component of digital marketing. By implementing these strategies, you can improve your search visibility and drive more organic traffic to your website in 2025 and beyond.</p>
    `,
    relatedPosts: [
      {
        title: "The Complete Guide to Content Marketing in 2025",
        slug: "content-marketing-guide-2025",
      },
      {
        title: "How to Conduct a Comprehensive SEO Audit",
        slug: "comprehensive-seo-audit",
      },
      {
        title: "Understanding Google's Latest Algorithm Update",
        slug: "google-algorithm-update",
      },
    ],
  }

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="mb-8">
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>

        <h1 className="text-4xl font-bold mb-6">{post.title}</h1>

        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex items-center text-muted-foreground">
            <Calendar className="mr-2 h-4 w-4" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <User className="mr-2 h-4 w-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center text-primary">
            <Tag className="mr-2 h-4 w-4" />
            <span>{post.category}</span>
          </div>
        </div>
      </div>

      <div className="relative h-[400px] w-full mb-8 rounded-lg overflow-hidden">
        <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        <div className="lg:col-span-3">
          <article
            className="prose prose-lg max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></article>

          <div className="mt-12 pt-8 border-t">
            <div className="flex items-center justify-between">
              <Button asChild variant="outline">
                <Link href="/blog/previous-post">← Previous Post</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/blog/next-post">Next Post →</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-20">
            <h3 className="text-xl font-bold mb-4">Related Posts</h3>
            <div className="space-y-4">
              {post.relatedPosts.map((relatedPost, index) => (
                <div key={index} className="border-b pb-4 last:border-0">
                  <Link href={`/blog/${relatedPost.slug}`} className="hover:text-primary transition-colors">
                    {relatedPost.title}
                  </Link>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {["Digital Marketing", "SEO", "Content Strategy", "Analytics"].map((category, index) => (
                  <Link
                    key={index}
                    href={`/blog/category/${category.toLowerCase().replace(/\s+/g, "-")}`}
                    className="px-3 py-1 bg-secondary rounded-full text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

