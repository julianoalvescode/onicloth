import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import Footer from "../footer"

describe("Footer", () => {
  it("renders the footer component", () => {
    render(<Footer />)
    // Add specific assertions based on footer content if needed
    expect(screen.getByRole("contentinfo")).toBeInTheDocument()
  })
})
