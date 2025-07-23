'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-800/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      {/* グリッドパターン */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

      {/* ヘッダー */}
      <header className="relative z-10 p-6">
        <Link href="/" className="inline-block">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold text-white"
          >
            LandBridge
          </motion.div>
        </Link>
      </header>

      {/* メインコンテンツ */}
      <main className="relative z-10 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>

      {/* フッター */}
      <footer className="relative z-10 p-6 text-center">
        <p className="text-white/60 text-sm">
          © 2024 LandBridge. All rights reserved.
        </p>
      </footer>
    </div>
  )
}