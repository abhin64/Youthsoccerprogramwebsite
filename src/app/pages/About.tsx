import { Link } from 'react-router-dom';
import { Shield, Users, Heart, DollarSign } from 'lucide-react';
import { Logo } from '@/app/components/Logo';
import { DecorativeCircles } from '@/app/components/DecorativeCircles';
import { FloatingSymbols } from '@/app/components/FloatingSymbols';

export function About() {
  const coaches = [
    {
      name: 'Coach Arnav',
      role: 'ECNL Soccer Player & Ski Instructor',
      bio: 'ECNL level soccer player for XF and ski instructor, good with kids and passionate about creating an amazing environment for your kids',
    },
    {
      name: 'Coach Abhinav',
      role: 'Football & Soccer Athlete',
      bio: 'High school football and soccer athlete and ski instructor dedicated to bringing a great experience to your kids',
    },
    {
      name: 'Coach Anish',
      role: 'Track Runner & Swimmer',
      bio: 'Athletic track runner and swimmer focused on making the camp a safe and enjoyable place',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Floating symbols throughout the page */}
      <FloatingSymbols />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 py-20 px-4 relative">
        <DecorativeCircles variant="hero" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Logo size="large" showText={false} linkable={false} />
          </div>
          <h1 className="font-poppins text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Built by Students. Trusted by Parents. Loved by Kids.
          </h1>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8">
            Our Mission
          </h2>
          <p className="font-inter text-lg text-gray-700 leading-relaxed text-center">
            AAA Sports Camp was founded by three Indian high school athletes in Sammamish to create an 
            affordable, welcoming sports space for kids of all skill levels while helping combat rising 
            childhood obesity through outdoor play. We believe every child deserves access to quality 
            athletic instruction, positive role models, and the joy of being active outdoors.
          </p>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-16 px-4 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white border-2 border-[#43A047] rounded-2xl p-8 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#43A047] opacity-5 rounded-bl-full"></div>
              {/* Decorative symbols */}
              <div className="absolute top-2 right-2 text-2xl opacity-10">🛡️</div>
              <div className="absolute bottom-2 left-2 w-4 h-4 bg-[#43A047] rounded-full opacity-20"></div>
              <div className="absolute top-1/2 right-4 w-3 h-3 bg-[#43A047] rounded-full opacity-20"></div>
              <div className="w-12 h-12 bg-[#43A047] bg-opacity-10 rounded-full flex items-center justify-center mb-4 relative z-10">
                <Shield className="text-[#43A047]" size={24} />
              </div>
              <h3 className="font-poppins text-xl font-semibold text-gray-900 mb-3">
                Safety First
              </h3>
              <p className="font-inter text-gray-600">
                Your child's safety and wellbeing are our top priorities in everything we do.
              </p>
            </div>

            <div className="bg-white border-2 border-[#1E88E5] rounded-2xl p-8 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#1E88E5] opacity-5 rounded-bl-full"></div>
              {/* Decorative symbols */}
              <div className="absolute top-2 right-2 text-2xl opacity-10">⚽</div>
              <div className="absolute bottom-2 left-2 w-4 h-4 bg-[#1E88E5] rounded-full opacity-20"></div>
              <div className="absolute top-1/3 right-4 w-3 h-3 bg-[#1E88E5] rounded-full opacity-20"></div>
              <div className="absolute bottom-1/3 left-4 w-2 h-2 bg-[#1E88E5] rounded-full opacity-20"></div>
              <div className="w-12 h-12 bg-[#1E88E5] bg-opacity-10 rounded-full flex items-center justify-center mb-4 relative z-10">
                <Users className="text-[#1E88E5]" size={24} />
              </div>
              <h3 className="font-poppins text-xl font-semibold text-gray-900 mb-3">
                Beginner Friendly
              </h3>
              <p className="font-inter text-gray-600">
                All skill levels welcome—we focus on fun, learning, and personal growth.
              </p>
            </div>

            <div className="bg-white border-2 border-[#E53935] rounded-2xl p-8 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#E53935] opacity-5 rounded-bl-full"></div>
              {/* Decorative symbols */}
              <div className="absolute top-2 right-2 text-2xl opacity-10">❤️</div>
              <div className="absolute bottom-2 left-2 w-4 h-4 bg-[#E53935] rounded-full opacity-20"></div>
              <div className="absolute top-1/2 right-4 w-3 h-3 bg-[#E53935] rounded-full opacity-20"></div>
              <div className="absolute bottom-4 right-1/3 w-2 h-2 bg-[#E53935] rounded-full opacity-20"></div>
              <div className="w-12 h-12 bg-[#E53935] bg-opacity-10 rounded-full flex items-center justify-center mb-4 relative z-10">
                <Heart className="text-[#E53935]" size={24} />
              </div>
              <h3 className="font-poppins text-xl font-semibold text-gray-900 mb-3">
                Confidence Building
              </h3>
              <p className="font-inter text-gray-600">
                We help kids discover their strengths and build self-esteem through sports.
              </p>
            </div>

            <div className="bg-white border-2 border-[#43A047] rounded-2xl p-8 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#43A047] opacity-5 rounded-bl-full"></div>
              {/* Decorative symbols */}
              <div className="absolute top-2 right-2 text-2xl opacity-10">⭐</div>
              <div className="absolute bottom-2 left-2 w-4 h-4 bg-[#43A047] rounded-full opacity-20"></div>
              <div className="absolute top-1/3 right-4 w-3 h-3 bg-[#43A047] rounded-full opacity-20"></div>
              <div className="absolute bottom-1/2 left-1/3 w-2 h-2 bg-[#43A047] rounded-full opacity-20"></div>
              <div className="w-12 h-12 bg-[#43A047] bg-opacity-10 rounded-full flex items-center justify-center mb-4 relative z-10">
                <DollarSign className="text-[#43A047]" size={24} />
              </div>
              <h3 className="font-poppins text-xl font-semibold text-gray-900 mb-3">
                Affordable Access
              </h3>
              <p className="font-inter text-gray-600">
                Quality sports programs should be accessible to all families in our community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Coaches Section */}
      <section className="py-16 px-4 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Meet Our Coaches
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border-2 border-[#E53935] rounded-2xl p-8 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-24 h-24 bg-[#E53935] opacity-5 rounded-br-full"></div>
              <div className="w-24 h-24 bg-gradient-to-br from-[#E53935] to-[#c62828] rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg relative z-10">
                <span className="text-white text-4xl font-poppins font-bold">A</span>
              </div>
              <h3 className="font-poppins text-xl font-semibold text-gray-900 mb-2">
                Coach Arnav
              </h3>
              <p className="font-inter text-sm text-[#E53935] font-medium mb-3">
                ECNL Soccer Player & Ski Instructor
              </p>
              <p className="font-inter text-gray-600">
                ECNL level soccer player for XF and ski instructor, good with kids and passionate about creating an amazing environment for your kids
              </p>
            </div>

            <div className="bg-white border-2 border-[#1E88E5] rounded-2xl p-8 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-24 h-24 bg-[#1E88E5] opacity-5 rounded-br-full"></div>
              <div className="w-24 h-24 bg-gradient-to-br from-[#1E88E5] to-[#1565c0] rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg relative z-10">
                <span className="text-white text-4xl font-poppins font-bold">A</span>
              </div>
              <h3 className="font-poppins text-xl font-semibold text-gray-900 mb-2">
                Coach Abhinav
              </h3>
              <p className="font-inter text-sm text-[#1E88E5] font-medium mb-3">
                Football & Soccer Athlete
              </p>
              <p className="font-inter text-gray-600">
                High school football and soccer athlete and ski instructor dedicated to bringing a great experience to your kids
              </p>
            </div>

            <div className="bg-white border-2 border-[#43A047] rounded-2xl p-8 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-24 h-24 bg-[#43A047] opacity-5 rounded-br-full"></div>
              <div className="w-24 h-24 bg-gradient-to-br from-[#43A047] to-[#2e7d32] rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg relative z-10">
                <span className="text-white text-4xl font-poppins font-bold">A</span>
              </div>
              <h3 className="font-poppins text-xl font-semibold text-gray-900 mb-2">
                Coach Anish
              </h3>
              <p className="font-inter text-sm text-[#43A047] font-medium mb-3">
                Track Runner & Swimmer
              </p>
              <p className="font-inter text-gray-600">
                Athletic track runner and swimmer focused on making the camp a safe and enjoyable place
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Photo Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <img
            src="https://images.unsplash.com/photo-1769601395015-55f952fbf52a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwc29jY2VyJTIwdGVhbXxlbnwxfHx8fDE3Njk5ODA0NTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Kids soccer team"
            className="w-full h-[400px] object-cover rounded-2xl shadow-xl"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-red-50 to-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to join the fun?
          </h2>
          <p className="font-inter text-lg text-gray-700 mb-8">
            Register your child today and give them an unforgettable summer of soccer, friends, and fun!
          </p>
          <Link
            to="/signup"
            className="inline-block px-8 py-4 bg-[#E53935] text-white rounded-full font-inter font-medium hover:bg-[#d32f2f] transition-colors shadow-lg"
          >
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  );
}