export interface PartnerProfile {
  id: number;
  userId: number;
  name: string;
  phone: string;
  email: string;
  branchName: string;
  branchCode: string;
  shopName: string;
  city: string;
  state: string;
  panNumber: string;
  adhaarNumber: string;
  status: "APPROVED" | "PENDING" | "REJECTED";
  relationshipManager: {
    name: string;
    designation: string;
    phone: string;
    avatarInitials: string;
  };
  metrics: {
    registrations: number;
    registrationsGrowth: string;
    income: number;
    incomeGrowth: string;
    pvtLtdMca: number;
    pvtLtdMcaGrowth: string;
    dscKey: number;
    dscKeyGrowth: string;
    totalEarnings: number;
    availableCommission: number;
    pendingToFinsocap: number;
    collectedFromClients: number;
    complianceRate: string;
    centuryClubFiles: number;
  };
}

export interface ServiceCategory {
  id: string;
  name: string;
  iconName: string;
  badge?: string;
}

export interface CatalogServiceItem {
  id: number;
  name: string;
  category: string;
  subtitle: string;
  startingPrice: number;
  partnerProfit: number;
  govtFee: number;
  processingTime: string;
  popular?: boolean;
  requiredDocuments: string[];
  eligibilityCriteria: string;
  workflowSteps: string[];
  description: string;
}

export interface ServiceRequestItem {
  id: string;
  numericId: number;
  customerName: string;
  customerPhone: string;
  businessName: string;
  serviceId: number;
  serviceName: string;
  category: string;
  status: "PENDING" | "IN_PROGRESS" | "SENT_FOR_REVIEW" | "PENDING_FROM_CLIENT" | "PENDING_FROM_DEPARTMENT" | "COMPLETED" | "CANCELLED";
  submittedAt: string;
  fee: number;
  partnerProfit: number;
  assignedSpecialist?: {
    id: number;
    name: string;
    role: string;
  };
  trackingTimeline: Array<{
    title: string;
    timestamp: string;
    done: boolean;
    current?: boolean;
    note?: string;
  }>;
  documents: Array<{
    id: string;
    name: string;
    status: "VERIFIED" | "PENDING" | "RE_UPLOAD_REQUESTED";
  }>;
  completionData?: {
    licenseNumber: string;
    validTill: string;
    certificateFileName: string;
  };
  settlementRequest?: {
    id: string;
    amountDue: number;
    clientTotalFee: number;
    partnerRetainedCommission: number;
    status: "PAYMENT_REQUESTED" | "PAID_VERIFYING" | "VERIFIED_DOCS_RELEASED";
    upiId: string;
    qrCodeUrl: string;
    requestedAt: string;
    paidAt?: string;
    transactionReference?: string;
    releasedDocuments?: Array<{
      id: string;
      title: string;
      fileName: string;
      fileSize: string;
      downloadUrl: string;
    }>;
  };
}

export interface TutorialVideo {
  id: string;
  title: string;
  category: string;
  duration: string;
  description: string;
  views: string;
  thumbnailGradient: string;
  iconName: string;
  videoUrl?: string;
  keyTakeaways: string[];
}

