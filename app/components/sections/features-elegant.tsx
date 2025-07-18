"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { CheckCircle, TrendingUp, Users, Award } from "lucide-react"

const features = [
  {
    id: 1,
    title: "最新テクノロジーで効率化",
    subtitle: "AI配送ルート最適化",
    description: "独自開発のAIアルゴリズムが、リアルタイムの交通状況を分析し、最短・最速の配送ルートを自動算出。お客様の時間とコストを大幅に削減します。",
    points: [
      "配送時間を平均30%短縮",
      "燃料コストを25%削減",
      "配送精度99.8%を実現"
    ],
    stats: { number: "30%", label: "時間短縮" },
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&h=600&fit=crop",
    imageAlt: "配送管理システム"
  },
  {
    id: 2,
    title: "24時間365日対応",
    subtitle: "いつでも安心のサポート",
    description: "深夜や休日でも、お客様の緊急のニーズにお応えします。専門スタッフが常駐し、迅速かつ丁寧な対応で、ビジネスの継続性を支えます。",
    points: [
      "緊急配送の即時対応",
      "多言語サポート対応",
      "専門スタッフによる電話サポート"
    ],
    stats: { number: "24/7", label: "常時対応" },
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop",
    imageAlt: "カスタマーサポートチーム"
  },
  {
    id: 3,
    title: "環境への取り組み",
    subtitle: "持続可能な配送を実現",
    description: "電気自動車の導入やカーボンオフセットプログラムを通じて、環境負荷を最小限に抑えた配送を実現。未来の地球のために、今できることを実践しています。",
    points: [
      "CO2排出量を年間40%削減",
      "電気自動車50台導入済み",
      "エコ梱包材の100%使用"
    ],
    stats: { number: "40%", label: "CO2削減" },
    image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&h=600&fit=crop",
    imageAlt: "電気配送車"
  }
]

export function FeaturesElegant() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-24 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        {/* セクションヘッダー */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            私たちの特徴
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            LandBridgeは、最新技術と人間味あふれるサービスを組み合わせ、
            お客様に最高の配送体験をお届けします。
          </p>
        </motion.div>

        {/* フィーチャーリスト */}
        <div className="space-y-32">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`grid lg:grid-cols-2 gap-16 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* 画像側 */}
              <div className={`relative ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={feature.image}
                    alt={feature.imageAlt}
                    fill
                    className="object-cover"
                  />
                  
                  {/* 統計オーバーレイ */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
                    className="absolute bottom-8 right-8 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
                  >
                    <div className="text-3xl font-bold text-primary-600 mb-1">
                      {feature.stats.number}
                    </div>
                    <div className="text-sm text-gray-600">
                      {feature.stats.label}
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* コンテンツ側 */}
              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="mb-6">
                  <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">
                    {feature.subtitle}
                  </span>
                  <h3 className="text-3xl font-bold text-gray-900 mt-2">
                    {feature.title}
                  </h3>
                </div>

                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  {feature.description}
                </p>

                <ul className="space-y-4 mb-8">
                  {feature.points.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>

                <button className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors">
                  詳しく見る
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}