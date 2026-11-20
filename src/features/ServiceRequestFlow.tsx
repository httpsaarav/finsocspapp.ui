import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight,
  CheckCircle2, 
  Upload, 
  FileText, 
  AlertCircle, 
  Sparkles, 
  Clock, 
  Building2, 
  User, 
  Phone, 
  MapPin, 
  Check, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { CatalogServiceItem } from '../types';

interface ServiceRequestFlowProps {
  service: CatalogServiceItem;
  onBack: () => void;
  onCompleted: (newRequestId: string) => void;
}

export const ServiceRequestFlow: React.FC<ServiceRequestFlowProps> = ({
  service,
  onBack,
  onCompleted
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 4;

  // Form Fields State
  const [clientName, setClientName] = useState("Ujjwal Kumar");
  const [clientPhone, setClientPhone] = useState("+91 78598 01218");
  const [clientEmail, setClientEmail] = useState("ujjwal.client@gmail.com");
  const [businessName, setBusinessName] = useState("Ravi Entertainment & Food Plaza");
  const [businessType, setBusinessType] = useState("Restaurant / Food Outlet");
  const [businessAddress, setBusinessAddress] = useState("Shop No. 4, Ground Floor, Sector 62");
  const [city, setCity] = useState("Noida");
  const [pinCode, setPinCode] = useState("201309");

  // Document Uploads State
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: string }>({
    "Passport Size Photo of Applicant": "11175790974693-IMG-WA0020.jpg",
    "Aadhaar Card / Government Photo ID": "11179515288858-IMG-WA0020.jpg"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedRefId, setGeneratedRefId] = useState("");

  const handleSimulateUpload = (docName: string) => {
    setUploadedFiles(prev => ({
      ...prev,
      [docName]: `Uploaded_${Date.now().toString().slice(-4)}_${docName.replace(/\s+/g, '_').slice(0, 15)}.pdf`
    }));
  };

  const handleSubmitRequest = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const newId = `T-${Math.random().toString(36).substring(2, 10)}${Date.now().toString(36)}`;
      setGeneratedRefId(newId);
      setCurrentStep(4); // Success step
    }, 1200);
  };

  return (
    <div className="pb-24 pt-2 px-4 max-w-md mx-auto space-y-4 animate-in fade-in duration-300">
      
      {/* Top Bar with Step Progress */}
      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          onClick={currentStep === 4 ? () => onCompleted(generatedRefId) : onBack}
          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer tap-bounce"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="text-center">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
            {currentStep === 4 ? "SUCCESS" : `STEP ${currentStep} OF ${totalSteps - 1}`}
          </span>
          <h3 className="text-xs font-black text-slate-900 truncate max-w-[200px]">
            {service.name}
          </h3>
        </div>

        <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 font-extrabold text-xs flex items-center justify-center">
          {currentStep}/3
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
        <div 
          className="bg-emerald-500 h-full transition-all duration-300 rounded-full"
          style={{ width: `${(currentStep / 3) * 100}%` }}
        />
      </div>

      {/* STEP 1: Applicant & Business Information */}
      {currentStep === 1 && (
        <div className="space-y-3.5 animate-in fade-in">
          <div className="p-3 bg-emerald-50/80 rounded-2xl border border-emerald-100 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-emerald-800 uppercase block">Franchise Profit</span>
              <span className="text-sm font-black text-emerald-700">+₹{service.partnerProfit}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Govt + Retail Fee</span>
              <span className="text-sm font-black text-slate-800">₹{service.startingPrice}</span>
            </div>
          </div>

          <div className="card-luxury p-4 rounded-3xl space-y-3">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-emerald-600" />
              <span>Applicant Details</span>
            </h4>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">Applicant Name *</label>
              <input 
                type="text" 
                value={clientName} 
                onChange={(e) => setClientName(e.target.value)} 
                className="w-full px-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">Mobile Phone *</label>
                <input 
                  type="text" 
                  value={clientPhone} 
                  onChange={(e) => setClientPhone(e.target.value)} 
                  className="w-full px-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">Email Address</label>
                <input 
                  type="email" 
                  value={clientEmail} 
                  onChange={(e) => setClientEmail(e.target.value)} 
                  className="w-full px-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                />
              </div>
            </div>
          </div>

          <div className="card-luxury p-4 rounded-3xl space-y-3">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Business Premises</span>
            </h4>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">Name of Business *</label>
              <input 
                type="text" 
                value={businessName} 
                onChange={(e) => setBusinessName(e.target.value)} 
                className="w-full px-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">Constitution / Type *</label>
              <input 
                type="text" 
                value={businessType} 
                onChange={(e) => setBusinessType(e.target.value)} 
                className="w-full px-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">Premises Address *</label>
              <input 
                type="text" 
                value={businessAddress} 
                onChange={(e) => setBusinessAddress(e.target.value)} 
                className="w-full px-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">City / District *</label>
                <input 
                  type="text" 
                  value={city} 
                  onChange={(e) => setCity(e.target.value)} 
                  className="w-full px-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">PIN Code *</label>
                <input 
                  type="text" 
                  value={pinCode} 
                  onChange={(e) => setPinCode(e.target.value)} 
                  className="w-full px-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setCurrentStep(2)}
            className="w-full py-3.5 rounded-2xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-slate-900/20 cursor-pointer tap-bounce"
          >
            <span>Continue to Document Uploads</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STEP 2: Document Uploads */}
      {currentStep === 2 && (
        <div className="space-y-3 animate-in fade-in">
          <div className="p-3 bg-blue-50/80 rounded-2xl border border-blue-100 flex items-center gap-2 text-xs text-blue-900">
            <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Uploaded documents will be pre-screened by our in-house CA specialist before filing.</span>
          </div>

          <div className="space-y-2.5">
            {service.requiredDocuments.map((doc, idx) => {
              const isUploaded = Boolean(uploadedFiles[doc]);
              return (
                <div key={idx} className="card-luxury p-3.5 rounded-2xl border border-slate-100 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                        isUploaded ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"
                      }`}>
                        {idx + 1}
                      </div>
                      <span className="text-xs font-black text-slate-900">{doc}</span>
                    </div>
                    {isUploaded && (
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        <span>Ready</span>
                      </span>
                    )}
                  </div>

                  {isUploaded ? (
                    <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                      <span className="font-mono text-[11px] text-slate-700 truncate max-w-[220px]">
                        {uploadedFiles[doc]}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleSimulateUpload(doc)}
                        className="text-[10px] font-bold text-blue-600 hover:underline cursor-pointer"
                      >
                        Re-upload
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleSimulateUpload(doc)}
                      className="w-full py-2.5 px-3 border border-dashed border-emerald-300 bg-emerald-50/50 hover:bg-emerald-50 rounded-xl text-emerald-700 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer tap-bounce"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload PDF / Photo (Max 10MB)</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="py-3 rounded-2xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 cursor-pointer"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="py-3 rounded-2xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-1 cursor-pointer tap-bounce"
            >
              <span>Review Summary</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Review & Final Submit */}
      {currentStep === 3 && (
        <div className="space-y-3 animate-in fade-in">
          <div className="card-luxury p-4 rounded-3xl space-y-3">
            <div className="border-b border-slate-100 pb-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Service</span>
              <h4 className="text-sm font-black text-slate-900">{service.name}</h4>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs border-b border-slate-100 pb-2">
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">Applicant</span>
                <span className="font-bold text-slate-800">{clientName}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">Business</span>
                <span className="font-bold text-slate-800">{businessName}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">City</span>
                <span className="font-bold text-slate-800">{city} ({pinCode})</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">Estimated SLA</span>
                <span className="font-bold text-slate-800">{service.processingTime}</span>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 rounded-2xl flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] font-bold text-emerald-800 uppercase block">Partner Margin</span>
                <span className="text-base font-black text-emerald-600">+₹{service.partnerProfit}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Total Client Billing</span>
                <span className="text-sm font-black text-slate-900">₹{service.startingPrice}</span>
              </div>
            </div>
          </div>

          <div className="card-luxury p-3 rounded-2xl flex items-center gap-2 text-xs text-slate-600">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>3 Documents attached &amp; validated. Ready to lodge in central operations queue.</span>
          </div>

          <div className="flex items-center gap-2.5 pt-3">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => setCurrentStep(2)}
              className="py-3 px-4 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition-all cursor-pointer disabled:opacity-50 shrink-0"
            >
              Edit Details
            </button>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleSubmitRequest}
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-indigo-500/20 transition-all cursor-pointer disabled:opacity-50 whitespace-nowrap active:scale-[0.98]"
            >
              {isSubmitting ? (
                <span>Generating Request...</span>
              ) : (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Submit Request</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Success Confetti & Reference ID */}
      {currentStep === 4 && (
        <div className="card-luxury p-6 rounded-3xl text-center space-y-4 animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div>
            <span className="text-[10px] font-black uppercase text-emerald-600 tracking-wider">
              SUCCESSFULLY SUBMITTED
            </span>
            <h3 className="text-lg font-black text-slate-900 mt-1">
              Service Request Created!
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Your application has been assigned to central CA specialist queue.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Tracking Reference ID</span>
            <div className="text-xs font-mono font-black text-slate-900 select-all">
              {generatedRefId}
            </div>
          </div>

          <div className="pt-2 space-y-2">
            <button
              type="button"
              onClick={() => onCompleted(generatedRefId)}
              className="btn-primary w-full py-3.5 text-xs"
            >
              <span>Track Request Progress</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

