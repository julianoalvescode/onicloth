"use client"

import Image from "next/image"
import { Trash2, Plus, Minus, Heart } from "lucide-react"

interface CartItemProps {
  item: {
    id: number
    title: string
    price: number
    quantity: number
    image?: string
    category: string
  }
  appliedDiscount: number
  onRemove: (id: number) => void
  onUpdateQuantity: (id: number, quantity: number) => void
}

export default function CartItem({
  item,
  appliedDiscount,
  onRemove,
  onUpdateQuantity,
}: CartItemProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full">
      {/* Product Image */}
      <div className="relative w-40 h-40 sm:w-48 sm:h-48 bg-gray-100 rounded-lg p-4 flex-shrink-0 mx-auto sm:mx-0">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.title}
          fill
          className="object-contain"
          sizes="(max-width: 640px) 160px, 192px"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 space-y-2 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <div className="min-w-0">
            <h3 className="font-lato-normal text-lg text-black truncate">{item.title}</h3>
            <p className="text-gray-500 font-lato-normal capitalize truncate">{item.category}</p>
            <p className="text-gray-500 font-lato-normal text-sm mt-1 truncate">
              {item.category === "men's clothing" ? "Men's" : "Women's"} / Size M
            </p>
          </div>
          <div className="text-right whitespace-nowrap">
            {appliedDiscount > 0 && (
              <p className="text-gray-400 line-through font-lato-normal">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            )}
            <p className="font-lato-normal text-lg">
              ${(item.price * item.quantity * (1 - appliedDiscount)).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center justify-between pt-4 flex-wrap gap-2">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onRemove(item.id)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label={`Remove ${item.title} from cart`}
            >
              <Trash2 className="h-5 w-5 text-gray-500" />
            </button>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
                disabled={item.quantity <= 1}
                aria-label={`Decrease quantity of ${item.title}`}
                aria-disabled={item.quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="font-lato-normal text-center min-w-[20px]">{item.quantity}</span>
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
                aria-label={`Increase quantity of ${item.title}`}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label={`Add ${item.title} to favorites`}
            >
              <Heart className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
