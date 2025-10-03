'use client'

import { motion } from 'framer-motion'
import { Check, Star, Zap, Crown, Building2, ArrowRight } from 'lucide-react'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'

const pricingPlans = [
  {
    id: 'starter',
    name: 'Starter',
    subtitle: 'Perfect for small businesses',
    icon: Zap,
    monthlyPrice: 49,
    annualPrice: 39,
    description: 'Get started with essential KYC features for small teams and businesses.',
    features: [
      'Up to 500 verifications/month',
      'Basic document verification',
      'Email support',
      'Standard API access',
      'Basic dashboard analytics',
      '99.5% uptime SLA'
    ],
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/5',
    borderColor: 'border-blue-500/20',
    ctaText: 'Start Free Trial',
    popular: false
  },
  {
    id: 'professional',
    name: 'Professional',
    subtitle: 'Most popular choice',
    icon: Star,
    monthlyPrice: 149,
    annualPrice: 119,
    description: 'Advanced features for growing businesses with higher verification volumes.',
    features: [
      'Up to 5,000 verifications/month',
      'Advanced AI verification',
      'Priority email & chat support',
      'Full API access + webhooks',
      'Advanced analytics & reporting',
      'Custom validation rules',
      'WhatsApp Bot integration',
      '99.9% uptime SLA'
    ],
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/5',
    borderColor: 'border-purple-500/20',
    ctaText: 'Get Started',
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    subtitle: 'For large organizations',
    icon: Crown,
    monthlyPrice: 499,
    annualPrice: 399,
    description: 'Enterprise-grade solution with unlimited verifications and premium support.',
    features: [
      'Unlimited verifications',
      'Premium AI with custom models',
      '24/7 dedicated support',
      'Custom integrations',
      'White-label solution',
      'Advanced compliance tools',
      'Custom workflows',
      'SSO & RBAC',
      '99.99% uptime SLA',
      'Dedicated account manager'
    ],
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-500/5',
    borderColor: 'border-orange-500/20',
    ctaText: 'Contact Sales',
    popular: false
  }
]

function PricingCard({ plan, index, isAnnual }: { plan: typeof pricingPlans[0], index: number, isAnnual: boolean }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const Icon = plan.icon
  const price = isAnnual ? plan.annualPrice : plan.monthlyPrice
  const savings = plan.monthlyPrice - plan.annualPrice

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative group ${plan.popular ? 'scale-105 z-10' : ''}`}
    >
      {/* Popular Badge */}
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
            Most Popular
          </span>
        </div>
      )}

      <div className={`relative p-8 rounded-2xl border ${plan.borderColor} ${plan.bgColor} backdrop-blur-sm transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl ${plan.popular ? 'shadow-xl border-purple-500/40' : ''} h-full flex flex-col`}>
        {/* Header */}
        <div className="text-center mb-8">
          <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${plan.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
          
          <h3 className="text-2xl font-bold text-foreground mb-2">
            {plan.name}
          </h3>
          
          <p className="text-muted-foreground text-sm mb-6">
            {plan.subtitle}
          </p>

          {/* Pricing */}
          <div className="mb-4">
            <div className="flex items-baseline justify-center">
              <span className="text-4xl md:text-5xl font-bold text-foreground">
                ${price}
              </span>
              <span className="text-muted-foreground ml-2">
                /month
              </span>
            </div>
            
            {isAnnual && savings > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-2"
              >
                <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 text-xs font-medium">
                  Save ${savings * 12}/year
                </span>
              </motion.div>
            )}
          </div>

          <p className="text-muted-foreground text-sm leading-relaxed">
            {plan.description}
          </p>
        </div>

        {/* Features */}
        <div className="space-y-4 mb-8 flex-grow">
          {plan.features.map((feature, featureIndex) => (
            <motion.div
              key={featureIndex}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: (index * 0.1) + (featureIndex * 0.05) + 0.3 }}
              className="flex items-start space-x-3"
            >
              <div className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center mt-0.5`}>
                <Check className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm text-muted-foreground leading-relaxed">{feature}</span>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <Button
          className={`w-full ${plan.popular 
            ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white' 
            : ''
          } font-semibold py-6 text-lg transition-all duration-300`}
          variant={plan.popular ? 'default' : 'outline'}
        >
          <span className="flex items-center justify-center space-x-2">
            <span>{plan.ctaText}</span>
            <ArrowRight className="w-5 h-5" />
          </span>
        </Button>
      </div>
    </motion.div>
  )
}

export default function Pricing() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isAnnual, setIsAnnual] = useState(false)

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-background to-muted/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-pattern" />
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-gradient-to-l from-purple-500/10 to-primary/10 rounded-full blur-3xl" />

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
            💰 Transparent Pricing
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Choose Your{' '}
            <span className="bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
              Perfect Plan
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            Start with our free trial and scale as you grow. No hidden fees, no setup costs. 
            Cancel anytime with our 30-day money-back guarantee.
          </p>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-center space-x-4 mb-12"
          >
            <span className={`text-sm font-medium transition-colors ${!isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-primary data-[state=checked]:to-purple-500"
            />
            <span className={`text-sm font-medium transition-colors ${isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
              Annual
            </span>
            {isAnnual && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center px-2 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 text-xs font-medium"
              >
                Save 20%
              </motion.span>
            )}
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={plan.id} plan={plan} index={index} isAnnual={isAnnual} />
          ))}
        </div>

        {/* Enterprise CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10 rounded-2xl p-12 border border-primary/20 backdrop-blur-sm text-center"
        >
          <div className="inline-flex p-4 rounded-xl bg-gradient-to-r from-primary to-purple-600 mb-6">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          
          <h3 className="text-3xl font-bold text-foreground mb-4">
            Need a Custom Solution?
          </h3>
          
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Looking for volume discounts, custom integrations, or on-premise deployment? 
            Our enterprise team is here to help you build the perfect KYC solution.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white px-8 py-4 font-semibold"
            >
              <span className="flex items-center space-x-2">
                <span>Contact Enterprise Sales</span>
                <ArrowRight className="w-5 h-5" />
              </span>
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-4 font-semibold"
            >
              Schedule a Demo
            </Button>
          </div>
        </motion.div>

        {/* FAQ Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <p className="text-muted-foreground mb-4">
            Have questions about our pricing?
          </p>
          <Button variant="ghost" className="text-primary hover:text-primary/80">
            View FAQ →
          </Button>
        </motion.div>
      </div>
    </section>
  )
}