import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from '@/app/components/Navbar';
import { Footer } from '@/app/components/Footer';
import { Home } from '@/app/pages/Home';
import { SignUp } from '@/app/pages/SignUp';
import { About } from '@/app/pages/About';
import { Waivers } from '@/app/pages/Waivers';
import { Pricing } from '@/app/pages/Pricing';
import { Contact } from '@/app/pages/Contact';
import { Policies } from '@/app/pages/Policies';
import { FAQ } from '@/app/pages/FAQ';
import { Success } from '@/app/pages/Success';
import { Link, useLocation } from 'react-router-dom';

function MobileRegisterButton() {
  const location = useLocation();
  
  // Don't show on signup or pricing pages
  if (location.pathname === '/signup' || location.pathname === '/pricing') {
    return null;
  }
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-gray-200 shadow-lg p-4">
      <Link
        to="/signup"
        className="block w-full px-6 py-4 bg-[#E53935] text-white rounded-full font-inter font-medium hover:bg-[#d32f2f] transition-colors shadow-lg text-center"
      >
        Register Now
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-inter">
        <Navbar />
        <main className="flex-1 pb-20 lg:pb-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/about" element={<About />} />
            <Route path="/waivers" element={<Waivers />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/policies" element={<Policies />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/success" element={<Success />} />
          </Routes>
        </main>
        <MobileRegisterButton />
        <Footer />
      </div>
    </Router>
  );
}