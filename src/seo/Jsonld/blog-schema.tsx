// components/json-ld/blog-schema.tsx
interface BlogSchemaProps {
  posts: Array<{
    id: string;
    title: string;
    excerpt: string;
    slug: string;
    featuredImage: string;
    categories: string[];
    tags: string[];
    createdAt: Date;
  }>;
}

export function BlogSchema({ posts }: BlogSchemaProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': 'https://naturenurtures.com/blog/#blog',
    'name': 'Nature and Nurtures Blog',
    'description': 'Articles about natural living, sustainability, eco-friendly products, herbal remedies, and organic oils',
    'url': 'https://naturenurtures.com/blog',
    'publisher': {
      '@type': 'Organization',
      '@id': 'https://naturenurtures.com/#organization'
    },
    'blogPost': posts.map(post => ({
      '@type': 'BlogPosting',
      'headline': post.title,
      'description': post.excerpt,
      'url': `https://naturenurtures.com/blog/${post.slug}`,
      'image': post.featuredImage,
      'datePublished': post.createdAt.toISOString(),
      'dateModified': post.createdAt.toISOString(),
      'author': {
        '@type': 'Organization',
        'name': 'Nature and Nurtures'
      },
      'keywords': [...post.categories, ...post.tags].join(', '),
      'articleSection': post.categories.join(', ')
    })),
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': 'https://naturenurtures.com/blog/#webpage'
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}