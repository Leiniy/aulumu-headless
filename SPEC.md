# aulumu-headless - SPEC.md

## 1. Concept & Vision

鍩轰簬 www.aulumu.com 鐨勮瑙夐鏍煎拰甯冨眬锛屼负 Shopify 鐙珛绔欐惌寤?Next.js 鏃犲ご妗嗘灦锛圚ydrogen/Storefront API 椋庢牸锛夌敤浜庨〉闈㈠睍绀恒€傛敮浠樹娇鐢?Shopify 鑷甫鏀粯绯荤粺锛圔uy Button / Checkout锛夛紝椤圭洰浠ｇ爜鐢?GitHub 绠＄悊锛孨etlify 瀹炵幇鑷姩鍖栭儴缃层€?
鐩爣锛氭湰鍦?`npm run dev` 鍜?Netlify 绾夸笂閮借兘姝ｅ父杩愯銆?
---

## 2. Design Language

**Aesthetic:** 鐜颁唬绉戞妧鎰熴€佺畝娲佸ぇ姘旓紝浠ユ繁鑹蹭负涓昏壊璋冿紝鎼厤浜壊鐐圭紑銆傚弬鑰?aulumu.com 鐨勫搧鐗岄鏍笺€?
**Color Palette:**
```
--color-primary:     #1a1a2e   (娣辨捣鍐涜摑锛屼富鑳屾櫙)
--color-secondary:   #16213e   (娣辫摑锛屾绾ц儗鏅?
--color-accent:      #e94560   (鐜孩寮鸿皟鑹?
--color-accent2:     #0f3460   (钃濊壊杈呭姪)
--color-surface:     #ffffff   (鍗＄墖/鍐呭鍖哄煙)
--color-text:        #1a1a2e   (姝ｆ枃)
--color-text-light:  #6b7280   (娆＄骇鏂囧瓧)
--color-text-white:  #ffffff   (鐧借壊鏂囧瓧)
--color-border:      #e5e7eb   (杈规)
--color-success:     #10b981
```

