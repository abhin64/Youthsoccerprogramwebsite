import { useState } from 'react';
import { Mail, MapPin, Facebook, Instagram, CheckCircle } from 'lucide-react';

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen py-16 px-4 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <div className="w-20 h-20 bg-[#43A047] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-[#43A047]" size={48} />
            </div>
            <h2 className="font-poppins text-3xl font-bold text-gray-900 mb-4">
              Message Sent!
            </h2>
            <p className="font-inter text-lg text-gray-700 mb-8">
              Thank you for contacting us, {formData.name}! We'll get back to you at {formData.email} within 24 hours.
            </p>
            <button
              onClick={() => window.location.href = '/'}
              className="px-8 py-4 bg-[#E53935] text-white rounded-full font-inter font-medium hover:bg-[#d32f2f] transition-colors shadow-lg"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-poppins text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h1>
          <p className="font-inter text-lg text-gray-600">
            Have questions? We'd love to hear from you!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info Card */}
          <div>
            <div className="bg-gradient-to-br from-red-50 to-blue-50 rounded-2xl p-8 shadow-xl">
              <h2 className="font-poppins text-2xl font-bold text-gray-900 mb-8">
                Contact Information
              </h2>
              
              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#E53935] bg-opacity-10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="text-[#E53935]" size={24} />
                  </div>
                  <div>
                    <h3 className="font-poppins font-semibold text-gray-900 mb-1">
                      Email
                    </h3>
                    <a 
                      href="mailto:sportscampaaa@gmail.com"
                      className="font-inter text-gray-700 hover:text-[#E53935] transition-colors"
                    >
                      sportscampaaa@gmail.com
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#1E88E5] bg-opacity-10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-[#1E88E5]" size={24} />
                  </div>
                  <div>
                    <h3 className="font-poppins font-semibold text-gray-900 mb-1">
                      Location
                    </h3>
                    <p className="font-inter text-gray-700">
                      Sammamish, WA
                    </p>
                    <p className="font-inter text-sm text-gray-600 mt-1">
                      Exact location provided upon registration
                    </p>
                  </div>
                </div>

                {/* Social Media */}
                <div className="pt-6 border-t border-gray-300">
                  <h3 className="font-poppins font-semibold text-gray-900 mb-4">
                    Follow Us
                  </h3>
                  <div className="flex gap-4">
                    <a 
                      href="#"
                      className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
                    >
                      <Facebook className="text-[#1E88E5]" size={24} />
                    </a>
                    <a 
                      href="#"
                      className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
                    >
                      <Instagram className="text-[#E53935]" size={24} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="mt-8">
              <img
                src="https://images.unsplash.com/photo-1606471029645-d081e2db4008?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3V0aCUyMHNvY2NlciUyMGNvYWNofGVufDF8fHx8MTc2OTk4MDQ1OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Youth soccer coach"
                className="w-full h-[300px] object-cover rounded-2xl shadow-xl"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="font-poppins text-2xl font-bold text-gray-900 mb-6">
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block font-inter font-medium text-gray-900 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E53935] focus:border-transparent"
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block font-inter font-medium text-gray-900 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E53935] focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block font-inter font-medium text-gray-900 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E53935] focus:border-transparent"
                  placeholder="How can we help you?"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-8 py-4 bg-[#E53935] text-white rounded-full font-inter font-medium hover:bg-[#d32f2f] transition-colors shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
