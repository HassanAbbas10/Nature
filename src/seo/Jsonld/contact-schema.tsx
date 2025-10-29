// components/json-ld/contact-schema.tsx
export function ContactSchema() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': 'https://naturenurtures.com/contact',
    'name': 'Contact Us - Nature and Nurtures',
    'description': 'Get in touch with Nature and Nurtures for customer support, product inquiries, wholesale opportunities, and general questions',
    'url': 'https://naturenurtures.com/contact',
    'isPartOf': {
      '@id': 'https://naturenurtures.com/'
    },
    'mainEntity': {
      '@type': 'Organization',
      '@id': 'https://naturenurtures.com/#organization',
      'contactPoint': {
        '@type': 'ContactPoint',
        'telephone': '+1-800-NATURE',
        'email': 'info@naturenurtures.com',
        'contactType': 'customer service',
        'areaServed': 'US',
        'availableLanguage': ['English'],
        'hoursAvailable': {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday','Sunday'],
          'opens': '00:00',
          'closes': '24:00'
        }
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}