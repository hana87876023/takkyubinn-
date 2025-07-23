'use client'

import { motion } from 'framer-motion'
import { floatingAnimation } from '@/lib/animations'

const FloatingElements = () => {
  const shapes = [
    { size: 'w-16 h-16', top: '10%', left: '10%', delay: 0 },
    { size: 'w-12 h-12', top: '20%', right: '15%', delay: 0.5 },
    { size: 'w-20 h-20', top: '60%', left: '5%', delay: 1 },
    { size: 'w-14 h-14', top: '70%', right: '10%', delay: 1.5 },
    { size: 'w-10 h-10', top: '40%', left: '80%', delay: 2 },
    { size: 'w-18 h-18', top: '30%', right: '70%', delay: 2.5 },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className={`absolute ${shape.size} opacity-20`}
          style={{
            top: shape.top,
            left: shape.left,
            right: shape.right,
          }}
          animate={floatingAnimation}
          transition={{
            ...floatingAnimation.transition,
            delay: shape.delay,
          }}
        >
          {/* 幾何学図形 */}
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-900 rounded-full" />
        </motion.div>
      ))}
      
      {/* 追加の装飾要素 */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-8 h-8 border-2 border-blue-300 rounded-full opacity-30"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      
      <motion.div
        className="absolute top-3/4 right-1/4 w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 transform rotate-45 opacity-30"
        animate={{ rotate: [45, 405] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      
      <motion.div
        className="absolute top-1/2 left-1/2 w-4 h-4 bg-gradient-to-r from-blue-700 to-pink-500 rounded-full opacity-40"
        animate={{ 
          x: [-20, 20, -20],
          y: [-10, 10, -10],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
    </div>
  )
}

export default FloatingElements