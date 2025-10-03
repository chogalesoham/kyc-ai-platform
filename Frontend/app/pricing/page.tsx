'use client'

import { motion } from 'framer-motion'
import { Check, Star, Zap, Crown, Building2, ArrowRight, Shield, Globe } from 'lucide-react'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import Link from 'next/link'

const pricingPlans = [
  {
    id: 'basic',
    name: 'Basic',
    subtitle: 'Perfect for startups',
    icon: Zap,
    monthlyPrice: 29,
    annualPrice: 23,
    description: 'Essential KYC features for small teams getting started with document verification.',
    features: [
      'Up to 200 verifications/month',
      'Basic document verification',
      'Email support',
      'Standard API access',
      'Basic dashboard',
      '99% uptime SLA',
      'Standard security'
    ],
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/5',
    borderColor: 'border-blue-500/20',
    ctaText: 'Start Free Trial',
    popular: false,
    badge: 'Most Affordable'
  },
  {
    id: 'standard',
    name: 'Standard',
    subtitle: 'Recommended for growing teams',
    icon: Star,
    monthlyPrice: 99,
    annualPrice: 79,
    description: 'Advanced features for growing businesses with moderate verification volumes.',
    features: [
      'Up to 2,000 verifications/month',
      'Advanced AI verification',
      'Priority email & chat support',
      'Full API access + webhooks',
      'Advanced analytics',
      'Custom validation rules',
      'Multi-language support',
      '99.5% uptime SLA',
      'Enhanced security'
    ],
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/5',
    borderColor: 'border-purple-500/20',
    ctaText: 'Get Started',
    popular: true,
    badge: 'Most Popular'
  },
  {
    id: 'premium',
    name: 'Premium',
    subtitle: 'For established businesses',
    icon: Crown,
    monthlyPrice: 249,
    annualPrice: 199,
    description: 'Premium solution with high-volume processing and advanced compliance features.',
    features: [
      'Up to 10,000 verifications/month',
      'Premium AI with custom models',
      '24/7 priority support',
      'Advanced integrations',
      'White-label options',
      'Compliance reporting',
      'Custom workflows',
      'Team management',
      '99.9% uptime SLA',
      'Advanced security + SOC2',
      'Dedicated success manager'
    ],
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-500/5',
    borderColor: 'border-orange-500/20',
    ctaText: 'Upgrade Now',
    popular: false,
    badge: 'Best Value'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    subtitle: 'For large organizations',
    icon: Building2,
    monthlyPrice: 'Custom',
    annualPrice: 'Custom',
    description: 'Enterprise-grade solution with unlimited processing and premium support.',
    features: [
      'Unlimited verifications',
      'Custom AI models',
      'Dedicated support team',
      'Custom integrations',
      'Full white-label solution',
      'Advanced compliance suite',
      'Custom workflows & rules',
      'SSO & RBAC',
      '99.99% uptime SLA',
      'On-premise deployment',
      'Dedicated infrastructure',
      'Custom training & onboarding'
    ],
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-500/5',
    borderColor: 'border-emerald-500/20',
    ctaText: 'Contact Sales',
    popular: false,
    badge: 'Enterprise'
  }
]

function PricingCard({ plan, index, isAnnual }: { plan: typeof pricingPlans[0], index: number, isAnnual: boolean }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const Icon = plan.icon
  const price = typeof plan.monthlyPrice === 'number' 
    ? (isAnnual ? plan.annualPrice : plan.monthlyPrice)
    : plan.monthlyPrice
  const savings = typeof plan.monthlyPrice === 'number' && typeof plan.annualPrice === 'number' 
    ? plan.monthlyPrice - plan.annualPrice 
    : 0

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
            {plan.badge}
          </span>
        </div>
      )}

      {/* Badge for non-popular plans */}
      {!plan.popular && (
        <div className="absolute -top-3 -right-3 z-20">
          <span className={`inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r ${plan.color} text-white text-xs font-semibold shadow-lg`}>
            {plan.badge}
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
                {typeof price === 'number' ? `$${price}` : price}
              </span>
              {typeof price === 'number' && (
                <span className="text-muted-foreground ml-2">
                  /month
                </span>
              )}
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

export default function PricingPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isAnnual, setIsAnnual] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-pattern" />
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-gradient-to-l from-purple-500/10 to-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 py-24 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center justify-center space-x-2 text-sm text-muted-foreground mb-8"
          >
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-foreground">Pricing</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
          >
            💎 Flexible Pricing
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Choose Your{' '}
            <span className="bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
              Perfect Plan
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            Flexible pricing designed to grow with your business. Start with our free trial and scale seamlessly as your verification needs increase. No hidden fees, no setup costs.
          </p>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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
                Save up to 20%
              </motion.span>
            )}
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={plan.id} plan={plan} index={index} isAnnual={isAnnual} />
          ))}
        </div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {[
            {
              icon: Shield,
              title: 'Security First',
              description: 'Bank-grade encryption and SOC 2 compliance across all plans'
            },
            {
              icon: Globe,
              title: 'Global Coverage',
              description: 'Support for 190+ countries and regions with local compliance'
            },
            {
              icon: Zap,
              title: 'Lightning Fast',
              description: 'Process documents in under 3 seconds with 99.9% accuracy'
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.8 + (index * 0.1) }}
              className="text-center p-6 rounded-xl bg-muted/30 backdrop-blur-sm border border-border/20"
            >
              <div className="inline-flex p-4 rounded-xl bg-gradient-to-r from-primary/10 to-purple-500/10 mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center bg-gradient-to-r from-primary/5 via-purple-500/5 to-primary/5 rounded-2xl p-12 border border-primary/10 backdrop-blur-sm"
        >
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Questions about pricing?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our team is here to help you choose the right plan for your business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white px-8 py-4 font-semibold"
            >
              <span className="flex items-center space-x-2">
                <span>Contact Sales</span>
                <ArrowRight className="w-5 h-5" />
              </span>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-4 font-semibold"
            >
              View FAQ
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}