'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Star, Zap, Shield, TrendingUp } from 'lucide-react'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const highlights = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Process documents in under 3 seconds',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: Shield,
    title: 'Bank-Grade Security',
    description: 'SOC 2 compliant with end-to-end encryption',
    color: 'from-blue-600 to-blue-700'
  },
  {
    icon: TrendingUp,
    title: 'Scalable Solutions',
    description: 'From startups to enterprise-level processing',
    color: 'from-blue-400 to-blue-500'
  }
]

export default function PricingCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-muted/10 to-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-pattern" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-gradient-to-r from-primary/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-gradient-to-l from-blue-500/5 to-transparent rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
            >
              <Star className="w-4 h-4 mr-2" />
              Transparent Pricing
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Choose Your{' '}
              <span className="bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
                Perfect Plan
              </span>
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Start with our free trial and scale as you grow. No hidden fees, no setup costs. 
              Get enterprise-grade KYC verification that grows with your business.
            </p>
          </motion.div>

          {/* Highlights Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid md:grid-cols-3 gap-8 mb-16"
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.4 + (index * 0.1) }}
                className="group text-center p-6 rounded-2xl bg-muted/20 backdrop-blur-sm border border-border/20 hover:border-primary/20 transition-all duration-300 hover:scale-105"
              >
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${highlight.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <highlight.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {highlight.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {highlight.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center bg-gradient-to-r from-primary/5 via-purple-500/5 to-primary/5 rounded-2xl p-12 border border-primary/10 backdrop-blur-sm"
          >
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Ready to Get Started?
            </h3>
            
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of businesses that trust our AI-powered platform for their KYC verification needs. 
              Choose from flexible plans designed to scale with your growth.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/pricing">
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white px-8 py-4 font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <span className="flex items-center space-x-2">
                    <span>View All Plans</span>
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
              </Link>
              
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span>Free 14-day trial</span>
                </span>
                <span className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  <span>No credit card required</span>
                </span>
              </div>
            </div>

            {/* Pricing Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
            >
              {[
                { plan: 'Basic', price: '$29', features: 'Up to 200 verifications' },
                { plan: 'Standard', price: '$99', features: 'Up to 2,000 verifications', popular: true },
                { plan: 'Premium', price: '$249', features: 'Up to 10,000 verifications' }
              ].map((item, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl border transition-all duration-300 ${
                    item.popular 
                      ? 'bg-primary/5 border-primary/20 scale-105' 
                      : 'bg-muted/10 border-border/20 hover:border-primary/10'
                  }`}
                >
                  {item.popular && (
                    <div className="text-xs text-primary font-semibold mb-2 text-center">
                      Most Popular
                    </div>
                  )}
                  <div className="text-center">
                    <div className="font-semibold text-foreground">{item.plan}</div>
                    <div className="text-2xl font-bold text-primary">{item.price}</div>
                    <div className="text-xs text-muted-foreground">{item.features}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}