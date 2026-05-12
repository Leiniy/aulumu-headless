import type { TemplateProps } from '@/lib/section-types'

export default function BlogList({ page, metafields }: TemplateProps) {
  return (
    <div className="min-h-screen bg-white">
      <script dangerouslySetInnerHTML={{ __html: `console.log('[metafields]', ${JSON.stringify(metafields)});` }} />
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-primary mb-6">{page.title}</h1>
        <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: page.body || '' }} />
      </div>
    </div>
  )
}