"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import CodeBlock, { BashCode, JavaScriptCode, HTMLCode } from "./code-block"
import { Package, Globe, Zap } from "lucide-react"

export default function InstallationSection() {
  const npmInstallCode = `npm install kyc-sdk`
  
  const yarnInstallCode = `yarn add kyc-sdk`
  
  const pnpmInstallCode = `pnpm add kyc-sdk`

  const reactUsageCode = `import { initKYC, openKYCModal } from "kyc-sdk";
import "kyc-sdk/dist/styles.css";

function App() {
  useEffect(() => {
    initKYC({ 
      apiKey: "your-api-key",
      environment: "sandbox" // or "production"
    });
  }, []);

  const handleStartKYC = () => {
    openKYCModal({ 
      name: "John Doe", 
      email: "john@email.com",
      onSuccess: (result) => {
        console.log("KYC completed:", result);
      },
      onError: (error) => {
        console.error("KYC failed:", error);
      }
    });
  };

  return (
    <div className="app">
      <button onClick={handleStartKYC}>
        Start KYC Verification
      </button>
    </div>
  );
}`

  const nextjsUsageCode = `"use client"

import { useEffect } from "react";
import { initKYC, openKYCModal } from "kyc-sdk";
import "kyc-sdk/dist/styles.css";

export default function KYCPage() {
  useEffect(() => {
    initKYC({ 
      apiKey: process.env.NEXT_PUBLIC_KYC_API_KEY,
      environment: process.env.NODE_ENV === "production" ? "production" : "sandbox"
    });
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Identity Verification</h1>
      <button 
        onClick={() => openKYCModal({ 
          name: "Jane Doe", 
          email: "jane@email.com" 
        })}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Verify Identity
      </button>
    </div>
  );
}`

  const cdnCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KYC Integration</title>
    <!-- KYC SDK Styles -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/kyc-sdk/dist/styles.css">
</head>
<body>
    <div class="container">
        <h1>Identity Verification</h1>
        <button id="kycBtn" class="btn-primary">
            Start KYC Verification
        </button>
    </div>

    <!-- KYC SDK Script -->
    <script src="https://cdn.jsdelivr.net/npm/kyc-sdk/dist/kyc.min.js"></script>
    <script>
        // Initialize KYC SDK
        KYC.init({ 
            apiKey: "your-api-key",
            environment: "sandbox"
        });

        // Handle button click
        document.getElementById("kycBtn").onclick = () => {
            KYC.open({ 
                name: "Jane Doe", 
                email: "jane@email.com",
                onSuccess: (result) => {
                    console.log("Verification successful:", result);
                    alert("KYC verification completed successfully!");
                },
                onError: (error) => {
                    console.error("Verification failed:", error);
                    alert("KYC verification failed. Please try again.");
                }
            });
        };
    </script>
</body>
</html>`

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
          <Package className="h-8 w-8 text-primary" />
          Installation Guide
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose your preferred installation method and get started with KYC SDK in minutes
        </p>
      </div>

      {/* Installation Methods */}
      <Tabs defaultValue="npm" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="npm" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            NPM
          </TabsTrigger>
          <TabsTrigger value="yarn" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Yarn
          </TabsTrigger>
          <TabsTrigger value="pnpm" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            PNPM
          </TabsTrigger>
        </TabsList>

        <TabsContent value="npm">
          <Card>
            <CardContent className="p-6">
              <BashCode title="Install via NPM">{npmInstallCode}</BashCode>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="yarn">
          <Card>
            <CardContent className="p-6">
              <BashCode title="Install via Yarn">{yarnInstallCode}</BashCode>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pnpm">
          <Card>
            <CardContent className="p-6">
              <BashCode title="Install via PNPM">{pnpmInstallCode}</BashCode>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Framework Examples */}
      <div className="grid gap-8">
        {/* React Example */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                <Zap className="h-5 w-5" />
              </div>
              React Integration
              <Badge variant="secondary">Recommended</Badge>
            </CardTitle>
            <p className="text-muted-foreground">
              Complete example for React applications with hooks
            </p>
          </CardHeader>
          <CardContent>
            <JavaScriptCode title="App.js">{reactUsageCode}</JavaScriptCode>
          </CardContent>
        </Card>

        {/* Next.js Example */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-black text-white">
                <Globe className="h-5 w-5" />
              </div>
              Next.js Integration
              <Badge variant="outline">SSR Compatible</Badge>
            </CardTitle>
            <p className="text-muted-foreground">
              Server-side rendering compatible implementation for Next.js
            </p>
          </CardHeader>
          <CardContent>
            <JavaScriptCode title="components/KYCPage.jsx">{nextjsUsageCode}</JavaScriptCode>
          </CardContent>
        </Card>

        {/* CDN Example */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-100 text-orange-600">
                <Globe className="h-5 w-5" />
              </div>
              CDN Integration
              <Badge variant="outline">No Build Step</Badge>
            </CardTitle>
            <p className="text-muted-foreground">
              Direct browser integration without any build tools
            </p>
          </CardHeader>
          <CardContent>
            <HTMLCode title="index.html">{cdnCode}</HTMLCode>
          </CardContent>
        </Card>
      </div>

      {/* Requirements */}
      <Card className="border-l-4 border-l-blue-500">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-xl">📋</span>
            Requirements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Browser Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Chrome 70+
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Firefox 65+
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Safari 12+
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Edge 79+
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Framework Compatibility</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  React 16.8+
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Vue.js 2.6+
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Angular 9+
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Vanilla JavaScript
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}