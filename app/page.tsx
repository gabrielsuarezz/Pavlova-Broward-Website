import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Clock, MapPin, Phone } from "lucide-react"

export default function HomePage() {
  const featuredPavlovas = [
    {
      id: 1,
      name: "Classic Pavlova",
      description: "Traditional meringue with fresh berries and cream",
      price: 45,
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: 2,
      name: "Tropical Paradise",
      description: "Mango, kiwi, and passion fruit on coconut cream",
      price: 52,
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: 3,
      name: "Chocolate Indulgence",
      description: "Rich chocolate meringue with dark chocolate shavings",
      price: 48,
      image: "/placeholder.svg?height=400&width=400",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src="/images/pavlova-broward-logo.png"
                alt="Pavlova Broward"
                className="h-10 w-10 rounded-full object-cover"
              />
              <span className="text-xl font-medium text-[rgba(59,41,28,1)]">Pavlova Broward</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="font-medium text-[rgba(59,41,28,1)]">
                Home
              </Link>
              <Link href="/menu" className="hover:text-gray-900 transition-colors text-[rgba(59,41,28,1)]">
                Menu
              </Link>
              <Link href="/contact" className="hover:text-gray-900 transition-colors text-[rgba(59,41,28,1)]">
                Contact
              </Link>
              <Button asChild className="bg-[#3b291c] hover:bg-[#645c58] text-white">
                <Link href="/order">Order Now</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6 text-[rgba(240,224,204,1)] bg-[rgba(255,255,255,1)]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <img
              src="/images/pavlova-broward-logo.png"
              alt="Pavlova Broward"
              className="h-24 w-24 mx-auto rounded-full object-cover shadow-sm"
            />
          </div>
          <h1 className="text-5xl md:text-6xl font-light mb-6 leading-tight text-[rgba(59,41,28,1)]">
            Heavenly Pavlovas
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed text-[rgba(100,92,88,1)]">
            Handcrafted meringue desserts made with the finest ingredients, delivered fresh throughout Broward County.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-[#3b291c] hover:bg-[#645c58] text-white">
              <Link href="/order" className="flex items-center">
                Order Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-[#3b291c] border-[#3b291c] hover:bg-[#3b291c] hover:text-white"
            >
              <Link href="/menu">View Menu</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Notice */}
      <section className="py-4 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-lg p-6 flex items-center justify-center bg-[rgba(231,223,216,1)]">
            <Clock className="h-5 w-5 mr-3 flex-shrink-0 text-[rgba(59,41,28,1)]" />
            <p className="text-center text-[rgba(59,41,28,1)]">
              All orders require 24 hours advance notice to ensure freshness and availability.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-gray-900 mb-4">Featured Pavlovas</h2>
            <p className="max-w-2xl mx-auto text-[rgba(100,92,88,1)]">
              Each pavlova is carefully crafted to order using traditional techniques and premium ingredients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPavlovas.map((pavlova) => (
              <Card key={pavlova.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src={pavlova.image || "/placeholder.svg"}
                    alt={pavlova.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-medium mb-2 text-[rgba(59,41,28,1)]">{pavlova.name}</h3>
                  <p className="mb-4 leading-relaxed text-[rgba(100,92,88,1)]">{pavlova.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-light text-[rgba(59,41,28,1)]">${pavlova.price}</span>
                    <Button className="bg-[#3b291c] hover:bg-[#645c58] text-white" asChild size="sm">
                      <Link href="/order">Order</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Info */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light mb-4 text-[rgba(59,41,28,1)]">Delivery & Pickup</h2>
            <p className="text-[rgba(100,92,88,1)]">Convenient options to enjoy our pavlovas</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center p-8">
              <MapPin className="h-8 w-8 mx-auto mb-4 text-[rgba(59,41,28,1)]" />
              <h3 className="text-xl font-medium mb-2 text-[rgba(59,41,28,1)]">Local Delivery</h3>
              <p className="leading-relaxed text-[rgba(100,92,88,1)]">
                Free delivery throughout Broward County. Same-day delivery available for orders placed before 2 PM.
              </p>
            </div>
            <div className="text-center p-8">
              <Clock className="h-8 w-8 mx-auto mb-4 text-[rgba(59,41,28,1)]" />
              <h3 className="text-xl font-medium mb-2 text-[rgba(59,41,28,1)]">Store Pickup</h3>
              <p className="leading-relaxed text-[rgba(100,92,88,1)]">
                Pick up your order from our location. Available Tuesday through Sunday during business hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src="/images/pavlova-broward-logo.png"
                  alt="Pavlova Broward"
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className="text-lg font-medium text-[rgba(59,41,28,1)]">Pavlova Broward</span>
              </div>
              <p className="leading-relaxed text-[rgba(100,92,88,1)]">
                Creating exceptional pavlovas with love and the finest ingredients since 2020.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-4 text-[rgba(59,41,28,1)]">Contact</h4>
              <div className="space-y-2 text-gray-600">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-[rgba(100,92,88,1)]" />
                  <span className="text-[rgba(100,92,88,1)]">(954) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 bg-[rgba(255,255,255,1)] text-[rgba(100,92,88,1)]" />
                  <span className="text-[rgba(100,92,88,1)]">123 Sweet Street, Fort Lauderdale, FL</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-4 text-[rgba(59,41,28,1)]">Hours</h4>
              <div className="space-y-1 text-gray-600">
                <p className="text-[rgba(100,92,88,1)]">Tuesday - Friday: 9 AM - 6 PM</p>
                <p className="text-[rgba(100,92,88,1)]">Saturday - Sunday: 10 AM - 5 PM</p>
                <p className="text-[rgba(100,92,88,1)]">Monday: Closed</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 mt-12 pt-8 text-center">
            <p className="text-[rgba(100,92,88,1)]">© 2024 Pavlova Broward. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
