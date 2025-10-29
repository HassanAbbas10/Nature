// components/json-ld/collections-schema.tsx
interface CollectionsSchemaProps {
  collections: Array<{
    id: string;
    name: string;
    slug: string;
    description: string;
    imageUrl: string;
    featured: boolean;
    productCount: number;
  }>;
}

export function CollectionsSchema({ collections }: CollectionsSchemaProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': 'https://naturenurtures.com/collections/#webpage',
    'name': 'Product Collections - Nature and Nurtures',
    'description': 'Explore our curated product collections featuring organic nuts, herbal products, and sustainable lifestyle bundles',
    'url': 'https://naturenurtures.com/collections',
    'isPartOf': {
      '@id': 'https://naturenurtures.com/#website'
    },
    'mainEntity': {
      '@type': 'ItemList',
      'numberOfItems': collections.length,
      'itemListElement': collections.map((collection, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'item': {
          '@type': 'Collection',
          'name': collection.name,
          'description': collection.description,
          'url': `https://naturenurtures.com/collections/${collection.slug}`,
          'image': collection.imageUrl,
          'numberOfItems': collection.productCount
        }
      }))
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}