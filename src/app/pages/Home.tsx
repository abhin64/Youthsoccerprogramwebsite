import { Link } from 'react-router-dom';
import { Users, Shield, Heart, Calendar, Clock, MapPin } from 'lucide-react';
import { Logo } from '@/app/components/Logo';
import { DecorativeCircles } from '@/app/components/DecorativeCircles';
import { FloatingSymbols } from '@/app/components/FloatingSymbols';

export function Home() {
  return (
    <div className="min-h-screen">
      {/* Floating symbols throughout the page */}
      <FloatingSymbols />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-green-50 py-20 px-4">
        <DecorativeCircles variant="hero" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Logo at the top of hero */}
              <div className="mb-6">
                <Logo size="large" showText={false} linkable={false} />
              </div>
              <h1 className="font-poppins text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                AAA Sports Camp — Fun, Safe Soccer for Kids Ages 6–12
              </h1>
              <p className="font-inter text-lg md:text-xl text-gray-700 mb-8">
                Youth-led summer soccer camp in Sammamish, WA focused on fitness, teamwork, and confidence
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/signup"
                  className="px-8 py-4 bg-[#E53935] text-white rounded-full font-inter font-medium hover:bg-[#d32f2f] transition-colors shadow-lg text-center"
                >
                  Sign Up Now
                </Link>
                <Link
                  to="/pricing"
                  className="px-8 py-4 bg-white text-[#E53935] border-2 border-[#E53935] rounded-full font-inter font-medium hover:bg-red-50 transition-colors text-center"
                >
                  View Pricing
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1622659097972-68f1d8c1829f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHBsYXlpbmclMjBzb2NjZXJ8ZW58MXx8fHwxNzY5OTQ4MjU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Children playing soccer"
                className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-16 px-4 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border-2 border-[#1E88E5] rounded-2xl p-8 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 relative overflow-hidden">
              {/* Corner decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#1E88E5] opacity-5 rounded-bl-full"></div>
              {/* Decorative symbols */}
              <div className="absolute top-2 right-2 text-2xl opacity-10">👥</div>
              <div className="absolute bottom-2 left-2 w-4 h-4 bg-[#1E88E5] rounded-full opacity-20"></div>
              <div className="absolute top-1/2 right-4 w-3 h-3 bg-[#1E88E5] rounded-full opacity-20"></div>
              <div className="absolute bottom-1/3 left-4 w-2 h-2 bg-[#1E88E5] rounded-full opacity-20"></div>
              <div className="w-12 h-12 bg-[#1E88E5] bg-opacity-10 rounded-full flex items-center justify-center mb-4 relative z-10">
                <Users className="text-[#1E88E5]" size={24} />
              </div>
              <h3 className="font-poppins text-xl font-semibold text-gray-900 mb-3">
                Beginner-Friendly Coaching
              </h3>
              <p className="font-inter text-gray-600">
                No experience needed! Our coaches focus on building skills and having fun, not competition.
              </p>
            </div>

            <div className="bg-white border-2 border-[#43A047] rounded-2xl p-8 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 relative overflow-hidden">
              {/* Corner decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#43A047] opacity-5 rounded-bl-full"></div>
              {/* Decorative symbols */}
              <div className="absolute top-2 right-2 text-2xl opacity-10">🛡️</div>
              <div className="absolute bottom-2 left-2 w-4 h-4 bg-[#43A047] rounded-full opacity-20"></div>
              <div className="absolute top-1/3 right-4 w-3 h-3 bg-[#43A047] rounded-full opacity-20"></div>
              <div className="w-12 h-12 bg-[#43A047] bg-opacity-10 rounded-full flex items-center justify-center mb-4 relative z-10">
                <Shield className="text-[#43A047]" size={24} />
              </div>
              <h3 className="font-poppins text-xl font-semibold text-gray-900 mb-3">
                Safe, Supervised Drop-Off
              </h3>
              <p className="font-inter text-gray-600">
                Parents can trust our experienced coaches to create a safe, welcoming environment.
              </p>
            </div>

            <div className="bg-white border-2 border-[#E53935] rounded-2xl p-8 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 relative overflow-hidden">
              {/* Corner decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#E53935] opacity-5 rounded-bl-full"></div>
              {/* Decorative symbols */}
              <div className="absolute top-2 right-2 text-2xl opacity-10">❤️</div>
              <div className="absolute bottom-2 left-2 w-4 h-4 bg-[#E53935] rounded-full opacity-20"></div>
              <div className="absolute top-1/2 right-4 w-3 h-3 bg-[#E53935] rounded-full opacity-20"></div>
              <div className="absolute bottom-4 right-1/3 w-2 h-2 bg-[#E53935] rounded-full opacity-20"></div>
              <div className="w-12 h-12 bg-[#E53935] bg-opacity-10 rounded-full flex items-center justify-center mb-4 relative z-10">
                <Heart className="text-[#E53935]" size={24} />
              </div>
              <h3 className="font-poppins text-xl font-semibold text-gray-900 mb-3">
                Teamwork and Confidence Building
              </h3>
              <p className="font-inter text-gray-600">
                We emphasize social skills, cooperation, and building self-esteem on and off the field.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Camp Info Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-red-50 to-blue-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Camp Information
          </h2>
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#1E88E5] bg-opacity-10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Calendar className="text-[#1E88E5]" size={24} />
                </div>
                <div>
                  <h4 className="font-poppins font-semibold text-gray-900 mb-2">Schedule</h4>
                  <p className="font-inter text-gray-700">Wednesdays and Saturdays</p>
                  <p className="font-inter text-gray-700">Early July through mid-August</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#43A047] bg-opacity-10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="text-[#43A047]" size={24} />
                </div>
                <div>
                  <h4 className="font-poppins font-semibold text-gray-900 mb-2">Time</h4>
                  <p className="font-inter text-gray-700">10:00 AM – 12:00 PM</p>
                  <p className="font-inter text-gray-700">2 hours per session</p>
                </div>
              </div>

              <div className="flex items-start gap-4 md:col-span-2">
                <div className="w-12 h-12 bg-[#E53935] bg-opacity-10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-[#E53935]" size={24} />
                </div>
                <div>
                  <h4 className="font-poppins font-semibold text-gray-900 mb-2">Location</h4>
                  <p className="font-inter text-gray-700">Sammamish, Washington</p>
                  <p className="font-inter text-gray-600 text-sm mt-1">
                    Exact location provided upon registration
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-100">
              <h4 className="font-poppins font-semibold text-gray-900 mb-3">Informational Session Dates</h4>
              <p className="font-inter text-gray-700 text-sm leading-relaxed">
                Wednesdays: July 1, July 8, July 15, July 22, July 29, August 5, August 12
              </p>
              <p className="font-inter text-gray-700 text-sm leading-relaxed mt-2">
                Saturdays: July 4, July 11, July 18, July 25, August 1, August 8, August 15
              </p>
              <p className="font-inter text-gray-600 text-sm mt-2">All sessions run from 10:00 AM – 12:00 PM.</p>
            </div>

            <div className="mt-10 text-center">
              <Link
                to="/signup"
                className="inline-block px-8 py-4 bg-[#E53935] text-white rounded-full font-inter font-medium hover:bg-[#d32f2f] transition-colors shadow-lg"
              >
                Reserve a Spot
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Parents Love AAA Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Why Parents Love AAA
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#43A047] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="font-poppins text-xl font-semibold text-gray-900 mb-3">
                Affordable Pricing
              </h3>
              <p className="font-inter text-gray-600">
                High-quality soccer instruction at a price that makes sense for families.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#1E88E5] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚽</span>
              </div>
              <h3 className="font-poppins text-xl font-semibold text-gray-900 mb-3">
                High School Athlete Mentors
              </h3>
              <p className="font-inter text-gray-600">
                Your child learns from passionate, relatable role models who love the game.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#E53935] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌳</span>
              </div>
              <h3 className="font-poppins text-xl font-semibold text-gray-900 mb-3">
                Outdoor Activity Instead of Screen Time
              </h3>
              <p className="font-inter text-gray-600">
                Get your kids moving, playing outdoors, and building healthy habits.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
