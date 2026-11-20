import { PartnerProfile, CatalogServiceItem, ServiceRequestItem, TutorialVideo } from '../types';

export const mockPartnerProfile: PartnerProfile = {
  id: 101,
  userId: 5,
  name: "Shubham Jha",
  phone: "+91 78598 01218",
  email: "shubham.k.jha@gmail.com",
  branchName: "Pata Branch",
  branchCode: "AFC104",
  shopName: "Shubham Digital & Legal Solutions",
  city: "Noida",
  state: "Uttar Pradesh",
  panNumber: "ABCDE1234F",
  adhaarNumber: "XXXX-XXXX-9021",
  status: "APPROVED",
  relationshipManager: {
    name: "Vikram Singhania",
    designation: "Head of Pata Branches",
    phone: "+91 99530 65623",
    avatarInitials: "VS",
  },
  metrics: {
    registrations: 26100,
    registrationsGrowth: "+14.2%",
    income: 17600,
    incomeGrowth: "+18.5%",
    pvtLtdMca: 20800,
    pvtLtdMcaGrowth: "+9.1%",
    dscKey: 9700,
    dscKeyGrowth: "+22.4%",
    totalEarnings: 74200,
    availableCommission: 32400,
    pendingToFinsocap: 18500, // Pending amount partner has to pay to Finsocap
    collectedFromClients: 92700,
    complianceRate: "100%",
    centuryClubFiles: 113,
  },
};

