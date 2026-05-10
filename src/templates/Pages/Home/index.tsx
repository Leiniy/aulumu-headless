import { renderSections } from '@/lib/section-renderer'

type Props = {
  sections: Array<{ type: string; [key: string]: unknown }>
}

export default function Home({ sections }: Props) {
  return <div className="min-h-screen bg-white">{renderSections(sections)}</div>
}