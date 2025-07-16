'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { staggerContainer, fadeInUp } from '@/lib/animations'

const TestimonialsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const testimonials = [
    {
      name: '田中 太郎',
      company: 'ABC商事株式会社',
      role: '物流部長',
      content: 'LandBridgeの配送サービスは本当に素晴らしいです。配送スピードが速く、追跡システムも使いやすい。おかげで顧客満足度が大幅に向上しました。',
      rating: 5,
      avatar: '/avatar1.jpg'
    },
    {
      name: '佐藤 花子',
      company: 'DEF製造株式会社',
      role: '営業部長',
      content: '緊急配送でいつも助けられています。24時間対応で、どんな急ぎの案件でも安心してお任せできます。プロフェッショナルなサポート体制が心強いです。',
      rating: 5,
      avatar: '/avatar2.jpg'
    },
    {
      name: '鈴木 一郎',
      company: 'GHI電子株式会社',
      role: 'IT部長',
      content: 'API連携が素晴らしく、システム統合がスムーズに行えました。リアルタイム追跡機能により、顧客への情報提供が格段に改善されました。',
      rating: 5,
      avatar: '/avatar3.jpg'
    }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" className="section py-20 bg-gray-50">
      <motion.div
        ref={ref}
        className="container mx-auto px-4"
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            お客様の声
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            実際にサービスをご利用いただいたお客様からの生の声をお聞きください
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <motion.div
            key={currentIndex}
            className="glass-card p-8 md:p-12 text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* 引用符 */}
            <motion.div
              className="text-6xl text-blue-200 mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              "
            </motion.div>

            {/* 証言内容 */}
            <motion.p
              className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {testimonials[currentIndex].content}
            </motion.p>

            {/* 評価星 */}
            <motion.div
              className="flex justify-center space-x-1 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <motion.svg
                  key={i}
                  className="w-6 h-6 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  initial={{ scale: 0, rotate: 180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.8 + i * 0.1, duration: 0.3 }}
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </motion.svg>
              ))}
            </motion.div>

            {/* 顧客情報 */}
            <motion.div
              className="flex items-center justify-center space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {testimonials[currentIndex].name.charAt(0)}
                </span>
              </div>
              
              <div className="text-left">
                <div className="font-semibold text-gray-800">
                  {testimonials[currentIndex].name}
                </div>
                <div className="text-gray-600">
                  {testimonials[currentIndex].role}
                </div>
                <div className="text-blue-600 text-sm">
                  {testimonials[currentIndex].company}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ナビゲーションボタン */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-300 hover:scale-110"
          >
            <ChevronLeftIcon className="w-6 h-6 text-gray-600" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-300 hover:scale-110"
          >
            <ChevronRightIcon className="w-6 h-6 text-gray-600" />
          </button>

          {/* インジケーター */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-blue-500 scale-125' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default TestimonialsSection