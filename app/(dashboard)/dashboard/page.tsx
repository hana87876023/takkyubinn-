'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { DashboardStats } from '@/components/dashboard/DashboardStats'
import { RecentOrders } from '@/components/dashboard/RecentOrders'
import { NewShipmentModal } from '@/components/shipment/NewShipmentModal'
import { Plus, TrendingUp, Calendar, Bell } from 'lucide-react'

export default function DashboardPage() {
  const { user } = useAuth()
  const [isShipmentModalOpen, setIsShipmentModalOpen] = useState(false)

  return (
    <div className="space-y-8">
      {/* ウェルカムセクション */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900 to-pink-600 p-8 text-white"
      >
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">
            おかえりなさい、{user?.name}様
          </h1>
          <p className="text-white/80 mb-6">
            本日も配送管理をサポートします。素晴らしい一日をお過ごしください。
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsShipmentModalOpen(true)}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors"
            >
              <Plus className="w-5 h-5" />
              新しい配送を依頼
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
            >
              <TrendingUp className="w-5 h-5" />
              レポートを確認
            </motion.button>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute right-20 bottom-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
      </motion.div>

      {/* 統計カード */}
      <DashboardStats />

      {/* グリッドレイアウト */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 最近の注文 */}
        <div className="lg:col-span-2">
          <RecentOrders />
        </div>

        {/* サイドバー */}
        <div className="space-y-6">
          {/* 今日の予定 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-5 h-5 text-blue-900" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                今日の予定
              </h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    配送完了確認
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    10:00 AM
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    顧客対応
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    2:00 PM
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    週次レポート作成
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    4:00 PM
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 通知 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center gap-3 mb-4">
              <Bell className="w-5 h-5 text-blue-900" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                最新の通知
              </h3>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm font-medium text-blue-900 dark:text-blue-300">
                  配送完了
                </p>
                <p className="text-xs text-blue-700 dark:text-blue-400">
                  注文 #LB2024001 が配送完了しました
                </p>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <p className="text-sm font-medium text-green-900 dark:text-green-300">
                  新しい注文
                </p>
                <p className="text-xs text-green-700 dark:text-green-400">
                  新しい配送依頼が届きました
                </p>
              </div>
              <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                <p className="text-sm font-medium text-orange-900 dark:text-orange-300">
                  配送遅延
                </p>
                <p className="text-xs text-orange-700 dark:text-orange-400">
                  注文 #LB2024003 で遅延が発生しています
                </p>
              </div>
            </div>
          </motion.div>

          {/* クイックアクション */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              クイックアクション
            </h3>
            <div className="space-y-3">
              <button 
                onClick={() => setIsShipmentModalOpen(true)}
                className="w-full p-3 text-left bg-gradient-to-r from-blue-800 to-pink-500 text-white rounded-lg hover:from-blue-900 hover:to-pink-600 transition-all"
              >
                <p className="font-medium">新しい配送を依頼</p>
                <p className="text-sm opacity-90">配送依頼フォームを開く</p>
              </button>
              <button className="w-full p-3 text-left bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-slate-600 transition-all">
                <p className="font-medium">配送状況を確認</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  リアルタイムで追跡
                </p>
              </button>
              <button className="w-full p-3 text-left bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-slate-600 transition-all">
                <p className="font-medium">レポートを確認</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  月次・年次レポート
                </p>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 配送依頼モーダル */}
      <NewShipmentModal 
        isOpen={isShipmentModalOpen} 
        onClose={() => setIsShipmentModalOpen(false)} 
      />
    </div>
  )
}