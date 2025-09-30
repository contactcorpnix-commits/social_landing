"use client"
import Icon from "@/components/ui/icon";
import Image from "next/image";
import { useState } from "react";

export default function Showcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeIndex2, setActiveIndex2] = useState(0);

  const analytics = [
    { id: 1, src: "/hero-thumbnail.jpg", alt: "Analytics Dashboard", title: "Real-time Analytics", color: "from-blue-500 to-cyan-600" },
    { id: 2, src: "/showcase.png", alt: "Performance Metrics", title: "Performance Tracking", color: "from-purple-500 to-pink-600" },
    { id: 3, src: null, alt: "Video Analytics", title: "Video Insights", color: "from-green-500 to-emerald-600", isVideo: true },
    { id: 4, src: "/logo.svg", alt: "Brand Monitoring", title: "Brand Analytics", color: "from-orange-500 to-red-600" },
    { id: 5, src: "/logo_white.svg", alt: "White Label Reports", title: "Custom Reports", color: "from-indigo-500 to-purple-600" }
  ];
  const getstarted = [
    { id: 1, src: "/hero-thumbnail.jpg", alt: "Analytics Dashboard", title: "Real-time Analytics", color: "from-blue-500 to-cyan-600" },
    { id: 2, src: "/showcase.png", alt: "Performance Metrics", title: "Performance Tracking", color: "from-purple-500 to-pink-600" },
    { id: 3, src: null, alt: "Video Analytics", title: "Video Insights", color: "from-green-500 to-emerald-600", isVideo: true },
    { id: 4, src: "/logo.svg", alt: "Brand Monitoring", title: "Brand Analytics", color: "from-orange-500 to-red-600" },
    { id: 5, src: "/logo_white.svg", alt: "White Label Reports", title: "Custom Reports", color: "from-indigo-500 to-purple-600" }
  ];

  const handleCardClick = (index) => {
    setActiveIndex(index);
  };

  // Reorder cards based on active index - separate functions for each section
  const getOrderedCards = (cardsArray, activeIdx) => {
    const ordered = [...cardsArray];
    const activeCard = ordered.splice(activeIdx, 1)[0];
    return [activeCard, ...ordered];
  };

  return (
    <section className="py-20 overflow-hidden">
      <div className=" mx-auto px-5 md:px-10 lg:px-20">

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Content */}
          <div className="w-full">
            <div className="">
              <h2 className="text-3xl font-bold py-2">Advanced analytics at your fingertips</h2>
          <p className="text-lg py-6">Measure your success with real-time insights across all platforms. See what's working and optimize your content strategy with ease.</p>
          <ul className="flex flex-col gap-4">
            <li className="flex items-center"><Icon name="curvedRight" size={32} className="mr-2" /> Engagement & Reach Reports</li>
            <li className="flex items-center"><Icon name="curvedRight" size={32} className="mr-2" /> Follower Growth by Channel</li>
            <li className="flex items-center"><Icon name="curvedRight" size={32} className="mr-2" /> Top-performing Content</li>
            <li className="flex items-center"><Icon name="curvedRight" size={32} className="mr-2" /> Custom Reports by Date Range</li>
          </ul>
            </div>
          </div>
          {/* Horizontal Stack Container */}
          <div className="relative w-full">
            <div className="relative h-[400px] flex items-center justify-center md:justify-start pl-8">
              {getOrderedCards(analytics, activeIndex).map((card, index) => (
                <div
                  key={card.id}
                  className={`absolute card cursor-pointer transition-all duration-500 ease-out transform hover:scale-105`}
                  style={{
                    zIndex: analytics.length - index,
                    transform: `translateY(${index * 30}px) translateX(${index * 0}px) scale(${0.9 - (index * 0.05)})`,
                    opacity: index === 0 ? 1 : Math.max(0.7, 1 - (index * 0.15)),
                  }}
                  onClick={() => handleCardClick(analytics.findIndex(c => c.id === card.id))}
                >
                  <div className="card-body p-0 bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-row w-[500px] h-[300px]">
                    {/* Image Side */}
                    <div className="w-3/5 h-full relative overflow-hidden">
                      {card.isVideo ? (
                        <div className={`w-full h-full bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                          <div className="text-white text-center">
                            <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                            <p className="text-sm font-semibold">Video Preview</p>
                          </div>
                        </div>
                      ) : (
                        <Image
                          src={card.src}
                          alt={card.alt}
                          fill
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    
                    {/* Content Side */}
                    <div className="w-2/5 p-6 flex flex-col justify-center">
                      <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                      <p className="text-sm text-gray-600">{card.alt}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Stack Indicators */}
            <div className="flex justify-center mt-10 gap-2">
              {analytics.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'w-8 bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  onClick={() => handleCardClick(index)}
                />
              ))}
            </div>
          </div>
        </div>
        
        
        {/* 2nd section */}
        <div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-12 py-10">
          {/* Content */}
          <div className="w-full">
            <div className="">
              <h2 className="text-3xl font-bold py-2">How to get started</h2>
          <p className="text-lg py-6">Measure your success with real-time insights across all platforms. See what&apos;s working and optimize your content strategy with ease.</p>
          <ul className="flex flex-col gap-4">
            <li className="flex items-center"><Icon name="curvedRight" size={32} className="mr-2" /> Connect Your Social Accounts : Easily link your Instagram, Facebook, LinkedIn, X, and YouTube profiles.</li>
            <li className="flex items-center"><Icon name="curvedRight" size={32} className="mr-2" /> Create &amp; Schedule Content : Upload media, write captions, and use our smart calendar to plan your week or month.</li>
            <li className="flex items-center"><Icon name="curvedRight" size={32} className="mr-2" /> Collaborate &amp; Approve : Invite your team to review, edit, or approve posts before they go live.</li>
            <li className="flex items-center"><Icon name="curvedRight" size={32} className="mr-2" /> Analyze &amp; Grow : Track performance and adjust strategy with deep insights and growth tips.</li>
          </ul>
            </div>
          </div>
          {/* Horizontal Stack Container */}
          <div className="relative w-full overflow-hidden">
            <div className="relative h-[400px] flex items-center justify-center md:justify-start pr-8 w-full">
              {getOrderedCards(getstarted, activeIndex2).map((card, index) => (
                <div
                  key={card.id}
                  className={`absolute card cursor-pointer transition-all duration-500 ease-out transform hover:scale-105`}
                  style={{
                    zIndex: getstarted.length - index,
                    transform: `translateY(${index * 30}px) translateX(${index * 30}px) scale(${0.9 - (index * 0.05)})`,
                    opacity: index === 0 ? 1 : Math.max(0.7, 1 - (index * 0.15)),
                  }}
                  onClick={() => setActiveIndex2(getstarted.findIndex(c => c.id === card.id))}
                >
                  <div className="card-body p-0 bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-row w-[500px] h-[300px]">
                    {/* Image Side */}
                    <div className="w-3/5 h-full relative overflow-hidden">
                      {card.isVideo ? (
                        <div className={`w-full h-full bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                          <div className="text-white text-center">
                            <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                            <p className="text-sm font-semibold">Video Preview</p>
                          </div>
                        </div>
                      ) : (
                        <Image
                          src={card.src}
                          alt={card.alt}
                          fill
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    
                    {/* Content Side */}
                    <div className="w-2/5 p-6 flex flex-col justify-center">
                      <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                      <p className="text-sm text-gray-600">{card.alt}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Stack Indicators */}
            <div className="flex justify-center mt-10 gap-2">
              {getstarted.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex2 ? 'w-8 bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  onClick={() => setActiveIndex2(index)}
                />
              ))}
            </div>
          </div>

          
        </div>
      </div>
    </section>
  );
}