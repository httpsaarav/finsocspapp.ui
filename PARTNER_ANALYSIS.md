# PARTNER_ANALYSIS.md
# Comprehensive Finsocap Partner Platform & Workflow Analysis

## 1. Executive Summary
Finsocap is a B2B2C FinTech & LegalTech franchise network in India.
- **Partners (Franchise Owners):** Local business operators, CSC centers, CA associates, or legal consultants who acquire clients in their local territory (e.g. "Pata Branch AFC104").
- **Clients (Applicants):** Local businesses, food outlets, startups, traders, and entrepreneurs needing regulatory compliance (FSSAI, GST, MSME, Private Limited, Trademark, DSC, Import Export Code).
- **Finsocap Central Operations:** Dedicated CA/CS specialists and staff who verify documents, file on government portals, raise department clarifications, and issue final accredited licenses/certificates.
- **Partner Value Proposition:** High profit margin per service (₹300 - ₹5,000+), zero compliance headache, full digital tracking, dedicated relationship manager, and real-time SLA sync.

---

## 2. Technology & Architecture Discovery
1. **Host Dashboard:** Next.js 16 (App Router), React 19, Tailwind CSS, Lucide icons, Framer Motion.
2. **Backend API:** Spring Boot REST API at `https://finsocap.cloud/api/` with Bearer JWT stateless authentication.
3. **Partner API Specification (November 2026):** Exactly 30 dedicated operations covering:
   - Authentication (Registration, Login, Profile)
   - Customer Management (Onboard Customer, Directory)
   - Service Catalog & Dynamic JSON Schemas
   - Application Uploads & File Streaming
   - Drafts Workflow (Create, Edit, Versioned Submit)
   - Direct Submissions (Instant PENDING request)
   - Application Corrections (under PENDING_FROM_CLIENT)
   - Real-time Collaboration Chat (Partner <-> Staff/Admin with file attachments)
   - Document Requests Fulfillment (Re-upload requested notices/photos)
   - Completion & Certificate Retrieval

---

## 3. Partner Workflow & Lifecycle

```
[1. Partner Onboarding]
       │
       ▼
[2. Partner Login & Profile]
       │
       ▼
[3. Discover Services] ─── (Rate card, pricing snapshot, required documents, training videos)
       │
       ▼
[4. Customer Acquisition] ─── (Add client details, constitution type: Sole Prop, Pvt Ltd, etc.)
       │
       ▼
[5. Service Application] ─── (Fill dynamic schema questions, upload mandatory documents)
       │
       ▼
[6. Submission / Draft] ─── (Save Draft OR Direct Submit with instant Request Code T-xxx)
       │
       ▼
[7. Central SLA Processing] ─── (Assigned to CA Specialist e.g. Sandeep Maurya)
       │
       ├─► [PENDING_FROM_CLIENT] (Partner receives query, uploads clarification document)
       ├─► [Task Collaboration Chat] (Live chat with Specialist & Admin)
       │
       ▼
[8. Review & Approval] ─── (SENT_FOR_REVIEW)
       │
       ▼
[9. Completed & Delivered] ─── (Final License / Certificate unlocked for download)
       │
       ▼
[10. Partner Earnings & Commission] ─── (Credited to Partner balance, withdrawal ready)
```

---

## 4. Services Catalog Breakdown
| Category | Example Services | Govt Fee | Partner Profit | SLA | Required Documents |
|---|---|---|---|---|---|
| **Licenses & Registrations** | FSSAI Food License - Basic, State & Central | ₹100 | ₹300 - ₹1,200 | 2-3 Days | Photo, Aadhaar, Electricity Bill |
| **Taxation & GST** | GST Registration, Monthly Return Filing, Surrender | ₹0 | ₹500 - ₹2,000 | 3-5 Days | PAN, Rent Agreement, Bank Proof |
| **Corporate MCA** | Pvt Ltd Incorporation, LLP, Director KYC, Annual Filing | ₹1,000+ | ₹2,500 - ₹5,000 | 7-10 Days | DSC, PAN, DIN, MoA/AoA |
| **Digital Signature (DSC)** | Class 3 Individual / Combo Signing + Encryption | ₹300 | ₹400 - ₹800 | 1 Day | Video Verification, PAN, Aadhaar |
| **Intellectual Property** | Trademark Search & Filing, Copyright | ₹4,500 | ₹1,500 - ₹3,000 | 15-30 Days | Logo/Wordmark, Power of Attorney |
| **Business Certifications** | MSME / Udyam Registration, ISO 9001, Import Export Code | ₹0 - ₹500 | ₹300 - ₹1,500 | 1-2 Days | Aadhaar, Bank Cheque, Address Proof |

---

## 5. Partner Role Permissions & Security
- **Can:** Register, login, manage customers, explore services, create drafts, upload documents, chat with specialists, fulfill document requests, download certificates, view partner earnings.
- **Cannot:** Change internal staff review status arbitrarily (preventing fraud), reassign specialists, or mark tasks as completed without issued license certificates.

