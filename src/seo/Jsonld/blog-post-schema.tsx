// components/json-ld/blog-post-schema.tsx
interface BlogPostSchemaProps {
  post: {
    id: string;
    title: string;
    content: string;
    excerpt: string;
    slug: string;
    featuredImage: string;
    categories: string[];
    tags: string[];
    metaTitle: string;
    metaDescription: string;
    createdAt: Date;
  };
}

export function BlogPostSchema({ post }: BlogPostSchemaProps) {
  const plainTextContent = post.content.replace(/<[^>]*>/g, '').substring(0, 200);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `https://naturenurtures.com/blog/${post.slug}#blogpost`,
    'headline': post.metaTitle || post.title,
    'description': post.metaDescription || post.excerpt || plainTextContent,
    'url': `https://naturenurtures.com/blog/${post.slug}`,
    'image': post.featuredImage,
    'datePublished': post.createdAt.toISOString(),
    'dateModified': post.createdAt.toISOString(),
    'author': {
      '@type': 'Organization',
      'name': 'Nature and Nurtures',
      '@id': 'https://naturenurtures.com/#organization'
    },
    'publisher': {
      '@type': 'Organization',
      '@id': 'https://naturenurtures.com/#organization'
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://naturenurtures.com/blog/${post.slug}#webpage`
    },
    'keywords': [...post.categories, ...post.tags].join(', '),
    'articleSection': post.categories.join(', '),
    'wordCount': post.content.length
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}