'use client'

import React, { useState, useEffect, useRef } from 'react'
import TopBanner from './TopBanner'
import MobileMenu from './MobileMenu'
import CartDrawer from '@/components/ui/CartDrawer'
import { useCart } from '@/lib/cart-context'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)
  const { totalItems } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close drawer on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setCartOpen(false)
      }
    }
    if (cartOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [cartOpen])

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

            {/* Desktop Navigation — 后续从 Shopify 数据驱动 */}
            <nav className="hidden lg:flex items-center gap-8" />

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Search">
                <svg className="w-6 h-6 text-text-main" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Cart */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Cart"
              >
                <svg className="w-6 h-6 text-text-main" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md">
                    {totalItems}
                  </span>
                )}
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

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setCartOpen(false)} />

          {/* Drawer */}
          <div
            ref={drawerRef}
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col"
            style={{ animation: 'slideInRight 0.3s ease-out' }}
          >
            <button
              onClick={() => setCartOpen(false)}
              className="absolute right-4 top-4 z-10 w-10 h-10 flex items-center justify-center text-gray-400 hover:text-black transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <CartDrawer />
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>
  )
}
