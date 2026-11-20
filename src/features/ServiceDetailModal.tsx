import React from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  FileText, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Check, 
  Building2, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { CatalogServiceItem } from '../types';

interface ServiceDetailModalProps {
  service: CatalogServiceItem;
  onClose: () => void;
  onApply: (service: CatalogServiceItem) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onApply
}) => {
  return (
    <div className="absolute inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex flex-col justify-end overflow-hidden animate-in fade-in duration-200">
      <div className="bg-white rounded-t-3xl w-full h-[90%] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom-5 duration-200">
        
        {/* Top Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between shrink-0">
          <button 
            type="button" 
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
            {service.category} SERVICE DETAILS
          </span>
          <div className="w-8" />
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          
          {/* Hero Banner */}
          <div className="p-4 rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-800 text-white space-y-2 shadow-lg shadow-emerald-700/20">
            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full inline-block">
              {service.category}
            </span>
            <h3 className="text-base font-black leading-tight text-white">
              {service.name}
            </h3>
            <p className="text-xs text-emerald-100 font-medium">
              {service.subtitle}
            </p>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/20 text-center">
              <div>
                <span className="text-[9px] uppercase font-bold text-emerald-200 block">Retail Price</span>
                <span className="text-sm font-black text-white">₹{service.startingPrice}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase font-bold text-emerald-200 block">Partner Profit</span>
                <span className="text-sm font-black text-emerald-300">+₹{service.partnerProfit}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase font-bold text-emerald-200 block">SLA Turnaround</span>
                <span className="text-sm font-bold text-white">{service.processingTime.split(" ")[0]} d</span>
              </div>
            </div>
          </div>

          {/* Overview & Description */}
          <div className="card-luxury p-4 rounded-3xl space-y-1.5">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              Service Description
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {service.description}
            </p>
          </div>

          {/* Eligibility Criteria */}
          <div className="card-luxury p-4 rounded-3xl space-y-1.5">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Eligibility &amp; Who Needs This</span>
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {service.eligibilityCriteria}
            </p>
          </div>

          {/* Required Documents Checklist */}
          <div className="card-luxury p-4 rounded-3xl space-y-2.5">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-indigo-600" />
              <span>Compulsory Documents ({service.requiredDocuments.length})</span>
            </h4>
            <div className="space-y-1.5">
              {service.requiredDocuments.map((doc, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="font-semibold text-slate-700">{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Workflow Milestones */}
          <div className="card-luxury p-4 rounded-3xl space-y-2.5">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>Step-by-Step Filing Workflow</span>
            </h4>
            <div className="space-y-2">
              {service.workflowSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs">
                  <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px] flex items-center justify-center shrink-0">
                    {idx + 1}
                  </div>
                  <span className="text-slate-600 font-medium">{step}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Bottom Action Bar */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 shrink-0 flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary flex-1 py-3 text-xs"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => onApply(service)}
            className="btn-primary flex-1 py-3 text-xs"
          >
            <span>Apply / Request Service</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

