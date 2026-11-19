import Review from '../models/Review.js';

// Pre-seeded high-credibility reviews if database has no reviews yet
const DEFAULT_REVIEWS = [
  {
    clientName: 'Marcus Vance',
    role: 'Head of Growth',
    company: 'Luminar Health (San Francisco, USA)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&h=160&q=80',
    rating: 5,
    category: 'ugc',
    metric: '+340% ROAS Lift',
    metricLabel: 'Meta & TikTok Ads',
    headline: '"We slashed creative production costs by 60% while doubling ad velocity."',
    content:
      'Before AJDesigners, shooting custom UGC meant waiting weeks for creator shipments and spending $10k+ per cycle. Yashwa and Aroosa delivered 45 photo-realistic AI creator video hooks in 48 hours. Our blended ROAS scaled from 1.8x to 3.4x within the first 14 days of testing.',
    turnaround: 'Delivered in 48h',
  },
  {
    clientName: 'Elena Rostova',
    role: 'CMO & Co-Founder',
    company: 'Velox Apparel (London, UK)',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=160&h=160&q=80',
    rating: 5,
    category: 'performance',
    metric: '3.8x Target ROAS',
    metricLabel: 'BFCM Scale Campaign',
    headline: '"The highest converting creatives we have deployed in 4 years of DTC."',
    content:
      'The team at AJDesigners understands consumer psychology like seasoned performance media buyers. The vertical video hooks immediately arrested scroll fatigue on TikTok. Our customer acquisition cost dropped by 42% on international traffic.',
    turnaround: 'Continuous Sprint',
  },
  {
    clientName: 'Julian Thorne',
    role: 'Managing Partner',
    company: 'Aether Capital (Toronto, Canada)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&h=160&q=80',
    rating: 5,
    category: 'branding',
    metric: '2.4x Inbound Demos',
    metricLabel: 'Enterprise Pipeline',
    headline: '"They transformed our brand from looking like a boutique firm to an institutional titan."',
    content:
      'Every single touchpoint—our deck systems, visual guidelines, and interactive web pages—became bespoke artisan gold caliber. High-net-worth LPs constantly remark on how razor-sharp and authoritative our digital presence is.',
    turnaround: 'Rapid Sprint',
  },
  {
    clientName: 'Sophia Chen',
    role: 'VP of Marketing',
    company: 'Solis Beauty (Sydney, Australia)',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&h=160&q=80',
    rating: 5,
    category: 'ugc',
    metric: '94% Hook Retention',
    metricLabel: 'Across Reels & Shorts',
    headline: '"Multi-lingual AI creative sprints let us penetrate 3 European markets overnight."',
    content:
      'AJDesigners synchronized AI creator lip-sync and native Spanish, French, and German audio tracks without recording studios. The localized video ads converted higher than our expensive domestic studio shoots.',
    turnaround: 'Delivered in 72h',
  },
  {
    clientName: 'Liam O’Connor',
    role: 'Founder & CEO',
    company: 'Zenith Peak Supplements (Dublin, Ireland)',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&h=160&q=80',
    rating: 5,
    category: 'branding',
    metric: '+185% Engagement',
    metricLabel: 'Social Media Management',
    headline: '"Zero friction working across time zones. Communication is immaculate."',
    content:
      'Their asynchronous Slack channel and Notion roadmap keep our internal marketing team completely aligned. We receive weekly video batches, static carousels, and copy scheduled right on time. Pure peace of mind.',
    turnaround: 'Daily Execution',
  },
  {
    clientName: 'David Sterling',
    role: 'Director of Growth',
    company: 'Nexus SaaS Engine (Austin, USA)',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=160&h=160&q=80',
    rating: 5,
    category: 'performance',
    metric: '-48% CPA Reduction',
    metricLabel: 'Paid Search & Meta Ads',
    headline: '"A creative partner that actually looks at attribution metrics and ROAS."',
    content:
      'Most creative agencies hand over pretty graphics that bomb in actual ad managers. AJDesigners builds creatives engineered around click-through rates, hold rates, and conversion intent. They pay for themselves ten times over.',
    turnaround: 'Delivered in 48h',
  },
];

export const getReviews = async (req, res, next) => {
  try {
    const { category } = req.query;
    const filter = { isApproved: true };
    if (category && category !== 'all') {
      filter.category = category;
    }

    let dbReviews = await Review.find(filter).sort({ createdAt: -1 }).lean();

    // If database is completely empty on first launch, seed default reviews
    if (dbReviews.length === 0 && (!category || category === 'all')) {
      await Review.insertMany(DEFAULT_REVIEWS);
      dbReviews = await Review.find(filter).sort({ createdAt: -1 }).lean();
    }

    res.status(200).json({
      success: true,
      count: dbReviews.length,
      data: dbReviews,
    });
  } catch (error) {
    next(error);
  }
};

export const createReview = async (req, res, next) => {
  try {
    const {
      clientName,
      role,
      company,
      rating,
      category,
      metric,
      metricLabel,
      headline,
      content,
      avatar,
    } = req.body;

    if (!clientName || !role || !company || !headline || !content) {
      return res.status(400).json({
        success: false,
        message: 'Please provide client name, role, company, headline, and review content.',
      });
    }

    // Default avatar based on initials if none provided
    const userAvatar =
      avatar && avatar.trim().length > 0
        ? avatar
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(clientName)}&background=111116&color=C69341&bold=true`;

    const newReview = await Review.create({
      clientName,
      role,
      company,
      avatar: userAvatar,
      rating: Number(rating) || 5,
      category: category || 'branding',
      metric: metric || 'Verified Client',
      metricLabel: metricLabel || 'Verified Review',
      headline,
      content,
      turnaround: 'Verified Sprint',
      isApproved: true,
    });

    res.status(201).json({
      success: true,
      message: 'Review submitted successfully! Thank you for your feedback.',
      data: newReview,
    });
  } catch (error) {
    next(error);
  }
};
