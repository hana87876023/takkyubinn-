'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  TruckIcon, 
  ClockIcon, 
  ShieldCheckIcon, 
  GlobeAltIcon,
  BoltIcon,
  CubeIcon
} from '@heroicons/react/24/outline'
import { staggerContainer, fadeInUp, cardHover } from '@/lib/animations'

const ServicesSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const services = [
    {
      icon: <TruckIcon className="w-12 h-12" />,
      title: "即日配送",
      description: "緊急のお荷物も当日中にお届け。迅速な対応でビジネスをサポートします。",
      color: "from-blue-500 to-blue-600",
      bgImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop"
    },
    {
      icon: <ClockIcon className="w-12 h-12" />,
      title: "時間指定配送",
      description: "お客様のご都合に合わせた時間指定配送で、確実にお届けします。",
      color: "from-green-500 to-green-600",
      bgImage: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop"
    },
    {
      icon: <ShieldCheckIcon className="w-12 h-12" />,
      title: "安全配送",
      description: "最新の追跡システムと保険で、お荷物を安全に保護します。",
      color: "from-blue-800 to-blue-900",
      bgImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop"
    },
    {
      icon: <GlobeAltIcon className="w-12 h-12" />,
      title: "全国対応",
      description: "北海道から沖縄まで、全国どこでも配送いたします。",
      color: "from-orange-500 to-orange-600",
      bgImage: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=300&fit=crop"
    },
    {
      icon: <BoltIcon className="w-12 h-12" />,
      title: "エコ配送",
      description: "環境に配慮した配送方法で、持続可能な物流を実現します。",
      color: "from-teal-500 to-teal-600",
      bgImage: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&h=300&fit=crop"
    },
    {
      icon: <CubeIcon className="w-12 h-12" />,
      title: "特殊配送",
      description: "精密機器や美術品など、特殊なお荷物の配送も承ります。",
      color: "from-red-500 to-red-600",
      bgImage: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=400&h=300&fit=crop"
    }
  ]

  return (
    <section id="services" className="section py-20">
      <motion.div
        ref={ref}
        className="container mx-auto px-4"
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            サービス一覧
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            お客様のニーズに合わせた多様な配送サービスをご提供しています
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={cardHover}
              className="glass-card p-8 text-center group cursor-pointer relative overflow-hidden"
            >
              {/* 背景画像 */}
              <div 
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `url(${service.bgImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'blur(1px)'
                }}
              />
              
              {/* コンテンツ */}
              <div className="relative z-10">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {service.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
              
              <motion.div
                className="mt-6 inline-flex items-center text-blue-500 font-semibold"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1, x: 5 }}
                transition={{ duration: 0.3 }}
              >
                詳細を見る
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default ServicesSection