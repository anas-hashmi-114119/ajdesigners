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
    <article className="group bg-[#111116] rounded-2xl overflow-hidden border border-white/[0.08] hover:border-electric-500/50 hover:shadow-glow-blue transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
      <div>
        {/* Cover Image */}
        <Link to={`/blog/${post.slug}`} className="block relative aspect-[16/9] overflow-hidden bg-black">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
            loading="lazy"
          />
          <div className="absolute top-3 left-3">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-electric-400 border border-white/10">
              {post.category}
            </span>
          </div>
        </Link>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center gap-3 text-[11px] text-gray-400 mb-2.5 font-mono">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-electric-400" />
              <span>{formattedDate}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-purple-brand" />
              <span>{post.readTime || '5 min read'}</span>
            </div>
          </div>

          <Link to={`/blog/${post.slug}`}>
            <h3 className="text-base font-display font-bold text-white group-hover:text-electric-300 transition-colors line-clamp-2 leading-snug mb-2">
              {post.title}
            </h3>
          </Link>

          <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>
        </div>
      </div>

      <div className="px-5 pb-5 pt-3 border-t border-white/[0.06] flex items-center justify-between">
        <span className="text-[11px] font-medium text-gray-400">
          {post.author ? post.author.name : 'Yashwa & Aroosa'}
        </span>

        <Link
          to={`/blog/${post.slug}`}
          className="text-xs font-bold text-electric-400 hover:text-white inline-flex items-center gap-1 group-hover:translate-x-1 transition-all"
        >
          <span>Read</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </article>
  );
}
