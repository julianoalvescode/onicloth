import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { category: string } }) {
  try {
    const { searchParams } = new URL(request.url)
    const sort = searchParams.get("sort") || "asc"
    const category = params.category

    const response = await fetch(`https://fakestoreapi.com/products/category/${category}?sort=${sort}`, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 }, // Revalidate every 1 hour
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch products by category: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    })
  } catch (error) {
    console.error("Error fetching products by category:", error)
    return NextResponse.json({ error: "Failed to fetch products by category" }, { status: 500 })
  }
}
