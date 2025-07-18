// 日本郵便の料金体系を参考にした料金計算
// 参考: https://www.post.japanpost.jp/send/fee/index.html

interface ShippingCalculatorParams {
  weight: number // kg
  dimensions: {
    length: number
    width: number
    height: number
  }
  senderPostalCode: string
  recipientPostalCode: string
  deliverySpeed: "normal" | "express" | "timeSpecified"
  insurance: boolean
}

export async function calculateShippingFee(params: ShippingCalculatorParams): Promise<number> {
  const { weight, dimensions, deliverySpeed, insurance } = params
  
  // 3辺の合計を計算
  const totalSize = dimensions.length + dimensions.width + dimensions.height
  
  // サイズ区分を決定（日本郵便の区分に準拠）
  let sizeCategory: string
  if (totalSize <= 60) {
    sizeCategory = "60サイズ"
  } else if (totalSize <= 80) {
    sizeCategory = "80サイズ"
  } else if (totalSize <= 100) {
    sizeCategory = "100サイズ"
  } else if (totalSize <= 120) {
    sizeCategory = "120サイズ"
  } else if (totalSize <= 140) {
    sizeCategory = "140サイズ"
  } else if (totalSize <= 160) {
    sizeCategory = "160サイズ"
  } else {
    sizeCategory = "170サイズ"
  }
  
  // 基本料金表（日本郵便ゆうパックを参考）
  const baseFeeTable: Record<string, number> = {
    "60サイズ": 1100,
    "80サイズ": 1330,
    "100サイズ": 1560,
    "120サイズ": 1800,
    "140サイズ": 2060,
    "160サイズ": 2270,
    "170サイズ": 2640
  }
  
  // 基本料金を取得
  let baseFee = baseFeeTable[sizeCategory] || 3000
  
  // 重量による追加料金（30kgまで）
  if (weight > 25) {
    baseFee += 500
  } else if (weight > 20) {
    baseFee += 300
  } else if (weight > 15) {
    baseFee += 200
  } else if (weight > 10) {
    baseFee += 100
  }
  
  // 配送スピードによる追加料金
  let speedFee = 0
  switch (deliverySpeed) {
    case "express":
      speedFee = 350 // 速達料金
      break
    case "timeSpecified":
      speedFee = 220 // 時間指定料金
      break
  }
  
  // 保険料（任意）
  const insuranceFee = insurance ? 380 : 0
  
  // 合計料金
  return baseFee + speedFee + insuranceFee
}

// 都道府県リスト
export const prefectures = [
  "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
  "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
  "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県",
  "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県",
  "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県",
  "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県",
  "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"
]