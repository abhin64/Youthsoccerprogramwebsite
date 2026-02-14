import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail } from 'lucide-react';
import { Logo } from './Logo';
import { DecorativeCircles } from './DecorativeCircles';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16 relative overflow-hidden">
      <DecorativeCircles variant="footer" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Logo size="medium" showText={true} variant="stacked" linkable={true} />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Links */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
            <Link to="/" className="text-gray-600 hover:text-[#E53935] transition-colors">Home</Link>
            <span className="text-gray-300">|</span>
            <Link to="/about" className="text-gray-600 hover:text-[#E53935] transition-colors">About the Camp</Link>
            <span className="text-gray-300">|</span>
            <Link to="/pricing" className="text-gray-600 hover:text-[#E53935] transition-colors">Pricing</Link>
            <span className="text-gray-300">|</span>
            <Link to="/waivers" className="text-gray-600 hover:text-[#E53935] transition-colors">Waivers</Link>
            <span className="text-gray-300">|</span>
            <Link to="/policies" className="text-gray-600 hover:text-[#E53935] transition-colors">Policies</Link>
            <span className="text-gray-300">|</span>
            <Link to="/faq" className="text-gray-600 hover:text-[#E53935] transition-colors">FAQ</Link>
            <span className="text-gray-300">|</span>
            <Link to="/contact" className="text-gray-600 hover:text-[#E53935] transition-colors">Contact</Link>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a href="mailto:sportscampaaa@gmail.com" className="text-gray-600 hover:text-[#E53935] transition-colors">
              <Mail size={20} />
            </a>
            <a href="#" className="text-gray-600 hover:text-[#1E88E5] transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-600 hover:text-[#E53935] transition-colors">
              <Instagram size={20} />
            </a>
          </div>
        </div>

        {/* Email */}
        <div className="text-center mt-6 text-sm text-gray-600">
          <a href="mailto:sportscampaaa@gmail.com" className="hover:text-[#E53935] transition-colors">
            sportscampaaa@gmail.com
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center mt-4 text-xs text-gray-500">
          © 2026 AAA Sports Camp. All rights reserved.
        </div>
      </div>
    </footer>
  );
}