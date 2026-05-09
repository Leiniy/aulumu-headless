# eufymake-headless - SPEC.md

## 1. Concept & Vision

基于 www.eufymake.com 的视觉风格和布局，为 Shopify 独立站搭建 Next.js 无头框架（Hydrogen/Storefront API 风格）用于页面展示。支付使用 Shopify 自带支付系统（Buy Button / Checkout），项目代码由 GitHub 管理，Netlify 实现自动化部署。

目标：本地 `npm run dev` 和 Netlify 线上都能正常运行。

---

## 2. Design Language

**Aesthetic:** 现代科技感、简洁大气，以深色为主色调，搭配亮色点缀。参考 eufymake.com 的品牌风格。

**Color Palette:**
```
--color-primary:     #1a1a2e   (深海军蓝，主背景)
--color-secondary:   #16213e   (深蓝，次级背景)
--color-accent:      #e94560   (玫红强调色)
--color-accent2:     #0f3460   (蓝色辅助)
--color-surface:     #ffffff   (卡片/内容区域)
--color-text:        #1a1a2e   (正文)
--color-text-light:  #6b7280   (次级文字)
--color-text-white:  #ffffff   (白色文字)
--color-border:      #e5e7eb   (边框)
--color-success:     #10b981
```

**Typography:**
```
--font-heading: 'Inter', system-ui, sans-serif  (标题: 700/800 weight)
--font-body:    'Inter', system-ui, sans-serif    (正文: 400/500 weight)
--font-mono:   'JetBrains Mono', monospace         (代码)
```

**Spatial System:**
```
--space-xs:  4px
--space-sm:  8px
--space-md:  16px
--space-lg:  24px
--space-xl:  40px
--space-2xl: 64px
--space-3xl: 96px
```

**Motion Philosophy:**
- 页面滚动入场动画（fade-up, 400ms ease-out, staggered 80ms）
- 按钮 hover: scale(1.02), 200ms ease
- 卡片 hover: translateY(-4px), shadow 增强
- Hero 文字: 渐入动画, 600ms

---

## 3. Layout & Structure

### 页面结构（参考 eufymake.com）

```
┌─────────────────────────────────────────┐
│ Top Banner (促销信息栏)                   │
├─────────────────────────────────────────┤
│ Header (Nav + Logo + Actions)            │
│  - Logo (Anker/Eufy 品牌)                │
│  - Nav: Products | Demo | Software |     │
│         Make It Real | About | Blog |    │
│         Support                         │
│  - Actions: Search | Cart | User         │
├─────────────────────────────────────────┤
│ Hero Section                            │
│  - 大图/Banner                           │
│  - 主标题 + 副标题                        │
│  - CTA Buttons (Learn More / Buy Now)   │
├─────────────────────────────────────────┤
│ Intro Section ("Hi, We're eufyMake")    │
├─────────────────────────────────────────┤
│ Features Grid ("Make It Real")          │
│  - Home Studio / Garage / Art Market     │
├─────────────────────────────────────────┤
│ Technology Section ("Innovation Is in   │
│ Our DNA")                               │
│  - Amass3D™ Technology Card             │
│  - 3 key features (5mm height / 300+     │
│    textures / Long-lasting colors)       │
├─────────────────────────────────────────┤
│ Product Showcase ("Compact Size")       │
│  - Desk-size / 3-in-1 Modular Design    │
├─────────────────────────────────────────┤
│ Workflow Section ("One-Stop Intelligent │
│ Workflow")                              │
│  - 3-slide carousel                      │
├─────────────────────────────────────────┤
│ Testimonials Section                    │
│  - 用户评价轮播                          │
├─────────────────────────────────────────┤
│ Press Section ("As Seen In")            │
├─────────────────────────────────────────┤
│ Newsletter Section                      │
│  - Email signup                         │
├─────────────────────────────────────────┤
│ Trust Badges (Free Shipping / 30-Day /  │
│ 1-Year Warranty / Support)             │
├─────────────────────────────────────────┤
│ Footer                                  │
│  - Products | Support | Discount |      │
│    Explore links                        │
│  - Social icons                         │
│  - Copyright                            │
└─────────────────────────────────────────┘
```

