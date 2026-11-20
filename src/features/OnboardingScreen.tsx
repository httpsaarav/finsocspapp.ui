import React, { useState } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';

interface OnboardingScreenProps {
  onFinish: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onFinish }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      badge: "Partner Franchise Ecosystem",
      title: "Manage and Scale Your Financial Services",
      subtitle: "Empower your local clients with 50+ corporate, tax, compliance, and legal services directly from your phone.",
      image: "/illustrations/onboarding_1.jpg",
      gradient: "from-blue-600 to-indigo-700",
      accent: "text-blue-600"
    },
    {
      id: 2,
      badge: "Expert CA & Legal Team",
      title: "Government Compliance & Approvals Made Effortless",
      subtitle: "Finsocap's senior legal team and Chartered Accountants draft, audit, and submit your clients' filings with zero friction.",
      image: "/illustrations/onboarding_2.jpg",
      gradient: "from-emerald-600 to-teal-700",
      accent: "text-emerald-600"
    },
    {
      id: 3,
      badge: "Real-Time Tracking & Chat",
      title: "Live Milestone Progress & SLA Assurances",
      subtitle: "Track government reference numbers, chat directly with assigned liaison officers, and receive instant document updates.",
      image: "/illustrations/onboarding_3.jpg",
      gradient: "from-indigo-600 to-violet-700",
      accent: "text-indigo-600"
    },
    {
      id: 4,
      badge: "Instant Wallet Payouts",
      title: "Earn Up to 35% Margins on Every Service",
      subtitle: "Transparent commission structures with instant withdrawal to your verified franchise bank account 24/7.",
      image: "/illustrations/onboarding_4.jpg",
      gradient: "from-amber-600 to-orange-700",
      accent: "text-amber-600"
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      onFinish();
    }
  };

  const slide = slides[currentSlide];

  return (
    <div className="flex-1 flex flex-col justify-between bg-white text-slate-800 px-5 pt-1 pb-7 overflow-y-auto select-none">
      {/* Top Header with Skip at Top Right and Centered Logo Lowered */}
      <div className="relative pt-1 pb-1">
        {/* Skip button in its original top-right position */}
        <div className="flex justify-end">
          <button 
            onClick={onFinish}
            className="text-xs font-semibold text-slate-400 hover:text-blue-600 px-3 py-1.5 rounded-full hover:bg-slate-50 transition-colors"
          >
            Skip
          </button>
        </div>

        {/* Logo centered and placed comfortably lower */}
        <div className="flex justify-center pt-2 pb-1">
          <img 
            src="/Finsocap_logo.png" 
            alt="Finsocap" 
            className="h-10 w-auto object-contain"
          />
        </div>
      </div>

      {/* 3D Illustration Area */}
      <div className="flex-1 flex flex-col items-center justify-center my-1">
        <div className="relative w-full aspect-square max-w-[270px] rounded-3xl overflow-hidden bg-slate-50 p-2 border border-slate-100 shadow-[0_12px_32px_rgba(0,0,0,0.06)] flex items-center justify-center group">
          <img 
            src={slide.image} 
            alt={slide.title}
            className="w-full h-full object-cover rounded-2xl transform transition-transform duration-700 group-hover:scale-105"
            loading="eager"
          />
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-slate-700 shadow-xs border border-white/60">
            {slide.badge}
          </div>
        </div>
      </div>

      {/* Typography & Slide Content */}
      <div className="space-y-2.5 px-1">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold">
          <span>Step {currentSlide + 1} of 4</span>
        </div>
        
        <h2 className="text-xl font-black tracking-tight text-slate-900 leading-snug">
          {slide.title}
        </h2>

        <p className="text-[13px] text-slate-500 font-normal leading-relaxed line-clamp-3">
          {slide.subtitle}
        </p>

        {/* Carousel Dots */}
        <div className="flex items-center gap-2 pt-1">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentSlide 
                  ? 'w-7 bg-blue-600' 
                  : 'w-2 bg-slate-200 hover:bg-slate-300'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Bottom CTA Button */}
      <div className="pt-4">
        <button
          onClick={handleNext}
          className="btn-primary w-full py-3.5 text-sm"
        >
          <span>{currentSlide === slides.length - 1 ? "Get Started" : "Continue"}</span>
          {currentSlide === slides.length - 1 ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ArrowRight className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
};
