// components/json-ld/about-schema.tsx
export function AboutSchema() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': 'https://naturenurtures.com/about/#webpage',
    'url': 'https://naturenurtures.com/about',
    'name': 'About Us - Nature and Nurtures',
    'description': 'Learn about Nature and Nurtures mission to provide sustainable, natural products and our commitment to environmental responsibility',
    'isPartOf': {
      '@id': 'https://naturenurtures.com/#website'
    },
    'about': {
      '@id': 'https://naturenurtures.com/#organization'
    },
    'mainEntity': {
      '@type': 'Organization',
      'name': 'Nature and Nurtures',
      'description': 'Ecommerce for nature products',
      'foundingDate': '2020',
      'mission': 'To provide high-quality, sustainable natural products that nurture both people and the planet',
      'slogan': 'Nature Meets Nurture',
      'knowsAbout': [
       'Cold-Pressed Oils',

'Organic Skincare',

'Natural Ingredients',

'Eco-Friendly Products',

'Small-Batch Crafting'
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}