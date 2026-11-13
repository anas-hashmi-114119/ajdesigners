import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Admin } from '../models/Admin.js';
import { Service } from '../models/Service.js';
import { PricingPackage } from '../models/PricingPackage.js';
import { StandaloneService } from '../models/StandaloneService.js';
import { PortfolioProject } from '../models/PortfolioProject.js';
import { BlogPost } from '../models/BlogPost.js';
import { SiteSettings } from '../models/SiteSettings.js';

dotenv.config();

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ajdesigners';

const servicesData = [
  {
    number: '01',
    title: 'Social Media Management',
    slug: 'social-media-management',
    tagline: 'Maintain a consistent, professional, and engaging multi-platform presence.',
    shortDescription:
      'End-to-end management of your social channels from monthly strategy calendars and scheduling to caption copywriting, community engagement, and performance analytics.',
    fullDescription:
      'We help businesses maintain an active, professional, and results-focused presence across major social media platforms. Whether launching brand accounts or scaling established communities, we streamline publishing cadence, content alignment, and audience interaction so you can focus on core operations.',
    iconName: 'Share2',
    platforms: ['Instagram', 'Facebook', 'LinkedIn', 'TikTok', 'Pinterest', 'YouTube'],
    deliverables: [
      'Social media account management & bio optimization',
      'Monthly content calendars aligned with business milestones',
      'Multi-platform content scheduling and publishing',
      'Persuasive caption copywriting and targeted hashtag research',
      'Active community management & audience engagement',
      'Monthly performance monitoring & analytical reporting',
    ],
    problemsSolved: [
      'Irregular, sporadic posting schedules that hurt organic reach',
      'Lack of cohesive aesthetic across brand social profiles',
      'Time-consuming daily caption writing and engagement chores',
      'No data clarity on which content types drive actual business interest',
    ],
    benefits: [
      'Saves 20+ hours per week of internal operational overhead',
      'Elevates brand authority and customer trust internationally',
      'Fosters loyal community relationships and repeat interactions',
      'Delivers transparent monthly analytics to inform marketing direction',
    ],
    idealClients: ['Startups and SMEs', 'Direct-to-consumer e-commerce brands', 'B2B service firms', 'Consulting agencies'],
    faqs: [
      {
        question: 'Which social media platforms do you support?',
        answer: 'We support Instagram, Facebook, LinkedIn, TikTok, Pinterest, and YouTube according to your target audience profile.',
      },
      {
        question: 'Do you create the graphics and copy or just schedule them?',
        answer: 'Our packages include complete creative development: static designs, video editing, caption writing, hashtag strategy, and scheduling.',
      },
      {
        question: 'Who approves the posts before they go live?',
        answer: 'All posts and monthly calendars are delivered for client review and approval prior to being scheduled across platforms.',
      },
    ],
    order: 1,
    isFeatured: true,
  },
  {
    number: '02',
    title: 'Content Creation',
    slug: 'content-creation',
    tagline: 'Brand-focused content engineered to connect, educate, and convert.',
    shortDescription:
      'High-impact social media creatives, educational carousel designs, infographics, and marketing copywriting tailored to your visual identity.',
    fullDescription:
      'Content is the primary vehicle for your digital brand reputation. AJDesigners conceptualizes and crafts brand-focused visual assets and narrative copy designed to educate prospects, communicate value propositions, and inspire action across digital touchpoints.',
    iconName: 'Palette',
    platforms: ['Instagram', 'LinkedIn', 'Facebook', 'Pinterest', 'Web'],
    deliverables: [
      'Static feed graphics & announcement banners',
      'Multi-slide educational carousel designs',
      'Promotional campaign creatives & infographics',
      'Product-focused visual storytelling',
      'Marketing copywriting & conversion-driven hooks',
      'Visual template systems for brand consistency',
    ],
    problemsSolved: [
      'Inconsistent visual presentation that looks unprofessional',
      'Low audience retention on static posts',
      'Struggling to translate complex services into easily understood visuals',
    ],
    benefits: [
      'Drives higher organic saves, shares, and comments',
      'Builds recognizable visual brand equity over time',
      'Delivers multi-format assets ready for repurposing',
    ],
    idealClients: ['B2B consulting & SaaS', 'Fashion & lifestyle brands', 'Online product retailers', 'Coaches & educators'],
    faqs: [
      {
        question: 'What file formats do you deliver?',
        answer: 'We provide high-resolution PNG, JPG, and MP4 files optimized for each platform, along with editable templates where agreed.',
      },
      {
        question: 'Can you match our existing brand guidelines?',
        answer: 'Yes. We strictly adhere to your brand color codes, typography, logos, and tone of voice.',
      },
    ],
    order: 2,
    isFeatured: true,
  },
  {
    number: '03',
    title: 'AI-Powered Creative Production',
    slug: 'ai-powered-content',
    tagline: 'Modern AI-assisted creative workflows delivering scalable digital content.',
    shortDescription:
      'Cutting-edge generative workflows for product lifestyle imagery, conceptual backgrounds, and visual storytelling—governed by human artistic direction.',
    fullDescription:
      'We combine artificial intelligence with human creative direction to produce scalable, forward-thinking visual assets. From generative lifestyle scenes for physical products to AI-assisted video concepts and rapid campaign mockups, we help brands expand their creative output without ballooning production costs.',
    iconName: 'Cpu',
    platforms: ['Social Media', 'Paid Ads', 'E-commerce Stores', 'Pitch Decks'],
    deliverables: [
      'AI-generated social media concept visuals',
      'AI product lifestyle imagery & photorealistic staging',
      'AI-assisted video generation & motion backgrounds',
      'Creative campaign concept ideation & visual scripts',
      'AI-assisted content repurposing & rapid localization',
      'Human-reviewed aesthetic polish & brand alignment control',
    ],
    problemsSolved: [
      'High costs and long timelines of physical photoshoot productions',
      'Creative fatigue from repetitive stock imagery',
      'Slow turnaround times for testing multiple ad creative variations',
    ],
    benefits: [
      'Up to 3x faster turnaround times on campaign concepts',
      'Unlocks imaginative visual scenes impossible with standard cameras',
      'Guaranteed human art direction and brand alignment before release',
    ],
    idealClients: ['E-commerce & direct-to-consumer brands', 'Tech startups', 'Creative agencies', 'Innovative product sellers'],
    faqs: [
      {
        question: 'Does AI replace human designers at AJDesigners?',
        answer: 'No. AI is utilized as a powerful accelerant. Every asset is directed, refined, color-corrected, and curated by our senior creative team.',
      },
      {
        question: 'Do you work with physical product photos?',
        answer: 'Yes. Clients provide standard product photography, which we blend into realistic lifestyle contexts using custom generative pipelines.',
      },
    ],
    order: 3,
    isFeatured: true,
  },
  {
    number: '04',
    title: 'Graphic Design & Branding',
    slug: 'graphic-design-branding',
    tagline: 'Establish a memorable, professional, and enduring brand identity.',
    shortDescription:
      'Complete brand identity design, logo suites, typography selection, color systems, social templates, and marketing collateral.',
    fullDescription:
      'Your visual identity is the foundational anchor of customer perception. AJDesigners crafts comprehensive branding solutions that articulate who you are, what you stand for, and why your audience should choose you over competitors.',
    iconName: 'PenTool',
    platforms: ['Digital', 'Print', 'Packaging', 'Presentations'],
    deliverables: [
      'Custom logo design & secondary mark suites',
      'Color palette architecture & typography hierarchy',
      'Comprehensive brand identity guidelines documentation',
      'Social media post and story template kits',
      'Marketing brochures, pitch decks, and digital banners',
      'Business collateral and digital presentation design',
    ],
    problemsSolved: [
      'Generic or outdated branding that fails to convey premium quality',
      'Inconsistent visual identity across marketing touchpoints',
      'Lack of clear brand guidelines for internal teams and vendors',
    ],
    benefits: [
      'Commands premium positioning and higher client price points',
      'Ensures uniform customer touchpoints from social to pitch decks',
      'Provides reusable design assets for frictionless future marketing',
    ],
    idealClients: ['New ventures & startups', 'Companies undergoing brand repositioning', 'B2B firms seeking modern polish'],
    faqs: [
      {
        question: 'What is included in the Brand Guidelines document?',
        answer: 'It defines logo usage, minimum clear space, primary and secondary color palettes (HEX, RGB, CMYK), typography hierarchy, and imagery direction.',
      },
      {
        question: 'How many logo concept directions do you provide?',
        answer: 'We provide multiple distinct creative concepts based on our initial brand discovery workshop, followed by structured revision rounds.',
      },
    ],
    order: 4,
    isFeatured: true,
  },
  {
    number: '05',
    title: 'Short-Form Video & Reels Creation',
    slug: 'short-form-video-reels',
    tagline: 'Engaging vertical video formats engineered for algorithmic virality.',
    shortDescription:
      'End-to-end editing of Instagram Reels, TikTok videos, and YouTube Shorts featuring kinetic typography, sound design, and hook pacing.',
    fullDescription:
      'Short-form vertical video is the dominant format for digital reach and brand affinity. We edit and package client-supplied video assets into fast-paced, high-retention video stories designed to capture attention in the first three seconds.',
    iconName: 'Video',
    platforms: ['Instagram Reels', 'TikTok', 'YouTube Shorts', 'LinkedIn Video'],
    deliverables: [
      'Fast-paced editing with hook-first retention pacing',
      'Animated captions, on-screen subtitles, and text callouts',
      'Curated background audio and dynamic sound effects',
      'Motion graphics, brand watermarks, and smooth transitions',
      'Optimized vertical aspect ratio formatting (9:16)',
      'Thumbnail frame design and caption writing',
    ],
    problemsSolved: [
      'Low watch time on raw or unedited video clips',
      'Hours spent struggling with complex video editing software',
      'Inability to capitalize on vertical video algorithms',
    ],
    benefits: [
      'Significantly higher algorithmic exposure on Instagram and TikTok',
      'Boosts profile discoverability without paid ad spend',
      'Positions founders and brands as modern, approachable leaders',
    ],
    idealClients: ['Personal brands & founders', 'E-commerce product lines', 'Fitness & beauty studios', 'Restaurants & travel brands'],
    faqs: [
      {
        question: 'How do we provide video footage to your team?',
        answer: 'You can upload raw clips, talking-head videos, or product demos to a shared Google Drive or Dropbox folder.',
      },
      {
        question: 'Can you add subtitles and trending audio?',
        answer: 'Yes. We provide stylized kinetic captions, subtitle formatting, and sound design tailored to commercial platform policies.',
      },
    ],
    order: 5,
    isFeatured: true,
  },
  {
    number: '06',
    title: 'Digital Advertising & Paid Campaigns',
    slug: 'digital-advertising',
    tagline: 'Data-driven paid media campaigns focused on qualified customer acquisition.',
    shortDescription:
      'Full campaign architecture across Meta Ads (Facebook/Instagram), Google Ads, and LinkedIn Ads with continuous audience testing.',
    fullDescription:
      'Stop wasting ad spend on vanity impressions. AJDesigners designs, tests, and optimizes structured advertising campaigns that reach precisely targeted decision-makers and prospective buyers.',
    iconName: 'Target',
    platforms: ['Meta Ads (Facebook & Instagram)', 'Google Ads', 'LinkedIn Ads', 'TikTok Ads'],
    deliverables: [
      'Paid advertising strategy & conversion funnel mapping',
      'Audience segmentation, demographic & retargeting setups',
      'Ad creative copy, headline variations, and visual assets',
      'Campaign setup and conversion event verification',
      'A/B testing of creatives, audiences, and calls to action',
      'Ongoing budget optimization and weekly/monthly reporting',
    ],
    problemsSolved: [
      'High cost-per-click without qualified lead conversions',
      'Ad fatigue and diminishing returns on old creative assets',
      'Unclear attribution and lack of transparent performance data',
    ],
    benefits: [
      'Predictable, scalable customer acquisition pipeline',
      'Re-engages warm website visitors through retargeting',
      'Continuous creative testing to reduce customer acquisition costs',
    ],
    idealClients: ['E-commerce stores', 'B2B service providers', 'Real estate firms', 'Educational programs'],
    faqs: [
      {
        question: 'Does your pricing include advertising ad spend?',
        answer: 'No. Our fee covers strategy, creative development, campaign management, and optimization. Ad spend is paid directly to the ad platforms.',
      },
      {
        question: 'How do you measure campaign success?',
        answer: 'We focus on business metrics: Cost Per Lead (CPL), Return on Ad Spend (ROAS), Cost Per Acquisition (CPA), and conversion rates.',
      },
    ],
    order: 6,
    isFeatured: true,
  },
  {
    number: '07',
    title: 'B2B Lead Generation',
    slug: 'lead-generation',
    tagline: 'Attract, qualify, and convert high-value corporate decision-makers.',
    shortDescription:
      'Structured lead capture funnels, downloadable lead magnets, persuasive landing page messaging, and targeted outreach architectures.',
    fullDescription:
      'For service-based companies and B2B enterprises, customer acquisition requires trust, authority, and structured communication. We build repeatable lead funnels that attract potential clients and nurture them toward discovery meetings.',
    iconName: 'TrendingUp',
    platforms: ['LinkedIn', 'Landing Pages', 'Email', 'Webinar Funnels'],
    deliverables: [
      'B2B customer acquisition strategy & ideal client profile definition',
      'Lead magnet ideation & design (guides, checklists, frameworks)',
      'High-converting landing page copywriting and visual layout',
      'Lead capture form integration and conversion tracking',
      'Nurture email sequence copy and campaign asset creation',
      'Detailed lead funnel reporting and optimization recommendations',
    ],
    problemsSolved: [
      'Inconsistent sales pipeline relying only on word of mouth',
      'High bounce rates on corporate landing pages',
      'Lack of qualified business inquiries',
    ],
    benefits: [
      'Generates inbound inquiries from verified business decision-makers',
      'Builds an owned email database of prospects for long-term nurture',
      'Shortens the B2B sales cycle through informative upfront collateral',
    ],
    idealClients: ['SaaS companies', 'Corporate consulting firms', 'IT services', 'Recruitment & HR agencies'],
    faqs: [
      {
        question: 'What types of lead magnets work best for B2B?',
        answer: 'Industry benchmark reports, actionable operational checklists, cost calculators, and strategic case study teardowns work exceptionally well.',
      },
    ],
    order: 7,
    isFeatured: false,
  },
  {
    number: '08',
    title: 'LinkedIn Marketing & Executive Branding',
    slug: 'linkedin-marketing',
    tagline: 'Establish undeniable thought leadership and founder credibility on LinkedIn.',
    shortDescription:
      'Executive ghostwriting, company page management, custom LinkedIn carousels, and strategic thought leadership content.',
    fullDescription:
      'LinkedIn is the premier network for global professional influence. We partner with founders, executives, and B2B brands to build compelling personal profiles and company pages that position them as authoritative voices in their sector.',
    iconName: 'Linkedin',
    platforms: ['LinkedIn Personal Profiles', 'LinkedIn Company Pages', 'LinkedIn Newsletters'],
    deliverables: [
      'Executive profile audit & positioning optimization',
      'Company page management and visual asset curation',
      'Strategic thought leadership post ghostwriting',
      'Custom branded LinkedIn carousels & infographics',
      'Monthly editorial calendars based on industry insights',
      'Community discussion and targeted comment engagement',
    ],
    problemsSolved: [
      'Dormant or unprofessional LinkedIn profiles representing company leaders',
      'Struggling to find time to write insightful posts consistently',
      'Zero inbound organic opportunities from professional networks',
    ],
    benefits: [
      'Attracts high-tier enterprise clients, partners, and top talent',
      'Positions leadership as forward-thinking industry experts',
      'Builds lasting credibility with investors and corporate buyers',
    ],
    idealClients: ['Founders & CEOs', 'Venture-backed startups', 'Consultants & advisors', 'B2B enterprise firms'],
    faqs: [
      {
        question: 'How does ghostwriting work for executive profiles?',
        answer: 'We conduct a monthly interview or gather voice notes to capture your philosophy and voice, which our copywriters craft into polished posts for your approval.',
      },
    ],
    order: 8,
    isFeatured: false,
  },
  {
    number: '09',
    title: 'Website & Landing Page Content',
    slug: 'website-landing-page-content',
    tagline: 'Conversion-focused digital copywriting that turns visitors into clients.',
    shortDescription:
      'Value-driven website copy, high-converting service pages, product descriptions, and persuasive call-to-action frameworks.',
    fullDescription:
      'Traffic is worthless if your website fails to communicate value clearly. AJDesigners writes conversion-oriented web content that clearly articulates your offer, disarms buyer objections, and drives prospective clients to take action.',
    iconName: 'FileText',
    platforms: ['Company Websites', 'SaaS Portals', 'Landing Pages', 'E-commerce'],
    deliverables: [
      'Full website copywriting (Home, About, Services, Contact)',
      'High-converting landing page frameworks & headlines',
      'Service and product descriptions focused on outcomes',
      'Strategic call-to-action hierarchy and friction reduction',
      'Basic SEO keyword integration and readability optimization',
      'Visual wireframe suggestions to guide design implementation',
    ],
    problemsSolved: [
      'Vague, jargon-heavy website copy that confuses prospects',
      'High visitor bounce rates and low inquiry form completions',
      'Lack of clear differentiation from direct market competitors',
    ],
    benefits: [
      'Immediately clarifies your core value proposition within 5 seconds',
      'Significantly increases contact and consultation form submissions',
      'Aligns messaging across international target markets',
    ],
    idealClients: ['Tech & SaaS businesses', 'Professional services', 'Agencies & studios', 'E-commerce stores'],
    faqs: [
      {
        question: 'Do you provide web copy only or full web design?',
        answer: 'We provide strategic copywriting with wireframe suggestions, and we also build full modern websites through our development partnerships.',
      },
    ],
    order: 9,
    isFeatured: false,
  },
  {
    number: '10',
    title: 'SEO & Digital Content Optimization',
    slug: 'seo-digital-content-optimization',
    tagline: 'Improve digital discoverability, search visibility, and organic traffic.',
    shortDescription:
      'Comprehensive keyword research, on-page SEO optimization, meta architecture, content gap audits, and strategic blog planning.',
    fullDescription:
      'Organic search provides compounding, sustainable traffic over time. We research and optimize your digital content structure to help search engines understand and rank your services for relevant international commercial queries.',
    iconName: 'Search',
    platforms: ['Google Search', 'Bing', 'Social Search & Profiles', 'Blog Portals'],
    deliverables: [
      'Targeted commercial keyword research & intent analysis',
      'On-page SEO optimization for titles, headers, and meta tags',
      'Strategic editorial blog content roadmap & outline creation',
      'SEO-friendly content optimization and internal link planning',
      'Technical content structure recommendations & basic audit',
      'Social media profile searchability & keyword optimization',
    ],
    problemsSolved: [
      'Zero organic search traffic for core service terms',
      'Poorly structured content that search engines fail to index properly',
      'Publishing blog posts with no keyword strategy or search demand',
    ],
    benefits: [
      'Builds steady organic pipeline without recurring ad spend',
      'Strengthens long-term domain authority and credibility',
      'Ensures every piece of published content has measurable purpose',
    ],
    idealClients: ['Startups aiming for long-term growth', 'B2B service providers', 'Specialized regional & international firms'],
    faqs: [
      {
        question: 'Do you guarantee number 1 rankings on Google?',
        answer: 'No reputable agency guarantees specific rankings. We apply ethical white-hat SEO best practices, keyword targeting, and technical optimizations that maximize ranking opportunities.',
      },
    ],
    order: 10,
    isFeatured: false,
  },
];

