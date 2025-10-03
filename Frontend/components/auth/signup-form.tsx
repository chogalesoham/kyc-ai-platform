"use client"

import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/contexts/auth-context'

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  confirmPassword: z.string(),
  dateOfBirth: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type SignupFormData = z.infer<typeof signupSchema>

export function SignupForm() {
  const { signup, loginWithOAuth, isLoading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [formError, setFormError] = useState<string>('')
  const [oauthLoading, setOauthLoading] = useState<string>('')
  const [redirectTo, setRedirectTo] = useState<string>('')

  // Get redirect parameter from URL
  useEffect(() => {
    const redirect = searchParams.get('redirect')
    if (redirect) {
      setRedirectTo(decodeURIComponent(redirect))
    }
  }, [searchParams])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  })

  const onSubmit = async (data: SignupFormData) => {
    setFormError('')
    const { confirmPassword, ...signupData } = data
    const result = await signup(signupData, redirectTo)
    
    if (!result.success) {
      setFormError(result.error || 'Registration failed')
    }
  }

  const handleOAuthLogin = async (provider: 'google' | 'facebook' | 'github') => {
    setOauthLoading(provider)
    setFormError('')
    
    const result = await loginWithOAuth(provider, redirectTo)
    if (!result.success) {
      if (result.error?.includes('ECONNREFUSED') || result.error?.includes('Network Error')) {
        setFormError(`${provider.charAt(0).toUpperCase() + provider.slice(1)} signup is not configured yet. Please use email/password registration.`)
      } else {
        setFormError(result.error || `${provider} registration failed`)
      }
    }
    setOauthLoading('')
  }

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case 'google':
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
        )
      case 'github':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        )
      default:
        return '🔗'
    }
  }

  return (
    <Card className="w-full max-w-sm mx-auto glass-card border-border/20">
      <CardHeader className="space-y-1 pb-6 text-center">
        <CardTitle className="text-xl font-heading text-foreground">
          Create Account
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Sign up to get started
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {formError && (
          <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="name" className="text-sm font-medium text-foreground">
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              className="h-10 rounded-xl border-border/50 bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              {...register('name')}
            />
            {errors.name && (
              <p className="text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="email" className="text-sm font-medium text-foreground">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="h-10 rounded-xl border-border/50 bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-xs text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="dateOfBirth" className="text-sm font-medium text-foreground">
              Date of Birth <span className="text-muted-foreground text-xs">(Optional)</span>
            </Label>
            <Input
              id="dateOfBirth"
              type="date"
              className="h-10 rounded-xl border-border/50 bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              {...register('dateOfBirth')}
            />
            {errors.dateOfBirth && (
              <p className="text-xs text-red-600">{errors.dateOfBirth.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="password" className="text-sm font-medium text-foreground">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              className="h-10 rounded-xl border-border/50 bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-xs text-red-600">{errors.password.message}</p>
            )}
            <p className="text-xs text-muted-foreground">
              Must contain uppercase, lowercase, and number
            </p>
          </div>

          <div className="space-y-1">
            <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              className="h-10 rounded-xl border-border/50 bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-600">{errors.confirmPassword.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-10 rounded-xl btn-gradient font-medium transition-all duration-200 shadow-md hover:shadow-lg"
            disabled={isSubmitting || isLoading}
          >
            {isSubmitting || isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Creating account...
              </div>
            ) : (
              'Create Account'
            )}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border/30" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground font-medium">Or sign up with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {(['google', 'github'] as const).map((provider) => (
            <Button
              key={provider}
              type="button"
              variant="outline"
              className="h-10 rounded-xl border-border/50 bg-background hover:bg-muted/50 transition-all duration-200"
              onClick={() => handleOAuthLogin(provider)}
              disabled={isLoading || oauthLoading === provider}
            >
              {oauthLoading === provider ? (
                <div className="flex items-center justify-center">
                  <div className="w-3 h-3 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-1">
                  <div className="w-4 h-4">
                    {getProviderIcon(provider)}
                  </div>
                  <span className="text-sm font-medium">{provider === 'google' ? 'Google' : 'GitHub'}</span>
                </div>
              )}
            </Button>
          ))}
        </div>

        <div className="text-center pt-3">
          <p className="text-xs text-muted-foreground">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}