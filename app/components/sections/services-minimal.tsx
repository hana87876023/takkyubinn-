"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Truck, Clock, Shield, MapPin } from "lucide-react"

const services = [
  {
    id: 1,
    category: "スピード配送",
    title: "お急ぎの荷物も、確実にお届け",
    description: "緊急の書類から大型貨物まで、お客様のニーズに合わせた最速の配送プランをご提案。当日配送から時間指定配送まで、柔軟に対応いたします。",
    features: [
      { icon: Truck, label: "即日配送", value: "最短2時間" },
      { icon: Clock, label: "時間指定", value: "1時間単位" },
      { icon: MapPin, label: "配送エリア", value: "全国対応" }
    ],
    image: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=800&h=600&fit=crop",
    cta: "配送プランを見る"
  },
  {
    id: 2,
    category: "安心・安全",
    title: "大切な荷物を、確実に守る",
    description: "最新のGPS追跡システムと、経験豊富なドライバーが、お客様の大切な荷物を安全にお届け。万が一に備えた充実の保険制度もご用意しています。",
    features: [
      { icon: Shield, label: "保険適用", value: "全額補償" },
      { icon: MapPin, label: "リアルタイム追跡", value: "GPS対応" },
      { icon: Clock, label: "配送保証", value: "99.8%" }
    ],
    image: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=800&h=600&fit=crop",
    cta: "安全対策を確認"
  }
]

export function ServicesMinimal() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-24 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4">
        {/* セクションヘッダー */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            私たちのサービス
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            お客様のあらゆる配送ニーズに対応する、
            包括的なサービスラインナップをご用意しています。
          </p>
        </motion.div>

        {/* サービスカード */}
        <div className="space-y-24">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white rounded-3xl overflow-hidden shadow-lg"
            >
              <div className={`grid lg:grid-cols-2 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}>
                {/* 画像 */}
                <div className={`relative h-[400px] lg:h-[500px] ${
                  index % 2 === 1 ? 'lg:order-2' : ''
                }`}>
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* コンテンツ */}
                <div className={`p-12 lg:p-16 flex flex-col justify-center ${
                  index % 2 === 1 ? 'lg:order-1' : ''
                }`}>
                  <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider mb-4">
                    {service.category}
                  </span>
                  
                  <h3 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
                    {service.title}
                  </h3>
                  
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    {service.description}
                  </p>

                  {/* 特徴 */}
                  <div className="grid grid-cols-3 gap-6 mb-10">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="text-center">
                        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                          <feature.icon className="w-6 h-6 text-primary-600" />
                        </div>
                        <div className="text-sm text-gray-600 mb-1">{feature.label}</div>
                        <div className="font-semibold text-gray-900">{feature.value}</div>
                      </div>
                    ))}
                  </div>

                  <button className="self-start px-8 py-3 bg-primary-600 text-white rounded-full font-semibold hover:bg-primary-700 transition-colors">
                    {service.cta}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-20"
        >
          <p className="text-gray-600 mb-6">
            その他のサービスについてもお気軽にお問い合わせください
          </p>
          <button className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gray-300 rounded-full font-semibold hover:border-primary-600 hover:text-primary-600 transition-all">
            全てのサービスを見る
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  )
}