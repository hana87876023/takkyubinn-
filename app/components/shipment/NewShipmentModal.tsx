'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Package, MapPin, Calculator, AlertCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { calculateShippingFee } from '@/lib/shipping-calculator'
import { AddressForm } from './AddressForm'
import { useAuth } from '@/contexts/AuthContext'
import { storage } from '@/lib/storage'

// フォームスキーマ
const shipmentSchema = z.object({
  // 荷物情報
  packageType: z.enum(['letter', 'parcel', 'largeParcel']),
  weight: z.number().min(0.1, '重量を入力してください').max(30, '30kg以下で入力してください'),
  dimensions: z.object({
    length: z.number().min(1, '長さを入力してください').max(170, '170cm以下で入力してください'),
    width: z.number().min(1, '幅を入力してください').max(170, '170cm以下で入力してください'),
    height: z.number().min(1, '高さを入力してください').max(170, '170cm以下で入力してください')
  }),
  fragile: z.boolean(),
  
  // 送り主情報
  sender: z.object({
    name: z.string().min(1, 'お名前を入力してください'),
    phone: z.string().regex(/^0\d{9,10}$/, '有効な電話番号を入力してください'),
    postalCode: z.string().regex(/^\d{3}-?\d{4}$/, '有効な郵便番号を入力してください'),
    prefecture: z.string().min(1, '都道府県を選択してください'),
    city: z.string().min(1, '市区町村を入力してください'),
    address1: z.string().min(1, '番地を入力してください'),
    address2: z.string().optional()
  }),
  
  // 送り先情報
  recipient: z.object({
    name: z.string().min(1, 'お名前を入力してください'),
    phone: z.string().regex(/^0\d{9,10}$/, '有効な電話番号を入力してください'),
    postalCode: z.string().regex(/^\d{3}-?\d{4}$/, '有効な郵便番号を入力してください'),
    prefecture: z.string().min(1, '都道府県を選択してください'),
    city: z.string().min(1, '市区町村を入力してください'),
    address1: z.string().min(1, '番地を入力してください'),
    address2: z.string().optional()
  }),
  
  // 配送オプション
  deliverySpeed: z.enum(['normal', 'express', 'timeSpecified']),
  deliveryDate: z.string().optional(),
  deliveryTime: z.string().optional(),
  insurance: z.boolean(),
  cashOnDelivery: z.boolean()
})

type ShipmentFormData = z.infer<typeof shipmentSchema>

interface NewShipmentModalProps {
  isOpen: boolean
  onClose: () => void
}

