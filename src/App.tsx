import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { HomePage } from '@/modules/home';
import { AboutPage } from '@/modules/about';
import { ServicesPage } from '@/modules/services';
import { ContactPage } from '@/modules/contact';
import { ComingSoonPage } from '@/components/shared/ComingSoonPage';
import { SmoothScroll } from '@/components/shared/SmoothScroll';
import { injectLocalBusinessSchema } from '@/lib/seo';

function App() {
  useEffect(() => {
    injectLocalBusinessSchema();
  }, []);

  return (
    <Router>
      <SmoothScroll />
      <Routes>
        <Route path="/" element={<HomePage seoKey="home" />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        {/* Standalone crawlable URLs: /gallery and /blog render dedicated Coming Soon common pages. */}
        <Route path="/gallery" element={<ComingSoonPage seoKey="gallery" />} />
        <Route path="/blog" element={<ComingSoonPage seoKey="blog" />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* Fallback route */}
        <Route path="*" element={<HomePage seoKey="home" />} />
      </Routes>
    </Router>
  );
}

export default App;