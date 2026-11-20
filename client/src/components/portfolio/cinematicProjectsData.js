/**
 * Client-Focused High-Converting Website Case Studies
 * Relatable, high-demand industries that real clients immediately understand and want.
 */

export const CINEMATIC_WEBSITES = [
  {
    id: 'lumen-apparel',
    title: 'LUMEN LUXURY APPAREL',
    industry: 'E-Commerce & High-Fashion DTC Flagship',
    year: '2026',
    tagline: 'Structured Elegance — High-Converting Luxury Fashion Storefront with 1-Click Express Checkout.',
    summary:
      'We engineered Lumen’s digital flagship from the ground up: uniting brutalist architectural aesthetics with lightning-fast mobile commerce. Features high-definition video lookbook reels, real-time color swatch selectors, instant modal search filters, and 1-tap Apple Pay & Google Pay checkout—driving a 312% surge in mobile conversions.',
    metrics: [
      { label: 'Mobile Sales Growth', value: '+312%' },
      { label: 'Store Conversion Rate', value: '4.6%' },
      { label: 'Page Load Speed', value: '1.1s' },
    ],
    features: [
      '1-Tap Express Apple Pay & Google Pay checkout',
      'Vertical video lookbook reels with "In Stock" indicators',
      'Interactive color swatch selector & real-time inventory',
      'Zero-latency collection search with instant filter tags',
    ],
    // 4 Distinct Preview Slides that automatically cycle every 2 seconds
    slides: [
      {
        title: 'Structured Elegance Hero',
        label: "01. Autumn/Winter '23 Collection Launch",
        caption: "Editorial desktop storefront with Autumn/Winter '23 collection drop, architectural aesthetics, and instant category navigation.",
        image: '/showcase/lumen/slide-1-hero.jpg',
      },
      {
        title: 'Multi-Device Collection & Lookbook',
        label: '02. Mobile Video Reels & Product Catalog',
        caption: 'Interactive mobile video lookbook with "In Stock - Ships Today" badges, live color swatches, and full collection grid.',
        image: '/showcase/lumen/slide-2-collection.jpg',
      },
      {
        title: 'Instant Search & Brand Journal',
        label: '03. Zero-Latency Search & Essential Structure Journal',
        caption: 'Instant filter tags [Coats, New, Black, Waisted] with live product suggestions paired with the Essential Structure brand story.',
        image: '/showcase/lumen/slide-3-search-journal.jpg',
      },
      {
        title: 'Frictionless 1-Click Checkout',
        label: '04. Slide-Over Shopping Bag & Express Checkout',
        caption: 'Frictionless cart drawer with verified real-time stock and 1-tap Apple Pay & Google Pay express payment gateways.',
        image: '/showcase/lumen/slide-4-checkout.jpg',
      },
    ],
    accentColor: '#C69341',
  },
  {
    id: 'verdant-roasters',
    title: 'VERDANT ROASTERS',
    industry: 'Specialty Coffee & Direct-to-Consumer Subscriptions',
    year: '2026',
    tagline: 'Small-Batch Single Origin Roasts // Sourced For Flavor & Recurring Subscriptions.',
    summary:
      'We engineered a high-converting digital storefront and automated coffee subscription engine for Verdant Roasters. Features a step-by-step interactive roast & grind configurator, origin transparency specs, and frictionless 1-tap express checkout—yielding a 285% surge in recurring subscriber revenue.',
    metrics: [
      { label: 'Recurring Subscription LTV', value: '+285%' },
      { label: 'Subscriber Retention Rate', value: '88.4%' },
      { label: 'Checkout Abandonment Drop', value: '-42%' },
    ],
    features: [
      '4-step interactive subscription builder (Roast, Grind, Frequency, Size)',
      'Single-origin flavor profiles with roast level sliders & origin telemetry',
      'Slide-over shopping bag with real-time tax & shipping automation',
      '1-Tap Apple Pay & Google Pay express payment gateways',
    ],
    slides: [
      {
        title: 'Small-Batch Roastery Hero',
        label: '01. Single-Origin Hero & Roast Profiles',
        caption: 'Cafe table desktop storefront showcasing small-batch single-origin coffees, origin tasting notes (Ethiopia Guji, Colombia Huila), and brew guides.',
        image: '/showcase/verdant/slide-1-hero.jpg',
      },
      {
        title: 'Custom Subscription Builder',
        label: '02. 4-Step Interactive Subscription Engine',
        caption: 'Frictionless subscription configurator allowing customers to customize roast preference, grind type, delivery frequency, and bag size.',
        image: '/showcase/verdant/slide-2-subscription.jpg',
      },
      {
        title: 'Single-Origin Product Transparency',
        label: '03. Detailed Tasting Notes & Origin Specs',
        caption: 'Product showcase featuring Ethiopia Guji natural process with roast level slider, altitude (2,100m), varietal specs, and 1-click bag add.',
        image: '/showcase/verdant/slide-3-product.jpg',
      },
      {
        title: 'Frictionless Cart & Express Pay',
        label: '04. Slide-Over Cart & Express Checkout',
        caption: 'Slide-over bag drawer featuring real-time item management, free shipping calculation, and 1-tap Apple Pay & Google Pay checkout.',
        image: '/showcase/verdant/slide-4-cart.jpg',
      },
    ],
    accentColor: '#DDA74F',
  },
  {
    id: 'kineta-studio',
    title: 'KINETA STUDIO',
    industry: 'Architectural Design, Interior Spaces & Bespoke Furniture',
    year: '2026',
    tagline: 'Timeless Spaces & Handcrafted Form // Architectural Portfolio & Atelier Inquiries.',
    summary:
      'We designed and developed the digital flagship for Kineta Studio, an elite architectural atelier and bespoke furniture maker. Features curated case studies of international residences (Mallorca, Kyoto), an interactive material & tear-sheet configurator, and a real-time private studio consultation booking engine in Copenhagen, Zurich, and Virtual.',
    metrics: [
      { label: 'High-Ticket Inquiries Lift', value: '+340%' },
      { label: 'Avg Project Deal Size', value: '$85,000+' },
      { label: 'Private Consultations Booked', value: '180+' },
    ],
    features: [
      'Architectural portfolio filters (Residential, Hospitality, Commercial)',
      'Bespoke furniture atelier with made-to-order material swatches & tear sheets',
      'Multi-studio consultation scheduler (Copenhagen, Zurich, Virtual)',
      'Responsive multi-device layout tailored for high-net-worth clients',
    ],
    slides: [
      {
        title: 'Timeless Spaces Hero',
        label: '01. Architectural Atelier & Featured Collection',
        caption: 'Multi-device desktop and mobile showcase highlighting handcrafted travertine fireplaces, curated furniture, and direct consultation booking.',
        image: '/showcase/kineta/slide-1-hero.jpg',
      },
      {
        title: 'Selected Works & Case Studies',
        label: '02. Curated Architecture & Interior Portfolio',
        caption: 'Grid of international architectural projects including The Limestone Villa (Mallorca) and Kyoto Courtyard Residence with category filter pills.',
        image: '/showcase/kineta/slide-2-projects.jpg',
      },
      {
        title: 'Bespoke Furniture Atelier',
        label: '03. Made-To-Order Material Atelier',
        caption: 'Interactive furniture tear-sheet explorer with material swatches (Travertine, Walnut, Linen, Cognac Leather) and made-to-order specs.',
        image: '/showcase/kineta/slide-3-atelier.jpg',
      },
      {
        title: 'Private Studio Consultation',
        label: '04. Multi-Location Private Booking Engine',
        caption: 'Appointment scheduling for Copenhagen Atelier, Zurich Showroom, and Virtual consultations with interactive calendar and real-time time slots.',
        image: '/showcase/kineta/slide-4-booking.jpg',
      },
    ],
    accentColor: '#C69341',
  },
  {
    id: 'solis-trail-gear',
    title: 'SOLIS TRAIL GEAR',
    industry: 'Technical Outdoor Apparel & Ultralight Alpinism DTC',
    year: '2026',
    tagline: 'Engineered for High-Altitude Endurance // Technical Alpinism & Pack Customization.',
    summary:
      'We engineered a high-performance digital flagship and interactive pack customizer for Solis Trail Gear. Features verified alpine field testing logs with real-time elevation & weather telemetry, technical fabric rating specs (20k/20k waterproof & breathability), and an interactive multi-step expedition pack weight builder.',
    metrics: [
      { label: 'Direct DTC Sales Growth', value: '+365%' },
      { label: 'Pack Builder Conversion', value: '6.8%' },
      { label: 'Mobile Average Order Value', value: '$380' },
    ],
    features: [
      'Multi-step interactive Expedition Pack Builder with live weight calculator',
      'Comprehensive technical fabric spec matrix (Solis-Tex Pro 3L / 20k/20k)',
      'Alpine field testing logs with altitude, temperature & wind telemetry',
      'Responsive multi-device e-commerce with 1-click gear loadout checkout',
    ],
    slides: [
      {
        title: 'High-Altitude Hero & Gear Grid',
        label: '01. High-Altitude Endurance Hero & Gear Grid',
        caption: 'Mountain summit hero visual highlighting the FW26 collection drop alongside featured ultralight packs, alpine shells, and tents.',
        image: '/showcase/solis/slide-1-hero.jpg',
      },
      {
        title: 'Technical Product Detail Specs',
        label: '02. Technical Alpinism Specs & Color Selector',
        caption: 'Detailed product breakdown of the Alpha Shell 3L ($340) featuring weight (410g), 20k waterproof ratings, and multi-color swatches.',
        image: '/showcase/solis/slide-2-product.jpg',
      },
      {
        title: 'Patagonia Alpine Testing Journal',
        label: '03. Field Expeditions Journal & Telemetry Log',
        caption: 'Authentic alpine field testing log in Patagonia Ice Field with live elevation (2,150m), -6°C high-wind telemetry, and gear loadout buy links.',
        image: '/showcase/solis/slide-3-expeditions.jpg',
      },
      {
        title: 'Interactive Expedition Pack Builder',
        label: '04. 4-Step Pack Customizer & Weight Calculator',
        caption: 'Custom kit configurator guiding users through Pack, Apparel, Shelter, and Summary with real-time total weight calculation (1.2 kg).',
        image: '/showcase/solis/slide-4-builder.jpg',
      },
    ],
    accentColor: '#DDA74F',
  },
];
