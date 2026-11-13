import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Tag,
  User,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { blogAPI } from '../services/api';
import BlogCard from '../components/common/BlogCard';
import BookingCalendarWidget from '../components/common/BookingCalendarWidget';

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
    if (navigator.share) {
      navigator
        .share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="pt-32 pb-20 text-center min-h-[60vh] flex items-center justify-center bg-[#070709]">
        <div className="text-sm text-gray-400 font-medium animate-pulse">
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
    <div className="pt-24 bg-[#070709] min-h-screen text-gray-100">
      {/* 1. ARTICLE HEADER */}
      <section className="py-16 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to all insights</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 mb-4 font-mono">
            <span className="font-bold uppercase tracking-wider text-electric-400 bg-electric-500/10 border border-electric-500/20 px-3 py-1 rounded-full">
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

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight leading-tight text-white">
            {post.title}
          </h1>

          <p className="mt-6 text-base sm:text-lg text-gray-300 leading-relaxed">
            {post.excerpt}
          </p>

          <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#111116] border border-white/[0.08] flex items-center justify-center text-electric-400 font-bold">
                <User className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">
                  {post.author ? post.author.name : 'Yashwa & Aroosa'}
                </div>
                <div className="text-[11px] text-gray-400">
                  {post.author ? post.author.role : 'Founders & Creative Directors'}
                </div>
              </div>
            </div>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.1] text-gray-300 hover:text-white text-xs font-medium border border-white/[0.08] transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Link Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. COVER IMAGE */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl border border-white/[0.08] bg-black">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* 3. ARTICLE CONTENT */}
      <article className="py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6 text-gray-300 text-sm sm:text-base leading-relaxed whitespace-pre-line font-sans">
          {post.content}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-2">
            <Tag className="w-4 h-4 text-gray-400 mr-1" />
            {post.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs px-3 py-1 rounded-full bg-[#111116] text-gray-300 border border-white/[0.08]"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Author Box */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-[#111116] border border-white/[0.08] flex flex-col sm:flex-row items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-electric-500/20 border border-electric-400/30 text-electric-400 flex items-center justify-center shrink-0 shadow-glow-blue">
            <User className="w-8 h-8" />
          </div>
          <div>
            <div className="text-base font-display font-bold text-white">
              {post.author ? post.author.name : 'Yashwa & Aroosa'}
            </div>
            <div className="text-xs text-electric-400 mb-2 font-mono">
              Co-Founders & Creative Directors
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Dedicated to helping emerging and established global brands master multi-platform communication, AI workflows, and strategic lead generation.
            </p>
          </div>
        </div>
      </article>

      {/* 4. RELATED ARTICLES */}
      {related.length > 0 && (
        <section className="py-16 bg-[#09090d] border-t border-white/[0.08]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-display font-extrabold text-white">
                Related Insights & Guides
              </h2>
              <Link to="/blog" className="text-xs font-bold text-electric-400 hover:text-white transition-colors">
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

      {/* 5. EMBEDDED STRATEGY CALL CALENDAR */}
      <BookingCalendarWidget />
    </div>
  );
}
