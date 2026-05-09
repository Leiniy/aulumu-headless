# eufymake-headless

Next.js 无头框架项目，参考 www.eufymake.com 页面布局，用于 Shopify 独立站。

## 🚀 快速开始

### 安装依赖

```bash
cd eufymake-headless
npm install
```

### 本地开发

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看效果。

### 构建生产版本

```bash
npm run build
```

### 启动生产服务器

```bash
npm start
```

## 📁 项目结构

```
eufymake-headless/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root Layout
│   │   ├── page.tsx            # 首页
│   │   ├── globals.css         # 全局样式
│   │   └── not-found.tsx       # 404 页面
│   ├── components/
│   │   ├── layout/             # 布局组件
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── TopBanner.tsx
│   │   │   └── MobileMenu.tsx
│   │   ├── sections/           # 页面区块
│   │   │   ├── HeroSection.tsx
│   │   │   ├── IntroSection.tsx
│   │   │   ├── FeaturesGrid.tsx
│   │   │   ├── TechSection.tsx
│   │   │   ├── ProductShowcase.tsx
│   │   │   ├── WorkflowSection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   ├── PressSection.tsx
│   │   │   ├── NewsletterSection.tsx
│   │   │   └── TrustBadges.tsx
│   │   └── ui/                 # UI 基础组件
│   │       ├── Button.tsx
│   │       ├── Badge.tsx
│   │       └── CookieConsent.tsx
│   ├── lib/
│   │   └── shopify.ts          # Shopify Storefront API
│   └── types/
│       └── index.ts            # TypeScript 类型
├── public/                     # 静态资源
├── SPEC.md                     # 项目规范文档
├── package.json
├── tailwind.config.ts
├── next.config.ts
└── netlify.toml               # Netlify 部署配置
```

## 🌐 部署

### Netlify 自动化部署

1. 将代码推送到 GitHub 仓库
2. 在 [Netlify](https://netlify.com) 连接你的 GitHub 仓库
3. Netlify 会自动检测 Next.js 项目并配置构建命令
4. 部署完成后，每次 push 到 main 分支都会自动触发构建

### 环境变量

复制 `.env.local.example` 为 `.env.local` 并配置：

```bash
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-token
NEXT_PUBLIC_SITE_URL=https://your-site.netlify.app
```

## 💳 支付

本项目使用 Next.js 作为无头前端，支付功能通过 Shopify 自带的支付系统实现。

## 📝 许可证

Private - All rights reserved
