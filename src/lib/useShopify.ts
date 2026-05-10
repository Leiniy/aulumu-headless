'use client'

import { useState, useEffect, useRef } from 'react'
import { getPageWithMetafields, getProductsBySkuList, type ShopifyPage, type ShopifyProduct } from '@/lib/shopify'

interface UsePageDataOptions {
  handle: string
}

interface UsePageDataResult {
  page: ShopifyPage | null
  products: ShopifyProduct[]
  loading: boolean
  error: Error | null
}

export function usePageData({ handle }: UsePageDataOptions): UsePageDataResult {
  const [page, setPage] = useState<ShopifyPage | null>(null)
  const [products, setProducts] = useState<ShopifyProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const latestControllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    if (!handle) return

    const controller = new AbortController()
    latestControllerRef.current = controller

    // 重置状态
    setLoading(true)
    setError(null)

    let ignore = false

    async function load() {
      try {
        const pageData = await getPageWithMetafields(handle, controller.signal)

        // 如果组件已卸载，忽略
        if (ignore) return

        if (!pageData) {
          setError(new Error('Page not found'))
          setLoading(false)
          return
        }

        setPage(pageData)

        // 解析 metafield，取 sku_list
        const metafield = pageData.metafields?.find(
          (m) => m.namespace === 'custom' && m.key === 'page'
        )

        let skuList: string[] = []

        if (metafield?.value) {
          try {
            let parsed = JSON.parse(metafield.value)
            if (typeof parsed === 'string') parsed = JSON.parse(parsed)

            // 情况1：顶层 sections.products.sku_list
            const sec = parsed?.sections?.products
            if (sec?.sku_list && Array.isArray(sec.sku_list)) {
              skuList = sec.sku_list.filter((s: unknown): s is string => typeof s === 'string')
            }

            // 情况2：直接是数组格式（当前格式）
            if (skuList.length === 0 && Array.isArray(parsed)) {
              const productsItem = parsed.find((item: any) => item.type === 'products')
              if (productsItem?.sku_list && Array.isArray(productsItem.sku_list)) {
                skuList = productsItem.sku_list.filter((s: unknown): s is string => typeof s === 'string')
              }
            }
          } catch {
            // ignore
          }
        }

        // 取到商品后直接设置，不管 loading 状态
        if (skuList.length > 0) {
          const fetched = await getProductsBySkuList(skuList, controller.signal)
          if (ignore) return
          setProducts(fetched)
        } else {
          if (ignore) return
          setProducts([])
        }
      } catch (err) {
        if (ignore) return
        if ((err as Error).name === 'AbortError') return
        console.error('usePageData error:', err)
        setError(err as Error)
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    load()

    return () => {
      ignore = true
      controller.abort()
    }
  }, [handle])

  return { page, products, loading, error }
}