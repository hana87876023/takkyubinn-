'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'
import { 
  ChartBarIcon, 
  CogIcon, 
  UserGroupIcon, 
  ShieldCheckIcon 
} from '@heroicons/react/24/outline'
import { staggerContainer, fadeInUp, fadeInLeft, fadeInRight } from '@/lib/animations'

const FeaturesSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const features = [
    {
      icon: <ChartBarIcon className="w-8 h-8" />,
      title: "リアルタイム追跡",
      description: "お荷物の位置を24時間リアルタイムで追跡できます",
      progress: 95,
      color: "bg-blue-500"
    },
    {
      icon: <CogIcon className="w-8 h-8" />,
      title: "自動化システム",
      description: "AIを活用した効率的な配送ルート最適化",
      progress: 90,
      color: "bg-green-500"
    },
    {
      icon: <UserGroupIcon className="w-8 h-8" />,
      title: "専門スタッフ",
      description: "経験豊富なプロフェッショナルによる丁寧な対応",
      progress: 98,
      color: "bg-purple-500"
    },
    {
      icon: <ShieldCheckIcon className="w-8 h-8" />,
      title: "安全保障",
      description: "完全な保険適用で安心・安全な配送をお約束",
      progress: 99,
      color: "bg-orange-500"
    }
  ]

  const [animatedProgress, setAnimatedProgress] = useState(features.map(() => 0))

  useEffect(() => {
    if (inView) {
      features.forEach((feature, index) => {
        const timer = setTimeout(() => {
          let current = 0
          const interval = setInterval(() => {
            current += 2
            if (current >= feature.progress) {
              current = feature.progress
              clearInterval(interval)
            }
            setAnimatedProgress(prev => {
              const newProgress = [...prev]
              newProgress[index] = current
              return newProgress
            })
          }, 30)
        }, index * 200)
        
        return () => clearTimeout(timer)
      })
    }
  }, [inView])

  return (
    <section id="features" className="section py-20 bg-gray-50">
      <motion.div
        ref={ref}
        className="container mx-auto px-4"
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            私たちの特徴
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            最新技術と豊富な経験を組み合わせた、信頼性の高い配送サービス
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div variants={fadeInLeft} className="space-y-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="glass-card p-6 hover:shadow-xl transition-shadow duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start space-x-4">
                  <motion.div
                    className={`${feature.color} text-white p-3 rounded-lg flex-shrink-0`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {feature.icon}
                  </motion.div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {feature.description}
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">完成度</span>
                        <span className="font-semibold text-gray-700">
                          {animatedProgress[index]}%
                        </span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          className={`h-2 rounded-full ${feature.color}`}
                          style={{ width: `${animatedProgress[index]}%` }}
                          initial={{ width: 0 }}
                          animate={{ width: `${animatedProgress[index]}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeInRight} className="relative">
            <div className="relative">
              <motion.div
                className="absolute -top-4 -left-4 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full opacity-20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              
              <motion.div
                className="absolute -bottom-4 -right-4 w-48 h-48 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-20"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
              
              <div className="relative z-10 glass-card p-8 text-center">
                <motion.div
                  className="text-6xl font-bold gradient-text mb-4"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  99.9%
                </motion.div>
                
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  顧客満足度
                </h3>
                
                <p className="text-gray-600 mb-6">
                  お客様からの高い評価をいただいております
                </p>
                
                <div className="flex justify-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.svg
                      key={i}
                      className="w-6 h-6 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </motion.svg>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default FeaturesSection