export const mockCatalogServices: CatalogServiceItem[] = [
  {
    id: 60,
    name: "FSSAI Food License - Basic Registration",
    category: "LICENSES",
    subtitle: "Turnaround 2-3 Days • Standard Food Premises",
    startingPrice: 1500,
    partnerProfit: 300,
    govtFee: 100,
    processingTime: "2-3 Working Days",
    popular: true,
    requiredDocuments: [
      "Passport Size Photo of Applicant",
      "Aadhaar Card / Government Photo ID",
      "Premises Address Proof / Electricity Bill"
    ],
    eligibilityCriteria: "Petty food manufacturers, small dhabas, cloud kitchens, and retailers with annual turnover under ₹12 Lakhs.",
    workflowSteps: [
      "Application submitted by Franchise Partner",
      "Document pre-vetting by Central CA Specialist",
      "FoSCoS Portal direct filing & challan generation",
      "Department inspection waiver / notice response",
      "Issuance of accredited 14-Digit FSSAI License"
    ],
    description: "Compulsory registration under Food Safety and Standards Authority of India (FSSAI) for all food handling and distribution businesses.",
  },
  {
    id: 61,
    name: "FSSAI State / Central License",
    category: "LICENSES",
    subtitle: "High Turnover Entities & Large Food Plants",
    startingPrice: 4500,
    partnerProfit: 1200,
    govtFee: 2000,
    processingTime: "7-10 Working Days",
    popular: false,
    requiredDocuments: [
      "Blueprint / Layout plan of processing unit",
      "List of Directors / Partners with address proof",
      "Form IX: Nomination of Persons",
      "NOC from municipality or local body"
    ],
    eligibilityCriteria: "Food business operators with annual turnover between ₹12 Lakhs to ₹20 Crores (State) or over ₹20 Crores (Central).",
    workflowSteps: [
      "Layout & Equipment list review",
      "State FoSCoS portal application",
      "Online fee challan payment",
      "Inspector audit liaison",
      "Final certificate dispatch"
    ],
    description: "Comprehensive licensing for industrial food manufacturing, processing, repacking, and wholesale storage units.",
  },
  {
    id: 70,
    name: "GST New Registration & 3B Setup",
    category: "TAXATION",
    subtitle: "Direct GSTIN Generation with HSN Mapping",
    startingPrice: 2000,
    partnerProfit: 600,
    govtFee: 0,
    processingTime: "3-5 Working Days",
    popular: true,
    requiredDocuments: [
      "PAN Card of Business / Proprietor",
      "Aadhaar Card with linked mobile number",
      "Bank Account Cancelled Cheque / Statement",
      "Electricity Bill & Rent Agreement of premises"
    ],
    eligibilityCriteria: "Any business selling goods with turnover above ₹40L (₹20L for services) or engaging in inter-state e-commerce supply.",
    workflowSteps: [
      "Aadhaar biometric / OTP authentication",
      "Form REG-01 filling & TRN verification",
      "Jurisdictional officer verification",
      "Clarification filing (Form REG-03 if queried)",
      "GSTIN Certificate generation (Form REG-06)"
    ],
    description: "End-to-end GST enrollment with authorized signature setup, principal place validation, and complete portal access.",
  },
  {
    id: 80,
    name: "Private Limited Company Incorporation",
    category: "MCA",
    subtitle: "SPICe+ Part A & B with MoA, AoA & DIN",
    startingPrice: 7500,
    partnerProfit: 2500,
    govtFee: 1000,
    processingTime: "7-10 Working Days",
    popular: true,
    requiredDocuments: [
      "PAN & Aadhaar of all Directors (Min 2)",
      "Bank Statement with current address (< 2 months)",
      "Electricity Bill of registered office + NOC",
      "Passport size photos & Digital Signature (DSC)"
    ],
    eligibilityCriteria: "Minimum 2 Directors & 2 Shareholders (individuals can be both). No minimum paid-up capital requirement.",
    workflowSteps: [
      "RUN name approval reservation (SPICe+ Part A)",
      "Class 3 Digital Signatures (DSC) for all directors",
      "SPICe+ Part B incorporation filing with MCA",
      "AGILE-PRO (GST, EPFO, ESIC, Bank Account)",
      "Certificate of Incorporation (COI) + PAN/TAN"
    ],
    description: "Launch a legally recognized Private Limited company with limited liability, corporate credibility, and investor readiness.",
  },
  {
    id: 90,
    name: "Class 3 DSC (Signing & Encryption)",
    category: "DSC",
    subtitle: "2 Years Validity • FIPS Certified USB Token",
    startingPrice: 1800,
    partnerProfit: 700,
    govtFee: 300,
    processingTime: "Instant (15-30 Mins)",
    popular: true,
    requiredDocuments: [
      "Aadhaar card / PAN card of applicant",
      "Passport size digital photograph",
      "Mobile number & Email for video KYC"
    ],
    eligibilityCriteria: "Required for Company Directors, GST/Income Tax filings, e-Tendering, and MCA compliance.",
    workflowSteps: [
      "Online Aadhaar paperless offline eKYC",
      "30-second live applicant video recording",
      "Certifying Authority (CCA) verification",
      "Cryptographic USB Token download & dispatch"
    ],
    description: "Highest security Digital Signature Certificate for secure electronic signatures and cryptographic document encryption.",
  },
  {
    id: 100,
    name: "MSME / Udyam Registration Certificate",
    category: "CERTIFICATION",
    subtitle: "Official Govt Recognition & Bank Subsidies",
    startingPrice: 999,
    partnerProfit: 400,
    govtFee: 0,
    processingTime: "24 Hours",
    popular: false,
    requiredDocuments: [
      "Aadhaar Card linked with mobile number",
      "PAN Card of Business / Proprietor",
      "Bank Account details (Account Number & IFSC)"
    ],
    eligibilityCriteria: "Micro, Small, and Medium enterprises across manufacturing and service sectors.",
    workflowSteps: [
      "Udyam registration portal filing",
      "PAN and GST integration check",
      "NIC Code category assignment",
      "Instant lifetime Udyam Certificate generation"
    ],
    description: "Gain access to priority sector lending, collateral-free loans, interest subsidies, and public procurement tenders.",
  }
];

