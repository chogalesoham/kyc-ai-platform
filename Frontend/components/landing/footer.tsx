'use client'

import { motion } from 'framer-motion'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Twitter, 
  Linkedin, 
  Facebook,
  ArrowUpRight,
  Shield,
  Zap,
  Globe
} from 'lucide-react'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

const footerSections = [
  {
    title: 'Product',
    links: [
      { name: 'KYC Demo', href: '#demo' },
      { name: 'Integration Library', href: '#integration' },
      { name: 'WhatsApp Bot', href: '#whatsapp' },
      { name: 'Self KYC Builder', href: '#builder' },
      { name: 'API Documentation', href: '#docs' },
      { name: 'Pricing', href: '#pricing' }
    ]
  },
  {
    title: 'Solutions',
    links: [
      { name: 'Financial Services', href: '#financial' },
      { name: 'Healthcare', href: '#healthcare' },
      { name: 'E-commerce', href: '#ecommerce' },
      { name: 'Travel & Hospitality', href: '#travel' },
      { name: 'Gaming', href: '#gaming' },
      { name: 'Crypto & Web3', href: '#crypto' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { name: 'Documentation', href: '#docs' },
      { name: 'Blog', href: '#blog' },
      { name: 'Case Studies', href: '#cases' },
      { name: 'Compliance Guide', href: '#compliance' },
      { name: 'Security', href: '#security' },
      { name: 'Status Page', href: '#status' }
    ]
  },
  {
    title: 'Company',
    links: [
      { name: 'About Us', href: '#about' },
      { name: 'Careers', href: '#careers' },
      { name: 'Press Kit', href: '#press' },
      { name: 'Partners', href: '#partners' },
      { name: 'Contact', href: '#contact' },
      { name: 'Support', href: '#support' }
    ]
  }
]

const socialLinks = [
  { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-blue-400' },
  { name: 'LinkedIn', icon: Linkedin, href: '#', color: 'hover:text-blue-600' },
  { name: 'GitHub', icon: Github, href: '#', color: 'hover:text-gray-400' },
  { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-500' }
]

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@kycplatform.ai',
    href: 'mailto:hello@kycplatform.ai'
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567'
  },
  {
    icon: MapPin,
    label: 'Address',
    value: '123 Innovation Drive, Tech Valley, CA 94000',
    href: '#'
  }
]

const certifications = [
  { name: 'SOC 2 Type II', icon: Shield },
  { name: 'ISO 27001', icon: Shield },
  { name: 'GDPR Compliant', icon: Globe }
]

export default function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <footer ref={ref} className="bg-gradient-to-b from-background to-muted/20 border-t border-border/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-pattern" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-primary/5 to-purple-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="py-20">
          <div className="grid lg:grid-cols-6 gap-12">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-purple-600 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-foreground">
                  KYC Platform
                </span>
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed max-w-md">
                The world&apos;s most advanced AI-powered document validation platform. 
                Automate your KYC process with 99.9% accuracy and enterprise-grade security.
              </p>

              {/* Contact Info */}
              <div className="space-y-4">
                {contactInfo.map((contact, index) => (
                  <motion.a
                    key={index}
                    href={contact.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors duration-300 group"
                  >
                    <contact.icon className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-sm">{contact.value}</span>
                  </motion.a>
                ))}
              </div>

              {/* Certifications */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-foreground">Certifications</h4>
                <div className="flex flex-wrap gap-3">
                  {certifications.map((cert, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ delay: index * 0.1 + 0.4 }}
                      className="flex items-center space-x-2 px-3 py-2 bg-muted/30 rounded-lg border border-border/20"
                    >
                      <cert.icon className="w-4 h-4 text-green-500" />
                      <span className="text-xs font-medium text-muted-foreground">
                        {cert.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Footer Links */}
            {footerSections.map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: sectionIndex * 0.1 + 0.2 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-semibold text-foreground">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{ delay: (sectionIndex * 0.1) + (linkIndex * 0.05) + 0.4 }}
                    >
                      <Link
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm group flex items-center space-x-1"
                      >
                        <span>{link.name}</span>
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="py-12 border-t border-border/20"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Stay Updated
              </h3>
              <p className="text-muted-foreground">
                Get the latest updates on KYC regulations, product features, and industry insights.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-muted/30 border border-border/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-colors duration-300"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-primary to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="py-8 border-t border-border/20"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-sm text-muted-foreground">
              © 2025 KYC Platform. All rights reserved. |{' '}
              <Link href="#privacy" className="hover:text-primary transition-colors duration-300">
                Privacy Policy
              </Link>
              {' '} | {' '}
              <Link href="#terms" className="hover:text-primary transition-colors duration-300">
                Terms of Service
              </Link>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ delay: index * 0.1 + 0.9 }}
                  className={`p-2 bg-muted/30 rounded-lg border border-border/20 text-muted-foreground ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-lg group`}
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}