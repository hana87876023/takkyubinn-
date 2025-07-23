// 基本的な型定義
export interface User {
  id: string
  email: string
  name: string
  phone: string
  company?: string
  address?: string
  createdAt: Date
  lastLogin: Date
}

export interface Address {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface OrderItem {
  id: string
  name: string
  quantity: number
  weight: number
  dimensions: {
    length: number
    width: number
    height: number
  }
  price: number
}

export interface Order {
  id: string
  userId: string
  trackingNumber: string
  status: 'pending' | 'processing' | 'in_transit' | 'delivered' | 'cancelled'
  origin: Address
  destination: Address
  items: OrderItem[]
  totalPrice: number
  createdAt: Date
  estimatedDelivery: Date
  actualDelivery?: Date
}

export interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: RegisterData) => Promise<boolean>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
  isLoading: boolean
}

export interface RegisterData {
  email: string
  password: string
  name: string
  phone: string
  company?: string
}

export interface LoginData {
  email: string
  password: string
}

export interface DashboardStats {
  totalOrders: number
  activeOrders: number
  deliveredOrders: number
  totalSpent: number
  averageDeliveryTime: number
}