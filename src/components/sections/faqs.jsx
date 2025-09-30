"use client"
import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqData = [
  {
    category: "Getting Started",
    questions: [
      {
        question: "How do I get started with the platform?",
        answer: "Getting started is easy! Simply sign up for a free account, complete your profile setup, and you can begin using our basic features immediately. Our onboarding wizard will guide you through the initial setup process."
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for enterprise accounts. All payments are processed securely through Stripe."
      },
      {
        question: "Can I upgrade or downgrade my plan?",
        answer: "Yes! You can upgrade or downgrade your plan at any time directly from your account settings. Changes take effect immediately, and billing is prorated accordingly."
      },
      {
        question: "Is there a free trial available?",
        answer: "Absolutely! All our paid plans come with a 14-day free trial. No credit card required. You can explore all features and decide if it's right for you."
      }
    ]
  },
  {
    category: "Features & Usage",
    questions: [
      {
        question: "What analytics do you provide?",
        answer: "We offer comprehensive analytics including subscriber growth, engagement rates, conversion tracking, A/B testing results, and custom event tracking. All data is updated in real-time."
      },
      {
        question: "Can I use custom domains?",
        answer: "Yes, custom domains are available on Pro and Business plans. You can easily connect your own domain through our DNS setup wizard, and we'll handle SSL certificates automatically."
      },
      {
        question: "Do you offer team collaboration?",
        answer: "Team collaboration features are available on Pro and Business plans. You can invite team members, assign roles and permissions, and work together seamlessly on campaigns."
      },
      {
        question: "What integrations are available?",
        answer: "We integrate with 1000+ tools including Zapier, Google Analytics, Facebook Pixel, Slack, Salesforce, and many more. Check our integrations page for the full list."
      }
    ]
  }
];

const AccordionItem = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="border border-base-300 rounded-lg bg-base-200">
      <button
        onClick={onToggle}
        className={`w-full flex justify-between items-center text-left p-4 text-lg font-medium transition-colors duration-200 ${
          isOpen ? 'bg-base-300 text-base-content' : 'text-base-content'
        }`}
      >
        <span>{question}</span>
        <ChevronDown 
          className={`w-5 h-5 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${
        isOpen ? 'max-h-96' : 'max-h-0'
      }`}>
        <div className="p-4 pt-0">
          <p className="text-base-content/80">{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default function FAQs() {
  const [openItem, setOpenItem] = useState(null);

  const toggleAccordion = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenItem(prev => prev === key ? null : key);
  };

  return (
    <section className="py-20 bg-base-100">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <HelpCircle className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-4xl font-bold text-base-content mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
            Find answers to common questions about our platform and services.
          </p>
        </div>

        {/* 2-Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {faqData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-4">
              <h3 className="text-2xl font-bold text-base-content mb-6">
                {category.category}
              </h3>
              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => (
                  <AccordionItem
                    key={questionIndex}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openItem === `${categoryIndex}-${questionIndex}`}
                    onToggle={() => toggleAccordion(categoryIndex, questionIndex)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Help */}
        <div className="text-center mt-12">
          <p className="text-base-content/70 mb-4">
            Can't find what you're looking for?
          </p>
          <button className="btn btn-primary">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
}