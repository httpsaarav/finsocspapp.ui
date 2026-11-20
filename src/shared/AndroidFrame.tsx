import React from 'react';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';

interface AndroidFrameProps {
  children: React.ReactNode;
}

export const AndroidFrame: React.FC<AndroidFrameProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-slate-900 flex flex-col items-center justify-center p-0 md:p-6 font-sans antialiased text-slate-800">
      {/* Device Header for Desktop View */}
      <aside aria-label="Device Info" className="hidden md:flex items-center justify-between w-full max-w-[420px] mb-3 px-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-semibold tracking-wide text-slate-200">Android Flagship</span>
        </div>
        <span className="text-[10px] bg-slate-800 px-2.5 py-0.5 rounded-full text-slate-400 border border-slate-700">Finsocap Partner OS</span>
      </aside>

      {/* Modern Sleek Android Device Frame */}
      <div className="relative w-full md:w-[395px] h-[100dvh] md:h-[840px] bg-slate-950 md:rounded-[44px] p-0 md:p-[8px] shadow-[0_25px_70px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.08)] flex flex-col overflow-hidden">
        
        {/* Subtle Side Power & Volume Button Accents for Android (Desktop Only) */}
        <div className="hidden md:block absolute -right-[2px] top-28 w-[3px] h-14 bg-slate-700 rounded-l-xs"></div>
        <div className="hidden md:block absolute -right-[2px] top-48 w-[3px] h-20 bg-slate-700 rounded-l-xs"></div>

        {/* Android Punch-Hole Camera (Minimal clean center cutout) */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-black rounded-full z-50 flex items-center justify-center pointer-events-none ring-1 ring-slate-800/40">
          <div className="w-2 h-2 rounded-full bg-slate-900 flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-blue-950"></div>
          </div>
        </div>

        {/* Android Status Bar (Material Style: Clock on Left, Notifications & Signals on Right) */}
        <div className="relative w-full h-10 px-5 flex items-center justify-between text-slate-800 select-none z-40 bg-white pointer-events-none shrink-0 border-b border-slate-50">
          {/* Time with standard Android font weight */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-700 tracking-tight">09:41</span>
          </div>

          {/* Android Status Icons */}
          <div className="flex items-center gap-2 text-slate-700">
            <Signal className="w-3.5 h-3.5 stroke-[2.2]" />
            <Wifi className="w-3.5 h-3.5 stroke-[2.2]" />
            <div className="flex items-center gap-1">
              <span className="text-[11px] font-medium text-slate-600">85%</span>
              <BatteryMedium className="w-4 h-4 stroke-[2.2]" />
            </div>
          </div>
        </div>

        {/* App Screen Content Surface */}
        <div className="relative flex-1 w-full h-[calc(100%-40px-24px)] bg-white overflow-hidden flex flex-col">
          {children}
        </div>

        {/* Android 3-Button or Gesture Navigation Bar at Bottom */}
        <div className="relative w-full h-6 bg-white flex items-center justify-center shrink-0 border-t border-slate-50 select-none">
          {/* Modern Android Gesture Bar */}
          <div className="w-28 h-1 bg-slate-400 rounded-full"></div>
        </div>

      </div>
    </div>
  );
};

