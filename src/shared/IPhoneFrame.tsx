import React from 'react';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';

interface IPhoneFrameProps {
  children: React.ReactNode;
}

export const IPhoneFrame: React.FC<IPhoneFrameProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-slate-900 flex flex-col items-center justify-center p-0 md:p-6 font-sans antialiased text-slate-800">
      {/* Device Title Header for Desktop */}
      <aside aria-label="Device Info" className="hidden md:flex items-center justify-between w-full max-w-[420px] mb-3 px-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-semibold tracking-wide text-slate-200">Apple iPhone 16 Pro</span>
        </div>
        <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded-full text-slate-400 border border-slate-700">Finsocap Partner</span>
      </aside>

      {/* Realistic Titanium Apple iPhone Frame */}
      <div className="relative w-full md:w-[400px] h-[100dvh] md:h-[844px] bg-black md:rounded-[54px] p-0 md:p-[10px] shadow-[0_25px_70px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.1)] flex flex-col overflow-hidden">
        
        {/* Dynamic Island Pill (inside the phone screen) */}
        <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-[114px] h-[30px] bg-black rounded-full z-50 flex items-center justify-between px-3 shadow-md pointer-events-none">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-900/50"></div>
          </div>
          <div className="w-2.5 h-2.5 rounded-full bg-slate-950 border border-slate-800"></div>
        </div>

        {/* iPhone Status Bar (Time, Signals, Battery) */}
        <div className="relative w-full h-11 pt-2 px-7 flex items-center justify-between text-slate-900 select-none z-40 bg-white pointer-events-none shrink-0">
          <span className="text-[13px] font-semibold tracking-tight text-slate-800">9:41</span>
          <div className="flex items-center gap-1.5 text-slate-800">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <div className="flex items-center gap-0.5">
              <span className="text-[10px] font-bold">85%</span>
              <BatteryMedium className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Inner Screen Container - Seamless single white surface without nested rounded corners */}
        <div className="relative flex-1 w-full h-[calc(100%-44px)] bg-white overflow-hidden flex flex-col">
          {children}
        </div>

        {/* iOS Home Indicator Bar */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-800/80 rounded-full z-50 pointer-events-none"></div>
      </div>
    </div>
  );
};
