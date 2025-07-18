'use client'

import { motion } from 'framer-motion'
import { 
  Package, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  ArrowUp, 
  ArrowDown,
  Truck,
  CheckCircle
} from 'lucide-react'

interface StatCardProps {
  title: string
  value: string
  change: string
  changeType: 'increase' | 'decrease' | 'neutral'
  icon: React.ComponentType<{ className?: string }>
  gradient: string
}

function StatCard({ title, value, change, changeType, icon: Icon, gradient }: StatCardProps) {
  const changeColor = {
    increase: 'text-green-500',
    decrease: 'text-red-500',
    neutral: 'text-gray-500'
  }

  const ChangeIcon = changeType === 'increase' ? ArrowUp : changeType === 'decrease' ? ArrowDown : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${gradient} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {ChangeIcon && (
          <div className={`flex items-center gap-1 text-sm ${changeColor[changeType]}`}>
            <ChangeIcon className="w-4 h-4" />
            {change}
          </div>
        )}
      </div>
      <h3 className="text-gray-600 dark:text-gray-400 text-sm mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
    </motion.div>
  )
}

export function DashboardStats() {
  const stats = [
    {
      title: '総注文数',
      value: '142',
      change: '+8.2%',
      changeType: 'increase' as const,
      icon: Package,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: '配送完了率',
      value: '98.5%',
      change: '+2.1%',
      changeType: 'increase' as const,
      icon: CheckCircle,
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      title: '配送中',
      value: '8',
      change: '+3',
      changeType: 'increase' as const,
      icon: Truck,
      gradient: 'from-orange-500 to-red-500'
    },
    {
      title: '平均配送時間',
      value: '2.3時間',
      change: '-12分',
      changeType: 'increase' as const,
      icon: Clock,
      gradient: 'from-purple-500 to-pink-500'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <StatCard {...stat} />
        </motion.div>
      ))}
    </div>
  )
}