"use client"

import React, { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, Play, CheckCircle, XCircle, RotateCcw, User, FileCheck, Shield } from "lucide-react"

type DemoStep = "idle" | "uploading" | "processing" | "verification" | "completed"
type VerificationResult = "success" | "failure" | null

export default function DemoSection() {
  const [currentStep, setCurrentStep] = useState<DemoStep>("idle")
  const [progress, setProgress] = useState(0)
  const [verificationResult, setVerificationResult] = useState<VerificationResult>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const demoSteps = [
    { id: "upload", label: "Upload Document", icon: Upload, duration: 1000 },
    { id: "processing", label: "Processing", icon: FileCheck, duration: 2000 },
    { id: "verification", label: "AI Verification", icon: Shield, duration: 2000 },
    { id: "completed", label: "Results", icon: CheckCircle, duration: 500 }
  ]

  const startDemo = useCallback(async () => {
    setCurrentStep("uploading")
    setProgress(0)
    setVerificationResult(null)

    // Simulate upload
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i)
      await new Promise(resolve => setTimeout(resolve, 50))
    }
    
    setCurrentStep("processing")
    setProgress(0)
    
    // Simulate processing
    for (let i = 0; i <= 100; i += 5) {
      setProgress(i)
      await new Promise(resolve => setTimeout(resolve, 40))
    }
    
    setCurrentStep("verification")
    setProgress(0)
    
    // Simulate verification
    for (let i = 0; i <= 100; i += 4) {
      setProgress(i)
      await new Promise(resolve => setTimeout(resolve, 35))
    }
    
    // Random result for demo
    const isSuccess = Math.random() > 0.3
    setVerificationResult(isSuccess ? "success" : "failure")
    setCurrentStep("completed")
    setProgress(100)
  }, [])

  const resetDemo = () => {
    setCurrentStep("idle")
    setProgress(0)
    setVerificationResult(null)
    setSelectedFile(null)
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const getStepStatus = (stepId: string) => {
    const stepIndex = demoSteps.findIndex(step => step.id === stepId)
    const currentIndex = demoSteps.findIndex(step => step.id === currentStep)
    
    if (stepIndex < currentIndex || currentStep === "completed") return "completed"
    if (stepIndex === currentIndex) return "active"
    return "pending"
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
          <Play className="h-8 w-8 text-primary" />
          Live Demo
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Experience the KYC verification process with our interactive demo
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Demo Interface */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Play className="h-5 w-5" />
              </div>
              Interactive Demo
              <Badge variant="secondary">Simulated</Badge>
            </CardTitle>
            <p className="text-muted-foreground">
              This demo simulates the complete KYC verification workflow
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step Progress */}
            <div className="space-y-4">
              {demoSteps.map((step, index) => {
                const status = getStepStatus(step.id)
                const StepIcon = step.icon
                
                return (
                  <div key={step.id} className="flex items-center gap-4">
                    <div className={`p-2 rounded-full transition-colors ${
                      status === "completed" ? "bg-green-100 text-green-600" :
                      status === "active" ? "bg-primary/10 text-primary animate-pulse" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      <StepIcon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{step.label}</div>
                      {status === "active" && (
                        <Progress value={progress} className="mt-2 h-2" />
                      )}
                    </div>
                    <div>
                      {status === "completed" && <CheckCircle className="h-5 w-5 text-green-500" />}
                      {status === "active" && <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Upload Area */}
            {currentStep === "idle" && (
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center transition-all hover:border-primary/50 hover:bg-primary/5">
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-semibold mb-2">Upload Your Document</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Drag and drop or click to select a government-issued ID
                </p>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <Button asChild>
                    <span>Choose File</span>
                  </Button>
                </label>
                {selectedFile && (
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <FileCheck className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">{selectedFile.name}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Processing Display */}
            {(currentStep === "uploading" || currentStep === "processing" || currentStep === "verification") && (
              <div className="text-center py-8">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary/10 rounded-full mb-4">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <span className="font-medium text-primary">
                    {currentStep === "uploading" && "Uploading document..."}
                    {currentStep === "processing" && "Processing document..."}
                    {currentStep === "verification" && "Verifying with AI..."}
                  </span>
                </div>
                <Progress value={progress} className="w-full" />
                <p className="text-sm text-muted-foreground mt-2">{progress}% complete</p>
              </div>
            )}

            {/* Results Display */}
            {currentStep === "completed" && (
              <div className="text-center py-8">
                {verificationResult === "success" ? (
                  <div className="space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-green-700">Verification Successful!</h3>
                      <p className="text-muted-foreground">Your document has been successfully verified</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="font-medium">Document Type</div>
                        <div className="text-green-700">Driver's License</div>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="font-medium">Confidence</div>
                        <div className="text-green-700">98.5%</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full">
                      <XCircle className="h-8 w-8 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-red-700">Verification Failed</h3>
                      <p className="text-muted-foreground">Please try again with a clearer image</p>
                    </div>
                    <div className="p-4 bg-red-50 rounded-lg text-sm text-red-700">
                      <div className="font-medium mb-2">Issues detected:</div>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Image quality too low</li>
                        <li>Document corners not visible</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              {currentStep === "idle" && selectedFile && (
                <Button onClick={startDemo} className="flex-1">
                  <Play className="h-4 w-4 mr-2" />
                  Start Verification
                </Button>
              )}
              {currentStep === "completed" && (
                <Button onClick={resetDemo} variant="outline" className="flex-1">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Demo Information */}
        <div className="space-y-6">
          {/* What Happens */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                  <User className="h-5 w-5" />
                </div>
                What Happens During Verification?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <div className="font-medium">Document Upload</div>
                    <div className="text-sm text-muted-foreground">Secure upload with real-time progress tracking</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <div className="font-medium">AI Processing</div>
                    <div className="text-sm text-muted-foreground">Advanced OCR and document structure analysis</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <div className="font-medium">Fraud Detection</div>
                    <div className="text-sm text-muted-foreground">AI-powered authenticity and tampering checks</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">4</div>
                  <div>
                    <div className="font-medium">Results</div>
                    <div className="text-sm text-muted-foreground">Instant verification status with detailed insights</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real vs Demo */}
          <Card className="border-l-4 border-l-amber-500">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <span className="text-xl">ℹ️</span>
                Demo vs Real Implementation
              </h3>
              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="font-medium text-amber-700">Demo Behavior</div>
                    <ul className="list-disc list-inside mt-1 text-muted-foreground space-y-1">
                      <li>Simulated processing times</li>
                      <li>Random success/failure results</li>
                      <li>No actual AI processing</li>
                      <li>Sample data responses</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-medium text-green-700">Real Implementation</div>
                    <ul className="list-disc list-inside mt-1 text-muted-foreground space-y-1">
                      <li>Actual document processing</li>
                      <li>Real fraud detection</li>
                      <li>Live verification results</li>
                      <li>Secure data handling</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Try It Live */}
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold mb-3">Ready to Try the Real Thing?</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Get your API key and start integrating KYC verification in minutes
              </p>
              <div className="flex gap-3 justify-center">
                <Button>Get API Key</Button>
                <Button variant="outline">View Pricing</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}