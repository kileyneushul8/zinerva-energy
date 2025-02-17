import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { ArrowRight, Battery, Droplet, Zap, Settings, RefreshCwIcon as Refresh, AlertTriangle } from "lucide-react"

export default function ExperienceGuidePage() {
  return (
    <main className="min-h-screen bg-black text-white py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair mb-6">Nebben Experience Guide</h1>
        <p className="text-xl text-white/70 mb-12 max-w-3xl">
          Welcome to the world of Nebben. This guide will help you get the most out of your electronic hookah
          experience, from setup to maintenance.
        </p>

        <Tabs defaultValue="setup" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="setup">Setup</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            <TabsTrigger value="troubleshooting">Troubleshooting</TabsTrigger>
          </TabsList>

          <TabsContent value="setup" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Initial Setup</CardTitle>
                <CardDescription>Get your Nebben device ready for first use</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-4">
                  <Battery className="w-6 h-6 mt-1 text-primary" />
                  <div>
                    <h3 className="font-semibold mb-2">Charge Your Device</h3>
                    <p>
                      Before first use, charge your Nebben device for at least 2 hours using the provided USB-C cable.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Droplet className="w-6 h-6 mt-1 text-primary" />
                  <div>
                    <h3 className="font-semibold mb-2">Insert a Flavor Pod</h3>
                    <p>Choose your desired flavor pod and insert it into the pod chamber until you hear a click.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Zap className="w-6 h-6 mt-1 text-primary" />
                  <div>
                    <h3 className="font-semibold mb-2">Power On</h3>
                    <p>Press the power button five times in quick succession to turn on your Nebben device.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="usage" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Using Your Nebben</CardTitle>
                <CardDescription>Get the most out of your electronic hookah experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-4">
                  <Settings className="w-6 h-6 mt-1 text-primary" />
                  <div>
                    <h3 className="font-semibold mb-2">Adjust Settings</h3>
                    <p>Use the touch controls to adjust temperature and airflow to your preference.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Droplet className="w-6 h-6 mt-1 text-primary" />
                  <div>
                    <h3 className="font-semibold mb-2">Inhale Slowly</h3>
                    <p>Take slow, steady draws for the best flavor and vapor production.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Refresh className="w-6 h-6 mt-1 text-primary" />
                  <div>
                    <h3 className="font-semibold mb-2">Change Flavors</h3>
                    <p>To switch flavors, simply remove the current pod and insert a new one.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="maintenance" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Maintaining Your Nebben</CardTitle>
                <CardDescription>Keep your device in top condition</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-4">
                  <Droplet className="w-6 h-6 mt-1 text-primary" />
                  <div>
                    <h3 className="font-semibold mb-2">Clean Regularly</h3>
                    <p>Use the provided cleaning kit to clean your device weekly for optimal performance.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Battery className="w-6 h-6 mt-1 text-primary" />
                  <div>
                    <h3 className="font-semibold mb-2">Battery Care</h3>
                    <p>Avoid overcharging and try to keep the battery level between 20% and 80% for longevity.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Settings className="w-6 h-6 mt-1 text-primary" />
                  <div>
                    <h3 className="font-semibold mb-2">Firmware Updates</h3>
                    <p>Regularly check for and install firmware updates to ensure the best performance and features.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="troubleshooting" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Troubleshooting</CardTitle>
                <CardDescription>Common issues and their solutions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-4">
                  <AlertTriangle className="w-6 h-6 mt-1 text-primary" />
                  <div>
                    <h3 className="font-semibold mb-2">Device Not Turning On</h3>
                    <p>
                      Ensure the device is charged. If the issue persists, try resetting by holding the power button for
                      10 seconds.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <AlertTriangle className="w-6 h-6 mt-1 text-primary" />
                  <div>
                    <h3 className="font-semibold mb-2">Weak Vapor Production</h3>
                    <p>Check if the pod is properly inserted and has enough e-liquid. Clean the device if necessary.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <AlertTriangle className="w-6 h-6 mt-1 text-primary" />
                  <div>
                    <h3 className="font-semibold mb-2">Unusual Taste</h3>
                    <p>Replace the pod if it's old or empty. If the issue persists, clean the device thoroughly.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-12 text-center">
          <h2 className="text-2xl md:text-3xl font-playfair mb-4">Ready to Elevate Your Hookah Experience?</h2>
          <p className="text-lg text-white/70 mb-8">
            Explore our range of premium electronic hookah devices and flavor pods.
          </p>
          <Button asChild size="lg">
            <Link href="/products" className="flex items-center gap-2">
              Shop Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}

