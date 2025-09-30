"use client"
import React, { useState, useRef } from 'react';

export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  
  return (
    <div className="px-4 py-4 md:py-4 ">
      <h1 className="w-full md:w-3/4 lg:w-1/2 mx-auto text-3xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl text-center font-bold leading-tight md:leading-snug py-4 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
        Power Your Brand with Smarter Social Media Management
      </h1>
      <p className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto text-center text-md sm:text-base md:text-lg text-slate-600 leading-relaxed py-4">
        Manage, schedule, and publish your content across Instagram, Facebook, LinkedIn, X, and YouTube — all from one powerful platform.
      </p>
      <div className="w-full flex justify-center gap-4 py-4 flex-col flex-col-reverse lg:flex-row md:flex-row items-center ">
        <a href="#" className="text-base sm:text-sm md:text-base font-semibold px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-full bg-customgreen text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border border-slate-200">
          Watch a 2-min Demo
        </a>
        <a href="#" className="text-base sm:text-sm md:text-base font-semibold px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-full bg-white text-customgreen shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border border-slate-200">
          See Plans & Features
        </a>
      </div>
      
      {/* Beautiful centered video section */}
      <div className="w-full sm:w-11/12 md:w-4/5 lg:w-3/4 max-w-6xl mx-auto px-2 sm:px-4 py-4 sm:py-6 md:py-8">
        <div className="relative mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
            {/* Video container with aspect ratio */}
            <div className="relative w-full aspect-video bg-gradient-to-br from-slate-100 to-slate-200">
              <video 
                ref={videoRef}
                className="w-full h-full object-fit rounded-2xl cursor-pointer"
                poster="/hero-thumbnail.jpg"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                onClick={() => {
                  if (videoRef.current) {
                    if (videoRef.current.paused) {
                      videoRef.current.play();
                    } else {
                      videoRef.current.pause();
                    }
                  }
                }}
              >
                <source src="/hero.mp4" type="video/mp4" />
                <track
                  src="/hero.vtt"
                  kind="subtitles"
                  srcLang="en"
                  label="English"
                />
                <p className="text-center text-slate-600 p-8">Your browser does not support the video tag.</p>
              </video>
              
              {/* Play button overlay - only show when paused */}
              {!isPlaying && (
                <div 
                  className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-all duration-300 cursor-pointer"
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.play();
                    }
                  }}
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-xl">
                    <svg className="w-8 h-8 md:w-10 md:h-10 text-customgreen ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}