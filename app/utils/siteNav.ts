export interface SiteNavLink {
  title: string
  url: string
}

export const mainNavLinks: SiteNavLink[] = [
  { title: 'Магазин', url: '/store' },
  { title: 'Доставка', url: '/delivery' },
  { title: 'Контакты', url: '/contacts' },
]

export const footerInfoLinks: SiteNavLink[] = [
  { title: 'О компании', url: '/about' },
  ...mainNavLinks.filter((link) => link.url !== '/store'),
  { title: 'Магазин', url: '/store' },
]
