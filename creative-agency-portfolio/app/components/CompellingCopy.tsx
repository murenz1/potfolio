"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { useInView } from "framer-motion"

// Text reveal animation for psychological impact
const RevealText = ({ children, delay = 0 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={{ y: "100%" }}
        animate={isInView ? { y: 0 } : { y: "100%" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
        className="will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  )
}

// Attention-grabbing headline with curiosity gap
const IntriguingHeadline = ({ children }) => {
  return (
    <motion.h2
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      viewport={{ once: true }}
      className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter"
    >
      {children}
    </motion.h2>
  )
}

// Psychological trigger section that creates urgency and exclusivity
export default function CompellingCopy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24 text-white">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <IntriguingHeadline>
          <span className="block">What if your digital presence</span>
          <span className="block">
            could work{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">
              while you sleep?
            </span>
          </span>
        </IntriguingHeadline>

        <p className="text-xl md:text-2xl text-white/70 mb-8">
          You're moments away from discovering the hidden patterns that separate thriving businesses from those that
          struggle to be seen.
        </p>
      </motion.div>

      <div className="space-y-16">
        {/* Section 1: Scarcity + Social Proof */}
        <div>
          <RevealText>
            <h3 className="text-3xl font-bold mb-4">The Digital Advantage Only 13% of Businesses Leverage</h3>
          </RevealText>
          <RevealText delay={0.1}>
            <p className="text-white/70 mb-4">
              While most businesses fight for attention using outdated methods, our clients operate in a different realm
              entirely. They've discovered what we call the "Invisible Architecture" of digital success.
            </p>
          </RevealText>
          <RevealText delay={0.2}>
            <p className="text-white/70 mb-4">
              This isn't just about having a website or running ads. It's about creating digital ecosystems that
              continuously attract, engage, and convert your ideal customers—even when you're not actively working.
            </p>
          </RevealText>
          <RevealText delay={0.3}>
            <div className="p-4 border border-white/10 bg-white/5 rounded-lg mt-6">
              <p className="italic text-white/80">
                "Since implementing Lumion's strategy, our digital presence generates 43% more qualified leads with 27%
                less effort. It's like having a sales team that never sleeps."
              </p>
              <p className="text-right text-sm text-white/60 mt-2">— Sarah K., CEO of GrowthTech</p>
            </div>
          </RevealText>
        </div>

        {/* Section 2: Loss Aversion + Curiosity */}
        <div>
          <RevealText>
            <h3 className="text-3xl font-bold mb-4">What's Costing You More: Action or Inaction?</h3>
          </RevealText>
          <RevealText delay={0.1}>
            <p className="text-white/70 mb-4">
              Every day without an optimized digital strategy isn't neutral—it's a net loss. Your competitors are
              capturing the attention, trust, and wallets of your potential customers while you remain invisible.
            </p>
          </RevealText>
          <RevealText delay={0.2}>
            <p className="text-white/70 mb-4">
              The question isn't whether you can afford to invest in digital transformation. It's whether you can afford
              not to. What opportunities are slipping through your fingers right now?
            </p>
          </RevealText>
          <RevealText delay={0.3}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="p-4 border border-white/10 bg-white/5 rounded-lg">
                <h4 className="font-bold mb-2">Lost Visibility</h4>
                <p className="text-white/60 text-sm">Potential customers who never discover your business</p>
              </div>
              <div className="p-4 border border-white/10 bg-white/5 rounded-lg">
                <h4 className="font-bold mb-2">Lost Revenue</h4>
                <p className="text-white/60 text-sm">Sales opportunities that go to competitors instead</p>
              </div>
              <div className="p-4 border border-white/10 bg-white/5 rounded-lg">
                <h4 className="font-bold mb-2">Lost Time</h4>
                <p className="text-white/60 text-sm">Hours spent on ineffective marketing tactics</p>
              </div>
            </div>
          </RevealText>
        </div>

        {/* Section 3: Exclusivity + Authority */}
        <div>
          <RevealText>
            <h3 className="text-3xl font-bold mb-4">The Methodology We Don't Share Publicly</h3>
          </RevealText>
          <RevealText delay={0.1}>
            <p className="text-white/70 mb-4">
              Our approach combines cutting-edge technology with psychological principles that trigger action. We've
              refined this methodology through years of testing across industries, identifying the exact patterns that
              drive engagement.
            </p>
          </RevealText>
          <RevealText delay={0.2}>
            <p className="text-white/70 mb-4">
              While we can't reveal our complete framework here, we can tell you it's built on the science of attention,
              trust, and decision-making—the three pillars that determine whether someone becomes your customer or
              scrolls past.
            </p>
          </RevealText>
          <RevealText delay={0.3}>
            <motion.div
              className="mt-8 text-center"
              whileInView={{ scale: [0.95, 1.05, 1] }}
              transition={{ duration: 1, times: [0, 0.7, 1] }}
              viewport={{ once: true }}
            >
              <a
                href="#contact"
                className="inline-block px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-white/90 transition-colors duration-300"
              >
                Unlock Your Digital Potential
              </a>
            </motion.div>
          </RevealText>
        </div>
      </div>
    </div>
  )
}

