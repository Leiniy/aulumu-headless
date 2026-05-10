'use client'

import { useState, useEffect } from 'react'
import { getProductsBySkuList, type ShopifyProduct } from '@/lib/shopify'

type Props = {
  title?: string
  sku_list: string[]
}

export default function ProductShowcaseClient({ title = '精选商品', sku_list }: Props) {
  const [products, setProducts] = useState<ShopifyProduct[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!sku_list?.length) {
      setLoading(false)
      return
    }

    let ignore = false

    async function load() {
      const fetched = await getProductsBySkuList(sku_list)
      if (!ignore) {
        setProducts(fetched)
        setLoading(false)
      }
    }

    load()
    return () => { ignore = true }
  }, [sku_list.join(',')])

  return (
    <section className="py-20 max-w-4xl mx-auto px-6">
      <h2 className="text-3xl font-bold text-center mb-2">{title}</h2>
      <p className="text-center text-gray-500 mb-10">精选商品展示</p>

      {loading ? (
        <div className="text-center text-gray-400 py-20">加载中...</div>
      ) : products.length === 0 ? (
        <div className="text-center text-gray-400 py-20">
          未找到商品（SKU 未设置或商品不存在）
          <br />
          <span className="text-sm">查询的 SKU: {sku_list.join(', ')}</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => {
            const image = product.images.edges[0]?.node.url
            const price = product.priceRange.minVariantPrice.amount
            const currency = product.priceRange.minVariantPrice.currencyCode
            return (
              <div key={product.id} className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                {image ? (
                  <img src={image} alt={product.title} className="w-full h-56 object-cover" />
                ) : (
                  <div className="w-full h-56 bg-gray-100 flex items-center justify-center text-gray-400">无图片</div>
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
                  <p className="text-accent font-bold text-xl">
                    ${price} {currency}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}