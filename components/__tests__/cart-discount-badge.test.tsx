import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import CartDiscountBadge from "../cart/cart-discount-badge"

describe("CartDiscountBadge", () => {
  it("should render the discount badge with correct percentage", () => {
    render(<CartDiscountBadge appliedDiscount={0.15} />)

    const discountText = screen.getByText("15% off Applied")
    expect(discountText).toBeInTheDocument()
  })

  it("should display the correct percentage calculation", () => {
    render(<CartDiscountBadge appliedDiscount={0.25} />)

    const discountText = screen.getByText("25% off Applied")
    expect(discountText).toBeInTheDocument()
  })

  it("should have the correct styling classes", () => {
    render(<CartDiscountBadge appliedDiscount={0.1} />)

    const container = screen.getByText("10% off Applied").parentElement
    expect(container).toHaveClass("flex", "items-center", "gap-2", "text-green-600")
  })

  it("should render the percentage icon", () => {
    render(<CartDiscountBadge appliedDiscount={0.2} />)

    const percentageIcon = screen.getByText("%")
    expect(percentageIcon).toBeInTheDocument()
    expect(percentageIcon).toHaveClass("text-white", "text-xs")
  })

  it("should have the correct icon container styling", () => {
    render(<CartDiscountBadge appliedDiscount={0.05} />)

    const iconContainer = screen.getByText("%").parentElement
    expect(iconContainer).toHaveClass(
      "w-4",
      "h-4",
      "rounded-full",
      "bg-green-600",
      "flex",
      "items-center",
      "justify-center",
    )
  })
})
