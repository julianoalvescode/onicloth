import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import ShopProducts from "../shop/shop-products"

// Mock do ProductCard
jest.mock("../product-card", () => ({
  __esModule: true,
  default: ({ product }: any) => (
    <div data-testid={`product-card-${product.id}`}>{product.title}</div>
  ),
}))

describe("ShopProducts", () => {
  const mockProducts = [
    {
      id: 1,
      title: "Product 1",
      price: 29.99,
      category: "men",
      description: "Test product",
      image: "/test.jpg",
      rating: { rate: 4.5, count: 10 },
    },
    {
      id: 2,
      title: "Product 2",
      price: 39.99,
      category: "women",
      description: "Test product 2",
      image: "/test2.jpg",
      rating: { rate: 4.0, count: 5 },
    },
  ]

  it("should render products grid when products exist", () => {
    render(<ShopProducts filteredProducts={mockProducts} showFilters={false} />)
    expect(screen.getByTestId("product-card-1")).toBeInTheDocument()
    expect(screen.getByTestId("product-card-2")).toBeInTheDocument()
  })

  it("should render no products message when products array is empty", () => {
    render(<ShopProducts filteredProducts={[]} showFilters={false} />)
    expect(screen.getByText("No products found matching your criteria.")).toBeInTheDocument()
  })
})
