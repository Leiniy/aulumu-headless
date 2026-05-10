'use client'

import React, { useState } from 'react'
import { useCart } from '@/lib/cart-context'

type Props = {
  product: {
    id: string
    title: string
    handle: string
    price: string
    currency: string
    image: string
    variantId: string
  }
}

export default function AddToCart({ product }: Props) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  function handleAdd() {
    addItem({
      variantId: product.variantId,
      quantity: 1,
      title: product.title,
      price: product.price,
      image: product.image,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <button
      onClick={handleAdd}
      className={`w-full py-3 text-sm font-bold rounded-full transition-all duration-200 ${
        added
          ? 'bg-green-500 text-white'
          : 'bg-accent text-white hover:bg-accent-hover shadow-md hover:scale-[1.02] active:scale-[0.98]'
      }`}
    >
      {added ? '✓ Added to Cart' : 'Add to Cart'}
    </button>
  )
}