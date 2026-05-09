'use client'

import React, { useState } from 'react'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [agreed, setAgreed] = useState(true)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !agreed) return

    setStatus('loading')

    // Simulate API call
    setTimeout(() => {
      setStatus('success')
      setEmail('')
    }, 1500)
  }

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-primary via-primary-light to-secondary">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
          Subscribe for Starter Printing Guide & Extra Coupons
        </h2>

        {status === 'success' ? (
          <div className="mt-8 bg-white/10 backdrop-blur rounded-2xl p-8">
            <svg className="w-16 h-16 text-green-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-white text-xl font-medium">Thank you for subscribing!</p>
            <p className="text-gray-300 mt-2">Check your email for your Starter Printing Guide.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
                required
                className="flex-1 px-6 py-4 rounded-xl text-text-main focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                type="submit"
                disabled={status === 'loading' || !agreed}
                className="px-8 py-4 bg-accent text-white font-semibold rounded-xl hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Subscribing...' : 'Sign Up'}
              </button>
            </div>
            <div className="mt-4 flex items-center justify-center gap-2">
              <input
                type="checkbox"
                id="agree-terms"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-accent focus:ring-accent"
              />
              <label htmlFor="agree-terms" className="text-gray-300 text-sm">
                By subscribing, I agree to the{' '}
                <a href="/terms-of-use" className="underline hover:text-white">Terms of Use</a>{' '}
                and{' '}
                <a href="/privacy-policy" className="underline hover:text-white">Privacy Policy</a>.
              </label>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
