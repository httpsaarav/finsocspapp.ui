import React, { useState } from 'react';
import { 
  Search, 
  Clock, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft, 
  MessageSquare, 
  Download, 
  FileText, 
  User, 
  UserCheck,
  UserX,
  Building2, 
  Phone,
  ShieldCheck,
  Send,
  UploadCloud,
  FileCheck2,
  Paperclip,
  Check,
  QrCode,
  CreditCard,
  Copy,
  ExternalLink,
  Lock,
  Unlock,
  Camera,
  Image as ImageIcon,
  Sparkles,
  Eye,
  CheckCheck,
  RefreshCw
} from 'lucide-react';
import { mockServiceRequests } from '../data/mockData';
import { ServiceRequestItem } from '../types';
import { formatTaskId } from '../utils/formatTaskId';
import { PaymentSettlementModal } from './PaymentSettlementModal';

interface ApplicationsScreenProps {
  initialRequestId?: string | null;
  onSelectRequestId?: (id: string | null) => void;
  onBackToHome?: () => void;
}

export const ApplicationsScreen: React.FC<ApplicationsScreenProps> = ({
  initialRequestId,
  onSelectRequestId,
  onBackToHome
}) => {
  const [selectedReqId, setSelectedReqId] = useState<string | null>(initialRequestId || null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // Sync internal selected ID when parent initialRequestId changes
  React.useEffect(() => {
    setSelectedReqId(initialRequestId || null);
  }, [initialRequestId]);

  const handleSelectReq = (id: string | null) => {
    setSelectedReqId(id);
    onSelectRequestId?.(id);
  };
  const [activeTab, setActiveTab] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Documents state for this request to support uploading new files
  const [documentsList, setDocumentsList] = useState<{ [reqId: string]: Array<{ id: string; name: string; status: string; date?: string }> }>({});
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccessNote, setUploadSuccessNote] = useState<string | null>(null);

  // Dynamic settlement status overrides (to simulate payment & release)
  const [settlementOverrides, setSettlementOverrides] = useState<{ [reqId: string]: "PAYMENT_REQUESTED" | "PAID_VERIFYING" | "VERIFIED_DOCS_RELEASED" }>({});
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [utrInput, setUtrInput] = useState("");
  const [isVerifyingPayment, setIsVerifyingPayment] = useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const [paymentProofImage, setPaymentProofImage] = useState<string | null>(null);
  const [paymentProofFileName, setPaymentProofFileName] = useState<string | null>(null);

  // Chat message simulator inside request details
  const [chatMessages, setChatMessages] = useState<Array<{ sender: string; text: string; time: string; isMe: boolean }>>([
    { sender: "Sandeep Maurya (CA Specialist)", text: "Hello Shubham, your applicant documents for Ravi Entertainment are verified. FoSCoS portal challan has been generated.", time: "19 Nov, 03:31 PM", isMe: false },
    { sender: "You", text: "Great, please expedite the inspection waiver if possible.", time: "19 Nov, 03:32 PM", isMe: true }
  ]);
  const [newMsg, setNewMsg] = useState("");

  const handleFileUpload = (reqId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setTimeout(() => {
      const newDoc = {
        id: `doc-${Date.now()}`,
        name: file.name,
        status: "UPLOADED_PENDING_REVIEW",
        date: "Just now"
      };

      setDocumentsList(prev => ({
        ...prev,
        [reqId]: [...(prev[reqId] || []), newDoc]
      }));

      // Also append system message in chat
      setChatMessages(prev => [
        ...prev,
        { sender: "You", text: `📎 Uploaded new document: ${file.name}`, time: "Just now", isMe: true }
      ]);

      setIsUploading(false);
      setUploadSuccessNote(`Document "${file.name}" uploaded & submitted to specialist!`);
      setTimeout(() => setUploadSuccessNote(null), 4000);
    }, 800);
  };

  const filteredRequests = mockServiceRequests
    .filter((r) => {
      const matchStatus = 
        activeTab === "ALL" ? true :
        activeTab === "UNASSIGNED" ? !r.assignedSpecialist :
        activeTab === "IN_PROGRESS" ? (r.status === "IN_PROGRESS" || r.status === "PENDING") :
        activeTab === "REVIEW" ? r.status === "SENT_FOR_REVIEW" :
        activeTab === "ACTION" ? r.status === "PENDING_FROM_CLIENT" :
        r.status === "COMPLETED";

      const matchQuery = 
        r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.serviceName.toLowerCase().includes(searchQuery.toLowerCase());

      return matchStatus && matchQuery;
    })
    .sort((a, b) => {
      // Unassigned requests always placed at the very top
      const aUnassigned = !a.assignedSpecialist ? 1 : 0;
      const bUnassigned = !b.assignedSpecialist ? 1 : 0;
      return bUnassigned - aUnassigned;
    });

  const selectedRequest = mockServiceRequests.find(r => r.id === selectedReqId);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsg.trim()) return;
    setChatMessages(prev => [
      ...prev,
      { sender: "You", text: newMsg.trim(), time: "Just now", isMe: true }
    ]);
    setNewMsg("");
  };

  // If a request is selected, show its deep-dive Tracking & Collaboration Screen
  if (selectedRequest) {
    return (
      <div className="pb-36 pt-2 px-4 max-w-md mx-auto w-full space-y-4 animate-in fade-in duration-300">
        
        {/* Header with Back button */}
        <div className="grid grid-cols-[36px_1fr_auto] items-center gap-2 pt-1 pb-1">
          <button
            type="button"
            onClick={() => handleSelectReq(null)}
            className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center justify-center cursor-pointer shadow-2xs active:scale-95 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          
          <div className="text-center truncate px-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block leading-tight">
              SERVICE REQUEST TRACKER
            </span>
            <h3 className="text-sm font-mono font-black text-slate-900 tracking-wider leading-tight mt-0.5">
              {formatTaskId(selectedRequest.id)}
            </h3>
          </div>

          <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shrink-0 ${
            selectedRequest.status === "COMPLETED" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
            selectedRequest.status === "SENT_FOR_REVIEW" ? "bg-purple-50 text-purple-700 border border-purple-200" :
            selectedRequest.status === "PENDING_FROM_CLIENT" ? "bg-amber-50 text-amber-700 border border-amber-200" :
            "bg-blue-50 text-blue-700 border border-blue-200"
          }`}>
            {selectedRequest.status.replace(/_/g, " ")}
          </span>
        </div>

        {/* Overview Card */}
        <div className="card-luxury p-4 rounded-3xl space-y-3">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Service</span>
            <h4 className="text-sm font-black text-slate-900">{selectedRequest.serviceName}</h4>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs border-t border-slate-100 pt-2.5">
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">Business Name</span>
              <span className="font-bold text-slate-800">{selectedRequest.businessName}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">Applicant Name</span>
              <span className="font-bold text-slate-800">{selectedRequest.customerName}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">Assignment Status</span>
              {selectedRequest.assignedSpecialist ? (
                <span className="font-bold text-slate-900 flex items-center gap-1 text-[11px]">
                  <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                  <span>{selectedRequest.assignedSpecialist.name}</span>
                </span>
              ) : (
                <span className="font-extrabold text-amber-600 flex items-center gap-1 text-[11px]">
                  <UserX className="w-3.5 h-3.5 text-amber-500" />
                  <span>Unassigned (Pending Admin)</span>
                </span>
              )}
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">Franchise Margin</span>
              <span className="font-black text-emerald-600">+₹{selectedRequest.partnerProfit}</span>
            </div>
          </div>
        </div>

        {/* 2. FINSO CAP PAYMENT REQUEST & DOCUMENT RELEASE PORTAL (When service completed) */}
        {selectedRequest.settlementRequest && (() => {
          const settlement = selectedRequest.settlementRequest;
          const currentSettlementStatus = settlementOverrides[selectedRequest.id] || settlement.status;

          return (
            <div className={`p-4 rounded-3xl border space-y-3.5 shadow-md transition-all ${
              currentSettlementStatus === "VERIFIED_DOCS_RELEASED" 
                ? "bg-gradient-to-br from-emerald-50 via-teal-50 to-white border-emerald-200" 
                : "bg-gradient-to-br from-amber-50 via-orange-50 to-white border-amber-200"
            }`}>
              
              {/* Header Title */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-white ${
                    currentSettlementStatus === "VERIFIED_DOCS_RELEASED" ? "bg-emerald-600" : "bg-amber-600"
                  }`}>
                    {currentSettlementStatus === "VERIFIED_DOCS_RELEASED" ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                      Finsocap Payment Settlement
                    </span>
                    <h4 className="text-xs font-black text-slate-900 leading-tight">
                      {currentSettlementStatus === "VERIFIED_DOCS_RELEASED" 
                        ? "Payment Verified • Official Documents Released" 
                        : "Task Complete • Payment Request Generated"}
                    </h4>
                  </div>
                </div>

                {currentSettlementStatus === "VERIFIED_DOCS_RELEASED" && (
                  <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Docs Released
                  </span>
                )}
                {currentSettlementStatus === "PAID_VERIFYING" && (
                  <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 animate-pulse">
                    Verifying...
                  </span>
                )}
              </div>

              {/* Fee Breakdown: Client Fee -> Retained Commission -> Amount Due to Finsocap */}
              <div className="p-3 bg-white/90 rounded-2xl border border-slate-200/60 shadow-xs space-y-2 text-xs">
                <div className="flex justify-between items-center text-slate-600">
                  <span>Total Client Fee Collected by Partner:</span>
                  <span className="font-bold text-slate-900">₹{settlement.clientTotalFee}</span>
                </div>
                <div className="flex justify-between items-center text-emerald-700 font-semibold">
                  <span>(-) Your Retained Partner Margin:</span>
                  <span className="font-extrabold">+₹{settlement.partnerRetainedCommission}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-sm">
                  <span className="font-black text-slate-900">Net Amount to Transfer to Finsocap:</span>
                  <span className="font-black text-blue-600 text-base">₹{settlement.amountDue}</span>
                </div>
              </div>

              {/* STAGE 1: Pay Action Trigger to Open Fullscreen Reference Payment Sheet */}
              {currentSettlementStatus === "PAYMENT_REQUESTED" && (
                <div className="bg-white p-4 rounded-3xl border border-indigo-100 shadow-md space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Direct QR &amp; UPI Settlement
                      </span>
                      <h5 className="text-xs font-black text-slate-900 mt-0.5">
                        Amount to transfer: <span className="text-indigo-600 font-black">₹{settlement.amountDue}</span>
                      </h5>
                    </div>
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      Payment Due
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                    Transfer ₹{settlement.amountDue} via Finsocap QR or UPI to unlock client certificate and completion challans.
                  </p>

                  <button
                    type="button"
                    onClick={() => setIsPaymentModalOpen(true)}
                    className="w-full py-3.5 px-4 rounded-full bg-gradient-to-r from-amber-400 via-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/25 flex items-center justify-between cursor-pointer transition-all active:scale-[0.98]"
                  >
                    <div className="flex-1 text-center font-black">
                      Scan QR &amp; Pay to Finsocap (₹{settlement.amountDue})
                    </div>
                    <div className="w-7 h-7 rounded-full bg-slate-900/15 flex items-center justify-center shrink-0">
                      <ChevronRight className="w-4 h-4 text-slate-900 stroke-[2.5]" />
                    </div>
                  </button>
                </div>
              )}

              {/* STAGE 2: Payment Submitted - Waiting for Finsocap Verification */}
              {currentSettlementStatus === "PAID_VERIFYING" && (
                <div className="bg-white p-4 rounded-2xl border border-amber-300 shadow-xs space-y-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-300 text-amber-700 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 animate-spin" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 block">
                        Verification in Progress
                      </span>
                      <h5 className="text-xs font-black text-slate-900">
                        Payment Sent • Awaiting Finsocap Verification
                      </h5>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-600 font-medium leading-relaxed bg-amber-50/70 p-3 rounded-xl border border-amber-200">
                    Payment proof with <strong>UTR {utrInput || "432190871234"}</strong> and transaction receipt has been submitted to Finsocap Accounts Department. 
                    Official compliance certificates and final signed documents will be released upon bank settlement verification.
                  </p>

                  {/* Submitted details summary */}
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                    <div className="flex justify-between text-slate-500">
                      <span>Submitted Slip:</span>
                      <span className="font-semibold text-slate-800 truncate max-w-[160px]">{paymentProofFileName || "payment_receipt.jpg"}</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Amount Transferred:</span>
                      <span className="font-bold text-slate-900">₹{settlement.amountDue}</span>
                    </div>
                  </div>

                  {/* Partner Verification Status Banner with Single-Line Refresh CTA */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                    <span className="text-[10px] text-slate-500 font-medium whitespace-nowrap">Awaiting verification...</span>
                    
                    <button
                      type="button"
                      onClick={() => {
                        setIsCheckingStatus(true);
                        setTimeout(() => {
                          setIsCheckingStatus(false);
                          // Check if admin verified on server
                          const isNowApproved = true; // In live environment, fetches latest status from backend API
                          if (isNowApproved) {
                            setSettlementOverrides(prev => ({ ...prev, [selectedRequest.id]: "VERIFIED_DOCS_RELEASED" }));
                            setChatMessages(prev => [
                              ...prev,
                              { sender: "Finsocap Accounts (Admin)", text: `✅ Payment of ₹${settlement.amountDue} Verified by Admin! Bank UTR confirmed. Final certificate and signing receipts released for partner download.`, time: "Just now", isMe: false }
                            ]);
                          }
                        }, 800);
                      }}
                      className="py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/20 transition-all cursor-pointer whitespace-nowrap shrink-0 active:scale-95"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isCheckingStatus ? "animate-spin text-white" : ""}`} />
                      <span>{isCheckingStatus ? "Checking..." : "Refresh Status"}</span>
                    </button>
                  </div>

                </div>
              )}

              {/* STAGE 3: Payment Verified & Official Documents Released */}
              {currentSettlementStatus === "VERIFIED_DOCS_RELEASED" && (
                <div className="bg-white p-3.5 rounded-2xl border border-emerald-200 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Payment Verified • All Final Task Documents Released</span>
                  </div>

                  {/* List of Released Official Certificates */}
                  <div className="space-y-2">
                    {settlement.releasedDocuments?.map((item) => (
                      <div key={item.id} className="p-2.5 bg-emerald-50/50 rounded-xl border border-emerald-100 flex items-center justify-between text-xs">
                        <div className="space-y-0.5 truncate pr-2">
                          <h6 className="font-black text-slate-900 truncate">{item.title}</h6>
                          <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono">
                            <span>{item.fileName}</span>
                            <span>•</span>
                            <span>{item.fileSize}</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => alert(`Downloading verified document: "${item.fileName}" to device.`)}
                          className="btn-success py-1.5 px-3 text-xs shrink-0"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download</span>
                        </button>
                      </div>
                    ))}
                  </div>

                  <p className="text-[10px] text-slate-400 font-medium">
                    You can share these documents with your client directly or download them to your device.
                  </p>
                </div>
              )}

            </div>
          );
        })()}

        {/* Task Status & Workflow Milestones (Dynamic Timeline with live status indicator) */}
        <div className="card-luxury p-4 rounded-3xl space-y-3.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span>Task Status Updates</span>
            </h4>
            <span className="text-[10px] font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200/60">
              Live Progress
            </span>
          </div>

          <div className="space-y-3.5 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {selectedRequest.trackingTimeline.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 relative z-10">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 transition-transform ${
                  item.done 
                    ? item.current ? "bg-purple-600 text-white ring-4 ring-purple-100 shadow-xs" : "bg-emerald-500 text-white shadow-xs" 
                    : "bg-slate-100 text-slate-400 border border-slate-200"
                }`}>
                  {item.done ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                </div>
                <div className="space-y-0.5 pt-0.5">
                  <div className="text-xs font-black text-slate-900 leading-tight">{item.title}</div>
                  <div className="text-[10px] text-slate-400 font-medium">{item.timestamp}</div>
                  {item.note && (
                    <div className="text-[10px] text-slate-600 font-medium bg-slate-50 p-2 rounded-xl border border-slate-100 mt-1 shadow-2xs">
                      {item.note}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upload & Attached Client Documents Section */}
        <div className="card-luxury p-4 rounded-3xl space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <FileCheck2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Application Documents</span>
            </h4>
            <span className="text-[10px] font-bold text-slate-400">
              {((selectedRequest.documents?.length || 0) + (documentsList[selectedRequest.id]?.length || 0))} Files
            </span>
          </div>

          {/* Upload Success Alert */}
          {uploadSuccessNote && (
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{uploadSuccessNote}</span>
            </div>
          )}

          {/* Existing & Uploaded Documents List */}
          <div className="space-y-2">
            {selectedRequest.documents?.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs">
                <div className="flex items-center gap-2 truncate pr-2">
                  <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="font-semibold text-slate-800 truncate">{doc.name}</span>
                </div>
                <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full shrink-0 ${
                  doc.status === "VERIFIED" ? "bg-emerald-50 text-emerald-700" :
                  doc.status === "RE_UPLOAD_REQUESTED" ? "bg-rose-50 text-rose-700 border border-rose-200" :
                  "bg-blue-50 text-blue-700"
                }`}>
                  {doc.status.replace(/_/g, " ")}
                </span>
              </div>
            ))}

            {/* Dynamically uploaded documents */}
            {documentsList[selectedRequest.id]?.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-2.5 bg-blue-50/60 border border-blue-100 rounded-xl text-xs">
                <div className="flex items-center gap-2 truncate pr-2">
                  <Paperclip className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="font-semibold text-slate-900 truncate">{doc.name}</span>
                </div>
                <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 shrink-0">
                  Uploaded
                </span>
              </div>
            ))}
          </div>

          {/* Upload Button Trigger */}
          <div className="pt-1">
            <label className={`w-full py-2.5 px-3 rounded-xl border border-dashed border-blue-300 bg-blue-50/50 hover:bg-blue-50 text-blue-700 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all ${
              isUploading ? "opacity-60 pointer-events-none" : "hover:border-blue-400"
            }`}>
              <UploadCloud className="w-4 h-4 text-blue-600" />
              <span>{isUploading ? "Uploading Document..." : "+ Upload Additional / Corrected Document"}</span>
              <input 
                type="file" 
                className="hidden" 
                onChange={(e) => handleFileUpload(selectedRequest.id, e)}
                disabled={isUploading}
              />
            </label>
          </div>
        </div>

        {/* In-app Chat with Assigned CA Specialist */}
        <div className="card-luxury p-4 rounded-3xl space-y-3">
          <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
              <span>Specialist Liaison Chat</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Active</span>
          </h4>

          <div className="space-y-2 max-h-48 overflow-y-auto p-2 bg-slate-50 rounded-2xl border border-slate-100">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex flex-col ${msg.isMe ? "items-end" : "items-start"}`}>
                <div className={`p-2.5 rounded-2xl text-xs max-w-[85%] ${
                  msg.isMe ? "bg-emerald-600 text-white rounded-br-none" : "bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-xs"
                }`}>
                  <p className="font-medium">{msg.text}</p>
                </div>
                <span className="text-[9px] text-slate-400 mt-0.5 px-1">{msg.time}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <input 
              type="text"
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              placeholder="Ask CA Specialist a question..."
              className="flex-1 px-3 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              className="p-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 cursor-pointer tap-bounce"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Fullscreen Dedicated Payment Settlement Modal inside Request Detail View */}
        {selectedRequest && selectedRequest.settlementRequest && (
          <PaymentSettlementModal 
            isOpen={isPaymentModalOpen}
            onClose={() => setIsPaymentModalOpen(false)}
            serviceName={selectedRequest.serviceName}
            applicantName={selectedRequest.customerName}
            amountDue={selectedRequest.settlementRequest.amountDue}
            upiId={selectedRequest.settlementRequest.upiId}
            qrCodeUrl={selectedRequest.settlementRequest.qrCodeUrl}
            onPaymentSubmitted={(utr, proofName) => {
              setSettlementOverrides(prev => ({ ...prev, [selectedRequest.id]: "PAID_VERIFYING" }));
              setChatMessages(prev => [
                ...prev,
                { sender: "You", text: `📤 Payment Proof Sent: UTR ${utr} with Screenshot receipt (${proofName}). Awaiting Finsocap accounts approval.`, time: "Just now", isMe: true }
              ]);
            }}
          />
        )}

      </div>
    );
  }

  // Requests List View
  return (
    <div className="pb-28 pt-2 px-4 space-y-4 max-w-md mx-auto w-full animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="pt-2 flex items-start gap-2.5">
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
          <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 block">
            Track &amp; Manage
          </span>
          <h2 className="text-xl font-black text-slate-900 tracking-tight mt-0.5">
            My Service Requests
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Real-time tracking of client applications filed across branches.
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
          placeholder="Search by T-ID, Client, or Business..."
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-xs"
        />
      </div>

      {/* Status Segmented Tabs with clean container padding */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 px-0.5 scrollbar-none">
        {[
          { id: "ALL", label: "All" },
          { id: "UNASSIGNED", label: "Unassigned" },
          { id: "IN_PROGRESS", label: "In Progress" },
          { id: "REVIEW", label: "Sent for Review" },
          { id: "ACTION", label: "Action Needed" },
          { id: "COMPLETED", label: "Completed" }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === tab.id
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Request Cards List */}
      <div className="space-y-3">
        {filteredRequests.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 space-y-2">
            <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
            <h4 className="text-xs font-bold text-slate-800">No requests found</h4>
            <p className="text-[11px] text-slate-400">Try changing status filters or search query.</p>
          </div>
        ) : (
          filteredRequests.map((req) => (
            <div 
              key={req.id}
              onClick={() => handleSelectReq(req.id)}
              className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-2.5 cursor-pointer hover:border-blue-400 transition-all active:scale-[0.99]"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[11px] font-black text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200/60 tracking-wider">
                  {formatTaskId(req.id)}
                </span>
                <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full shrink-0 ${
                  req.status === "COMPLETED" ? "bg-emerald-50 text-emerald-700 border border-emerald-200/50" :
                  req.status === "SENT_FOR_REVIEW" ? "bg-purple-50 text-purple-700 border border-purple-200/50" :
                  req.status === "PENDING_FROM_CLIENT" ? "bg-amber-50 text-amber-700 border border-amber-200/50" :
                  "bg-blue-50 text-blue-700 border border-blue-200/50"
                }`}>
                  {req.status === "PENDING_FROM_CLIENT" ? "Action Needed" : req.status.replace(/_/g, " ")}
                </span>
              </div>

              <div>
                <h4 className="text-xs font-black text-slate-900 leading-tight">{req.serviceName}</h4>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                  {req.businessName} • {req.customerName}
                </p>
              </div>

              {/* Assignment Status Row */}
              <div className="flex items-center gap-1.5 pt-0.5">
                {req.assignedSpecialist ? (
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-50 border border-slate-200/80 text-[10px] font-semibold text-slate-700">
                    <UserCheck className="w-3 h-3 text-blue-600" />
                    <span>Assigned: <strong className="text-slate-900">{req.assignedSpecialist.name}</strong></span>
                    <span className="text-slate-400 text-[9px]">({req.assignedSpecialist.role})</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-50 border border-amber-200/80 text-[10px] font-bold text-amber-700 animate-pulse">
                    <UserX className="w-3 h-3 text-amber-600" />
                    <span>Unassigned • Awaiting Admin Allocation</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-1.5 text-slate-400 text-[10px]">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{req.submittedAt}</span>
                </div>
                <div className="text-right">
                  <span className="font-extrabold text-emerald-600">+₹{req.partnerProfit}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Fullscreen Dedicated Payment Settlement Modal matching 1st Reference Image */}
      {selectedRequest && selectedRequest.settlementRequest && (
        <PaymentSettlementModal 
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          serviceName={selectedRequest.serviceName}
          applicantName={selectedRequest.customerName}
          amountDue={selectedRequest.settlementRequest.amountDue}
          upiId={selectedRequest.settlementRequest.upiId}
          qrCodeUrl={selectedRequest.settlementRequest.qrCodeUrl}
          onPaymentSubmitted={(utr, proofName) => {
            setSettlementOverrides(prev => ({ ...prev, [selectedRequest.id]: "PAID_VERIFYING" }));
            setChatMessages(prev => [
              ...prev,
              { sender: "You", text: `📤 Payment Proof Sent: UTR ${utr} with Screenshot receipt (${proofName}). Awaiting Finsocap accounts approval.`, time: "Just now", isMe: true }
            ]);
          }}
        />
      )}

    </div>
  );
};

