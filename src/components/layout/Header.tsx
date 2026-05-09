'use client'

import React, { useState, useEffect } from 'react'
import TopBanner from './TopBanner'
import MobileMenu from './MobileMenu'

const navItems = [
  { label: 'Products', hasSubmenu: true, subLabel: 'With $400 Gifts' },
  { label: 'Product Demo', href: '/demoroom', hot: true },
  { label: 'Software', hasSubmenu: true },
  { label: 'Make It Real', hasSubmenu: true },
  { label: 'About Us', href: '/about-us' },
  { label: 'Blog', href: '/blogs' },
  { label: 'Support', hasSubmenu: true },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <TopBanner />
      
      <header
        className={`sticky top-0 z-30 bg-white transition-shadow duration-300 ${
          scrolled ? 'shadow-md' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a href="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary">aulumu</span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.hasSubmenu && setOpenSubmenu(item.label)}
                  onMouseLeave={() => setOpenSubmenu(null)}
                >
                  {item.hasSubmenu ? (
                    <button className="flex items-center gap-1 py-6 text-text-main hover:text-accent transition-colors font-medium">
                      {item.label}
                      {item.subLabel && (
                        <span className="text-xs bg-accent text-white px-2 py-0.5 rounded-full">
                          {item.subLabel}
                        </span>
                      )}
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  ) : (
                    <a
                      href={item.href || '#'}
                      className="flex items-center gap-1 py-6 text-text-main hover:text-accent transition-colors font-medium"
                    >
                      {item.label}
                      {item.hot && (
                        <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                          HOT
                        </span>
                      )}
                    </a>
                  )}

                  {/* Submenu */}
                  {item.hasSubmenu && openSubmenu === item.label && (
                    <div className="absolute top-full left-0 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2">
                      <a href="#" className="block px-4 py-3 text-text-main hover:bg-gray-50 transition-colors">
                        Product 1
                      </a>
                      <a href="#" className="block px-4 py-3 text-text-main hover:bg-gray-50 transition-colors">
                        Product 2
                      </a>
                      <a href="#" className="block px-4 py-3 text-text-main hover:bg-gray-50 transition-colors">
                        Product 3
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Search">
                <svg className="w-6 h-6 text-text-main" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Cart */}
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Cart">
                <svg className="w-6 h-6 text-text-main" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </button>

              {/* User */}
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors hidden sm:block" aria-label="User">
                <svg className="w-6 h-6 text-text-main" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <svg className="w-6 h-6 text-text-main" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  )
}
