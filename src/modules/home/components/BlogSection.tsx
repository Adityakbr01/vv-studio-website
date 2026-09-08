import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BlogCard } from './BlogCard';
import { BLOG_DATA } from '@/data/salonData';

interface BlogSectionProps {
  onOpenBooking: () => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="blog" className="py-16 sm:py-20 lg:py-24 bg-[#FAF7F9] relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="OUR BLOG"
          title="Beauty Tips, Trends & More"
          subtitle="Expert advice, self-care tips and the latest in beauty & wellness from our creative directors."
          actionText="View All Blogs"
          onActionClick={onOpenBooking}
        />

        {/* 3 Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {BLOG_DATA.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
};
