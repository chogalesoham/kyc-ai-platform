"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Upload, Activity, Shield, Zap, Globe } from "lucide-react"

export default function IntroductionSection() {
  const features = [
    {
      icon: <Upload className="h-5 w-5" />,
      title: "Drag & Drop Upload",
      description: "Intuitive file upload with progress tracking"
    },
    {
      icon: <Activity className="h-5 w-5" />,
      title: "Real-time Progress",
      description: "Live verification status updates"
    },
    {
      icon: <CheckCircle className="h-5 w-5" />,
      title: "Instant Verification",
      description: "Get verification results in seconds"
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Secure Processing",
      description: "Bank-grade security and encryption"
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Easy Integration",
      description: "Just a few lines of code to get started"
    },
    {
      icon: <Globe className="h-5 w-5" />,
      title: "Global Support",
      description: "Works with documents from 100+ countries"
    }
  ]

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <Badge variant="secondary" className="text-lg px-4 py-2">
            🚀 AI-Powered KYC SDK
          </Badge>
        </div>
        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Easily integrate AI-powered KYC verification with just a few lines of code
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Transform your user onboarding with our cutting-edge AI verification system. 
          Detect fraud, verify documents, and ensure compliance - all in real-time.
        </p>
      </div>

      {/* What is KYC SDK */}
      <Card className="border-l-4 border-l-primary">
        <CardContent className="p-6">
          <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-2xl">🤖</span>
            What is KYC SDK?
          </h3>
          <p className="text-muted-foreground text-lg leading-relaxed mb-4">
            Our KYC SDK is a comprehensive JavaScript library that provides AI-powered document verification 
            and fraud detection capabilities. Built with modern web technologies, it seamlessly integrates 
            into any web application and provides a smooth user experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="font-medium">Document Authentication</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="font-medium">Face Matching</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="font-medium">Fraud Detection</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="font-medium">Real-time Processing</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Features */}
      <div>
        <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <span className="text-2xl">✨</span>
          Key Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {feature.icon}
                  </div>
                  <h4 className="font-semibold">{feature.title}</h4>
                </div>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Start Preview */}
      <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
        <CardContent className="p-6">
          <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            Quick Start
          </h3>
          <p className="text-muted-foreground mb-4">
            Get started in under 5 minutes with our simple integration:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 bg-background rounded-lg border">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div>
                <div className="font-medium">Install</div>
                <div className="text-sm text-muted-foreground">npm install kyc-sdk</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-background rounded-lg border">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div>
                <div className="font-medium">Initialize</div>
                <div className="text-sm text-muted-foreground">Add your API key</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-background rounded-lg border">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                3
              </div>
              <div>
                <div className="font-medium">Verify</div>
                <div className="text-sm text-muted-foreground">Start verification</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}