export const mockServiceRequests: ServiceRequestItem[] = [
  {
    id: "T-f2a872b45b904692913887606888e6ca",
    numericId: 9,
    customerName: "Ujjwal",
    customerPhone: "7859801218",
    businessName: "Ravi Entertainment",
    serviceId: 60,
    serviceName: "FSSAI Food License - Basic Registration",
    category: "LICENSES",
    status: "SENT_FOR_REVIEW",
    submittedAt: "18 Nov 2026, 08:03 PM",
    fee: 1500,
    partnerProfit: 300,
    assignedSpecialist: {
      id: 1,
      name: "Sandeep Maurya",
      role: "Operations Specialist",
    },
    trackingTimeline: [
      { title: "Application Submitted", timestamp: "18 Nov 2026, 08:03 PM", done: true, note: "Uploaded 3 partner attachments" },
      { title: "Task Assigned to Specialist", timestamp: "19 Nov 2026, 03:29 PM", done: true, note: "Assigned to Sandeep Maurya" },
      { title: "In Progress / FoSCoS Processing", timestamp: "19 Nov 2026, 03:31 PM", done: true, note: "Challan verified and documents vetted" },
      { title: "Sent for Review", timestamp: "19 Nov 2026, 03:32 PM", done: true, current: true, note: "Under review with Partner / Admin" },
      { title: "License Issued & Completed", timestamp: "Awaiting final approval", done: false }
    ],
    documents: [
      { id: "doc-1", name: "11175790974693-IMG-WA0020.jpg (Photo)", status: "VERIFIED" },
      { id: "doc-2", name: "11179515288858-IMG-WA0020.jpg (Aadhaar)", status: "VERIFIED" },
      { id: "doc-3", name: "11181922041722-IMG-WA0019.jpg (Address Proof)", status: "VERIFIED" }
    ],
    settlementRequest: {
      id: "SETTLE-9011",
      amountDue: 1200, // Total fee ₹1500 - Margin ₹300 = ₹1200 due to Finsocap
      clientTotalFee: 1500,
      partnerRetainedCommission: 300,
      status: "PAYMENT_REQUESTED",
      upiId: "finsocap.operations@icici",
      qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=finsocap.operations@icici%26pn=Finsocap%20Consulting%26am=1200%26cu=INR",
      requestedAt: "19 Nov 2026, 07:10 PM",
      releasedDocuments: [
        {
          id: "rel-fssai",
          title: "FSSAI 14-Digit Government Food License Certificate",
          fileName: "Ravi_Entertainment_FSSAI_Certificate.pdf",
          fileSize: "890 KB",
          downloadUrl: "#"
        }
      ]
    }
  },
  {
    id: "T-8941a37c9201e74921bbf90248a091cc",
    numericId: 8,
    customerName: "Rakesh Verma",
    customerPhone: "9876543210",
    businessName: "Verma Organic Spices",
    serviceId: 70,
    serviceName: "GST New Registration & 3B Setup",
    category: "TAXATION",
    status: "PENDING_FROM_CLIENT",
    submittedAt: "17 Nov 2026, 11:20 AM",
    fee: 2000,
    partnerProfit: 600,
    assignedSpecialist: {
      id: 2,
      name: "Rahul Jha",
      role: "Chartered Accountant",
    },
    trackingTimeline: [
      { title: "Application Submitted", timestamp: "17 Nov 2026, 11:20 AM", done: true },
      { title: "Assigned to CA", timestamp: "17 Nov 2026, 02:15 PM", done: true },
      { title: "Clarification Query Raised", timestamp: "18 Nov 2026, 10:00 AM", done: true, current: true, note: "Rent agreement signature page is blur, please re-upload" },
      { title: "Filing Completion", timestamp: "Pending clarification", done: false }
    ],
    documents: [
      { id: "doc-4", name: "Pan_Card_Applicant.pdf", status: "VERIFIED" },
      { id: "doc-5", name: "Rent_Agreement_Noida.pdf", status: "RE_UPLOAD_REQUESTED" }
    ]
  },
  {
    id: "T-1144b62d8471c08273619941a87b1452",
    numericId: 7,
    customerName: "Pooja Malhotra",
    customerPhone: "9811122334",
    businessName: "NexGen Software Solutions Pvt Ltd",
    serviceId: 80,
    serviceName: "Private Limited Company Incorporation",
    category: "MCA",
    status: "IN_PROGRESS",
    submittedAt: "16 Nov 2026, 04:45 PM",
    fee: 7500,
    partnerProfit: 2500,
    assignedSpecialist: {
      id: 3,
      name: "Aman Staff Test",
      role: "CS Associate",
    },
    trackingTimeline: [
      { title: "Name Approved (SPICe+ Part A)", timestamp: "16 Nov 2026, 06:10 PM", done: true },
      { title: "DSC Generated", timestamp: "17 Nov 2026, 11:00 AM", done: true },
      { title: "SPICe+ Part B MCA Submission", timestamp: "18 Nov 2026, 03:00 PM", done: true, current: true },
      { title: "Incorporation Certificate", timestamp: "Expected in 48 hrs", done: false }
    ],
    documents: [
      { id: "doc-6", name: "MoA_AoA_Draft.pdf", status: "VERIFIED" },
      { id: "doc-7", name: "Directors_KYC_Pack.zip", status: "VERIFIED" }
    ]
  },
  {
    id: "T-0092c45e7182a9381746200192847a90",
    numericId: 6,
    customerName: "Sunil Kumar",
    customerPhone: "9988776655",
    businessName: "Kumar Agro Impex",
    serviceId: 90,
    serviceName: "Class 3 DSC (Signing & Encryption)",
    category: "DSC",
    status: "COMPLETED",
    submittedAt: "15 Nov 2026, 01:15 PM",
    fee: 1800,
    partnerProfit: 700,
    assignedSpecialist: {
      id: 1,
      name: "Sandeep Maurya",
      role: "Operations Specialist",
    },
    trackingTimeline: [
      { title: "Video KYC Completed", timestamp: "15 Nov 2026, 01:25 PM", done: true },
      { title: "CCA Verification", timestamp: "15 Nov 2026, 01:40 PM", done: true },
      { title: "Certificate Downloaded & Dispatched", timestamp: "15 Nov 2026, 02:00 PM", done: true, current: false }
    ],
    documents: [
      { id: "doc-8", name: "ePass2003_DSC_Certificate.pfx", status: "VERIFIED" }
    ],
    completionData: {
      licenseNumber: "DSC3-2026-90218-IN",
      validTill: "14 Nov 2028",
      certificateFileName: "Kumar_Agro_Class3_DSC.pdf"
    },
    settlementRequest: {
      id: "SETTLE-9012",
      amountDue: 1100, // Total fee ₹1800 - Partner commission ₹700 = ₹1100 to Finsocap
      clientTotalFee: 1800,
      partnerRetainedCommission: 700,
      status: "PAYMENT_REQUESTED", // Awaiting partner UPI payment
      upiId: "finsocap.operations@icici",
      qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=finsocap.operations@icici%26pn=Finsocap%20Consulting%26am=1100%26cu=INR",
      requestedAt: "19 Nov 2026, 08:30 PM",
      releasedDocuments: [
        {
          id: "rel-1",
          title: "Government CCA Approved Class 3 DSC USB Token Certificate",
          fileName: "Kumar_Agro_Class3_DSC_Verified.pdf",
          fileSize: "1.4 MB",
          downloadUrl: "#"
        },
        {
          id: "rel-2",
          title: "Ministry of Electronics CCA Tax Invoice & Signing Key Receipt",
          fileName: "CCA_Signing_Key_Challan_Receipt.pdf",
          fileSize: "680 KB",
          downloadUrl: "#"
        }
      ]
    }
  },
  {
    id: "T-7729b11a9010481237890123efaa8910",
    numericId: 10,
    customerName: "Vikas Agrawal",
    customerPhone: "9820011223",
    businessName: "Agrawal Sweets & Bakery",
    serviceId: 60,
    serviceName: "MSME / Udyam Aadhar Registration",
    category: "CERTIFICATION",
    status: "PENDING",
    submittedAt: "19 Nov 2026, 09:15 PM",
    fee: 999,
    partnerProfit: 400,
    assignedSpecialist: undefined, // Unassigned / Pending admin assignment
    trackingTimeline: [
      { title: "Application Submitted", timestamp: "19 Nov 2026, 09:15 PM", done: true, note: "Queued for admin assignment" },
      { title: "Admin Specialist Assignment", timestamp: "Pending Admin Allocation", done: false, current: true, note: "Superadmin / Operations team allocating CA Specialist" },
      { title: "Filing & Govt Processing", timestamp: "Awaiting specialist", done: false }
    ],
    documents: [
      { id: "doc-9", name: "Aadhaar_Front_Back.pdf", status: "VERIFIED" },
      { id: "doc-10", name: "Bank_Passbook_Front.jpg", status: "VERIFIED" }
    ]
  }
];

