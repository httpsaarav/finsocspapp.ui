import React, { useState } from 'react';
import { 
  Home as HomeIcon, 
  FileText, 
  Settings2, 
  BarChart2, 
  User
} from 'lucide-react';
import { AndroidFrame } from './shared/AndroidFrame';
import { OnboardingScreen } from './features/OnboardingScreen';
import { AuthScreen } from './features/AuthScreen';
import { HomeScreen } from './features/HomeScreen';
import { ServicesScreen } from './features/ServicesScreen';
import { ServiceRequestFlow } from './features/ServiceRequestFlow';
import { ApplicationsScreen } from './features/ApplicationsScreen';
import { AnalyticsScreen } from './features/AnalyticsScreen';
import { ProfileScreen } from './features/ProfileScreen';
import { TutorialsModal } from './features/TutorialsModal';
import { CatalogServiceItem } from './types';
import { mockCatalogServices } from './data/mockData';

export function App() {
  // Navigation Flow States: ONBOARDING -> AUTH -> APP
  const [appStage, setAppStage] = useState<"ONBOARDING" | "AUTH" | "APP">("ONBOARDING");
  const [activeTab, setActiveTab] = useState<string>("home");

  // Flow & Modal States
  const [activeApplyService, setActiveApplyService] = useState<CatalogServiceItem | null>(null);
  const [selectedTrackingRequestId, setSelectedTrackingRequestId] = useState<string | null>(null);
  const [tutorialModalVideoId, setTutorialModalVideoId] = useState<string | null | undefined>(null);
  const [isTutorialModalOpen, setIsTutorialModalOpen] = useState(false);

  // Content Renderer based on active stage & tab
  const isInsideDetail = Boolean(selectedTrackingRequestId || activeApplyService);

  const renderScreen = () => {
    // 1. FIRST TIME INSTALL: 4 Interactive Onboarding Slides with 3D Illustrations
    if (appStage === "ONBOARDING") {
      return (
        <OnboardingScreen 
          onFinish={() => setAppStage("AUTH")}
        />
      );
    }

    // 2. AUTH STAGE: Professional Sign In & Franchise Partner Registration
    if (appStage === "AUTH") {
      return (
        <AuthScreen 
          onLoginSuccess={() => setAppStage("APP")}
          onBackToOnboarding={() => setAppStage("ONBOARDING")}
        />
      );
    }

    // 3. APPLICATION WORKFLOW MODAL
    if (activeApplyService) {
      return (
        <ServiceRequestFlow 
          service={activeApplyService}
          onBack={() => setActiveApplyService(null)}
          onCompleted={(newReqId: string) => {
            setActiveApplyService(null);
            setSelectedTrackingRequestId(newReqId);
            setActiveTab("applications");
          }}
        />
      );
    }

    // 4. MAIN APP TABS
    switch (activeTab) {
      case "home":
        return (
          <HomeScreen 
            onNavigateTab={(tab: string) => {
              setActiveApplyService(null);
              setSelectedTrackingRequestId(null);
              setActiveTab(tab);
            }}
            onSelectService={(srv: CatalogServiceItem) => setActiveApplyService(srv)}
            onSelectRequest={(reqId: string) => {
              setSelectedTrackingRequestId(reqId);
              setActiveTab("applications");
            }}
            onOpenNewRequest={() => {
              // Navigate directly to Services catalog so user can view and select any service to apply
              setActiveApplyService(null);
              setSelectedTrackingRequestId(null);
              setActiveTab("services");
            }}
            onOpenTutorial={(videoId?: string) => {
              setTutorialModalVideoId(videoId);
              setIsTutorialModalOpen(true);
            }}
          />
        );

      case "applications":
        return (
          <ApplicationsScreen 
            initialRequestId={selectedTrackingRequestId}
            onSelectRequestId={(id) => setSelectedTrackingRequestId(id)}
            onBackToHome={() => {
              setSelectedTrackingRequestId(null);
              setActiveTab("home");
            }}
          />
        );

      case "services":
        return (
          <ServicesScreen 
            onApplyService={(service: CatalogServiceItem) => setActiveApplyService(service)}
            onBackToHome={() => setActiveTab("home")}
          />
        );

      case "analytics":
        return (
          <AnalyticsScreen />
        );

      case "profile":
        return (
          <ProfileScreen 
            onOpenTutorials={() => {
              setTutorialModalVideoId(undefined);
              setIsTutorialModalOpen(true);
            }}
            onLogout={() => {
              setAppStage("AUTH");
              setActiveTab("home");
            }}
          />
        );

      default:
        return (
          <HomeScreen 
            onNavigateTab={(tab: string) => setActiveTab(tab)}
            onSelectService={(srv: CatalogServiceItem) => setActiveApplyService(srv)}
            onSelectRequest={(reqId: string) => {
              setSelectedTrackingRequestId(reqId);
              setActiveTab("applications");
            }}
            onOpenNewRequest={() => {
              setActiveApplyService(null);
              setSelectedTrackingRequestId(null);
              setActiveTab("services");
            }}
            onOpenTutorial={(videoId?: string) => {
              setTutorialModalVideoId(videoId);
              setIsTutorialModalOpen(true);
            }}
          />
        );
    }
  };

  return (
    <AndroidFrame>
      <div className="relative w-full h-full flex flex-col bg-[#f8fafc] overflow-hidden">
        
        {/* Dynamic Screen Viewport with smooth scroll */}
        <div className="flex-1 w-full overflow-y-auto overflow-x-hidden relative flex flex-col">
          {renderScreen()}
        </div>

        {/* Floating Modern Bottom Navigation Dock inside Phone (Only visible in top-level tabs, hidden inside sub-screens & modals) */}
        {appStage === "APP" && !isInsideDetail && (
          <nav className="absolute bottom-3 left-4 right-4 z-40">
            <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-[28px] p-1.5 flex items-center justify-around shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
              
              {/* 1. Home */}
              <button
                type="button"
                onClick={() => {
                  setActiveApplyService(null);
                  setSelectedTrackingRequestId(null);
                  setActiveTab("home");
                }}
                className={`flex-1 py-1.5 flex flex-col items-center justify-center gap-0.5 rounded-2xl transition-all cursor-pointer ${
                  activeTab === "home" ? "text-indigo-600 font-extrabold" : "text-slate-400 font-semibold hover:text-slate-600"
                }`}
              >
                <div className={`p-1 rounded-xl transition-all ${activeTab === "home" ? "bg-indigo-50" : ""}`}>
                  <HomeIcon className={`w-5 h-5 ${activeTab === "home" ? "stroke-[2.5]" : "stroke-[1.8]"}`} />
                </div>
                <span className="text-[10px] tracking-tight">Home</span>
              </button>

              {/* 2. Applications */}
              <button
                type="button"
                onClick={() => {
                  setActiveApplyService(null);
                  setActiveTab("applications");
                }}
                className={`flex-1 py-1.5 flex flex-col items-center justify-center gap-0.5 rounded-2xl transition-all cursor-pointer ${
                  activeTab === "applications" ? "text-indigo-600 font-extrabold" : "text-slate-400 font-semibold hover:text-slate-600"
                }`}
              >
                <div className={`p-1 rounded-xl transition-all ${activeTab === "applications" ? "bg-indigo-50" : ""}`}>
                  <FileText className={`w-5 h-5 ${activeTab === "applications" ? "stroke-[2.5]" : "stroke-[1.8]"}`} />
                </div>
                <span className="text-[10px] tracking-tight">Applications</span>
              </button>

              {/* 3. Services */}
              <button
                type="button"
                onClick={() => {
                  setActiveApplyService(null);
                  setSelectedTrackingRequestId(null);
                  setActiveTab("services");
                }}
                className={`flex-1 py-1.5 flex flex-col items-center justify-center gap-0.5 rounded-2xl transition-all cursor-pointer ${
                  activeTab === "services" ? "text-indigo-600 font-extrabold" : "text-slate-400 font-semibold hover:text-slate-600"
                }`}
              >
                <div className={`p-1 rounded-xl transition-all ${activeTab === "services" ? "bg-indigo-50" : ""}`}>
                  <Settings2 className={`w-5 h-5 ${activeTab === "services" ? "stroke-[2.5]" : "stroke-[1.8]"}`} />
                </div>
                <span className="text-[10px] tracking-tight">Services</span>
              </button>

              {/* 4. Analytics */}
              <button
                type="button"
                onClick={() => {
                  setActiveApplyService(null);
                  setSelectedTrackingRequestId(null);
                  setActiveTab("analytics");
                }}
                className={`flex-1 py-1.5 flex flex-col items-center justify-center gap-0.5 rounded-2xl transition-all cursor-pointer ${
                  activeTab === "analytics" ? "text-indigo-600 font-extrabold" : "text-slate-400 font-semibold hover:text-slate-600"
                }`}
              >
                <div className={`p-1 rounded-xl transition-all ${activeTab === "analytics" ? "bg-indigo-50" : ""}`}>
                  <BarChart2 className={`w-5 h-5 ${activeTab === "analytics" ? "stroke-[2.5]" : "stroke-[1.8]"}`} />
                </div>
                <span className="text-[10px] tracking-tight">Analytics</span>
              </button>

              {/* 5. More / Profile */}
              <button
                type="button"
                onClick={() => {
                  setActiveApplyService(null);
                  setSelectedTrackingRequestId(null);
                  setActiveTab("profile");
                }}
                className={`flex-1 py-1.5 flex flex-col items-center justify-center gap-0.5 rounded-2xl transition-all cursor-pointer ${
                  activeTab === "profile" ? "text-indigo-600 font-extrabold" : "text-slate-400 font-semibold hover:text-slate-600"
                }`}
              >
                <div className={`p-1 rounded-xl transition-all ${activeTab === "profile" ? "bg-indigo-50" : ""}`}>
                  <User className={`w-5 h-5 ${activeTab === "profile" ? "stroke-[2.5]" : "stroke-[1.8]"}`} />
                </div>
                <span className="text-[10px] tracking-tight">More</span>
              </button>

            </div>
          </nav>
        )}

        {/* Tutorial Video Player Modal */}
        {isTutorialModalOpen && (
          <TutorialsModal 
            initialVideoId={tutorialModalVideoId}
            onClose={() => setIsTutorialModalOpen(false)}
          />
        )}

      </div>
    </AndroidFrame>
  );
}

export default App;
