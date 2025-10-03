"use client"

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { SignupForm } from '@/components/auth/signup-form'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export default function SignupPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/demo')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center auth-gradient-bg px-4 py-8">
      <div className="w-full max-w-md auth-card-enter">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-tr from-purple-500/20 to-blue-500/20 blur-3xl" />
        </div>
        
        <div className="relative z-10">
          <SignupForm />
        </div>
      </div>
    </div>
  )
}