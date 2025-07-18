import { User, Order } from './types'

// ローカルストレージの管理
class LocalStorage {
  private getStorageKey(key: string): string {
    return `landbridge_${key}`
  }

  // ユーザー情報の保存と取得
  saveUser(user: User): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.getStorageKey('user'), JSON.stringify(user))
    }
  }

  getUser(): User | null {
    if (typeof window === 'undefined') return null
    
    const userData = localStorage.getItem(this.getStorageKey('user'))
    if (!userData) return null
    
    try {
      const user = JSON.parse(userData)
      return {
        ...user,
        createdAt: new Date(user.createdAt),
        lastLogin: new Date(user.lastLogin)
      }
    } catch {
      return null
    }
  }

  removeUser(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.getStorageKey('user'))
    }
  }

  // 注文情報の保存と取得
  saveOrders(orders: Order[]): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.getStorageKey('orders'), JSON.stringify(orders))
    }
  }

  getOrders(): Order[] {
    if (typeof window === 'undefined') return []
    
    const ordersData = localStorage.getItem(this.getStorageKey('orders'))
    if (!ordersData) return []
    
    try {
      const orders = JSON.parse(ordersData)
      return orders.map((order: any) => ({
        ...order,
        createdAt: new Date(order.createdAt),
        estimatedDelivery: new Date(order.estimatedDelivery),
        actualDelivery: order.actualDelivery ? new Date(order.actualDelivery) : undefined
      }))
    } catch {
      return []
    }
  }

  // 登録済みユーザーの管理（簡易実装）
  saveRegisteredUser(email: string, password: string, userData: Partial<User>): void {
    if (typeof window !== 'undefined') {
      const registeredUsers = this.getRegisteredUsers()
      const hashedPassword = this.hashPassword(password)
      
      registeredUsers[email] = {
        password: hashedPassword,
        userData: {
          id: `user_${Date.now()}`,
          email,
          name: userData.name || '',
          phone: userData.phone || '',
          company: userData.company,
          createdAt: new Date(),
          lastLogin: new Date()
        }
      }
      
      localStorage.setItem(this.getStorageKey('registered_users'), JSON.stringify(registeredUsers))
    }
  }

  getRegisteredUsers(): Record<string, { password: string; userData: User }> {
    if (typeof window === 'undefined') return {}
    
    const data = localStorage.getItem(this.getStorageKey('registered_users'))
    if (!data) return {}
    
    try {
      return JSON.parse(data)
    } catch {
      return {}
    }
  }

  validateUser(email: string, password: string): User | null {
    const registeredUsers = this.getRegisteredUsers()
    const userRecord = registeredUsers[email]
    
    if (!userRecord) return null
    
    const hashedPassword = this.hashPassword(password)
    if (userRecord.password !== hashedPassword) return null
    
    // ログイン時刻を更新
    const updatedUser = {
      ...userRecord.userData,
      lastLogin: new Date()
    }
    
    // 登録ユーザー情報を更新
    registeredUsers[email].userData = updatedUser
    localStorage.setItem(this.getStorageKey('registered_users'), JSON.stringify(registeredUsers))
    
    return updatedUser
  }

  // 簡易的なパスワードハッシュ化（本番環境では適切なハッシュ化を使用）
  private hashPassword(password: string): string {
    // 実際のアプリケーションでは bcrypt などを使用
    return btoa(password + 'landbridge_salt')
  }

  // デモデータの初期化
  initializeDemoData(): void {
    if (typeof window === 'undefined') return
    
    // デモユーザーの作成
    const demoUser = {
      email: 'demo@landbridge.com',
      password: 'demo123',
      name: '田中太郎',
      phone: '090-1234-5678',
      company: '株式会社デモ'
    }
    
    this.saveRegisteredUser(demoUser.email, demoUser.password, demoUser)
    
    // デモ注文データの作成
    const demoOrders: Order[] = [
      {
        id: 'order_001',
        userId: 'user_demo',
        trackingNumber: 'LB2024001',
        status: 'in_transit',
        origin: {
          street: '1-1-1 渋谷',
          city: '渋谷区',
          state: '東京都',
          zipCode: '150-0002',
          country: '日本'
        },
        destination: {
          street: '2-2-2 梅田',
          city: '大阪市',
          state: '大阪府',
          zipCode: '530-0001',
          country: '日本'
        },
        items: [
          {
            id: 'item_001',
            name: '書類',
            quantity: 1,
            weight: 0.5,
            dimensions: { length: 30, width: 20, height: 2 },
            price: 1500
          }
        ],
        totalPrice: 1500,
        createdAt: new Date('2024-01-15T10:00:00Z'),
        estimatedDelivery: new Date('2024-01-16T18:00:00Z')
      },
      {
        id: 'order_002',
        userId: 'user_demo',
        trackingNumber: 'LB2024002',
        status: 'delivered',
        origin: {
          street: '3-3-3 新宿',
          city: '新宿区',
          state: '東京都',
          zipCode: '160-0022',
          country: '日本'
        },
        destination: {
          street: '4-4-4 天神',
          city: '福岡市',
          state: '福岡県',
          zipCode: '810-0001',
          country: '日本'
        },
        items: [
          {
            id: 'item_002',
            name: '商品サンプル',
            quantity: 3,
            weight: 2.0,
            dimensions: { length: 40, width: 30, height: 20 },
            price: 2800
          }
        ],
        totalPrice: 2800,
        createdAt: new Date('2024-01-10T14:00:00Z'),
        estimatedDelivery: new Date('2024-01-12T16:00:00Z'),
        actualDelivery: new Date('2024-01-12T15:30:00Z')
      }
    ]
    
    this.saveOrders(demoOrders)
  }
}

export const storage = new LocalStorage()