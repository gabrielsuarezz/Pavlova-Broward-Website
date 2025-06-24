import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

export default function MenuPage() {
  const pavlovas = [
    {
      id: 1,
      name: "Classic Pavlova",
      description: "Traditional meringue with fresh berries and cream",
      price: 45,
      serves: "8-10 people",
      ingredients: ["Meringue base", "Fresh whipped cream", "Mixed berries", "Mint garnish"],
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: 2,
      name: "Tropical Paradise",
      description: "Mango, kiwi, and passion fruit on coconut cream",
      price: 52,
      serves: "8-10 people",
      ingredients: ["Meringue base", "Coconut cream", "Mango", "Kiwi", "Passion fruit"],
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: 3,
      name: "Chocolate Indulgence",
      description: "Rich chocolate meringue with dark chocolate shavings",
      price: 48,
      serves: "8-10 people",
      ingredients: ["Chocolate meringue", "Chocolate cream", "Fresh berries", "Dark chocolate shavings"],
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: 4,
      name: "Lemon Delight",
      description: "Zesty lemon pavlova with lemon curd and fresh cream",
      price: 46,
      serves: "8-10 people",
      ingredients: ["Meringue base", "Lemon curd", "Fresh cream", "Candied lemon zest"],
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: 5,
      name: "Strawberry Fields",
      description: "Fresh strawberries with strawberry coulis",
      price: 50,
      serves: "8-10 people",
      ingredients: ["Meringue base", "Strawberry cream", "Fresh strawberries", "Strawberry coulis"],
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: 6,
      name: "Mini Pavlova Set",
      description: "Set of 6 individual pavlovas with assorted toppings",
      price: 35,
      serves: "6 people",
      ingredients: ["6 mini meringues", "Assorted creams", "Mixed seasonal fruits"],
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
              <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                Home
              </Link>
              <Link href="/menu" className="text-gray-900 font-medium">
                Menu
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                Contact
              </Link>
              <Button asChild className="bg-[#3b291c] hover:bg-[#645c58] text-white">
                <Link href="/order">Order Now</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-8 -ml-4 text-[rgba(86,59,40,1)] hover:bg-gray-100">
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>

        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-light text-[#3b291c] mb-4">Our Menu</h1>
          <p className="text-xl text-[#645c58] max-w-3xl mx-auto leading-relaxed">
            Each pavlova is handcrafted with love using the finest ingredients. All orders require 24 hours advance
            notice.
          </p>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {pavlovas.map((pavlova) => (
            <Card key={pavlova.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-square overflow-hidden rounded-t-lg">
                <img
                  src={pavlova.image || "/placeholder.svg"}
                  alt={pavlova.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-medium text-gray-900">{pavlova.name}</h3>
                  <span className="text-sm text-[#3b291c] px-2 py-1 rounded bg-[#e7dfd8]">{pavlova.serves}</span>
                </div>
                <p className="text-[#645c58] mb-4 leading-relaxed">{pavlova.description}</p>

                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2 text-[rgba(59,41,28,1)],41,28,1)]">Ingredients:</h4>
                  <ul className="text-sm text-[#645c58] space-y-1">
                    {pavlova.ingredients.map((ingredient, index) => (
                      <li key={index}>• {ingredient}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-2xl font-light text-gray-900">${pavlova.price}</span>
                  <Button asChild className="bg-[#3b291c] hover:bg-[#645c58] text-white" size="sm">
                    <Link href="/order">Order</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gray-50 rounded-lg p-12">
          <h2 className="text-2xl font-light text-gray-900 mb-4">Ready to Order?</h2>
          <p className="text-[#645c58] mb-6 max-w-2xl mx-auto">
            Place your order now and enjoy our delicious pavlovas delivered fresh to Broward County.
          </p>
          <Button asChild size="lg" className="bg-[#3b291c] hover:bg-[#645c58] text-white">
            <Link href="/order">Place Your Order</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
