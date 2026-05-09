'use client'

import React, { useState, useEffect } from 'react'

const testimonials = [
  {
    name: 'Kyouki',
    title: 'IT Manager',
    quote: 'The aulumu E1 UV is for anyone who wants to make their world a little more beautiful and unique with high-quality, colorful designs.',
  },
  {
    name: 'Kasper',
    title: 'IT Technician',
    quote: 'Such an easy and fun way to bring your creativity to life! I\'m so impressed with the high quality of the prints I made that I\'m thinking of selling custom water bottles using this machine!',
  },
  {
    name: 'Emma Taylor',
    title: 'Graphic Designer & Laser Cutting Specialist',
    quote: 'The innovation in this printer is a game changer. It is allowing me to create completely new products like nothing I\'ve seen before.',
  },
  {
    name: 'Velf Creations',
    title: 'Software Engineer',
    quote: 'We\'re thrilled with how the aulumu E1 complements our laser and 3D printers. It\'s expanded our project scope, allowing us to combine different techniques and materials.',
  },
  {
    name: 'Fern Joseph',
    title: 'Graphic Designer & SMB Owner',
    quote: 'I\'ve used sublimation and heat presses in the past for mug and coasters, and it was a struggle getting colours to show true. I can now print direct to product, with excellent colour representation.',
  },
  {
    name: 'Skye Blacklegde',
    title: 'Social Media & Customer Service Manager',
    quote: 'The aulumu E1 has unlocked so many opportunities to add my own flair and customization to items I use every day.',
  },
]

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isPaused])

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
            Creators Like You, Making It Real
          </h2>
        </div>

        {/* Testimonial Carousel */}
        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Testimonial */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 lg:p-12 text-center">
            <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl font-bold text-accent">
                {testimonials[currentIndex].name[0]}
              </span>
            </div>
            <blockquote className="text-xl lg:text-2xl text-text-main leading-relaxed mb-6">
              &quot;{testimonials[currentIndex].quote}&quot;
            </blockquote>
            <div className="mt-4">
              <p className="font-bold text-primary">{testimonials[currentIndex].name}</p>
              <p className="text-text-muted text-sm">{testimonials[currentIndex].title}</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-text-main hover:bg-gray-200 transition-colors"
              aria-label="Previous testimonial"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex gap-1">
              {testimonials.map((_, index) => (
                <span
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentIndex === index ? 'bg-accent w-6' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-text-main hover:bg-gray-200 transition-colors"
              aria-label="Next testimonial"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
