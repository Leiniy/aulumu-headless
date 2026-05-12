import { NextResponse } from 'next/server'

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
const ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const handle = searchParams.get('handle') || 'home'

  const results: Record<string, any> = {
    env: {
      SHOPIFY_DOMAIN: !!SHOPIFY_DOMAIN,
      STOREFRONT_TOKEN: !!STOREFRONT_TOKEN,
      ADMIN_TOKEN: !!ADMIN_TOKEN,
    },
  }

  // ─── Admin API 测试 ─────────────────────────────────────────────────────
  if (ADMIN_TOKEN && SHOPIFY_DOMAIN) {
    // 测试 A: Admin API 用 pages 查询
    const adminQuery1 = `query($first: Int!, $query: String) {
      pages(first: $first, query: $query) {
        edges { node { id title handle metafields(first: 20) { edges { node { key namespace value } } } } }
      }
    }`

    try {
      const res = await fetch(`https://${SHOPIFY_DOMAIN}/admin/api/2024-01/graphql.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Shopify-Access-Token': ADMIN_TOKEN },
        body: JSON.stringify({ query: adminQuery1, variables: { first: 5, query: `handle:${handle}` } }),
      })
      results.admin_test1_pagesQuery = await res.json()
    } catch (e: any) {
      results.admin_test1_error = e.message
    }

    // 测试 B: Admin API REST 方式直接查 metafields
    try {
      const res = await fetch(`https://${SHOPIFY_DOMAIN}/admin/api/2024-01/pages.json`, {
        headers: { 'X-Shopify-Access-Token': ADMIN_TOKEN },
      })
      const data = await res.json()
      results.admin_test2_restPages = data.pages?.map((p: any) => ({ id: p.id, title: p.title, handle: p.handle }))
    } catch (e: any) {
      results.admin_test2_error = e.message
    }
  } else {
    results.admin_skipped = 'No ADMIN_TOKEN'
  }

  // ─── Storefront API 测试（仅页面信息） ─────────────────────────────────────
  if (STOREFRONT_TOKEN && SHOPIFY_DOMAIN) {
    const sfQuery = `query getPage($handle: String!) {
      page(handle: $handle) { id title handle }
    }`
    try {
      const res = await fetch(`https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN },
        body: JSON.stringify({ query: sfQuery, variables: { handle } }),
      })
      results.storefront_pageInfo = await res.json()
    } catch (e: any) {
      results.storefront_error = e.message
    }
  }

  return NextResponse.json(results, { status: 200 })
}
