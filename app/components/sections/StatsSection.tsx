'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'
import { staggerContainer, fadeInUp } from '@/lib/animations'

const StatsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const stats = [
    {
      number: 50000,
      suffix: '+',
      label: '配送実績',
      description: '年間配送件数',
      color: 'from-blue-500 to-blue-600'
    },
    {
      number: 1200,
      suffix: '+',
      label: '提携企業',
      description: '信頼のパートナー',
      color: 'from-green-500 to-green-600'
    },
    {
      number: 24,
      suffix: '時間',
      label: '緊急対応',
      description: '365日対応',
      color: 'from-blue-800 to-blue-900'
    },
    {
      number: 99.9,
      suffix: '%',
      label: '配送成功率',
      description: '確実な配送',
      color: 'from-orange-500 to-orange-600'
    }
  ]

  const [animatedNumbers, setAnimatedNumbers] = useState(stats.map(() => 0))

  useEffect(() => {
    if (inView) {
      stats.forEach((stat, index) => {
        const timer = setTimeout(() => {
          let current = 0
          const increment = stat.number / 100
          const interval = setInterval(() => {
            current += increment
            if (current >= stat.number) {
              current = stat.number
              clearInterval(interval)
            }
            setAnimatedNumbers(prev => {
              const newNumbers = [...prev]
              newNumbers[index] = current
              return newNumbers
            })
          }, 30)
        }, index * 200)
        
        return () => clearTimeout(timer)
      })
    }
  }, [inView])

  return (
    <section id="stats" className="section py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-black relative overflow-hidden">
      {/* 背景の装飾 */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full opacity-10 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-800 rounded-full opacity-10 translate-x-1/2 translate-y-1/2" />
      </div>

      {/* パーティクルエフェクト */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div
        ref={ref}
        className="container mx-auto px-4 relative z-10"
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">
            実績と信頼
          </h2>
          <p className="text-xl text-black max-w-2xl mx-auto">
            数字で見る私たちの成果と、お客様からの信頼の証
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="text-center group"
            >
              <motion.div
                className={`glass-card p-8 bg-gradient-to-r ${stat.color} bg-opacity-10 border border-white/20 hover:bg-opacity-20 transition-all duration-300`}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <motion.div
                  className="text-4xl md:text-5xl font-bold mb-2 text-black"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {stat.number >= 1000 
                    ? (animatedNumbers[index] / 1000).toFixed(stat.number === 1200 ? 1 : 0) + 'K'
                    : animatedNumbers[index] % 1 === 0 
                      ? Math.floor(animatedNumbers[index]) 
                      : animatedNumbers[index].toFixed(1)
                  }
                  {stat.suffix}
                </motion.div>
                
                <h3 className="text-xl font-semibold mb-2 text-black">
                  {stat.label}
                </h3>
                
                <p className="text-black text-sm">
                  {stat.description}
                </p>
                
                <motion.div
                  className="mt-4 h-1 bg-white/20 rounded-full overflow-hidden"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: index * 0.2, duration: 1 }}
                >
                  <motion.div
                    className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: index * 0.2 + 0.5, duration: 1.5 }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={fadeInUp}
          className="text-center mt-16"
        >
          <motion.div
            className="inline-flex items-center space-x-4 glass-card px-8 py-4 bg-white/10 border border-white/20"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex -space-x-2">
              {[
                'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=100&h=100&fit=crop', // 森林の風景
                'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop', // 山の風景
                'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=100&h=100&fit=crop', // 湖の風景
                'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=100&h=100&fit=crop', // 草原の風景
                'https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?w=100&h=100&fit=crop'  // 花畑の風景
              ].map((url, i) => (
                <motion.div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-white overflow-hidden"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <img 
                    src={url} 
                    alt={`自然風景${i + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
            <div className="text-left">
              <div className="text-black font-semibold">
                全国のお客様からの信頼
              </div>
              <div className="text-black text-sm">
                北海道から沖縄まで、多くの企業様にご利用いただいています
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default StatsSection