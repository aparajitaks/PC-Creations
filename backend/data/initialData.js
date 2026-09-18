// Accurate data based on PC Creations Company Profile PDF & Google Reviews

const servicesData = [
  {
    id: 'graphic-design',
    code: 'D',
    title: 'Graphic Design',
    badge: 'Creative Identity',
    description: 'Brand visuals, festival posters, social creatives, marketing banners, and visual identities that demand attention.',
    features: [
      'Brand style guides & color system curation',
      'Custom festival and celebratory campaign posts',
      'High-impact social media creatives & carousels',
      'Brochures, pitch decks & corporate presentation decks',
      'Print-ready marketing assets & digital ad graphics'
    ],
    deliverables: 'Brand Visuals, Festival Posters, Marketing Collaterals'
  },
  {
    id: 'smm',
    code: 'S',
    title: 'SMM (Social Media Marketing)',
    badge: 'Organic & Community',
    description: 'End-to-end Instagram, Facebook, YouTube & LinkedIn management that turns followers into loyal brand advocates.',
    features: [
      'Multi-platform content calendars & scheduling',
      'Viral short-form reels & carousel designs',
      'Community management & audience interaction',
      'Growth hacking strategies & hashtag architecture',
      'Monthly reach, engagement & sentiment analytics'
    ],
    deliverables: 'Instagram, Facebook, YouTube & LinkedIn Growth'
  },
  {
    id: 'meta-ads',
    code: 'M',
    title: 'Meta Ads',
    badge: 'Scale DTC & B2B',
    description: 'Targeted paid campaigns across Meta platforms (Facebook & Instagram) designed for hyper-scalable customer acquisition.',
    features: [
      'Full-funnel strategy (Top, Middle, Bottom funnel)',
      'High-converting UGC video ads & image creatives',
      'Dynamic product ads & lookalike audience targeting',
      'A/B split testing of hooks, angles, and CTAs',
      'CBO / Advantage+ campaign budget scaling'
    ],
    deliverables: 'Instagram Ads, Facebook Ads, Retargeting Funnels'
  },
  {
    id: 'google-ads',
    code: 'G',
    title: 'Google Ads',
    badge: 'Paid Search & ROAS',
    description: 'High-converting search, shopping, display, and performance max campaigns engineered to capture high-intent buyers.',
    features: [
      'Keyword research & competitor bid analysis',
      'High-converting ad copy & responsive search ads',
      'Negative keyword filtering to eliminate wasted ad spend',
      'Conversion tracking & Google Tag Manager setup',
      'Weekly bid adjustments & budget reallocation'
    ],
    deliverables: 'Search campaigns, Shopping ads, Display remarketing, Performance Max'
  },
  {
    id: 'video-shoots',
    code: 'V',
    title: 'Video & Shoots',
    badge: 'Studio Production',
    description: 'Greenscreen videos, ad shoots, product videography, and post-production editing for modern commercial campaigns.',
    features: [
      'Full studio greenscreen setup & lighting',
      'Scriptwriting, storyboarding & creative direction',
      'Professional camera crews & high-resolution audio',
      'Motion graphics, subtitles, sound design & grading',
      'Short-form vertical video optimization (Reels / Shorts)'
    ],
    deliverables: 'Greenscreen Videos, Ad Shoots, Post-production Editing'
  },
  {
    id: 'podcast',
    code: 'P',
    title: 'Podcast Production',
    badge: 'Authority & Reach',
    description: 'Full podcast production, recording, professional audio/video editing, and global platform distribution.',
    features: [
      'Acoustic recording & multi-mic studio production',
      'Multi-angle 4K video recording for video podcasts',
      'Bite-sized social clips & audiograms for promotion',
      'Publishing to Spotify, Apple Podcasts, and YouTube',
      'SEO-optimized show notes & episode summaries'
    ],
    deliverables: 'End-to-end Podcast Production & Distribution'
  },
  {
    id: 'website',
    code: 'W',
    title: 'Website Development',
    badge: 'High-Converting Web',
    description: 'CMS, e-commerce, and custom web development crafted for lightning-fast speeds and high conversion rates.',
    features: [
      'Custom modern web design with interactive animations',
      'Mobile-first responsive architecture',
      'E-commerce platforms (Shopify, WooCommerce, Custom)',
      'Technical SEO, speed optimization & Core Web Vitals',
      'Integrated analytics, lead capture forms & CRM integration'
    ],
    deliverables: 'CMS, E-Commerce & Custom Web Development'
  },
  {
    id: 'mobile-apps',
    code: 'A',
    title: 'Mobile Apps',
    badge: 'iOS & Android',
    description: 'Native and cross-platform Android and iOS app development that delivers seamless digital user experiences.',
    features: [
      'Intuitive UI/UX wireframing & prototyping',
      'Cross-platform development (React Native / Flutter)',
      'Cloud backend architecture & REST/GraphQL APIs',
      'App Store & Google Play Store publishing',
      'Push notification systems & analytics integration'
    ],
    deliverables: 'Android and iOS App Development'
  }
];

