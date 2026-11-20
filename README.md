# Finsocap Partner Mobile App (Prototype)

A mobile application prototype for **Finsocap Franchise & Partner Operations**, designed with premium fintech visual aesthetics inspired by the reference design.

---

## 📱 Visual Inspiration & Design Language
- **4-Grid Metrics Cards:** Registrations (+₹26,100), Income (+₹17,600), Pvt Ltd & MCA (+₹20,800), DSC Key (+₹9,700).
- **Achievements & Badges:** 100% Clean Compliance Rate, Century Club 113+ Files.
- **Learning & Training Portal:** Quick-launch card for interactive Standard Operating Procedure (SOP) videos.
- **Dedicated Relationship Manager Widget:** Quick phone and messaging liaison (Vikram Singhania, Head of Pata Branches).
- **Bottom Navigation Dock:** Floating modern pill with Home, Applications, Services, Analytics, and More.

---

## 🚀 How to Run the Mobile App Prototype

```bash
# 1. Navigate to the isolated mobile app directory
cd partner-mobile-app

# 2. Start the local mobile development server
npm run dev
```

The application will launch on `http://localhost:3001` (or next available port).

---

## 🛠 Features Implemented
1. **Partner Authentication & Demo Switcher:** Instant one-click demo login as Shubham Jha (P-101 Franchisee).
2. **Interactive Rate Card (Services Marketplace):** Categorized browsing across FSSAI, GST, MCA, DSC, and MSME.
3. **Multi-Step Service Request Flow:**
   - Client and business information input.
   - Interactive document uploads (Photo, ID, Premises proof).
   - Review margin and live submission generating reference `T-ID`.
4. **Application Tracking & Status History:**
   - Real-time SLA milestones matching live backend rules.
   - In-app CA Specialist collaboration chat.
5. **Advanced Analytics & Revenue Growth:**
   - Multi-month commission bar graphs.
   - Category distribution donuts.
6. **Partner Learning Centre & Video Player:**
   - 6 categorized video training modules.
   - Playback simulator, key takeaways checklist, and official SOP downloads.
7. **Franchise Wallet & Payouts:**
   - Available balance view and instant bank payout request modal.

---

## 🔒 Existing Dashboard Safety
The web dashboard (`/app`, `/components`, `/lib`) remains **100% untouched**. All mobile prototype assets, source code, and configurations are isolated inside `/partner-mobile-app/`.

