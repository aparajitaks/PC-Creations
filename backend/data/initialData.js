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

// ─── LMS COURSES DATA ─────────────────────────────────────────────────────────

const coursesData = [
  {
    id: 'meta-ads-mastery',
    title: 'Meta Ads & Performance Marketing Mastery',
    tagline: 'From zero to high-ROAS paid campaigns on Facebook & Instagram',
    badge: 'Bestseller',
    category: 'Paid Advertising',
    level: 'Intermediate',
    duration: '14h 30m',
    totalLessons: 24,
    totalHours: '14.5',
    rating: 4.9,
    ratingCount: 312,
    instructor: {
      name: 'Priya Chandran',
      title: 'Senior Performance Marketing Strategist',
      company: 'PC Creations'
    },
    summary: 'Master the full Meta Ads ecosystem — from audience research and funnel strategy to UGC creatives, CBO scaling, and Advantage+ campaigns. Build ROAS-positive campaigns that scale.',
    learningOutcomes: [
      'Build full-funnel Meta Ads strategy (Awareness → Conversion)',
      'Create high-converting UGC video and image ad creatives',
      'Master Facebook Pixel, Conversions API, and custom events',
      'Launch and scale CBO & Advantage+ campaigns profitably',
      'Run advanced A/B tests for hooks, offers, and audiences',
      'Retarget warm audiences and build lookalike audiences at scale'
    ],
    prerequisites: ['Basic understanding of social media platforms', 'A Facebook Business Manager account'],
    modules: [
      {
        id: 'mod-1',
        title: 'Module 1: Meta Ecosystem Foundations',
        duration: '1h 45m',
        lessons: [
          { id: 'l1-1', title: 'Course Welcome & What You\'ll Build', duration: '8m', isFreePreview: true, description: 'Course overview, learning roadmap, and final campaign blueprint walkthrough.' },
          { id: 'l1-2', title: 'Setting Up Business Manager, Ad Accounts & Pages', duration: '22m', isFreePreview: true, description: 'Step-by-step setup of Facebook Business Manager, creating an ad account, and linking your pages correctly.' },
          { id: 'l1-3', title: 'Installing Facebook Pixel & Conversions API', duration: '28m', isFreePreview: false, description: 'Install Pixel via GTM, set up server-side Conversions API, and verify event firing.' },
          { id: 'l1-4', title: 'Understanding the Meta Ads Auction & Delivery System', duration: '25m', isFreePreview: false, description: 'How Meta decides which ads to show, relevance diagnostics, and auction dynamics.' },
          { id: 'l1-5', title: 'Campaign Objectives Deep Dive: Which to Use When', duration: '22m', isFreePreview: false, description: 'Awareness vs. Traffic vs. Leads vs. Sales — the right objective for each stage.' }
        ]
      },
      {
        id: 'mod-2',
        title: 'Module 2: Audience Research & Targeting',
        duration: '2h 10m',
        lessons: [
          { id: 'l2-1', title: 'Customer Avatar & ICP Workshop', duration: '32m', isFreePreview: false, description: 'Build your Ideal Customer Profile using Meta Audience Insights and competitor research.' },
          { id: 'l2-2', title: 'Cold, Warm & Hot Audience Architecture', duration: '28m', isFreePreview: false, description: 'Full-funnel audience layering: interest stacking for cold, retargeting for warm, loyalty for hot.' },
          { id: 'l2-3', title: 'Custom Audiences: Website, Video Views & Engagement', duration: '35m', isFreePreview: false, description: 'Create pixel-based, video-engagement, and Instagram-profile custom audiences.' },
          { id: 'l2-4', title: 'Lookalike Audiences: Building & Scaling', duration: '25m', isFreePreview: false, description: 'Seed lookalikes from your best customers, purchasers, and high-LTV segments.' },
          { id: 'l2-5', title: 'Advantage+ Audience: When to Use Broad Targeting', duration: '20m', isFreePreview: false, description: 'Let Meta\'s AI find buyers — when open targeting outperforms manual audiences.' }
        ]
      },
      {
        id: 'mod-3',
        title: 'Module 3: Creative Strategy & UGC Production',
        duration: '3h 00m',
        lessons: [
          { id: 'l3-1', title: 'The Hook Formula: First 3 Seconds That Stop Scrolling', duration: '38m', isFreePreview: false, description: '20+ proven hook frameworks with real ad examples from e-commerce, services, and SaaS.' },
          { id: 'l3-2', title: 'UGC Video Ad Production on a Budget', duration: '42m', isFreePreview: false, description: 'Shoot UGC-style ads with your phone, lighting tips, and post-production in CapCut.' },
          { id: 'l3-3', title: 'Static Ad Creative Best Practices for 2025', duration: '30m', isFreePreview: false, description: 'Canva and Figma templates, image ad ratios, and headline formulas.' },
          { id: 'l3-4', title: 'Ad Copy Frameworks: PAS, AIDA & Before/After/Bridge', duration: '30m', isFreePreview: false, description: 'Write ad copy that resonates using proven persuasion frameworks with templates.' },
          { id: 'l3-5', title: 'Creative Testing Framework: Systematic A/B Testing', duration: '40m', isFreePreview: false, description: 'How to test hooks, offers, and formats systematically without burning budget.' }
        ]
      },
      {
        id: 'mod-4',
        title: 'Module 4: Campaign Setup & Scaling',
        duration: '2h 45m',
        lessons: [
          { id: 'l4-1', title: 'Campaign Budget Optimization (CBO) Deep Dive', duration: '35m', isFreePreview: false, description: 'How CBO distributes budget across ad sets and when to use ABO vs. CBO.' },
          { id: 'l4-2', title: 'Advantage+ Shopping Campaigns for E-commerce', duration: '32m', isFreePreview: false, description: 'Set up ASC for rapid ROAS scaling with automated creative optimization.' },
          { id: 'l4-3', title: 'Retargeting Campaigns: Recapture Lost Buyers', duration: '28m', isFreePreview: false, description: 'Multi-touch retargeting sequences for add-to-cart, checkout abandonment, and page visitors.' },
          { id: 'l4-4', title: 'Scaling Strategies: Horizontal vs. Vertical Scaling', duration: '30m', isFreePreview: false, description: 'Budget scaling rules, duplicate-and-scale strategies, and when to increase bids.' },
          { id: 'l4-5', title: 'Campaign Reporting & ROAS Optimization', duration: '40m', isFreePreview: false, description: 'Build a Meta Ads reporting dashboard, interpret KPIs, and make data-driven decisions.' }
        ]
      }
    ]
  },
  {
    id: 'video-reels-virality',
    title: 'High-Converting Video Shoots & Reels Virality',
    tagline: 'Studio production skills + viral content strategy for brands',
    badge: 'Hot',
    category: 'Video Production',
    level: 'All Levels',
    duration: '10h 15m',
    totalLessons: 18,
    totalHours: '10.25',
    rating: 4.8,
    ratingCount: 187,
    instructor: {
      name: 'Rohan Menon',
      title: 'Creative Director & Cinematographer',
      company: 'PC Creations Studio'
    },
    summary: 'Learn professional greenscreen video production, product shoots, reels scripting, and viral content strategy. Go from raw footage to polished, high-converting brand content.',
    learningOutcomes: [
      'Set up a professional studio with greenscreen and lighting on a budget',
      'Direct, shoot, and produce brand ad videos end-to-end',
      'Write viral reel scripts using proven content frameworks',
      'Edit videos with motion graphics and sound design in CapCut/Premiere',
      'Distribute content across Instagram, YouTube Shorts, and Facebook',
      'Analyze performance metrics and iterate for virality'
    ],
    prerequisites: ['A smartphone with a good camera', 'Basic interest in content creation'],
    modules: [
      {
        id: 'mod-1',
        title: 'Module 1: Studio Setup & Production Essentials',
        duration: '1h 50m',
        lessons: [
          { id: 'v1-1', title: 'Course Orientation & Your First Viral Video Blueprint', duration: '10m', isFreePreview: true, description: 'What you\'ll build — a complete brand video production pipeline.' },
          { id: 'v1-2', title: 'Budget Studio Setup: Lighting, Greenscreen & Audio', duration: '40m', isFreePreview: true, description: 'Set up a professional-grade studio using affordable equipment. Softboxes, greenscreen stands, lavalier mics.' },
          { id: 'v1-3', title: 'Camera Settings for Brand Videos (DSLR & Smartphone)', duration: '30m', isFreePreview: false, description: 'Aperture, ISO, shutter speed, and frame rate for cinematic brand shots.' },
          { id: 'v1-4', title: 'Composition & Framing Rules for Commercial Video', duration: '30m', isFreePreview: false, description: 'Rule of thirds, leading lines, depth of field, and shot types for product ads.' }
        ]
      },
      {
        id: 'mod-2',
        title: 'Module 2: Scripting for Virality',
        duration: '1h 45m',
        lessons: [
          { id: 'v2-1', title: 'The Viral Reel Formula: Hook, Build, Payoff', duration: '35m', isFreePreview: false, description: 'Reverse-engineer 30 viral reels to extract the universal structure.' },
          { id: 'v2-2', title: 'Writing Scripts for Brand Reels & Ad Videos', duration: '40m', isFreePreview: false, description: 'Script templates for testimonials, product demos, founder stories, and educational reels.' },
          { id: 'v2-3', title: 'On-Camera Confidence & Directing Founders/Clients', duration: '30m', isFreePreview: false, description: 'Directing non-actors, teleprompter tips, and coaching clients for natural delivery.' }
        ]
      },
      {
        id: 'mod-3',
        title: 'Module 3: Post-Production & Editing',
        duration: '2h 30m',
        lessons: [
          { id: 'v3-1', title: 'CapCut Pro: Full Brand Video Editing Workflow', duration: '50m', isFreePreview: false, description: 'Cut, color grade, add captions, transitions, and motion graphics in CapCut.' },
          { id: 'v3-2', title: 'Premiere Pro: Advanced Editing for Long-Form Ad Videos', duration: '55m', isFreePreview: false, description: 'Multi-camera editing, audio mixing, color grading with LUTs, and export settings.' },
          { id: 'v3-3', title: 'Motion Graphics & Text Animations for Reels', duration: '45m', isFreePreview: false, description: 'Add kinetic typography, animated logos, and lower thirds using After Effects and CapCut.' }
        ]
      },
      {
        id: 'mod-4',
        title: 'Module 4: Distribution & Performance Analysis',
        duration: '1h 30m',
        lessons: [
          { id: 'v4-1', title: 'Instagram Reels Algorithm: How to Get Featured', duration: '30m', isFreePreview: false, description: 'Posting time, hashtag strategy, cover frames, and caption SEO for maximum reach.' },
          { id: 'v4-2', title: 'YouTube Shorts vs. Reels vs. Facebook Reels: Platform Strategy', duration: '28m', isFreePreview: false, description: 'Repurpose one video across platforms with platform-specific tweaks.' },
          { id: 'v4-3', title: 'Analyzing Reel Performance & Iterating for Virality', duration: '32m', isFreePreview: false, description: 'Read Instagram Insights, retention graphs, and make data-driven content decisions.' }
        ]
      }
    ]
  },
  {
    id: 'brand-growth-blueprint',
    title: 'Full-Funnel Brand Growth & Client Acquisition Blueprint',
    tagline: 'Build a brand that attracts, converts, and retains clients systematically',
    badge: 'New',
    category: 'Brand Strategy',
    level: 'Advanced',
    duration: '12h 00m',
    totalLessons: 15,
    totalHours: '12.0',
    rating: 5.0,
    ratingCount: 89,
    instructor: {
      name: 'Aditya Kumar',
      title: 'Brand Growth Director & Co-Founder',
      company: 'PC Creations'
    },
    summary: 'A complete agency playbook for growing brands from 0 to premium positioning. Covers client acquisition systems, brand identity design, omni-channel strategy, and agency operations.',
    learningOutcomes: [
      'Build a powerful brand identity and positioning strategy',
      'Design a full-funnel marketing system that converts cold audiences to loyal clients',
      'Implement automated client acquisition workflows using organic + paid channels',
      'Create a 90-day brand growth roadmap for any business',
      'Run agency-grade performance reporting and QBRs for clients'
    ],
    prerequisites: ['2+ years in marketing or business development', 'Experience running at least one paid campaign'],
    modules: [
      {
        id: 'mod-1',
        title: 'Module 1: Brand Identity & Positioning',
        duration: '2h 30m',
        lessons: [
          { id: 'b1-1', title: 'The PC Creations Brand Framework: Course Welcome', duration: '12m', isFreePreview: true, description: 'The philosophy behind "Build Brand, Not Just Business" and your transformation roadmap.' },
          { id: 'b1-2', title: 'Brand Audit: Where Are You Today?', duration: '45m', isFreePreview: true, description: 'Run a complete brand audit across identity, positioning, digital presence, and competitors.' },
          { id: 'b1-3', title: 'Premium Positioning: Charge 10x With the Right Narrative', duration: '50m', isFreePreview: false, description: 'How to position any brand as the premium choice using story, proof, and authority.' },
          { id: 'b1-4', title: 'Visual Identity Design System for Brands', duration: '43m', isFreePreview: false, description: 'Build brand guidelines: colors, typography, logo rules, and content templates.' }
        ]
      },
      {
        id: 'mod-2',
        title: 'Module 2: Omni-Channel Client Acquisition',
        duration: '3h 00m',
        lessons: [
          { id: 'b2-1', title: 'The 5-Channel Acquisition System', duration: '50m', isFreePreview: false, description: 'Organic social, paid ads, WhatsApp funnels, referral programs, and SEO working together.' },
          { id: 'b2-2', title: 'WhatsApp Business Automation for Lead Nurturing', duration: '55m', isFreePreview: false, description: 'Build automated WhatsApp flows that nurture leads from first inquiry to closed deal.' },
          { id: 'b2-3', title: 'SEO & Google My Business for Local Brand Domination', duration: '55m', isFreePreview: false, description: 'Rank in Google Maps, optimize GMB, and build local SEO authority for Bangalore businesses.' },
          { id: 'b2-4', title: 'Referral Systems That Generate 30% of New Clients', duration: '40m', isFreePreview: false, description: 'Design a referral program that incentivizes existing clients to bring new business.' }
        ]
      },
      {
        id: 'mod-3',
        title: 'Module 3: Agency Operations & Reporting',
        duration: '2h 30m',
        lessons: [
          { id: 'b3-1', title: 'Building the 90-Day Brand Growth Roadmap', duration: '60m', isFreePreview: false, description: 'Week-by-week implementation plan covering all channels and team responsibilities.' },
          { id: 'b3-2', title: 'Client Reporting: Building Dashboards That Wow', duration: '50m', isFreePreview: false, description: 'Google Looker Studio dashboards, automated weekly reports, and QBR presentations.' },
          { id: 'b3-3', title: 'Scaling Agency Revenue: Productizing Services & Retainers', duration: '40m', isFreePreview: false, description: 'Package your services, set retainer prices, and build recurring monthly revenue.' }
        ]
      }
    ]
  }
];

