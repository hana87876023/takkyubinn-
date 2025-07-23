'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { User, Mail, Phone, MapPin, Building2, Calendar, Save, Camera } from 'lucide-react'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'

export default function ProfilePage() {
  const { user, updateUser } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    company: user?.company || '',
    address: user?.address || '',
  })

  const handleSave = () => {
    updateUser(formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      company: user?.company || '',
      address: user?.address || '',
    })
    setIsEditing(false)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* プロフィールヘッダー */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden"
      >
        <div className="bg-gradient-to-r from-blue-900 to-pink-600 p-8 text-white">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-white text-blue-900 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div>
              <h1 className="text-2xl font-bold mb-1">{user?.name}</h1>
              <p className="text-white/80">{user?.email}</p>
              <p className="text-sm text-white/60 mt-2">
                メンバー登録日: {user?.createdAt ? format(new Date(user.createdAt), 'yyyy年MM月dd日', { locale: ja }) : '2024年1月1日'}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* プロフィール情報 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            プロフィール情報
          </h2>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-950 transition-colors"
            >
              編集
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
              >
                キャンセル
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-950 transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                保存
              </button>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {/* 名前 */}
          <div className="flex items-start gap-4">
            <User className="w-5 h-5 text-gray-400 mt-1" />
            <div className="flex-1">
              <label className="text-sm text-gray-600 dark:text-gray-400">名前</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                />
              ) : (
                <p className="text-gray-900 dark:text-white">{user?.name}</p>
              )}
            </div>
          </div>

          {/* メールアドレス */}
          <div className="flex items-start gap-4">
            <Mail className="w-5 h-5 text-gray-400 mt-1" />
            <div className="flex-1">
              <label className="text-sm text-gray-600 dark:text-gray-400">メールアドレス</label>
              {isEditing ? (
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                />
              ) : (
                <p className="text-gray-900 dark:text-white">{user?.email}</p>
              )}
            </div>
          </div>

          {/* 電話番号 */}
          <div className="flex items-start gap-4">
            <Phone className="w-5 h-5 text-gray-400 mt-1" />
            <div className="flex-1">
              <label className="text-sm text-gray-600 dark:text-gray-400">電話番号</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="090-1234-5678"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                />
              ) : (
                <p className="text-gray-900 dark:text-white">{user?.phone || '未設定'}</p>
              )}
            </div>
          </div>

          {/* 会社名 */}
          <div className="flex items-start gap-4">
            <Building2 className="w-5 h-5 text-gray-400 mt-1" />
            <div className="flex-1">
              <label className="text-sm text-gray-600 dark:text-gray-400">会社名</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="株式会社サンプル"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                />
              ) : (
                <p className="text-gray-900 dark:text-white">{user?.company || '未設定'}</p>
              )}
            </div>
          </div>

          {/* 住所 */}
          <div className="flex items-start gap-4">
            <MapPin className="w-5 h-5 text-gray-400 mt-1" />
            <div className="flex-1">
              <label className="text-sm text-gray-600 dark:text-gray-400">住所</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="東京都千代田区..."
                  className="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                />
              ) : (
                <p className="text-gray-900 dark:text-white">{user?.address || '未設定'}</p>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* アカウント統計 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 text-center">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-950/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <Calendar className="w-6 h-6 text-blue-900" />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">365</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">利用日数</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 text-center">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <Building2 className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">150</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">総配送数</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 text-center">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <MapPin className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">25</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">配送先都道府県</p>
        </div>
      </motion.div>
    </div>
  )
}