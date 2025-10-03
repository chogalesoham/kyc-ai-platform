"use client"

import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronRight, HelpCircle, Shield, Code, Globe, Clock, DollarSign } from "lucide-react"

interface FAQItem {
  id: string
  question: string
  answer: string
  category: "security" | "integration" | "general" | "pricing" | "technical"
  popular?: boolean
}

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<string[]>(["security-1"])

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const faqData: FAQItem[] = [
    // Security Questions
    {
      id: "security-1",
      category: "security",
      question: "Is my data secure during the verification process?",
      answer: "Absolutely. We use bank-grade encryption (AES-256) for all data transmission and storage. Your documents are processed in secure, isolated environments and automatically deleted after verification. We're SOC 2 Type II certified and GDPR compliant. Additionally, all our data centers are ISO 27001 certified, ensuring the highest security standards.",
      popular: true
    },
    {
      id: "security-2",
      category: "security",
      question: "Do you store user documents permanently?",
      answer: "No, we don't store documents permanently. Documents are automatically deleted from our systems within 30 days after verification, or immediately upon your request. We only retain verification results and extracted metadata (with your consent) to improve our AI models and provide audit trails."
    },
    {
      id: "security-3",
      category: "security",
      question: "What compliance standards do you meet?",
      answer: "We meet multiple international compliance standards including GDPR, CCPA, SOC 2 Type II, and ISO 27001. We're also working towards PCI DSS compliance for financial services clients. Our security practices are regularly audited by third-party security firms."
    },

    // Integration Questions
    {
      id: "integration-1",
      category: "integration",
      question: "How do I integrate with my backend system?",
      answer: "Integration is straightforward! After a user completes verification, you'll receive a webhook notification with the verification results. You can also poll our REST API using the verification ID. We provide SDKs for popular backend languages including Node.js, Python, PHP, and Java. Detailed integration guides are available in our developer documentation.",
      popular: true
    },
    {
      id: "integration-2",
      category: "integration",
      question: "Can I use this with Angular or Vue.js?",
      answer: "Yes! While we provide React components out of the box, our SDK works with any JavaScript framework. For Angular and Vue.js, you can use our vanilla JavaScript API or wrap our components in framework-specific wrappers. We also provide framework-specific examples and integration guides.",
      popular: true
    },
    {
      id: "integration-3",
      category: "integration",
      question: "What's the difference between sandbox and production environments?",
      answer: "Sandbox is for testing and development - it uses mock data and doesn't perform real verification. Production environment processes real documents and provides actual verification results. Both environments have the same API interface, so switching is just a configuration change."
    },
    {
      id: "integration-4",
      category: "integration",
      question: "Do you support webhooks for real-time notifications?",
      answer: "Yes! You can configure webhook endpoints to receive real-time notifications when verification is completed. We support multiple webhook events including verification_completed, verification_failed, and document_uploaded. Webhooks include signature verification for security."
    },

    // General Questions
    {
      id: "general-1",
      category: "general",
      question: "What types of documents are supported?",
      answer: "We support over 3,000 document types from 195+ countries, including passports, driver's licenses, national ID cards, residence permits, and voter IDs. Our AI continuously learns new document formats. If you need support for a specific document type, contact our team."
    },
    {
      id: "general-2",
      category: "general",
      question: "How accurate is the AI verification?",
      answer: "Our AI achieves 99.2% accuracy for document authenticity detection and 98.7% for data extraction. We use ensemble learning with multiple AI models and continuously improve based on millions of verifications. False positive rates are under 0.3%."
    },
    {
      id: "general-3",
      category: "general",
      question: "What happens if verification fails?",
      answer: "If verification fails, we provide detailed feedback about the issues detected (e.g., image quality, document tampering, expired document). Users can retry with a clearer image or different document. You can customize the retry flow and messaging."
    },

    // Technical Questions
    {
      id: "technical-1",
      category: "technical",
      question: "What are the browser requirements?",
      answer: "We support all modern browsers: Chrome 70+, Firefox 65+, Safari 12+, and Edge 79+. The SDK requires JavaScript enabled and uses modern APIs like FileReader and Fetch. For optimal camera functionality, HTTPS is required."
    },
    {
      id: "technical-2",
      category: "technical",
      question: "Can I customize the verification workflow?",
      answer: "Yes! You can customize the entire workflow including which verification steps to include (document only, document + selfie, liveness check), UI appearance, text labels, and validation rules. Enterprise plans include white-label options."
    },
    {
      id: "technical-3",
      category: "technical",
      question: "What's the maximum file size limit?",
      answer: "The default limit is 10MB per file, which is sufficient for high-quality document photos. Enterprise clients can request higher limits up to 50MB. We automatically optimize images for processing while maintaining quality."
    },

    // Pricing Questions
    {
      id: "pricing-1",
      category: "pricing",
      question: "How does pricing work?",
      answer: "We charge per successful verification, with no setup fees or monthly minimums. Pricing starts at $0.50 per verification with volume discounts available. Failed verifications (due to poor image quality, etc.) are not charged. Enterprise plans include custom pricing and SLA guarantees."
    },
    {
      id: "pricing-2",
      category: "pricing",
      question: "Is there a free trial available?",
      answer: "Yes! We offer 100 free verifications to get you started. No credit card required for the trial. This allows you to fully test the integration and evaluate the service before committing to a paid plan."
    }
  ]

  const categories = [
    { id: "security", label: "Security & Privacy", icon: Shield, color: "text-red-600" },
    { id: "integration", label: "Integration", icon: Code, color: "text-blue-600" },
    { id: "general", label: "General", icon: Globe, color: "text-green-600" },
    { id: "technical", label: "Technical", icon: Clock, color: "text-purple-600" },
    { id: "pricing", label: "Pricing", icon: DollarSign, color: "text-orange-600" }
  ]

  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filteredFAQs = activeCategory 
    ? faqData.filter(faq => faq.category === activeCategory)
    : faqData

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
          <HelpCircle className="h-8 w-8 text-primary" />
          Frequently Asked Questions
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Get answers to common questions about KYC SDK integration and usage
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={() => setActiveCategory(null)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeCategory === null 
              ? "bg-primary text-primary-foreground" 
              : "bg-muted hover:bg-muted/80"
          }`}
        >
          All Questions
        </button>
        {categories.map(category => {
          const CategoryIcon = category.icon
          const count = faqData.filter(faq => faq.category === category.id).length
          
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category.id 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              <CategoryIcon className="h-4 w-4" />
              {category.label}
              <Badge variant="secondary" className="text-xs">
                {count}
              </Badge>
            </button>
          )
        })}
      </div>

      {/* FAQ Items */}
      <div className="space-y-4 max-w-4xl mx-auto">
        {filteredFAQs.map((faq, index) => {
          const isOpen = openItems.includes(faq.id)
          const category = categories.find(cat => cat.id === faq.category)
          const CategoryIcon = category?.icon || HelpCircle
          
          return (
            <Card key={faq.id} className="overflow-hidden transition-all duration-200 hover:shadow-md">
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`p-2 rounded-lg bg-muted ${category?.color}`}>
                      <CategoryIcon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-left flex items-center gap-2">
                        {faq.question}
                        {faq.popular && (
                          <Badge variant="outline" className="text-xs">
                            Popular
                          </Badge>
                        )}
                      </h3>
                    </div>
                    <div className="transition-transform duration-200">
                      {isOpen ? (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </div>
              </button>
              
              {isOpen && (
                <CardContent className="px-6 pb-6 pt-0">
                  <div className="pl-11">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </CardContent>
              )}
            </Card>
          )
        })}
      </div>

      {/* Contact CTA */}
      <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20 max-w-2xl mx-auto">
        <CardContent className="p-6 text-center">
          <h3 className="font-semibold mb-3">Still have questions?</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Our technical team is here to help you with integration and setup
          </p>
          <div className="flex gap-3 justify-center">
            <a href="mailto:support@kyc-ai.com" className="inline-flex">
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                📧 support@kyc-ai.com
              </Badge>
            </a>
            <a href="https://docs.kyc-ai.com" className="inline-flex">
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                📚 Full Documentation
              </Badge>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}