import { notFound } from 'next/navigation'
import { getPageWithMetafields } from '@/lib/shopify'
import { pageRoutes } from '@/main'

type Props = {
  params: Promise<{ slug: string }>
}

function parseMetafield(metafields: Array<{key: string; namespace: string; value: string}> | null | undefined) {
  const mf = metafields?.find((m) => m.namespace === 'custom' && m.key === 'page')
  if (!mf?.value) return []
  try {
    let parsed = JSON.parse(mf.value)
    if (typeof parsed === 'string') parsed = JSON.parse(parsed)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params

  const route = pageRoutes.find((r) => r.handle === slug)
  if (!route) notFound()

  const shopifyPage = await getPageWithMetafields(slug)
  if (!shopifyPage) notFound()

  const sections = parseMetafield(shopifyPage.metafields)
  const Template = (await import(`@/templates/${route.group}/${route.template}/index.tsx`)).default
  return <Template page={shopifyPage} sections={sections} />
}