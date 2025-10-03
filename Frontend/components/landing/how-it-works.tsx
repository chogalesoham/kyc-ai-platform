'use client'

import { motion } from 'framer-motion'
import { Upload, Search, Shield, CheckCircle, ArrowRight } from 'lucide-react'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const steps = [
  {
    id: 1,
    icon: Upload,
    title: 'Upload Documents',
    description: 'Simply upload your identity documents through our secure platform. We support all major document types including passports, driver\'s licenses, and ID cards.',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20'
  },
  {
    id: 2,
    icon: Search,
    title: 'AI Analysis',
    description: 'Our advanced AI powered by GenAI instantly analyzes your documents for authenticity, extracting key information with 99.9% accuracy.',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20'
  },
  {
    id: 3,
    icon: Shield,
    title: 'Security Verification',
    description: 'Multi-layer security checks ensure document authenticity while maintaining bank-grade encryption for your sensitive data.',
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/20'
  },
  {
    id: 4,
    icon: CheckCircle,
    title: 'Instant Results',
    description: 'Get real-time verification results with detailed compliance reports. Integration-ready APIs for seamless workflow automation.',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20'
  }
]

function StepCard({ step, index }: { step: typeof steps[0], index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const Icon = step.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative group"
    >
      {/* Connector Line */}
      {index < steps.length - 1 && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: (index * 0.2) + 0.3 }}
          className="hidden lg:block absolute top-20 left-full w-full h-0.5 bg-gradient-to-r from-primary/30 to-transparent origin-left z-0"
        />
      )}

      <div className={`relative p-8 rounded-2xl border ${step.borderColor} ${step.bgColor} backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-primary/20`}>
        {/* Step Number */}
        <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-r from-primary to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
          {step.id}
        </div>

        {/* Icon */}
        <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${step.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-8 h-8 text-white" />
        </div>

        {/* Content */}
        <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
          {step.title}
        </h3>
        
        <p className="text-muted-foreground leading-relaxed mb-6">
          {step.description}
        </p>

        {/* Arrow for mobile */}
        {index < steps.length - 1 && (
          <div className="lg:hidden flex justify-center mt-8">
            <ArrowRight className="w-6 h-6 text-primary animate-bounce" />
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-background to-muted/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-pattern" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
          >
            🔄 Simple Process
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            How It{' '}
            <span className="bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our AI-powered KYC platform makes document verification simple, secure, and lightning-fast. 
            Here&apos;s how we transform your compliance process in just four easy steps.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid lg:grid-cols-4 gap-8 lg:gap-4 relative">
          {steps.map((step, index) => (
            <StepCard key={step.id} step={step} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10 rounded-2xl p-8 border border-primary/20 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to streamline your KYC process?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of businesses that trust our AI-powered platform for their document verification needs.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-purple-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}