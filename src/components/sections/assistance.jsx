"use client";
import React, { useEffect, useRef, useState } from "react";
import { ChartPie, PanelsTopLeft, Users, Calendar, Pencil, BellRing, Settings } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Performance Analytics",
    description: "Track how your posts are doing - reach, engagement, and follower growth in real-time.",
    icon: <ChartPie className="w-full h-full" />,
    gradient: "from-blue-400 via-blue-500 to-blue-600",
    color: "from-blue-50 to-blue-100",
    borderColor: "border-blue-200",
  },
  {
    title: "Reusable Templates",
    description: "Save your best-performing post formats and reuse them anytime with 1 click.",
    icon: <PanelsTopLeft className="w-full h-full" />,
    gradient: "from-purple-400 via-purple-500 to-purple-600",
    color: "from-purple-50 to-purple-100",
    borderColor: "border-purple-200",
  },
  {
    title: "Multi-Platform Publishing",
    description: "Create once, publish everywhere — from Instagram to LinkedIn, all from one place.",
    icon: <Settings className="w-full h-full" />,
    gradient: "from-green-400 via-green-500 to-emerald-600",
    color: "from-green-50 to-green-100",
    borderColor: "border-green-200",
  },
  {
    title: "Team Collaboration",
    description: "Invite your team or clients to manage, comment, and approve content together.",
    icon: <Users className="w-full h-full" />,
    gradient: "from-orange-400 via-orange-500 to-amber-600",
    color: "from-orange-50 to-orange-100",
    borderColor: "border-orange-200",
  },
  {
    title: "Automation & Scheduling",
    description: "Automate your entire content calendar. Set it and forget it — your posts go live exactly when you want.",
    icon: <Calendar className="w-full h-full" />,
    gradient: "from-pink-400 via-pink-500 to-rose-600",
    color: "from-pink-50 to-pink-100",
    borderColor: "border-pink-200",
  },
  {
    title: "Post Editor & Preview",
    description: "See exactly how your post will appear before hitting publish.",
    icon: <Pencil className="w-full h-full" />,
    gradient: "from-indigo-400 via-indigo-500 to-purple-600",
    color: "from-indigo-50 to-indigo-100",
    borderColor: "border-indigo-200",
  },
  {
    title: "Smart Notifications",
    description: "Get notified when posts need review, approvals are due, or content is performing well.",
    icon: <BellRing className="w-full h-full" />,
    gradient: "from-cyan-400 via-cyan-500 to-blue-600",
    color: "from-cyan-50 to-cyan-100",
    borderColor: "border-cyan-200",
  },
];

const HorizontalScrollSection = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    if (!sectionRef.current || !containerRef.current) return;

    const section = sectionRef.current;
    const container = containerRef.current;
    const cards = cardsRef.current.filter(Boolean);
    
    // Calculate dimensions
    const cardWidth = window.innerWidth < 640 ? window.innerWidth * 0.85 : 
                     window.innerWidth < 768 ? window.innerWidth * 0.55 : 
                     window.innerWidth < 1024 ? window.innerWidth * 0.42 : 500;
    
    const gap = window.innerWidth < 640 ? 16 : 
                window.innerWidth < 768 ? 24 : 32;
    
    const totalWidth = cards.length * cardWidth + (cards.length - 1) * gap;
    const viewportWidth = window.innerWidth;
    const scrollWidth = Math.max(0, totalWidth - viewportWidth + 128); // 128px padding to ensure last card is fully visible

    // Set section height dynamically
    const sectionHeight = window.innerHeight + scrollWidth;
    section.style.height = `${sectionHeight}px`;

    // Create timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        pin: container.parentElement,
        pinSpacing: true,
        anticipatePin: 1,
      }
    });

    // Horizontal scroll animation
    tl.to(container, {
      x: -scrollWidth,
      ease: "none"
    });

    // Card animations
    cards.forEach((card, index) => {
      const startPos = index * (cardWidth + gap);
      const endPos = startPos + cardWidth;
      
      // Entrance animation
      gsap.fromTo(card, {
        opacity: 0,
        y: 30,
        scale: 0.95
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        delay: index * 0.1,
        scrollTrigger: {
          trigger: card,
          start: "left 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Hover effects
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.02,
          y: -8,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });

    // Progress bar animation
    const progressBar = section.querySelector('.progress-bar');
    if (progressBar) {
      gsap.to(progressBar, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1
        }
      });
    }

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isLoaded]);

  return (
    <section ref={sectionRef} className="relative">
      <div className="sticky top-[0px] sm:top-[0px] md:top-[0px] overflow-hidden bg-white h-[calc(100vh-120px)] sm:h-[calc(100vh-140px)] md:h-[calc(100vh-160px)] flex flex-col">
        {/* Header - Compact layout to fit with cards */}
        <div className="text-center px-4 pt-6 sm:pt-8 pb-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
              What You'll Unlock
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Transform your social media game with these powerful features designed for modern creators and businesses
            </p>
          </motion.div>
          
          {/* Progress Bar - More compact */}
          <div className="mt-3 sm:mt-4 max-w-xs mx-auto">
            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
              <div className="progress-bar h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full origin-left scale-x-0" />
            </div>
          </div>
        </div>

        {/* Cards Container - Takes remaining space */}
        <div className="flex-1 flex items-center">
          <div ref={containerRef} className="flex px-4 sm:px-6 md:px-8 lg:px-16 gap-4 sm:gap-6 md:gap-8 w-full">
            {features.map((feature, index) => (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className="feature-card flex-shrink-0 w-[85vw] sm:w-[55vw] md:w-[42vw] lg:w-[500px]">
                <div className={`
                  h-[400px] sm:h-[450px] md:h-[500px] relative overflow-hidden rounded-3xl shadow-xl
                  bg-white border border-gray-100
                  flex flex-col p-4 sm:p-5 md:p-6
                  transition-all duration-500
                `}>
                  {/* Gradient Background Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-5`} />
                  
                  {/* Image Section */}
                  <div className="relative w-full h-48 sm:h-40 md:h-48 mb-3 overflow-hidden rounded-2xl">
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient}`} />
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white/80">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 opacity-20">
                          {feature.icon}
                        </div>
                      </div>
                    </div>
                    
                    {/* Floating Icon */}
                    <div 
                      className="absolute top-3 right-3 w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/30"
                    >
                      <div className="w-4 h-4 sm:w-5 sm:h-5 text-white">
                        {feature.icon}
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 leading-tight mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  {/* Subtle Border Glow */}
                  <div className={`absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white/20 transition-all duration-500`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HorizontalScrollSection;
