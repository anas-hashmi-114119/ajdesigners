import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Tag,
  Sparkles,
  ArrowRight,
  User,
  CheckCircle2,
} from 'lucide-react';
import { blogAPI } from '../services/api';
import BlogCard from '../components/common/BlogCard';
import CTASection from '../components/common/CTASection';

export default function BlogPostPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setLoading(true);
    blogAPI
      .getBySlug(slug)
      .then((res) => {
        if (res.data.success) {
          setPost(res.data.post);
          setRelated(res.data.related || []);
        } else {
          navigate('/blog');
        }
      })
      .catch((err) => {
        console.error('Error fetching blog post:', err);
        navigate('/blog');
      })
      .finally(() => setLoading(false));
  }, [slug, navigate]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (loading) {
    return (
      <div className="pt-32 pb-20 text-center min-h-[60vh] flex items-center justify-center">
        <div className="text-sm text-charcoal-500 font-medium animate-pulse">
          Loading article...
        </div>
      </div>
    );
  }

  if (!post) return null;

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Recent';

  return (
    <div className="pt-24">
      {/* 1. ARTICLE HEADER */}
      <section className="py-16 bg-navy-900 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold text-charcoal-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to all insights</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3 text-xs text-charcoal-400 mb-4">
            <span className="font-bold uppercase tracking-wider text-electric-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-electric-400" />
              {formattedDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-purple-brand" />
              {post.readTime || '5 min read'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="mt-6 text-base sm:text-lg text-charcoal-300 leading-relaxed">
            {post.excerpt}
          </p>

          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-navy-800 border border-white/10 flex items-center justify-center text-electric-400 font-bold">
                <User className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">
                  {post.author ? post.author.name : 'AJDesigners Editorial'}
                </div>
                <div className="text-[11px] text-charcoal-400">
                  {post.author ? post.author.role : 'Creative & Strategy Team'}
                </div>
              </div>
            </div>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-charcoal-300 hover:text-white text-xs font-medium border border-white/10 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Link Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. COVER IMAGE */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="aspect-[16/9] rounded-3xl overflow-hidden shadow-card-elevated border border-charcoal-200/80 bg-navy-900">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* 3. ARTICLE CONTENT */}
      <article className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 text-charcoal-800 text-sm sm:text-base leading-relaxed whitespace-pre-line font-sans">
            {post.content}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-6 border-t border-charcoal-200 flex flex-wrap items-center gap-2">
              <Tag className="w-4 h-4 text-charcoal-500 mr-1" />
              {post.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs px-3 py-1 rounded-full bg-surface-light text-charcoal-700 border border-charcoal-200"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Author Box */}
          <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-surface-light border border-charcoal-200/80 flex flex-col sm:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-navy-900 text-electric-400 flex items-center justify-center shrink-0 shadow-sm">
              <User className="w-8 h-8" />
            </div>
            <div>
              <div className="text-base font-display font-bold text-navy-900">
                {post.author ? post.author.name : 'AJDesigners Strategy Team'}
              </div>
              <div className="text-xs text-charcoal-500 mb-2">
                {post.author ? post.author.role : 'Creative Direction & Digital Marketing'}
              </div>
              <p className="text-xs text-charcoal-700 leading-relaxed">
                Dedicated to helping emerging and established brands master multi-platform communication, AI workflows, and strategic lead generation.
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* 4. RELATED ARTICLES */}
      {related.length > 0 && (
        <section className="py-16 bg-surface-light border-t border-charcoal-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-display font-extrabold text-navy-900">
                Related Insights & Guides
              </h2>
              <Link to="/blog" className="text-xs font-bold text-electric-600 hover:underline">
                View All Articles
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((relPost) => (
                <BlogCard key={relPost._id} post={relPost} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. CTA SECTION */}
      <CTASection
        heading="Ready to Put These Insights Into Practice?"
        subheading="Let's build a dedicated digital marketing campaign for your brand. Get in touch with our strategy team today."
        buttonText="Get a Free Consultation"
        buttonLink="/contact"
      />
    </div>
  );
}

