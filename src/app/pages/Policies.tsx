import { FileText } from 'lucide-react';

export function Policies() {
  const policies = [
    {
      title: 'Refund Policy',
      icon: '💰',
      content: `Refunds are issued for preplanned absences or medical absences. For preplanned absences, please notify us at least 48 hours in advance. For medical absences, you must provide a doctor's note or medical documentation within 7 days of the missed session. Refunds are processed within 14 business days of approval.`,
    },
    {
      title: 'Safety Policy',
      icon: '🛡️',
      content: `All athletes must follow coach instructions and respect fellow athletes at all times. Unsafe behavior, including but not limited to: physical aggression, intentional rule violations, or refusal to follow safety guidelines, may result in dismissal from the program without refund. Parents will be contacted immediately in case of any safety incidents. We maintain a zero-tolerance policy for bullying or harassment.`,
    },
    {
      title: 'Attendance Policy',
      icon: '⏰',
      content: `Athletes must arrive on time for the 10:00 AM start and be picked up promptly at 12:00 PM. Late drop-offs may result in missed instruction time. Parents who are more than 15 minutes late for pickup will be contacted. Repeated late pickups (3 or more) may result in dismissal from the program. Please notify us in advance if your child will be absent.`,
    },
    {
      title: 'Health Policy',
      icon: '🏥',
      content: `All medical conditions, allergies, and medications must be disclosed during registration. Parents must complete the medical information form before the first session. Children who are ill, have a fever, or show signs of contagious illness should not attend the program. If your child becomes ill during the session, you will be contacted for immediate pickup. Emergency medical care will be provided if necessary, and parents will be responsible for any associated costs.`,
    },
    {
      title: 'Weather Policy',
      icon: '🌦️',
      content: `Sessions will be held rain or shine unless conditions are deemed unsafe by the coaches. In case of severe weather (lightning, extreme heat, heavy storms), the session may be cancelled or modified. Parents will be notified via email at least 2 hours before the scheduled start time. No refunds are provided for weather-related cancellations, but makeup sessions may be scheduled when possible.`,
    },
    {
      title: 'Behavior and Conduct',
      icon: '✨',
      content: `We expect all athletes to demonstrate good sportsmanship, respect for coaches and peers, and a positive attitude. Athletes should come ready to participate, learn, and have fun. Disruptive behavior will be addressed with positive reinforcement first, but repeated issues may require parent involvement or dismissal from the program. Our goal is to create a welcoming, inclusive environment for all children.`,
    },
    {
      title: 'Equipment and Personal Belongings',
      icon: '⚽',
      content: `All soccer equipment is provided by AAA Sports Camp. Athletes should bring a water bottle, appropriate athletic shoes (cleats are highly recommended), and athletic clothing. Please label all personal items with your child's name. AAA Sports Camp is not responsible for lost, stolen, or damaged personal belongings. We recommend not bringing valuable items to the program.`,
    },
    {
      title: 'Photography and Media',
      icon: '📸',
      content: `AAA Sports Camp may take photos or videos during sessions for promotional purposes, social media, or documentation. By enrolling, you consent to your child being photographed or filmed. If you do not wish for your child to be included in promotional materials, please notify us in writing during registration.`,
    },
  ];

  return (
    <div className="min-h-screen py-16 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-poppins text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Policies and Procedures
          </h1>
          <p className="font-inter text-lg text-gray-600">
            Please read our policies carefully before registering
          </p>
        </div>

        {/* Policies Grid */}
        <div className="space-y-6">
          {policies.map((policy, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#E53935] to-[#1E88E5] bg-opacity-10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">{policy.icon}</span>
                </div>
                <div className="flex-1">
                  <h2 className="font-poppins text-2xl font-bold text-gray-900 mb-4">
                    {policy.title}
                  </h2>
                  <p className="font-inter text-gray-700 leading-relaxed">
                    {policy.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
            <FileText className="text-[#E53935]" size={32} />
          </div>
          <h3 className="font-poppins text-2xl font-bold text-gray-900 mb-3">
            Have Questions About Our Policies?
          </h3>
          <p className="font-inter text-gray-700 mb-6">
            If you have any questions or need clarification about our policies, please don't hesitate to reach out.
          </p>
          <a
            href="mailto:sportscampaaa@gmail.com"
            className="inline-block px-8 py-4 bg-[#E53935] text-white rounded-full font-inter font-medium hover:bg-[#d32f2f] transition-colors shadow-lg"
          >
            Contact Us
          </a>
        </div>

        {/* Agreement Notice */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <p className="font-inter text-sm text-gray-700 text-center">
            <strong>Please note:</strong> By registering for AAA Sports Camp, you acknowledge that you have read, 
            understood, and agree to abide by all policies and procedures listed above.
          </p>
        </div>
      </div>
    </div>
  );
}