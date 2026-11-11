import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export default function BlogCard({ post }) {
  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Recent';

  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-charcoal-200/80 shadow-sm hover:shadow-card-elevated hover:border-electric-500/40 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Cover Image */}
        <Link to={`/blog/${post.slug}`} className="block relative aspect-[16/9] overflow-hidden bg-navy-900">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute top-3 left-3">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-navy-900/80 backdrop-blur-md text-electric-400 border border-white/10">
              {post.category}
            </span>
          </div>
        </Link>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center gap-3 text-[11px] text-charcoal-500 mb-2.5">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-electric-500" />
              <span>{formattedDate}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-purple-brand" />
              <span>{post.readTime || '5 min read'}</span>
            </div>
          </div>

          <Link to={`/blog/${post.slug}`}>
            <h3 className="text-base font-display font-bold text-navy-900 group-hover:text-electric-600 transition-colors line-clamp-2 leading-snug mb-2">
              {post.title}
            </h3>
          </Link>

          <p className="text-xs text-charcoal-700 line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>
        </div>
      </div>

      <div className="px-5 pb-5 pt-3 border-t border-charcoal-100 flex items-center justify-between">
        <span className="text-[11px] font-medium text-charcoal-500">
          {post.author ? post.author.name : 'AJDesigners Team'}
        </span>
        <Link
          to={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-electric-600 hover:text-electric-700 group-hover:translate-x-0.5 transition-transform"
        >
          <span>Read Article</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
}

