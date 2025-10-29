// components/json-ld/global-schemas.tsx
export function OrganizationSchema() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://naturenurtures.com/#organization',
    'name': 'Nature and Nurtures',
    'url': 'https://naturenurtures.com',
    'logo': 'https://naturenurtures.com/logo.png',
    'description': 'Nature Nurtures crafts premium, natural, and eco-friendly products including cold-pressed oils, nut butters, and herbal remedies. Every item is made in small batches with slow-pressure extraction to preserve purity, flavor, and nutrients.',
    'email': 'info@naturenurtures.com',
    'telephone': '+1-800-NATURE',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '123 Nature Way',
      'addressLocality': 'Eco City',
      'addressRegion': 'Green State',
      'postalCode': '12345',
      'addressCountry': 'US'
    },
    'sameAs': [
      'https://facebook.com/naturenurtures',
      'https://instagram.com/naturenurtures',
      'https://pinterest.com/naturenurtures'
    ],
    'priceRange': '$$',
    'openingHours': 'Mo-Su 00:00-24:00'
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function WebsiteSchema() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://naturenurtures.com/#website',
    'name': 'Nature and Nurtures',
    'url': 'https://naturenurtures.com',
    'description': 'Nature Nurtures crafts premium, natural, and eco-friendly products including cold-pressed oils, nut butters, and herbal remedies. Every item is made in small batches with slow-pressure extraction to preserve purity, flavor, and nutrients.',
    'publisher': {
      '@type': 'Organization',
      '@id': 'https://naturenurtures.com/#organization'
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}