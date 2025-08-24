import type { Metadata } from 'next';

// SEO Utilities for Anime Fusion AI

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonical?: string;
  noIndex?: boolean;
}

export const seoConfig = {
  site: {
    name: 'Anime Fusion AI',
    url: 'https://animefusion-ai.com',
    description: 'Transform your photos with anime characters including Zhong Kui. Create magical group photos, character replacements, and interactive effects.',
  },
  social: {
    twitter: '@animefusion_ai',
    github: 'animefusion-ai',
  },
  author: {
    name: 'Anime Fusion AI Team',
  },
};

// Default SEO metadata
export const defaultSEO: SEOData = {
  title: 'Anime Fusion AI - Transform Your Photos with Anime Characters',
  description: 'Fuse your photos with beloved anime characters including Zhong Kui. Create magical group photos, character replacements, and interactive effects. Perfect for anime enthusiasts and figure collectors!',
  keywords: [
    'anime fusion ai', 'anime photo editor', 'zhong kui anime', 'character fusion', 
    'anime photo merge', 'ai anime generator', 'anime character creator', 
    'photo anime fusion', 'anime figure editor', 'ai anime effects', 'anime selfie',
    'anime group photo', 'anime character replacement', 'anime scene integration'
  ],
  ogTitle: 'Anime Fusion AI - Transform Photos with Anime Magic',
  ogDescription: 'Fuse your photos with beloved anime characters. Create magical group photos, character replacements, and interactive effects.',
  twitterTitle: 'Anime Fusion AI - Magical Photo Transformations',
  twitterDescription: 'Fuse your photos with beloved anime characters including Zhong Kui',
};

// Page-specific SEO configurations
export const pageSEO = {
  home: {
    ...defaultSEO,
    title: 'Anime Fusion AI - Transform Your Photos with Anime Characters',
    description: 'Experience the magic of anime character fusion. Upload your photo and create stunning transformations with Zhong Kui and other beloved characters.',
  },
  characters: {
    title: 'Anime Characters Collection - Anime Fusion AI',
    description: 'Discover our extensive collection of anime characters including Zhong Kui, Sakura Dreamer, Ninja Shadow, and more. Perfect for magical photo fusions.',
    keywords: [...defaultSEO.keywords, 'anime characters', 'zhong kui characters', 'anime character collection', 'anime selection'],
  },
  fusionModes: {
    title: 'Fusion Modes - Anime Fusion AI',
    description: 'Explore different fusion modes including group photos, character replacement, scene integration, and interactive effects. Find the perfect mode for your anime transformation.',
    keywords: [...defaultSEO.keywords, 'fusion modes', 'anime photo effects', 'character replacement', 'scene integration', 'group photos'],
  },
  gallery: {
    title: 'Anime Fusion Gallery - See Magical Transformations',
    description: 'Get inspired by amazing anime fusions created by our community. View examples of Zhong Kui fusions, character replacements, and magical effects.',
    keywords: [...defaultSEO.keywords, 'anime gallery', 'fusion examples', 'anime transformations', 'photo inspiration', 'anime art'],
  },
};

// Generate structured data for pages
export const generateStructuredData = (page: string, additionalData?: Record<string, unknown>) => {
  const baseData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": seoConfig.site.name,
    "url": seoConfig.site.url,
    "description": seoConfig.site.description,
    "author": {
      "@type": "Organization",
      "name": seoConfig.author.name,
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${seoConfig.site.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  switch (page) {
    case 'home':
      return {
        ...baseData,
        "@type": "SoftwareApplication",
        "applicationCategory": "ImageEditorApplication",
        "operatingSystem": "Web Browser",
        "description": pageSEO.home.description,
        "featureList": [
          "Anime character fusion",
          "Photo to anime transformation",
          "Group photo with anime characters",
          "Character replacement effects",
          "Scene integration with anime",
          "Zhong Kui character fusion",
          "Interactive anime effects",
          "Fast processing (15-30s)"
        ],
        "offers": {
          "@type": "Offer",
          "price": "0.00",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        }
      };
    
    case 'characters':
      return {
        ...baseData,
        "@type": "CollectionPage",
        "name": pageSEO.characters.title,
        "description": pageSEO.characters.description,
        "mainEntity": {
          "@type": "Collection",
          "name": "Anime Characters Collection",
          "description": "A comprehensive collection of anime characters for photo fusion",
          ...additionalData
        }
      };
    
    case 'gallery':
      return {
        ...baseData,
        "@type": "ImageGallery",
        "name": pageSEO.gallery.title,
        "description": pageSEO.gallery.description,
        "associatedMedia": additionalData?.images || []
      };
    
    default:
      return baseData;
  }
};

// Generate meta tags for Next.js
export const generateMetadata = (seo: SEOData): Metadata => {
  const {
    title,
    description,
    keywords,
    ogTitle,
    ogDescription,
    ogImage,
    twitterTitle,
    twitterDescription,
    twitterImage,
    canonical,
    noIndex = false,
  } = seo;

  const metadata: Metadata = {
    title,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: seoConfig.author.name }],
    creator: seoConfig.author.name,
    publisher: seoConfig.author.name,
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };

  // Open Graph
  metadata.openGraph = {
    title: ogTitle || title,
    description: ogDescription || description,
    url: canonical || seoConfig.site.url,
    siteName: seoConfig.site.name,
    images: ogImage ? [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: title,
      },
    ] : [],
    locale: 'en_US',
    type: 'website',
  };

  // Twitter
  metadata.twitter = {
    card: 'summary_large_image',
    title: twitterTitle || title,
    description: twitterDescription || description,
    images: twitterImage ? [twitterImage] : [],
    creator: seoConfig.social.twitter,
  };

  // Canonical URL
  if (canonical) {
    metadata.alternates = {
      canonical,
    };
  }

  // Additional meta tags
  metadata.other = {
    'twitter:site': seoConfig.social.twitter,
  };

  return metadata;
};

// Utility functions for SEO
export const createCanonicalUrl = (path: string): string => {
  return `${seoConfig.site.url}${path}`;
};

export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const truncateDescription = (text: string, maxLength: number = 160): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};

// Image optimization utilities
export const generateImageData = (imageUrl: string, title: string, description: string) => ({
  url: imageUrl,
  width: 1200,
  height: 630,
  alt: title,
  caption: description,
});

// Breadcrumb structured data
export const generateBreadcrumbData = (breadcrumbs: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbs.map((crumb, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": crumb.name,
    "item": crumb.url,
  })),
});

// FAQ structured data
export const generateFAQData = (faqs: Array<{ question: string; answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer,
    },
  })),
});

// Performance monitoring for SEO
export const SEOMetrics = {
  // Core Web Vitals targets
  coreWebVitals: {
    lcp: 2500, // Largest Contentful Paint (ms)
    fid: 100,  // First Input Delay (ms)
    cls: 0.1,  // Cumulative Layout Shift
  },
  
  // Content targets
  content: {
    minWordCount: 300,
    maxHeadingDepth: 4,
    minImageCount: 1,
  },
  
  // Technical SEO
  technical: {
    maxResponseTime: 3000, // ms
    minTTFB: 600, // Time to First Byte (ms)
    maxPageSize: 2 * 1024 * 1024, // 2MB
  },
};

const seoUtilities = {
  seoConfig,
  defaultSEO,
  pageSEO,
  generateStructuredData,
  generateMetadata,
  createCanonicalUrl,
  generateSlug,
  truncateDescription,
  generateImageData,
  generateBreadcrumbData,
  generateFAQData,
  SEOMetrics,
};

export default seoUtilities;