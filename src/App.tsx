import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import PrivacyPolicy from './pages/Legal/PrivacyPolicy';
import TermsOfService from './pages/Legal/TermsOfService';
import CookiePolicy from './pages/Legal/CookiePolicy';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/layout/ScrollToTop';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Landing />} /> {/* Placeholder for now */}
        <Route path="/signup" element={<Landing />} /> {/* Placeholder for now */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster position="bottom-right" />
    </Router>
  );
}

export default App;
