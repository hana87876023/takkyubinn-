'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User, AuthContextType, RegisterData } from '@/lib/types'
import { storage } from '@/lib/storage'

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // コンポーネントマウント時にユーザー情報を復元
    const savedUser = storage.getUser()
    if (savedUser) {
      setUser(savedUser)
    }
    
    // デモデータの初期化
    storage.initializeDemoData()
    
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    
    try {
      // ローカルストレージからユーザー情報を検証
      const validatedUser = storage.validateUser(email, password)
      
      if (validatedUser) {
        setUser(validatedUser)
        storage.saveUser(validatedUser)
        return true
      }
      
      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: RegisterData): Promise<boolean> => {
    setIsLoading(true)
    
    try {
      // 既存ユーザーの確認
      const existingUsers = storage.getRegisteredUsers()
      if (existingUsers[userData.email]) {
        return false // 既に登録済み
      }
      
      // 新しいユーザーを登録
      storage.saveRegisteredUser(userData.email, userData.password, {
        name: userData.name,
        phone: userData.phone,
        company: userData.company
      })
      
      // 登録後に自動ログイン
      const newUser = storage.validateUser(userData.email, userData.password)
      if (newUser) {
        setUser(newUser)
        storage.saveUser(newUser)
        return true
      }
      
      return false
    } catch (error) {
      console.error('Registration error:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    storage.removeUser()
  }

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isLoading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}