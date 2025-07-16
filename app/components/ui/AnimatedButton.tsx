'use client'

import { motion } from 'framer-motion'
import { ReactNode, MouseEvent } from 'react'
import { buttonHover, buttonTap } from '@/lib/animations'

interface AnimatedButtonProps {
  children: ReactNode
  href?: string
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'small' | 'medium' | 'large'
  className?: string
  disabled?: boolean
}

const AnimatedButton = ({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'medium',
  className = '',
  disabled = false
}: AnimatedButtonProps) => {
  const baseClasses = 'relative inline-flex items-center justify-center font-semibold transition-all duration-300 overflow-hidden'
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-2xl',
    secondary: 'bg-white text-gray-800 border-2 border-gray-300 hover:border-blue-500 hover:text-blue-500',
    outline: 'border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white'
  }
  
  const sizeClasses = {
    small: 'px-4 py-2 text-sm rounded-lg',
    medium: 'px-6 py-3 text-base rounded-lg',
    large: 'px-8 py-4 text-lg rounded-full'
  }

  const createRipple = (e: MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    const ripple = document.createElement('span')
    ripple.className = 'ripple'
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.4);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    `

    button.appendChild(ripple)
    setTimeout(() => ripple.remove(), 600)

    if (onClick) onClick(e)
  }

  const buttonContent = (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      whileHover={disabled ? {} : buttonHover}
      whileTap={disabled ? {} : buttonTap}
      onClick={href ? undefined : createRipple}
      disabled={disabled}
    >
      <span className="relative z-10">{children}</span>
      
      {/* グラデーション効果 */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full skew-x-12"
        animate={{ translateX: ['100%', '-100%'] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      />
    </motion.button>
  )

  if (href) {
    return (
      <motion.a
        href={href}
        className="inline-block"
        whileHover={disabled ? {} : buttonHover}
        whileTap={disabled ? {} : buttonTap}
      >
        {buttonContent}
      </motion.a>
    )
  }

  return buttonContent
}

export default AnimatedButton