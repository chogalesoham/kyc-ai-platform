"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CodeBlock, { JavaScriptCode, CSSCode } from "./code-block"
import { Palette, Type, Layout, Sparkles } from "lucide-react"

export default function CustomizationSection() {
  const themeConfigExample = `import { initKYC } from "kyc-sdk";

// Light theme configuration
initKYC({
  apiKey: "your-api-key",
  options: {
    theme: {
      mode: "light",
      colors: {
        primary: "#2563eb",      // Primary brand color
        secondary: "#64748b",    // Secondary color
        success: "#22c55e",      // Success states
        error: "#ef4444",        // Error states
        warning: "#f59e0b",      // Warning states
        background: "#ffffff",   // Modal background
        surface: "#f8fafc",      // Card backgrounds
        text: "#1e293b",         // Primary text
        textSecondary: "#64748b" // Secondary text
      },
      borderRadius: "8px",       // Border radius for elements
      fontFamily: "Inter, sans-serif"
    }
  }
});

// Dark theme configuration
initKYC({
  apiKey: "your-api-key",
  options: {
    theme: {
      mode: "dark",
      colors: {
        primary: "#3b82f6",
        secondary: "#64748b",
        success: "#10b981",
        error: "#f87171",
        warning: "#fbbf24",
        background: "#0f172a",
        surface: "#1e293b",
        text: "#f8fafc",
        textSecondary: "#94a3b8"
      }
    }
  }
});

// Auto theme (follows system preference)
initKYC({
  apiKey: "your-api-key",
  options: {
    theme: {
      mode: "auto" // Automatically switches between light/dark
    }
  }
});`

  const customLabelsExample = `// Custom text and labels
initKYC({
  apiKey: "your-api-key",
  options: {
    labels: {
      // Modal titles
      title: "Identity Verification",
      subtitle: "Please upload your government-issued ID",
      
      // Upload section
      uploadTitle: "Upload Document",
      uploadDescription: "Drag and drop your ID or click to browse",
      uploadButton: "Choose File",
      uploadSupported: "Supported: JPG, PNG, PDF (max 10MB)",
      
      // Processing section
      processingTitle: "Verifying Document",
      processingDescription: "Please wait while we verify your document...",
      
      // Results section
      successTitle: "Verification Successful!",
      successDescription: "Your identity has been verified successfully.",
      errorTitle: "Verification Failed",
      errorDescription: "Please try again with a different document.",
      
      // Buttons
      continueButton: "Continue",
      retryButton: "Try Again",
      closeButton: "Close",
      cancelButton: "Cancel",
      
      // Instructions
      instructions: {
        passport: "Please upload a clear photo of your passport",
        driversLicense: "Upload both front and back of your driver's license",
        nationalId: "Upload a clear photo of your national ID card"
      }
    }
  }
});

// Multi-language support
initKYC({
  apiKey: "your-api-key",
  options: {
    language: "es", // Spanish
    labels: {
      title: "Verificación de Identidad",
      subtitle: "Por favor sube tu documento de identidad",
      uploadTitle: "Subir Documento",
      uploadDescription: "Arrastra y suelta tu ID o haz clic para explorar",
      // ... more Spanish translations
    }
  }
});`

  const customStylingExample = `/* Custom CSS for advanced styling */

/* Override modal appearance */
.kyc-modal {
  --kyc-modal-width: 600px;
  --kyc-modal-max-height: 80vh;
  --kyc-animation-duration: 0.3s;
}

/* Custom upload area */
.kyc-upload-area {
  border: 2px dashed #3b82f6;
  border-radius: 12px;
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  transition: all 0.3s ease;
}

.kyc-upload-area:hover {
  border-color: #1d4ed8;
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.15);
}

/* Custom progress bar */
.kyc-progress-bar {
  background: linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%);
  border-radius: 8px;
  height: 8px;
  animation: pulse 2s infinite;
}

/* Custom button styles */
.kyc-button-primary {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  transition: all 0.3s ease;
}

.kyc-button-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

/* Custom success animation */
.kyc-success-icon {
  animation: successPulse 0.6s ease-out;
}

@keyframes successPulse {
  0% { transform: scale(0); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

/* Dark theme overrides */
.kyc-modal.dark {
  --kyc-background: #0f172a;
  --kyc-surface: #1e293b;
  --kyc-text: #f8fafc;
}

.kyc-modal.dark .kyc-upload-area {
  border-color: #475569;
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
}

/* Responsive design */
@media (max-width: 768px) {
  .kyc-modal {
    --kyc-modal-width: 95vw;
    --kyc-modal-max-height: 90vh;
  }
  
  .kyc-upload-area {
    padding: 2rem 1rem;
  }
}`

  const componentCustomizationExample = `// Advanced component customization
initKYC({
  apiKey: "your-api-key",
  options: {
    components: {
      // Custom upload component
      uploadArea: {
        showPreview: true,
        allowMultiple: false,
        acceptedTypes: [".jpg", ".jpeg", ".png", ".pdf"],
        maxFileSize: "10MB",
        customRenderer: (props) => {
          return \`
            <div class="custom-upload-area">
              <div class="upload-icon">📄</div>
              <h3>\${props.title}</h3>
              <p>\${props.description}</p>
              <button class="upload-btn">\${props.buttonText}</button>
            </div>
          \`;
        }
      },
      
      // Custom progress indicator
      progressBar: {
        showPercentage: true,
        showSteps: true,
        customSteps: [
          { id: "upload", label: "Upload", icon: "📤" },
          { id: "process", label: "Process", icon: "⚙️" },
          { id: "verify", label: "Verify", icon: "✅" }
        ]
      },
      
      // Custom result display
      resultDisplay: {
        showDetails: true,
        showRiskScore: false, // Hide sensitive information
        customSuccessMessage: "🎉 Welcome aboard! Your verification is complete.",
        customErrorMessage: "😞 Verification unsuccessful. Please try with a different document."
      }
    },
    
    // Custom validation rules
    validation: {
      document: {
        minResolution: "1200x800",
        maxAge: 30, // days
        requireFaceVisible: true,
        requireAllCorners: true
      },
      face: {
        minConfidence: 0.8,
        requireLiveness: true,
        allowGlasses: true,
        allowHat: false
      }
    }
  }
});`

  const brandingExample = `// Complete branding customization
const brandConfig = {
  apiKey: "your-api-key",
  options: {
    branding: {
      // Company branding
      logo: "https://your-domain.com/logo.png",
      companyName: "Your Company",
      brandColor: "#ff6b35",
      
      // Custom favicon for modal
      favicon: "https://your-domain.com/favicon.ico",
      
      // Footer customization
      footer: {
        show: true,
        text: "Powered by Your Company",
        links: [
          { text: "Privacy Policy", url: "https://your-domain.com/privacy" },
          { text: "Terms of Service", url: "https://your-domain.com/terms" },
          { text: "Support", url: "mailto:support@your-domain.com" }
        ]
      },
      
      // Custom CSS injection
      customCSS: \`
        .kyc-modal {
          font-family: 'Your Custom Font', sans-serif;
        }
        .kyc-header {
          background: linear-gradient(45deg, #ff6b35, #f7931e);
        }
      \`
    },
    
    // Workflow customization
    workflow: {
      steps: ["document", "selfie", "liveness"], // Customize verification steps
      skipSteps: [], // Skip certain steps if needed
      allowSkip: false, // Allow users to skip optional steps
      autoAdvance: true, // Automatically advance through steps
      
      // Custom step configuration
      documentStep: {
        allowRetake: true,
        maxAttempts: 3,
        showTips: true,
        tips: [
          "Ensure all corners of the document are visible",
          "Avoid glare and shadows",
          "Use good lighting for best results"
        ]
      }
    }
  }
};

initKYC(brandConfig);`

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
          <Palette className="h-8 w-8 text-primary" />
          Customization Guide
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Customize the KYC SDK to match your brand and provide the perfect user experience
        </p>
      </div>

      {/* Customization Categories */}
      <Tabs defaultValue="themes" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="themes" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Themes
          </TabsTrigger>
          <TabsTrigger value="labels" className="flex items-center gap-2">
            <Type className="h-4 w-4" />
            Labels
          </TabsTrigger>
          <TabsTrigger value="styling" className="flex items-center gap-2">
            <Layout className="h-4 w-4" />
            Styling
          </TabsTrigger>
          <TabsTrigger value="branding" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Branding
          </TabsTrigger>
        </TabsList>

        <TabsContent value="themes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Palette className="h-6 w-6 text-primary" />
                Theme Configuration
                <Badge>Popular</Badge>
              </CardTitle>
              <p className="text-muted-foreground">
                Customize colors, fonts, and visual appearance to match your brand identity
              </p>
            </CardHeader>
            <CardContent>
              <JavaScriptCode title="Theme Configuration">{themeConfigExample}</JavaScriptCode>
            </CardContent>
          </Card>

          {/* Theme Previews */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Light Theme Preview</h3>
                <div className="border rounded-lg p-4 bg-white">
                  <div className="h-2 bg-blue-600 rounded mb-3"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                  </div>
                  <div className="mt-4 p-3 border-2 border-dashed border-blue-300 rounded text-center text-sm text-gray-600">
                    Upload Area
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Dark Theme Preview</h3>
                <div className="border rounded-lg p-4 bg-gray-900">
                  <div className="h-2 bg-blue-500 rounded mb-3"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-800 rounded w-1/2"></div>
                  </div>
                  <div className="mt-4 p-3 border-2 border-dashed border-blue-600 rounded text-center text-sm text-gray-300">
                    Upload Area
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="labels" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Type className="h-6 w-6 text-primary" />
                Text & Labels Customization
                <Badge variant="secondary">i18n Ready</Badge>
              </CardTitle>
              <p className="text-muted-foreground">
                Customize all text content and add multi-language support
              </p>
            </CardHeader>
            <CardContent>
              <JavaScriptCode title="Custom Labels & Internationalization">{customLabelsExample}</JavaScriptCode>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="styling" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Layout className="h-6 w-6 text-primary" />
                Advanced CSS Styling
                <Badge variant="outline">Advanced</Badge>
              </CardTitle>
              <p className="text-muted-foreground">
                Deep customization with CSS for complete control over appearance
              </p>
            </CardHeader>
            <CardContent>
              <CSSCode title="custom-kyc-styles.css">{customStylingExample}</CSSCode>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Component-Level Customization</CardTitle>
              <p className="text-muted-foreground">
                Customize individual components and their behavior
              </p>
            </CardHeader>
            <CardContent>
              <JavaScriptCode title="Component Customization">{componentCustomizationExample}</JavaScriptCode>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branding" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Sparkles className="h-6 w-6 text-primary" />
                Complete Branding Solution
                <Badge>Enterprise</Badge>
              </CardTitle>
              <p className="text-muted-foreground">
                White-label the entire verification experience with your brand
              </p>
            </CardHeader>
            <CardContent>
              <JavaScriptCode title="Complete Branding Configuration">{brandingExample}</JavaScriptCode>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Customization Tips */}
      <Card className="border-l-4 border-l-blue-500">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-xl">💡</span>
            Customization Best Practices
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Design Guidelines</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Maintain sufficient color contrast for accessibility
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Test on both light and dark backgrounds
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Keep animations subtle and purposeful
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Ensure responsive design on all devices
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Technical Tips</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Use CSS custom properties for easier maintenance
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Load custom fonts asynchronously
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Optimize images and assets for web
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Test with different content lengths
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}