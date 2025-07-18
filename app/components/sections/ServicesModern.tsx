'use client'

import { motion } from 'framer-motion'
import { Truck, Package, Gauge, Shield, Globe, Clock } from 'lucide-react'

const services = [
  {
    icon: Truck,
    title: '当日配送',
    description: '都心部への当日配送を実現。午前中の集荷で夕方までにお届けします。',
    features: ['最短3時間でお届け', 'リアルタイム追跡', '配送証明書発行'],
    bgColor: 'bg-primary-50',
    iconColor: 'text-primary-600',
    borderColor: 'border-primary-200',
  },
  {
    icon: Package,
    title: '定期配送',
    description: '定期的な配送ニーズに対応。スケジュールに合わせて確実にお届けします。',
    features: ['柔軟なスケジュール', '一括管理', 'コスト削減'],
    bgColor: 'bg-accent-50',
    iconColor: 'text-accent-600',
    borderColor: 'border-accent-200',
  },
  {
    icon: Globe,
    title: '全国配送',
    description: '日本全国どこへでも。地域を問わず、確実にお荷物をお届けします。',
    features: ['離島対応', '温度管理対応', '大型荷物OK'],
    bgColor: 'bg-secondary-50',
    iconColor: 'text-secondary-600',
    borderColor: 'border-secondary-200',
  },
  {
    icon: Shield,
    title: '保険付き配送',
    description: '大切なお荷物を万全の体制で。最大1000万円までの保険でお守りします。',
    features: ['破損・紛失補償', '即日対応', '安心サポート'],
    bgColor: 'bg-primary-50',
    iconColor: 'text-primary-600',
    borderColor: 'border-primary-200',
  },
  {
    icon: Gauge,
    title: '特急配送',
    description: '緊急のニーズに対応。最優先で配送し、時間厳守でお届けします。',
    features: ['最優先配送', '24時間対応', '専任ドライバー'],
    bgColor: 'bg-accent-50',
    iconColor: 'text-accent-600',
    borderColor: 'border-accent-200',
  },
  {
    icon: Clock,
    title: '時間指定配送',
    description: 'お客様のご都合に合わせて。1時間単位での時間指定が可能です。',
    features: ['1時間単位指定', '土日祝対応', '再配達無料'],
    bgColor: 'bg-secondary-50',
    iconColor: 'text-secondary-600',
    borderColor: 'border-secondary-200',
  },
]

export default function ServicesModern() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-secondary-900 mb-4">
            私たちのサービス
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            お客様のあらゆる配送ニーズに対応する、幅広いサービスをご用意しています
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${service.borderColor}`}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 ${service.bgColor} rounded-bl-full opacity-20`} />
              
              <div className={`w-16 h-16 ${service.bgColor} rounded-2xl flex items-center justify-center mb-6 relative z-10`}>
                <service.icon className={`w-8 h-8 ${service.iconColor}`} />
              </div>

              <h3 className="text-2xl font-bold text-secondary-900 mb-3">
                {service.title}
              </h3>
              
              <p className="text-secondary-600 mb-6">
                {service.description}
              </p>

              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <div className={`w-5 h-5 ${service.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                      <div className={`w-2 h-2 ${service.iconColor.replace('text-', 'bg-')} rounded-full`} />
                    </div>
                    <span className="text-secondary-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`mt-6 w-full py-3 px-6 rounded-xl font-semibold transition-colors ${
                  service.iconColor.includes('primary')
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : service.iconColor.includes('accent')
                    ? 'bg-accent-600 text-white hover:bg-accent-700'
                    : 'bg-secondary-600 text-white hover:bg-secondary-700'
                }`}
              >
                詳細を見る
              </motion.button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-secondary-600 mb-6">
            お客様のニーズに合わせたカスタマイズも承ります
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 bg-primary-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-700 transition-colors shadow-lg"
          >
            <Package className="w-5 h-5" />
            お問い合わせはこちら
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}