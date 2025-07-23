'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { fadeInLeft } from '@/lib/animations'

const IntroductionSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section id="about" className="min-h-screen relative bg-gradient-to-r from-black/80 via-black/40 to-transparent">
      <div className="container mx-auto flex items-center h-screen">
        {/* 左側：自己紹介文 */}
        <motion.div
          ref={ref}
          className="w-full md:w-1/2 text-white px-8 md:px-16 py-16 md:py-0"
          variants={fadeInLeft}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            代表挨拶
          </motion.h2>
          
          <motion.div
            className="space-y-6 text-lg md:text-xl leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <p>
              お客様の大切な荷物を、まるで自分の家族の贈り物のように
              丁寧に取り扱い、確実にお届けすることが私たちの使命です。
            </p>
            
            <p>
              創業以来、私たちは「迅速・確実・エコロジー」を
              モットーに、お客様の信頼にお応えしてまいりました。
            </p>
            
            <p>
              最新のテクノロジーと人の温かさを融合させ、
              持続可能な未来の物流を築いてまいります。
            </p>
          </motion.div>
          
          <motion.div
            className="mt-12 flex items-center space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-900 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">田中</span>
            </div>
            
            <div>
              <div className="text-2xl font-bold">田中 太郎</div>
              <div className="text-blue-200">代表取締役社長</div>
            </div>
          </motion.div>
          
          {/* 署名アニメーション */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <motion.svg
              width="200"
              height="80"
              viewBox="0 0 200 80"
              className="signature-animation"
            >
              <motion.path
                d="M20 40 Q40 20 60 40 T100 40 Q120 20 140 40 T180 40"
                stroke="white"
                strokeWidth="2"
                fill="none"
                strokeDasharray="1000"
                strokeDashoffset="1000"
                animate={{ strokeDashoffset: 0 }}
                transition={{ delay: 1.5, duration: 3, ease: "easeInOut" }}
              />
            </motion.svg>
          </motion.div>
        </motion.div>
        
        {/* 右側：人物画像のスペース（固定背景が表示される） */}
        <div className="hidden md:block w-1/2 h-full" />
      </div>
    </section>
  )
}

export default IntroductionSection