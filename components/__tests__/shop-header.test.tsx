import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import ShopHeader from "../shop/shop-header"

// Mocks dos ícones e dropdown
jest.mock("lucide-react", () => ({
  ChevronDown: (props: any) => <svg data-testid="chevron-down" {...props} />,
  SlidersHorizontal: (props: any) => <svg data-testid="sliders-horizontal" {...props} />,
}))
jest.mock("../ui/dropdown-menu", () => ({
  DropdownMenu: ({ children }: any) => <div data-testid="dropdown-menu">{children}</div>,
  DropdownMenuTrigger: ({ children }: any) => <div data-testid="dropdown-trigger">{children}</div>,
  DropdownMenuContent: ({ children }: any) => <div data-testid="dropdown-content">{children}</div>,
  DropdownMenuItem: ({ children, onSelect, className }: any) => (
    <div data-testid="dropdown-item" className={className} onClick={onSelect}>
      {children}
    </div>
  ),
}))

describe("ShopHeader", () => {
  const defaultProps = {
    activeCategory: "all",
    filteredProductsCount: 10,
    categories: ["men", "women"],
    sortBy: "asc",
    showFilters: false,
    onCategoryChange: jest.fn(),
    onSortChange: jest.fn(),
    onToggleFilters: jest.fn(),
    formatCategoryName: (cat: string) => cat.charAt(0).toUpperCase() + cat.slice(1),
  }

  it("should render the header with correct title and count", () => {
    render(<ShopHeader {...defaultProps} />)
    expect(screen.getByText("All Products (10)")).toBeInTheDocument()
  })

  it("should render mobile category select with options", () => {
    render(<ShopHeader {...defaultProps} />)
    const select = screen.getByLabelText("Category")
    expect(select).toBeInTheDocument()
    expect(screen.getByText("All Products")).toBeInTheDocument()
    expect(screen.getByText("Men")).toBeInTheDocument()
    expect(screen.getByText("Women")).toBeInTheDocument()
  })

  it("should call onCategoryChange when category is changed", () => {
    const onCategoryChange = jest.fn()
    render(<ShopHeader {...defaultProps} onCategoryChange={onCategoryChange} />)
    const select = screen.getByLabelText("Category")
    fireEvent.change(select, { target: { value: "men" } })
    expect(onCategoryChange).toHaveBeenCalledWith("men")
  })

  it("should call onToggleFilters when filter button is clicked", () => {
    const onToggleFilters = jest.fn()
    render(<ShopHeader {...defaultProps} onToggleFilters={onToggleFilters} showFilters={false} />)
    const button = screen.getByText("Show Filters")
    fireEvent.click(button)
    expect(onToggleFilters).toHaveBeenCalled()
  })

  it('should show "Hide Filters" when showFilters is true', () => {
    render(<ShopHeader {...defaultProps} showFilters={true} />)
    expect(screen.getByText("Hide Filters")).toBeInTheDocument()
  })

  it("should call onSortChange when sort option is selected", () => {
    const onSortChange = jest.fn()
    render(<ShopHeader {...defaultProps} onSortChange={onSortChange} sortBy="asc" />)
    const sortButton = screen.getByText("Sort By")
    fireEvent.click(sortButton)
    const lowToHigh = screen.getByText("Price: Low to High")
    fireEvent.click(lowToHigh)
    expect(onSortChange).toHaveBeenCalledWith("asc")
  })
})
