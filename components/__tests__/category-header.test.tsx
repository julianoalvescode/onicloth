import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import CategoryHeader from "../CategoryHeader"

describe("CategoryHeader", () => {
  it("renders the title and count correctly", () => {
    render(<CategoryHeader title="Test Category" count={5} />)
    expect(screen.getByText("Test Category (5)")).toBeInTheDocument()
  })
})
