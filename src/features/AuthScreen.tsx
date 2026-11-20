import React, { useState } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  ArrowRight, 
  Lock, 
  Mail, 
  Sparkles, 
  Phone,
  CheckCircle2,
  ChevronRight,
  UserCheck,
  User,
  MapPin,
  Check
} from 'lucide-react';

interface AuthScreenProps {
  onLoginSuccess: () => void;
  onBackToOnboarding: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ 
  onLoginSuccess,
  onBackToOnboarding
}) => {
  const [authMode, setAuthMode] = useState<"LOGIN" | "SIGNUP">("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState("shubham.k.jha@gmail.com");
  const [loginPassword, setLoginPassword] = useState("••••••••••••");

  // Signup form state
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [shopName, setShopName] = useState("");
  const [city, setCity] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 600);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert(`Franchise partner application for "${shopName || fullName}" submitted! Auto-approving for demo session.`);
      onLoginSuccess();
    }, 900);
  };

  return (
    <div className="flex-1 bg-white flex flex-col justify-center px-4 py-6 max-w-md mx-auto w-full animate-in fade-in duration-300">
      
      <div className="p-2 space-y-4">
        
        {/* Brand Header: Only Official Finsocap Logo */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center">
            <img 
              src={`${import.meta.env.BASE_URL}Finsocap_logo.png`} 
              alt="Finsocap" 
              className="h-9 w-auto object-contain mx-auto" 
            />
          </div>

          <h2 className="text-lg font-black text-slate-900 tracking-tight pt-1">
            {authMode === "LOGIN" ? "Partner Franchise Login" : "Franchise Partner Registration"}
          </h2>
          <p className="text-xs text-slate-500 font-medium px-2">
            {authMode === "LOGIN" 
              ? "Access your client portfolio, rate cards and commission wallet."
              : "Register your branch to offer 60+ corporate and compliance services."}
          </p>
        </div>

        {/* Tab Toggle: Login vs Signup */}
        <div className="flex p-1 bg-slate-100 rounded-2xl">
          <button
            type="button"
            onClick={() => setAuthMode("LOGIN")}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              authMode === "LOGIN" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setAuthMode("SIGNUP")}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              authMode === "SIGNUP" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Create Partner Account
          </button>
        </div>

        {/* LOGIN FORM */}
        {authMode === "LOGIN" && (
          <form onSubmit={handleLogin} className="space-y-3.5 animate-in fade-in">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">
                Partner Email or Phone *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">
                Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px]">
              <label className="flex items-center gap-1.5 text-slate-600 font-medium cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-emerald-600" />
                <span>Keep me signed in</span>
              </label>
              <a href="#" className="font-bold text-emerald-600 hover:underline">
                Forgot?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full py-3.5 text-xs disabled:opacity-50"
            >
              {isLoading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In to Franchise Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* SIGNUP FORM */}
        {authMode === "SIGNUP" && (
          <form onSubmit={handleSignup} className="space-y-3 animate-in fade-in">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">Full Legal Name *</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  required 
                  value={fullName} 
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Shubham Jha"
                  className="w-full pl-9 pr-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">Mobile Phone *</label>
                <input 
                  type="text" 
                  required 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">City / District *</label>
                <input 
                  type="text" 
                  required 
                  value={city} 
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Noida"
                  className="w-full px-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">Franchise / Shop / Office Name *</label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  required 
                  value={shopName} 
                  onChange={(e) => setShopName(e.target.value)}
                  placeholder="e.g. Shubham Legal & Tax Solutions"
                  className="w-full pl-9 pr-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">Email Address *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="email" 
                  required 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="shubham@example.com"
                  className="w-full pl-9 pr-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">Set Account Password *</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="password" 
                  required 
                  value={signupPassword} 
                  onChange={(e) => setSignupPassword(e.target.value)}
                  placeholder="Min 8 characters"
                  className="w-full pl-9 pr-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 cursor-pointer tap-bounce"
            >
              {isLoading ? <span>Registering Partner...</span> : <span>Complete Franchise Registration</span>}
            </button>
          </form>
        )}

        {/* Quick Demo Switcher Pill */}
        <div className="pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onLoginSuccess}
            className="w-full py-2.5 px-3 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold flex items-center justify-between hover:bg-emerald-100 transition-colors cursor-pointer tap-bounce"
          >
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-600" />
              <span>Instant Demo: Login as Shubham Jha (P-101)</span>
            </div>
            <ChevronRight className="w-4 h-4 text-emerald-600" />
          </button>
        </div>

        {/* Back to Onboarding */}
        <div className="text-center pt-1">
          <button
            type="button"
            onClick={onBackToOnboarding}
            className="text-[11px] font-bold text-slate-400 hover:text-slate-700"
          >
            ← View Introduction Slides Again
          </button>
        </div>

      </div>

    </div>
  );
};
