import React, { useState } from 'react';
import { 
  User, 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  CreditCard, 
  Download, 
  HelpCircle, 
  LogOut, 
  ChevronRight, 
  ExternalLink,
  Award,
  Wallet,
  ArrowUpRight,
  Sparkles,
  TrendingUp,
  Clock,
  Landmark,
  Check,
  ChevronRight as ChevronRightIcon,
  Copy
} from 'lucide-react';
import { mockPartnerProfile } from '../data/mockData';

interface ProfileScreenProps {
  onLogout: () => void;
  onOpenTutorials: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onLogout,
  onOpenTutorials
}) => {
  const profile = mockPartnerProfile;
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);

  return (
    <div className="pb-24 pt-2 px-4 space-y-4 max-w-md mx-auto animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="pt-2">
        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 block">
          Franchise Account
        </span>
        <h2 className="text-xl font-black text-slate-900 tracking-tight mt-0.5">
          Partner Profile
        </h2>
      </div>

      {/* Profile Card (Reference Style with Green AP circle) */}
      <div className="card-luxury p-4 rounded-3xl space-y-3 relative overflow-hidden">
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-full bg-emerald-600 text-white font-extrabold text-base flex items-center justify-center shadow-md shadow-emerald-500/20 shrink-0">
            AP
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-black text-slate-900">{profile.name}</h3>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-200">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>KYC Approved</span>
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-500">
              {profile.shopName}
            </p>
            <p className="text-[11px] font-mono text-slate-400">
              ID: P-{profile.id} • Branch: {profile.branchCode}
            </p>
          </div>
        </div>

        {/* Contact info grid */}
        <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2 text-slate-600">
            <Phone className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold">{profile.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600 truncate">
            <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-semibold truncate">{profile.email}</span>
          </div>
        </div>
      </div>

      {/* Wallet & Commission Payout Card (Exact Match with Reference Image 1) */}
      <div className="relative rounded-[28px] p-5 bg-gradient-to-br from-indigo-700 via-indigo-900 to-blue-900 text-white shadow-2xl shadow-indigo-900/40 overflow-hidden border border-indigo-400/30">
        {/* Soft background ambient glow */}
        <div className="absolute top-0 right-0 w-44 h-44 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          {/* Header Row: Wallet Icon + Franchise ID + Copy */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-inner">
                <CreditCard className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-indigo-200 block leading-none">
                  Franchise ID
                </span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-sm font-black text-white tracking-wide">
                    AFC104
                  </span>
                  <button 
                    type="button"
                    onClick={() => alert("Copied Franchise ID: AFC104")}
                    className="text-indigo-200 hover:text-white transition-colors cursor-pointer"
                    title="Copy Franchise ID"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 2-Column Glass Cards: Left (Profit Retained) | Right (Pending to Finsocap) */}
          <div className="grid grid-cols-2 gap-3">
            {/* Left Card: YOUR PROFIT RETAINED */}
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-2 flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-200 leading-tight">
                  YOUR PROFIT<br />RETAINED
                </span>
                <TrendingUp className="w-4 h-4 text-sky-300 shrink-0" />
              </div>

              <div>
                <div className="text-lg font-black text-white tracking-tight">
                  ₹74,200<span className="text-xs text-indigo-200 font-semibold">.00</span>
                </div>
              </div>

              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[9px] font-bold">
                <div className="w-3 h-3 rounded-full bg-emerald-400 text-slate-900 flex items-center justify-center shrink-0">
                  <Check className="w-2 h-2 stroke-[3]" />
                </div>
                <span className="truncate">Collected Offline</span>
              </div>
            </div>

            {/* Right Card: PENDING TO FINSOCAP */}
            <div className="p-3.5 rounded-2xl bg-black/25 backdrop-blur-md border border-amber-500/30 space-y-2 flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-200/90 leading-tight">
                  PENDING TO<br />FINSOCAP
                </span>
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              </div>

              <div>
                <div className="text-lg font-black text-amber-400 tracking-tight">
                  ₹18,500<span className="text-xs text-amber-300/80 font-semibold">.00</span>
                </div>
              </div>

              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-200 text-[9px] font-bold">
                <Landmark className="w-2.5 h-2.5 text-amber-300 shrink-0" />
                <span className="truncate">Govt/Service Fee</span>
              </div>
            </div>
          </div>

          {/* Yellow Action Button (Exact Match: Yellow Pill with dark text and circular arrow) */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => alert(`Opening QR & UPI transfer to pay pending ₹${profile.metrics.pendingToFinsocap} to Finsocap.`)}
              className="w-full py-3.5 px-4 rounded-full bg-gradient-to-r from-amber-400 via-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-900 font-extrabold text-xs shadow-lg shadow-amber-500/30 flex items-center justify-between cursor-pointer transition-all active:scale-[0.98]"
            >
              <div className="flex-1 text-center font-black">
                Pay Pending Amount to Finsocap (₹{profile.metrics.pendingToFinsocap})
              </div>
              <div className="w-7 h-7 rounded-full bg-slate-900/15 flex items-center justify-center shrink-0">
                <ChevronRightIcon className="w-4 h-4 text-slate-900 stroke-[2.5]" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Account Settings & Quick Navigation Options */}
      <div className="card-luxury rounded-3xl divide-y divide-slate-100 overflow-hidden">
        
        <button
          type="button"
          onClick={onOpenTutorials}
          className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 text-left transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Partner Learning Portal</h4>
              <p className="text-[10px] text-slate-400">Video tutorials &amp; standard operating guides</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          type="button"
          onClick={() => alert("Bank Account verified: HDFC Bank Ltd • A/C No: XXXX9102 • IFSC: HDFC0001234")}
          className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 text-left transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Payout Bank Account</h4>
              <p className="text-[10px] text-slate-400">HDFC Bank Ltd •••••9102 (Active)</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          type="button"
          onClick={() => alert(`Connecting with Relationship Manager: ${profile.relationshipManager.name} (${profile.relationshipManager.phone})`)}
          className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 text-left transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Dedicated RM Support</h4>
              <p className="text-[10px] text-slate-400">{profile.relationshipManager.name} ({profile.relationshipManager.designation})</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          type="button"
          onClick={onLogout}
          className="w-full p-3.5 flex items-center justify-between hover:bg-rose-50 text-left transition-colors cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <LogOut className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-rose-600">Sign Out of Franchise Account</h4>
              <p className="text-[10px] text-slate-400">Secure session disconnect</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-rose-400" />
        </button>

      </div>

      {/* App Version Info */}
      <div className="text-center pt-2">
        <span className="text-[10px] font-bold text-slate-400">
          Finsocap Partner Mobile v2.4 (Enterprise Production Build)
        </span>
      </div>

      {/* Payout Modal */}
      {isPayoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full space-y-4 shadow-2xl animate-in zoom-in-95 duration-150 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900">Request Commission Withdrawal</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Available balance: <strong>₹{profile.metrics.availableCommission.toLocaleString('en-IN')}</strong>
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Beneficiary Account</span>
              <div className="font-bold text-slate-800">Shubham Digital &amp; Legal Solutions</div>
              <div className="text-slate-500 font-mono text-[11px]">HDFC Bank Ltd • A/C No: XXXX9102</div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsPayoutModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  alert("Withdrawal request of ₹32,400 submitted to Finance team. UTR will be generated within 2 hours.");
                  setIsPayoutModalOpen(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-md shadow-emerald-600/20"
              >
                Confirm Payout
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

