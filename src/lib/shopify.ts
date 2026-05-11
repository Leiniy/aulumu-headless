// Shopify Storefront API client
const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN

export interface ShopifyProduct {
  id: string
  title: string
  handle: string
  description: string
  priceRange: {
    minVariantPrice: {
      amount: string
      currencyCode: string
    }
  }
  images: {
    edges: Array<{
      node: {
        url: string
        altText: string
      }
    }>
  }
  variants: {
    edges: Array<{
      node: {
        id: string
        sku?: string
        price: { amount: string; currencyCode: string }
      }
    }>
  }
}

export interface ShopifyPage {
  id: string
  title: string
  handle: string
  body: string
  metafields?: Array<{ key: string; namespace: string; value: string }>
}

async function shopifyFetch<T = any>(query: string, variables?: Record<string, unknown>, signal?: AbortSignal): Promise<T> {
  const res = await fetch(`https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN!,
    },
    body: JSON.stringify({ query, variables }),
    signal,
  })
  if (!res.ok) throw new Error(`Shopify API error: ${res.status}`)
  const json = await res.json()
  if (json.errors) throw new Error(json.errors[0].message)
  return json.data
}

export async function getProducts(first = 12): Promise<ShopifyProduct[]> {
  if (!SHOPIFY_DOMAIN || !STOREFRONT_TOKEN) return getMockProducts()
  try {
    const data = await shopifyFetch<{ products: { edges: Array<{ node: ShopifyProduct }> } }>(
      `query getProducts($first: Int!) {
        products(first: $first) {
          edges { node { id title handle description priceRange { minVariantPrice { amount currencyCode } } images(first: 1) { edges { node { url altText } } } variants(first: 1) { edges { node { id } } } } }
        }
      }`,
      { first }
    )
    return data.products.edges.map((e) => e.node)
  } catch (err) {
    console.error('Shopify API error:', err)
    return getMockProducts()
  }
}

export async function getPage(handle: string, signal?: AbortSignal): Promise<ShopifyPage | null> {
  if (!SHOPIFY_DOMAIN || !STOREFRONT_TOKEN) return null
  try {
    const data = await shopifyFetch<{ page: ShopifyPage | null }>(
      `query getPage($handle: String!) {
        page(handle: $handle) {
          id title handle body
          metafields(identifiers: [{namespace: "custom", key: "page"}]) { key namespace value }
        }
      }`,
      { handle },
      signal
    )
    return data.page
  } catch {
    return null
  }
}

export const getPageWithMetafields = getPage

export async function getProductsByHandles(handles: string[], signal?: AbortSignal): Promise<ShopifyProduct[]> {
  if (!SHOPIFY_DOMAIN || !STOREFRONT_TOKEN || handles.length === 0) return []
  try {
    const data = await shopifyFetch<{ products: { edges: Array<{ node: ShopifyProduct }> } }>(
      `query getProductsByHandles {
        products(first: 250) {
          edges { node { id title handle description priceRange { minVariantPrice { amount currencyCode } } images(first: 1) { edges { node { url altText } } } variants(first: 100) { edges { node { id sku price { amount currencyCode } } } } } }
        }
      }`,
      undefined,
      signal
    )
    return data.products.edges.map((e) => e.node).filter((p) => handles.includes(p.handle))
  } catch {
    return []
  }
}

export async function getProductsBySkuList(skuList: string[], signal?: AbortSignal): Promise<ShopifyProduct[]> {
  if (!SHOPIFY_DOMAIN || !STOREFRONT_TOKEN || skuList.length === 0) return []
  try {
    const data = await shopifyFetch<{ products: { edges: Array<{ node: ShopifyProduct }> } }>(
      `query getProducts($first: Int!) {
        products(first: $first) {
          edges { node { id title handle description priceRange { minVariantPrice { amount currencyCode } } images(first: 5) { edges { node { url altText } } } variants(first: 100) { edges { node { id sku price { amount currencyCode } } } } } }
        }
      }`,
      { first: 250 },
      signal
    )
    return data.products.edges.map((e) => e.node).filter((product) =>
      product.variants.edges.some((v) => skuList.includes(v.node.sku as string))
    )
  } catch {
    return []
  }
}

function getMockProducts(): ShopifyProduct[] {
  return [{
    id: 'mock-1', title: 'aulumu E1 UV Printer', handle: 'aulumu-e1',
    description: "The World's First Personal 3D-Texture UV Printer",
    priceRange: { minVariantPrice: { amount: '1299.00', currencyCode: 'USD' } },
    images: { edges: [{ node: { url: 'https://cdn.shopify.com/s/files/1/0784/0207/9580/files/e1-printer.jpg', altText: 'aulumu E1 UV Printer' } }] },
    variants: { edges: [{ node: { id: 'mock-variant-1', price: { amount: '0', currencyCode: 'USD' } } }] },
  }]
}