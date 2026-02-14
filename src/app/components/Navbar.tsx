import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Logo } from './Logo';

export function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About the Camp' },
    { to: '/waivers', label: 'Waivers' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/policies', label: 'Policies' },
    { to: '/faq', label: 'FAQ' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Logo size="small" showText={true} />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-inter text-sm transition-colors ${
                  location.pathname === link.to
                    ? 'text-[#E53935] font-medium'
                    : 'text-gray-700 hover:text-[#E53935]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/signup"
              className="px-6 py-2 bg-[#E53935] text-white rounded-full font-inter font-medium hover:bg-[#d32f2f] transition-colors shadow-md"
            >
              Register Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`block py-3 font-inter text-sm ${
                  location.pathname === link.to
                    ? 'text-[#E53935] font-medium'
                    : 'text-gray-700'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/signup"
              className="mt-4 block w-full text-center px-6 py-3 bg-[#E53935] text-white rounded-full font-inter font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Register Now
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}