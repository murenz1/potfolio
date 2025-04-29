"use client"

import HeroGeometric from "./components/HeroGeometric"
import PortfolioGrid from "./components/PortfolioGrid"
import AboutUs from "./components/AboutUs"
import Services from "./components/Services"
import ContactForm from "./components/ContactForm"
import Marquee from "./components/Marquee"
import PartnersShowcase from "./components/PartnersShowcase"
import SlidingText from "./components/SlidingText"

export default function Home() {
  return (
    <>
      <HeroGeometric badge="Lumion dev" title1="Innovative" title2="Digital Solutions" />
      <SlidingText />
      <div id="services">
        <Services />
      </div>
      <PartnersShowcase />
      <Marquee />
      <div id="portfolio">
        <PortfolioGrid />
      </div>
      <AboutUs />
      <div id="contact">
        <ContactForm />
      </div>
    </>
  )
}

