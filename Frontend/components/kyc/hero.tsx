"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="grid gap-8 md:grid-cols-2 items-center">
        <div className="space-y-6">
          <motion.h1
            className="text-4xl md:text-5xl font-heading text-pretty"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            AI-Powered Document Validation in Seconds.
          </motion.h1>
          <motion.p
            className="text-muted-foreground text-lg"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            Secure, fast, and fraud-proof KYC verification powered by GenAI.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-3"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Button asChild className="rounded-2xl btn-gradient">
              <Link href="/demo">Book Demo</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-2xl bg-transparent">
              <Link href="/upload">Upload Document</Link>
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="relative aspect-square rounded-3xl glass-card"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Animated illustration placeholder */}
          <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-2 p-6">
            {Array.from({ length: 36 }).map((_, i) => (
              <div
                key={i}
                className="rounded-lg bg-gradient-to-br from-primary/20 to-accent/20"
                style={{ animation: `pulse ${(i % 6) * 0.15 + 1}s ease-in-out infinite alternate` }}
              />
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
            {"Animated illustration placeholder"}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
