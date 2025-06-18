import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import CartHeader from "../cart/cart-header"

describe("CartHeader", () => {
  it("should render the cart header with correct text", () => {
    render(<CartHeader />)

    const heading = screen.getByRole("heading", { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent("Bag")
  })

  it("should have the correct styling classes", () => {
    render(<CartHeader />)

    const heading = screen.getByRole("heading", { level: 1 })
    expect(heading).toHaveClass("text-2xl", "font-lato-normal", "text-black", "mb-8")
  })
})
