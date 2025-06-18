import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import ShopError from "../shop/shop-error"

describe("ShopError", () => {
  const defaultProps = {
    error: "Failed to load products",
    onRetry: jest.fn(),
  }

  it("should render the error message", () => {
    render(<ShopError {...defaultProps} />)
    expect(screen.getByText("Error: Failed to load products")).toBeInTheDocument()
  })

  it("should call onRetry when try again button is clicked", () => {
    const onRetry = jest.fn()
    render(<ShopError {...defaultProps} onRetry={onRetry} />)
    const button = screen.getByText("Try Again")
    fireEvent.click(button)
    expect(onRetry).toHaveBeenCalled()
  })

  it("should have correct styling classes", () => {
    render(<ShopError {...defaultProps} />)
    const errorMessage = screen.getByText("Error: Failed to load products")
    expect(errorMessage).toHaveClass("font-lato-normal", "text-red-600")
  })

  it("should have correct button styling", () => {
    render(<ShopError {...defaultProps} />)
    const button = screen.getByText("Try Again")
    expect(button).toHaveClass(
      "mt-4",
      "px-6",
      "py-2",
      "bg-black",
      "text-white",
      "font-lato-bold",
      "hover:bg-gray-800",
      "transition-colors",
    )
  })
})
