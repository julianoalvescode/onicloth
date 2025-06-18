import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import CartItemsList from "../cart/cart-items-list"

// Mock dos componentes filhos
jest.mock("../cart/cart-item", () => ({
  __esModule: true,
  default: ({ item, appliedDiscount, onRemove, onUpdateQuantity }: any) => (
    <div data-testid={`cart-item-${item.id}`}>
      <span>{item.title}</span>
      <span>${item.price}</span>
      <span>Qty: {item.quantity}</span>
      <button onClick={() => onRemove(item.id)}>Remove</button>
      <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>Increase</button>
    </div>
  ),
}))

jest.mock("../cart/cart-discount-badge", () => ({
  __esModule: true,
  default: ({ appliedDiscount }: any) => (
    <div data-testid="discount-badge">{appliedDiscount * 100}% off Applied</div>
  ),
}))

jest.mock("../cart/cart-shipping-info", () => ({
  __esModule: true,
  default: () => <div data-testid="shipping-info">Shipping Info</div>,
}))

describe("CartItemsList", () => {
  const mockItems = [
    {
      id: 1,
      title: "Product 1",
      price: 29.99,
      quantity: 2,
      image: "/product1.jpg",
      category: "men's clothing",
    },
    {
      id: 2,
      title: "Product 2",
      price: 39.99,
      quantity: 1,
      image: "/product2.jpg",
      category: "women's clothing",
    },
  ]

  const defaultProps = {
    items: mockItems,
    appliedDiscount: 0,
    onRemove: jest.fn(),
    onUpdateQuantity: jest.fn(),
  }

  it("should render the cart items list component", () => {
    render(<CartItemsList {...defaultProps} />)

    const container = screen.getByTestId("cart-item-1").closest("div")
    expect(container).toBeInTheDocument()
  })

  it("should render all cart items", () => {
    render(<CartItemsList {...defaultProps} />)

    expect(screen.getByTestId("cart-item-1")).toBeInTheDocument()
    expect(screen.getByTestId("cart-item-2")).toBeInTheDocument()
  })

  it("should display product titles", () => {
    render(<CartItemsList {...defaultProps} />)

    expect(screen.getByText("Product 1")).toBeInTheDocument()
    expect(screen.getByText("Product 2")).toBeInTheDocument()
  })

  it("should display product prices", () => {
    render(<CartItemsList {...defaultProps} />)

    expect(screen.getByText("$29.99")).toBeInTheDocument()
    expect(screen.getByText("$39.99")).toBeInTheDocument()
  })

  it("should display product quantities", () => {
    render(<CartItemsList {...defaultProps} />)

    expect(screen.getByText("Qty: 2")).toBeInTheDocument()
    expect(screen.getByText("Qty: 1")).toBeInTheDocument()
  })

  it("should render discount badge when discount is applied", () => {
    render(<CartItemsList {...defaultProps} appliedDiscount={0.15} />)

    const discountBadge = screen.getByTestId("discount-badge")
    expect(discountBadge).toBeInTheDocument()
    expect(discountBadge).toHaveTextContent("15% off Applied")
  })

  it("should not render discount badge when no discount is applied", () => {
    render(<CartItemsList {...defaultProps} appliedDiscount={0} />)

    const discountBadge = screen.queryByTestId("discount-badge")
    expect(discountBadge).not.toBeInTheDocument()
  })

  it("should always render shipping info", () => {
    render(<CartItemsList {...defaultProps} />)

    const shippingInfo = screen.getByTestId("shipping-info")
    expect(shippingInfo).toBeInTheDocument()
  })

  it("should pass correct props to cart items", () => {
    const mockOnRemove = jest.fn()
    const mockOnUpdateQuantity = jest.fn()

    render(
      <CartItemsList
        {...defaultProps}
        onRemove={mockOnRemove}
        onUpdateQuantity={mockOnUpdateQuantity}
      />,
    )

    const removeButtons = screen.getAllByText("Remove")
    const increaseButtons = screen.getAllByText("Increase")

    expect(removeButtons).toHaveLength(2)
    expect(increaseButtons).toHaveLength(2)
  })

  it("should handle empty items array", () => {
    render(<CartItemsList {...defaultProps} items={[]} />)

    const cartItems = screen.queryAllByTestId(/cart-item-/)
    expect(cartItems).toHaveLength(0)
  })

  it("should render discount badge with correct percentage", () => {
    render(<CartItemsList {...defaultProps} appliedDiscount={0.25} />)

    const discountBadge = screen.getByTestId("discount-badge")
    expect(discountBadge).toHaveTextContent("25% off Applied")
  })
})
