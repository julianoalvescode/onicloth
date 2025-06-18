import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import ProductCard from "../product-card"

const mockProduct = {
  id: 1,
  title: "Test Product",
  image: "/test-image.jpg",
  category: "men's clothing",
  price: 99.99,
  description: "Test description",
  rating: {
    rate: 4.5,
    count: 10,
  },
}

describe("ProductCard", () => {
  it("renders the product card component", () => {
    render(<ProductCard product={mockProduct} />)
    // Add specific assertions based on product card content if needed
    expect(screen.getByText("Test Product")).toBeInTheDocument()
  })
})
