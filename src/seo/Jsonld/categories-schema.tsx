// components/json-ld/categories-schema.tsx
interface CategoriesSchemaProps {
  categories: Array<{
    id: string;
    name: string;
    slug: string;
    description: string;
    imageUrl: string;
    productCount: number;
  }>;
}

export function CategoriesSchema({ categories }: CategoriesSchemaProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': 'https://naturenurtures.com/categories/#webpage',
    'name': 'Product Categories - Nature and Nurtures',
    'description': 'Browse all product categories including organic nuts, herbal remedies, natural supplements, and eco-friendly lifestyle products',
    'url': 'https://naturenurtures.com/categories',
    'isPartOf': {
      '@id': 'https://naturenurtures.com/#website'
    },
    'mainEntity': {
      '@type': 'ItemList',
      'numberOfItems': categories.length,
      'itemListElement': categories.map((category, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'item': {
          '@type': 'CategoryCode',
          'name': category.name,
          'description': category.description,
          'url': `https://naturenurtures.com/categories/${category.slug}`,
          'image': category.imageUrl,
          'numberOfItems': category.productCount
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