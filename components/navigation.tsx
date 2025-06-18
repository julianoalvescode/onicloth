"use client"

import Link from "next/link"
import { ShoppingBag, Search, Heart, User, LogOut, Linkedin, Github } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"
import { useAuth } from "@/contexts/auth-context"
import { useState, useEffect } from "react"
import Logo from "./logo"

interface NavigationProps {
  categories: string[]
}

export default function Navigation({ categories }: NavigationProps) {
  const totalItems = useCartStore((s) => s.items.reduce((acc, item) => acc + item.quantity, 0))
  const { user, logout } = useAuth()
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const utilityNavLinks = [
    { href: "/find-store", label: "Find a Store" },
    { href: "/help", label: "Help" },
    ...(user
      ? []
      : [
          { href: "/join", label: "Join Us" },
          { href: "/signin", label: "Sign In" },
        ]),
  ]

  const formatCategoryName = (category: string) => {
    return category
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  const getCategoryHref = (category: string) => {
    if (category === "men's clothing") return "/category/men's clothing"
    if (category === "women's clothing") return "/category/women's clothing"
    return "/shop"
  }

  const handleLogout = () => {
    logout()
    setIsUserMenuOpen(false)
  }

  return (
    <>
      {/* Fixed Header Container */}
      <div
        className="fixed top-0 left-0 right-0 z-[1010] bg-white border-b border-gray-100"
        role="banner"
      >
        <div className="w-full bg-neutral-900 text-white text-center py-1.5 text-sm tracking-wide z-50 flex items-center justify-center gap-2">
          Made by Juliano Alves —
          <a
            href="https://www.linkedin.com/in/julianoalves7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-gray-300 underline hover:text-white transition-colors"
          >
            <Linkedin size={18} />
            LinkedIn
          </a>
          <span className="mx-2">|</span>
          <a
            href="https://github.com/julianoalvescode"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-gray-300 underline hover:text-white transition-colors"
          >
            <Github size={18} />
            GitHub
          </a>
        </div>
        {/* Utility Navigation */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-end items-center h-8 text-xs">
              {utilityNavLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-lato-normal text-gray-500 hover:text-black px-2 py-1 transition-colors ${
                    index < utilityNavLinks.length - 1 ? "border-r border-gray-200 mr-2" : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {user && (
                <span className="font-lato-normal text-gray-500 px-2 py-1">
                  Welcome, {user.name.firstname}!
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="bg-white transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <Link href="/" className="flex-shrink-0 flex items-center text-black">
                <Logo width={140} height={32} className="h-8 w-auto" />
              </Link>

              {/* Main Navigation Links - Center */}
              <div className="hidden md:block flex-1 justify-center">
                <div className="flex justify-center items-center space-x-8">
                  <Link
                    href="/shop"
                    className="font-lato-bold text-black hover:text-gray-500 px-3 py-2 text-sm transition-colors"
                  >
                    New
                  </Link>
                  {categories?.map((category) => (
                    <Link
                      key={category}
                      href={getCategoryHref(category)}
                      className="font-lato-bold text-black hover:text-gray-500 px-3 py-2 text-sm transition-colors"
                    >
                      {formatCategoryName(category)}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button
                  className="p-2 rounded-md text-gray-700 hover:text-black hover:bg-gray-100"
                  aria-label="Open menu"
                  onClick={() => setIsMobileMenuOpen(true)}
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>

              {/* Right Icons - Desktop only */}
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  href="/favorites"
                  aria-label="Favorites"
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <Heart className="h-5 w-5 text-gray-700" />
                </Link>
                <Link
                  href="/cart"
                  aria-label="Cart"
                  className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <ShoppingBag className="h-5 w-5 text-gray-700" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-lato-bold">
                      {totalItems}
                    </span>
                  )}
                </Link>
                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                      aria-label="User menu"
                    >
                      <User className="h-5 w-5 text-gray-700" />
                    </button>
                    {isUserMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md z-10">
                        <div className="py-1">
                          <div className="px-4 py-2 border-b border-gray-100">
                            <p className="text-sm font-lato-bold text-gray-900">
                              {user.name.firstname} {user.name.lastname}
                            </p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                          </div>
                          <Link
                            href="/profile"
                            className="block px-4 py-2 text-sm font-lato-normal text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            My Profile
                          </Link>
                          <Link
                            href="/orders"
                            className="block px-4 py-2 text-sm font-lato-normal text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            My Orders
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-sm font-lato-normal text-gray-700 hover:bg-gray-100 flex items-center"
                          >
                            <LogOut className="h-4 w-4 mr-2" />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href="/signin"
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Sign In"
                  >
                    <User className="h-5 w-5 text-gray-700" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Spacer to compensate for the fixed header */}
      <div className="h-24"></div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-[1100]"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu overlay"
          />
          <nav
            className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-[1200] flex flex-col p-6"
            aria-label="Mobile menu"
            role="navigation"
          >
            <button
              className="self-end mb-6 p-2 rounded hover:bg-gray-100"
              aria-label="Close menu"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <Link
              href="/shop"
              className="font-lato-bold text-black py-2 text-lg hover:text-gray-500"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              New
            </Link>
            {categories.map((category) => (
              <Link
                key={category}
                href={getCategoryHref(category)}
                className="font-lato-bold text-black py-2 text-lg hover:text-gray-500"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {formatCategoryName(category)}
              </Link>
            ))}
            {/* Utility links for mobile */}
            <div className="mt-6 border-t pt-4">
              {utilityNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-lato-normal text-gray-700 py-2 block hover:text-black"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            {/* Right Icons for mobile */}
            <div className="mt-8 flex flex-col gap-4">
              <Link
                href="/favorites"
                aria-label="Favorites"
                className="flex items-center gap-2 text-lg font-lato-bold text-gray-700 hover:text-black"
              >
                <Heart className="h-5 w-5" /> Favorites
              </Link>
              <Link
                href="/cart"
                aria-label="Cart"
                className="flex items-center gap-2 text-lg font-lato-bold text-gray-700 hover:text-black"
              >
                <ShoppingBag className="h-5 w-5" /> Cart
              </Link>
              {user ? (
                <Link
                  href="/profile"
                  aria-label="Profile"
                  className="flex items-center gap-2 text-lg font-lato-bold text-gray-700 hover:text-black"
                >
                  <User className="h-5 w-5" /> Profile
                </Link>
              ) : (
                <Link
                  href="/signin"
                  aria-label="Sign In"
                  className="flex items-center gap-2 text-lg font-lato-bold text-gray-700 hover:text-black"
                >
                  <User className="h-5 w-5" /> Sign In
                </Link>
              )}
            </div>
          </nav>
        </>
      )}
    </>
  )
}
