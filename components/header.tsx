"use client"

import { useState } from "react"
import { Menu, X, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMenuOpen(false)
    }
  }

  const navigation = [
    { name: "Home", href: "#home", id: "home" },
    { name: "Features", href: "#features", id: "features" },
    { name: "About", href: "#about", id: "about" },
    { name: "Contact", href: "#contact", id: "contact" },
  ]

  // Only show this header on non-home pages
  if (pathname === "/") return null

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-gray-900">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Target className="h-5 w-5 text-white" />
            </div>
            HabitTracker
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-blue-600 text-gray-600">
              Home
            </Link>
            <Link href="/#features" className="text-sm font-medium transition-colors hover:text-blue-600 text-gray-600">
              Features
            </Link>
            <Link href="/#about" className="text-sm font-medium transition-colors hover:text-blue-600 text-gray-600">
              About
            </Link>
            <Link href="/#contact" className="text-sm font-medium transition-colors hover:text-blue-600 text-gray-600">
              Contact
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <Button asChild>
              <Link href="/login">Start Tracking</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white/95 backdrop-blur-md">
            <nav className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-left text-sm font-medium transition-colors hover:text-blue-600 text-gray-600 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/#features"
                className="text-left text-sm font-medium transition-colors hover:text-blue-600 text-gray-600 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="/#about"
                className="text-left text-sm font-medium transition-colors hover:text-blue-600 text-gray-600 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/#contact"
                className="text-left text-sm font-medium transition-colors hover:text-blue-600 text-gray-600 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Button asChild className="mt-2">
                <Link href="/tracker" onClick={() => setIsMenuOpen(false)}>
                  Start Tracking
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
