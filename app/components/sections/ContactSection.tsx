'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon, 
  ClockIcon 
} from '@heroicons/react/24/outline'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import AnimatedButton from '../ui/AnimatedButton'

const ContactSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // フォーム送信処理
    console.log('Form submitted:', formData)
  }

  const contactInfo = [
    {
      icon: <PhoneIcon className="w-6 h-6" />,
      title: '電話番号',
      content: '03-1234-5678',
      description: '平日 9:00-18:00',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <EnvelopeIcon className="w-6 h-6" />,
      title: 'メールアドレス',
      content: 'info@landbridge.co.jp',
      description: '24時間受付',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: <MapPinIcon className="w-6 h-6" />,
      title: '本社所在地',
      content: '東京都港区○○○○',
      description: '〒107-0000',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: <ClockIcon className="w-6 h-6" />,
      title: '営業時間',
      content: '平日 9:00-18:00',
      description: '土日祝日休み',
      color: 'from-orange-500 to-orange-600'
    }
  ]

  return (
    <section id="contact" className="section py-20">
      <motion.div
        ref={ref}
        className="container mx-auto px-4"
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            お問い合わせ
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            お気軽にお問い合わせください。専門スタッフが迅速に対応いたします。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* 連絡先情報 */}
          <motion.div variants={fadeInUp} className="space-y-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              連絡先情報
            </h3>
            
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-4 glass-card p-6 hover:shadow-lg transition-shadow duration-300"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`bg-gradient-to-r ${info.color} text-white p-3 rounded-lg flex-shrink-0`}>
                  {info.icon}
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">
                    {info.title}
                  </h4>
                  <p className="text-gray-700 font-medium mb-1">
                    {info.content}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {info.description}
                  </p>
                </div>
              </motion.div>
            ))}

            <motion.div
              className="glass-card p-6 bg-gradient-to-r from-blue-50 to-purple-50"
              variants={fadeInUp}
            >
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                緊急時対応
              </h4>
              <p className="text-gray-600 mb-4">
                緊急配送や問題発生時は、24時間対応の緊急ホットラインをご利用ください。
              </p>
              <div className="flex items-center space-x-2">
                <PhoneIcon className="w-5 h-5 text-red-500" />
                <span className="text-red-600 font-semibold">
                  0120-123-456
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* お問い合わせフォーム */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              お問い合わせフォーム
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    お名前 *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="田中 太郎"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    会社名
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="株式会社○○○"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    メールアドレス *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="example@company.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    電話番号
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="03-1234-5678"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  お問い合わせ内容 *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="お問い合わせ内容をご記入ください..."
                />
              </div>

              <AnimatedButton
                onClick={() => {}}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-300"
              >
                お問い合わせを送信
              </AnimatedButton>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default ContactSection