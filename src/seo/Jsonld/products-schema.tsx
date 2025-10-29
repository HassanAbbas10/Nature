
interface ProductsSchemaProps {
  products: Array<{
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    originalPrice: number;
    images: string[];
    inStock: boolean;
    category: {
      name: string;
      slug: string;
    } | null;
    tags: Array<{
      tag: {
        name: string;
      };
    }>;
    reviews: Array<{
      rating: number;
    }>;
  }>;
}

export function ProductsSchema({ products }: ProductsSchemaProps) {
  


  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': 'https://naturenurtures.com/products/#itemlist',
    'name': 'All Products - Nature and Nurtures',
    'description': 'Nature Nurtures crafts premium, natural, and eco-friendly products including cold-pressed oils, nut butters, and herbal remedies. Every item is made in small batches with slow-pressure extraction to preserve purity, flavor, and nutrients.',
    'url': 'https://naturenurtures.com/products',
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
        'category': product.category?.name,
        'sku': product.id,
        'offers': {
          '@type': 'Offer',
          'price': product.price,
          'priceCurrency': 'USD',
          'availability': product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
          'priceValidUntil': new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        },
        
        
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}