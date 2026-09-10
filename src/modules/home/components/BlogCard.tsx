import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { BlogItem } from '@/data/salonData';

interface BlogCardProps {
  blog: BlogItem;
}

export const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  // Blog image SEO from the on-page audit.
  const imageSeoById: Record<string, { alt: string; title: string }> = {
    'blog-1': { alt: 'Skincare routine for glowing skin', title: 'Skincare Routine for Glowing Skin' },
    'blog-2': { alt: 'Hair care tips for healthy hair', title: 'Hair Care Tips for Healthy Hair' },
    'blog-3': { alt: 'Bridal beauty checklist for wedding preparation', title: 'Bridal Beauty Checklist' },
    'blog-4': { alt: 'Monsoon hair care and hair rescue guide', title: 'Monsoon Hair Rescue Guide' },
    'blog-5': { alt: 'Everyday makeup essentials and beauty tips', title: 'Everyday Makeup Essentials' },
    'blog-6': { alt: 'At-home spa night relaxation ritual', title: 'At-Home Spa Night Ritual' },
  };
  const imageSeo = imageSeoById[blog.id] ?? { alt: blog.title, title: blog.title };
  return (
    <article className="group flex flex-col h-full bg-white rounded-[14px] border border-[#F1E4EE] shadow-[0_2px_14px_rgba(90,20,80,0.08)] hover:shadow-[0_10px_28px_rgba(90,20,80,0.14)] hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      {/* Image — flush top, rounded via card overflow */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#FAF0F6]">
        <img
          src={blog.image}
          alt={imageSeo.alt}
          title={imageSeo.title}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-[14px] sm:text-[15px] font-bold text-[#2D0A2E] leading-snug group-hover:text-[#A80086] transition-colors">
          {blog.title}
        </h3>

        <p className="mt-1 text-xs sm:text-[13px] text-[#7A6A77] leading-relaxed line-clamp-2">
          {blog.excerpt}
        </p>

        <Link
          to="/blog"
          title="VV Studio Beauty & Wellness Blog"
          className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#D91A8A] group-hover:text-[#A80086] group-hover:translate-x-0.5 transition-all"
        >
          <span>Read More</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
};
