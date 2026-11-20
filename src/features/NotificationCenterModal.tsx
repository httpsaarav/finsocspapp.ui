import React, { useState } from 'react';
import { 
  Bell, 
  X, 
  CheckCheck, 
  Clock, 
  FileCheck2, 
  AlertCircle, 
  ShieldCheck, 
  Receipt, 
  ChevronRight,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export interface NotificationItem {
  id: string;
  type: 'PAYMENT' | 'VERIFICATION' | 'STATUS' | 'ALERT';
  title: string;
  description: string;
  time: string;
  isRead: boolean;
  linkText?: string;
  linkTab?: string;
  requestId?: string;
}

interface NotificationCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: string, reqId?: string) => void;
}

export const NotificationCenterModal: React.FC<NotificationCenterModalProps> = ({
  isOpen,
  onClose,
  onNavigateTab
}) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      type: 'PAYMENT',
      title: 'Payment Settlement Required',
      description: 'FSSAI Basic registration for Ravi Entertainment completed. Pay ₹1,200 to Finsocap to download official certificate.',
      time: '10m ago',
      isRead: false,
      linkText: 'Pay Now →',
      linkTab: 'applications',
      requestId: 'REQ-0021'
    },
    {
      id: 'notif-2',
      type: 'STATUS',
      title: 'FoSCoS Inspection Waived',
      description: 'Senior Liaison Officer Sandeep Maurya successfully waived physical premises inspection for #0092.',
      time: '1h ago',
      isRead: false,
      linkText: 'View Task →',
      linkTab: 'applications',
      requestId: 'REQ-0019'
    },
    {
      id: 'notif-3',
      type: 'VERIFICATION',
      title: 'Government CCA Key Issued',
      description: 'Class 3 DSC USB Token encryption credentials verified and dispatched via courier.',
      time: '3h ago',
      isRead: true,
      linkText: 'Track Courier →',
      linkTab: 'applications',
      requestId: 'REQ-0019'
    },
    {
      id: 'notif-4',
      type: 'ALERT',
      title: 'Monthly Margin Goal Reached',
      description: 'Congratulations! Pata branch has achieved 99.4% SLA rate with ₹32,400 available commission.',
      time: 'Yesterday',
      isRead: true,
      linkText: 'View Insights →',
      linkTab: 'analytics'
    }
  ]);

  if (!isOpen) return null;

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const handleItemClick = (n: NotificationItem) => {
    setNotifications(prev => prev.map(item => item.id === n.id ? { ...item, isRead: true } : item));
    if (n.linkTab) {
      onClose();
      onNavigateTab(n.linkTab, n.requestId);
    }
  };

  return (
    <div className="absolute inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex flex-col justify-end overflow-hidden animate-in fade-in duration-200">
      <div className="bg-white rounded-t-[32px] w-full max-h-[85%] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom-6 duration-200">
        
        {/* Top Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Bell className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900 leading-tight">Notification Center</h3>
              <p className="text-[10px] text-slate-400 font-medium">
                {unreadCount > 0 ? `${unreadCount} unread alerts` : 'All caught up!'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllRead}
                className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 px-2 py-1 rounded-lg hover:bg-indigo-50 transition-colors cursor-pointer"
              >
                Mark read
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center cursor-pointer transition-all active:scale-95"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notifications Scroll List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {notifications.map((n) => {
            const getIcon = () => {
              switch (n.type) {
                case 'PAYMENT':
                  return <Receipt className="w-4 h-4 text-amber-600" />;
                case 'VERIFICATION':
                  return <ShieldCheck className="w-4 h-4 text-emerald-600" />;
                case 'STATUS':
                  return <Clock className="w-4 h-4 text-indigo-600" />;
                default:
                  return <Sparkles className="w-4 h-4 text-purple-600" />;
              }
            };

            const getIconBg = () => {
              switch (n.type) {
                case 'PAYMENT':
                  return 'bg-amber-50 border-amber-200';
                case 'VERIFICATION':
                  return 'bg-emerald-50 border-emerald-200';
                case 'STATUS':
                  return 'bg-indigo-50 border-indigo-200';
                default:
                  return 'bg-purple-50 border-purple-200';
              }
            };

            return (
              <div
                key={n.id}
                onClick={() => handleItemClick(n)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer tap-bounce space-y-2 ${
                  n.isRead
                    ? 'bg-white border-slate-100 text-slate-700'
                    : 'bg-indigo-50/40 border-indigo-200 text-slate-900 shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    <div className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 ${getIconBg()}`}>
                      {getIcon()}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-black text-slate-900 leading-tight">{n.title}</h4>
                        {!n.isRead && (
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-0.5">
                        {n.description}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400 shrink-0 whitespace-nowrap">
                    {n.time}
                  </span>
                </div>

                {n.linkText && (
                  <div className="flex justify-end pt-1">
                    <span className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                      {n.linkText}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
          <p className="text-[10px] text-slate-400 font-medium">
            Push notifications powered by Finsocap Partner Realtime Broker
          </p>
        </div>

      </div>
    </div>
  );
};

