"use client"

import React, { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { useRouter, usePathname } from 'next/navigation'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

interface ProtectedRouteProps {
  children: React.ReactNode
  redirectTo?: string
  showMessage?: boolean
}

export function ProtectedRoute({ children, redirectTo = '/login', showMessage = true }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [hasRedirected, setHasRedirected] = useState(false)

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !hasRedirected) {
      setHasRedirected(true)
      
      // Show notification message before redirect
      if (showMessage) {
        // You could implement a toast notification here
        console.log('Please log in to access this page')
      }
      
      // Construct redirect URL with current path as parameter
      const redirectUrl = `${redirectTo}?redirect=${encodeURIComponent(pathname)}`
      router.replace(redirectUrl)
    }
  }, [isAuthenticated, isLoading, router, redirectTo, pathname, showMessage, hasRedirected])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}