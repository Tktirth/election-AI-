"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Clock, Info, ShieldAlert, Target } from "lucide-react";
import AIChat from "./AIChat";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ChecklistItem {
  id: string | number;
  title: string;
  completed: boolean;
  description: string;
}

export default function Dashboard({ userProfile, journey }: { userProfile: any, journey: any }) {
  const [score, setScore] = useState(0);
  const [checklist, setChecklist] = useState<ChecklistItem[]>(journey?.checklist || [
    { id: 'reg', title: "Register to Vote", completed: userProfile.isRegistered, description: "Submit your voter registration form." },
    { id: 'doc', title: "Prepare Identification", completed: false, description: "Ensure you have a valid state ID or driver's license." },
    { id: 'loc', title: "Find Polling Station", completed: false, description: "Locate your designated voting venue." },
    { id: 'vote', title: "Cast Your Ballot", completed: false, description: "Go vote on election day!" },
  ]);

  useEffect(() => {
    // Calculate score based on checklist
    const completed = checklist.filter((c: ChecklistItem) => c.completed).length;
    const newScore = (completed / checklist.length) * 100;
    setTimeout(() => setScore(newScore), 500); // Animation delay
  }, [checklist]);

  const toggleCheck = (id: string | number) => {
    setChecklist(checklist.map((c: ChecklistItem) => c.id === id ? { ...c, completed: !c.completed } : c));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      {/* Left Column: Readiness & Timeline */}
      <div className="space-y-6 lg:col-span-2">
        {/* Readiness Score Card */}
        <Card className="glass-card border-none overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-32 bg-violet-600/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-violet-600/20 transition-colors" />
          <CardHeader>
            <CardTitle className="text-3xl font-black flex items-center gap-3">
              <Target className="text-violet-400 w-8 h-8" />
              <span className="text-premium">Election Readiness</span>
            </CardTitle>
            <CardDescription className="text-slate-400 text-base">Your personalized path to a successful vote</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="relative w-40 h-40 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90 drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                  <motion.circle 
                    cx="50" cy="50" r="44" fill="none" stroke="url(#score-gradient)" strokeWidth="6" 
                    strokeDasharray="276"
                    initial={{ strokeDashoffset: 276 }}
                    animate={{ strokeDashoffset: 276 - (276 * score) / 100 }}
                    transition={{ duration: 2, ease: "circOut" }}
                  />
                  <defs>
                    <linearGradient id="score-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#a78bfa" />
                      <stop offset="100%" stopColor="#c084fc" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-black text-white">{Math.round(score)}</span>
                  <span className="text-xs font-bold uppercase tracking-tighter text-slate-500">Percent</span>
                </div>
              </div>
              <div className="space-y-4 flex-1">
                <div className="space-y-1">
                  <h3 className="font-bold text-2xl text-white">
                    {score === 100 ? "Ready to Lead!" : score > 50 ? "Great Progress!" : "Let's Get Started"}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {score === 100 
                      ? "You are fully prepared for the election day. Don't forget to encourage others!" 
                      : "Complete your checklist to ensure your voice is heard in the upcoming elections."}
                  </p>
                </div>
                {score < 100 && (
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-400/5 px-4 py-2 rounded-xl border border-amber-400/10">
                    <ShieldAlert className="w-4 h-4" /> Action Required
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Checklist & Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Action Checklist */}
          <Card className="glass-card border-none h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-violet-400" />
                Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-4">
              {checklist.map((item, i) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => toggleCheck(item.id)}
                  className={`p-4 rounded-2xl cursor-pointer border transition-all duration-300 group shadow-sm ${
                    item.completed ? 'bg-violet-600/20 border-violet-500/40 shadow-[0_0_15px_rgba(139,92,246,0.15)]' : 'bg-black/20 border-white/5 hover:border-white/10 hover:bg-white/5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)]'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      {item.completed ? (
                        <div className="w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2 border-slate-700 group-hover:border-slate-500 transition-colors" />
                      )}
                    </div>
                    <div>
                      <p className={`font-bold text-sm ${item.completed ? 'text-violet-200' : 'text-slate-100'}`}>
                        {item.title}
                      </p>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card className="glass-card border-none h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Clock className="w-5 h-5 text-violet-400" />
                Critical Dates
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="relative pl-8 space-y-8 border-l-2 border-slate-800/50 ml-2">
                {journey?.timeline ? journey.timeline.map((item: any, i: number) => (
                  <div key={i} className={`relative group ${item.active ? '' : 'opacity-40 hover:opacity-70 transition-opacity'}`}>
                    <div className={`absolute w-5 h-5 rounded-full -left-[2.65rem] top-1 ring-4 ring-slate-900 transition-transform group-hover:scale-110 ${item.active ? 'bg-violet-400 shadow-[0_0_15px_rgba(167,139,250,0.8)]' : 'bg-slate-700'}`} />
                    <div>
                      <p className={`text-xs font-black uppercase tracking-tighter ${item.active ? 'text-violet-400' : 'text-slate-500'}`}>{item.date}</p>
                      <p className="text-base font-bold text-slate-100">{item.phase}</p>
                      {item.active && (
                        <span className="mt-2 inline-block text-[10px] font-black uppercase tracking-widest bg-violet-500 text-white px-2 py-0.5 rounded-md">
                          Current
                        </span>
                      )}
                    </div>
                  </div>
                )) : (
                  <p className="text-sm text-slate-500 italic">No timeline available</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Column: AI Chat */}
      <div className="h-full">
        <AIChat userProfile={userProfile} />
      </div>
    </div>
  );
}
