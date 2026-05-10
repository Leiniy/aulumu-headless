// 通用 section 渲染工具（供 templates 使用）

import ProductShowcaseClient from '@/components/ProductShowcaseClient'

type Section = {
  type: string
  [key: string]: unknown
}

// ─── Hero ───────────────────────────────────────────────────────────────────
function HeroSection({ image, title, subtitle, ctaText, ctaUrl }: {
  image: string; title: string; subtitle: string; ctaText?: string; ctaUrl?: string
}) {
  return (
    <section className="relative h-[500px] overflow-hidden">
      <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-8">
        <h1 className="text-5xl font-bold mb-4">{title}</h1>
        <p className="text-xl mb-8">{subtitle}</p>
        {ctaText && ctaUrl && (
          <a href={ctaUrl} className="px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100">
            {ctaText}
          </a>
        )}
      </div>
    </section>
  )
}

// ─── Features ───────────────────────────────────────────────────────────────
function FeaturesSection({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="py-20 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-6">
        {items.map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm text-center">
            <p className="font-semibold text-gray-800">{item}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Banner ─────────────────────────────────────────────────────────────────
function BannerSection({ title, subtitle, url }: { title: string; subtitle: string; url: string }) {
  return (
    <section className="py-16 bg-accent text-white text-center">
      <h2 className="text-3xl font-bold mb-2">{title}</h2>
      <p className="text-lg mb-4">{subtitle}</p>
      <a href={url} className="inline-block px-6 py-2 bg-white text-accent font-semibold rounded-lg">
        查看详情
      </a>
    </section>
  )
}

// ─── 渲染单个 section ────────────────────────────────────────────────────────
export function renderSection(section: Section, index: number) {
  switch (section.type) {
    case 'hero':
      return <HeroSection key={index} {...section as any} />
    case 'features':
      return <FeaturesSection key={index} {...section as any} />
    case 'banner':
      return <BannerSection key={index} {...section as any} />
    case 'products': {
      const s = section as any
      return (
        <ProductShowcaseClient
          key={index}
          title={s.title}
          sku_list={Array.isArray(s.sku_list) ? s.sku_list : []}
        />
      )
    }
    default:
      return null
  }
}

// ─── 渲染 sections 数组 ─────────────────────────────────────────────────────
export function renderSections(sections: Section[]) {
  return sections.map((section, i) => renderSection(section, i))
}