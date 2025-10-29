// components/json-ld/collection-schema.tsx
interface CollectionSchemaProps {
  collection: {
    id: string;
    name: string;
    slug: string;
    description: string;
    imageUrl: string;
    metaTitle: string;
    metaDescription: string;
    featured: boolean;
  };
  products: Array<{
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    images: string[];
    inStock: boolean;
  }>;
}

export function CollectionSchema({ collection, products }: CollectionSchemaProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `https://naturenurtures.com/collections/${collection.slug}#webpage`,
    'name': collection.metaTitle || `${collection.name} - Nature and Nurtures`,
    'description': collection.metaDescription || collection.description,
    'url': `https://naturenurtures.com/collections/${collection.slug}`,
    'isPartOf': {
      '@id': 'https://naturenurtures.com/#website'
    },
    'mainEntity': {
      '@type': 'ItemList',
      'numberOfItems': products.length,
      'itemListElement': products.map((product, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'item': {
          '@type': 'Product',
          '@id': `https://naturenurtures.com/products/${product.slug}#product`,
          'name': product.name,
          'description': product.description,
          'url': `https://naturenurtures.com/products/${product.slug}`,
          'image': product.images[0],
          'offers': {
            '@type': 'Offer',
            'price': product.price,
            'priceCurrency': 'USD',
           
          }
        }
      }))
    },
    'about': {
      '@type': 'Collection',
      'name': collection.name,
      'description': collection.description
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}