export interface SiteSection {
  heading: string;
  body: string;
}

export interface SiteFaqItem {
  question: string;
  answer: string;
}

export interface SitePageContent {
  slug: string;
  heroHeadline: string;
  heroSubheadline: string;
  ctaText: string;
  ctaHref: string;
  sections: SiteSection[];
  faqItems?: SiteFaqItem[];
}

export interface SitePage {
  slug: string;
  title: string;
  description: string;
  h1: string;
  purpose: string;
  indexable: boolean;
  content?: SitePageContent;
}

export const siteConfig: {
  siteName: string;
  domain: string;
  brand: {
    name: string;
    tagline: string;
  };
  pages: SitePage[];
} = {
  "siteName": "Patient Page",
  "domain": "test.osakhi.ai",
  "brand": {
    "name": "Patient Page",
    "tagline": "Track your health data"
  },
  "pages": [
    {
      "slug": "",
      "title": "Patient Page — Track your health data",
      "description": "Track your health data",
      "h1": "Patient Page",
      "purpose": "Track your health data",
      "indexable": true,
      "content": {
        "slug": "",
        "heroHeadline": "Patient Page",
        "heroSubheadline": "Track your health data",
        "ctaText": "Explore Solutions",
        "ctaHref": "#overview",
        "sections": [
          {
            "heading": "Overview",
            "body": "Patient Page delivers overview tailored for General visitors and prospective customers. Track your health data"
          },
          {
            "heading": "Why Choose Us",
            "body": "Patient Page delivers why choose us tailored for General visitors and prospective customers. Track your health data"
          },
          {
            "heading": "Get Started",
            "body": "Patient Page delivers get started tailored for General visitors and prospective customers. Track your health data"
          }
        ]
      }
    }
  ]
};
