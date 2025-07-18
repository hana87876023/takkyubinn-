import { z } from 'zod'

// ログインフォームのバリデーション
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'メールアドレスを入力してください')
    .email('有効なメールアドレスを入力してください'),
  password: z
    .string()
    .min(6, 'パスワードは6文字以上で入力してください')
    .max(100, 'パスワードは100文字以下で入力してください')
})

// ユーザー登録フォームのバリデーション
export const registerSchema = z.object({
  email: z
    .string()
    .min(1, 'メールアドレスを入力してください')
    .email('有効なメールアドレスを入力してください'),
  password: z
    .string()
    .min(6, 'パスワードは6文字以上で入力してください')
    .max(100, 'パスワードは100文字以下で入力してください')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'パスワードは英小文字、英大文字、数字を含む必要があります'
    ),
  confirmPassword: z.string(),
  name: z
    .string()
    .min(1, '名前を入力してください')
    .max(50, '名前は50文字以下で入力してください'),
  phone: z
    .string()
    .min(1, '電話番号を入力してください')
    .regex(
      /^[0-9\-\(\)\+\s]+$/,
      '有効な電話番号を入力してください'
    ),
  company: z
    .string()
    .max(100, '会社名は100文字以下で入力してください')
    .optional()
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: 'パスワードが一致しません',
    path: ['confirmPassword']
  }
)

// プロフィール更新フォームのバリデーション
export const profileSchema = z.object({
  name: z
    .string()
    .min(1, '名前を入力してください')
    .max(50, '名前は50文字以下で入力してください'),
  phone: z
    .string()
    .min(1, '電話番号を入力してください')
    .regex(
      /^[0-9\-\(\)\+\s]+$/,
      '有効な電話番号を入力してください'
    ),
  company: z
    .string()
    .max(100, '会社名は100文字以下で入力してください')
    .optional()
})

// 住所フォームのバリデーション
export const addressSchema = z.object({
  street: z
    .string()
    .min(1, '住所を入力してください')
    .max(200, '住所は200文字以下で入力してください'),
  city: z
    .string()
    .min(1, '市区町村を入力してください')
    .max(50, '市区町村は50文字以下で入力してください'),
  state: z
    .string()
    .min(1, '都道府県を入力してください')
    .max(50, '都道府県は50文字以下で入力してください'),
  zipCode: z
    .string()
    .min(1, '郵便番号を入力してください')
    .regex(
      /^\d{3}-\d{4}$/,
      '郵便番号は000-0000の形式で入力してください'
    ),
  country: z
    .string()
    .min(1, '国を入力してください')
    .max(50, '国は50文字以下で入力してください')
})

// 注文作成フォームのバリデーション
export const orderSchema = z.object({
  origin: addressSchema,
  destination: addressSchema,
  items: z.array(
    z.object({
      name: z
        .string()
        .min(1, '商品名を入力してください')
        .max(100, '商品名は100文字以下で入力してください'),
      quantity: z
        .number()
        .min(1, '数量は1以上で入力してください')
        .max(1000, '数量は1000以下で入力してください'),
      weight: z
        .number()
        .min(0.1, '重量は0.1kg以上で入力してください')
        .max(1000, '重量は1000kg以下で入力してください'),
      dimensions: z.object({
        length: z
          .number()
          .min(1, '長さは1cm以上で入力してください')
          .max(1000, '長さは1000cm以下で入力してください'),
        width: z
          .number()
          .min(1, '幅は1cm以上で入力してください')
          .max(1000, '幅は1000cm以下で入力してください'),
        height: z
          .number()
          .min(1, '高さは1cm以上で入力してください')
          .max(1000, '高さは1000cm以下で入力してください')
      })
    })
  ).min(1, '少なくとも1つの商品を追加してください')
})

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
export type ProfileFormData = z.infer<typeof profileSchema>
export type AddressFormData = z.infer<typeof addressSchema>
export type OrderFormData = z.infer<typeof orderSchema>