**Typography:**
```
--font-heading: 'Inter', system-ui, sans-serif  (鏍囬: 700/800 weight)
--font-body:    'Inter', system-ui, sans-serif    (姝ｆ枃: 400/500 weight)
--font-mono:   'JetBrains Mono', monospace         (浠ｇ爜)
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
- 椤甸潰婊氬姩鍏ュ満鍔ㄧ敾锛坒ade-up, 400ms ease-out, staggered 80ms锛?- 鎸夐挳 hover: scale(1.02), 200ms ease
- 鍗＄墖 hover: translateY(-4px), shadow 澧炲己
- Hero 鏂囧瓧: 娓愬叆鍔ㄧ敾, 600ms

---

## 3. Layout & Structure

### 椤甸潰缁撴瀯锛堝弬鑰?aulumu.com锛?
```
鈹屸攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?鈹?Top Banner (淇冮攢淇℃伅鏍?                   鈹?鈹溾攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?鈹?Header (Nav + Logo + Actions)            鈹?鈹? - Logo (Anker/Eufy 鍝佺墝)                鈹?鈹? - Nav: Products | Demo | Software |     鈹?鈹?        Make It Real | About | Blog |    鈹?鈹?        Support                         鈹?鈹? - Actions: Search | Cart | User         鈹?鈹溾攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?鈹?Hero Section                            鈹?鈹? - 澶у浘/Banner                           鈹?鈹? - 涓绘爣棰?+ 鍓爣棰?                       鈹?鈹? - CTA Buttons (Learn More / Buy Now)   鈹?鈹溾攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?鈹?Intro Section ("Hi, We're aulumu")    鈹?鈹溾攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?鈹?Features Grid ("Make It Real")          鈹?鈹? - Home Studio / Garage / Art Market     鈹?鈹溾攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?鈹?Technology Section ("Innovation Is in   鈹?鈹?Our DNA")                               鈹?鈹? - Amass3D鈩?Technology Card             鈹?鈹? - 3 key features (5mm height / 300+     鈹?鈹?   textures / Long-lasting colors)       鈹?鈹溾攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?鈹?Product Showcase ("Compact Size")       鈹?鈹? - Desk-size / 3-in-1 Modular Design    鈹?鈹溾攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?鈹?Workflow Section ("One-Stop Intelligent 鈹?鈹?Workflow")                              鈹?鈹? - 3-slide carousel                      鈹?鈹溾攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?鈹?Testimonials Section                    鈹?鈹? - 鐢ㄦ埛璇勪环杞挱                          鈹?鈹溾攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?鈹?Press Section ("As Seen In")            鈹?鈹溾攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?鈹?Newsletter Section                      鈹?鈹? - Email signup                         鈹?鈹溾攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?鈹?Trust Badges (Free Shipping / 30-Day /  鈹?鈹?1-Year Warranty / Support)             鈹?鈹溾攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?鈹?Footer                                  鈹?鈹? - Products | Support | Discount |      鈹?鈹?   Explore links                        鈹?鈹? - Social icons                         鈹?鈹? - Copyright                            鈹?鈹斺攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?```

### Responsive Strategy
- Mobile-first, breakpoints: 640px / 768px / 1024px / 1280px
- Nav 鍦ㄧЩ鍔ㄧ鎶樺彔涓烘眽鍫¤彍鍗?- Hero 鍥剧墖绉诲姩绔缉鏀?
---

## 4. Features & Interactions

### 鏍稿績鍔熻兘
- **闈欐€侀椤?* - 瀹屾暣澶嶅埢 aulumu.com 棣栭〉甯冨眬
- **鍝嶅簲寮忚璁?* - 鍏ㄨ澶囬€傞厤
- **Shopify Storefront 闆嗘垚** - 鍟嗗搧灞曠ず锛堟敮浠樿蛋 Shopify锛?- **Netlify 鑷姩鍖栭儴缃?* - GitHub 瑙﹀彂鑷姩鏋勫缓
- **鏈湴寮€鍙?* - `npm run dev` 瀹屾暣杩愯

### 浜や簰缁嗚妭
- **Cookie Consent Dialog** - 棣栨璁块棶寮瑰嚭
- **Nav 婊氬姩鏁堟灉** - 婊氬姩鍚?Header 鑳屾櫙鍔犳繁
- **Testimonials Carousel** - 鑷姩杞挱 + 鎵嬪姩鍒囨崲
- **Workflow Slideshow** - 3 slides 鑷姩杞挱
- **Newsletter Form** - Email 楠岃瘉 + 鎻愪氦鍙嶉
- **Mobile Menu** - 姹夊牎鑿滃崟灞曞紑鍔ㄧ敾
- **CTA Buttons** - hover scale 鏁堟灉

### 閿欒澶勭悊
- 鍥剧墖鍔犺浇澶辫触鏄剧ず鍗犱綅绗?- Form 鎻愪氦澶辫触鎻愮ず閲嶈瘯
- API 閿欒闄嶇骇涓洪潤鎬佸唴瀹?
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

### 妗嗘灦 & 宸ュ叿
- **Next.js 14** (App Router) - 涓绘鏋?- **TypeScript** - 绫诲瀷瀹夊叏
- **Tailwind CSS** - 鏍峰紡
- **Shopify Storefront API** - 鍟嗗搧鏁版嵁鑾峰彇锛堝彲閫夛級
- **next-intl** - 鍥介檯鍖栵紙棰勭暀锛?- **Framer Motion** - 鍔ㄧ敾

### 鐩綍缁撴瀯
```
aulumu-headless/
鈹溾攢鈹€ SPEC.md
鈹溾攢鈹€ README.md
鈹溾攢鈹€ .gitignore
鈹溾攢鈹€ package.json
鈹溾攢鈹€ next.config.ts
鈹溾攢鈹€ tailwind.config.ts
鈹溾攢鈹€ tsconfig.json
鈹溾攢鈹€ .env.local.example
鈹溾攢鈹€ public/
鈹?  鈹斺攢鈹€ favicon.ico
鈹斺攢鈹€ src/
    鈹溾攢鈹€ app/
    鈹?  鈹溾攢鈹€ layout.tsx          (Root Layout)
    鈹?  鈹溾攢鈹€ page.tsx            (Home Page)
    鈹?  鈹溾攢鈹€ globals.css
    鈹?  鈹斺攢鈹€ not-found.tsx
    鈹溾攢鈹€ components/
    鈹?  鈹溾攢鈹€ layout/
    鈹?  鈹?  鈹溾攢鈹€ Header.tsx
    鈹?  鈹?  鈹溾攢鈹€ TopBanner.tsx
    鈹?  鈹?  鈹溾攢鈹€ MobileMenu.tsx
    鈹?  鈹?  鈹斺攢鈹€ Footer.tsx
    鈹?  鈹溾攢鈹€ sections/
    鈹?  鈹?  鈹溾攢鈹€ HeroSection.tsx
    鈹?  鈹?  鈹溾攢鈹€ IntroSection.tsx
    鈹?  鈹?  鈹溾攢鈹€ FeaturesGrid.tsx
    鈹?  鈹?  鈹溾攢鈹€ TechSection.tsx
    鈹?  鈹?  鈹溾攢鈹€ ProductShowcase.tsx
    鈹?  鈹?  鈹溾攢鈹€ WorkflowSection.tsx
    鈹?  鈹?  鈹溾攢鈹€ TestimonialsSection.tsx
    鈹?  鈹?  鈹溾攢鈹€ PressSection.tsx
    鈹?  鈹?  鈹溾攢鈹€ NewsletterSection.tsx
    鈹?  鈹?  鈹斺攢鈹€ TrustBadges.tsx
    鈹?  鈹斺攢鈹€ ui/
    鈹?      鈹溾攢鈹€ Button.tsx
    鈹?      鈹溾攢鈹€ CookieConsent.tsx
    鈹?      鈹斺攢鈹€ Badge.tsx
    鈹溾攢鈹€ lib/
    鈹?  鈹斺攢鈹€ shopify.ts          (Storefront API client)
    鈹斺攢鈹€ types/
        鈹斺攢鈹€ index.ts
```

### 閮ㄧ讲
- **GitHub** - 浠撳簱绠＄悊
- **Netlify** - 鑷姩鍖栭儴缃诧紙杩炴帴 GitHub repo锛?- 鏋勫缓鍛戒护: `npm run build`
- 鍙戝竷鐩綍: `.next`

### 鐜鍙橀噺
```
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=xxx
```