### Responsive Strategy
- Mobile-first, breakpoints: 640px / 768px / 1024px / 1280px
- Nav 在移动端折叠为汉堡菜单
- Hero 图片移动端缩放

---

## 4. Features & Interactions

### 核心功能
- **静态首页** - 完整复刻 eufymake.com 首页布局
- **响应式设计** - 全设备适配
- **Shopify Storefront 集成** - 商品展示（支付走 Shopify）
- **Netlify 自动化部署** - GitHub 触发自动构建
- **本地开发** - `npm run dev` 完整运行

### 交互细节
- **Cookie Consent Dialog** - 首次访问弹出
- **Nav 滚动效果** - 滚动后 Header 背景加深
- **Testimonials Carousel** - 自动轮播 + 手动切换
- **Workflow Slideshow** - 3 slides 自动轮播
- **Newsletter Form** - Email 验证 + 提交反馈
- **Mobile Menu** - 汉堡菜单展开动画
- **CTA Buttons** - hover scale 效果

### 错误处理
- 图片加载失败显示占位符
- Form 提交失败提示重试
- API 错误降级为静态内容

---

## 5. Component Inventory

| Component | States |
|-----------|--------|
| `<Header>` | default, scrolled, mobile-open |
| `<TopBanner>` | default |
| `<HeroSection>` | default |
| `<IntroSection>` | default |
| `<FeaturesGrid>` | default |
| `<TechSection>` | default |
| `<ProductShowcase>` | default |
| `<WorkflowSection>` | slide-1, slide-2, slide-3 |
| `<TestimonialsSection>` | auto-play, paused |
| `<PressSection>` | default |
| `<NewsletterSection>` | idle, loading, success, error |
| `<TrustBadges>` | default |
| `<Footer>` | default |
| `<CookieConsent>` | visible, hidden |
| `<MobileMenu>` | open, closed |

---

## 6. Technical Approach

### 框架 & 工具
- **Next.js 14** (App Router) - 主框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式
- **Shopify Storefront API** - 商品数据获取（可选）
- **next-intl** - 国际化（预留）
- **Framer Motion** - 动画

### 目录结构
```
eufymake-headless/
├── SPEC.md
├── README.md
├── .gitignore
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── .env.local.example
├── public/
│   └── favicon.ico
└── src/
    ├── app/
    │   ├── layout.tsx          (Root Layout)
    │   ├── page.tsx            (Home Page)
    │   ├── globals.css
    │   └── not-found.tsx
    ├── components/
    │   ├── layout/
    │   │   ├── Header.tsx
    │   │   ├── TopBanner.tsx
    │   │   ├── MobileMenu.tsx
    │   │   └── Footer.tsx
    │   ├── sections/
    │   │   ├── HeroSection.tsx
    │   │   ├── IntroSection.tsx
    │   │   ├── FeaturesGrid.tsx
    │   │   ├── TechSection.tsx
    │   │   ├── ProductShowcase.tsx
    │   │   ├── WorkflowSection.tsx
    │   │   ├── TestimonialsSection.tsx
    │   │   ├── PressSection.tsx
    │   │   ├── NewsletterSection.tsx
    │   │   └── TrustBadges.tsx
    │   └── ui/
    │       ├── Button.tsx
    │       ├── CookieConsent.tsx
    │       └── Badge.tsx
    ├── lib/
    │   └── shopify.ts          (Storefront API client)
    └── types/
        └── index.ts
```

### 部署
- **GitHub** - 仓库管理
- **Netlify** - 自动化部署（连接 GitHub repo）
- 构建命令: `npm run build`
- 发布目录: `.next`

### 环境变量
```
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=xxx
```
