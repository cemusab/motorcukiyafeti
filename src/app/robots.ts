import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/hesabim', '/favoriler', '/api/', '/arama?*'],
    },
    sitemap: 'https://motorcukiyafeti.com/sitemap.xml',
  };
}
