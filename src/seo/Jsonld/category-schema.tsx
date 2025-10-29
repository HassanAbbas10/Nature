
interface CategorySchemaProps {
  category: {
    id: string;
    name: string;
    slug: string;
    description: string;
    imageUrl: string;
    metaTitle: string;
    metaDescription: string;
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

export function CategorySchemas({ category, products }: CategorySchemaProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `https://naturenurtures.com/categories/${category.slug}#webpage`,
    'name': category.metaTitle || `${category.name} - Nature and Nurtures`,
    'description': category.metaDescription || category.description,
    'url': `https://naturenurtures.com/categories/${category.slug}`,
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
      '@type': 'CategoryCode',
      'name': category.name,
      'description': category.description
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}