import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Container } from '@/components/ui/Container';
import { BlogCard } from './BlogCard';
import { BLOG_DATA } from '@/data/salonData';

interface BlogSectionProps {
  onOpenBooking: () => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="blog" className="py-12  bg-[#FAF7F9] relative">
      <Container>
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
      </Container>
    </section>
  );
};
