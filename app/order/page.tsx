"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, Calendar, Clock, AlertCircle, CheckCircle, MapPin, CreditCard, Plane } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Delivery zones based on distance from North Perry Airport, Miramar FL
const DELIVERY_ZONES = {
  // Local zone (0-5 miles) - $8
  local: {
    cities: [
      "miramar",
      "west park",
      "pembroke pines",
      "miami gardens",
      "hallandale",
      "hollywood hills",
      "emerald hills",
    ],
    fee: 8,
    distance: "0–5 miles",
    description: "Local delivery zone",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  // Nearby zone (5-10 miles) - $12
  nearby: {
    cities: [
      "hollywood",
      "cooper city",
      "north miami beach",
      "hallandale beach",
      "aventura",
      "sunny isles beach",
      "golden beach",
      "bal harbour",
    ],
    fee: 12,
    distance: "5–10 miles",
    description: "Nearby delivery zone",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  // Extended zone (10-20 miles) - $15
  extended: {
    cities: [
      "weston",
      "davie",
      "fort lauderdale",
      "north miami",
      "miami beach",
      "surfside",
      "bay harbor islands",
      "indian creek",
      "plantation",
      "sunrise",
      "tamarac",
      "lauderhill",
      "oakland park",
      "wilton manors",
    ],
    fee: 15,
    distance: "10–20 miles",
    description: "Extended delivery zone",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
}

export default function OrderPage() {
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [deliveryMethod, setDeliveryMethod] = useState("")
  const [selectedPavlova, setSelectedPavlova] = useState("")
  const [deliveryCity, setDeliveryCity] = useState("")
  const [deliveryFee, setDeliveryFee] = useState(0)
  const [deliveryZone, setDeliveryZone] = useState("")
  const [isValidDateTime, setIsValidDateTime] = useState(true)
  const [isValidDeliveryArea, setIsValidDeliveryArea] = useState(true)
  const [orderSubmitted, setOrderSubmitted] = useState(false)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [orderTotal, setOrderTotal] = useState(0)

  const pavlovas = [
    { id: 1, name: "Classic Pavlova", price: 45 },
    { id: 2, name: "Tropical Paradise", price: 52 },
    { id: 3, name: "Chocolate Indulgence", price: 48 },
    { id: 4, name: "Lemon Delight", price: 46 },
    { id: 5, name: "Strawberry Fields", price: 50 },
    { id: 6, name: "Mini Pavlova Set", price: 35 },
  ]

  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ]

  // Calculate delivery fee based on city
  const calculateDeliveryFee = (city: string) => {
    const normalizedCity = city.toLowerCase().trim()

    for (const [zoneName, zone] of Object.entries(DELIVERY_ZONES)) {
      if (zone.cities.some((zoneCity) => normalizedCity.includes(zoneCity) || zoneCity.includes(normalizedCity))) {
        return {
          fee: zone.fee,
          zone: zoneName,
          description: zone.description,
          distance: zone.distance,
          color: zone.color,
        }
      }
    }

    // City not found in delivery zones
    return null
  }

  // Handle city input change
  const handleCityChange = (city: string) => {
    setDeliveryCity(city)

    if (city.trim() === "") {
      setDeliveryFee(0)
      setDeliveryZone("")
      setIsValidDeliveryArea(true)
      return
    }

    const deliveryInfo = calculateDeliveryFee(city)

    if (deliveryInfo) {
      setDeliveryFee(deliveryInfo.fee)
      setDeliveryZone(deliveryInfo.zone)
      setIsValidDeliveryArea(true)
    } else {
      setDeliveryFee(0)
      setDeliveryZone("")
      setIsValidDeliveryArea(false)
    }
  }

  // Calculate total order amount
  useEffect(() => {
    const pavlova = pavlovas.find((p) => p.id.toString() === selectedPavlova)
    const pavlovaPrice = pavlova ? pavlova.price : 0
    const total = pavlovaPrice + (deliveryMethod === "delivery" ? deliveryFee : 0)
    setOrderTotal(total)
  }, [selectedPavlova, deliveryMethod, deliveryFee])

  const getMinDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split("T")[0]
  }

  const validateDateTime = (date: string, time: string) => {
    if (!date || !time) return false
    const selectedDateTime = new Date(`${date} ${time}`)
    const now = new Date()
    const twentyFourHoursFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000)
    return selectedDateTime >= twentyFourHoursFromNow
  }

  const handleDateTimeChange = (date: string, time: string) => {
    const isValid = validateDateTime(date, time)
    setIsValidDateTime(isValid)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!validateDateTime(selectedDate, selectedTime)) {
      setIsValidDateTime(false)
      return
    }

    if (deliveryMethod === "delivery" && !isValidDeliveryArea) {
      return
    }

    setIsProcessingPayment(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsProcessingPayment(false)
    setOrderSubmitted(true)
  }

  if (orderSubmitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <Card className="max-w-md mx-auto border-0 shadow-lg">
          <CardContent className="text-center p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-medium text-gray-900 mb-4">Payment Successful!</h2>
            <p className="text-gray-600 mb-2">
              Order Total: <span className="font-semibold">${orderTotal}</span>
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Thank you for your order! We'll contact you within 24 hours to confirm the details and provide tracking
              information.
            </p>
            <Button asChild className="bg-[#3b291c] hover:bg-[#645c58] text-white">
              <Link href="/">Return to Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50-50{/* Header */}
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
        <Button asChild variant="ghost" className="mb-8 -ml-4 hover:bg-gray-100">
          <Link href="/menu">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Menu
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-medium">
                  <Calendar className="h-5 w-5 mr-2" />
                  Place Your Order
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Customer Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Customer Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" required className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" required className="mt-1" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" required className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" required className="mt-1" />
                    </div>
                  </div>

                  {/* Pavlova Selection */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Select Your Pavlova</h3>
                    <Select value={selectedPavlova} onValueChange={setSelectedPavlova} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a pavlova" />
                      </SelectTrigger>
                      <SelectContent>
                        {pavlovas.map((pavlova) => (
                          <SelectItem key={pavlova.id} value={pavlova.id.toString()}>
                            {pavlova.name} - ${pavlova.price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Date and Time */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Delivery/Pickup Date & Time</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="date">Date</Label>
                        <Input
                          id="date"
                          type="date"
                          min={getMinDate()}
                          value={selectedDate}
                          onChange={(e) => {
                            setSelectedDate(e.target.value)
                            handleDateTimeChange(e.target.value, selectedTime)
                          }}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="time">Time</Label>
                        <Select
                          value={selectedTime}
                          onValueChange={(value) => {
                            setSelectedTime(value)
                            handleDateTimeChange(selectedDate, value)
                          }}
                          required
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {!isValidDateTime && selectedDate && selectedTime && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          Orders must be placed at least 24 hours in advance. Please select a later date and time.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>

                  {/* Delivery Method */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Delivery Method</h3>
                    <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod} required>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pickup" id="pickup" />
                        <Label htmlFor="pickup" className="flex items-center">
                          <Plane className="h-4 w-4 mr-2" />
                          Store Pickup (Free) - Near North Perry Airport, Miramar
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="delivery" id="delivery" />
                        <Label htmlFor="delivery">Local Delivery (Fee varies by distance)</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Delivery Address */}
                  {deliveryMethod === "delivery" && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-900 flex items-center">
                        <MapPin className="h-5 w-5 mr-2" />
                        Delivery Address
                      </h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 flex items-center">
                          <Plane className="h-4 w-4 mr-2" />
                          Delivering from North Perry Airport area, Miramar FL
                        </p>
                      </div>
                      <div>
                        <Label htmlFor="address">Street Address</Label>
                        <Input id="address" required className="mt-1" />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            value={deliveryCity}
                            onChange={(e) => handleCityChange(e.target.value)}
                            placeholder="e.g., Hollywood, Aventura, Weston"
                            required
                            className="mt-1"
                          />
                          {deliveryCity && isValidDeliveryArea && deliveryFee > 0 && (
                            <div
                              className={`text-sm mt-2 p-2 rounded ${DELIVERY_ZONES[deliveryZone as keyof typeof DELIVERY_ZONES]?.bgColor}`}
                            >
                              <p
                                className={`font-medium ${DELIVERY_ZONES[deliveryZone as keyof typeof DELIVERY_ZONES]?.color}`}
                              >
                                ✓ {DELIVERY_ZONES[deliveryZone as keyof typeof DELIVERY_ZONES]?.distance} - $
                                {deliveryFee} delivery fee
                              </p>
                            </div>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="state">State</Label>
                          <Input id="state" defaultValue="FL" required className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="zip">ZIP Code</Label>
                          <Input id="zip" required className="mt-1" />
                        </div>
                      </div>

                      {!isValidDeliveryArea && deliveryCity && (
                        <Alert variant="destructive">
                          <MapPin className="h-4 w-4" />
                          <AlertDescription>
                            Sorry, we don't deliver to {deliveryCity}. We deliver within 20 miles of North Perry Airport
                            (Miramar). Orders beyond 20 miles may require custom pricing - please contact us directly.
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  )}

                  {/* Payment Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Payment Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" required className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" required className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" required className="mt-1" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input id="cardName" required className="mt-1" />
                    </div>
                  </div>

                  {/* Special Instructions */}
                  <div>
                    <Label htmlFor="instructions">Special Instructions (Optional)</Label>
                    <Textarea
                      id="instructions"
                      placeholder="Any special requests or dietary requirements..."
                      rows={3}
                      className="mt-1"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#3b291c] hover:bg-[#645c58] text-white"
                    disabled={
                      !isValidDateTime || (deliveryMethod === "delivery" && !isValidDeliveryArea) || isProcessingPayment
                    }
                  >
                    {isProcessingPayment ? <>Processing Payment...</> : <>Pay ${orderTotal} - Place Order</>}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary & Info */}
          <div className="space-y-6">
            {/* Order Summary */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-medium">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedPavlova && (
                  <div className="flex justify-between">
                    <span>{pavlovas.find((p) => p.id.toString() === selectedPavlova)?.name}</span>
                    <span>${pavlovas.find((p) => p.id.toString() === selectedPavlova)?.price}</span>
                  </div>
                )}
                {deliveryMethod === "delivery" && deliveryFee > 0 && (
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee}</span>
                  </div>
                )}
                {orderTotal > 0 && (
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${orderTotal}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Delivery Zones Info */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-medium flex items-center">
                  <Plane className="h-5 w-5 mr-2" />
                  Delivery Areas & Fees
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">From North Perry Airport, Miramar FL</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Local Zone */}
                <div className="p-3 rounded-lg border border-green-100 bg-gray-5000
                  <div classNamep-3 rounded-lg border border-green-100 bg-stone-600000000ent00          <span className="font-medium text-green-800">Local (0–5 mi)</span>
                    <span className="font-semibold text-green-800">$8</span>
                  </div>
                  <p className="text-xs text-green-700">Miramar, West Park, Pembroke Pines (East), Miami Gardens</p>
                </div>

                {/* Nearby Zone */}
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-blue-800">Nearby (5–10 mi)</span>
                    <span className="font-semibold text-blue-800">$12</span>
                  </div>
                  <p className="text-xs text-blue-700">Hollywood, Cooper City, North Miami Beach, Hallandale Beach</p>
                </div>

                {/* Extended Zone */}
                <div className="p-3 bg-orange-50 rounded-lg border border-orange-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-orange-800">Extended (10–20 mi)</span>
                    <span className="font-semibold text-orange-800">$15</span>
                  </div>
                  <p className="text-xs text-orange-700">
                    Aventura, Weston, Davie, Fort Lauderdale (South), North Miami
                  </p>
                </div>

                <div className="text-xs text-gray-500 pt-2 border-t">
                  💡 Delivery fees are flat and based on one-way distance. Orders beyond 20 miles may be subject to
                  custom pricing or pickup only.
                </div>
              </CardContent>
            </Card>

            {/* Order Information */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-medium">
                  <Clock className="h-5 w-5 mr-2" />
                  Important Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>24-Hour Notice Required:</strong> All orders must be placed at least 24 hours in advance to
                    ensure freshness.
                  </AlertDescription>
                </Alert>

                <div>
                  <h4 className="font-medium mb-2">Store Hours</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Tuesday - Friday: 9 AM - 6 PM</p>
                    <p>Saturday - Sunday: 10 AM - 5 PM</p>
                    <p>Monday: Closed</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Payment</h4>
                  <p className="text-sm text-gray-600">
                    Secure payment processing. Your card will be charged immediately upon order confirmation.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
