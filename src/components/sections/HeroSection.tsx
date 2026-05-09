'use client'

import React from 'react'
import Button from '@/components/ui/Button'

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary via-primary-light to-secondary overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
111
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            In Stock Now. Ships Within 72 Hours.
          </div>

          {/* Main Heading */}123123
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-tight mb-6 animate-fade-up">
            aulumu E1:
            <br className="hidden sm:block" />
            <span className="text-accent"> The World&apos;s First</span>
            <br className="hidden sm:block" />
            Personal 3D-Texture UV Printer
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: '100ms' }}>
            Limited-Time Offer, Save Up to $400 Off and Get Exclusive Gifts Worth $400+
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: '200ms' }}>
            <Button variant="primary" size="lg" className="w-full sm:w-auto">
              <a href="#features" className="block">Learn More</a>
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary">
              <a href="/products/aulumu-e1" className="block">Buy Now</a>
            </Button>
          </div>

          {/* Product Image Placeholder */}
          <div className="mt-16 relative animate-fade-up" style={{ animationDelay: '300ms' }}>
            <div className="relative w-full max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl aspect-video flex items-center justify-center border border-gray-700">
                <div className="text-center">
                  <svg className="w-24 h-24 mx-auto text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-gray-500 text-sm">Product Image</p>
                  <p className="text-gray-600 text-xs mt-1">Replace with aulumu E1 product image</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  )
}
