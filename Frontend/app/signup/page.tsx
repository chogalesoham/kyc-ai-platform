"use client"

import React from 'react'
import { SignupForm } from '@/components/auth/signup-form'

export default function SignupPage() {
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