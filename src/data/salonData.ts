export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  category: string;
  duration?: string;
  startingPrice?: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  iconName: string;
  description: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  quote: string;
  treatment: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  aspect: string;
}

export interface BlogItem {
  id: string;
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
  image: string;
  date: string;
}

export const CATEGORIES_DATA: CategoryItem[] = [
  {
    id: 'skin-facials',
    name: 'Skin & Facials',
    iconName: 'sparkles',
    description: 'Deep cleansing, glow boosts and collagen rejuvenation',
  },
  {
    id: 'hair-care',
    name: 'Hair Care',
    iconName: 'scissors',
    description: 'Precision cuts, coloring, balayage and spa rituals',
  },
  {
    id: 'waxing-threading',
    name: 'Waxing & Threading',
    iconName: 'feather',
    description: 'Ultra-gentle Rica waxing and precise eyebrow shaping',
  },
  {
    id: 'makeup-bridal',
    name: 'Makeup & Bridal',
    iconName: 'crown',
    description: 'Signature bridal couture, reception glam and party looks',
  },
  {
    id: 'hand-feet',
    name: 'Hand & Feet Care',
    iconName: 'hand',
    description: 'Aromatherapy manicures, pedicure therapy and gel nails',
  },
  {
    id: 'hair-treatments',
    name: 'Hair Treatments',
    iconName: 'droplets',
    description: 'Keratin smoothing, hair botox, and intensive scalp detox',
  },
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'skin-facials',
    title: 'Skin & Facials',
    tagline: 'Refresh. Rejuvenate. Glow.',
    description: 'Hydra-dermabrasion, organic brightening facials, anti-aging collagen therapy and dewy skin renewal rituals.',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    category: 'Skincare',
    duration: '60 - 90 min',
    startingPrice: '₹1,499',
  },
  {
    id: 'hair-care',
    title: 'Hair Care',
    tagline: 'Style Your Story.',
    description: 'Expert styling, Korean glass-shine blowouts, custom balayage coloring and deep nourishing hair spa baths.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    category: 'Hair Styling',
    duration: '45 - 120 min',
    startingPrice: '₹899',
  },
  {
    id: 'waxing-threading',
    title: 'Waxing & Threading',
    tagline: 'Smooth Confidence.',
    description: 'Premium Italian Rica liposoluble waxing, organic cartridge rolls, and painless precision threading.',
    image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=800&q=80',
    category: 'Body Care',
    duration: '20 - 45 min',
    startingPrice: '₹399',
  },
  {
    id: 'makeup-bridal',
    title: 'Makeup & Bridal',
    tagline: 'For Your Special Moments.',
    description: 'High-definition airbrush bridal artistry, timeless South & North Indian bridal looks, and party glam.',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    category: 'Couture Bridal',
    duration: '90 - 180 min',
    startingPrice: '₹4,999',
  },
  {
    id: 'hand-feet-care',
    title: 'Hand & Feet Care',
    tagline: 'Pamper Every Detail.',
    description: 'Rose petal soak manicures, callus smoothing spa pedicures, chrome nail art and long-lasting gel lacquers.',
    image: 'https://images.unsplash.com/photo-1519014816548-bf785179c2ff?auto=format&fit=crop&w=800&q=80',
    category: 'Nail Lounge',
    duration: '40 - 75 min',
    startingPrice: '₹799',
  },
  {
    id: 'hair-treatments',
    title: 'Hair Treatments',
    tagline: 'Healthy Hair. Happier You.',
    description: 'Formaldehyde-free Keratin, Nanoplastia gloss, Olaplex bond repair and invigorating tea-tree scalp detox.',
    image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80',
    category: 'Hair Therapy',
    duration: '90 - 150 min',
    startingPrice: '₹2,499',
  },
];

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: 'gallery-1',
    title: 'Radiant Dewy Skin Facial',
    category: 'Skin & Facials',
    image: 'https://images.unsplash.com/photo-1512290900672-1a613f9c65ee?auto=format&fit=crop&w=800&q=80',
    aspect: 'aspect-[4/5]',
  },
  {
    id: 'gallery-2',
    title: 'Intricate Floral Hair Updo',
    category: 'Hair Styling',
    image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=800&q=80',
    aspect: 'aspect-[4/5]',
  },
  {
    id: 'gallery-3',
    title: 'Rose Quartz Blossom Gel Art',
    category: 'Nail Lounge',
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80',
    aspect: 'aspect-[4/5]',
  },
  {
    id: 'gallery-4',
    title: 'Luxury Boutique Salon Ambience',
    category: 'Salon Interior',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
    aspect: 'aspect-[4/5]',
  },
  {
    id: 'gallery-5',
    title: 'Luminous Balayage Waves',
    category: 'Hair Color',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80',
    aspect: 'aspect-[4/5]',
  },
  {
    id: 'gallery-6',
    title: 'Regal Heritage Bridal Glam',
    category: 'Bridal Couture',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    aspect: 'aspect-[4/5]',
  },
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Priya S.',
    location: 'JP Nagar, Bangalore',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    treatment: 'Hydra Glow Facial',
    quote: 'Excellent service and a very professional team! My skin has never felt better. Highly recommend VV Studio for their personalized care and hygienic ambience.',
  },
  {
    id: 'test-2',
    name: 'Ananya R.',
    location: 'Jayanagar, Bangalore',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    treatment: 'Balayage & Hair Spa',
    quote: 'Beautiful ambience and amazing staff. I always leave feeling refreshed and confident. The hairstylists really listen to what you want and give expert advice.',
  },
  {
    id: 'test-3',
    name: 'Sneha M.',
    location: 'Bannerghatta Road, Bangalore',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    treatment: 'Bridal Makeover Package',
    quote: 'Best salon in JP Nagar! From facials to hair care, everything is top notch. They made me feel like royalty on my wedding day. Truly worth every penny!',
  },
];

export const BLOG_DATA: BlogItem[] = [
  {
    id: 'blog-1',
    title: 'Skincare Routine for Glowing Skin',
    category: 'Skincare',
    readTime: '4 min read',
    date: 'May 12, 2024',
    excerpt: 'Simple morning and night steps for healthier, brighter and deeply hydrated skin every single day.',
    image: 'https://images.unsplash.com/photo-1556760544-74068565f05c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'blog-2',
    title: 'Hair Care Tips for Healthy Hair',
    category: 'Hair Care',
    readTime: '5 min read',
    date: 'April 28, 2024',
    excerpt: 'Expert trichologist tips to protect your tresses from heat damage, pollution and humidity.',
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'blog-3',
    title: 'Bridal Beauty Checklist',
    category: 'Bridal Beauty',
    readTime: '6 min read',
    date: 'April 15, 2024',
    excerpt: 'Your complete month-by-month countdown guide to looking effortlessly radiant on your special day.',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
  },
];

export const STATS_DATA = [
  { value: '10+', label: 'Years of Expertise' },
  { value: 'Thousands', label: 'Happy Clients' },
  { value: 'Premium', label: 'Beauty Experience' },
];

export const CONTACT_INFO = {
  address: 'V V Studio, #5, 1st Floor, 24th Main, 5th Phase, JP Nagar, Bangalore 560078',
  phones: ['080-48531909', '8310782820'],
  email: 'info@vanvadhostudio.com',
  website: 'www.vanvadhostudio.com',
  hours: 'Mon - Sun: 10:00 AM - 8:30 PM',
};
