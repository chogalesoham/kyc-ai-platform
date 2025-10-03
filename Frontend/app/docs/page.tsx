"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, Menu, X } from "lucide-react"
import IntroductionSection from "@/components/docs/introduction-section"
import InstallationSection from "@/components/docs/installation-section"
import APIReferenceSection from "@/components/docs/api-reference-section"
import CustomizationSection from "@/components/docs/customization-section"
import FAQSection from "@/components/docs/faq-section"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function DocsPage() {
  return (
    <ProtectedRoute>
      <DocsContent />
    </ProtectedRoute>
  )
}

function DocsContent() {
  const [activeSection, setActiveSection] = useState("introduction")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const sections = [
    { id: "introduction", title: "Introduction", icon: "📖" },
    { id: "installation", title: "Installation", icon: "⚡" },
    { id: "api-reference", title: "API Reference", icon: "🔧" },
    { id: "customization", title: "Customization", icon: "🎨" },
    { id: "faq", title: "FAQ", icon: "❓" },
  ]

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setSidebarOpen(false)
  }

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id)
      }))

      const currentSection = sectionElements.find(({ element }) => {
        if (!element) return false
        const rect = element.getBoundingClientRect()
        return rect.top <= 100 && rect.bottom >= 100
      })

      if (currentSection) {
        setActiveSection(currentSection.id)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 z-50 w-72 h-[calc(100vh-4rem)] bg-card/95 backdrop-blur-lg border-r border-border transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground">KYC SDK</h2>
              <p className="text-sm text-muted-foreground">Documentation</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <nav className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-all duration-200 group ${
                  activeSection === section.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
                }`}
              >
                <span className="text-lg transition-transform duration-200 group-hover:scale-110">{section.icon}</span>
                <span className="font-medium">{section.title}</span>
                <ChevronRight className={`h-4 w-4 ml-auto opacity-50 transition-transform duration-200 ${
                  activeSection === section.id ? "rotate-90" : ""
                }`} />
              </button>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="p-4 bg-muted/50 rounded-lg border">
              <h3 className="font-medium text-sm mb-2">Need Help?</h3>
              <p className="text-xs text-muted-foreground mb-3">
                Join our developer community for support and updates
              </p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 text-xs">
                  Discord
                </Button>
                <Button size="sm" variant="outline" className="flex-1 text-xs">
                  GitHub
                </Button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:ml-72">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-semibold">Documentation</h1>
          <div className="w-8" />
        </div>

        {/* Content container */}
        <div className="max-w-4xl mx-auto p-6 lg:p-8">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent mb-4 animate-gradient">
                KYC SDK Documentation
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Complete guide for integrating AI-powered KYC verification into your applications
              </p>
            </div>
          </div>

          {/* Content sections */}
          <div className="space-y-20">
            <section id="introduction" className="scroll-mt-20">
              <div className="animate-fade-in-up">
                <IntroductionSection />
              </div>
            </section>

            <section id="installation" className="scroll-mt-20">
              <div className="animate-fade-in-up">
                <InstallationSection />
              </div>
            </section>

            <section id="api-reference" className="scroll-mt-20">
              <div className="animate-fade-in-up">
                <APIReferenceSection />
              </div>
            </section>

            <section id="customization" className="scroll-mt-20">
              <div className="animate-fade-in-up">
                <CustomizationSection />
              </div>
            </section>

            <section id="faq" className="scroll-mt-20">
              <div className="animate-fade-in-up">
                <FAQSection />
              </div>
            </section>
          </div>

          {/* Footer */}
          <footer className="mt-20 pt-8 border-t border-border text-center">
            <div className="flex flex-wrap justify-center gap-6 mb-6">
              <a href="/" className="text-primary hover:underline transition-colors">Home</a>
              <a href="/demo" className="text-primary hover:underline transition-colors">Demo</a>
              <a href="/pricing" className="text-primary hover:underline transition-colors">Pricing</a>
              <a href="/blog" className="text-primary hover:underline transition-colors">Blog</a>
              <a href="/about" className="text-primary hover:underline transition-colors">About</a>
            </div>
            <div className="flex justify-center gap-4 mb-4">
              <a href="https://github.com/kyc-ai" className="text-muted-foreground hover:text-foreground transition-colors">
                GitHub
              </a>
              <a href="https://discord.gg/kyc-ai" className="text-muted-foreground hover:text-foreground transition-colors">
                Discord
              </a>
              <a href="https://twitter.com/kyc_ai" className="text-muted-foreground hover:text-foreground transition-colors">
                Twitter
              </a>
            </div>
            <p className="text-muted-foreground text-sm">
              Need help? Contact us at{" "}
              <a href="mailto:support@kyc-ai.com" className="text-primary hover:underline">
                support@kyc-ai.com
              </a>
            </p>
            <p className="text-xs text-muted-foreground mt-4">
              © 2024 KYC-AI. All rights reserved. Built with ❤️ for developers.
            </p>
          </footer>
        </div>
      </div>
    </div>
  )
}