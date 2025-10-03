"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const features = [
  { title: "Forgery Detection", desc: "Detect manipulations in holograms, fonts, MRZ, and photos." },
  { title: "Confidence Score", desc: "Transparent scoring calibrated to your risk tolerance." },
  { title: "AI Explainability", desc: "Natural language explanations for failures and edge cases." },
  { title: "Fraud Heatmap", desc: "Spot geographic clusters and anomaly regions instantly." },
]

export default function UspCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {features.map((f, i) => (
        <motion.div
          key={f.title}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
        >
          <Card className={cn("glass-card h-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5")}>
            <CardHeader>
              <CardTitle className="text-base">{f.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{f.desc}</CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
