import { useState } from 'react';
import { CheckCircle, Shield, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from '@/app/components/Logo';

export function SignUp() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    parentName: '',
    email: '',
    phone: '',
    childName: '',
    childAge: '',
    emergencyContact: '',
    medicalNotes: '',
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
            {/* Logo in success message */}
            <div className="flex justify-center mb-6">
              <Logo size="medium" showText={false} linkable={false} />
            </div>
            <div className="w-20 h-20 bg-[#43A047] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-[#43A047]" size={48} />
            </div>
            <h2 className="font-poppins text-3xl font-bold text-gray-900 mb-4">
              Registration Submitted!
            </h2>
            <p className="font-inter text-lg text-gray-700 mb-8">
              Thank you for registering {formData.childName} for AAA Sports Camp! We'll send a confirmation email to {formData.email} shortly.
            </p>
            <div className="space-y-4">
              <Link
                to="/pricing"
                className="block w-full px-8 py-4 bg-[#E53935] text-white rounded-full font-inter font-medium hover:bg-[#d32f2f] transition-colors shadow-lg"
              >
                Continue to Payment
              </Link>
              <Link
                to="/"
                className="block w-full px-8 py-4 bg-white text-[#E53935] border-2 border-[#E53935] rounded-full font-inter font-medium hover:bg-red-50 transition-colors"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-poppins text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Register Your Child
          </h1>
          <p className="font-inter text-lg text-gray-600">
            Quick, secure registration in under 2 minutes
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="flex justify-center gap-8 mb-12">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Shield className="text-[#43A047]" size={20} />
            <span className="font-inter">Safe Program</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Lock className="text-[#1E88E5]" size={20} />
            <span className="font-inter">Secure Checkout</span>
          </div>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="space-y-6">
            {/* Parent Name */}
            <div>
              <label htmlFor="parentName" className="block font-inter font-medium text-gray-900 mb-2">
                Parent or Guardian Name *
              </label>
              <input
                type="text"
                id="parentName"
                name="parentName"
                required
                value={formData.parentName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E53935] focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block font-inter font-medium text-gray-900 mb-2">
                Email Address *
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

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block font-inter font-medium text-gray-900 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E53935] focus:border-transparent"
                placeholder="(555) 123-4567"
              />
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 pt-6 mt-6">
              <h3 className="font-poppins text-xl font-semibold text-gray-900 mb-6">
                Child Information
              </h3>
            </div>

            {/* Child Name */}
            <div>
              <label htmlFor="childName" className="block font-inter font-medium text-gray-900 mb-2">
                Child's Name *
              </label>
              <input
                type="text"
                id="childName"
                name="childName"
                required
                value={formData.childName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E53935] focus:border-transparent"
                placeholder="Enter child's full name"
              />
            </div>

            {/* Child Age */}
            <div>
              <label htmlFor="childAge" className="block font-inter font-medium text-gray-900 mb-2">
                Child's Age (6–12) *
              </label>
              <input
                type="number"
                id="childAge"
                name="childAge"
                required
                min="6"
                max="12"
                value={formData.childAge}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E53935] focus:border-transparent"
                placeholder="Age"
              />
            </div>

            {/* Emergency Contact */}
            <div>
              <label htmlFor="emergencyContact" className="block font-inter font-medium text-gray-900 mb-2">
                Emergency Contact *
              </label>
              <input
                type="text"
                id="emergencyContact"
                name="emergencyContact"
                required
                value={formData.emergencyContact}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E53935] focus:border-transparent"
                placeholder="Name and phone number"
              />
            </div>

            {/* Medical Notes */}
            <div>
              <label htmlFor="medicalNotes" className="block font-inter font-medium text-gray-900 mb-2">
                Medical Notes or Allergies
              </label>
              <textarea
                id="medicalNotes"
                name="medicalNotes"
                rows={4}
                value={formData.medicalNotes}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E53935] focus:border-transparent"
                placeholder="Any medical conditions, allergies, or special needs we should know about"
              />
            </div>

            {/* Schedule Selection */}
            <div className="border border-gray-300 rounded-lg p-6 bg-blue-50">
              <h4 className="font-poppins font-semibold text-gray-900 mb-3">Camp Schedule</h4>
              <div className="space-y-2 text-gray-700 font-inter">
                <p><strong>Days:</strong> Wednesdays and Saturdays</p>
                <p><strong>Time:</strong> 10:00 AM – 12:00 PM</p>
                <p><strong>Duration:</strong> Early July through mid-August</p>
                <p><strong>Dates (Info):</strong> Wed — July 1, 8, 15, 22, 29; Aug 5, 12 | Sat — July 4, 11, 18, 25; Aug 1, 8, 15</p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-8 py-4 bg-[#E53935] text-white rounded-full font-inter font-medium hover:bg-[#d32f2f] transition-colors shadow-lg"
            >
              Continue to Payment
            </button>

            <p className="text-center text-sm text-gray-600 font-inter">
              By registering, you agree to our{' '}
              <Link to="/policies" className="text-[#E53935] hover:underline">
                camp policies
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
