import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Search,
  Calendar,
  Clock,
  ArrowRight,
  ArrowUpRight,
  Tag,
  BookOpen,
} from 'lucide-react';
import { blogAPI } from '../services/api';
import BlogCard from '../components/common/BlogCard';
import BookingCalendarWidget from '../components/common/BookingCalendarWidget';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [featuredPost, setFeaturedPost] = useState(null);
  const [categories, setCategories] = useState(['All']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    blogAPI
      .getAll({ category: selectedCategory !== 'All' ? selectedCategory : undefined, search: searchQuery })
      .then((res) => {
        if (res.data.success) {
          const fetchedPosts = res.data.posts || [];
          setPosts(fetchedPosts);

          // Find featured post if viewing All and no search
          if (selectedCategory === 'All' && !searchQuery.trim() && fetchedPosts.length > 0) {
            const feat = fetchedPosts.find((p) => p.featured) || fetchedPosts[0];
            setFeaturedPost(feat);
          } else {
            setFeaturedPost(null);
          }

          // Gather unique categories
          const cats = ['All', ...new Set(fetchedPosts.map((p) => p.category).filter(Boolean))];
          setCategories(cats);
        }
      })
      .catch((err) => console.error('Error fetching blog posts:', err))
      .finally(() => setLoading(false));
  }, [selectedCategory, searchQuery]);

  return (
    <div className="pt-24 bg-[#070709] min-h-screen text-gray-100">
      {/* 1. HERO SECTION */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-electric-500/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-purple-brand/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-electric-400 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Digital Marketing & Creative Intelligence</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-tight text-white">
            Insights, Frameworks & <span className="gradient-text">Industry Perspectives.</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Practical strategies on social media management, AI-driven creative workflows, short-form video retention, and B2B lead generation.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search articles by topic, keyword, or tactic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-[#111116] border border-white/[0.1] text-white placeholder-gray-500 text-xs focus:outline-none focus:border-electric-400 transition-colors shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* 2. FEATURED ARTICLE BANNER */}
      {featuredPost && (
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#111116] rounded-3xl overflow-hidden border border-white/[0.08] shadow-2xl grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto h-full min-h-[320px] relative overflow-hidden bg-black">
              <img
                src={featuredPost.coverImage}
                alt={featuredPost.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-black/70 text-electric-400 border border-white/10 backdrop-blur-md">
                  Featured Insight
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-3 font-mono">
                  <span className="font-semibold text-purple-soft">{featuredPost.category}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {featuredPost.readTime || '5 min read'}
                  </span>
                </div>

                <Link to={`/blog/${featuredPost.slug}`}>
                  <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white hover:text-electric-300 transition-colors leading-tight mb-4">
                    {featuredPost.title}
                  </h2>
                </Link>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed line-clamp-3 mb-6">
                  {featuredPost.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                <span className="text-xs text-gray-400 font-medium">
                  {featuredPost.author?.name || 'Yashwa & Aroosa'}
                </span>

                <Link
                  to={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-electric-500 to-purple-brand shadow-glow-blue"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. CATEGORY TABS & ARTICLE LIST */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[50vh]">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-electric-500 to-purple-brand text-white shadow-glow-blue border border-white/20'
                  : 'bg-[#111116] text-gray-400 hover:text-white hover:bg-white/[0.06] border border-white/[0.08]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="text-center py-20 text-gray-500 text-sm animate-pulse">
            Loading articles...
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 bg-[#111116] rounded-3xl border border-white/[0.08] p-8 max-w-md mx-auto">
            <p className="text-sm font-semibold text-gray-300">
              No articles found matching "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-3 text-xs text-electric-400 font-bold hover:underline"
            >
              Reset Search Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </section>

      {/* 4. EMBEDDED STRATEGY CALL CALENDAR */}
      <BookingCalendarWidget />
    </div>
  );
}
