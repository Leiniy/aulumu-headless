import type { ShopifyPage } from './shopify'

export interface ShopifyPageMetafield {
  key: string
  namespace: string
  value: string
}

// ─── Metafield 值解析 ───────────────────────────────────────────────────────
// components namespace 的值会被 <p> 标签包裹，需要先剥离
// 同名 key 优先使用 components namespace（Metafield Lite 编辑的），回退到 custom

function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim()
}

function tryParseValue(raw: string): unknown {
  let val = raw
  if (val.startsWith('<')) val = stripHtmlTags(val)
  try {
    let parsed = JSON.parse(val)
    if (typeof parsed === 'string') parsed = JSON.parse(parsed)

    // 对象数组按属性名聚合：
    // [{title:"A",image:"..."}] → {title:["A"],image:["..."]}
    if (Array.isArray(parsed) && parsed.length > 0 && typeof parsed[0] === 'object' && parsed[0] !== null) {
      const aggregated: Record<string, any[]> = {}
      for (const item of parsed) {
        if (typeof item === 'object' && item !== null) {
          for (const [k, v] of Object.entries(item)) {
            if (!aggregated[k]) aggregated[k] = []
            aggregated[k].push(v)
          }
        }
      }
      return aggregated
    }

    return parsed
  } catch {
    return null
  }
}

/**
 * 将原始 metafields 转为按 namespace 分组的对象
 * 结构: { [namespace]: { [key]: parsedValue } }
 * 例如: { custom: { text: [...], banner: [...] }, components: { text: [...], banner111: [...] } }
 */
export function parseMetafields(metafields?: ShopifyPageMetafield[] | null): Record<string, Record<string, any>> {
  if (!metafields || metafields.length === 0) return {}

  const result: Record<string, Record<string, any>> = {}
  for (const mf of metafields) {
    if (!mf.value) continue
    const parsed = tryParseValue(mf.value)
    if (parsed === null) continue

    if (!result[mf.namespace]) {
      result[mf.namespace] = {}
    }
    result[mf.namespace][mf.key] = parsed
  }
  return result
}

// ─── 统一模板 Props 类型 ────────────────────────────────────────────────────
export interface TemplateProps {
  page: ShopifyPage
  metafields: Record<string, Record<string, any>>
}
