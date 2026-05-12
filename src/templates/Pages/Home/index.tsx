import type { TemplateProps } from '@/lib/section-types'

export default function Home({ page, metafields }: TemplateProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* 浏览器控制台可查看 metafields 全部数据 */}
      <script
        dangerouslySetInnerHTML={{
          __html: `console.log('[metafields]', ${JSON.stringify(metafields)});`,
        }}
      />
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-primary mb-6">{page.title}</h1>
        {/* TODO: 用 metafields 数据开发页面 */}
      </div>
    </div>
  )
}