export interface ShopifyPageMetafield {
  key: string
  namespace: string
  value: string
}

// ─── Hero ────────────────────────────────────────────────────────────────────
export interface HeroSection {
  type: 'hero'
  title: string
  subtitle: string
  image: string
  ctaText: string
  ctaUrl: string
}

// ─── Features ─────────────────────────────────────────────────────────────────
export interface FeaturesSection {
  type: 'features'
  title: string
  items: string[]
}

// ─── Banner ──────────────────────────────────────────────────────────────────
export interface BannerSection {
  type: 'banner'
  title: string
  subtitle: string
  url: string
}

// ─── Products ─────────────────────────────────────────────────────────────────
export interface ProductsSection {
  type: 'products'
  title: string
  sku_list?: string[]
}

// ─── Union ────────────────────────────────────────────────────────────────────
export type PageSection = HeroSection | FeaturesSection | BannerSection | ProductsSection

// ─── Parse metafield value ───────────────────────────────────────────────────
export function parsePageSections(value: string): PageSection[] {
  if (!value) return []
  try {
    let parsed = JSON.parse(value)
    if (typeof parsed === 'string') parsed = JSON.parse(parsed)
    if (Array.isArray(parsed)) return parsed as PageSection[]
    return []
  } catch {
    return []
  }
}