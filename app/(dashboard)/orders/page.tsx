'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Package, Calendar, MapPin, Eye, Download, Filter, Truck, CheckCircle, Clock, XCircle } from 'lucide-react'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { storage } from '@/lib/storage'
import { Order } from '@/lib/types'
import { useAuth } from '@/contexts/AuthContext'

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [filter, setFilter] = useState('all')
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    fetchOrders()
  }, [filter, user])

  const fetchOrders = () => {
    setIsLoading(true)
    try {
      const allOrders = storage.getOrders()
      let filteredOrders = allOrders.filter(order => 
        order.userId === user?.id || order.userId === 'user_demo'
      )

      // フィルター適用
      if (filter !== 'all') {
        filteredOrders = filteredOrders.filter(order => order.status === filter)
      }

      // 日付順でソート（新しい順）
      filteredOrders.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )

      setOrders(filteredOrders)
    } catch (error) {
      console.error('注文の取得に失敗しました:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />
      case 'processing':
        return <Package className="w-4 h-4" />
      case 'in_transit':
        return <Truck className="w-4 h-4" />
      case 'delivered':
        return <CheckCircle className="w-4 h-4" />
      case 'cancelled':
        return <XCircle className="w-4 h-4" />
      default:
        return <Package className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'processing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      case 'in_transit':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
      case 'delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return '受付中'
      case 'processing':
        return '処理中'
      case 'in_transit':
        return '配送中'
      case 'delivered':
        return '配送完了'
      case 'cancelled':
        return 'キャンセル'
      default:
        return '不明'
    }
  }

  const formatAddress = (address: any) => {
    if (typeof address === 'string') return address
    return `${address.state} ${address.city} ${address.street}`
  }

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">注文履歴</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            過去の配送履歴を確認できます
          </p>
        </div>
        
        {/* フィルター */}
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 focus:ring-2 focus:ring-purple-600"
          >
            <option value="all">すべて</option>
            <option value="pending">受付中</option>
            <option value="processing">処理中</option>
            <option value="in_transit">配送中</option>
            <option value="delivered">配送完了</option>
            <option value="cancelled">キャンセル</option>
          </select>
        </div>
      </div>

      {/* 注文リスト */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">注文履歴がありません</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {orders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-all p-6"
            >
              <div className="flex flex-col lg:flex-row justify-between gap-4">
                {/* 左側：基本情報 */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <Package className="w-5 h-5 text-purple-600" />
                        追跡番号: {order.trackingNumber}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        注文日: {format(new Date(order.createdAt), 'yyyy年MM月dd日 HH:mm', { locale: ja })}
                      </p>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {getStatusText(order.status)}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">送り主</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {formatAddress(order.origin)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">送り先</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {formatAddress(order.destination)}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* 右側：詳細情報とアクション */}
                <div className="lg:w-64 space-y-4">
                  <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">商品数</span>
                        <span className="font-medium">{order.items.length}個</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">総重量</span>
                        <span className="font-medium">
                          {order.items.reduce((sum, item) => sum + item.weight, 0).toFixed(1)}kg
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">配送予定</span>
                        <span className="font-medium">
                          {format(new Date(order.estimatedDelivery), 'MM/dd', { locale: ja })}
                        </span>
                      </div>
                      <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">料金</span>
                          <span className="font-bold text-lg">¥{order.totalPrice.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => alert(`追跡番号: ${order.trackingNumber}\n現在のステータス: ${getStatusText(order.status)}`)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      追跡
                    </button>
                    <button
                      onClick={() => alert('請求書のダウンロード機能は準備中です')}
                      className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}