const pricingPackagesData = [
  {
    tierKey: 'starter',
    name: 'Starter',
    planTitle: 'Social Media Essentials',
    monthlyPrice: 399,
    currency: '$',
    billingPeriod: 'month',
    subtitle: 'Ideal for early-stage startups and niche founders establishing consistent brand presence.',
    isRecommended: false,
    badgeText: '',
    deliverables: [
      '12 High-Impact Static Graphic Designs',
      '4 Short-Form Video Edits / Reels (up to 30s)',
      '1 Core Platform Managed & Scheduled',
      'Monthly Content Strategy Roadmap',
      'Captions & Platform-Native Hashtag Sets',
      '48-Hour Average Turnaround',
      'Async Notion Dashboard & Slack Portal',
    ],
    idealFor: 'Best for early-stage startups and niche founders establishing consistent brand presence.',
    revisionRounds: 1,
    platformsCount: 1,
    order: 1,
    active: true,
  },
  {
    tierKey: 'growth',
    name: 'Growth',
    planTitle: 'Social Media Growth Engine',
    monthlyPrice: 1200,
    currency: '$',
    billingPeriod: 'month',
    subtitle: 'Engineered for high-growth SaaS, E-Commerce, and B2B brands scaling qualified customer pipelines.',
    isRecommended: true,
    badgeText: 'MOST POPULAR • BEST ROI',
    deliverables: [
      '28 High-Converting Static Designs & Carousels',
      '12 AI UGC Video Ads & Short-Form Reels',
      '3 Platforms Managed (Instagram, TikTok, LinkedIn)',
      'Paid Ad Creative Variant Testing (Meta / TikTok)',
      'Bi-Weekly Growth Analytics & Competitor Audits',
      'Priority 24-48h Asset Turnaround',
      'Direct Slack Channel with Yashwa & Aroosa',
      '2 Revision Rounds per Asset with Rapid Iteration',
    ],
    idealFor: 'Best for high-growth SaaS, E-Commerce, and B2B brands scaling qualified customer pipelines.',
    revisionRounds: 2,
    platformsCount: 3,
    order: 2,
    active: true,
  },
  {
    tierKey: 'scale',
    name: 'Scale',
    planTitle: 'Full Creative Department',
    monthlyPrice: 2200,
    currency: '$',
    billingPeriod: 'month',
    subtitle: 'A full-stack creative department on demand for international brands dominating global markets.',
    isRecommended: false,
    badgeText: 'ENTERPRISE VELOCITY',
    deliverables: [
      '60+ Omnichannel Creative Assets & Motion Design',
      '24 AI UGC Video Ads with Native Voiceovers',
      'Full Multi-Platform Distribution & Community Care',
      'Dedicated Performance Ad Campaign Scaling',
      'High-Converting Landing Page Design & CRO Mockups',
      'Dedicated Creative Director Oversight',
      'Unlimited Revision Rounds within Scope',
      'Weekly Synchronous Video Strategy Reviews',
    ],
    idealFor: 'A full-stack creative department on demand for international brands dominating global markets.',
    revisionRounds: 3,
    platformsCount: 4,
    order: 3,
    active: true,
  },
];

