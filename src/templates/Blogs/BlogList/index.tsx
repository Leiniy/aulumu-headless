import { renderSections } from '@/lib/section-renderer'

type Props = {
  page: { title: string; handle: string; body: string }
  sections: Array<{ type: string; [key: string]: unknown }>
}

export default function BlogList({ page, sections }: Props) {
  return (
    <div className="min-h-screen bg-white">
      {sections.length > 0 ? renderSections(sections) : (
        <div className="max-w-4xl mx-auto px-6 py-20">
          <h1 className="text-4xl font-bold text-primary mb-6">{page.title}</h1>
          <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: page.body || '' }} />
        </div>
      )}
    </div>
  )
}