"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { User } from "@/lib/auth-api"

interface UserDropdownProps {
  user: User
}

export function UserDropdown({ user }: UserDropdownProps) {
  const { logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    setIsOpen(false)
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-sm hover:shadow-lg transition-all duration-200 flex items-center justify-center"
        aria-label="User menu"
      >
        {getInitials(user.name)}
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Menu */}
          <div className="absolute right-0 mt-2 w-64 bg-background border rounded-xl shadow-lg z-20 overflow-hidden">
            {/* User Info Section */}
            <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold flex items-center justify-center">
                  {getInitials(user.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground truncate">{user.name}</p>
                  <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                  <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-2">
              <button
                onClick={() => {
                  setIsOpen(false)
                  // Navigate to profile page when implemented
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-accent transition-colors duration-200 text-sm"
              >
                👤 View Profile
              </button>
              
              <button
                onClick={() => {
                  setIsOpen(false)
                  // Navigate to settings page when implemented
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-accent transition-colors duration-200 text-sm"
              >
                ⚙️ Settings
              </button>
              
              <hr className="my-2 border-border" />
              
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200 text-sm text-red-600 dark:text-red-400"
              >
                🚪 Logout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}