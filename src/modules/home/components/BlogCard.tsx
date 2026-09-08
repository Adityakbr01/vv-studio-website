import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { BlogItem } from '@/data/salonData';

interface BlogCardProps {
  blog: BlogItem;
}

export const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return (
    <article className="group flex flex-col">
      {/* Image — matches design */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[12px] bg-[#FAF0F6]">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Content — matches design */}
      <div className="pt-3 px-0.5 flex flex-col flex-1">
        <h3 className="text-[14px] sm:text-[15px] font-bold text-[#2D0A2E] leading-snug group-hover:text-[#A80086] transition-colors">
          {blog.title}
        </h3>

        <p className="mt-1 text-xs sm:text-[13px] text-[#7A6A77] leading-relaxed line-clamp-2">
          {blog.excerpt}
        </p>

        <Link
          to={`/#blog`}
          className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#D91A8A] group-hover:text-[#A80086] group-hover:translate-x-0.5 transition-all"
        >
          <span>Read More</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
};
