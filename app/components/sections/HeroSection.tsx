'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import AnimatedButton from '../ui/AnimatedButton'
import TypewriterText from '../animations/TypewriterText'
import FloatingElements from '../animations/FloatingElements'

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section id="hero" className="hero-section min-h-screen flex items-center justify-center relative">
      <FloatingElements />
      
      <motion.div
        className="container mx-auto px-4 text-center relative z-10"
        variants={staggerContainer}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        <motion.div variants={fadeInUp} className="mb-8">
          <TypewriterText
            text="迅速・確実・エコロジーな配送サービス"
            className="text-2xl md:text-4xl font-bold text-gray-800 mb-4"
          />
        </motion.div>

        <motion.h1
          variants={fadeInUp}
          className="text-5xl md:text-7xl font-bold text-black mb-6"
        >
          LandBridge運送
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto"
        >
          最新技術とエコロジーな取り組みで、お客様の大切な荷物を安全にお届けします。
          運送業界をリードする革新的なサービスをご体験ください。
        </motion.p>

        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <AnimatedButton
            href="#contact"
            variant="primary"
            size="large"
            className="bg-gradient-to-r from-blue-500 to-blue-900 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl"
          >
            お見積もり依頼
          </AnimatedButton>
          
          <AnimatedButton
            href="#services"
            variant="secondary"
            size="large"
            className="border-2 border-blue-500 text-blue-500 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-500 hover:text-white transition-all duration-300"
          >
            サービス詳細
          </AnimatedButton>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <div className="glass-card p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">24時間</div>
            <div className="text-gray-600">365日対応</div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">99.9%</div>
            <div className="text-gray-600">配送成功率</div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-3xl font-bold text-blue-900 mb-2">30分</div>
            <div className="text-gray-600">平均配送時間</div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HeroSection