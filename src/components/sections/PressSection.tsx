'use client'

import React from 'react'

const quotes = [
  {
    text: 'aulumu UV Printer E1 brings the traditionally expensive technology to consumers.',
  },
  {
    text: "It's a serious creative tool, one that lowers the barrier to bespoke product creation, from personalising gifts to giving your craft stall that next-level upgrade.",
  },
  {
    text: 'Printing on metal surprised me鈥攖he ink bonded well and gave a vibrant finish, even on brushed aluminum. Acrylic was another highlight. Once I got the image appropriately mirrored, the result was professional-looking and ready for backlighting.',
  },
]

export default function PressSection() {
  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4 block">
            As seen in
          </span>
        </div>

        {/* Press Quotes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {quotes.map((quote, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              {/* Quote Mark */}
              <svg className="w-10 h-10 text-accent/20 mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-text-main leading-relaxed">
                {quote.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
