import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
      { title: 'KSULYMIN Graphics Studio | Branding & Graphic Design' },
      { name: 'description', content: 'KSULYMIN Graphics Studio creates distinctive logos, brand identities, business documents, social media designs, and print materials for clients worldwide.' },
      { name: 'google-site-verification', content: 'vgvw86s7DzsatvqHwpR90DOLAJZNIfFETXaFhlPfnXg' },
      { name: 'keywords', content: 'graphic design Pakistan, logo design, brand identity, social media design, CV design, KSULYMIN Graphics' },
      { name: 'theme-color', content: '#10100f' },
      { property: 'og:title', content: 'KSULYMIN Graphics Studio' },
      { property: 'og:description', content: 'Ideas made visible. Brands made memorable.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://ksulymingraphicsstudioofficial.netlify.app/' },
      { property: 'og:image', content: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=1200&h=630&q=85' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'KSULYMIN Graphics Studio | Branding & Graphic Design' },
      { name: 'twitter:description', content: 'Ideas made visible. Brands made memorable.' },
    ],
    links: [
      { rel: 'canonical', href: 'https://ksulymingraphicsstudioofficial.netlify.app/' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,600;9..144,700&display=swap' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
    scripts: [{ type: 'application/ld+json', children: JSON.stringify({ '@context': 'https://schema.org', '@type': 'ProfessionalService', name: 'KSULYMIN Graphics Studio', description: 'Creative graphic design studio offering branding, print, and digital design services.', telephone: '+923125278796', areaServed: 'Worldwide', address: { '@type': 'PostalAddress', addressCountry: 'PK' }, sameAs: ['https://www.instagram.com/KsulyminGraphicsOfficial', 'https://www.facebook.com/KSULYMINGraphicsCo'] }) }],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return <html lang="en"><head><HeadContent /></head><body>{children}<Scripts /></body></html>
}
