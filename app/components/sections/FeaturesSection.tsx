'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect, useRef } from 'react'
import { 
  ChartBarIcon, 
  CogIcon, 
  UserGroupIcon, 
  ShieldCheckIcon,
  SparklesIcon
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
      gradient: "from-cyan-400 via-blue-500 to-indigo-600",
      shadowColor: "shadow-blue-500/50",
      delay: 0
    },
    {
      icon: <CogIcon className="w-8 h-8" />,
      title: "自動化システム",
      description: "AIを活用した効率的な配送ルート最適化",
      progress: 90,
      gradient: "from-emerald-400 via-green-500 to-teal-600",
      shadowColor: "shadow-green-500/50",
      delay: 0.1
    },
    {
      icon: <UserGroupIcon className="w-8 h-8" />,
      title: "専門スタッフ",
      description: "経験豊富なプロフェッショナルによる丁寧な対応",
      progress: 98,
      gradient: "from-violet-400 via-purple-500 to-pink-600",
      shadowColor: "shadow-purple-500/50",
      delay: 0.2
    },
    {
      icon: <ShieldCheckIcon className="w-8 h-8" />,
      title: "安全保障",
      description: "完全な保険適用で安心・安全な配送をお約束",
      progress: 99,
      gradient: "from-orange-400 via-red-500 to-pink-600",
      shadowColor: "shadow-orange-500/50",
      delay: 0.3
    }
  ]

  const [animatedProgress, setAnimatedProgress] = useState(features.map(() => 0))
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section id="features" className="section py-20 bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute w-96 h-96 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl -top-48 -left-48 animate-pulse" />
        <div className="absolute w-96 h-96 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(74,222,128,0.1),transparent_50%)]" />
      </div>
      <motion.div
        ref={containerRef}
        className="container mx-auto px-4 relative z-10"
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6">
            <SparklesIcon className="w-6 h-6 text-purple-400" />
            <span className="text-sm font-medium text-purple-400 uppercase tracking-wider">Advanced Logistics</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              私たちの特徴
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            最新技術と豊富な経験を組み合わせた、信頼性の高い配送サービス
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={fadeInLeft} className="space-y-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: feature.delay, duration: 0.6 }}
                className="relative group"
              >
                {/* Glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 rounded-2xl`} />
                
                <motion.div
                  className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 overflow-hidden"
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative flex items-start space-x-5">
                    <motion.div
                      className="relative"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} blur-lg opacity-60`} />
                      <div className={`relative bg-gradient-to-r ${feature.gradient} p-4 rounded-xl ${feature.shadowColor} shadow-lg`}>
                        <div className="text-white">
                          {feature.icon}
                        </div>
                      </div>
                    </motion.div>
                  
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 mb-6 leading-relaxed">
                        {feature.description}
                      </p>
                    
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">完成度</span>
                          <motion.span 
                            className="font-semibold text-white"
                            key={animatedProgress[index]}
                            initial={{ scale: 1.2 }}
                            animate={{ scale: 1 }}
                          >
                            {animatedProgress[index]}%
                          </motion.span>
                        </div>
                        
                        <div className="relative">
                          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                            <motion.div
                              className="relative h-full rounded-full overflow-hidden"
                              style={{ width: `${animatedProgress[index]}%` }}
                              initial={{ width: 0 }}
                              animate={{ width: `${animatedProgress[index]}%` }}
                              transition={{ duration: 1.5, ease: "easeOut", delay: feature.delay }}
                            >
                              <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient}`} />
                              <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20" />
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeInRight} className="relative perspective-1000">
            <div className="relative transform-gpu" style={{ transformStyle: 'preserve-3d' }}>
              {/* Floating orbs */}
              <motion.div
                className="absolute -top-8 -left-8 w-64 h-64"
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity }
                }}
              >
                <div className="w-full h-full bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-full blur-3xl" />
              </motion.div>
              
              <motion.div
                className="absolute -bottom-8 -right-8 w-48 h-48"
                animate={{ 
                  rotate: -360,
                  scale: [1, 0.9, 1]
                }}
                transition={{ 
                  rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity }
                }}
              >
                <div className="w-full h-full bg-gradient-to-r from-blue-600/30 to-cyan-600/30 rounded-full blur-3xl" />
              </motion.div>
              
              {/* Main card */}
              <motion.div 
                className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-12 border border-white/20 overflow-hidden"
                whileHover={{ 
                  rotateY: 5, 
                  rotateX: -5,
                  scale: 1.05 
                }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                {/* Inner glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 via-transparent to-blue-600/20 opacity-60" />
                
                {/* Satisfaction percentage */}
                <motion.div
                  className="relative text-8xl font-bold mb-6"
                  animate={{ 
                    scale: [1, 1.02, 1],
                    rotate: [0, 1, -1, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                    99.9%
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 blur-2xl opacity-40" />
                </motion.div>
                
                <h3 className="relative text-3xl font-bold text-white mb-4">
                  顧客満足度
                </h3>
                
                <p className="relative text-gray-300 mb-8 text-lg">
                  お客様からの高い評価をいただいております
                </p>
                
                {/* Stars */}
                <div className="relative flex justify-center space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0, rotate: -180 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ 
                        delay: i * 0.1, 
                        type: "spring",
                        stiffness: 200
                      }}
                      whileHover={{ 
                        scale: 1.2, 
                        rotate: 15,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <svg
                        className="w-8 h-8 text-yellow-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default FeaturesSection