// ─── IN-MEMORY USER STORE (for non-Mongo environments) ────────────────────────
const bcrypt = require('bcryptjs');

const DEMO_PASSWORD_HASH = bcrypt.hashSync('pccreations123', 10);

const inMemoryStore = {
  users: [
    {
      id: 'user-demo-student-001',
      _id: 'user-demo-student-001',
      name: 'Demo Student',
      email: 'student@pccreations.agency',
      password: DEMO_PASSWORD_HASH,
      role: 'student',
      avatar: 'DS',
      enrolledCourses: [
        { courseId: 'meta-ads-mastery', enrolledAt: new Date('2026-09-01'), progress: 45, completedLessons: ['l1-1', 'l1-2', 'l2-1', 'l2-2'], lastAccessedLesson: 'l2-2', isCompleted: false },
        { courseId: 'video-reels-virality', enrolledAt: new Date('2026-09-10'), progress: 20, completedLessons: ['v1-1', 'v1-2'], lastAccessedLesson: 'v1-2', isCompleted: false }
      ],
      createdAt: new Date('2026-09-01')
    },
    {
      id: 'user-admin-001',
      _id: 'user-admin-001',
      name: 'PC Creations Admin',
      email: 'admin@pccreations.agency',
      password: bcrypt.hashSync('admin@pccreations2026', 10),
      role: 'admin',
      avatar: 'PC',
      enrolledCourses: [],
      createdAt: new Date('2026-01-01')
    }
  ],
  courses: coursesData
};

module.exports = { servicesData, pricingData, reviewsData, coursesData, inMemoryStore };
