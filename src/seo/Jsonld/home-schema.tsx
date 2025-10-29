// components/json-ld/home-schema.tsx
interface HomeSchemaProps {
  featuredProducts?: Array<{
    id: string;
    name: string;
    description: string;
    url: string;
    image: string;
    price: number;
  }>;
  featuredCollections?: Array<{
    id: string;
    name: string;
    description: string;
    url: string;
    image: string;
  }>;
}

export function HomeSchema({ featuredProducts = [], featuredCollections = [] }: HomeSchemaProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://naturenurtures.com/#webpage',
        'url': 'https://naturenurtures.com',
        'name': 'Nature and Nurtures - Premium Natural Products',
        'description': 'Discover eco-friendly, sustainable nature products. Organic skincare, herbal remedies, and natural lifestyle products.',
        'isPartOf': {
          '@id': 'https://naturenurtures.com/#website'
        },
        'about': {
          '@id': 'https://naturenurtures.com/#organization'
        },
        'primaryImageOfPage': {
          '@type': 'ImageObject',
          'url': 'https://naturenurtures.com/og-image.jpg'
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}