const pricingData = [
  {
    id: 'basic',
    name: 'BASIC',
    tagline: 'Starter pack',
    badge: 'Essential Growth',
    popular: false,
    features: [
      'Instagram & Facebook Management',
      'Google My Business Optimization',
      'YouTube Channel Management',
      'META Ads & Google Ads Setup',
      'Video Editing & Graphic Design',
      'Content Creation & Voice Model',
      'Monthly Report & Festival Posters'
    ],
    notes: 'Ad budget excluded',
    idealFor: 'Emerging businesses establishing an omnipresent digital footprint'
  },
  {
    id: 'standard',
    name: 'STANDARD',
    tagline: 'Growth pack',
    badge: 'Most Popular',
    popular: true,
    features: [
      'Everything in Basic Pack',
      'TV Channel News Ads (1–2 Broadcasts)',
      'Priority Dedicated Support',
      'Advanced Performance Reporting',
      'Weekly Sprint & Campaign Refinements',
      'Enhanced Ad Creative Variations'
    ],
    notes: 'Ad budget excluded',
    idealFor: 'Growing brands ready to dominate their category with mass media reach'
  },
  {
    id: 'customized',
    name: 'CUSTOMIZED',
    tagline: 'Premium pack',
    badge: 'Full Scale',
    popular: false,
    features: [
      'Everything in Standard Pack',
      'LinkedIn Management & Executive Branding',
      'Influencer Marketing & Creator Collabs',
      'Two Professional Photoshoots',
      'One Full Podcast Production',
      'SEO & Website Management',
      'TV Channel News Ads (1–2 Broadcasts)'
    ],
    notes: 'Tailored ad spend & bespoke production',
    idealFor: 'Market leaders and enterprises demanding 360-degree digital supremacy'
  }
];

const reviewsData = [
  {
    id: 'rev-1',
    author: 'Suresh Kumar',
    rating: 5,
    relativeDate: '2 weeks ago',
    business: 'Bangalore Retail & Lifestyle Brand',
    text: 'Working with PC Creations transformed our online presence completely. Their Meta Ads and Google Ads campaigns started delivering consistent inquiries within the first 10 days. The greenscreen studio video production is top notch!',
    avatar: 'SK',
    verified: true
  },
  {
    id: 'rev-2',
    author: 'Priya Nandini',
    rating: 5,
    relativeDate: '1 month ago',
    business: 'E-commerce & Fashion Label, Bangalore',
    text: 'PC Creations is the best digital marketing team in Rajajinagar/Indiranagar. The festival posters, reels, and video ad shoots they produced generated our highest festive season sales ever. Highly recommend their Standard pack!',
    avatar: 'PN',
    verified: true
  },
  {
    id: 'rev-3',
    author: 'Arun Venkatesh',
    rating: 5,
    relativeDate: '2 months ago',
    business: 'Real Estate Developer, Karnataka',
    text: 'Super responsive and creative team. They built our website, set up our CRM, and handled TV channel news ads along with targeted social ads. Great reporting and transparent communication.',
    avatar: 'AV',
    verified: true
  },
  {
    id: 'rev-4',
    author: 'Kavitha Ramesh',
    rating: 5,
    relativeDate: '3 months ago',
    business: 'Health & Wellness Clinic',
    text: 'The podcast production and Google My Business optimization by PC Creations brought in hundreds of direct walk-in clients. Truly an agency that builds brands, not just runs ads!',
    avatar: 'KR',
    verified: true
  },
  {
    id: 'rev-5',
    author: 'Vikram Joshi',
    rating: 5,
    relativeDate: '4 months ago',
    business: 'Tech Startup Founder',
    text: 'Their AI-powered marketing workflows and rapid video turnaround set them apart from other traditional agencies. 10/10 experience working with the PC Creations Bangalore team.',
    avatar: 'VJ',
    verified: true
  }
];

module.exports = { servicesData, pricingData, reviewsData };
