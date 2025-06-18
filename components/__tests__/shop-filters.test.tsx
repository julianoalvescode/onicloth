import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import ShopFilters from "../shop/shop-filters"

// Mock do ícone
jest.mock("lucide-react", () => ({
  ChevronDown: ({ className, ...props }: any) => (
    <svg className={className} data-testid="chevron-down" {...props} />
  ),
}))

describe("ShopFilters", () => {
  const defaultProps = {
    activeCategory: "all",
    categories: ["men", "women"],
    showPriceFilter: false,
    priceRange: { min: 0, max: 1000 },
    tempPriceRange: { min: 0, max: 1000 },
    onCategoryChange: jest.fn(),
    onTogglePriceFilter: jest.fn(),
    onTempPriceRangeChange: jest.fn(),
    onApplyPriceFilter: jest.fn(),
    onResetPriceFilter: jest.fn(),
    formatCategoryName: (cat: string) => cat.charAt(0).toUpperCase() + cat.slice(1),
  }

  it("should render category filters", () => {
    render(<ShopFilters {...defaultProps} />)
    expect(screen.getByText("All Products")).toBeInTheDocument()
    expect(screen.getByText("Men")).toBeInTheDocument()
    expect(screen.getByText("Women")).toBeInTheDocument()
  })

  it("should call onCategoryChange when category is clicked", () => {
    const onCategoryChange = jest.fn()
    render(<ShopFilters {...defaultProps} onCategoryChange={onCategoryChange} />)
    const menButton = screen.getByText("Men")
    fireEvent.click(menButton)
    expect(onCategoryChange).toHaveBeenCalledWith("men")
  })

  it("should highlight active category", () => {
    render(<ShopFilters {...defaultProps} activeCategory="men" />)
    const menButton = screen.getByText("Men")
    expect(menButton).toHaveClass("text-black", "font-lato-bold")
  })

  it("should render price range filter button", () => {
    render(<ShopFilters {...defaultProps} />)
    expect(screen.getByText("Price Range")).toBeInTheDocument()
  })

  it("should call onTogglePriceFilter when price filter button is clicked", () => {
    const onTogglePriceFilter = jest.fn()
    render(<ShopFilters {...defaultProps} onTogglePriceFilter={onTogglePriceFilter} />)
    const priceButton = screen.getByText("Price Range")
    fireEvent.click(priceButton)
    expect(onTogglePriceFilter).toHaveBeenCalled()
  })

  it("should show price filter when showPriceFilter is true", () => {
    render(<ShopFilters {...defaultProps} showPriceFilter={true} />)
    expect(screen.getByText("Min Price: $0")).toBeInTheDocument()
    expect(screen.getByText("Max Price: $1000")).toBeInTheDocument()
  })

  it("should call onApplyPriceFilter when apply button is clicked", () => {
    const onApplyPriceFilter = jest.fn()
    render(
      <ShopFilters
        {...defaultProps}
        showPriceFilter={true}
        onApplyPriceFilter={onApplyPriceFilter}
      />,
    )
    const applyButton = screen.getByText("Apply")
    fireEvent.click(applyButton)
    expect(onApplyPriceFilter).toHaveBeenCalled()
  })

  it("should call onResetPriceFilter when reset button is clicked", () => {
    const onResetPriceFilter = jest.fn()
    render(
      <ShopFilters
        {...defaultProps}
        showPriceFilter={true}
        onResetPriceFilter={onResetPriceFilter}
      />,
    )
    const resetButton = screen.getByText("Reset")
    fireEvent.click(resetButton)
    expect(onResetPriceFilter).toHaveBeenCalled()
  })

  it("should display current price range", () => {
    render(
      <ShopFilters {...defaultProps} showPriceFilter={true} priceRange={{ min: 50, max: 200 }} />,
    )
    expect(screen.getByText("$50 - $200")).toBeInTheDocument()
  })
})
