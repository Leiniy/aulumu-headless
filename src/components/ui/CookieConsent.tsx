'use client'

import React, { useState, useEffect } from 'react'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setVisible(true)
    }
  }, [])

  const acceptAll = () => {
    localStorage.setItem('cookie-consent', 'all')
    setVisible(false)
  }

  const acceptEssential = () => {
    localStorage.setItem('cookie-consent', 'essential')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 md:flex md:items-center md:justify-between">
        <div className="mb-4 md:mb-0 md:mr-8">
          <h3 className="text-lg font-semibold text-text-main mb-2">We Value Your Privacy</h3>
          <p className="text-text-muted text-sm">
            We use cookies and similar technologies on our website to provide the service you request. 
            You can &quot;Accept All Cookies&quot; or &quot;Accept Only Essential Cookies&quot;.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={acceptEssential}
            className="px-5 py-2.5 text-sm font-medium text-text-main border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Accept Only Essential Cookies
          </button>
          <button
            onClick={acceptAll}
            className="px-5 py-2.5 text-sm font-medium text-white bg-accent rounded-lg hover:bg-accent-hover transition-colors"
          >
            Accept All Cookies
          </button>
        </div>
      </div>
    </div>
  )
}
