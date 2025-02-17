import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Gift, DollarSign, TrendingUp, Users, BarChart3, Award } from "lucide-react"

export default function PartnersPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-playfair mb-6">
              Become a Nebben
              <br />
              <span className="italic text-white/80">Partner</span>
            </h1>
            <p className="text-lg md:text-xl mb-12 text-white/70 leading-relaxed">
              Join our exclusive network of influencers and partners to promote the next evolution of hookah experience.
            </p>
            <Button asChild size="lg" className="group text-lg">
              <Link href="/partner-application" scroll={true} className="flex items-center gap-2">
                Apply Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-playfair text-center mb-16">Partner Benefits</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="bg-white/10 rounded-xl p-6">
                <div className="text-2xl mb-4">{<benefit.icon className="w-8 h-8" />}</div>
                <h3 className="text-xl font-semibold mb-4">{benefit.title}</h3>
                <p className="text-white/70">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-playfair text-center mb-16">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={step.title} className="text-center">
                <div className="text-3xl font-bold text-white/30 mb-4">{index + 1}</div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-white/70">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Section */}
      <section id="apply" className="py-24 bg-white/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-playfair text-center mb-16">Apply to Become a Partner</h2>
          <div className="max-w-2xl mx-auto">
            <p className="text-center mb-8 text-white/70">
              Ready to join the Nebben family? Fill out our application form and our team will get back to you shortly.
            </p>
            <Button asChild size="lg" className="w-full">
              <Link href="/partner-application" className="flex items-center justify-center gap-2">
                Start Application
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

const benefits = [
  {
    title: "Exclusive Products",
    description: "Get early access to our latest products and limited edition releases.",
    icon: Gift,
  },
  {
    title: "Competitive Commissions",
    description: "Earn industry-leading commissions on every sale you generate.",
    icon: DollarSign,
  },
  {
    title: "Marketing Support",
    description: "Receive professional marketing materials and dedicated support from our team.",
    icon: TrendingUp,
  },
  {
    title: "Networking Opportunities",
    description: "Connect with other influencers and industry leaders at our exclusive events.",
    icon: Users,
  },
  {
    title: "Personalized Dashboard",
    description: "Track your performance and earnings with our easy-to-use partner dashboard.",
    icon: BarChart3,
  },
  {
    title: "Brand Association",
    description: "Align yourself with a premium, innovative brand in the hookah industry.",
    icon: Award,
  },
]

const steps = [
  {
    title: "Apply",
    description: "Fill out our online application form with your details and social media presence.",
  },
  {
    title: "Review",
    description: "Our team will review your application and reach out for any additional information.",
  },
  {
    title: "Onboard",
    description: "If approved, we'll provide you with all the tools and resources to get started.",
  },
]

