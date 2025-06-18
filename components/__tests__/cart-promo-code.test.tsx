import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import CartPromoCode from "../cart/cart-promo-code"

// Mock do lucide-react
jest.mock("lucide-react", () => ({
  ChevronUp: ({ className, ...props }: any) => (
    <svg className={className} data-testid="chevron-up" {...props} />
  ),
  ChevronDown: ({ className, ...props }: any) => (
    <svg className={className} data-testid="chevron-down" {...props} />
  ),
}))

describe("CartPromoCode", () => {
  const defaultProps = {
    promoCodeExpanded: false,
    promoCode: "",
    onToggleExpanded: jest.fn(),
    onPromoCodeChange: jest.fn(),
    onApplyPromoCode: jest.fn(),
  }

  it("should render the promo code component", () => {
    render(<CartPromoCode {...defaultProps} />)

    const button = screen.getByRole("button", { name: /do you have a promo code/i })
    expect(button).toBeInTheDocument()
  })

  it("should display the correct question text", () => {
    render(<CartPromoCode {...defaultProps} />)

    const text = screen.getByText("Do you have a Promo Code?")
    expect(text).toBeInTheDocument()
  })

  it("should show chevron down when not expanded", () => {
    render(<CartPromoCode {...defaultProps} />)

    const chevronDown = screen.getByTestId("chevron-down")
    expect(chevronDown).toBeInTheDocument()
  })

  it("should show chevron up when expanded", () => {
    render(<CartPromoCode {...defaultProps} promoCodeExpanded={true} />)

    const chevronUp = screen.getByTestId("chevron-up")
    expect(chevronUp).toBeInTheDocument()
  })

  it("should call onToggleExpanded when button is clicked", () => {
    const mockToggle = jest.fn()
    render(<CartPromoCode {...defaultProps} onToggleExpanded={mockToggle} />)

    const button = screen.getByRole("button", { name: /do you have a promo code/i })
    fireEvent.click(button)

    expect(mockToggle).toHaveBeenCalledTimes(1)
  })

  it("should render input and apply button when expanded", () => {
    render(<CartPromoCode {...defaultProps} promoCodeExpanded={true} />)

    const input = screen.getByPlaceholderText("Enter promo code")
    const applyButton = screen.getByRole("button", { name: /apply/i })

    expect(input).toBeInTheDocument()
    expect(applyButton).toBeInTheDocument()
  })

  it("should not render input and apply button when not expanded", () => {
    render(<CartPromoCode {...defaultProps} />)

    const input = screen.queryByPlaceholderText("Enter promo code")
    const applyButton = screen.queryByRole("button", { name: /apply/i })

    expect(input).not.toBeInTheDocument()
    expect(applyButton).not.toBeInTheDocument()
  })

  it("should call onPromoCodeChange when input value changes", () => {
    const mockChange = jest.fn()
    render(
      <CartPromoCode {...defaultProps} promoCodeExpanded={true} onPromoCodeChange={mockChange} />,
    )

    const input = screen.getByPlaceholderText("Enter promo code")
    fireEvent.change(input, { target: { value: "SAVE20" } })

    expect(mockChange).toHaveBeenCalledWith("SAVE20")
  })

  it("should call onApplyPromoCode when apply button is clicked", () => {
    const mockApply = jest.fn()
    render(
      <CartPromoCode {...defaultProps} promoCodeExpanded={true} onApplyPromoCode={mockApply} />,
    )

    const applyButton = screen.getByRole("button", { name: /apply/i })
    fireEvent.click(applyButton)

    expect(mockApply).toHaveBeenCalledTimes(1)
  })

  it("should display the current promo code value", () => {
    render(<CartPromoCode {...defaultProps} promoCodeExpanded={true} promoCode="SAVE20" />)

    const input = screen.getByPlaceholderText("Enter promo code")
    expect(input).toHaveValue("SAVE20")
  })

  it("should have the correct button styling", () => {
    render(<CartPromoCode {...defaultProps} />)

    const button = screen.getByRole("button", { name: /do you have a promo code/i })
    expect(button).toHaveClass(
      "w-full",
      "flex",
      "items-center",
      "justify-between",
      "p-4",
      "text-left",
    )
  })
})
