import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import type { BlogItem } from '@/data/salonData';

interface BlogCardProps {
  blog: BlogItem;
}

export const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return (
    <article className="group bg-white rounded-2xl border border-[#E8DCE5] overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Magazine Cover Image */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#FAF7F9]">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 bg-[#3D003D]/85 backdrop-blur-xs text-[#F8C1DE] text-[11px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-full">
            {blog.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-3 text-xs text-[#766A73] mb-2.5">
            <span>{blog.date}</span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#A80086]" />
              {blog.readTime}
            </span>
          </div>

          <h3 className="text-xl font-display font-medium text-[#2C182A] group-hover:text-[#85006F] transition-colors leading-snug mb-2.5">
            {blog.title}
          </h3>

          <p className="text-xs sm:text-sm text-[#766A73] leading-relaxed line-clamp-2">
            {blog.excerpt}
          </p>
        </div>
      </div>

      {/* Read More Link */}
      <div className="px-6 pb-6 pt-0">
        <Link
          to={`/#blog`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D91A8A] group-hover:text-[#A80086] group-hover:translate-x-1 transition-all"
        >
          <span>Read More</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
};
