import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Loader2 } from 'lucide-react';
import { Logo } from '@/app/components/Logo';

export function Success() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    
    if (!sessionId) {
      setError(true);
      setLoading(false);
      return;
    }
    
    // Verify payment with backend
    // This calls the Netlify function to verify the Stripe session
    fetch(`/.netlify/functions/verify-payment?session_id=${sessionId}`)
      .then(res => res.json())
      .then(data => {
        if (data.paid) {
          setConfirmed(true);
        } else {
          setError(true);
        }
      })
      .catch(err => {
        console.error('Payment verification error:', err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [searchParams]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen py-16 px-4 bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
          <Loader2 className="w-16 h-16 animate-spin text-[#1E88E5] mx-auto mb-4" />
          <h2 className="font-poppins text-2xl font-bold text-gray-900 mb-2">
            Confirming Payment...
          </h2>
          <p className="font-inter text-gray-600">
            Please wait while we verify your payment
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen py-16 px-4 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <div className="flex justify-center mb-6">
              <Logo size="medium" showText={false} linkable={false} />
            </div>
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">⚠️</span>
            </div>
            <h2 className="font-poppins text-3xl font-bold text-gray-900 mb-4">
              Payment Verification Failed
            </h2>
            <p className="font-inter text-lg text-gray-700 mb-8">
              We couldn't verify your payment. Please contact us if you believe this is an error.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-block px-8 py-4 bg-[#E53935] text-white rounded-full font-inter font-medium hover:bg-[#d32f2f] transition-colors shadow-lg"
              >
                Contact Support
              </Link>
              <Link
                to="/"
                className="inline-block px-8 py-4 bg-gray-200 text-gray-800 rounded-full font-inter font-medium hover:bg-gray-300 transition-colors"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Success state
  return (
    <div className="min-h-screen py-16 px-4 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-2xl shadow-xl p-12">
          <div className="flex justify-center mb-6">
            <Logo size="medium" showText={false} linkable={false} />
          </div>
          <div className="w-20 h-20 bg-[#43A047] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-[#43A047]" size={48} />
          </div>
          <h2 className="font-poppins text-3xl font-bold text-gray-900 mb-4">
            Registration Complete! 🎉
          </h2>
          <p className="font-inter text-lg text-gray-700 mb-4">
            Thank you for registering for AAA Sports Camp! Your payment has been processed successfully.
          </p>
          <p className="font-inter text-gray-600 mb-4">
            You'll receive a confirmation email with all the camp details shortly.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left">
            <h3 className="font-poppins font-bold text-gray-900 mb-3">
              What's Next?
            </h3>
            <ul className="space-y-2 font-inter text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="text-[#43A047] flex-shrink-0 mt-0.5" size={16} />
                <span>Check your email for a confirmation receipt from Stripe</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="text-[#43A047] flex-shrink-0 mt-0.5" size={16} />
                <span>You'll receive camp details and schedule 1 week before the start date</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="text-[#43A047] flex-shrink-0 mt-0.5" size={16} />
                <span>Make sure to bring water and athletic shoes on the first day!</span>
              </li>
            </ul>
          </div>

          <Link
            to="/"
            className="inline-block px-8 py-4 bg-[#E53935] text-white rounded-full font-inter font-medium hover:bg-[#d32f2f] transition-colors shadow-lg"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
