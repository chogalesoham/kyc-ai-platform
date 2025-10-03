"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import CodeBlock, { JavaScriptCode, TypeScriptCode } from "./code-block"
import { Settings, Play, Upload, Bell, CheckCircle, XCircle } from "lucide-react"

export default function APIReferenceSection() {
  const initKYCExample = `import { initKYC } from "kyc-sdk";

// Basic initialization
initKYC({
  apiKey: "your-api-key",
  environment: "sandbox" // or "production"
});

// Advanced configuration
initKYC({
  apiKey: "your-api-key",
  environment: "production",
  options: {
    theme: "dark", // "light" | "dark" | "auto"
    language: "en", // "en" | "es" | "fr" | "de"
    allowedDocuments: ["passport", "drivers_license", "national_id"],
    maxFileSize: "10MB",
    timeout: 30000, // 30 seconds
    enableCamera: true,
    enableFaceMatch: true,
    callbacks: {
      onReady: () => console.log("KYC SDK ready"),
      onError: (error) => console.error("SDK Error:", error)
    }
  }
});`

  const openKYCModalExample = `import { openKYCModal } from "kyc-sdk";

// Basic usage
openKYCModal({
  name: "John Doe",
  email: "john@email.com"
});

// With all options
openKYCModal({
  name: "John Doe",
  email: "john@email.com",
  phone: "+1234567890",
  dateOfBirth: "1990-01-01",
  address: {
    street: "123 Main St",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "US"
  },
  metadata: {
    userId: "user123",
    sessionId: "session456"
  },
  onSuccess: (result) => {
    console.log("Verification successful:", result);
    // result contains:
    // - verificationId: string
    // - status: "verified" | "rejected"
    // - documents: DocumentResult[]
    // - faceMatch: FaceMatchResult
    // - riskScore: number
  },
  onError: (error) => {
    console.error("Verification failed:", error);
    // error contains:
    // - code: string
    // - message: string
    // - details?: any
  },
  onClose: () => {
    console.log("Modal closed");
  },
  onProgress: (progress) => {
    console.log("Progress:", progress);
    // progress contains:
    // - step: "upload" | "processing" | "verification"
    // - percentage: number
    // - message: string
  }
});`

  const submitKYCExample = `import { submitKYC } from "kyc-sdk";

// Submit with file and user data
const file = document.getElementById("fileInput").files[0];

submitKYC(file, {
  name: "John Doe",
  email: "john@email.com",
  documentType: "passport" // "passport" | "drivers_license" | "national_id"
}).then(result => {
  console.log("Verification result:", result);
}).catch(error => {
  console.error("Verification error:", error);
});

// Submit with additional verification steps
submitKYC(file, {
  name: "John Doe",
  email: "john@email.com",
  documentType: "drivers_license",
  enableFaceMatch: true,
  faceImage: faceImageFile, // Optional face image for matching
  verificationLevel: "enhanced" // "basic" | "standard" | "enhanced"
}).then(result => {
  if (result.status === "verified") {
    console.log("✅ Verification successful");
    console.log("Document verified:", result.document);
    console.log("Face match score:", result.faceMatch?.score);
    console.log("Risk assessment:", result.riskScore);
  } else {
    console.log("❌ Verification failed");
    console.log("Rejection reasons:", result.rejectionReasons);
  }
});`

  const onStatusChangeExample = `import { onStatusChange } from "kyc-sdk";

// Listen for status updates
const unsubscribe = onStatusChange((status) => {
  console.log("Status update:", status);
  
  switch (status.type) {
    case "upload_started":
      console.log("File upload started");
      break;
    case "upload_progress":
      console.log(\`Upload progress: \${status.progress}%\`);
      break;
    case "upload_completed":
      console.log("File upload completed");
      break;
    case "processing_started":
      console.log("Document processing started");
      break;
    case "processing_completed":
      console.log("Document processing completed");
      break;
    case "verification_completed":
      console.log("Verification completed:", status.result);
      break;
    case "error":
      console.error("Error occurred:", status.error);
      break;
  }
});

// Remember to unsubscribe when component unmounts
// unsubscribe();`

  const typeDefinitions = `// TypeScript type definitions
interface KYCConfig {
  apiKey: string;
  environment: "sandbox" | "production";
  options?: {
    theme?: "light" | "dark" | "auto";
    language?: "en" | "es" | "fr" | "de";
    allowedDocuments?: DocumentType[];
    maxFileSize?: string;
    timeout?: number;
    enableCamera?: boolean;
    enableFaceMatch?: boolean;
    callbacks?: {
      onReady?: () => void;
      onError?: (error: KYCError) => void;
    };
  };
}

interface UserData {
  name: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  address?: Address;
  metadata?: Record<string, any>;
}

interface VerificationResult {
  verificationId: string;
  status: "verified" | "rejected" | "pending";
  documents: DocumentResult[];
  faceMatch?: FaceMatchResult;
  riskScore: number;
  rejectionReasons?: string[];
  timestamp: string;
}

interface DocumentResult {
  type: DocumentType;
  extractedData: {
    name?: string;
    dateOfBirth?: string;
    documentNumber?: string;
    expiryDate?: string;
    issueDate?: string;
    nationality?: string;
  };
  confidence: number;
  fraudChecks: {
    authentic: boolean;
    tampered: boolean;
    photoSubstitution: boolean;
  };
}

type DocumentType = "passport" | "drivers_license" | "national_id";`

  const apiMethods = [
    {
      name: "initKYC",
      description: "Initialize the KYC SDK with your API key and configuration",
      params: ["config: KYCConfig"],
      returns: "Promise<void>",
      icon: <Settings className="h-5 w-5" />
    },
    {
      name: "openKYCModal",
      description: "Open the KYC verification modal with user data",
      params: ["userData: UserData & CallbackOptions"],
      returns: "Promise<VerificationResult>",
      icon: <Play className="h-5 w-5" />
    },
    {
      name: "submitKYC",
      description: "Submit a document file for verification programmatically",
      params: ["file: File", "userData: UserData"],
      returns: "Promise<VerificationResult>",
      icon: <Upload className="h-5 w-5" />
    },
    {
      name: "onStatusChange",
      description: "Listen for real-time status updates during verification",
      params: ["callback: (status: StatusUpdate) => void"],
      returns: "() => void (unsubscribe function)",
      icon: <Bell className="h-5 w-5" />
    }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
          <Settings className="h-8 w-8 text-primary" />
          API Reference
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Complete reference for all KYC SDK functions, parameters, and return values
        </p>
      </div>

      {/* API Methods Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {apiMethods.map((method, index) => (
          <Card key={index} className="group hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {method.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{method.name}</h3>
                  <Badge variant="outline" className="text-xs">
                    {method.returns}
                  </Badge>
                </div>
              </div>
              <p className="text-muted-foreground text-sm mb-3">{method.description}</p>
              <div className="text-sm">
                <strong>Parameters:</strong>
                <ul className="list-disc list-inside mt-1 text-muted-foreground">
                  {method.params.map((param, i) => (
                    <li key={i} className="font-mono text-xs">{param}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed API Documentation */}
      <div className="space-y-8">
        {/* initKYC */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Settings className="h-6 w-6 text-primary" />
              initKYC(config)
              <Badge>Required</Badge>
            </CardTitle>
            <p className="text-muted-foreground">
              Initialize the KYC SDK with your API credentials and configuration options. 
              This must be called before using any other SDK functions.
            </p>
          </CardHeader>
          <CardContent>
            <JavaScriptCode title="initKYC Examples">{initKYCExample}</JavaScriptCode>
          </CardContent>
        </Card>

        {/* openKYCModal */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Play className="h-6 w-6 text-primary" />
              openKYCModal(userData)
              <Badge variant="secondary">Interactive</Badge>
            </CardTitle>
            <p className="text-muted-foreground">
              Open the KYC verification modal with a pre-built UI. This provides the complete 
              verification flow including document upload, processing, and result display.
            </p>
          </CardHeader>
          <CardContent>
            <JavaScriptCode title="openKYCModal Examples">{openKYCModalExample}</JavaScriptCode>
          </CardContent>
        </Card>

        {/* submitKYC */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Upload className="h-6 w-6 text-primary" />
              submitKYC(file, userData)
              <Badge variant="secondary">Programmatic</Badge>
            </CardTitle>
            <p className="text-muted-foreground">
              Submit a document file for verification programmatically without using the modal UI. 
              Ideal for custom interfaces or headless implementations.
            </p>
          </CardHeader>
          <CardContent>
            <JavaScriptCode title="submitKYC Examples">{submitKYCExample}</JavaScriptCode>
          </CardContent>
        </Card>

        {/* onStatusChange */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Bell className="h-6 w-6 text-primary" />
              onStatusChange(callback)
              <Badge variant="secondary">Event Listener</Badge>
            </CardTitle>
            <p className="text-muted-foreground">
              Listen for real-time status updates during the verification process. 
              Use this to provide custom progress indicators or handle specific events.
            </p>
          </CardHeader>
          <CardContent>
            <JavaScriptCode title="onStatusChange Examples">{onStatusChangeExample}</JavaScriptCode>
          </CardContent>
        </Card>

        {/* TypeScript Definitions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <CheckCircle className="h-6 w-6 text-primary" />
              TypeScript Definitions
              <Badge variant="outline">TypeScript</Badge>
            </CardTitle>
            <p className="text-muted-foreground">
              Complete TypeScript type definitions for all SDK interfaces and return types.
            </p>
          </CardHeader>
          <CardContent>
            <TypeScriptCode title="types.ts">{typeDefinitions}</TypeScriptCode>
          </CardContent>
        </Card>
      </div>

      {/* Error Handling */}
      <Card className="border-l-4 border-l-red-500">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <XCircle className="h-6 w-6 text-red-500" />
            Error Handling
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Common Error Codes</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <code className="bg-muted px-2 py-1 rounded text-xs">INVALID_API_KEY</code>
                  <span className="text-muted-foreground">Invalid or missing API key</span>
                </li>
                <li className="flex items-center gap-2">
                  <code className="bg-muted px-2 py-1 rounded text-xs">FILE_TOO_LARGE</code>
                  <span className="text-muted-foreground">File exceeds size limit</span>
                </li>
                <li className="flex items-center gap-2">
                  <code className="bg-muted px-2 py-1 rounded text-xs">UNSUPPORTED_FORMAT</code>
                  <span className="text-muted-foreground">Unsupported file format</span>
                </li>
                <li className="flex items-center gap-2">
                  <code className="bg-muted px-2 py-1 rounded text-xs">NETWORK_ERROR</code>
                  <span className="text-muted-foreground">Network connectivity issue</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Best Practices</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Always handle promise rejections
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Validate user input before submission
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Provide user-friendly error messages
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Implement retry logic for network errors
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}