'use client'

import { motion } from 'framer-motion'
import { useState, useRef, useCallback } from 'react'
import { 
  Upload, 
  FileText, 
  Shield, 
  Zap, 
  CheckCircle, 
  XCircle, 
  Loader2,
  Calendar,
  Mail,
  User,
  IdCard,
  ArrowRight,
  Bot,
  Globe,
  Lock
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { useInView } from 'framer-motion'

type VerificationStatus = 'idle' | 'uploading' | 'processing' | 'verified' | 'rejected'

interface FormData {
  fullName: string
  email: string
  dateOfBirth: string
  documentType: string
}

const documentTypes = [
  'Passport',
  'Driver\'s License',
  'National ID Card',
  'Utility Bill',
  'Bank Statement'
]

const benefits = [
  {
    icon: Bot,
    title: 'AI-Powered Verification',
    description: 'Advanced GenAI technology analyzes documents with 99.9% accuracy in real-time.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Complete verification process in under 3 seconds with instant results.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Lock,
    title: 'Bank-Grade Security',
    description: 'SOC 2 compliant with end-to-end encryption and secure data handling.',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Globe,
    title: 'Easy Integration',
    description: 'Simple APIs and SDKs for seamless integration into your applications.',
    color: 'from-orange-500 to-red-500'
  }
]

export default function KYCDemoPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    dateOfBirth: '',
    documentType: ''
  })
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>('idle')
  const [progress, setProgress] = useState(0)
  const [isDragOver, setIsDragOver] = useState(false)
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      setUploadedFile(files[0])
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      setUploadedFile(files[0])
    }
  }

  const simulateVerification = async () => {
    if (!uploadedFile || !formData.fullName || !formData.email) {
      return
    }

    setVerificationStatus('uploading')
    setProgress(0)

    // Simulate upload progress
    for (let i = 0; i <= 30; i++) {
      setProgress(i)
      await new Promise(resolve => setTimeout(resolve, 50))
    }

    setVerificationStatus('processing')

    // Simulate processing
    for (let i = 30; i <= 90; i++) {
      setProgress(i)
      await new Promise(resolve => setTimeout(resolve, 30))
    }

    // Simulate final result
    await new Promise(resolve => setTimeout(resolve, 500))
    setProgress(100)
    
    // Randomly decide verification result (80% success rate for demo)
    const isVerified = Math.random() > 0.2
    setVerificationStatus(isVerified ? 'verified' : 'rejected')
  }

  const resetDemo = () => {
    setFormData({
      fullName: '',
      email: '',
      dateOfBirth: '',
      documentType: ''
    })
    setUploadedFile(null)
    setVerificationStatus('idle')
    setProgress(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-pattern" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-l from-purple-500/10 to-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 py-24 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
          >
            🚀 Live Demo
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Try Our{' '}
            <span className="bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
              KYC Platform
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Upload your documents to see how our AI-powered KYC verification works in real time. 
            Experience the speed and accuracy of our advanced document validation technology.
          </p>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + (index * 0.1) }}
              className="group p-6 rounded-2xl bg-muted/20 backdrop-blur-sm border border-border/20 hover:border-primary/20 transition-all duration-300 hover:scale-105"
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${benefit.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <benefit.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-foreground mb-2 text-sm">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Demo Section */}
        <div ref={ref} className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* KYC Form */}
            <Card className="p-8 bg-card/50 backdrop-blur-sm border border-border/20">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center space-x-3">
                <User className="w-6 h-6 text-primary" />
                <span>Personal Information</span>
              </h2>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-medium">
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Enter your full name"
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email"
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth" className="text-sm font-medium">
                    Date of Birth
                  </Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="documentType" className="text-sm font-medium">
                    Document Type
                  </Label>
                  <select
                    id="documentType"
                    value={formData.documentType}
                    onChange={(e) => handleInputChange('documentType', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
                  >
                    <option value="">Select document type</option>
                    {documentTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
            </Card>

            {/* File Upload */}
            <Card className="p-8 bg-card/50 backdrop-blur-sm border border-border/20">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center space-x-3">
                <FileText className="w-6 h-6 text-primary" />
                <span>Document Upload</span>
              </h2>

              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                  isDragOver 
                    ? 'border-primary bg-primary/5 scale-105' 
                    : uploadedFile 
                      ? 'border-green-500 bg-green-500/5' 
                      : 'border-border hover:border-primary/50 hover:bg-muted/20'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileSelect}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                <motion.div
                  animate={{ scale: isDragOver ? 1.1 : 1 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  {uploadedFile ? (
                    <>
                      <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                      <div>
                        <p className="text-lg font-semibold text-foreground">
                          File Uploaded Successfully!
                        </p>
                        <p className="text-muted-foreground">
                          {uploadedFile.name}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <Upload className="w-12 h-12 text-muted-foreground mx-auto" />
                      <div>
                        <p className="text-lg font-semibold text-foreground">
                          Drag & Drop or Upload Your File
                        </p>
                        <p className="text-muted-foreground">
                          Supports PDF, JPG, PNG files up to 10MB
                        </p>
                      </div>
                    </>
                  )}
                </motion.div>
              </div>

              {uploadedFile && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-muted/30 rounded-lg flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">{uploadedFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setUploadedFile(null)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Remove
                  </Button>
                </motion.div>
              )}
            </Card>
          </motion.div>

          {/* Right Column - Verification */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Verification Section */}
            <Card className="p-8 bg-card/50 backdrop-blur-sm border border-border/20">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center space-x-3">
                <Shield className="w-6 h-6 text-primary" />
                <span>Verification Results</span>
              </h2>

              {verificationStatus === 'idle' ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">
                    Upload a document to start verification
                  </p>
                </div>
              ) : verificationStatus === 'uploading' || verificationStatus === 'processing' ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
                    <p className="text-lg font-semibold text-foreground">
                      {verificationStatus === 'uploading' ? 'Uploading Document...' : 'AI Verification in Progress...'}
                    </p>
                    <p className="text-muted-foreground">
                      {verificationStatus === 'uploading' 
                        ? 'Securely uploading your document' 
                        : 'Analyzing document with advanced AI'
                      }
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="text-foreground font-medium">{progress}%</span>
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-3">
                      <motion.div
                        className="bg-gradient-to-r from-primary to-purple-500 h-3 rounded-full"
                        style={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className={`text-center py-8 rounded-xl ${
                    verificationStatus === 'verified' 
                      ? 'bg-green-500/10 border border-green-500/20' 
                      : 'bg-red-500/10 border border-red-500/20'
                  }`}
                >
                  {verificationStatus === 'verified' ? (
                    <>
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        Verification Successful ✅
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        Document has been successfully verified and validated
                      </p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="bg-background/50 rounded-lg p-3">
                          <p className="text-muted-foreground">Accuracy</p>
                          <p className="font-bold text-green-600">99.8%</p>
                        </div>
                        <div className="bg-background/50 rounded-lg p-3">
                          <p className="text-muted-foreground">Processing Time</p>
                          <p className="font-bold text-green-600">2.3s</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        Verification Failed ❌
                      </h3>
                      <p className="text-muted-foreground">
                        Document could not be verified. Please try with a different document.
                      </p>
                    </>
                  )}
                </motion.div>
              )}
            </Card>

            {/* Action Buttons */}
            <div className="space-y-4">
              {verificationStatus === 'idle' && (
                <Button
                  onClick={simulateVerification}
                  disabled={!uploadedFile || !formData.fullName || !formData.email}
                  className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white py-6 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <Zap className="w-5 h-5" />
                    <span>Start Verification</span>
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </Button>
              )}

              {(verificationStatus === 'verified' || verificationStatus === 'rejected') && (
                <Button
                  onClick={resetDemo}
                  variant="outline"
                  className="w-full py-6 text-lg font-semibold"
                >
                  Try Another Document
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}