export const mockTutorialVideos: TutorialVideo[] = [
  {
    id: "tut-1",
    title: "Partner Orientation: Platform Navigation & Workflow",
    category: "GETTING STARTED",
    duration: "04:15",
    description: "Learn how the Finsocap franchise portal connects local partners with central CA specialists.",
    views: "1.4k views",
    thumbnailGradient: "from-blue-600 via-indigo-600 to-sky-500",
    iconName: "Compass",
    keyTakeaways: [
      "Understanding the 4 core metrics (Registrations, Income, MCA, DSC)",
      "How to connect with your Dedicated Relationship Manager",
      "Real-time SLA tracking badge and notifications"
    ]
  },
  {
    id: "tut-2",
    title: "FSSAI Food License Filing: Step-by-Step Guide",
    category: "LICENSES",
    duration: "06:40",
    description: "Master filing FSSAI Basic & State licenses without rejection. Complete document checklists.",
    views: "2.8k views",
    thumbnailGradient: "from-emerald-600 via-teal-600 to-green-500",
    iconName: "FileCheck2",
    keyTakeaways: [
      "Correct photograph dimensions and lighting requirements",
      "Acceptable premises address proofs (Electricity bill vs Rent deed)",
      "How to avoid Form A rejection by food safety officers"
    ]
  },
  {
    id: "tut-3",
    title: "GST Registration & OTP Verification Protocol",
    category: "TAXATION",
    duration: "05:12",
    description: "Quick turnaround GST application filing. Handling Aadhaar authentication queries.",
    views: "1.9k views",
    thumbnailGradient: "from-amber-500 via-orange-600 to-red-500",
    iconName: "Receipt",
    keyTakeaways: [
      "TRN generation and ARN status tracking",
      "Resolving Form REG-03 field queries online",
      "HSN/SAC code search and selection best practices"
    ]
  },
  {
    id: "tut-4",
    title: "Class 3 DSC: 15-Minute Video Verification",
    category: "DIGITAL SIGNATURES",
    duration: "03:50",
    description: "Fast-track Digital Signature issuance for directors, contractors, and e-tender bidders.",
    views: "3.1k views",
    thumbnailGradient: "from-purple-600 via-violet-600 to-indigo-700",
    iconName: "KeyRound",
    keyTakeaways: [
      "How to guide applicants through the 30-sec video script",
      "Cryptographic USB token driver installation",
      "Instant commission credit to your partner wallet"
    ]
  },
  {
    id: "tut-5",
    title: "Resolving Client Document Queries in Real-Time",
    category: "SUPPORT & SLA",
    duration: "04:30",
    description: "Direct in-app chat with assigned CA specialists to clear document queries within 2 hours.",
    views: "980 views",
    thumbnailGradient: "from-rose-500 via-pink-600 to-purple-600",
    iconName: "MessageSquare",
    keyTakeaways: [
      "How to upload replacement documents under PENDING_FROM_CLIENT",
      "Using the task chat for urgent notices and challans",
      "Maintaining your 100% Clean Compliance Rate badge"
    ]
  },
  {
    id: "tut-6",
    title: "Maximizing Monthly Earnings & Franchise Growth",
    category: "BUSINESS GROWTH",
    duration: "07:20",
    description: "Proven marketing strategies for franchise partners to acquire 50+ clients monthly.",
    views: "4.5k views",
    thumbnailGradient: "from-cyan-600 via-blue-600 to-indigo-800",
    iconName: "TrendingUp",
    keyTakeaways: [
      "Cross-selling DSC and Trademark with Company Incorporation",
      "Yearly license renewal automation & recurring commissions",
      "Qualifying for the Finsocap Century Club bonus pool"
    ]
  }
];

