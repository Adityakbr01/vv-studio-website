import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from '@/modules/home';
import { AboutPage } from '@/modules/about';
import { ServicesPage } from '@/modules/services';
import { ContactPage } from '@/modules/contact';
import { SmoothScroll } from '@/components/shared/SmoothScroll';

function App() {
  return (
    <Router>
      <SmoothScroll />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/gallery" element={<HomePage />} />
        <Route path="/blog" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* Fallback route */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;