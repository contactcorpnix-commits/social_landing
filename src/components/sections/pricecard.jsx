import React from 'react';
import { Check, Star } from 'lucide-react';
import Icon from "@/components/ui/icon";

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    description: "Perfect for getting started",
    features: [
      "Up to 1,000 subscribers",
      "Basic analytics",
      "Email support",
      "3 landing pages",
      "Standard templates"
    ],
    cta: "Get Started",
    popular: false,
    color: "border-gray-200"
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "Best for growing businesses",
    features: [
      "Up to 10,000 subscribers",
      "Advanced analytics",
      "Priority support",
      "Unlimited landing pages",
      "Premium templates",
      "A/B testing",
      "Custom domains",
      "Team collaboration"
    ],
    cta: "Start Free Trial",
    popular: true,
    color: "border-[#14b8a6]"
  },
  {
    name: "Business",
    price: "$99",
    period: "/month",
    description: "For established companies",
    features: [
      "Unlimited subscribers",
      "Enterprise analytics",
      "24/7 phone support",
      "Unlimited everything",
      "White-label options",
      "Advanced integrations",
      "Dedicated account manager",
      "Custom onboarding"
    ],
    cta: "Contact Sales",
    popular: false,
    color: "border-gray-200"
  }
];

export default function PriceCard() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your needs. Upgrade or downgrade at any time.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${plan.color} ${
                plan.popular ? 'transform scale-105' : ''
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-[#14b8a6] text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    Recommended
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Plan Header */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-gray-600 ml-2">{plan.period}</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Icon name="rightTick" 
                        className={`w-5 h-5 mt-0.5 mr-3 flex-shrink-0 ${
                          plan.popular ? 'text-blue-500' : 'text-green-500'
                        }`} 
                      />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button 
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                    plan.popular 
                      ? 'bg-[#14b8a6] text-white hover:bg-[#2ed1be]' 
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <p className="text-gray-600">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <button className="text-blue-500 hover:text-blue-600 font-semibold mt-2">
            Compare all features →
          </button>
        </div>
      </div>
    </section>
  );
}