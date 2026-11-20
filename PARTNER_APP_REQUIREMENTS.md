# PARTNER_APP_REQUIREMENTS.md
# Finsocap Partner Mobile App – Requirements Specification

## 1. Design Reference & Visual Inspiration
Based on the reference three-screen fintech design (`Finsocap/Assets/app.png` and `app-mockup.png`):
- **Header:** Personalized greeting ("Hello, Partner 👋", "Pata Branch AFC104 ▾"), Finsocap logo with vibrant gradient accent, bell notification with unread badge, partner initials badge (`AP`).
- **Summary Cards (4-Grid):**
  - Registrations: `+₹26,100` (Emerald icon)
  - Income: `+₹17,600` (Sky blue swap icon)
  - Pvt Ltd & MCA: `+₹20,800` (Teal corporate icon)
  - DSC Key: `+₹9,700` (Green shield icon)
- **Achievements & Badges:**
  - "100% Clean Compliance Rate" (Award shield)
  - "Century Club 113+ Files" (Trophy cup)
- **Interactive Banners:**
  - "Learning & Training Portal" (Graduate cap, "Watch training videos, guides and product updates →")
- **Dedicated Relationship Manager Card:**
  - Avatar, Name ("Vikram Singhania", Head of Pata Branches), Quick Call button (`tel:`), Quick Chat button (`chat:`).
- **Bottom Navigation Bar (Floating Pill / Modern Dock):**
  - 🏠 Home
  - 📋 Applications / My Requests
  - ⚙️ Services
  - 📊 Analytics
  - 👤 Profile / More

---

## 2. Core Functional Modules

### A. Authentication & Onboarding
1. Splash Screen with Finsocap animated logo and tagline.
2. 3-step feature onboarding with interactive cards.
3. Partner Login (Email/Phone + Password with show/hide and validation).
4. Quick Demo Switcher ("Login as Shubham Jha (P-101 Franchisee)" or "Enter Custom Credentials").
5. Partner Registration with KYC upload (Aadhaar, PAN, Shop photo).

### B. Home Dashboard
1. Real-time metric cards (Total Requests, In Progress, Review, Completed, Earnings).
2. Live SLA Sync badge.
3. Quick Actions: "New Service Request", "Track by ID", "Commission Wallet", "Training Video".
4. Recent Activity Stream with real status badges and timestamps.
5. Dedicated Relationship Manager contact widget.

### C. Services Marketplace & Directory
1. 6 Categorized pills: All, Licenses, Taxation, MCA/Corporate, DSC, Certifications.
2. Instant search by service name or keyword (e.g. "FSSAI", "GST", "Pvt Ltd").
3. Rich service cards with Retail Price, Partner Profit, SLA time, and "Apply Now" button.
4. Comprehensive Service Details Sheet with:
   - Overview & Govt Authority
   - Required Documents checklist
   - Step-by-step workflow milestones
   - Profit breakdown calculator
   - FAQs & Training Guide button

### D. Interactive 5-Step Service Request Flow
1. **Customer Selection:** Pick existing customer or register new customer inline.
2. **Service & Plan Review:** View government fee + partner commission snapshot.
3. **Application Details:** Dynamic form (Business Name, Constitution Type, Address, City, PIN code).
4. **Document Uploads:** File picker with drag-drop/tap upload simulation, file size checks, and instant preview.
5. **Review & Submit:** Overview sheet with "Direct Submit" or "Save as Draft", generating live code `T-xxxx` with Confetti animation.

### E. My Requests & Live Status Tracker
1. Segmented filters: All, Pending, In Progress, Review, Completed, Action Required.
2. Search requests by ID, Client Name, or Service.
3. Request Detail Page:
   - Status Timeline (Submitted ➔ In Progress ➔ Department ➔ Review ➔ Completed)
   - Assigned Specialist Profile (e.g., Sandeep Maurya)
   - Submitted Documents viewer
   - Document Requests Fulfillment (upload requested notice/photograph)
   - In-app Chat with Specialist
   - Certificate Download (when Completed)

### F. Advanced Analytics & Infographics
1. Time Filters: Daily, Weekly, Monthly, Yearly.
2. Interactive Donut Chart for Service Distribution.
3. Animated Bar Chart for Monthly Earnings (₹12,400 to ₹48,600).
4. SLA Compliance & On-Time Delivery Gauge (98.4%).
5. Top Performing Services leaderboard.
6. Growth percentage indicator (+24.8% MoM).

### G. Video Tutorial & Learning Centre
1. 8 Dedicated Training Modules:
   - "Getting Started with Finsocap Partner Portal"
   - "FSSAI License Filing from Scratch"
   - "GST New Registration & Document Verification"
   - "Class 3 DSC Issuance in 15 Minutes"
   - "How to Resolve Client Document Objections"
   - "Maximizing Monthly Commission & Referral Bonus"
   - "Handling Department Queries & Resubmissions"
   - "Direct Contact with Central CA Specialist"
2. Interactive In-App Video Player modal with playback controls, progress bar, duration, notes, and downloadable SOP guide.

### H. Partner Profile, Wallet & Relationship Manager
1. Profile card with Partner ID (P-101), Branch Code (AFC104), KYC Approved status.
2. Earnings & Commission Wallet: Available balance, pending payout, bank account details.
3. Dedicated Relationship Manager quick call/message.
4. Settings: Dark/Light Mode toggle, Notification preferences, Security, Logout.

