"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { useAuth } from "@/contexts/auth-context"
import { UserDropdown } from "@/components/auth/user-dropdown"

export default function Header() {
  const { resolvedTheme, setTheme } = useTheme()
  const { user, isAuthenticated, isLoading } = useAuth()
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  useEffect(() => setMounted(true), [])

  const toggle = () => setTheme(resolvedTheme === "dark" ? "light" : "dark")

  return (
    <header className="sticky top-0 z-40 border-b bg-background/70 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-2xl btn-gradient" aria-hidden />
          <span className="font-heading text-lg">KYC-AI</span>
        </Link>
        
        {/* Center Navigation - Desktop Only */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/docs" className="hover:text-primary transition-colors">
            Documentation
          </Link>
          <Link href="/pricing" className="hover:text-primary transition-colors">
            Pricing
          </Link>
          <Link href="/demo" className="hover:text-primary transition-colors">
            Demo
          </Link>
        </nav>
        
        {/* Right Side - Login + Theme Toggle + Mobile Menu */}
        <div className="flex items-center gap-3">
          {/* Desktop Login */}
          <div className="hidden md:flex items-center gap-3">
            {!mounted || isLoading ? (
              <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
            ) : isAuthenticated && user ? (
              <UserDropdown user={user} />
            ) : (
              <Button asChild className="rounded-2xl btn-gradient">
                <Link href="/login">Login</Link>
              </Button>
            )}
          </div>
          
          {/* Theme Toggle */}
          <Button
            variant="outline"
            className="rounded-2xl w-10 h-10 p-0 bg-transparent border-border/50 hover:bg-muted/50"
            onClick={toggle}
            aria-label="Toggle theme"
          >
            {mounted && resolvedTheme === "dark" ? (
              <svg viewBox="0 0 24 24" width="18" height="18" role="img" aria-hidden="true" className="text-foreground">
                <circle cx="12" cy="12" r="4" fill="currentColor" />
                <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.22 4.22 5.64 5.64M18.36 18.36l1.42 1.42M4.22 19.78 5.64 18.36M18.36 5.64l1.42-1.42" />
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="18" height="18" role="img" aria-hidden="true" className="text-foreground">
                <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z" fill="currentColor" />
              </svg>
            )}
          </Button>
          
          {/* Mobile Menu Button */}
          <Button
            variant="outline"
            className="md:hidden rounded-2xl w-10 h-10 p-0 bg-transparent border-border/50 hover:bg-muted/50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg viewBox="0 0 24 24" width="18" height="18" className="text-foreground">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="18" height="18" className="text-foreground">
                <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur-xl">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            <Link 
              href="/" 
              className="block py-2 hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/docs" 
              className="block py-2 hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Documentation
            </Link>
            <Link 
              href="/pricing" 
              className="block py-2 hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              href="/demo" 
              className="block py-2 hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Demo
            </Link>
            
            {/* Mobile Login */}
            <div className="pt-4 border-t border-border/50">
              {!mounted || isLoading ? (
                <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
              ) : isAuthenticated && user ? (
                <UserDropdown user={user} />
              ) : (
                <Button asChild className="w-full rounded-2xl btn-gradient">
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
