'use client'

import { motion } from 'framer-motion'
import { 
  PlayCircle, 
  Code2, 
  MessageSquare, 
  UserCheck, 
  ArrowRight, 
  Zap,
  Globe,
  Smartphone,
  Settings
} from 'lucide-react'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Button } from '@/components/ui/button'

const services = [
  {
    id: 1,
    icon: PlayCircle,
    title: 'KYC Demo',
    subtitle: 'Interactive Experience',
    description: 'Experience our AI-powered KYC platform firsthand with our interactive demo. Upload sample documents and see real-time verification in action.',
    features: [
      'Live document scanning',
      'Real-time AI analysis',
      'Instant verification results',
      'Sample document library'
    ],
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-500/5',
    borderColor: 'border-blue-500/20',
    ctaText: 'Try Demo',
    badge: 'Free Trial'
  },
  {
    id: 2,
    icon: Code2,
    title: 'Integration Library',
    subtitle: 'For Apps & Websites',
    description: 'Seamlessly integrate our KYC solution into your existing applications with our comprehensive SDK and API documentation.',
    features: [
      'RESTful APIs',
      'SDK for major platforms',
      'Webhook notifications',
      'Comprehensive documentation'
    ],
    color: 'from-blue-600 to-blue-700',
    bgColor: 'bg-blue-600/5',
    borderColor: 'border-blue-600/20',
    ctaText: 'View Docs',
    badge: 'Developer Ready'
  },
  {
    id: 3,
    icon: MessageSquare,
    title: 'WhatsApp Bot',
    subtitle: 'Instant KYC Verification',
    description: 'Enable KYC verification directly through WhatsApp. Your customers can complete verification without leaving their favorite messaging app.',
    features: [
      'WhatsApp Business API',
      'Instant photo capture',
      'Automated verification',
      'Multi-language support'
    ],
    color: 'from-blue-400 to-blue-500',
    bgColor: 'bg-blue-400/5',
    borderColor: 'border-blue-400/20',
    ctaText: 'Start Bot',
    badge: 'Popular'
  },
  {
    id: 4,
    icon: UserCheck,
    title: 'Self KYC Creation',
    subtitle: 'Custom Workflows',
    description: 'Create customized KYC workflows tailored to your business needs. Build, test, and deploy verification processes that match your compliance requirements.',
    features: [
      'Drag-and-drop builder',
      'Custom validation rules',
      'Compliance templates',
      'Workflow automation'
    ],
    color: 'from-blue-700 to-blue-800',
    bgColor: 'bg-blue-700/5',
    borderColor: 'border-blue-700/20',
    ctaText: 'Create Flow',
    badge: 'Enterprise'
  }
]

function ServiceCard({ service, index }: { service: typeof services[0], index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const Icon = service.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
    >
      <div className={`relative p-8 rounded-2xl border ${service.borderColor} ${service.bgColor} backdrop-blur-sm transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-primary/20 h-full flex flex-col`}>
        {/* Badge */}
        <div className="absolute -top-3 -right-3">
          <span className={`inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r ${service.color} text-white text-xs font-semibold shadow-lg`}>
            {service.badge}
          </span>
        </div>

        {/* Icon */}
        <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${service.color} mb-6 w-fit group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-8 h-8 text-white" />
        </div>

        {/* Header */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
            {service.title}
          </h3>
          <p className="text-primary font-medium text-sm">
            {service.subtitle}
          </p>
        </div>

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">
          {service.description}
        </p>

        {/* Features */}
        <div className="space-y-3 mb-8">
          {service.features.map((feature, featureIndex) => (
            <motion.div
              key={featureIndex}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: (index * 0.1) + (featureIndex * 0.1) + 0.3 }}
              className="flex items-center space-x-3"
            >
              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color} flex-shrink-0`} />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <Button
          className={`w-full group-hover:bg-gradient-to-r group-hover:${service.color} transition-all duration-300 font-semibold`}
          variant="outline"
        >
          <span className="flex items-center justify-center space-x-2">
            <span>{service.ctaText}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Button>
      </div>
    </motion.div>
  )
}

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-muted/20 to-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-pattern" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-l from-primary/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-transparent rounded-full blur-3xl" />

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
            🚀 Our Services
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Comprehensive{' '}
            <span className="bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
              KYC Solutions
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From interactive demos to custom integrations, we provide everything you need 
            to implement world-class KYC verification in your business processes.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Additional Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-r from-primary/5 via-purple-500/5 to-primary/5 rounded-2xl p-12 border border-primary/10 backdrop-blur-sm"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Why Choose Our Platform?
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built for enterprise scale with industry-leading security and compliance standards.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Zap,
                title: 'Lightning Fast',
                description: 'Process documents in under 3 seconds'
              },
              {
                icon: Globe,
                title: 'Global Compliance',
                description: 'Supports 190+ countries and regions'
              },
              {
                icon: Smartphone,
                title: 'Mobile First',
                description: 'Optimized for mobile devices'
              },
              {
                icon: Settings,
                title: 'Customizable',
                description: 'Tailored to your business needs'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.6 + (index * 0.1) }}
                className="text-center group"
              >
                <div className="inline-flex p-4 rounded-xl bg-gradient-to-r from-primary/10 to-purple-500/10 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}