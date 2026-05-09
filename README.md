# aulumu-headless

Next.js 鏃犲ご妗嗘灦椤圭洰锛屽弬鑰?www.aulumu.com 椤甸潰甯冨眬锛岀敤浜?Shopify 鐙珛绔欍€?
## 馃殌 蹇€熷紑濮?
### 瀹夎渚濊禆

```bash
cd aulumu-headless
npm install
```

### 鏈湴寮€鍙?
```bash
npm run dev
```

鎵撳紑 [http://localhost:3000](http://localhost:3000) 鏌ョ湅鏁堟灉銆?
### 鏋勫缓鐢熶骇鐗堟湰

```bash
npm run build
```

### 鍚姩鐢熶骇鏈嶅姟鍣?
```bash
npm start
```

## 馃搧 椤圭洰缁撴瀯

```
aulumu-headless/
鈹溾攢鈹€ src/
鈹?  鈹溾攢鈹€ app/                    # Next.js App Router
鈹?  鈹?  鈹溾攢鈹€ layout.tsx          # Root Layout
鈹?  鈹?  鈹溾攢鈹€ page.tsx            # 棣栭〉
鈹?  鈹?  鈹溾攢鈹€ globals.css         # 鍏ㄥ眬鏍峰紡
鈹?  鈹?  鈹斺攢鈹€ not-found.tsx       # 404 椤甸潰
鈹?  鈹溾攢鈹€ components/
鈹?  鈹?  鈹溾攢鈹€ layout/             # 甯冨眬缁勪欢
鈹?  鈹?  鈹?  鈹溾攢鈹€ Header.tsx
鈹?  鈹?  鈹?  鈹溾攢鈹€ Footer.tsx
鈹?  鈹?  鈹?  鈹溾攢鈹€ TopBanner.tsx
鈹?  鈹?  鈹?  鈹斺攢鈹€ MobileMenu.tsx
鈹?  鈹?  鈹溾攢鈹€ sections/           # 椤甸潰鍖哄潡
鈹?  鈹?  鈹?  鈹溾攢鈹€ HeroSection.tsx
鈹?  鈹?  鈹?  鈹溾攢鈹€ IntroSection.tsx
鈹?  鈹?  鈹?  鈹溾攢鈹€ FeaturesGrid.tsx
鈹?  鈹?  鈹?  鈹溾攢鈹€ TechSection.tsx
鈹?  鈹?  鈹?  鈹溾攢鈹€ ProductShowcase.tsx
鈹?  鈹?  鈹?  鈹溾攢鈹€ WorkflowSection.tsx
鈹?  鈹?  鈹?  鈹溾攢鈹€ TestimonialsSection.tsx
鈹?  鈹?  鈹?  鈹溾攢鈹€ PressSection.tsx
鈹?  鈹?  鈹?  鈹溾攢鈹€ NewsletterSection.tsx
鈹?  鈹?  鈹?  鈹斺攢鈹€ TrustBadges.tsx
鈹?  鈹?  鈹斺攢鈹€ ui/                 # UI 鍩虹缁勪欢
鈹?  鈹?      鈹溾攢鈹€ Button.tsx
鈹?  鈹?      鈹溾攢鈹€ Badge.tsx
鈹?  鈹?      鈹斺攢鈹€ CookieConsent.tsx
鈹?  鈹溾攢鈹€ lib/
鈹?  鈹?  鈹斺攢鈹€ shopify.ts          # Shopify Storefront API
鈹?  鈹斺攢鈹€ types/
鈹?      鈹斺攢鈹€ index.ts            # TypeScript 绫诲瀷
鈹溾攢鈹€ public/                     # 闈欐€佽祫婧?鈹溾攢鈹€ SPEC.md                     # 椤圭洰瑙勮寖鏂囨。
鈹溾攢鈹€ package.json
鈹溾攢鈹€ tailwind.config.ts
鈹溾攢鈹€ next.config.ts
鈹斺攢鈹€ netlify.toml               # Netlify 閮ㄧ讲閰嶇疆
```

## 馃寪 閮ㄧ讲

### Netlify 鑷姩鍖栭儴缃?
1. 灏嗕唬鐮佹帹閫佸埌 GitHub 浠撳簱
2. 鍦?[Netlify](https://netlify.com) 杩炴帴浣犵殑 GitHub 浠撳簱
3. Netlify 浼氳嚜鍔ㄦ娴?Next.js 椤圭洰骞堕厤缃瀯寤哄懡浠?4. 閮ㄧ讲瀹屾垚鍚庯紝姣忔 push 鍒?main 鍒嗘敮閮戒細鑷姩瑙﹀彂鏋勫缓

### 鐜鍙橀噺

澶嶅埗 `.env.local.example` 涓?`.env.local` 骞堕厤缃細

```bash
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-token
NEXT_PUBLIC_SITE_URL=https://your-site.netlify.app
```

## 馃挸 鏀粯

鏈」鐩娇鐢?Next.js 浣滀负鏃犲ご鍓嶇锛屾敮浠樺姛鑳介€氳繃 Shopify 鑷甫鐨勬敮浠樼郴缁熷疄鐜般€?
## 馃摑 璁稿彲璇?
Private - All rights reserved
