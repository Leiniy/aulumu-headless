'use client'

import React from 'react'

const showcases = [
  {
    title: 'Small Enough to Fit on Your Desk',
    description: 'Compact dimensions mean you can set up your creative workspace anywhere.',
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: '3-in-1 Modular Design',
    description: 'Print, cure, and finish—all in one seamless system.',
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
]

export default function ProductShowcase() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
            Compact Size, Limitless Possibilities
          </h2>
        </div>

        {/* Showcases */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {showcases.map((item, index) => (
            <div
              key={item.title}
              className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 lg:p-12 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-24 h-24 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-8">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">
                {item.title}
              </h3>
              <p className="text-text-muted text-lg">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
