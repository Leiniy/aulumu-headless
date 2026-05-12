// Shopify API clients

// ─── Storefront API (公开，用于商品查询) ────────────────────────────────────
const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN

// ─── Admin API (服务端专用，用于读取 metafields，不需要定义) ─────────────────
const ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN

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

// ─── Storefront API fetch ────────────────────────────────────────────────────
async function storefrontFetch<T = any>(query: string, variables?: Record<string, unknown>, signal?: AbortSignal): Promise<T> {
  const res = await fetch(`https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN!,
    },
    body: JSON.stringify({ query, variables }),
    signal,
  })
  if (!res.ok) throw new Error(`Storefront API error: ${res.status}`)
  const json = await res.json()
  if (json.errors) {
    console.error('[shopify:storefront] GraphQL errors:', JSON.stringify(json.errors, null, 2))
    throw new Error(json.errors[0].message)
  }
  return json.data
}

// ─── Admin API fetch ─────────────────────────────────────────────────────────
async function adminFetch<T = any>(query: string, variables?: Record<string, unknown>, signal?: AbortSignal): Promise<T> {
  const res = await fetch(`https://${SHOPIFY_DOMAIN}/admin/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': ADMIN_TOKEN!,
    },
    body: JSON.stringify({ query, variables }),
    signal,
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`Admin API error: ${res.status}`)
  const json = await res.json()
  if (json.errors) {
    console.error('[shopify:admin] GraphQL errors:', JSON.stringify(json.errors, null, 2))
    throw new Error(json.errors[0].message)
  }
  return json.data
}

// ─── Products (Storefront API) ───────────────────────────────────────────────
export async function getProducts(first = 12): Promise<ShopifyProduct[]> {
  if (!SHOPIFY_DOMAIN || !STOREFRONT_TOKEN) return getMockProducts()
  try {
    const data = await storefrontFetch<{ products: { edges: Array<{ node: ShopifyProduct }> } }>(
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

// ─── Page + Metafields (Admin API) ──────────────────────────────────────────
// Admin API 不需要 metafield 定义就能读取，适配 Metafield Lite 创建的数据
export async function getPage(handle: string, signal?: AbortSignal): Promise<ShopifyPage | null> {
  if (!SHOPIFY_DOMAIN) {
    console.warn('[shopify] Missing SHOPIFY_DOMAIN')
    return null
  }

  // 优先使用 Admin API（不需要 metafield 定义）
  if (ADMIN_TOKEN) {
    try {
      return await getPageViaAdmin(handle, signal)
    } catch (err) {
      console.error('[shopify:admin] getPage error, falling back to Storefront:', err)
    }
  }

  // 回退到 Storefront API
  if (STOREFRONT_TOKEN) {
    try {
      return await getPageViaStorefront(handle, signal)
    } catch (err) {
      console.error('[shopify:storefront] getPage error:', err)
    }
  }

  console.warn('[shopify] No API token available')
  return null
}

async function getPageViaAdmin(handle: string, signal?: AbortSignal): Promise<ShopifyPage | null> {
  // Admin API 用 pages(query:) 查询，调试已验证此方式可用
  const data = await adminFetch<any>(
    `query getPage($first: Int!, $query: String) {
      pages(first: $first, query: $query) {
        edges {
          node {
            id title handle body
            metafields(first: 50) {
              edges { node { key namespace value } }
            }
          }
        }
      }
    }`,
    { first: 1, query: `handle:${handle}` },
    signal
  )
  const edge = data.pages?.edges?.[0]
  if (!edge) return null
  const page = edge.node

  const metafields = page.metafields?.edges?.map((e: any) => ({
    key: e.node.key,
    namespace: e.node.namespace,
    value: e.node.value,
  })) ?? []

  return { id: page.id, title: page.title, handle: page.handle, body: page.body || '', metafields }
}

async function getPageViaStorefront(handle: string, signal?: AbortSignal): Promise<ShopifyPage | null> {
  // Storefront API 的 metafields 必须带 identifiers，无法列出所有 key
  // 所以 Storefront 回退只返回页面基本信息，不带 metafields
  const data = await storefrontFetch<any>(
    `query getPage($handle: String!) {
      page(handle: $handle) {
        id title handle body
      }
    }`,
    { handle },
    signal
  )
  const page = data.page
  if (!page) return null

  return { id: page.id, title: page.title, handle: page.handle, body: page.body || '', metafields: [] }
}

export const getPageWithMetafields = getPage

// ─── Products by handles (Storefront API) ────────────────────────────────────
export async function getProductsByHandles(handles: string[], signal?: AbortSignal): Promise<ShopifyProduct[]> {
  if (!SHOPIFY_DOMAIN || !STOREFRONT_TOKEN || handles.length === 0) return []
  try {
    const data = await storefrontFetch<{ products: { edges: Array<{ node: ShopifyProduct }> } }>(
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
    const data = await storefrontFetch<{ products: { edges: Array<{ node: ShopifyProduct }> } }>(
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
