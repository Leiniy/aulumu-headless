'use client'

import React from 'react'

export default function TopBanner() {
  return (
    <div className="bg-primary text-white py-2 px-4 text-center text-sm">
      <span className="text-white">
        In stock and ships in 72 Hours. Buy E1 now and get up to $400 off and $400+ free gifts 馃巵
      </span>
      <a 
        href="/products/aulumu-e1" 
        className="ml-2 underline hover:no-underline font-medium"
      >
        Buy Now 鈫?      </a>
    </div>
  )
}