const standaloneServicesData = [
  {
    name: '10 social media graphic designs',
    startingPrice: 99,
    currency: '$',
    description: '10 high-resolution static social creatives customized to your brand colors, fonts, and messaging.',
    deliverablesSummary: '10 static creatives + source formats',
    order: 1,
  },
  {
    name: '5 short-form video edits',
    startingPrice: 125,
    currency: '$',
    description: 'Dynamic editing for 5 Reels/TikTok clips with kinetic typography, hooks, and audio sync.',
    deliverablesSummary: '5 vertical videos (up to 30-60s)',
    order: 2,
  },
  {
    name: 'AI-assisted creative content bundle (10 assets)',
    startingPrice: 149,
    currency: '$',
    description: '10 generative product lifestyle scenes or concept visuals with human art direction.',
    deliverablesSummary: '10 AI-assisted high-res assets',
    order: 3,
  },
  {
    name: 'Brand identity starter kit',
    startingPrice: 199,
    currency: '$',
    description: 'Primary logo, color palette, typography pairing, and essential social templates.',
    deliverablesSummary: 'Logo suite + Mini brand style guide',
    order: 4,
  },
  {
    name: 'LinkedIn content package (8 posts)',
    startingPrice: 199,
    currency: '$',
    description: '8 professionally ghostwritten thought leadership posts plus custom graphics for company or founder.',
    deliverablesSummary: '8 articles/posts + visual assets',
    order: 5,
  },
  {
    name: 'Social media audit and strategy',
    startingPrice: 99,
    currency: '$',
    description: 'Comprehensive evaluation of your social profiles with actionable improvements and roadmap.',
    deliverablesSummary: 'Audit presentation deck + action checklist',
    order: 6,
  },
  {
    name: 'Landing page copywriting',
    startingPrice: 149,
    currency: '$',
    description: 'Conversion-focused copy for one core landing page or service page including wireframe outline.',
    deliverablesSummary: 'Full page copy + CTA framework',
    order: 7,
  },
];

