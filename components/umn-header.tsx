"use client"

import { useState } from "react"
import { Search, Lock, Menu, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

export function UMNHeader() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="w-full">
      {/* Top University Bar - Maroon */}
      <div className="bg-[#7A0019] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* Block M + Wordmark */}
            <Link href="https://umn.edu" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
              <Image
                src="/images/University_of_Minnesota_Logo.svg.png"
                alt="University of Minnesota"
                width={1280}
                height={1280}
                className="h-8 w-8"
                priority
              />
              <span className="hidden sm:inline font-semibold tracking-tight text-sm">UNIVERSITY OF MINNESOTA</span>
            </Link>

            {/* Right Links */}
            <div className="flex items-center gap-4 text-sm">
              <Link href="https://onestop.umn.edu" className="hover:underline hidden sm:inline">
                One Stop
              </Link>
              <Link href="https://myu.umn.edu" className="flex items-center gap-1 hover:underline">
                <span className="hidden sm:inline">MyU</span>
                <Lock className="h-3 w-3" />
              </Link>
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-1.5 hover:bg-white/10 rounded transition-colors"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Search Bar (expandable) */}
          {searchOpen && (
            <div className="pb-3 animate-in slide-in-from-top-2 duration-200">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search umn.edu"
                  className="w-full px-4 py-2 rounded text-foreground bg-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#FFCC33]"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sub Header - Gold accent bar */}
      <div className="bg-[#FFCC33]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-3 sm:py-4">
            <Link href="https://apec.umn.edu" className="text-xs sm:text-sm text-[#7A0019] hover:underline">
              Department of Applied Economics ↗
            </Link>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-[#7A0019] mt-1 leading-tight">
              NatCap TEEMs | The Earth-Economy Modelers
            </h1>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between min-h-[48px]">
            <div className="hidden sm:flex items-center gap-1">
              {[
                { label: "Home", href: "/" },
                { label: "People", href: "/people" },
                { label: "Models", href: "/models" },
                { label: "Hosting", href: "/hosting-comparison" },
              ].map((item) => {
                const isActive = pathname === item.href
                
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`px-4 py-3 text-sm font-medium transition-colors relative ${
                      isActive
                        ? "text-[#7A0019] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#7A0019]"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="sm:hidden p-2 -ml-2 hover:bg-muted rounded transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="relative w-5 h-5">
                <Menu
                  className={`h-5 w-5 absolute inset-0 transition-all duration-300 ${
                    mobileMenuOpen ? "rotate-90 opacity-0 scale-50" : "rotate-0 opacity-100 scale-100"
                  }`}
                />
                <X
                  className={`h-5 w-5 absolute inset-0 transition-all duration-300 ${
                    mobileMenuOpen ? "rotate-0 opacity-100 scale-100" : "-rotate-90 opacity-0 scale-50"
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              mobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="py-3 space-y-1">
              {[
                { label: "Home", href: "/" },
                { label: "People", href: "/people" },
                { label: "Models", href: "/models" },
                { label: "Hosting", href: "/hosting-comparison" },
              ].map((item, index) => {
                const isActive = pathname === item.href
                
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`block px-4 py-2.5 text-sm font-medium rounded transition-all duration-200 ${
                      isActive 
                        ? "text-[#7A0019] bg-[#7A0019]/10 font-semibold" 
                        : "text-foreground hover:bg-muted"
                    } ${mobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0"}`}
                    style={{
                      transitionDelay: mobileMenuOpen ? `${index * 50}ms` : "0ms",
                    }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
