"use client"

import React, { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { tokenUtils } from '@/lib/auth-api'

export default function AuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { refreshUser } = useAuth()

  useEffect(() => {
    const handleOAuthCallback = async () => {
      const token = searchParams.get('token')
      const success = searchParams.get('success')
      const error = searchParams.get('error')

      if (error) {
        console.error('OAuth error:', error)
        router.push('/login?error=oauth_failed')
        return
      }

      if (success === 'true' && token) {
        try {
          // Store the token
          tokenUtils.setAccessToken(token)
          
          // Refresh user data
          await refreshUser()
          
          // Check for stored redirect path
          const redirectPath = localStorage.getItem('oauth_redirect')
          localStorage.removeItem('oauth_redirect')
          
          // Redirect to the requested page or default to demo
          const targetPath = redirectPath || '/demo'
          router.push(targetPath)
        } catch (error) {
          console.error('OAuth callback error:', error)
          router.push('/login?error=oauth_error')
        }
      } else {
        router.push('/login?error=oauth_failed')
      }
    }

    handleOAuthCallback()
  }, [searchParams, router, refreshUser])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background/95 to-accent/5">
      <div className="text-center space-y-4">
        <LoadingSpinner size="lg" />
        <p className="text-muted-foreground">Completing authentication...</p>
      </div>
    </div>
  )
}