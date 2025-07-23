'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon 
} from '@heroicons/react/24/outline'
import { staggerContainer, fadeInUp } from '@/lib/animations'

const Footer = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const footerLinks = {
    services: [
      { name: '即日配送', href: '#services' },
      { name: '時間指定配送', href: '#services' },
      { name: '安全配送', href: '#services' },
      { name: '全国対応', href: '#services' }
    ],
    company: [
      { name: '会社概要', href: '#about' },
      { name: '代表挨拶', href: '#about' },
      { name: '採用情報', href: '#' },
      { name: 'ニュース', href: '#' }
    ],
    support: [
      { name: 'お問い合わせ', href: '#contact' },
      { name: '配送状況確認', href: '#' },
      { name: 'よくある質問', href: '#' },
      { name: '利用規約', href: '#' }
    ]
  }

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: 'facebook' },
    { name: 'Twitter', href: '#', icon: 'twitter' },
    { name: 'LinkedIn', href: '#', icon: 'linkedin' },
    { name: 'Instagram', href: '#', icon: 'instagram' }
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <motion.div
        ref={ref}
        className="container mx-auto px-4 py-16"
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* 会社情報 */}
          <motion.div variants={fadeInUp} className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-900 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">LB</span>
              </div>
              <span className="text-2xl font-bold">LandBridge運送</span>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              迅速・確実・エコロジーな配送サービスで、お客様の大切な荷物を安全にお届けします。
              最新技術と豊富な経験を活かし、持続可能な物流サービスを提供しています。
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <PhoneIcon className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">03-1234-5678</span>
              </div>
              <div className="flex items-center space-x-3">
                <EnvelopeIcon className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">info@landbridge.co.jp</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPinIcon className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">東京都港区○○○○ 〒107-0000</span>
              </div>
            </div>
          </motion.div>

          {/* サービス */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-lg font-semibold mb-4">サービス</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <motion.a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* 会社情報 */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-lg font-semibold mb-4">会社情報</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <motion.a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          variants={fadeInUp}
          className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 LandBridge運送株式会社. All rights reserved.
          </p>
          
          <div className="flex space-x-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="text-xs font-bold">
                  {social.name.charAt(0)}
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </footer>
  )
}

export default Footer