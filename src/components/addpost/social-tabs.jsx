"use client"
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';

// Import platform components
import Facebook from './facebook/facebook';
import Instagram from './instagram/instagram';
import Twitter from './twitter/twitter';
import LinkedIn from './linkedin/linkedin';
import YouTube from './youtube/youtube';

const platforms = [
  { id: 'facebook', name: 'Facebook', icon: FaFacebook, color: '#3B5998' },
  { id: 'instagram', name: 'Instagram', icon: FaInstagram, color: '#E4405F' },
  { id: 'twitter', name: 'Twitter', icon: FaTwitter, color: '#1DA1F2' },
  { id: 'linkedin', name: 'LinkedIn', icon: FaLinkedin, color: '#0077B5' },
  { id: 'youtube', name: 'YouTube', icon: FaYoutube, color: '#FF0000' },
];

// Sample accounts data


export default function SocialTabs() {
  const [activeTab, setActiveTab] = useState('facebook');
  const [isTransitioning, setIsTransitioning] = useState(false);
   
   // Map active tab to corresponding component
   const renderPlatformComponent = () => {
     switch (activeTab) {
       case 'facebook':
         return <Facebook />;
       case 'instagram':
         return <Instagram />;
       case 'twitter':
         return <Twitter />;
       case 'linkedin':
         return <LinkedIn />;
       case 'youtube':
         return <YouTube />;
       default:
         return <Facebook />;
     }
   };
   
   // Handle tab click with smooth transition
   const handleTabClick = (platformId) => {
     if (platformId === activeTab) return; // Don't transition if clicking the same tab
     
     setIsTransitioning(true);
     
     // Add a small delay for smooth transition effect
     setTimeout(() => {
       setActiveTab(platformId);
       setIsTransitioning(false);
     }, 150);
   };
  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="px-4 mb-8">
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 30,
            },
          }}
          className="w-full"
        >
          {platforms.map((platform) => {
            const IconComponent = platform.icon;
            return (
              <SwiperSlide key={platform.id}>
                <button
                  onClick={() => handleTabClick(platform.id)}
                  className={`w-full bg-white rounded-lg p-6 shadow-sm border transition-all duration-200 hover:shadow-md ${
                    activeTab === platform.id 
                      ? 'border-blue-500 ring-2 ring-blue-200 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center items-center flex flex-col">
                    <h3 className="text-lg font-semibold mb-2">
                      <IconComponent className={`text-2xl`} style={{ color: platform.color }} />
                    </h3>
                    <p className={`font-medium ${
                      activeTab === platform.id ? 'text-blue-600' : 'text-gray-600'
                    }`}>
                      {platform.name}
                    </p>
                  </div>
                </button>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      
      {/* Dynamic Platform Component */}
      <div className="px-4">
        <div className={`transition-all duration-300 ease-in-out ${
          isTransitioning ? 'opacity-50 transform scale-95' : 'opacity-100 transform scale-100'
        }`}>
          {isTransitioning ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Loading...</span>
            </div>
          ) : (
            renderPlatformComponent()
          )}
        </div>
      </div>
    </div>
  );
}