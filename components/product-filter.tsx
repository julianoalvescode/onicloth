"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface FilterProps {
  onFilterChange: (filters: {
    category: string
    minPrice: number
    maxPrice: number
  }) => void
}

export default function ProductFilter({ onFilterChange }: FilterProps) {
  const [category, setCategory] = useState("")
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(1000)

  const handleFilterChange = () => {
    onFilterChange({ category, minPrice, maxPrice })
  }

  const handleReset = () => {
    setCategory("")
    setMinPrice(0)
    setMaxPrice(1000)
    onFilterChange({ category: "", minPrice: 0, maxPrice: 1000 })
  }

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>

      <div className="space-y-4">
        <div>
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
          </select>
        </div>

        <div>
          <Label htmlFor="minPrice">Min Price: ${minPrice}</Label>
          <Input
            id="minPrice"
            type="range"
            min="0"
            max="500"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="w-full mt-1"
          />
        </div>

        <div>
          <Label htmlFor="maxPrice">Max Price: ${maxPrice}</Label>
          <Input
            id="maxPrice"
            type="range"
            min="0"
            max="1000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full mt-1"
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={handleFilterChange} className="flex-1">
            Apply Filters
          </Button>
          <Button onClick={handleReset} variant="outline" className="flex-1">
            Reset
          </Button>
        </div>
      </div>
    </div>
  )
}
