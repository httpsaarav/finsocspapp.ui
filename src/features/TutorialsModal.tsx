import React, { useState } from 'react';
import { 
  Play, 
  GraduationCap, 
  Clock, 
  Eye, 
  CheckCircle2, 
  X, 
  Sparkles, 
  BookOpen, 
  ChevronRight, 
  ArrowLeft,
  FileCheck2,
  Compass,
  Receipt,
  KeyRound,
  MessageSquare,
  TrendingUp,
  Download
} from 'lucide-react';
import { mockTutorialVideos } from '../data/mockData';
import { TutorialVideo } from '../types';

interface TutorialsModalProps {
  initialVideoId?: string | null;
  onClose: () => void;
}

export const TutorialsModal: React.FC<TutorialsModalProps> = ({
  initialVideoId,
  onClose
}) => {
  const [selectedVideo, setSelectedVideo] = useState<TutorialVideo | null>(
    initialVideoId ? mockTutorialVideos.find(v => v.id === initialVideoId) || mockTutorialVideos[0] : null
  );

  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(35);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Compass": return <Compass className="w-4 h-4" />;
      case "FileCheck2": return <FileCheck2 className="w-4 h-4" />;
      case "Receipt": return <Receipt className="w-4 h-4" />;
      case "KeyRound": return <KeyRound className="w-4 h-4" />;
      case "MessageSquare": return <MessageSquare className="w-4 h-4" />;
      default: return <TrendingUp className="w-4 h-4" />;
    }
  };

  return (
    <div className="absolute inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex flex-col justify-end overflow-hidden animate-in fade-in duration-200">
      <div className="bg-white rounded-t-3xl w-full h-[90%] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom-5 duration-200">
        
        {/* Modal Top Bar */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-black text-slate-900">Partner Learning Centre</h3>
              <p className="text-[10px] text-slate-400 font-medium">Standard Operating Procedures &amp; Training</p>
            </div>
          </div>

          <button 
            type="button" 
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body: Active Video Player OR Video Catalog */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">

          {/* Active Video Player Stage (If video is selected) */}
          {selectedVideo && (
            <div className="space-y-3 bg-slate-50 p-3.5 rounded-3xl border border-slate-200 animate-in fade-in">
              
              {/* Responsive Video Screen Container */}
              <div className={`relative aspect-video rounded-2xl bg-gradient-to-br ${selectedVideo.thumbnailGradient} flex flex-col items-center justify-center text-white overflow-hidden shadow-lg shadow-indigo-900/20`}>
                
                {isPlaying ? (
                  <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center p-4 text-center space-y-3">
                    <div className="w-10 h-10 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin" />
                    <span className="text-xs font-bold text-emerald-400">Streaming Training Module...</span>
                    <button
                      type="button"
                      onClick={() => setIsPlaying(false)}
                      className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-[10px] text-slate-300 cursor-pointer"
                    >
                      Pause Preview
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => setIsPlaying(true)}
                      className="w-12 h-12 rounded-full bg-white text-indigo-700 flex items-center justify-center shadow-xl hover:scale-105 transition-all cursor-pointer tap-bounce"
                    >
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </button>
                    <span className="text-[11px] font-black uppercase tracking-wider mt-2 bg-black/30 px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                      {selectedVideo.category} • {selectedVideo.duration}
                    </span>
                  </>
                )}

                {/* Progress bar at bottom of video player */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                  <div 
                    className="h-full bg-emerald-400 transition-all duration-300"
                    style={{ width: isPlaying ? '68%' : '35%' }}
                  />
                </div>
              </div>

              {/* Video Title & Meta */}
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold text-indigo-600 uppercase tracking-wider">
                  {selectedVideo.category}
                </span>
                <h4 className="text-sm font-black text-slate-900 leading-snug">
                  {selectedVideo.title}
                </h4>
                <p className="text-xs text-slate-500 font-medium">
                  {selectedVideo.description}
                </p>
              </div>

              {/* Key Takeaways Checklist */}
              <div className="p-3 bg-white rounded-2xl border border-slate-100 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                  Key Learnings from this SOP
                </span>
                <div className="space-y-1.5">
                  {selectedVideo.keyTakeaways.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-slate-700 font-medium leading-tight">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Download SOP button */}
              <button
                type="button"
                onClick={() => alert(`Official SOP Document for "${selectedVideo.title}" downloaded.`)}
                className="w-full py-2.5 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer tap-bounce"
              >
                <Download className="w-3.5 h-3.5 text-indigo-600" />
                <span>Download Official SOP PDF</span>
              </button>

            </div>
          )}

          {/* Video Catalog List */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
              All Training Modules ({mockTutorialVideos.length})
            </h4>

            <div className="space-y-2">
              {mockTutorialVideos.map((video) => {
                const isCurrent = selectedVideo?.id === video.id;
                return (
                  <div
                    key={video.id}
                    onClick={() => {
                      setSelectedVideo(video);
                      setIsPlaying(false);
                    }}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer tap-bounce flex items-center justify-between ${
                      isCurrent 
                        ? "bg-indigo-50/70 border-indigo-200 shadow-xs" 
                        : "bg-white border-slate-100 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isCurrent ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600"
                      }`}>
                        {getCategoryIcon(video.iconName)}
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                          {video.category} • {video.duration}
                        </span>
                        <h5 className="text-xs font-bold text-slate-900 leading-tight">
                          {video.title}
                        </h5>
                      </div>
                    </div>

                    <Play className={`w-3.5 h-3.5 shrink-0 ${isCurrent ? "text-indigo-600 fill-current" : "text-slate-400"}`} />
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

