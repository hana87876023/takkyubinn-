'use client'

import { prefectures } from '@/lib/shipping-calculator'

interface AddressFormProps {
  prefix: string
  register: any
  errors: any
}

export function AddressForm({ prefix, register, errors }: AddressFormProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="md:col-span-2">
        <label className="block text-sm font-medium mb-2">お名前 *</label>
        <input
          type="text"
          {...register(`${prefix}.name`)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-900 dark:bg-slate-800"
          placeholder="山田 太郎"
        />
        {errors?.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">電話番号 *</label>
        <input
          type="tel"
          {...register(`${prefix}.phone`)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-900 dark:bg-slate-800"
          placeholder="09012345678"
        />
        {errors?.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">郵便番号 *</label>
        <input
          type="text"
          {...register(`${prefix}.postalCode`)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-900 dark:bg-slate-800"
          placeholder="123-4567"
        />
        {errors?.postalCode && (
          <p className="mt-1 text-sm text-red-600">{errors.postalCode.message}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">都道府県 *</label>
        <select
          {...register(`${prefix}.prefecture`)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-900 dark:bg-slate-800"
        >
          <option value="">選択してください</option>
          {prefectures.map((pref) => (
            <option key={pref} value={pref}>{pref}</option>
          ))}
        </select>
        {errors?.prefecture && (
          <p className="mt-1 text-sm text-red-600">{errors.prefecture.message}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">市区町村 *</label>
        <input
          type="text"
          {...register(`${prefix}.city`)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-900 dark:bg-slate-800"
          placeholder="渋谷区"
        />
        {errors?.city && (
          <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
        )}
      </div>
      
      <div className="md:col-span-2">
        <label className="block text-sm font-medium mb-2">番地 *</label>
        <input
          type="text"
          {...register(`${prefix}.address1`)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-900 dark:bg-slate-800"
          placeholder="道玄坂1-2-3"
        />
        {errors?.address1 && (
          <p className="mt-1 text-sm text-red-600">{errors.address1.message}</p>
        )}
      </div>
      
      <div className="md:col-span-2">
        <label className="block text-sm font-medium mb-2">建物名・部屋番号</label>
        <input
          type="text"
          {...register(`${prefix}.address2`)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-900 dark:bg-slate-800"
          placeholder="〇〇ビル 5F"
        />
      </div>
    </div>
  )
}