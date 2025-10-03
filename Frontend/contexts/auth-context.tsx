"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { authApi, userApi, oauthApi, handleApiError, tokenUtils, User } from '@/lib/auth-api'

export interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string, redirectTo?: string) => Promise<{ success: boolean; error?: string }>
  signup: (userData: {
    name: string
    email: string
    password: string
    dateOfBirth?: string
  }, redirectTo?: string) => Promise<{ success: boolean; error?: string }>
  loginWithOAuth: (provider: 'google' | 'facebook' | 'github', redirectTo?: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const isAuthenticated = !!user

  // Check for existing session on mount
  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const token = tokenUtils.getToken()
      if (!token) {
        setIsLoading(false)
        return
      }

      // Check if token is expired
      if (tokenUtils.isTokenExpired(token)) {
        tokenUtils.removeToken()
        setIsLoading(false)
        return
      }

      const response = await authApi.getMe()
      if (response.success) {
        setUser(response.data!.user)
      } else {
        tokenUtils.removeToken()
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      tokenUtils.removeToken()
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string, redirectTo?: string) => {
    try {
      setIsLoading(true)
      const response = await authApi.login({ email, password })

      if (response.success) {
        tokenUtils.setToken(response.data.accessToken)
        setUser(response.data.user)
        
        // Redirect to the requested page or default to demo
        const targetPath = redirectTo || '/demo'
        router.push(targetPath)
        return { success: true }
      } else {
        return { success: false, error: response.message }
      }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: handleApiError(error) }
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (userData: {
    name: string
    email: string
    password: string
    dateOfBirth?: string
  }, redirectTo?: string) => {
    try {
      setIsLoading(true)
      const response = await authApi.signup(userData)

      if (response.success) {
        tokenUtils.setToken(response.data.accessToken)
        setUser(response.data.user)
        
        // Redirect to the requested page or default to demo
        const targetPath = redirectTo || '/demo'
        router.push(targetPath)
        return { success: true }
      } else {
        return { success: false, error: response.message }
      }
    } catch (error) {
      console.error('Signup error:', error)
      return { success: false, error: handleApiError(error) }
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithOAuth = async (provider: 'google' | 'facebook' | 'github', redirectTo?: string) => {
    try {
      setIsLoading(true)
      
      // Store the redirect path in localStorage for after OAuth completion
      if (redirectTo) {
        localStorage.setItem('oauth_redirect', redirectTo)
      }
      
      const result = await oauthApi.initiateOAuth(provider)
      
      if (result.success && result.data) {
        // Redirect to OAuth provider
        window.location.href = result.data.redirectUrl
        return { success: true }
      } else {
        return { success: false, error: result.message || 'OAuth initialization failed' }
      }
    } catch (error) {
      console.error('OAuth login error:', error)
      return { success: false, error: handleApiError(error) }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      const token = tokenUtils.getToken()
      if (token) {
        await authApi.logout()
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      tokenUtils.removeToken()
      setUser(null)
      
      // Clear any stored redirect paths
      localStorage.removeItem('oauth_redirect')
      
      // Redirect to home page instead of login
      router.push('/')
    }
  }

  const refreshUser = async () => {
    await checkAuth()
  }

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    signup,
    loginWithOAuth,
    logout,
    refreshUser,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}