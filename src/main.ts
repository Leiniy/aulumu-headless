/**
 * 页面路由配置
 * handle:    Shopify 后台页面 handle
 * template:  src/templates/{group}/{name}/index.tsx
 */
export const pageRoutes = [
  { handle: 'home',      template: 'Home',     group: 'Pages' },
  { handle: 'about-us',  template: 'AboutUs',  group: 'Pages' },
  { handle: 'contact',   template: 'Contact',   group: 'Pages' },
   { handle: 'bbb',   template: 'Bbb',   group: 'Pages' },
  { handle: 'blog-list', template: 'BlogList',  group: 'Blogs' },
] as const