'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { CheckIcon } from '@heroicons/react/24/outline'
import { staggerContainer, fadeInUp, flip } from '@/lib/animations'
import AnimatedButton from '../ui/AnimatedButton'

const PricingSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const pricingPlans = [
    {
      name: 'スタンダード',
      price: '1,500',
      period: '件',
      description: '個人・小規模事業者様向け',
      features: [
        '通常配送（3-5日）',
        '基本追跡サービス',
        '平日対応',
        '標準保険適用',
        'メールサポート'
      ],
      color: 'from-blue-500 to-blue-600',
      popular: false
    },
    {
      name: 'プロフェッショナル',
      price: '2,800',
      period: '件',
      description: '中小企業様向け',
      features: [
        '迅速配送（1-2日）',
        'リアルタイム追跡',
        '24時間対応',
        '拡張保険適用',
        '電話・メールサポート',
        '専用担当者',
        '配送レポート'
      ],
      color: 'from-purple-500 to-purple-600',
      popular: true
    },
    {
      name: 'エンタープライズ',
      price: 'カスタム',
      period: '',
      description: '大企業様向け',
      features: [
        '特急配送（当日）',
        'AI予測配送',
        '365日対応',
        '完全保険適用',
        '24時間専用サポート',
        '専属チーム',
        '詳細分析レポート',
        'API連携',
        'カスタマイズ対応'
      ],
      color: 'from-orange-500 to-orange-600',
      popular: false
    }
  ]

  return (
    <section id="pricing" className="section py-20">
      <motion.div
        ref={ref}
        className="container mx-auto px-4"
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            料金プラン
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            お客様のニーズに合わせた柔軟な料金プランをご用意しています
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              variants={flip}
              className="relative flex flex-col"
            >
              {plan.popular && (
                <motion.div
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold z-50"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  人気プラン
                </motion.div>
              )}
              
              <motion.div
                className={`glass-card p-8 h-full ${plan.popular ? 'ring-2 ring-purple-500' : ''}`}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)'
                }}
                animate={plan.popular ? { y: [-2, 2, -2] } : {}}
                transition={plan.popular ? { duration: 3, repeat: Infinity } : {}}
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-gray-800">
                      {plan.price === 'カスタム' ? plan.price : `¥${plan.price}`}
                    </span>
                    {plan.period && (
                      <span className="text-gray-500 ml-2">/{plan.period}</span>
                    )}
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      className="flex items-start space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: featureIndex * 0.1 }}
                    >
                      <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                <AnimatedButton
                  href="#contact"
                  className={`w-full bg-gradient-to-r ${plan.color} text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300`}
                >
                  プランを選択
                </AnimatedButton>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={fadeInUp}
          className="text-center mt-16"
        >
          <div className="glass-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              特別キャンペーン
            </h3>
            <p className="text-gray-600 mb-6">
              新規ご契約のお客様に限り、初回配送料金を20%OFF！
              さらに1ヶ月間の無料追跡サービスもご利用いただけます。
            </p>
            
            <motion.div
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="font-semibold">期間限定</span>
              <span className="text-green-100">•</span>
              <span>2024年12月31日まで</span>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default PricingSection