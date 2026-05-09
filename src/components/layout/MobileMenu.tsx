'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

const navItems = [
  { label: 'Products', hasSubmenu: true, subLabel: 'With $400 Gifts' },
  { label: 'Product Demo', href: '/demoroom', hot: true },
  { label: 'Software', hasSubmenu: true },
  { label: 'Make It Real', hasSubmenu: true },
  { label: 'About Us', href: '/about-us' },
  { label: 'Blog', href: '/blogs' },
  { label: 'Support', hasSubmenu: true },
]

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={onClose}
          />
          
          {/* Menu Panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 left-0 bottom-0 w-80 max-w-full bg-white z-50 md:hidden overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <span className="text-xl font-bold text-primary">Menu</span>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close menu"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav className="space-y-1">
                {navItems.map((item) => (
                  <div key={item.label}>
                    {item.hasSubmenu ? (
                      <div>
                        <button
                          onClick={() => toggleSubmenu(item.label)}
                          className="w-full flex items-center justify-between py-3 px-4 text-text-main hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <span className="font-medium flex items-center gap-2">
                            {item.label}
                            {item.subLabel && (
                              <span className="text-xs bg-accent text-white px-2 py-0.5 rounded-full">
                                {item.subLabel}
                              </span>
                            )}
                          </span>
                          <svg
                            className={`w-5 h-5 transition-transform ${openSubmenu === item.label ? 'rotate-180' : ''}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {openSubmenu === item.label && (
                          <div className="pl-8 py-2 space-y-1">
                            <a href="#" className="block py-2 text-text-muted hover:text-accent transition-colors">
                              Sub Item 1
                            </a>
                            <a href="#" className="block py-2 text-text-muted hover:text-accent transition-colors">
                              Sub Item 2
                            </a>
                          </div>
                        )}
                      </div>
                    ) : (
                      <a
                        href={item.href || '#'}
                        className="flex items-center gap-2 py-3 px-4 text-text-main hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        {item.label}
                        {item.hot && (
                          <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                            HOT
                          </span>
                        )}
                      </a>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
