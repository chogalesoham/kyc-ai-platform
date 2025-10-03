import HeroBanner from "@/components/landing/hero-banner"
import HowItWorks from "@/components/landing/how-it-works"
import Services from "@/components/landing/services"
import PricingCTA from "@/components/landing/pricing-cta"
import Pricing from "@/components/landing/pricing"
import Footer from "@/components/landing/footer"

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <HeroBanner />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Services Section */}
      <Services />

      {/* Pricing CTA Section */}
      <PricingCTA />

      {/* Pricing Section */}
      {/* <Pricing /> */}

      {/* Footer */}
      <Footer />
    </div>
  )
}
