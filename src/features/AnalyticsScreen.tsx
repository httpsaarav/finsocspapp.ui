import React, { useState } from 'react';
import { 
  TrendingUp, 
  PieChart, 
  BarChart3, 
  ArrowUpRight, 
  ChevronDown, 
  Sparkles,
  Share2,
  Receipt,
  FileCheck2,
  Wallet,
  ArrowRight,
  ShieldCheck,
  Building2,
  Briefcase,
  ChevronRight,
  Percent,
  Layers
} from 'lucide-react';
import { mockPartnerProfile } from '../data/mockData';

export const AnalyticsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'categories' | 'targets'>('overview');
  const [timeframe, setTimeframe] = useState<'Monthly' | 'Weekly' | 'Yearly'>('Monthly');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('Nov');

  // Comparative dual-bar chart data (Aug -> Dec) matching reference mockup
  const dualBarData = [
    { month: 'Aug', earnedPct: 82, spentPct: 46, earnedVal: '₹42.5k', spentVal: '₹22.0k' },
    { month: 'Sep', earnedPct: 48, spentPct: 32, earnedVal: '₹28.4k', spentVal: '₹16.5k' },
    { month: 'Oct', earnedPct: 38, spentPct: 94, earnedVal: '₹21.0k', spentVal: '₹49.8k' },
    { month: 'Nov', earnedPct: 70, spentPct: 36, earnedVal: '₹48.6k', spentVal: '₹18.5k' },
    { month: 'Dec', earnedPct: 62, spentPct: 28, earnedVal: '₹39.0k', spentVal: '₹14.2k' },
  ];

  // Category breakdown for Donut chart and details list
  const categoryStats = [
    { 
      name: 'FSSAI Food License', 
      amount: '₹34,500', 
      pct: 42, 
      cases: '48 files', 
      strokeColor: '#6366F1', // Indigo
      badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-100',
      icon: Receipt,
      growth: '+18% vs Oct'
    },
    { 
      name: 'GST Registration & Return', 
      amount: '₹21,800', 
      pct: 28, 
      cases: '32 files', 
      strokeColor: '#38BDF8', // Sky
      badgeBg: 'bg-sky-50 text-sky-700 border-sky-100',
      icon: FileCheck2,
      growth: '+24% vs Oct'
    },
    { 
      name: 'MCA & Pvt Ltd Incorp', 
      amount: '₹12,400', 
      pct: 18, 
      cases: '14 files', 
      strokeColor: '#A855F7', // Purple
      badgeBg: 'bg-purple-50 text-purple-700 border-purple-100',
      icon: Building2,
      growth: '+8% vs Oct'
    },
    { 
      name: 'Class 3 DSC Tokens', 
      amount: '₹5,500', 
      pct: 12, 
      cases: '17 files', 
      strokeColor: '#10B981', // Emerald
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-100',
      icon: Briefcase,
      growth: '+12% vs Oct'
    },
  ];

  // SVG Donut calculation
  const circumference = 2 * Math.PI * 40; // r = 40 => ~251.32
  let accumulatedPercent = 0;

  return (
    <div className="pb-28 pt-2 px-3.5 space-y-4 max-w-md mx-auto animate-in fade-in duration-300">

      {/* Top Segmented Controls: Overview | Categories | Targets */}
      <div className="bg-slate-100/90 p-1 rounded-2xl flex items-center justify-between text-xs font-bold shadow-inner">
        {(['overview', 'categories', 'targets'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-1.5 rounded-xl capitalize transition-all cursor-pointer text-center ${
              activeTab === tab
                ? 'bg-white text-slate-900 shadow-sm font-black'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* HERO VIVID GRADIENT CARD (Inspired by Reference Image 2) */}
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white p-5 shadow-xl shadow-indigo-500/20">
        {/* Subtle decorative background glow */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-purple-500/20 rounded-full blur-xl pointer-events-none" />

        {/* Top Header Row in Card */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-white/20 border border-white/30 backdrop-blur-md flex items-center justify-center text-sm font-black shadow-inner overflow-hidden">
              <span className="text-amber-200">👦🏻</span>
            </div>
            <div>
              <h3 className="text-base font-black tracking-tight text-white leading-tight">Statistics</h3>
              <p className="text-[10px] text-indigo-200 font-medium">AFC104 • Pata Branch</p>
            </div>
          </div>

          <button 
            type="button"
            aria-label="Share Statistics"
            className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 transition-all backdrop-blur-md border border-white/20 flex items-center justify-center text-white cursor-pointer shadow-sm"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Dropdown Selector */}
        <div className="relative z-20 mt-4">
          <div className="relative inline-block">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/15 hover:bg-white/20 backdrop-blur-md text-xs font-bold text-white border border-white/20 transition-all cursor-pointer shadow-sm"
            >
              <span>{timeframe}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute left-0 top-full mt-1.5 bg-slate-900/95 backdrop-blur-lg border border-white/15 rounded-xl shadow-2xl py-1 z-30 min-w-[110px] text-xs">
                {(['Weekly', 'Monthly', 'Yearly'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      setTimeframe(t);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-white hover:bg-white/15 font-semibold transition-colors"
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Dual Bar Comparison Graph */}
        <div className="relative z-10 mt-3 pt-3">
          {/* Dashed Horizontal Grid Lines */}
          <div className="h-40 w-full relative flex flex-col justify-between pointer-events-none pb-7">
            <div className="w-full border-b border-white/15" />
            <div className="w-full border-b border-white/15" />
            <div className="w-full border-b border-white/15" />
            <div className="w-full border-b border-white/20" />
          </div>

          {/* Actual Bars */}
          <div className="absolute inset-0 flex items-end justify-between px-2 pt-2 pb-1">
            {dualBarData.map((item) => {
              const isActive = selectedMonth === item.month;
              return (
                <div 
                  key={item.month} 
                  onClick={() => setSelectedMonth(item.month)}
                  className="flex-1 flex flex-col items-center justify-end h-full cursor-pointer group"
                >
                  {/* The dual bars container */}
                  <div className="flex items-end justify-center gap-1.5 w-full h-32 pb-2">
                    {/* Primary Bar: Earned Commission (Indigo / Deep Blue) */}
                    <div 
                      className={`w-3 rounded-full transition-all duration-300 ${
                        isActive 
                          ? 'bg-blue-300 shadow-md shadow-blue-300/40 ring-1 ring-white/50' 
                          : 'bg-indigo-300/80 group-hover:bg-indigo-200'
                      }`}
                      style={{ height: `${item.earnedPct}%` }}
                      title={`Earned: ${item.earnedVal}`}
                    />
                    {/* Secondary Bar: Spend / Settled to Finsocap (White / Soft Light) */}
                    <div 
                      className={`w-3 rounded-full transition-all duration-300 ${
                        isActive 
                          ? 'bg-white shadow-md shadow-white/50' 
                          : 'bg-white/70 group-hover:bg-white/90'
                      }`}
                      style={{ height: `${item.spentPct}%` }}
                      title={`Settled: ${item.spentVal}`}
                    />
                  </div>

                  {/* Month Label or Active Pill */}
                  <div className="h-6 flex items-center justify-center">
                    {isActive ? (
                      <span className="px-2 py-0.5 rounded-full bg-white text-indigo-900 font-extrabold text-[10px] shadow-sm">
                        {item.month}
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-indigo-200 group-hover:text-white transition-colors">
                        {item.month}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend Pills at the bottom of hero card */}
        <div className="relative z-10 mt-3 pt-2.5 border-t border-white/15 flex items-center justify-center gap-5 text-[11px] font-bold">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-300 shadow-sm" />
            <span className="text-indigo-100">Partner Margin Earned</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white shadow-sm" />
            <span className="text-white">Finsocap Cost Settled</span>
          </div>
        </div>
      </div>

      {/* QUICK SUMMARY METRIC CARDS (Income / Bills / Settlement) */}
      <div className="space-y-2.5">
        <div className="card-luxury p-3.5 rounded-2xl flex items-center justify-between hover:bg-slate-50/70 transition-all cursor-pointer border border-slate-100 shadow-sm group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shadow-sm shrink-0">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-black text-slate-900">Partner Net Income</div>
              <p className="text-[11px] text-slate-500 font-medium">
                <span className="text-emerald-600 font-bold">₹7,500</span> more than October
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-slate-900">₹74,200</span>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-colors" />
          </div>
        </div>

        <div className="card-luxury p-3.5 rounded-2xl flex items-center justify-between hover:bg-slate-50/70 transition-all cursor-pointer border border-slate-100 shadow-sm group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100 shadow-sm shrink-0">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-black text-slate-900">Finsocap Cost Settlements</div>
              <p className="text-[11px] text-slate-500 font-medium">
                14 settled requests this month
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-slate-900">₹18,500</span>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-colors" />
          </div>
        </div>
      </div>

      {/* DONUT & SERVICE BREAKDOWN SECTION (Inspired by Reference Image 3) */}
      <div className="card-luxury p-4.5 rounded-[26px] bg-white border border-slate-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <PieChart className="w-3.5 h-3.5 text-indigo-600" />
              <span>Service Breakdown</span>
            </h4>
            <p className="text-[10px] text-slate-400 font-medium">Revenue contribution by category</p>
          </div>
          <span className="text-[11px] font-extrabold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
            111 Files
          </span>
        </div>

        {/* Interactive SVG Circular Donut Chart */}
        <div className="flex flex-col items-center justify-center py-2">
          <div className="relative w-44 h-44 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
              {/* Background circle track */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#F1F5F9"
                strokeWidth="10"
              />
              {/* Segmented colored arcs */}
              {categoryStats.map((cat, index) => {
                const strokeDasharray = `${(cat.pct / 100) * circumference} ${circumference}`;
                const strokeDashoffset = -((accumulatedPercent / 100) * circumference);
                accumulatedPercent += cat.pct;

                return (
                  <circle
                    key={index}
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke={cat.strokeColor}
                    strokeWidth="10"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-700 hover:opacity-80 cursor-pointer"
                  />
                );
              })}
            </svg>

            {/* Inner Center Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total</span>
              <span className="text-lg font-black text-slate-900 tracking-tight">₹74,200</span>
              <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full mt-0.5">
                +24.8% MoM
              </span>
            </div>
          </div>
        </div>

        {/* Insight Banner / Highlight Card */}
        <div className="p-3 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100/80 rounded-2xl flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="text-[11px] text-slate-700 leading-snug">
            <strong className="font-bold text-slate-900">FSSAI Registrations</strong> are <strong>24% higher</strong> than last month, contributing ₹34,500 to branch income.
          </div>
        </div>

        {/* Category List with Linear Progress Bars */}
        <div className="space-y-3 pt-1">
          {categoryStats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="p-3 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-2.5 h-2.5 rounded-full shadow-sm"
                      style={{ backgroundColor: item.strokeColor }}
                    />
                    <span className="text-xs font-bold text-slate-800">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black text-slate-900">{item.amount}</span>
                    <span className="text-[10px] font-bold text-slate-400">({item.pct}%)</span>
                  </div>
                </div>

                {/* Progress track */}
                <div className="w-full h-1.5 bg-slate-200/80 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${item.pct}%`, 
                      backgroundColor: item.strokeColor 
                    }}
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span>{item.cases} completed</span>
                  <span className="font-bold text-emerald-600">{item.growth}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SLA & QUALITY BADGE */}
      <div className="p-3.5 bg-emerald-50/80 border border-emerald-100 rounded-2xl flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div>
          <h5 className="text-xs font-bold text-slate-900">Finsocap Premier Partner Network</h5>
          <p className="text-[10px] text-slate-500 mt-0.5">
            Your branch ranks in the 95th percentile with 99.4% on-time government filings this quarter.
          </p>
        </div>
      </div>

    </div>
  );
};