export function NewShipmentModal({ isOpen, onClose }: NewShipmentModalProps) {
  const [step, setStep] = useState(1)
  const [isCalculating, setIsCalculating] = useState(false)
  const [estimatedFee, setEstimatedFee] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user } = useAuth()
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<ShipmentFormData>({
    resolver: zodResolver(shipmentSchema),
    defaultValues: {
      packageType: 'parcel',
      deliverySpeed: 'normal',
      fragile: false,
      insurance: false,
      cashOnDelivery: false
    }
  })
  
  const watchedData = watch()
  
  // 料金自動計算
  useEffect(() => {
    const calculateFee = async () => {
      if (
        watchedData.weight && 
        watchedData.dimensions?.length && 
        watchedData.dimensions?.width && 
        watchedData.dimensions?.height &&
        watchedData.sender?.postalCode && 
        watchedData.recipient?.postalCode
      ) {
        setIsCalculating(true)
        try {
          const fee = await calculateShippingFee({
            weight: watchedData.weight,
            dimensions: watchedData.dimensions,
            senderPostalCode: watchedData.sender.postalCode,
            recipientPostalCode: watchedData.recipient.postalCode,
            deliverySpeed: watchedData.deliverySpeed,
            insurance: watchedData.insurance
          })
          setEstimatedFee(fee)
        } catch (error) {
          console.error('料金計算エラー:', error)
        } finally {
          setIsCalculating(false)
        }
      }
    }
    
    const debounce = setTimeout(calculateFee, 500)
    return () => clearTimeout(debounce)
  }, [watchedData])
  
  const onFormSubmit = async (data: ShipmentFormData) => {
    if (!estimatedFee || !user) return
    
    setIsSubmitting(true)
    try {
      // 新しい注文を作成
      const newOrder = {
        id: `order_${Date.now()}`,
        userId: user.id,
        trackingNumber: `LB${Date.now()}`,
        status: 'pending' as const,
        origin: {
          street: `${data.sender.address1} ${data.sender.address2 || ''}`.trim(),
          city: data.sender.city,
          state: data.sender.prefecture,
          zipCode: data.sender.postalCode,
          country: '日本'
        },
        destination: {
          street: `${data.recipient.address1} ${data.recipient.address2 || ''}`.trim(),
          city: data.recipient.city,
          state: data.recipient.prefecture,
          zipCode: data.recipient.postalCode,
          country: '日本'
        },
        items: [{
          id: `item_${Date.now()}`,
          name: data.packageType === 'letter' ? '書類' : data.packageType === 'parcel' ? '小包' : '大型荷物',
          quantity: 1,
          weight: data.weight,
          dimensions: data.dimensions,
          price: estimatedFee
        }],
        totalPrice: estimatedFee,
        createdAt: new Date(),
        estimatedDelivery: calculateEstimatedDelivery(data.deliverySpeed)
      }
      
      // ローカルストレージに保存
      const existingOrders = storage.getOrders()
      storage.saveOrders([...existingOrders, newOrder])
      
      // 成功通知とモーダルを閉じる
      alert('配送依頼が完了しました！')
      onClose()
      
      // フォームをリセット
      setStep(1)
      setEstimatedFee(null)
    } catch (error) {
      console.error('配送依頼エラー:', error)
      alert('配送依頼に失敗しました。もう一度お試しください。')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* オーバーレイ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          
          {/* モーダル */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-4xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden">
              {/* ヘッダー */}
              <div className="relative bg-gradient-to-r from-blue-900 to-pink-600 p-6 text-white">
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 p-2 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <h2 className="text-2xl font-bold mb-2">新しい配送を依頼</h2>
                <p className="text-white/80">簡単3ステップで配送依頼が完了します</p>
                
                {/* ステップインジケーター */}
                <div className="flex items-center gap-4 mt-6">
                  {[
                    { step: 1, label: '荷物情報' },
                    { step: 2, label: '住所入力' },
                    { step: 3, label: '確認・決済' }
                  ].map((item) => (
                    <div key={item.step} className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold transition-all ${
                        step >= item.step ? 'bg-white text-blue-900' : 'bg-white/20 text-white/60'
                      }`}>
                        {item.step}
                      </div>
                      <span className={`text-sm hidden sm:block ${
                        step >= item.step ? 'text-white' : 'text-white/60'
                      }`}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* フォーム本体 */}
              <form onSubmit={handleSubmit(onFormSubmit)} className="p-6 overflow-y-auto max-h-[60vh]">
                {/* ステップ1: 荷物情報 */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Package className="w-5 h-5 text-blue-900" />
                        荷物の詳細
                      </h3>
                      
                      {/* 荷物タイプ */}
                      <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">荷物の種類</label>
                        <div className="grid grid-cols-3 gap-4">
                          {[
                            { value: 'letter', label: '封筒・書類', icon: '📧', desc: 'A4サイズまで' },
                            { value: 'parcel', label: '小包', icon: '📦', desc: '60サイズまで' },
                            { value: 'largeParcel', label: '大型荷物', icon: '🏠', desc: '170サイズまで' }
                          ].map((type) => (
                            <label
                              key={type.value}
                              className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all ${
                                watchedData.packageType === type.value
                                  ? 'border-blue-900 bg-blue-50 dark:bg-blue-950/20'
                                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                              }`}
                            >
                              <input
                                type="radio"
                                value={type.value}
                                {...register('packageType')}
                                className="sr-only"
                              />
                              <div className="text-center">
                                <div className="text-2xl mb-2">{type.icon}</div>
                                <div className="font-medium">{type.label}</div>
                                <div className="text-xs text-gray-500 mt-1">{type.desc}</div>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                      
                      {/* サイズ・重量 */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">重量 (kg)</label>
                          <input
                            type="number"
                            step="0.1"
                            {...register('weight', { valueAsNumber: true })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-900 dark:bg-slate-800"
                            placeholder="0.5"
                          />
                          {errors.weight && (
                            <p className="mt-1 text-sm text-red-600">{errors.weight.message}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">3辺のサイズ (cm)</label>
                          <div className="grid grid-cols-3 gap-2">
                            <input
                              type="number"
                              {...register('dimensions.length', { valueAsNumber: true })}
                              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-900 dark:bg-slate-800"
                              placeholder="縦"
                            />
                            <input
                              type="number"
                              {...register('dimensions.width', { valueAsNumber: true })}
                              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-900 dark:bg-slate-800"
                              placeholder="横"
                            />
                            <input
                              type="number"
                              {...register('dimensions.height', { valueAsNumber: true })}
                              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-900 dark:bg-slate-800"
                              placeholder="高さ"
                            />
                          </div>
                          {(errors.dimensions?.length || errors.dimensions?.width || errors.dimensions?.height) && (
                            <p className="mt-1 text-sm text-red-600">3辺のサイズを入力してください</p>
                          )}
                        </div>
                      </div>
                      
                      {/* オプション */}
                      <div className="flex items-center gap-6 mt-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            {...register('fragile')}
                            className="w-4 h-4 text-blue-900 rounded"
                          />
                          <span className="text-sm">壊れ物</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            {...register('insurance')}
                            className="w-4 h-4 text-blue-900 rounded"
                          />
                          <span className="text-sm">保険付き</span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="px-6 py-3 bg-gradient-to-r from-blue-900 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                      >
                        次へ: 住所入力
                      </button>
                    </div>
                  </motion.div>
                )}
                
                {/* ステップ2: 住所入力 */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-8"
                  >
                    {/* 送り主情報 */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-blue-900" />
                        送り主情報
                      </h3>
                      <AddressForm prefix="sender" register={register} errors={errors.sender} />
                    </div>
                    
                    {/* 送り先情報 */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-pink-600" />
                        送り先情報
                      </h3>
                      <AddressForm prefix="recipient" register={register} errors={errors.recipient} />
                    </div>
                    
                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                      >
                        戻る
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="px-6 py-3 bg-gradient-to-r from-blue-900 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                      >
                        次へ: 確認
                      </button>
                    </div>
                  </motion.div>
                )}
                
                {/* ステップ3: 確認・決済 */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    {/* 料金計算結果 */}
                    <div className="bg-gradient-to-r from-blue-50 to-pink-50 dark:from-blue-950/20 dark:to-pink-900/20 rounded-xl p-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Calculator className="w-5 h-5 text-blue-900" />
                        料金計算
                      </h3>
                      
                      {isCalculating ? (
                        <div className="flex items-center justify-center py-8">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900"></div>
                        </div>
                      ) : estimatedFee ? (
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 dark:text-gray-400">基本料金</span>
                            <span className="font-medium">¥{estimatedFee.toLocaleString()}</span>
                          </div>
                          {watchedData.insurance && (
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600 dark:text-gray-400">保険料</span>
                              <span className="font-medium">¥380</span>
                            </div>
                          )}
                          <div className="border-t pt-3">
                            <div className="flex justify-between items-center">
                              <span className="text-lg font-semibold">合計</span>
                              <span className="text-2xl font-bold text-blue-900">
                                ¥{estimatedFee.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          料金を計算中...
                        </div>
                      )}
                    </div>
                    
                    {/* 配送オプション */}
                    <div>
                      <h4 className="font-medium mb-3">配送スピード</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          { value: 'normal', label: '通常配送', desc: '2-3営業日', price: 0 },
                          { value: 'express', label: '速達', desc: '翌日配送', price: 350 },
                          { value: 'timeSpecified', label: '時間指定', desc: '希望時間に配送', price: 220 }
                        ].map((option) => (
                          <label
                            key={option.value}
                            className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
                              watchedData.deliverySpeed === option.value
                                ? 'border-blue-900 bg-blue-50 dark:bg-blue-950/20'
                                : 'border-gray-200 dark:border-gray-700'
                            }`}
                          >
                            <input
                              type="radio"
                              value={option.value}
                              {...register('deliverySpeed')}
                              className="sr-only"
                            />
                            <div>
                              <div className="font-medium">{option.label}</div>
                              <div className="text-sm text-gray-500">{option.desc}</div>
                              {option.price > 0 && (
                                <div className="text-sm font-medium text-blue-900 mt-1">
                                  +¥{option.price}
                                </div>
                              )}
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                      >
                        戻る
                      </button>
                      <button
                        type="submit"
                        disabled={!estimatedFee || isSubmitting}
                        className="px-8 py-3 bg-gradient-to-r from-blue-900 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      >
                        {isSubmitting ? '処理中...' : '配送を依頼する'}
                      </button>
                    </div>
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function calculateEstimatedDelivery(speed: string): Date {
  const now = new Date()
  switch (speed) {
    case 'express':
      now.setDate(now.getDate() + 1)
      break
    case 'timeSpecified':
      now.setDate(now.getDate() + 2)
      break
    default:
      now.setDate(now.getDate() + 3)
  }
  return now
}