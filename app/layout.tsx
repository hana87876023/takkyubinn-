import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LandBridge運送 - 迅速・確実・エコロジーな配送サービス',
  description: '運送業界をリードするLandBridgeの配送サービス。最新技術とエコロジーな取り組みで、お客様の大切な荷物を安全にお届けします。',
  keywords: ['運送', '配送', '物流', 'ロジスティクス', 'エコロジー', '迅速配送'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}