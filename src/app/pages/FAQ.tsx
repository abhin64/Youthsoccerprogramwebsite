import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '@/app/components/Logo';
import { DecorativeCircles } from '@/app/components/DecorativeCircles';
import { FloatingSymbols } from '@/app/components/FloatingSymbols';

interface FAQItemProps {
  question: string;
  answer: string | JSX.Element;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-[#1E88E5] transition-all">
      <button
        onClick={onToggle}
        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
      >
        <h3 className="font-poppins text-lg font-semibold text-gray-900 pr-4">
          {question}
        </h3>
        <ChevronDown
          className={`text-[#1E88E5] flex-shrink-0 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          size={24}
        />
      </button>
      {isOpen && (
        <div className="px-6 pb-5 pt-2">
          <div className="font-inter text-gray-700 leading-relaxed">
            {answer}
          </div>
        </div>
      )}
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How is this better or different than bigger sports camps like i9?',
      answer: 'We offer more classes for the same price in a community-focused environment with smaller group sizes. This means your child gets more personalized attention and builds stronger connections with coaches and peers.',
    },
    {
      question: 'Are you guys trustworthy to coach my child?',
      answer: 'We are high school athletes who understand what kids are going through. We bring recent experience, energy, and a genuine passion for helping young athletes grow.',
    },
    {
      question: 'Will my child get enough individual attention?',
      answer: 'Yes! We keep our groups small and provide personalized feedback to every camper throughout each session.',
    },
    {
      question: 'Is this camp a good fit if my child is new to the sport?',
      answer: 'Absolutely. We are beginner-friendly while still providing challenges that help kids improve and build confidence.',
    },
    {
      question: 'How will I know how my child is doing during the camp?',
      answer: 'We send weekly newsletters and provide TeamSnap updates for practices throughout the week so you stay informed about your child\'s progress.',
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
            Frequently Asked Questions
          </h1>
          <p className="font-inter text-lg text-gray-700 max-w-2xl mx-auto">
            Find answers to common questions about AAA Sports Camp registration, policies, safety, and more.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-red-50 to-blue-50 relative">
        <DecorativeCircles variant="footer" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Still have questions?
          </h2>
          <p className="font-inter text-lg text-gray-700 mb-8">
            We're here to help! Contact us directly and we'll get back to you as soon as possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-block px-8 py-4 bg-[#1E88E5] text-white rounded-full font-inter font-medium hover:bg-[#1976d2] transition-colors shadow-lg"
            >
              Contact Us
            </Link>
            <Link
              to="/signup"
              className="inline-block px-8 py-4 bg-[#E53935] text-white rounded-full font-inter font-medium hover:bg-[#d32f2f] transition-colors shadow-lg"
            >
              Register Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}