import type { Product } from "./types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

export async function getProducts(sort = "asc"): Promise<Product[]> {
  const response = await fetch(`https://fakestoreapi.com/products?sort=${sort}`, {
    next: { revalidate: 3600 }, // Revalidate every 1 hour
  })

  if (!response.ok) {
    throw new Error("Failed to fetch products")
  }

  return response.json()
}

export async function getProduct(id: string): Promise<Product> {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
    next: { revalidate: 3600 }, // Revalidate every 1 hour
  })

  if (!response.ok) {
    throw new Error("Failed to fetch product")
  }

  return response.json()
}

export async function getCategories(): Promise<string[]> {
  const response = await fetch("https://fakestoreapi.com/products/categories", {
    next: { revalidate: 3600 }, // Revalidate every 1 hour
  })

  if (!response.ok) {
    throw new Error("Failed to fetch categories")
  }

  return response.json()
}

export async function getProductsByCategory(category: string, sort = "asc"): Promise<Product[]> {
  const response = await fetch(`https://fakestoreapi.com/products/category/${category}?sort=${sort}`, {
    next: { revalidate: 3600 }, // Revalidate every 1 hour
  })

  if (!response.ok) {
    throw new Error("Failed to fetch products by category")
  }

  return response.json()
}

export async function getClothingProducts(sort = "asc"): Promise<Product[]> {
  const products = await getProducts(sort)
  return products.filter((product) => product.category === "men's clothing" || product.category === "women's clothing")
}

// Adicionar função para obter apenas categorias de roupas
export async function getClothingCategories(): Promise<string[]> {
  const categories = await getCategories()
  return categories.filter((category) => category === "men's clothing" || category === "women's clothing")
}
