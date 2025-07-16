'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Header from './components/sections/Header'
import HeroSection from './components/sections/HeroSection'
import ServicesSection from './components/sections/ServicesSection'
import FeaturesSection from './components/sections/FeaturesSection'
import StatsSection from './components/sections/StatsSection'
import PricingSection from './components/sections/PricingSection'
import TestimonialsSection from './components/sections/TestimonialsSection'
import IntroductionSection from './components/sections/IntroductionSection'
import ContactSection from './components/sections/ContactSection'
import Footer from './components/sections/Footer'
import CustomCursor from './components/ui/CustomCursor'
import ScrollProgress from './components/animations/ScrollProgress'
import LoadingScreen from './components/ui/LoadingScreen'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const backgroundRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (backgroundRef.current) {
      gsap.to(backgroundRef.current, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      })
    }
  }, [])

  return (
    <div className="custom-cursor">
      <LoadingScreen />
      <CustomCursor />
      <ScrollProgress />
      
      <div
        ref={backgroundRef}
        className="fixed-background"
        style={{
          backgroundImage: 'url(/hero-image.jpg)',
        }}
      />
      
      <div className="main-container">
        <Header />
        <HeroSection />
        <ServicesSection />
        <FeaturesSection />
        <StatsSection />
        <PricingSection />
        <TestimonialsSection />
        <IntroductionSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  )
}