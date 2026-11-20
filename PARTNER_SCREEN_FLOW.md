# PARTNER_SCREEN_FLOW.md
# Screen-to-Screen Navigation Architecture

```
[Splash Screen] 
      │ (auto or tap)
      ▼
[Onboarding Carousel (3 Slides)]
      │
      ▼
[Partner Login / Register Modal]
      │
      ▼
========================= MAIN APP (Bottom Navigation) =========================
   │                 │                    │                │              │
[🏠 Home]       [⚙️ Services]        [📋 My Requests]   [📊 Analytics]  [👤 Profile]
   │                 │                    │                │              │
   ├─ Quick Action   ├─ Category Filter   ├─ Status Tabs   ├─ Time Filter ├─ KYC Status
   ├─ Summary 4-Grid ├─ Search Bar        ├─ Search ID     ├─ Donut Chart ├─ Commission
   ├─ Learning Card  ├─ Service Card      ├─ Request Card  ├─ Bar Chart   ├─ Bank Info
   └─ RM Card        │                    │                └─ Top Services├─ Settings
                     ▼                    ▼                               └─ Support
              [Service Details]     [Request Details]
                     │                    │
                     ▼                    ├─ Status Timeline
             [5-Step Request Flow]        ├─ Specialist Info
             1. Select Customer           ├─ Document Viewer
             2. Service Plan              ├─ Query Resolution
             3. Form Answers              ├─ Chat with CA
             4. Document Upload           └─ Download Certificate
             5. Review & Submit
                     │
                     ▼
             [Success Confetti & ID]
                     │
                     ▼
             (Redirects to Request Tracking)
```

## Secondary & Modal Screens
- 🔔 **Notifications Drawer:** Real-time push updates on SLA changes, approval notices, and commission payouts.
- 🎓 **Training Video Player Modal:** Full player with chapter markers, duration, and PDF SOP download.
- 💬 **Live Specialist Chat Screen:** Dedicated conversation thread per task with file attachments.
- 💳 **Wallet & Payout Modal:** Request instant payout to registered bank account.
- 👥 **Add New Customer Sheet:** Fast modal form to onboard applicant with constitution type.

