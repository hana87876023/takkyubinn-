'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Header from './components/sections/Header'
import HeroSection from './components/sections/HeroSection'
import { ServicesMinimal } from './components/sections/services-minimal'
import { FeaturesElegant } from './components/sections/features-elegant'
import StatsSection from './components/sections/StatsSection'
import PricingSection from './components/sections/PricingSection'
import TestimonialsSection from './components/sections/TestimonialsSection'
import IntroductionSection from './components/sections/IntroductionSection'
import ContactSection from './components/sections/ContactSection'
import Footer from './components/sections/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative">
        <Header />
        <HeroSection />
        <ServicesMinimal />
        <FeaturesElegant />
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