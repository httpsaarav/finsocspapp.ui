import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Sparkles, 
  Clock, 
  ChevronRight, 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  ShieldCheck, 
  Building2, 
  Receipt, 
  Award, 
  KeyRound,
  Filter,
  Info,
  FileCheck,
  ArrowLeft
} from 'lucide-react';
import { mockCatalogServices } from '../data/mockData';
import { CatalogServiceItem } from '../types';
import { ServiceDetailModal } from './ServiceDetailModal';

interface ServicesScreenProps {
  onApplyService: (service: CatalogServiceItem) => void;
  onBackToHome?: () => void;
}

export const ServicesScreen: React.FC<ServicesScreenProps> = ({
  onApplyService,
  onBackToHome
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [viewingDetailService, setViewingDetailService] = useState<CatalogServiceItem | null>(null);

  const categories = [
    { id: "ALL", label: "All Services" },
    { id: "LICENSES", label: "FSSAI & Licenses" },
    { id: "TAXATION", label: "GST & Taxes" },
    { id: "MCA", label: "Pvt Ltd & MCA" },
    { id: "DSC", label: "Digital Signature" },
    { id: "CERTIFICATION", label: "MSME & ISO" }
  ];

  const filteredServices = useMemo(() => {
    return mockCatalogServices.filter((s) => {
      const matchCat = selectedCategory === "ALL" || s.category === selectedCategory;
      const matchQuery = 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="pb-28 pt-2 px-4 space-y-4 max-w-md mx-auto w-full animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="pt-1 flex items-start gap-2.5">
        {onBackToHome && (
          <button
            type="button"
            onClick={onBackToHome}
            aria-label="Back to Home"
            className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center justify-center shrink-0 cursor-pointer shadow-xs transition-all active:scale-95 mt-0.5"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
          </button>
        )}
        <div className="flex-1">
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            Services Directory
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Choose from accredited compliance, taxation, and company registration services.
          </p>
        </div>
      </div>

      {/* Search Input Box */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input 
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search FSSAI, GST, Pvt Ltd, DSC..."
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-xs"
        />
        {searchQuery && (
          <button 
            type="button" 
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-700 p-1"
          >
            ✕
          </button>
        )}
      </div>

      {/* Category Pills (Horizontal Scroll) with safe margins */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 px-0.5 scrollbar-none">
        {categories.map((c) => {
          const isActive = selectedCategory === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isActive 
                  ? "bg-slate-900 text-white shadow-sm" 
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 px-1">
        <span>SHOWING {filteredServices.length} SERVICES</span>
        <span className="text-blue-600 font-extrabold">Instant SLA Sync</span>
      </div>

      {/* Service Cards List */}
      <div className="space-y-3">
        {filteredServices.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 space-y-2">
            <Info className="w-8 h-8 text-slate-400 mx-auto" />
            <h4 className="text-xs font-bold text-slate-800">No services match "{searchQuery}"</h4>
            <p className="text-[11px] text-slate-400">Try searching for FSSAI, Company, DSC or GST.</p>
          </div>
        ) : (
          filteredServices.map((service) => (
            <div 
              key={service.id}
              className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs relative overflow-hidden transition-all hover:border-blue-400"
            >
              {service.popular && (
                <span className="absolute top-0 right-0 bg-gradient-to-l from-blue-600 to-indigo-600 text-white text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-bl-xl shadow-xs">
                  Popular
                </span>
              )}

              <div className="space-y-2.5">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                    service.category === "LICENSES" ? "bg-emerald-50 text-emerald-600" :
                    service.category === "TAXATION" ? "bg-amber-50 text-amber-600" :
                    service.category === "MCA" ? "bg-teal-50 text-teal-600" :
                    service.category === "DSC" ? "bg-purple-50 text-purple-600" :
                    "bg-blue-50 text-blue-600"
                  }`}>
                    {service.category === "LICENSES" ? <FileCheck className="w-5 h-5" /> :
                     service.category === "TAXATION" ? <Receipt className="w-5 h-5" /> :
                     service.category === "MCA" ? <Building2 className="w-5 h-5" /> :
                     service.category === "DSC" ? <KeyRound className="w-5 h-5" /> :
                     <Award className="w-5 h-5" />}
                  </div>

                  <div className="pr-12">
                    <span className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase">
                      {service.category}
                    </span>
                    <h3 className="text-xs font-black text-slate-900 leading-tight">
                      {service.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                      {service.subtitle}
                    </p>
                  </div>
                </div>

                {/* Price, Profit & Processing Time Pill */}
                <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 block uppercase">Client Fee</span>
                    <span className="text-xs font-black text-slate-900">₹{service.startingPrice}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-emerald-600 block uppercase">Your Profit</span>
                    <span className="text-xs font-black text-emerald-600">+₹{service.partnerProfit}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 block uppercase">SLA Time</span>
                    <span className="text-xs font-bold text-slate-700 flex items-center justify-center gap-1">
                      <Clock className="w-3 h-3 text-amber-500" />
                      <span>{service.processingTime.split(" ")[0]} d</span>
                    </span>
                  </div>
                </div>

                {/* Action Buttons: View Details & Apply Now */}
                <div className="grid grid-cols-2 gap-2 pt-0.5">
                  <button
                    type="button"
                    onClick={() => setViewingDetailService(service)}
                    className="btn-secondary py-2.5 px-3 text-xs"
                  >
                    <span>View Details</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onApplyService(service)}
                    className="btn-primary py-2.5 px-3 text-xs"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>
          ))
        )}
      </div>

      {/* Service Detail Modal */}
      {viewingDetailService && (
        <ServiceDetailModal 
          service={viewingDetailService}
          onClose={() => setViewingDetailService(null)}
          onApply={(srv) => {
            setViewingDetailService(null);
            onApplyService(srv);
          }}
        />
      )}

    </div>
  );
};

