import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import CartLoading from "../cart/cart-loading"

// Mock do componente Skeleton
jest.mock("../ui/skeleton", () => ({
  Skeleton: ({ className, ...props }: any) => (
    <div className={className} data-testid="skeleton" {...props} />
  ),
}))

describe("CartLoading", () => {
  it("should render skeleton items for cart products", () => {
    render(<CartLoading />)

    const skeletons = screen.getAllByTestId("skeleton")
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it("should render skeleton for header", () => {
    render(<CartLoading />)

    const headerSkeleton = screen.getAllByTestId("skeleton")[0]
    expect(headerSkeleton).toHaveClass("h-8", "w-32", "mb-8")
  })

  it("should render skeleton for product images", () => {
    render(<CartLoading />)

    const imageSkeletons = screen
      .getAllByTestId("skeleton")
      .filter(
        (skeleton) => skeleton.className.includes("w-40") && skeleton.className.includes("h-40"),
      )
    expect(imageSkeletons.length).toBeGreaterThan(0)
  })
})
