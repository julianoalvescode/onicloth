import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import HomeCarousel from "../home-carousel"

describe("HomeCarousel", () => {
  it("renders the home carousel component", () => {
    render(<HomeCarousel />)
    // Add specific assertions based on carousel content if needed
    expect(screen.getByTestId("home-carousel")).toBeInTheDocument()
  })
})
