'use client'

import React from 'react'
import { useCart } from '@/lib/cart-context'
import AddToCart from '@/components/ui/AddToCart'

type Props = {
  products: Array<{
    id: string
    title: string
    handle: string
    description: string
    priceRange: { minVariantPrice: { amount: string; currencyCode: string } }
    images: { edges: Array<{ node: { url: string; altText: string } }> }
    variants: { edges: Array<{ node: { id: string } }> }
  }>
}

export default function ProductGrid({ products }: Props) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p>No products found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => {
        const imageUrl = product.images.edges[0]?.node.url
        const variantId = product.variants.edges[0]?.node.id || product.id
        const price = product.priceRange.minVariantPrice.amount
        const currency = product.priceRange.minVariantPrice.currencyCode

        return (
          <div key={product.id} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:border-accent/20 transition-all duration-300">
            {/* Image */}
            <div className="aspect-square bg-gray-50 relative overflow-hidden">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={product.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-300">
                  <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-5">
              <h3 className="font-bold text-primary text-base mb-1 truncate group-hover:text-accent transition-colors">
                {product.title}
              </h3>
              <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">
                {product.description}
              </p>
              <p className="text-accent font-extrabold text-xl mb-4">
                ${parseFloat(price).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>

              <a
                href={`https://vbiwbf-ev.myshopify.com/products/${product.handle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-2.5 text-center text-sm font-semibold border-2 border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-colors mb-2"
              >
                View Details →
              </a>

              <AddToCart
                product={{
                  id: product.id,
                  title: product.title,
                  handle: product.handle,
                  price,
                  currency,
                  image: imageUrl || '',
                  variantId,
                }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}