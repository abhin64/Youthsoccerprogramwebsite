import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, Users, Award, CreditCard, Lock, AlertCircle } from 'lucide-react';
import { Logo } from '@/app/components/Logo';
import { supabase, isSupabaseReady } from '@/app/lib/supabase';

export function Pricing() {
  const [registrationSubmitted, setRegistrationSubmitted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [registrationData, setRegistrationData] = useState({
    childFirstName: '',
    childLastName: '',
    childAge: '',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    emergencyContact: '',
    emergencyPhone: '',
    agreeToPolicy: false,
    waiverCompleted: false,
  });

  // Log Supabase connection status on component mount
  console.log('🔌 Supabase Status:', isSupabaseReady() ? '✅ Connected' : '❌ Not configured');
  console.log('📋 Supabase URL:', import.meta.env.VITE_SUPABASE_URL || 'Not set');

  // Handle payment - calls the Netlify serverless function
  const handleProceedToPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);
    
    try {
      // Check if Supabase is configured
      if (!isSupabaseReady()) {
        console.warn('⚠️ Supabase not configured. Registration data will not be saved.');
        console.warn('Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file');
        
        // Show warning to user
        setError('Database not configured. For demo purposes, proceeding to payment without saving registration. Please configure Supabase to enable data persistence.');
        
        // Still proceed to payment for demo purposes
        await new Promise(resolve => setTimeout(resolve, 1000));
        window.location.href = "https://buy.stripe.com/test_bJe6oAfDkbNBg5V09F8Vi01";
        return;
      }

      const playerName = `${registrationData.childFirstName} ${registrationData.childLastName}`;

      // Step 1: Save registration data to Supabase
      const registrationRecord = {
        player_name: playerName,
        age: parseInt(registrationData.childAge),
        email: registrationData.parentEmail,
        phone: registrationData.parentPhone,
        parent_name: registrationData.parentName,
        program: '6-Week Summer Camp',
        emergency_contact: registrationData.emergencyContact,
        emergency_phone: registrationData.emergencyPhone,
        waiver_completed: registrationData.waiverCompleted,
        policy_agreed: registrationData.agreeToPolicy,
        payment_status: 'pending',
        registration_date: new Date().toISOString(),
      };

      const { data, error: supabaseError } = await supabase
        .from('registrations')
        .insert([registrationRecord])
        .select();

      if (supabaseError) {
        console.error('Supabase error:', supabaseError);
        throw new Error(`Failed to save registration: ${supabaseError.message}`);
      }

      console.log('Registration saved successfully:', data);

      // Step 2: Send notification email to camp organizers
      try {
        const emailResponse = await fetch('/.netlify/functions/send-registration-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            playerName: playerName,
            age: registrationData.childAge,
            email: registrationData.parentEmail,
            phone: registrationData.parentPhone,
            parentName: registrationData.parentName,
            program: '6-Week Summer Camp',
            emergencyContact: registrationData.emergencyContact,
            emergencyPhone: registrationData.emergencyPhone,
          }),
        });

        if (emailResponse.ok) {
          console.log('✅ Notification email sent successfully');
        } else {
          console.warn('⚠️ Email notification failed, but registration was saved');
        }
      } catch (emailError) {
        // Don't fail the whole process if email fails
        console.warn('⚠️ Could not send notification email:', emailError);
      }

      // Step 3: Proceed to payment
      // Simulate a brief processing delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Redirect to Stripe Checkout
      // TODO: Replace with your production Stripe Payment Link
      window.location.href = "https://buy.stripe.com/test_bJe6oAfDkbNBg5V09F8Vi01";
    } catch (err) {
      console.error('Payment error:', err);
      setError(err instanceof Error ? err.message : 'There was an error processing your request. Please try again or contact support.');
      setIsProcessing(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setRegistrationData({
      ...registrationData,
      [e.target.name]: value,
    });
  };

  // Success page after payment
  if (registrationSubmitted) {
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
              Registration Complete!
            </h2>
            <p className="font-inter text-lg text-gray-700 mb-4">
              Thank you for registering! Your payment has been processed successfully.
            </p>
            <p className="font-inter text-gray-600 mb-8">
              You'll receive a confirmation email with all the camp details shortly.
            </p>
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

  return (
    <>
      <div className="min-h-screen py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-poppins text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Camp Pricing
            </h1>
            <p className="font-inter text-lg text-gray-600">
              Affordable, high-quality soccer instruction for your child
            </p>
            
            {/* Supabase Connection Status (for debugging) */}
            {isSupabaseReady() && (
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-inter">
                <CheckCircle size={16} />
                <span>Database Connected - Registration data will be saved</span>
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Pricing Card */}
            <div className="bg-gradient-to-br from-red-50 to-blue-50 rounded-2xl p-8 shadow-xl">
              <div className="bg-white rounded-xl p-8 shadow-md">
                <div className="text-center mb-6">
                  <h2 className="font-poppins text-2xl font-bold text-gray-900 mb-2">
                    6-Week Summer Camp
                  </h2>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="font-poppins text-5xl font-bold text-[#E53935]">$249</span>
                  </div>
                  <p className="font-inter text-sm text-gray-600 mt-2">
                    Total for 12 sessions
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <Calendar className="text-[#1E88E5] flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-inter text-gray-900 font-medium">Tuesdays and Thursdays</p>
                      <p className="font-inter text-sm text-gray-600">6 weeks of instruction</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="text-[#43A047] flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-inter text-gray-900 font-medium">10:00 AM – 12:00 PM</p>
                      <p className="font-inter text-sm text-gray-600">2 hours per session</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="text-[#E53935] flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-inter text-gray-900 font-medium">Led by high school athletes</p>
                      <p className="font-inter text-sm text-gray-600">Experienced, passionate coaches</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Award className="text-[#1E88E5] flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-inter text-gray-900 font-medium">All equipment provided</p>
                      <p className="font-inter text-sm text-gray-600">Just bring water and athletic shoes (cleats are highly recommended)!</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <p className="font-inter text-sm text-gray-700">
                    <strong>Refund Policy:</strong> Refunds are issued for preplanned absences or medical absences.{' '}
                    <Link to="/policies" className="text-[#E53935] hover:underline">
                      Full policy
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            {/* Registration Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="font-poppins text-2xl font-bold text-gray-900 mb-2">
                Registration Information
              </h2>
              <p className="font-inter text-sm text-gray-600 mb-6">
                Payment will be processed securely through Stripe
              </p>
              
              <form onSubmit={handleProceedToPayment} className="space-y-5">
                {/* Child Information */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="childFirstName" className="block font-inter font-medium text-gray-900 mb-2">
                      Child's First Name *
                    </label>
                    <input
                      type="text"
                      id="childFirstName"
                      name="childFirstName"
                      required
                      value={registrationData.childFirstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E53935] focus:border-transparent"
                      placeholder="Emma"
                    />
                  </div>
                  <div>
                    <label htmlFor="childLastName" className="block font-inter font-medium text-gray-900 mb-2">
                      Child's Last Name *
                    </label>
                    <input
                      type="text"
                      id="childLastName"
                      name="childLastName"
                      required
                      value={registrationData.childLastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E53935] focus:border-transparent"
                      placeholder="Johnson"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="childAge" className="block font-inter font-medium text-gray-900 mb-2">
                    Child's Age *
                  </label>
                  <input
                    type="number"
                    id="childAge"
                    name="childAge"
                    required
                    min="6"
                    max="12"
                    value={registrationData.childAge}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E53935] focus:border-transparent"
                    placeholder="8"
                  />
                </div>

                {/* Parent/Guardian Information */}
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="font-poppins font-bold text-gray-900 mb-4">
                    Parent/Guardian Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="parentName" className="block font-inter font-medium text-gray-900 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="parentName"
                        name="parentName"
                        required
                        value={registrationData.parentName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E53935] focus:border-transparent"
                        placeholder="Sarah Johnson"
                      />
                    </div>

                    <div>
                      <label htmlFor="parentEmail" className="block font-inter font-medium text-gray-900 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="parentEmail"
                        name="parentEmail"
                        required
                        value={registrationData.parentEmail}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E53935] focus:border-transparent"
                        placeholder="sarah@example.com"
                      />
                      <p className="text-xs text-gray-500 mt-1 font-inter">
                        Confirmation and receipt will be sent here
                      </p>
                    </div>

                    <div>
                      <label htmlFor="parentPhone" className="block font-inter font-medium text-gray-900 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="parentPhone"
                        name="parentPhone"
                        required
                        value={registrationData.parentPhone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E53935] focus:border-transparent"
                        placeholder="(425) 555-0123"
                      />
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="font-poppins font-bold text-gray-900 mb-4">
                    Emergency Contact
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="emergencyContact" className="block font-inter font-medium text-gray-900 mb-2">
                        Contact Name *
                      </label>
                      <input
                        type="text"
                        id="emergencyContact"
                        name="emergencyContact"
                        required
                        value={registrationData.emergencyContact}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E53935] focus:border-transparent"
                        placeholder="Michael Johnson"
                      />
                    </div>

                    <div>
                      <label htmlFor="emergencyPhone" className="block font-inter font-medium text-gray-900 mb-2">
                        Emergency Phone *
                      </label>
                      <input
                        type="tel"
                        id="emergencyPhone"
                        name="emergencyPhone"
                        required
                        value={registrationData.emergencyPhone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E53935] focus:border-transparent"
                        placeholder="(425) 555-0124"
                      />
                    </div>
                  </div>
                </div>

                {/* Checkboxes */}
                <div className="pt-4 border-t border-gray-200 space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="waiverCompleted"
                      checked={registrationData.waiverCompleted}
                      onChange={handleChange}
                      className="w-5 h-5 text-[#E53935] rounded focus:ring-[#E53935] mt-0.5 flex-shrink-0"
                      required
                    />
                    <span className="font-inter text-sm text-gray-700">
                      I confirm that I have completed and submitted the{' '}
                      <Link to="/waivers" className="text-[#E53935] hover:underline">
                        required waivers
                      </Link>{' '}
                      (Liability & Consent Waiver and Medical Information Form)
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="agreeToPolicy"
                      checked={registrationData.agreeToPolicy}
                      onChange={handleChange}
                      className="w-5 h-5 text-[#E53935] rounded focus:ring-[#E53935] mt-0.5 flex-shrink-0"
                      required
                    />
                    <span className="font-inter text-sm text-gray-700">
                      I agree to the{' '}
                      <Link to="/policies" className="text-[#E53935] hover:underline">
                        camp policies
                      </Link>{' '}
                      and refund policy
                    </span>
                  </label>
                </div>

                {/* Payment Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full px-8 py-4 bg-[#E53935] text-white rounded-full font-inter font-medium hover:bg-[#d32f2f] transition-colors shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Lock size={18} />
                  {isProcessing ? 'Saving Registration...' : 'Proceed to Secure Payment'}
                </button>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
                    <p className="text-center text-sm text-red-900 font-inter">
                      <AlertCircle size={16} className="inline-block mr-2" />
                      <strong>Error:</strong> {error}
                    </p>
                  </div>
                )}

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-center text-sm text-green-900 font-inter">
                    🔒 <strong>Secure Payment via Stripe</strong>
                  </p>
                  <p className="text-center text-xs text-green-800 font-inter mt-1">
                    Your payment information is processed securely and never stored on our servers
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}