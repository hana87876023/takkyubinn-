'use client'

import { useState, useEffect, useRef } from 'react'
import { 
  ChartBarIcon, 
  CogIcon, 
  UserGroupIcon, 
  ShieldCheckIcon,
  ArrowRightIcon,
  WifiIcon,
  SignalIcon
} from '@heroicons/react/24/outline'

const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      title: "リアルタイム追跡",
      description: "24時間体制での配送状況モニタリング",
      icon: <ChartBarIcon className="w-6 h-6" />,
      status: "オンライン",
      metrics: {
        accuracy: "99.9%",
        updateFreq: "5秒",
        coverage: "全国対応"
      },
      color: "from-cyan-500 to-blue-500"
    },
    {
      id: 2,
      title: "自動化システム",
      description: "AI駆動の配送ルート最適化",
      icon: <CogIcon className="w-6 h-6" />,
      status: "稼働中",
      metrics: {
        efficiency: "92%",
        routes: "1,250+",
        savings: "35%削減"
      },
      color: "from-emerald-500 to-teal-500"
    },
    {
      id: 3,
      title: "専門スタッフ",
      description: "プロフェッショナルサポート",
      icon: <UserGroupIcon className="w-6 h-6" />,
      status: "対応可能",
      metrics: {
        staff: "150+名",
        response: "< 5分",
        satisfaction: "98%"
      },
      color: "from-violet-500 to-purple-500"
    },
    {
      id: 4,
      title: "安全保障",
      description: "完全保険適用システム",
      icon: <ShieldCheckIcon className="w-6 h-6" />,
      status: "保護中",
      metrics: {
        coverage: "100%",
        claims: "24時間",
        security: "最高級"
      },
      color: "from-orange-500 to-red-500"
    }
  ]

  const [activeFeature, setActiveFeature] = useState(0)
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [features.length])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'))
            setVisibleCards((prev) => [...prev, index])
          }
        })
      },
      { threshold: 0.1 }
    )

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    return () => {
      cardsRef.current.forEach((card) => {
        if (card) observer.unobserve(card)
      })
    }
  }, [])

  return (
    <section id="features" className="py-20 bg-black relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent animate-pulse" />
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-purple-500/20 to-transparent animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <SignalIcon className="w-5 h-5 text-cyan-400 animate-pulse" />
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Service Monitor v2.0</span>
            <WifiIcon className="w-5 h-5 text-cyan-400 animate-pulse" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="font-mono bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              サービス監視システム
            </span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto font-mono">
            All Systems Operational • リアルタイム稼働状況
          </p>
        </div>

        {/* Monitor Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              ref={(el) => (cardsRef.current[index] = el)}
              data-index={index}
              className={`
                relative group cursor-pointer
                ${visibleCards.includes(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
                }
                transition-all duration-500
              `}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => setActiveFeature(index)}
            >
              {/* Monitor Frame */}
              <div className={`
                relative bg-gray-900 rounded-lg overflow-hidden
                border-2 transition-all duration-300
                ${activeFeature === index 
                  ? 'border-cyan-500 shadow-lg shadow-cyan-500/50' 
                  : 'border-gray-800 hover:border-gray-700'
                }
              `}>
                {/* Monitor Screen */}
                <div className="bg-black p-6">
                  {/* Status Bar */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${feature.color} bg-opacity-20`}>
                        <div className="text-white">
                          {feature.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white font-mono">
                          {feature.title}
                        </h3>
                        <p className="text-xs text-gray-500 font-mono">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-xs text-green-500 font-mono">
                        {feature.status}
                      </span>
                    </div>
                  </div>

                  {/* Metrics Display */}
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(feature.metrics).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-xl font-bold text-cyan-400 font-mono">
                          {value}
                        </div>
                        <div className="text-xs text-gray-600 font-mono capitalize">
                          {key}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${feature.color} transition-all duration-1000`}
                        style={{ 
                          width: activeFeature === index ? '100%' : '0%',
                          transition: activeFeature === index ? 'width 5s linear' : 'width 0.3s'
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Monitor Stand */}
                <div className="h-4 bg-gray-800 border-t border-gray-700" />
                <div className="h-2 bg-gradient-to-b from-gray-800 to-gray-900" />
              </div>

              {/* Active Indicator */}
              {activeFeature === index && (
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg opacity-20 blur animate-pulse" />
              )}
            </div>
          ))}
        </div>

        {/* Central Control Panel */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-mono text-white">
                システムコントロールパネル
              </h3>
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-gray-500">
                  最終更新: {new Date().toLocaleTimeString('ja-JP')}
                </span>
                <button className="px-4 py-2 bg-cyan-500 text-black font-mono text-xs rounded hover:bg-cyan-400 transition-colors">
                  詳細を見る
                </button>
              </div>
            </div>
            
            {/* Active Service Details */}
            <div className="bg-black rounded p-4 font-mono text-sm">
              <div className="text-cyan-400 mb-2">
                &gt; 現在監視中: {features[activeFeature].title}
              </div>
              <div className="text-gray-400">
                &gt; ステータス: <span className="text-green-400">{features[activeFeature].status}</span>
              </div>
              <div className="text-gray-400">
                &gt; パフォーマンス: <span className="text-cyan-400">最適</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>
    </section>
  )
}

export default FeaturesSection