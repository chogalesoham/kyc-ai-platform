'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

type VerificationType = 'document' | 'liveness'

const verificationData = {
  document: {
    title: 'Document Verification',
    description: 'AI-powered verification for all types of identity documents',
    documents: [
      {
        name: 'Aadhaar Card',
        features: ['OCR text extraction', 'Biometric verification', 'Government database validation']
      },
      {
        name: 'PAN Card',
        features: ['Government API integration', 'Name matching', 'Status verification']
      },
      {
        name: 'Driving License',
        features: ['Multi-state support', 'Expiry validation', 'Photo verification']
      },
      {
        name: 'Voter ID',
        features: ['Electoral roll verification', 'Address validation', 'Constituency details']
      },
      {
        name: 'Passport',
        features: ['MRZ code scanning', 'Chip verification', 'Travel history check']
      }
    ]
  },
  liveness: {
    title: 'Liveness Detection',
    description: 'Advanced biometric liveness detection to prevent spoofing',
    features: ['Active liveness checks', 'Passive liveness detection', 'Anti-spoofing protection', 'Real-time analysis', 'Face recognition', 'Gesture-based verification']
  }
}

export default function HeroBanner() {
  const [activeTab, setActiveTab] = useState<VerificationType>('document')

  return (
    <section className="min-h-screen flex items-center justify-center bg-white">
      <div className="container mx-auto px-4 text-center">
        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Verification Modules
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Futuristic Verification apps verify offers
        </p>

        {/* Navigation Pills */}
        <div className="flex items-center justify-center gap-4 mb-12 flex-wrap">
          <button 
            onClick={() => setActiveTab('document')}
            className={`px-6 py-3 rounded-lg transition-colors font-medium ${
              activeTab === 'document' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            Document Verification
          </button>
          <button 
            onClick={() => setActiveTab('liveness')}
            className={`px-6 py-3 rounded-lg transition-colors font-medium ${
              activeTab === 'liveness' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            Liveness Detection
          </button>
        </div>

        {/* Content Section */}
        <div className="max-w-6xl mx-auto">
          <Card className="text-left">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-gray-900">
                {verificationData[activeTab].title}
              </CardTitle>
              <CardDescription className="text-lg text-gray-600">
                {verificationData[activeTab].description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {activeTab === 'document' ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {verificationData.document.documents.map((doc, index) => (
                    <div key={index} className="bg-gray-50 p-6 rounded-lg border hover:shadow-md transition-shadow">
                      {/* Document Card Visuals */}
                      <div className="mb-4 flex justify-center">
                        {doc.name === 'Aadhaar Card' && (
                          <div className="relative w-48 h-32 bg-gradient-to-r from-orange-100 to-green-100 rounded-lg border-2 border-orange-300 flex items-center justify-center">
                            <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded text-xs font-bold text-orange-600 border">
                              With OCR
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-16 bg-blue-400 rounded-md flex items-center justify-center">
                                <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
                              </div>
                              <div className="space-y-1">
                                <div className="w-20 h-2 bg-gray-400 rounded"></div>
                                <div className="w-16 h-2 bg-gray-400 rounded"></div>
                                <div className="w-12 h-2 bg-gray-400 rounded"></div>
                              </div>
                              <div className="w-8 h-8 bg-black border border-gray-400 grid grid-cols-3 gap-px">
                                {Array.from({ length: 9 }).map((_, i) => (
                                  <div key={i} className="bg-white"></div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {doc.name === 'PAN Card' && (
                          <div className="relative w-48 h-32 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg border-2 border-blue-400 flex items-center justify-center">
                            <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded text-xs font-bold text-blue-600 border">
                              PAN CARD
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-16 bg-gray-300 rounded-md flex items-center justify-center">
                                <div className="w-8 h-8 bg-gray-500 rounded-sm"></div>
                              </div>
                              <div className="space-y-1">
                                <div className="w-24 h-2 bg-blue-400 rounded"></div>
                                <div className="w-20 h-2 bg-gray-400 rounded"></div>
                                <div className="w-16 h-2 bg-gray-400 rounded"></div>
                                <div className="w-18 h-3 bg-blue-600 rounded text-xs text-white flex items-center justify-center">ID</div>
                              </div>
                            </div>
                          </div>
                        )}

                        {doc.name === 'Driving License' && (
                          <div className="relative w-48 h-32 bg-gradient-to-r from-red-50 to-white rounded-lg border-2 border-red-400 flex items-center justify-center">
                            <div className="absolute top-2 left-2 bg-red-600 px-2 py-1 rounded text-xs font-bold text-white border">
                              DL
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-16 bg-red-100 rounded-md flex items-center justify-center border border-red-300">
                                <div className="w-8 h-8 bg-red-600 rounded-sm"></div>
                              </div>
                              <div className="space-y-1">
                                <div className="w-22 h-2 bg-red-500 rounded"></div>
                                <div className="w-18 h-2 bg-gray-400 rounded"></div>
                                <div className="w-16 h-2 bg-gray-400 rounded"></div>
                                <div className="w-20 h-2 bg-gray-400 rounded"></div>
                              </div>
                              <div className="flex flex-col space-y-1">
                                <div className="w-6 h-1 bg-red-400 rounded"></div>
                                <div className="w-6 h-1 bg-white border border-red-300 rounded"></div>
                                <div className="w-6 h-1 bg-red-600 rounded"></div>
                              </div>
                            </div>
                          </div>
                        )}

                        {doc.name === 'Voter ID' && (
                          <div className="relative w-48 h-32 bg-gradient-to-r from-purple-100 to-indigo-200 rounded-lg border-2 border-purple-400 flex items-center justify-center">
                            <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded text-xs font-bold text-purple-600 border">
                              VOTER ID
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-16 bg-purple-300 rounded-md flex items-center justify-center">
                                <div className="w-8 h-8 bg-purple-600 rounded-sm"></div>
                              </div>
                              <div className="space-y-1">
                                <div className="w-20 h-2 bg-purple-400 rounded"></div>
                                <div className="w-16 h-2 bg-gray-400 rounded"></div>
                                <div className="w-18 h-2 bg-gray-400 rounded"></div>
                              </div>
                              <div className="w-8 h-8 border-2 border-purple-400 rounded flex items-center justify-center">
                                <div className="text-xs font-bold text-purple-600">ECI</div>
                              </div>
                            </div>
                          </div>
                        )}

                        {doc.name === 'Passport' && (
                          <div className="relative w-48 h-32 bg-gradient-to-r from-red-100 to-red-200 rounded-lg border-2 border-red-400 flex items-center justify-center">
                            <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded text-xs font-bold text-red-600 border">
                              PASSPORT
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-16 bg-red-300 rounded-md flex items-center justify-center">
                                <div className="w-8 h-8 bg-red-600 rounded-sm"></div>
                              </div>
                              <div className="space-y-1">
                                <div className="w-24 h-2 bg-red-400 rounded"></div>
                                <div className="w-20 h-2 bg-gray-400 rounded"></div>
                                <div className="w-16 h-2 bg-gray-400 rounded"></div>
                              </div>
                              <div className="flex flex-col items-center space-y-1">
                                <div className="w-6 h-3 bg-gold-400 rounded text-xs flex items-center justify-center">🛂</div>
                                <div className="text-xs font-bold text-red-600">MRZ</div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-4">{doc.name}</h3>
                      <div className="space-y-2">
                        {doc.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            <span className="text-gray-700 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {verificationData.liveness.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-8 text-center">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
                  Try {verificationData[activeTab].title}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}