const portfolioProjectsData = [
  {
    title: 'LuxeAura Botanical Skincare',
    slug: 'luxeaura-skincare-concept',
    category: 'AI-Generated Creative Content',
    clientOrConceptName: 'Concept Studio Project',
    isConcept: true,
    industry: 'Beauty & Skincare',
    servicesProvided: ['AI Product Staging', 'Social Media Designs', 'Visual Art Direction'],
    summary:
      'Conceptual generative product photography placing minimalist organic serum bottles in photorealistic Mediterranean botanical environments.',
    fullDescription:
      'LuxeAura was developed as an exploratory case study demonstrating how direct-to-consumer cosmetic brands can produce premium lifestyle imagery without five-figure studio shoots. We engineered generative prompts, refined lighting angles, and produced twenty cohesive brand assets suitable for e-commerce and Instagram carousel ads.',
    coverImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
    additionalMedia: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80',
    ],
    featured: true,
    published: true,
    order: 1,
  },
  {
    title: 'Apex Cloud Systems — B2B Growth Architecture',
    slug: 'apex-cloud-systems-concept',
    category: 'Promotional Campaigns',
    clientOrConceptName: 'Concept Exploration',
    isConcept: true,
    industry: 'Technology & SaaS',
    servicesProvided: ['B2B Lead Generation', 'LinkedIn Carousels', 'Landing Page Copy'],
    summary:
      'Complete B2B marketing campaign concept for an enterprise cloud security solution, highlighting data resilience and developer agility.',
    fullDescription:
      'This project showcases a structured B2B lead generation campaign. The deliverables included a high-converting downloadable whitepaper framework, five multi-slide LinkedIn educational carousels, and landing page messaging tested against enterprise IT decision-maker objections.',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    additionalMedia: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    ],
    featured: true,
    published: true,
    order: 2,
  },
  {
    title: 'Nova Minimalist Streetwear — Visual Identity',
    slug: 'nova-apparel-branding-concept',
    category: 'Branding Projects',
    clientOrConceptName: 'Concept Studio Showcase',
    isConcept: true,
    industry: 'Fashion & Lifestyle',
    servicesProvided: ['Brand Identity Design', 'Typography Suite', 'Social Media Templates'],
    summary:
      'Monochrome, high-fashion visual identity system crafted for an urban sustainable clothing label targeting European and North American youth.',
    fullDescription:
      'Nova required a sharp, timeless visual identity capable of scaling across digital stores, physical garment tags, and Instagram stories. We developed a stark sans-serif logomark, a structured modular layout grid, and a suite of reusable Instagram feed templates.',
    coverImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    additionalMedia: [
      'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80',
    ],
    featured: true,
    published: true,
    order: 3,
  },
  {
    title: 'Vanguard Luxury Real Estate Campaign',
    slug: 'vanguard-real-estate-concept',
    category: 'Social Media Designs',
    clientOrConceptName: 'Sample Work Showcase',
    isConcept: true,
    industry: 'Real Estate',
    servicesProvided: ['Social Media Designs', 'Meta Ad Creatives', 'Video Showcase Editing'],
    summary:
      'High-end social media property showcases combining architectural typography, floorplan infographics, and video walkthrough snippets.',
    fullDescription:
      'A comprehensive showcase developed for premier property brokers in international metropolitan markets (London, Dubai, Miami). The design language leverages deep navy backgrounds, gold accents, and sharp typography to convey luxury asset stability.',
    coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    additionalMedia: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    ],
    featured: true,
    published: true,
    order: 4,
  },
  {
    title: 'Kinetic Sound Studios — Dynamic Reels Editing',
    slug: 'kinetic-sound-reels-concept',
    category: 'Short-Form Videos',
    clientOrConceptName: 'Creative Concept',
    isConcept: true,
    industry: 'Entertainment & Audio',
    servicesProvided: ['Short-Form Video Editing', 'Motion Graphics', 'Sound Design'],
    summary:
      'High-velocity vertical video editing featuring beat-synced cuts, dynamic animated typography, and behind-the-scenes recording footage.',
    fullDescription:
      'Created as a benchmark for high-retention short-form video content. Utilizing 3-second hook structures, subtle zoom transitions, and bold stylized captions, this package demonstrates how creative studios can capture algorithmic traction on Instagram and TikTok.',
    coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
    additionalMedia: [],
    featured: false,
    published: true,
    order: 5,
  },
  {
    title: 'Aura Organic Matcha — 30-Day Content Architecture',
    slug: 'aura-matcha-content-calendar-concept',
    category: 'Content Calendars',
    clientOrConceptName: 'Concept Blueprint',
    isConcept: true,
    industry: 'Food & Beverage',
    servicesProvided: ['Content Strategy', 'Social Media Scheduling', 'Community Engagement Plan'],
    summary:
      'A complete 30-day multi-channel content calendar balancing educational brewing tips, product carousels, and wellness lifestyle prompts.',
    fullDescription:
      'This project illustrates the exact planning methodology AJDesigners implements for monthly retainer clients. Each post is categorized by purpose (Educational, Inspirational, Promotional, Social Proof) with mapped captions, visual assets, and timing recommendations.',
    coverImage: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=80',
    additionalMedia: [],
    featured: false,
    published: true,
    order: 6,
  },
  {
    title: 'Pulse Financial Advisory — High-Converting Landing Page',
    slug: 'pulse-financial-landing-page-concept',
    category: 'Website and Landing Page Projects',
    clientOrConceptName: 'Concept Project',
    isConcept: true,
    industry: 'Professional Services',
    servicesProvided: ['Website Copywriting', 'Conversion Architecture', 'UI Mockups'],
    summary:
      'Strategic B2B landing page copy and visual layout designed to generate high-net-worth wealth management consultation inquiries.',
    fullDescription:
      'A masterclass in financial copywriting: replacing dry technical disclaimers with transparent value propositions, clear risk-mitigation messaging, and a frictionless multi-step booking form designed to maximize qualification.',
    coverImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
    additionalMedia: [],
    featured: false,
    published: true,
    order: 7,
  },
];

