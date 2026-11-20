# API_INTEGRATION_ANALYSIS.md
# FinSoCap Backend API Integration Analysis

## 1. Environment & Base URL
- **Production Endpoint:** `https://finsocap.cloud/api`
- **Authentication:** Stateless Bearer JWT via HTTP Header `Authorization: Bearer <token>`.
- **Role Scopes:** `PARTNER` role JWT for partner endpoints, `ADMIN` role for admin bridges.

---

## 2. All 30 Partner Operations Mapping Table

| Op # | HTTP Method & Path | Operation Name | Backend Supported? | Mobile App Prototype Status |
|---|---|---|---|---|
| **01** | `POST /api/partners/register` | Partner Registration (JSON) | Yes (Live) | Integrated + Demo fallback |
| **02** | `POST /api/partners/register-with-files` | Partner Registration + KYC | Yes (Live) | Integrated + Demo fallback |
| **03** | `POST /api/partners/login` | Partner Login | Yes (Live) | Integrated with One-Click Demo |
| **04** | `GET /api/partners/me` | Partner Profile | Yes (Live) | Integrated |
| **05** | `POST /api/partners/customers` | Create Customer | Yes (Live) | Integrated |
| **06** | `GET /api/partners/customers` | List Customers | Yes (Live) | Integrated |
| **07** | `GET /api/partners/services` | Active Services Catalog | Yes (Live) | Integrated with Local Catalog |
| **08** | `GET /api/partners/services/{id}/application-form` | Dynamic Form Version | Yes (Live) | Integrated with dynamic fields |
| **09** | `POST /api/partners/customers/{cId}/services/{sId}/documents` | Upload Application Doc | Yes (Live) | Integrated |
| **10** | `DELETE /api/partners/uploads/{uploadId}` | Remove Unattached Doc | Yes (Live) | Integrated |
| **11** | `POST /api/partners/customers/{cId}/service-requests` | Direct Submit Request | Yes (Live) | Integrated (Generates T-code) |
| **12** | `GET /api/partners/customers/{cId}/service-requests` | Requests for Customer | Yes (Live) | Integrated |
| **13** | `POST /api/partners/customers/{cId}/service-request-drafts` | Create Draft | Yes (Live) | Integrated |
| **14** | `GET /api/partners/customers/{cId}/service-request-drafts` | List Drafts | Yes (Live) | Integrated |
| **15** | `GET /api/partners/customers/{cId}/service-request-drafts/{dId}` | Get Draft | Yes (Live) | Integrated |
| **16** | `PUT /api/partners/customers/{cId}/service-request-drafts/{dId}` | Update Draft | Yes (Live) | Integrated |
| **17** | `DELETE /api/partners/customers/{cId}/service-request-drafts/{dId}` | Delete Draft | Yes (Live) | Integrated |
| **18** | `POST /api/partners/customers/{cId}/service-request-drafts/{dId}/submit` | Submit Draft | Yes (Live) | Integrated |
| **19** | `GET /api/partners/service-requests` | All Partner Requests (Paginated) | Yes (Live) | Integrated with filters |
| **20** | `GET /api/partners/service-requests/{taskId}` | Request Full Details & History | Yes (Live) | Integrated with timeline |
| **21** | `PUT /api/partners/service-requests/{taskId}/application` | Correct Application Answers | Yes (Live) | Integrated |
| **22** | `GET /api/request-documents/{docId}` | Download Original Uploaded File | Yes (Live) | Integrated |
| **23** | `GET /api/partners/service-requests/{taskId}/documents` | List Task Deliverables | Yes (Live) | Integrated |
| **24** | `GET /api/partners/service-requests/{taskId}/documents/{fileId}` | Download Deliverable File | Yes (Live) | Integrated |
| **25** | `GET /api/partners/service-requests/{taskId}/messages` | Poll Task Chat Messages | Yes (Live) | Integrated |
| **26** | `POST /api/partners/service-requests/{taskId}/messages` | Send Message + Attachment | Yes (Live) | Integrated |
| **27** | `GET /api/partners/service-requests/{taskId}/document-requests` | List Document Re-requests | Yes (Live) | Integrated |
| **28** | `POST /api/partners/service-requests/{taskId}/document-requests/{rId}/documents` | Upload Clarification File | Yes (Live) | Integrated |
| **29** | `POST /api/partners/service-requests/{taskId}/document-requests/{rId}/submit` | Submit Document Request | Yes (Live) | Integrated |
| **30** | `GET /api/partners/service-requests/{taskId}/completion` | Completion & Certificate Info | Yes (Live) | Integrated |

---

## 3. Data Integrity & Safety Rule
- To enable instantaneous standalone testing without depending on flaky remote connections or failing without network access, the mobile prototype comes with a **Dual-Mode Data Client**:
  1. **Demo Mode (Default for smooth zero-latency prototype preview):** Pre-populated with realistic Finsocap franchise data, customers, active service requests, and analytics.
  2. **Live Backend Sync:** Automatically connects to `https://finsocap.cloud/api/partners` when valid partner JWT credentials are provided.

