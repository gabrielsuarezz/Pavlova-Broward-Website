import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Phone, Mail, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  const contactInfo = {
    phone: "(954) 123-4567",
    email: "orders@pavlovabroward.com",
    address: {
      street: "123 Sweet Street",
      city: "Fort Lauderdale",
      state: "FL",
      zip: "33301",
    },
  }

  const businessHours = [
    { days: "Tuesday - Friday", hours: "9 AM - 6 PM" },
    { days: "Saturday - Sunday", hours: "10 AM - 5 PM" },
    { days: "Monday", hours: "Closed", closed: true },
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
              <span className="text-xl font-medium text-gray-900">Pavlova Broward</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                Home
              </Link>
              <Link href="/menu" className="text-gray-600 hover:text-gray-900 transition-colors">
                Menu
              </Link>
              <Link href="/contact" className="text-gray-900 font-medium">
                Contact
              </Link>
              <Button asChild className="bg-[#3b291c] hover:bg-[#645c58] text-white">
                <Link href="/order">Order Now</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-8 -ml-4 hover:bg-gray-100">
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>

        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-light text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-[#645c58] max-w-2xl mx-auto leading-relaxed">
            Have questions about our pavlovas or need help with your order? We're here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            {/* Phone */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-lg font-medium">
                  <Phone className="h-5 w-5 mr-2" />
                  Phone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium text-gray-900 mb-1">{contactInfo.phone}</p>
                <p className="text-[#645c58]">Call us for orders, questions, or special requests</p>
              </CardContent>
            </Card>

            {/* Email */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-lg font-medium">
                  <Mail className="h-5 w-5 mr-2" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium text-gray-900 mb-1">{contactInfo.email}</p>
                <p className="text-gray-600">Send us your questions or special requests</p>
              </CardContent>
            </Card>

            {/* Location */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-lg font-medium">
                  <MapPin className="h-5 w-5 mr-2" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium text-gray-900">{contactInfo.address.street}</p>
                <p className="text-lg font-medium text-gray-900 mb-2">
                  {contactInfo.address.city}, {contactInfo.address.state} {contactInfo.address.zip}
                </p>
                <p className="text-gray-600">Visit us for pickup orders or just to say hello!</p>
              </CardContent>
            </Card>

            {/* Hours */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-lg font-medium">
                  <Clock className="h-5 w-5 mr-2" />
                  Store Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {businessHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-gray-900">{schedule.days}:</span>
                      <span className={`font-medium ${schedule.closed ? "text-red-600" : "text-gray-900"}`}>
                        {schedule.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map and Additional Info */}
          <div className="space-y-6">
            {/* Map Placeholder */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Find Us in Broward County</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center mb-4">
                  <p className="text-gray-500">Interactive map would be embedded here</p>
                </div>
                <p className="text-sm text-gray-600">
                  We're conveniently located in Broward County with easy parking available.
                </p>
              </CardContent>
            </Card>

            {/* Delivery Information */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Delivery Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">Delivery Area</h4>
                  <p className="text-gray-600">We deliver throughout Broward County, Florida</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Delivery Fee</h4>
                  <p className="text-gray-600">$5 flat rate for all Broward County deliveries</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Order Requirements</h4>
                  <p className="text-gray-600">All orders must be placed 24 hours in advance</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 bg-gray-50 rounded-lg p-12">
          <h2 className="text-2xl font-light text-gray-900 mb-4">Ready to Order?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Don't wait! Place your pavlova order now and treat yourself to something special.
          </p>
          <Button asChild size="lg" className="bg-[#3b291c] hover:bg-[#645c58] text-white">
            <Link href="/order">Place Your Order</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
