import React, { useState } from 'react';
import { 
  FileText, 
  ArrowLeftRight, 
  Building2, 
  ShieldCheck, 
  Award, 
  Trophy, 
  GraduationCap, 
  ChevronRight, 
  Phone, 
  MessageSquare, 
  ChevronDown, 
  Bell, 
  PlusCircle, 
  Clock, 
  ArrowUpRight,
  TrendingUp,
  FileCheck,
  Compass,
  AlertCircle,
  Sparkles,
  Receipt,
  KeyRound,
  ArrowRight,
  Eye,
  Plus,
  Send,
  Wallet
} from 'lucide-react';
import { mockPartnerProfile, mockCatalogServices, mockServiceRequests } from '../data/mockData';
import { CatalogServiceItem } from '../types';
import { formatTaskId } from '../utils/formatTaskId';
import { NotificationCenterModal } from './NotificationCenterModal';

interface HomeScreenProps {
  onNavigateTab: (tab: string) => void;
  onOpenTutorial: (tutorialId?: string) => void;
  onSelectRequest: (requestId: string) => void;
  onSelectService: (service: CatalogServiceItem) => void;
  onOpenNewRequest: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigateTab,
  onOpenTutorial,
  onSelectRequest,
  onSelectService,
  onOpenNewRequest
}) => {
  const profile = mockPartnerProfile;
  const recentRequests = mockServiceRequests.slice(0, 3);
  const featuredServices = mockCatalogServices.slice(0, 4); // 4 featured services
  const [isBranchMenuOpen, setIsBranchMenuOpen] = useState(false);
  const [showBalance, setShowBalance] = useState(true);
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState(false);

  // Find all service requests where settlement payment to Finsocap is pending
  const pendingSettlementRequests = mockServiceRequests.filter(
    r => r.settlementRequest && r.settlementRequest.status === "PAYMENT_REQUESTED"
  );

  return (
    <div className="pb-28 pt-2 px-3.5 space-y-4 max-w-md mx-auto w-full box-border animate-in fade-in duration-300">
      
      {/* 1. Header with Official Finsocap Logo & Notification Bell */}
      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          onClick={() => onNavigateTab("home")}
          className="flex items-center text-left cursor-pointer active:scale-98 transition-all"
        >
          <img 
            src="/Finsocap_logo.png" 
            alt="Finsocap" 
            className="h-8 w-auto object-contain"
          />
        </button>

        <div className="flex items-center gap-2">
          {/* Notification Button with Ping indicator - Opens Notification Center */}
          <button 
            type="button"
            onClick={() => setIsNotificationCenterOpen(true)}
            className="relative p-2.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all cursor-pointer tap-bounce shadow-xs"
            title="Notification Center"
          >
            <Bell className="w-4 h-4 text-slate-700 stroke-[2.2]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          </button>
        </div>
      </div>

      {/* 2. Hero Gradient Account Card (Inspired by the Reference Fintech Image) */}
      <div className="relative rounded-3xl p-5 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 text-white shadow-xl shadow-indigo-700/25 overflow-hidden">
        {/* Background Decorative Rings */}
        <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-white/10 blur-xl pointer-events-none" />
        <div className="absolute right-4 top-4 w-12 h-12 rounded-full bg-white/5 pointer-events-none" />

        <div className="relative z-10 space-y-3.5">
          <div className="flex items-center justify-between text-xs text-indigo-100 font-medium">
            <span className="flex items-center gap-1.5">
              <span>Franchise Commission Account</span>
              <button 
                type="button" 
                onClick={() => setShowBalance(!showBalance)}
                className="hover:text-white cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
              </button>
            </span>
            <span className="font-mono text-[11px] bg-white/15 px-2 py-0.5 rounded-full">
              {profile.branchCode}
            </span>
          </div>

          <div>
            <div className="text-3xl font-black tracking-tight text-white flex items-baseline gap-1">
              {showBalance ? "₹74,200" : "••••••••"}
              {showBalance && <span className="text-sm font-normal text-indigo-200">.00</span>}
            </div>
            
            {/* Settlement summary: Net Commission vs Pending to Finsocap */}
            <div className="flex items-center gap-3 pt-1 text-[11px] text-indigo-100">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Margin: <strong>₹32,400</strong></span>
              </span>
              <span className="text-indigo-300">•</span>
              <span className="flex items-center gap-1 text-amber-200">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>To Finsocap: <strong>₹18,500</strong></span>
              </span>
            </div>
          </div>

          {/* Quick Action Buttons inside Card */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <button
              type="button"
              onClick={onOpenNewRequest}
              className="py-2.5 px-3 rounded-2xl bg-white text-indigo-900 font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md hover:bg-indigo-50 cursor-pointer tap-bounce"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Apply Service</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigateTab("applications")}
              className="py-2.5 px-3 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 backdrop-blur-xs cursor-pointer tap-bounce"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Track Requests</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. The 4-Grid Summary Metric Cards (Reference Image Exact Match) */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        
        {/* Card 1: Registrations */}
        <div className="card-luxury p-3.5 rounded-2xl border border-slate-100/90 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
              {profile.metrics.registrationsGrowth}
            </span>
          </div>
          <div className="mt-3">
            <span className="text-[11px] font-semibold text-slate-500 block">Registrations</span>
            <div className="text-base font-black text-slate-900 tracking-tight mt-0.5">
              +₹{profile.metrics.registrations.toLocaleString('en-IN')}
            </div>
          </div>
        </div>

        {/* Card 2: Income */}
        <div className="card-luxury p-3.5 rounded-2xl border border-slate-100/90 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <ArrowLeftRight className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-sky-600 bg-sky-50 px-1.5 py-0.5 rounded-full">
              {profile.metrics.incomeGrowth}
            </span>
          </div>
          <div className="mt-3">
            <span className="text-[11px] font-semibold text-slate-500 block">Income</span>
            <div className="text-base font-black text-slate-900 tracking-tight mt-0.5">
              +₹{profile.metrics.income.toLocaleString('en-IN')}
            </div>
          </div>
        </div>

        {/* Card 3: Pvt Ltd & MCA */}
        <div className="card-luxury p-3.5 rounded-2xl border border-slate-100/90 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded-full">
              {profile.metrics.pvtLtdMcaGrowth}
            </span>
          </div>
          <div className="mt-3">
            <span className="text-[11px] font-semibold text-slate-500 block">Pvt Ltd &amp; MCA</span>
            <div className="text-base font-black text-slate-900 tracking-tight mt-0.5">
              +₹{profile.metrics.pvtLtdMca.toLocaleString('en-IN')}
            </div>
          </div>
        </div>

        {/* Card 4: DSC Key */}
        <div className="card-luxury p-3.5 rounded-2xl border border-slate-100/90 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
              {profile.metrics.dscKeyGrowth}
            </span>
          </div>
          <div className="mt-3">
            <span className="text-[11px] font-semibold text-slate-500 block">DSC Key</span>
            <div className="text-base font-black text-slate-900 tracking-tight mt-0.5">
              +₹{profile.metrics.dscKey.toLocaleString('en-IN')}
            </div>
          </div>
        </div>

      </div>

      {/* 3.1 Pending Settlement Alert Banner (Lists specific services awaiting payment with 1-click Pay & Redirect) */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50/60 border border-amber-200/90 rounded-2xl p-3 shadow-sm space-y-2.5 w-full box-border">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
            <AlertCircle className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-800">Settlement Due to Finsocap</span>
              <span className="text-[9px] font-extrabold text-amber-900 bg-amber-200 px-1.5 py-0.2 rounded-full">
                {pendingSettlementRequests.length} Pending
              </span>
            </div>
            <p className="text-[11px] text-slate-600 font-medium leading-tight mt-0.5">
              Select service below to pay via QR/UPI and unlock certificate:
            </p>
          </div>
        </div>

        {/* List of Pending Services with direct Pay redirection */}
        <div className="space-y-2 pt-1 border-t border-amber-200/60">
          {pendingSettlementRequests.map((req) => (
            <div 
              key={req.id}
              className="p-2.5 bg-white rounded-xl border border-amber-200/80 shadow-2xs flex items-center justify-between gap-2 w-full box-border"
            >
              <div className="min-w-0 flex-1 overflow-hidden pr-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[9px] font-black text-slate-600 bg-slate-100 px-1.5 py-0.2 rounded shrink-0">
                    {formatTaskId(req.id)}
                  </span>
                  <span className="text-xs font-black text-slate-900 truncate block">
                    {req.serviceName}
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 font-medium truncate mt-0.5">
                  Client: {req.customerName} ({req.businessName}) • Due: <strong className="text-blue-700 font-black">₹{req.settlementRequest?.amountDue}</strong>
                </div>
              </div>

              {/* Pay Now Button Redirects Straight to the Service's QR / Proof upload Screen */}
              <button
                type="button"
                onClick={() => onSelectRequest(req.id)}
                className="py-1.5 px-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-[11px] rounded-lg shadow-xs transition-all active:scale-95 cursor-pointer flex items-center gap-1 shrink-0 whitespace-nowrap"
              >
                <span>Pay ₹{req.settlementRequest?.amountDue}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Infographic Mini Chart: Weekly Franchise Revenue Trends */}
      <div className="card-luxury p-4 rounded-3xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-900">Weekly Performance</h4>
              <p className="text-[10px] text-slate-400">Total 64 Cases processed this week</p>
            </div>
          </div>
          <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
            +18.4%
          </span>
        </div>

        {/* Infographic Visualizer Bars */}
        <div className="pt-2">
          <div className="h-20 flex items-end justify-between gap-2 px-1">
            {[
              { day: "M", h: "45%", val: "₹4.2k" },
              { day: "T", h: "60%", val: "₹6.8k" },
              { day: "W", h: "75%", val: "₹8.4k" },
              { day: "T", h: "50%", val: "₹5.1k" },
              { day: "F", h: "90%", val: "₹11.2k" },
              { day: "S", h: "100%", val: "₹14.6k", active: true },
              { day: "S", h: "40%", val: "₹3.8k" }
            ].map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group">
                <div 
                  className={`w-full rounded-t-lg transition-all ${
                    d.active ? "bg-gradient-to-t from-emerald-600 to-teal-400 shadow-xs" : "bg-slate-200 group-hover:bg-slate-300"
                  }`}
                  style={{ height: d.h }}
                />
                <span className={`text-[10px] font-bold ${d.active ? "text-emerald-700" : "text-slate-400"}`}>
                  {d.day}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. TOP 4 FEATURED SERVICES (Redesigned matching uploaded reference image) */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between gap-1">
          <div className="flex items-center gap-1.5 shrink min-w-0">
            <h3 className="font-black text-sm text-slate-900 tracking-tight whitespace-nowrap">
              Featured Services (4)
            </h3>
            <span className="text-[10px] bg-indigo-50 text-indigo-700 font-extrabold px-2 py-0.5 rounded-full border border-indigo-100 whitespace-nowrap shrink-0">
              Fast SLA
            </span>
          </div>
          <button 
            type="button" 
            onClick={() => onNavigateTab("services")}
            className="text-[11px] font-extrabold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 px-2.5 py-1 rounded-full flex items-center gap-0.5 cursor-pointer transition-all shadow-xs shrink-0 whitespace-nowrap"
          >
            <span>View All (60+)</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* 4 Cards Grid - Exact match with reference image layout, borders, pills & arrow circles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {featuredServices.map((srv, index) => {
            // Distinct category accent themes matching screenshot
            const theme = (() => {
              if (index === 0) {
                return {
                  border: "border-sky-300 hover:border-sky-400",
                  bgGlow: "from-sky-50/60 via-white to-white",
                  pillBg: "bg-sky-100 text-sky-800",
                  arrowBg: "bg-sky-100 text-sky-700 hover:bg-sky-200",
                  topBorderGlow: "bg-gradient-to-r from-sky-400 via-sky-300 to-transparent"
                };
              } else if (index === 1) {
                return {
                  border: "border-emerald-300 hover:border-emerald-400",
                  bgGlow: "from-emerald-50/60 via-white to-white",
                  pillBg: "bg-emerald-100 text-emerald-800",
                  arrowBg: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200",
                  topBorderGlow: "bg-gradient-to-r from-emerald-400 via-emerald-300 to-transparent"
                };
              } else if (index === 2) {
                return {
                  border: "border-amber-300 hover:border-amber-400",
                  bgGlow: "from-amber-50/60 via-white to-white",
                  pillBg: "bg-amber-100 text-amber-800",
                  arrowBg: "bg-amber-100 text-amber-700 hover:bg-amber-200",
                  topBorderGlow: "bg-gradient-to-r from-amber-400 via-amber-300 to-transparent"
                };
              } else {
                return {
                  border: "border-purple-300 hover:border-purple-400",
                  bgGlow: "from-purple-50/60 via-white to-white",
                  pillBg: "bg-purple-100 text-purple-800",
                  arrowBg: "bg-purple-100 text-purple-700 hover:bg-purple-200",
                  topBorderGlow: "bg-gradient-to-r from-purple-400 via-purple-300 to-transparent"
                };
              }
            })();

            return (
              <div 
                key={srv.id}
                onClick={() => onSelectService(srv)}
                className={`relative overflow-hidden bg-gradient-to-b ${theme.bgGlow} p-4 rounded-[22px] border ${theme.border} shadow-sm hover:shadow-md transition-all cursor-pointer tap-bounce flex flex-col justify-between min-h-[148px]`}
              >
                {/* Top Soft Gradient Border Accent */}
                <div className={`absolute top-0 left-0 right-0 h-1 ${theme.topBorderGlow}`} />

                {/* Top: Category Pill & Top-Right Arrow Button */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md ${theme.pillBg}`}>
                      {srv.category}
                    </span>
                    
                    {/* Circular Arrow Button moved to Top Right */}
                    <div className={`w-7 h-7 rounded-full ${theme.arrowBg} flex items-center justify-center shrink-0 transition-transform group-hover:translate-x-0.5 shadow-xs`}>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <h4 className="text-[14px] font-black text-slate-900 leading-snug tracking-tight line-clamp-2 pr-1">
                    {srv.name}
                  </h4>
                </div>

                {/* Bottom Stats: Client Fee | Your Profit */}
                <div className="flex items-center justify-between pt-3 mt-1 border-t border-slate-100/90">
                  <div className="flex items-center gap-3">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block leading-none mb-0.5">
                        Client Fee
                      </span>
                      <span className="text-base font-black text-slate-900 tracking-tight leading-tight">
                        ₹{srv.startingPrice}
                      </span>
                    </div>

                    {/* Subtle divider */}
                    <div className="h-6 w-[1px] bg-slate-200" />

                    <div>
                      <span className="text-[10px] text-emerald-600 font-bold block leading-none mb-0.5">
                        Your Profit
                      </span>
                      <span className="text-base font-black text-emerald-600 tracking-tight leading-tight">
                        +₹{srv.partnerProfit}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. Achievements & Learning Header (Reference Image Exact Match) */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-slate-900 tracking-tight">
            Achievements &amp; Learning
          </h3>
          <button 
            type="button" 
            onClick={() => onOpenTutorial()}
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-0.5 cursor-pointer"
          >
            <span>See All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 2 Badges: 100% Clean Compliance Rate & Century Club */}
        <div className="grid grid-cols-2 gap-3">
          <div className="card-luxury p-3 rounded-2xl flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <div className="text-xs font-black text-slate-900">100% Clean</div>
              <div className="text-[10px] text-slate-400 font-medium">Compliance Rate</div>
            </div>
          </div>

          <div className="card-luxury p-3 rounded-2xl flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Trophy className="w-5 h-5 text-indigo-500" />
            </div>
            <div>
              <div className="text-xs font-black text-slate-900">Century Club</div>
              <div className="text-[10px] text-slate-400 font-medium">113+ Files</div>
            </div>
          </div>
        </div>

        {/* Learning & Training Portal Interactive Banner (Reference Exact Match) */}
        <div 
          onClick={() => onOpenTutorial("tut-1")}
          className="p-3.5 rounded-2xl bg-indigo-50/80 border border-indigo-100 flex items-center justify-between cursor-pointer tap-bounce hover:bg-indigo-100/60 transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-indigo-500/25">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-900">Learning &amp; Training Portal</h4>
              <p className="text-[10px] font-medium text-slate-500 mt-0.5">
                Watch training videos, guides and product updates &rarr;
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-indigo-400 shrink-0" />
        </div>
      </div>

      {/* 7. Dedicated Relationship Manager (Reference Image Exact Match) */}
      <div className="space-y-2 pt-1">
        <h3 className="font-extrabold text-sm text-slate-900 tracking-tight">
          Dedicated Relationship Manager
        </h3>

        <div className="card-luxury p-3.5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-black text-xs flex items-center justify-center shadow-xs shrink-0">
              {profile.relationshipManager.avatarInitials}
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-900">{profile.relationshipManager.name}</h4>
              <p className="text-[10px] font-medium text-slate-400">
                {profile.relationshipManager.designation}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a 
              href={`tel:${profile.relationshipManager.phone}`}
              className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 flex items-center justify-center transition-all cursor-pointer tap-bounce"
              title="Call Relationship Manager"
            >
              <Phone className="w-3.5 h-3.5" />
            </a>
            <button 
              type="button"
              onClick={() => alert(`Starting WhatsApp liaison chat with ${profile.relationshipManager.name}`)}
              className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-all cursor-pointer tap-bounce"
              title="Message Relationship Manager"
            >
              <MessageSquare className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Notification Center Modal */}
      <NotificationCenterModal 
        isOpen={isNotificationCenterOpen}
        onClose={() => setIsNotificationCenterOpen(false)}
        onNavigateTab={(tab, reqId) => {
          if (reqId) {
            onSelectRequest(reqId);
          } else {
            onNavigateTab(tab);
          }
        }}
      />

    </div>
  );
};
