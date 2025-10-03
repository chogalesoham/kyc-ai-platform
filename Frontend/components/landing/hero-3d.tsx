'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

// CSS-based 3D animation component as fallback
export default function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      
      container.style.setProperty('--mouse-x', `${x}`)
      container.style.setProperty('--mouse-y', `${y}`)
    }

    container.addEventListener('mousemove', handleMouseMove)
    return () => container.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div 
      ref={containerRef}
      className="w-full h-full relative overflow-hidden bg-gradient-to-br from-primary/5 via-purple-500/5 to-primary/5 rounded-2xl"
      style={{
        '--mouse-x': '0.5',
        '--mouse-y': '0.5'
      } as React.CSSProperties}
    >
      {/* Central animated sphere */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-32 h-32 rounded-full bg-gradient-to-r from-primary to-purple-600 shadow-2xl"
        style={{
          transform: 'translate(-50%, -50%)',
          filter: 'blur(1px)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Orbiting documents */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-6 h-8 bg-gradient-to-b from-green-400 to-green-600 rounded-sm shadow-lg"
          style={{
            left: '50%',
            top: '50%',
            transformOrigin: `0 ${120 + i * 20}px`,
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="w-full h-1 bg-white/30 mt-1 rounded-full" />
          <div className="w-3/4 h-0.5 bg-white/20 mt-1 rounded-full" />
          <div className="w-full h-0.5 bg-white/20 mt-1 rounded-full" />
        </motion.div>
      ))}

      {/* Additional floating elements */}
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={`float-${i}`}
          className={`absolute w-4 h-4 rounded-full ${
            i % 2 === 0 ? 'bg-blue-400' : 'bg-purple-400'
          } opacity-60`}
          style={{
            left: `${20 + i * 20}%`,
            top: `${30 + i * 15}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Verification checkmarks */}
      <motion.div
        className="absolute top-16 right-16 flex items-center space-x-2 bg-green-500/20 backdrop-blur-sm rounded-full px-4 py-2 border border-green-500/30"
        animate={{
          y: [-10, 10, -10],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        <span className="text-green-400 font-semibold text-sm">Verified</span>
      </motion.div>

      <motion.div
        className="absolute bottom-20 left-16 flex items-center space-x-2 bg-blue-500/20 backdrop-blur-sm rounded-full px-4 py-2 border border-blue-500/30"
        animate={{
          y: [10, -10, 10],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
        <span className="text-blue-400 font-semibold text-sm">Secure</span>
      </motion.div>

      <motion.div
        className="absolute top-1/2 right-8 flex items-center space-x-2 bg-purple-500/20 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-500/30"
        animate={{
          y: [-15, 15, -15],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      >
        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
        <span className="text-purple-400 font-semibold text-sm">AI-Powered</span>
      </motion.div>

      {/* Background grid effect */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
          transform: `perspective(1000px) rotateX(20deg) translateY(calc(var(--mouse-y, 0.5) * -20px)) translateX(calc(var(--mouse-x, 0.5) * -20px))`
        }}
      />

      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent" />
    </div>
  )
}