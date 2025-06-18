import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import CartEmpty from "../cart/cart-empty"

// Mock do Next.js Link component
jest.mock("next/link", () => {
  return function MockLink({ children, href, ...props }: any) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    )
  }
})

describe("CartEmpty", () => {
  it("should render the cart empty component", () => {
    render(<CartEmpty />)

    // Verifica se o componente principal está presente
    const container = screen.getByText("Your bag is empty").closest("div")
    expect(container).toBeInTheDocument()
  })

  it("should display the correct heading text", () => {
    render(<CartEmpty />)

    const heading = screen.getByRole("heading", { level: 2 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent("Your bag is empty")
  })

  it("should display the correct description text", () => {
    render(<CartEmpty />)

    const description = screen.getByText("Items added to your bag will appear here.")
    expect(description).toBeInTheDocument()
    expect(description).toHaveClass("text-gray-500")
  })

  it('should render a "Continue Shopping" link', () => {
    render(<CartEmpty />)

    const link = screen.getByRole("link", { name: /continue shopping/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute("href", "/")
  })

  it("should have the correct styling classes on the link", () => {
    render(<CartEmpty />)

    const link = screen.getByRole("link", { name: /continue shopping/i })
    expect(link).toHaveClass(
      "inline-block",
      "px-8",
      "py-3",
      "bg-black",
      "text-white",
      "text-sm",
      "font-lato-normal",
      "hover:bg-gray-800",
      "transition-colors",
      "rounded-full",
    )
  })

  it("should have the correct heading styling", () => {
    render(<CartEmpty />)

    const heading = screen.getByRole("heading", { level: 2 })
    expect(heading).toHaveClass("text-2xl", "font-lato-normal", "text-black", "mb-4")
  })

  it("should have the correct description styling", () => {
    render(<CartEmpty />)

    const description = screen.getByText("Items added to your bag will appear here.")
    expect(description).toHaveClass("text-gray-500", "mb-8")
  })

  it("should have the correct text center container styling", () => {
    render(<CartEmpty />)

    const textContainer = screen.getByText("Your bag is empty").parentElement
    expect(textContainer).toHaveClass("text-center")
  })
})
