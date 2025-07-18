'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { LoginForm } from '@/components/auth/LoginForm'

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLoginSuccess = () => {
    setIsLoading(true)
    // ログイン成功時にダッシュボードへリダイレクト
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
          おかえりなさい
        </h1>
        <p className="text-white/80">
          あなたの配送管理をサポートします
        </p>
      </motion.div>

      <LoginForm onSuccess={handleLoginSuccess} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        <p className="text-white/60 text-sm">
          アカウントをお持ちでない場合は{' '}
          <Link 
            href="/register" 
            className="text-purple-400 hover:text-purple-300 font-medium underline"
          >
            新規登録
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
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              ダッシュボードに移動中...
            </p>
          </div>
        </motion.div>
      )}
    </div>
  )
}