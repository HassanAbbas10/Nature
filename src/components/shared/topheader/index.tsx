"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { useState, useEffect } from "react";

const TopHeader = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      text: "📂 Browse All Categories - Endless Possibilities Await!",
      href: "/categories",
    },
    {
      text: "Curated Collections - Shop Now",
      href: "/collections",
    },
    {
      text: "Summer Sale ",
      href: "/sale",
    },
    {
      text: "Member Exclusive: Extra 10% Off",
      href: "/members",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#E7D930] h-10 border-b">
      <div className="max-w-4xl mx-auto relative h-10">
        <button 
          title="Previous Slide"
          onClick={prevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white hover:text-[#409277] z-10 transition-colors duration-200"
        >
         <ChevronLeft />
        </button>
        
        <button 
          title="Next Slide"
          onClick={nextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white hover:text-[#409277] z-10 transition-colors duration-200"
        >
         <ChevronRight />
        </button>
        <div className="h-10 overflow-hidden">
          <div 
            className="transition-transform duration-500 ease-in-out"
            style={{ transform: `translateY(-${currentSlide * 40}px)` }}
          >
            {slides.map((slide, index) => (
              <div 
                key={index}
                className="h-10 flex items-center justify-center"
              >
                <a 
                  href={slide.href}
                  className="text-sm font-medium text-white hover:text-[#409277] transition-colors duration-200 text-center px-4"
                >
                  {slide.text}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;