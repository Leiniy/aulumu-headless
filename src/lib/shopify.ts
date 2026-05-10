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
      }
    }>
  }
}

export interface ShopifyPage {
  id: string
  title: string
  handle: string
  body: string
}

async function shopifyFetch<T = any>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(`https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN!,
    },
    body: JSON.stringify({ query, variables }),
  })
  if (!res.ok) throw new Error(`Shopify API error: ${res.status}`)
  const json = await res.json()
  if (json.errors) throw new Error(json.errors[0].message)
  return json.data
}

export async function getProducts(first = 12): Promise<ShopifyProduct[]> {
  if (!SHOPIFY_DOMAIN || !STOREFRONT_TOKEN) {
    return getMockProducts()
  }
  try {
    const data = await shopifyFetch<{ products: { edges: Array<{ node: ShopifyProduct }> } }>(
      `query getProducts($first: Int!) {
        products(first: $first) {
          edges {
            node {
              id title handle description
              priceRange { minVariantPrice { amount currencyCode } }
              images(first: 1) { edges { node { url altText } } }
              variants(first: 1) { edges { node { id } } }
            }
          }
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

export async function getPage(handle: string): Promise<ShopifyPage | null> {
  if (!SHOPIFY_DOMAIN || !STOREFRONT_TOKEN) {
    return null
  }
  try {
    const data = await shopifyFetch<{ page: ShopifyPage | null }>(
      `query getPage($handle: String!) {
        page(handle: $handle) {
          id title handle body
        }
      }`,
      { handle }
    )
    return data.page
  } catch {
    return null
  }
}

export async function getProductsByHandles(handles: string[]): Promise<ShopifyProduct[]> {
  if (!SHOPIFY_DOMAIN || !STOREFRONT_TOKEN || handles.length === 0) {
    return []
  }
  try {
    const data = await shopifyFetch<{ products: { edges: Array<{ node: ShopifyProduct }> } }>(
      `query getProductsByHandles($handles: [String!]!) {
        products(first: 250) {
          edges {
            node {
              id title handle description
              priceRange { minVariantPrice { amount currencyCode } }
              images(first: 1) { edges { node { url altText } } }
              variants(first: 1) { edges { node { id } } }
            }
          }
        }
      }`,
      {}
    )
    const allProducts = data.products.edges.map((e) => e.node)
    return allProducts.filter((p) => handles.includes(p.handle))
  } catch {
    return []
  }
}

function getMockProducts(): ShopifyProduct[] {
  return [
    {
      id: 'mock-1',
      title: 'aulumu E1 UV Printer',
      handle: 'aulumu-e1',
      description: "The World's First Personal 3D-Texture UV Printer with Amass3D\u00ae Technology",
      priceRange: { minVariantPrice: { amount: '1299.00', currencyCode: 'USD' } },
      images: { edges: [{ node: { url: 'https://cdn.shopify.com/s/files/1/0784/0207/9580/files/e1-printer.jpg', altText: 'aulumu E1 UV Printer' } }] },
      variants: { edges: [{ node: { id: 'mock-variant-1' } }] },
    },
  ]
}