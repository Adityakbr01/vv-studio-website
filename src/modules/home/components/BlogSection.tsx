import React, { useRef, useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Container } from '@/components/ui/Container';
import { Carousel, CarouselControls, type CarouselHandle, type CarouselState } from '@/components/ui/Carousel';
import { BlogCard } from './BlogCard';
import { BLOG_DATA } from '@/data/salonData';

interface BlogSectionProps {
  onOpenBooking: () => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onOpenBooking }) => {
  const carouselRef = useRef<CarouselHandle>(null);
  const [carouselState, setCarouselState] = useState<CarouselState>({
    canPrev: false,
    canNext: false,
    page: 0,
    pages: 1,
  });

  return (
    <section id="blog" className="py-10 sm:py-14 bg-[#FCFCFC] relative">
      <Container>
        <SectionHeading
          eyebrow="OUR BLOG"
          title="Beauty Tips, Trends & More"
          subtitle="Expert advice, self-care tips and the latest in beauty & wellness."
          actionText="View All Blogs"
          onActionClick={onOpenBooking}
          controls={
            carouselState.pages > 1 ? (
              <CarouselControls
                onPrev={() => carouselRef.current?.scrollPrev()}
                onNext={() => carouselRef.current?.scrollNext()}
                canPrev={carouselState.canPrev}
                canNext={carouselState.canNext}
              />
            ) : undefined
          }
        />

        {/* Blog carousel: 1 / 2 / 3 per view — matches design */}
        <Carousel
          ref={carouselRef}
          ariaLabel="Blog posts carousel"
          onStateChange={setCarouselState}
          trackClassName="gap-6 sm:gap-7 pb-1"
          slideClassName="basis-[85%] sm:basis-[calc(50%-14px)] md:basis-[calc(33.3333%-18.6667px)]"
        >
          {BLOG_DATA.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </Carousel>
      </Container>
    </section>
  );
};
