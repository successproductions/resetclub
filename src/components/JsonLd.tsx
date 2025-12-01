import React from 'react';

export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.resetclub.ma/#organization",
        "name": "ResetClub",
        "url": "https://www.resetclub.ma",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.resetclub.ma/LOGO.png",
          "width": 112,
          "height": 112
        },
        "sameAs": [
          "https://twitter.com/resetclub",
          "https://www.instagram.com/resetclub.ma"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+212-000-000000", 
          "contactType": "customer service",
          "areaServed": "MA",
          "availableLanguage": ["en", "fr"]
        }
      },
      {
        "@type": "Brand",
        "@id": "https://www.resetclub.ma/#brand",
        "name": "ResetClub",
        "url": "https://www.resetclub.ma",
        "logo": "https://www.resetclub.ma/LOGO.png",
        "description": "Le premier centre premium de transformation holistique au Maroc."
      },
      {
        "@type": "WebSite",
        "@id": "https://www.resetclub.ma/#website",
        "url": "https://www.resetclub.ma",
        "name": "ResetClub",
        "publisher": {
          "@id": "https://www.resetclub.ma/#organization"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
