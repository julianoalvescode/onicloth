"use client"

import { Clock } from "lucide-react"

export default function CartShippingInfo() {
  return (
    <div className="space-y-4 pt-6 border-t border-gray-200">
      <div>
        <h3 className="font-lato-normal text-black mb-2">Shipping</h3>
        <p className="text-gray-600 font-lato-normal text-sm">
          Arrives by Fri, Jun 20{" "}
          <button
            className="underline text-black hover:no-underline"
            aria-label="Edit delivery location"
          >
            Edit Location
          </button>
        </p>
      </div>

      <div>
        <h3 className="font-lato-normal text-black mb-1">Free Pickup</h3>
        <button
          className="underline text-black hover:no-underline font-lato-normal text-sm"
          aria-label="Find a store for pickup"
        >
          Find a Store
        </button>
      </div>

      {/* Stock Warning */}
      <div
        className="flex items-center gap-2 text-orange-600 bg-orange-50 p-3 rounded-lg"
        role="status"
        aria-live="polite"
      >
        <Clock className="h-4 w-4 flex-shrink-0" />
        <span className="font-lato-normal text-sm">Just a few left. Order soon.</span>
      </div>
    </div>
  )
}
