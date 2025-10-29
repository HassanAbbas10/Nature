interface ProductSchemaProps {
  product: {
    id: string;
    name: string;
    slug: string;
    description: string;
    about: string;
    aboutProduct: string[];
    price: number;
    originalPrice: number;
    discount: number;
    images: string[];
    inStock: boolean;
    stockQuantity: number;
    sku: string;
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string[];
    category: {
      name: string;
      slug: string;
    } | null;
    colors: Array<{
      name: string;
      hexColor: string;
    }>;
    sizes: Array<{
      size: string;
    }>;
    features: Array<{
      title: string;
      description: string;
    }>;
    specifications: Array<{
      key: string;
      value: string;
    }>;
    tags: Array<{
      tag: {
        name: string;
      };
    }>;
    reviews: Array<{
      id: string;
      title: string;
      content: string;
      rating: number;
      createdAt: Date;
      user: {
        email: string;
      };
    }>;
  };
}

export function ProductSchema({ product }: ProductSchemaProps) {


  const offers: {
    '@type': string;
    price: number;
    priceCurrency: string;
    priceValidUntil: string;
    url: string;
    priceSpecification?: {
      '@type': string;
      price: number;
      originalPrice: number;
      discount: number;
    };
  } = {
    '@type': 'Offer',
    'price': product.price,
    'priceCurrency': 'USD',
    'priceValidUntil': new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    'url': `https://naturenurtures.com/products/${product.slug}`
  };

  if (product.originalPrice && product.originalPrice > product.price) {
    offers['priceSpecification'] = {
      '@type': 'PriceSpecification',
      'price': product.price,
      'originalPrice': product.originalPrice,
      'discount': product.discount
    };
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `https://naturenurtures.com/products/${product.slug}#product`,
    'name': product.metaTitle || product.name,
    'description': product.metaDescription || product.description,
    'url': `https://naturenurtures.com/products/${product.slug}`,
    'image': product.images,
    'sku': product.sku,
    'gtin': product.sku,
    'brand': {
      '@type': 'Brand',
      'name': 'Nature and Nurtures',
      '@id': 'https://naturenurtures.com/#organization'
    },
    'offers': offers,
    'category': product.category?.name,
    'additionalProperty': [
      ...product.specifications.map(spec => ({
        '@type': 'PropertyValue',
        'name': spec.key,
        'value': spec.value
      })),
      ...product.colors.map(color => ({
        '@type': 'PropertyValue',
        'name': 'color',
        'value': color.name
      })),
      ...product.sizes.map(size => ({
        '@type': 'PropertyValue',
        'name': 'size',
        'value': size.size
      }))
    ],
 
    
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://naturenurtures.com/products/${product.slug}#webpage`
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}