const blogPostsData = [
  {
    title: 'How AI Is Transforming Digital Content Creation Without Losing Human Authenticity',
    slug: 'how-ai-is-changing-content-creation',
    excerpt:
      'Discover how leading creative agencies use artificial intelligence to accelerate production speed and scale while maintaining human judgment, nuance, and brand integrity.',
    content: `
# How AI Is Transforming Digital Content Creation

The rapid emergence of generative artificial intelligence has fundamentally disrupted how digital agencies conceptualize, produce, and distribute creative assets. Yet across global markets, businesses are confronting a critical challenge: **How do you leverage the speed of AI without sacrificing the human resonance and brand credibility that customers demand?**

At AJDesigners, our philosophy is anchored in a simple principle: **AI is a powerful creative amplifier, not a replacement for strategic discernment.**

---

## 1. The Real Danger of Ungoverned AI Content

Many organizations made the early mistake of generating raw, unedited AI visuals and publishing unvetted automated copy directly to their social channels. The consequences were immediate:
- Generic, repetitive visual tropes (uncanny hands, glossy artificial lighting, cliché visual metaphors)
- Bland, robotic prose that lacks distinct brand personality
- Algorithmic saturation leading to diminishing organic engagement

Audiences have developed high sensitivity to synthetic content. When they detect purely automated output, trust in the business diminishes.

---

## 2. The Hybrid Creative Workflow: Human Strategy + Machine Scale

The most effective digital agencies treat AI models as rapid conceptualization engines within a structured human workflow:

1. **Creative Briefing & Direction:** A senior art director defines the aesthetic constraints, palette codes, lighting mood, and brand guidelines.
2. **Generative Ideation:** AI pipelines produce dozens of visual iterations in minutes—exploring staging angles and lifestyle scenes that would otherwise take days to organize physically.
3. **Curatorial Filtering:** Experienced designers select only the top tier of concepts that align with the brand identity.
4. **Manual Retouching & Typography:** Every selected asset is brought into professional design suites for typography integration, color grading, logo placement, and final polish.

---

## 3. Practical Applications for Growing Brands

### A. E-Commerce Product Staging
Physical photoshoot productions frequently cost thousands of dollars for studio hire, models, and permits. Generative models allow brands to place product bottles, garments, and items into diverse international environments (a Parisian cafe, a Tokyo rooftop, a Pacific coastline) with photographic fidelity.

### B. Dynamic Ad Variant Testing
Instead of testing one or two visual concepts in Meta Ads or Google Ads, brands can launch ten nuanced aesthetic variants to identify which imagery drives the lowest cost per customer acquisition.

---

## Conclusion

Technology will continue to evolve, but human empathy, cultural context, and strategic brand positioning remain the true drivers of customer decisions. When paired thoughtfully, human creativity and AI innovation offer businesses an unprecedented competitive advantage.
    `,
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    category: 'AI & Innovation',
    readTime: '6 min read',
    tags: ['Artificial Intelligence', 'Content Creation', 'Digital Strategy', 'Brand Building'],
    featured: true,
    published: true,
    metaTitle: 'How AI Is Changing Content Creation | AJDesigners Insights',
    metaDescription:
      'Learn how modern agencies combine AI generative workflows with human creative direction to produce scalable, high-converting digital content.',
  },
  {
    title: 'The Anatomy of a High-Converting B2B LinkedIn Marketing Strategy',
    slug: 'linkedin-marketing-for-b2b',
    excerpt:
      'A practical framework for founders, SaaS companies, and professional service firms looking to turn LinkedIn from a dormant resume into an inbound client engine.',
    content: `
# The Anatomy of a High-Converting B2B LinkedIn Marketing Strategy

LinkedIn has shifted dramatically from an online CV repository into the world's most lucrative B2B distribution channel. For consultants, software companies, and professional services, a single well-crafted post can initiate conversations with enterprise decision-makers across the US, UK, Europe, and UAE.

Yet most companies treat LinkedIn like a corporate bulletin board—announcing press releases and hiring notices while ignoring the real driver of engagement: **Actionable thought leadership.**

---

## The Three Pillars of Modern LinkedIn Presence

### 1. The Executive Personal Profile
People do business with people, not logos. The personal profiles of founders and department heads routinely generate 5x to 10x the organic reach of corporate company pages. Your personal profile must function as a mini landing page:
- **Headline:** Focus on who you help and what outcome you deliver, rather than a generic job title.
- **Featured Section:** Direct links to your primary case study, consultation booking calendar, or proprietary framework.
- **About Section:** A concise narrative outlining the core problem your industry faces and your unique methodology for solving it.

### 2. Multi-Slide Educational Carousels
Document posts (PDF carousels) retain user attention longer than single-image updates. When users swipe through 8 to 12 slides of actionable insights, the platform's algorithm recognizes deep user dwell time and expands organic distribution.

### 3. The 80/20 Content Cadence
- **80% Value & Perspective:** Industry breakdowns, operational teardowns, mistakes to avoid, and contrarian points of view.
- **20% Commercial Intent:** Case study results, client project walkthroughs, and direct invitations to schedule discovery consultations.

---

## Measuring Real B2B Outcomes

Do not fall into the trap of measuring vanity impressions. True B2B success is measured by:
- Number of qualified direct messages received from decision-makers
- Referral traffic to landing pages
- Discovery calls scheduled directly from LinkedIn touchpoints

Consistency over six months builds compounded brand authority that competitors cannot easily replicate.
    `,
    coverImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
    category: 'B2B Marketing',
    readTime: '5 min read',
    tags: ['LinkedIn', 'B2B Marketing', 'Lead Generation', 'Thought Leadership'],
    featured: true,
    published: true,
    metaTitle: 'B2B LinkedIn Marketing Strategies | AJDesigners Insights',
    metaDescription:
      'Transform your B2B LinkedIn presence. Learn the exact content frameworks, carousel structures, and profile positioning that generate inbound enterprise leads.',
  },
  {
    title: 'Why Most Small Business Social Media Strategies Fail (And How to Fix Them)',
    slug: 'social-media-marketing-mistakes',
    excerpt:
      'Posting randomly without a clear funnel leads to burnout and zero revenue. Here are the 5 critical mistakes small businesses make and the exact solutions to fix them.',
    content: `
# Why Most Small Business Social Media Strategies Fail

Every business owner understands they need to "be on social media." Yet the majority end up feeling like they are on an endless hamster wheel: spending hours filming clips and drafting graphics, only to receive a handful of likes and zero customer inquiries.

The problem is rarely the algorithm. The problem is a fundamental disconnect between **social activity** and **business objectives**.

---

## Mistake 1: Treating Social Media as a Megaphone Rather Than a Conversation
Broadcasting promotions and discounts daily drives followers away. Social media algorithms prioritize community engagement—replies, saves, and shares. If your content doesn't educate, entertain, or provide tangible value to the viewer, they will simply scroll past.

## Mistake 2: Inconsistent Publishing Cadence
Posting five times in one week followed by three weeks of silence resets your algorithmic momentum. Consistency is about establishing an operating rhythm you can sustain long-term. Three high-value posts per week will consistently outperform erratic daily spam.

## Mistake 3: Zero Call-to-Action Architecture
You cannot expect potential customers to guess the next step. Every piece of content should have a clear, frictionless call to action:
- "Save this checklist for your next campaign planning session."
- "Send us a direct message with the word 'GROWTH' to receive our free audit template."
- "Click the link in our bio to book your complimentary 20-minute strategy session."

## Mistake 4: Disregarding Visual and Brand Alignment
When your posts look like generic templates downloaded from an app without brand consistency, your business appears amateur. Cohesive typography, curated color palettes, and polished graphic design immediately establish trust.

---

## The Solution: A Structured Monthly Content Calendar
Shift from daily panic to monthly planning. By dedicating one day each month to strategizing your content themes, drafting copy, and preparing visual assets, your marketing becomes intentional, scalable, and stress-free.
    `,
    coverImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
    category: 'Social Media Strategy',
    readTime: '5 min read',
    tags: ['Social Media Marketing', 'Small Business', 'Growth', 'Content Strategy'],
    featured: false,
    published: true,
    metaTitle: 'Common Social Media Marketing Mistakes | AJDesigners',
    metaDescription:
      'Identify the top reasons small business social media campaigns fail and learn the practical steps to build an engaging, revenue-generating strategy.',
  },
  {
    title: 'Short-Form Video Mastery: Capturing Attention in the First 3 Seconds',
    slug: 'short-form-video-marketing-strategies',
    excerpt:
      'With audience attention spans shorter than ever, learn how to script, film, and edit vertical reels that stop the scroll and drive genuine follower growth.',
    content: `
# Short-Form Video Mastery: Capturing Attention in the First 3 Seconds

Across Instagram Reels, TikTok, and YouTube Shorts, the battle for user attention is decided within the first **1.8 to 3 seconds**. If a viewer isn't visually or intellectually hooked in that fleeting window, their thumb continues downward and your content is lost.

For brands and creators, understanding the structural mechanics of high-retention video editing is no longer optional—it is essential.

---

## 1. Visual and Audio Hooks
A hook is not merely what you say; it is the total sensory trigger occurring at second zero:
- **Visual Pattern Interrupt:** An unexpected camera movement, rapid text pop, or unusual physical action that disrupts the monotonous scrolling pattern.
- **Bold On-Screen Title:** Over 70% of social users consume video with the sound muted. Your headline must be large, high-contrast, and instantly readable.
- **Audio Cadence:** An upbeat sound effect (whoosh, click, bell) that syncs precisely with the visual entrance.

---

## 2. Retention Pacing & Kinetic Subtitles
Once the hook succeeds, you must maintain watch time throughout the video:
- Cut out every breath, pause, and filler word.
- Change the visual framing (zoom in, pan, switch camera angle) every 2.5 to 3.5 seconds.
- Use animated kinetic captions highlighting key keywords in brand accent colors (e.g., Electric Blue or Vibrant Purple).

---

## 3. The 3-Part Video Formula
1. **The Hook (0–3s):** Identify a specific frustration or curious outcome ("Stop making this common design mistake...").
2. **The Delivery (3–25s):** Provide three concise, actionable points without unnecessary fluff.
3. **The Payoff & Action (25–30s):** Summarize the solution and deliver a direct call to action ("Read the caption for the exact tool stack").

Mastering this rhythm transforms short-form video into your brand's highest-volume discovery engine.
    `,
    coverImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
    category: 'Video Production',
    readTime: '4 min read',
    tags: ['Reels', 'TikTok', 'Video Marketing', 'Motion Graphics'],
    featured: false,
    published: true,
    metaTitle: 'Short-Form Video Marketing Strategies | AJDesigners',
    metaDescription:
      'Learn how to script, edit, and optimize Instagram Reels and TikTok videos that capture attention in 3 seconds and drive algorithmic reach.',
  },
  {
    title: 'Why Strategic Brand Identity Is Your Highest-Yield Business Asset',
    slug: 'importance-of-brand-identity',
    excerpt:
      'A logo is only the tip of the iceberg. Understand how comprehensive brand guidelines and cohesive design elevate pricing power and market credibility.',
    content: `
# Why Strategic Brand Identity Is Your Highest-Yield Business Asset

Many emerging business owners consider branding an afterthought—a quick logo purchased for twenty dollars, a generic font chosen at random, and whatever color happens to be trendy this quarter.

Yet in international markets where prospective customers have thousands of alternatives at their fingertips, **brand perception determines your pricing power.**

---

## The Difference Between a Logo and Brand Identity

- **A Logo:** A graphical mark used as a quick visual signature.
- **A Brand Identity:** The entire sensory system through which the world experiences your company. It encompasses typography hierarchy, color psychology, photographic art direction, tone of voice, packaging design, and customer touchpoints.

When an agency or company presents a meticulously polished brand identity, prospective clients subconsciously assume that the service or product quality behind the company is equally rigorous.

---

## The Three Business Dividends of Exceptional Branding

### 1. Superior Pricing Power
Two companies offering comparable software or consulting can charge wildly different rates based strictly on positioning. A brand that radiates prestige and authority commands premium fees without price resistance from buyers.

### 2. Marketing Velocity
When your brand guidelines are thoroughly documented, producing new landing pages, pitch decks, and social media campaigns requires zero guesswork. Designers and copywriters execute faster because the rules of engagement are crystal clear.

### 3. Customer Retention and Advocacy
Customers do not merely purchase utility; they purchase identity. They align themselves with brands whose aesthetic and values reflect who they want to be.

Invest in your foundation first. Great branding makes every dollar of subsequent advertising work twice as hard.
    `,
    coverImage: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1200&q=80',
    category: 'Branding & Design',
    readTime: '5 min read',
    tags: ['Branding', 'Graphic Design', 'Business Growth', 'Visual Identity'],
    featured: false,
    published: true,
    metaTitle: 'The Importance of Brand Identity for Businesses | AJDesigners',
    metaDescription:
      'Discover why investing in strategic brand identity elevates client trust, commands premium pricing, and builds lasting market authority.',
  },
];

