import { notFound } from 'next/navigation'
import { getPageWithMetafields } from '@/lib/shopify'
import { pageRoutes } from '@/main'
import { parseMetafields } from '@/lib/section-types'

// 每次请求都重新获取数据，不使用缓存
export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function Page({ params }: Props) {
  const { slug } = await params

  const route = pageRoutes.find((r) => r.handle === slug)
  if (!route) notFound()

  const shopifyPage = await getPageWithMetafields(slug)
  if (!shopifyPage) notFound()

  const metafields = parseMetafields(shopifyPage.metafields)
  const Template = (await import(`@/templates/${route.group}/${route.template}/index.tsx`)).default
  return <Template page={shopifyPage} metafields={metafields} />
}