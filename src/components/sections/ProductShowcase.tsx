'use client'

import React, { useState, useEffect } from 'react'
import { getProducts, getPage, getProductsByHandles } from '@/lib/shopify'
import ProductGrid from './ProductGrid'
import type { ShopifyProduct } from '@/lib/shopify'

export default function ProductShowcase() {
  const [products, setProducts] = useState<ShopifyProduct[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        // 1. 先读取 Home 页面的内容
        const page = await getPage('home')

        let displayProducts: ShopifyProduct[]

        if (page?.body) {
          // 2. 解析页面内容中的商品 handle 数组
          try {
            const handles: string[] = JSON.parse(page.body)
            if (Array.isArray(handles) && handles.length > 0) {
              // 3. 按 handle 获取指定商品
              const filtered = await getProductsByHandles(handles)
              displayProducts = filtered
            } else {
              displayProducts = await getProducts(12)
            }
          } catch {
            // JSON 解析失败，默认加载全部
            displayProducts = await getProducts(12)
          }
        } else {
          // 页面为空，默认加载全部
          displayProducts = await getProducts(12)
        }

        setProducts(displayProducts)
      } catch (err) {
        console.error('Failed to load products:', err)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
            Shop Our Products
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Discover our range of personal UV printing solutions
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
                <div className="aspect-square bg-gray-200" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                  <div className="h-6 bg-gray-200 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p>No products found. Add product handles to the Home page body in Shopify.</p>
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
    </section>
  )
}