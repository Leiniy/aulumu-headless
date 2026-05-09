# aulumu-headless

Next.js headless framework project, reference www.aulumu.com page layout, for Shopify standalone store.

## Quick Start

### Install dependencies

`ash
cd aulumu-headless
npm install
`

### Local dev

`ash
npm run dev
`

Open [http://localhost:3000](http://localhost:3000).

### Build

`ash
npm run build
`

### Start production

`ash
npm start
`

## Project Structure

aulumu-headless/
- src/
  - app/                    # Next.js App Router
  - components/
  - lib/
  - types/
- public/
- SPEC.md
- README.md
- package.json
- tailwind.config.ts
- next.config.mjs
- netlify.toml

## Deploy

### Netlify CI/CD

1. Push code to GitHub
2. Connect repo in Netlify
3. Auto-detects Next.js, use 
pm run build
4. Every push to main triggers rebuild

## Payment

Uses Shopify native checkout - Next.js is headless frontend only.

## License

Private - All rights reserved