async function seedDatabase() {
  try {
    console.log('🌱 Connecting to MongoDB for database initialization...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB:', mongoUri);

    // 1. Seed Admin
    const existingAdmin = await Admin.findOne({ email: 'admin@ajdesigners.com' });
    if (!existingAdmin) {
      await Admin.create({
        name: 'Yashwa & Aroosa (Co-Founders)',
        email: 'admin@ajdesigners.com',
        password: 'AJDesigners@2025!',
        role: 'superadmin',
      });
      console.log('🔑 Default superadmin created: admin@ajdesigners.com / AJDesigners@2025!');
    } else {
      console.log('ℹ️ Admin user already exists.');
    }

    // 2. Seed Services
    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      await Service.insertMany(servicesData);
      console.log(`✅ Seeded ${servicesData.length} core agency services.`);
    } else {
      console.log(`ℹ️ Services already exist (${serviceCount} records).`);
    }

    // 3. Seed Pricing Packages
    const packageCount = await PricingPackage.countDocuments();
    if (packageCount === 0) {
      await PricingPackage.insertMany(pricingPackagesData);
      console.log(`✅ Seeded ${pricingPackagesData.length} launch pricing packages.`);
    } else {
      console.log(`ℹ️ Pricing packages already exist (${packageCount} records).`);
    }

    // 4. Seed Standalone Services
    const standaloneCount = await StandaloneService.countDocuments();
    if (standaloneCount === 0) {
      await StandaloneService.insertMany(standaloneServicesData);
      console.log(`✅ Seeded ${standaloneServicesData.length} standalone service items.`);
    } else {
      console.log(`ℹ️ Standalone services already exist (${standaloneCount} records).`);
    }

    // 5. Seed Portfolio Concept Projects
    const portfolioCount = await PortfolioProject.countDocuments();
    if (portfolioCount === 0) {
      await PortfolioProject.insertMany(portfolioProjectsData);
      console.log(`✅ Seeded ${portfolioProjectsData.length} concept portfolio projects.`);
    } else {
      console.log(`ℹ️ Portfolio projects already exist (${portfolioCount} records).`);
    }

    // 6. Seed Blog Articles
    const blogCount = await BlogPost.countDocuments();
    if (blogCount === 0) {
      await BlogPost.insertMany(blogPostsData);
      console.log(`✅ Seeded ${blogPostsData.length} educational insights articles.`);
    } else {
      console.log(`ℹ️ Blog articles already exist (${blogCount} records).`);
    }

    // 7. Seed Site Settings
    const settingsCount = await SiteSettings.countDocuments();
    if (settingsCount === 0) {
      await SiteSettings.create({});
      console.log('✅ Initialized site settings configuration.');
    } else {
      console.log('ℹ️ Site settings already configured.');
    }

    console.log('🎉 Database seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    process.exit(1);
  }
}

seedDatabase();

