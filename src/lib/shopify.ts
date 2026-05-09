// Shopify Storefront API client
// This module provides functions to fetch data from Shopify Storefront API
// Currently using mock data - replace with real API calls when Shopify store is configured

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN

interface ShopifyProduct {
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
}

export async function getProducts(): Promise<ShopifyProduct[]> {
  // If no Shopify credentials, return mock data
  if (!SHOPIFY_DOMAIN || !STOREFRONT_TOKEN) {
    console.warn('Shopify credentials not configured, using mock data')
    return getMockProducts()
  }

  const query = `
    query getProducts {
      products(first: 10) {
        edges {
          node {
            id
            title
            handle
            description
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  `

  try {
    const response = await fetch(`https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query }),
    })

    const data = await response.json()
    return data.data?.products?.edges?.map((edge: any) => edge.node) || []
  } catch (error) {
    console.error('Shopify API error:', error)
    return getMockProducts()
  }
}

function getMockProducts(): ShopifyProduct[] {
  return [
    {
      id: 'mock-1',
      title: 'aulumu E1 UV Printer',
      handle: 'aulumu-e1',
      description: 'The World\'s First Personal 3D-Texture UV Printer with Amass3D鈩?Technology',
      priceRange: {
        minVariantPrice: { amount: '1299.00', currencyCode: 'USD' },
      },
      images: {
        edges: [{
          node: {
            url: 'https://cdn.shopify.com/s/files/1/0784/0207/9580/files/e1-printer.jpg',
            altText: 'aulumu E1 UV Printer',
          },
        }],
      },
    },
  ]
}
