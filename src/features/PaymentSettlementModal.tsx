import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Headphones, 
  ShieldCheck, 
  QrCode, 
  Copy, 
  Camera, 
  CreditCard, 
  Send, 
  Check, 
  X,
  Sparkles
} from 'lucide-react';

interface PaymentSettlementModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
  applicantName: string;
  amountDue: number;
  upiId: string;
  qrCodeUrl: string;
  onPaymentSubmitted: (utr: string, proofName: string) => void;
}

export const PaymentSettlementModal: React.FC<PaymentSettlementModalProps> = ({
  isOpen,
  onClose,
  serviceName,
  applicantName,
  amountDue,
  upiId,
  qrCodeUrl,
  onPaymentSubmitted
}) => {
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [utrInput, setUtrInput] = useState('');
  const [proofImage, setProofImage] = useState<string | null>(null);
  const [proofFileName, setProofFileName] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!proofImage) {
      alert("Please upload the payment screenshot first.");
      return;
    }
    if (!utrInput.trim()) {
      alert("Please enter the 12-digit UPI UTR or Transaction Reference number.");
      return;
    }
    onPaymentSubmitted(utrInput, proofFileName || 'screenshot.jpg');
    onClose();
  };

  return (
    <div className="absolute inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex flex-col justify-end overflow-hidden animate-in fade-in duration-200">
      <div className="bg-white rounded-t-[36px] w-full h-[94%] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom-8 duration-200">
        
        {/* Top Header: < Back | Finsocap Logo | Help Headphone */}
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer transition-all active:scale-95"
            aria-label="Back"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
          </button>

          {/* Centered Finsocap Brand */}
          <div className="flex items-center gap-2">
            <img 
              src="/logo-icon.png" 
              alt="Finsocap Logo" 
              className="w-6 h-6 object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/Finsocap_logo.png';
              }}
            />
            <span className="text-base font-black text-slate-900 tracking-tight">Finsocap</span>
          </div>

          {/* Help Headphone Icon */}
          <button
            type="button"
            onClick={() => alert("Connecting to Finsocap Settlement Support Desk...")}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer transition-all active:scale-95"
            aria-label="Support Desk"
          >
            <Headphones className="w-4 h-4 text-slate-700" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">

          {/* CARD 1: QR & TRANSFER HERO CARD (EXACT MATCH 1ST REFERENCE) */}
          <div className="relative rounded-[28px] overflow-hidden bg-white border border-indigo-100 shadow-xl shadow-indigo-500/10">
            
            {/* Top Purple/Indigo Header Banner */}
            <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800 p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-white text-indigo-700 text-xs font-black flex items-center justify-center shadow-xs shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-sm font-black text-white leading-tight">
                    Scan &amp; Transfer ₹{amountDue}
                  </h3>
                  <p className="text-[11px] text-indigo-100 font-medium mt-0.5">
                    Scan the QR code or pay using UPI app
                  </p>
                </div>
              </div>

              {/* Secure Payment Tag */}
              <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-xl text-[10px] font-extrabold text-white border border-white/30 shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                <span>Secure Payment</span>
              </div>
            </div>

            {/* Ambient Background with QR & Bracket Corners */}
            <div className="relative p-5 bg-gradient-to-b from-indigo-50/50 via-white to-blue-50/40 flex flex-col items-center justify-center overflow-hidden">
              {/* Soft purple decorative blur spheres */}
              <div className="absolute top-2 left-2 w-24 h-24 rounded-full bg-indigo-200/50 blur-2xl pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-28 h-28 rounded-full bg-purple-200/50 blur-2xl pointer-events-none" />

              {/* QR Code Container with Focus Brackets */}
              <div className="relative p-3.5 bg-white rounded-3xl shadow-lg border border-slate-100/90 z-10">
                {/* Purple Focus Brackets */}
                <div className="absolute -top-1.5 -left-1.5 w-5 h-5 border-t-2 border-l-2 border-indigo-600 rounded-tl-lg" />
                <div className="absolute -top-1.5 -right-1.5 w-5 h-5 border-t-2 border-r-2 border-indigo-600 rounded-tr-lg" />
                <div className="absolute -bottom-1.5 -left-1.5 w-5 h-5 border-b-2 border-l-2 border-indigo-600 rounded-bl-lg" />
                <div className="absolute -bottom-1.5 -right-1.5 w-5 h-5 border-b-2 border-r-2 border-indigo-600 rounded-br-lg" />

                <img 
                  src={qrCodeUrl} 
                  alt="Finsocap UPI QR"
                  className="w-44 h-44 object-contain rounded-xl"
                />
              </div>

              {/* Scan via (Center Aligned) with Apps Row Below */}
              <div className="flex flex-col items-center justify-center gap-2 mt-4 z-10 w-full">
                <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-slate-500">
                  <QrCode className="w-3.5 h-3.5 text-slate-700" />
                  <span>Scan via:</span>
                </div>

                {/* UPI Apps Row (PhonePe, GPay, Paytm) Center Aligned */}
                <div className="flex items-center justify-center gap-2">
                  {/* PhonePe */}
                  <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-xl border border-slate-200/90 shadow-xs">
                    <img src="/phonepe.png" alt="PhonePe" className="w-3.5 h-3.5 object-contain" />
                    <span className="text-[10px] font-black text-slate-800">PhonePe</span>
                  </div>

                  {/* GPay */}
                  <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-xl border border-slate-200/90 shadow-xs">
                    <img src="/gpay.png" alt="GPay" className="w-3.5 h-3.5 object-contain" />
                    <span className="text-[10px] font-black text-slate-800">GPay</span>
                  </div>

                  {/* Paytm */}
                  <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-xl border border-slate-200/90 shadow-xs">
                    <img src="/paytm.png" alt="Paytm" className="w-3.5 h-3.5 object-contain" />
                    <span className="text-[10px] font-black text-slate-800">Paytm</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Finsocap Corporate VPA Banner (Single-line Compact Layout matching 3rd reference screenshot) */}
            <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-semibold text-slate-500 block leading-tight">
                  Finsocap Corporate VPA
                </span>
                <span className="text-xs font-bold text-slate-900 tracking-tight block truncate mt-0.5">
                  {upiId}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText(upiId);
                  setCopiedUpi(true);
                  setTimeout(() => setCopiedUpi(false), 2000);
                }}
                className="px-2.5 py-1 bg-white border border-slate-200 hover:border-blue-400 rounded-lg text-xs font-bold text-blue-600 hover:bg-blue-50 flex items-center gap-1 shadow-2xs cursor-pointer active:scale-95 transition-all shrink-0 whitespace-nowrap"
              >
                <Copy className="w-3 h-3 text-blue-600" />
                <span>{copiedUpi ? "Copied!" : "Copy VPA"}</span>
              </button>
            </div>
          </div>

          {/* STEP 2: UPLOAD PAYMENT SCREENSHOT */}
          <div className="card-luxury p-4 rounded-3xl space-y-2.5 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-black flex items-center justify-center shrink-0">
                  2
                </div>
                <h4 className="text-xs font-black text-slate-900">
                  Upload Payment Screenshot *
                </h4>
              </div>
              {proofFileName && (
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-200">
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span>Attached</span>
                </span>
              )}
            </div>

            {proofImage ? (
              <div className="relative rounded-2xl overflow-hidden border border-emerald-200 bg-emerald-50/40 p-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2.5 truncate pr-2">
                  <img src={proofImage} alt="Payment SS" className="w-12 h-12 object-cover rounded-xl border border-emerald-300" />
                  <div className="truncate">
                    <span className="text-xs font-black text-slate-900 block truncate">{proofFileName}</span>
                    <span className="text-[10px] text-emerald-700 font-semibold">Payment Receipt Captured</span>
                  </div>
                </div>
                <label className="text-xs font-bold text-indigo-600 hover:underline cursor-pointer shrink-0 px-2">
                  Change
                  <input 
                    type="file" 
                    accept="image/*"
                    className="hidden" 
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setProofFileName(file.name);
                        setProofImage(URL.createObjectURL(file));
                      }
                    }}
                  />
                </label>
              </div>
            ) : (
              <label className="w-full py-5 px-3 rounded-2xl border-2 border-dashed border-indigo-200 hover:border-indigo-400 bg-indigo-50/30 hover:bg-indigo-50/60 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all group">
                <div className="w-10 h-10 rounded-full bg-indigo-100/90 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
                  <Camera className="w-5 h-5 stroke-[2.2]" />
                </div>
                <span className="text-xs font-black text-slate-900">
                  Click to Upload UPI Payment Screenshot
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  Supports PNG, JPG, or PDF from GPay/PhonePe/Paytm
                </span>
                <input 
                  type="file" 
                  accept="image/*"
                  className="hidden" 
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setProofFileName(file.name);
                      setProofImage(URL.createObjectURL(file));
                    }
                  }}
                />
              </label>
            )}
          </div>

          {/* STEP 3: ENTER 12-DIGIT BANK UTR / REF NO. */}
          <div className="card-luxury p-4 rounded-3xl space-y-2.5 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-black flex items-center justify-center shrink-0">
                3
              </div>
              <h4 className="text-xs font-black text-slate-900">
                Enter 12–Digit Bank UTR / Ref No. *
              </h4>
            </div>

            <div className="relative">
              <CreditCard className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input 
                type="text"
                placeholder="e.g. 432190871234"
                value={utrInput}
                onChange={(e) => setUtrInput(e.target.value)}
                className="w-full pl-10 pr-3.5 py-3 text-xs font-mono font-bold bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 shadow-2xs"
              />
            </div>
          </div>

        </div>

        {/* Modal Fixed Bottom Action: Purple Gradient Pill CTA */}
        <div className="p-4 border-t border-slate-100 bg-white shrink-0">
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full py-3.5 px-4 rounded-full bg-gradient-to-r from-indigo-600 via-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-black text-xs shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
          >
            <Send className="w-4 h-4" />
            <span>Send Payment Proof for Verification</span>
          </button>
        </div>

      </div>
    </div>
  );
};
