'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { RegisterForm } from '@/components/auth/RegisterForm'

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleRegisterSuccess = () => {
    setIsLoading(true)
    // 登録成功時にダッシュボードへリダイレクト
    router.push('/dashboard')
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-white mb-2">
          はじめまして
        </h1>
        <p className="text-white/80">
          アカウントを作成して配送管理を始めましょう
        </p>
      </motion.div>

      <RegisterForm onSuccess={handleRegisterSuccess} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        <p className="text-white/60 text-sm">
          既にアカウントをお持ちの場合は{' '}
          <Link 
            href="/login" 
            className="text-blue-700 hover:text-blue-600 font-medium underline"
          >
            ログイン
          </Link>
        </p>
      </motion.div>

      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              アカウントを作成中...
            </p>
          </div>
        </motion.div>
      )}
    </div>
  )
}