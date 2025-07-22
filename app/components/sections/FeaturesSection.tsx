'use client'

import { useState, useEffect, useRef } from 'react'

const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      title: "リアルタイム追跡",
      description: "お荷物の位置を24時間リアルタイムで追跡。スマートフォンやPCから、いつでもどこでも配送状況を確認できます。",
      image: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=400&h=220&fit=crop&auto=format",
      stats: {
        accuracy: "99.8%",
        time: "24/7"
      },
      statLabels: {
        accuracy: "追跡精度",
        time: "稼働時間"
      }
    },
    {
      id: 2,
      title: "自動化システム",
      description: "AIを活用した最適な配送ルートの自動計算。効率的な配送で、お客様により早く商品をお届けします。",
      image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&h=220&fit=crop&auto=format",
      stats: {
        timeSave: "35%",
        efficiency: "50%"
      },
      statLabels: {
        timeSave: "時間短縮",
        efficiency: "効率向上"
      }
    },
    {
      id: 3,
      title: "専門スタッフ",
      description: "経験豊富なプロフェッショナルが、大切なお荷物を丁寧に取り扱い、安全にお届けします。",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=220&fit=crop&auto=format",
      stats: {
        staff: "500+",
        experience: "15年"
      },
      statLabels: {
        staff: "専門家",
        experience: "平均経験"
      }
    },
    {
      id: 4,
      title: "安全保障",
      description: "完全な保険適用で安心・安全な配送をお約束。万が一の場合も、迅速かつ適切に対応いたします。",
      image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=220&fit=crop&auto=format",
      stats: {
        coverage: "100%",
        accident: "0.01%"
      },
      statLabels: {
        coverage: "保険適用",
        accident: "事故率"
      }
    }
  ]

  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'))
            if (!visibleCards.includes(index)) {
              setVisibleCards((prev) => [...prev, index])
            }
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    return () => {
      cardsRef.current.forEach((card) => {
        if (card) observer.unobserve(card)
      })
    }
  }, [visibleCards])

  return (
    <section id="features" className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration - removed for white background */}
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 opacity-0 animate-fadeInUp">
          <p className="text-sm uppercase tracking-widest text-purple-500 font-medium mb-2">
            Our Features
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-5 text-gray-900">
            私たちの特徴
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            最新技術と豊富な経験を組み合わせた、信頼性の高い配送サービス
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              ref={(el) => {
                if (el) {
                  cardsRef.current[index] = el;
                }
              }}
              data-index={index}
              className={`
                bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm
                hover:border-purple-500/30 hover:shadow-lg
                transition-all duration-300 cursor-pointer group
                ${visibleCards.includes(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
                }
              `}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Image Area */}
              <div className="relative h-56 overflow-hidden bg-white">
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300" />
                
                {/* Hover Icon Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 bg-purple-600/90 rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-8 bg-white">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* Stats */}
                <div className="flex gap-6 pt-6 border-t border-gray-200">
                  {Object.entries(feature.stats).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <span className="text-2xl font-bold text-purple-500 block">
                        {value}
                      </span>
                      <span className="text-xs uppercase text-gray-600 tracking-wider mt-1 block">
                        {feature.statLabels[key as keyof typeof feature.statLabels]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease forwards;
        }
      `}</style>
    </section>
  )
}

export default FeaturesSection