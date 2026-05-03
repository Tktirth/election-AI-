"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Target, ShieldCheck, MapPin } from "lucide-react";
import Onboarding from "@/components/Onboarding";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  const [onboarded, setOnboarded] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [journey, setJourney] = useState<any>(null);

  const handleOnboardComplete = async (profile: any) => {
    setUserProfile(profile);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/onboard`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });
      const data = await res.json();
      if (data.success) {
        setJourney(data.journey);
        setOnboarded(true);
      }
    } catch (error) {
      console.error("Failed to fetch journey", error);
      // Fallback or error handling
      setOnboarded(true); 
    }
  };

  return (
    <main className="min-h-screen p-4 md:p-8 flex flex-col items-center justify-center">
      <AnimatePresence mode="wait">
        {!onboarded ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <div className="space-y-8 relative">
              {/* Decorative Glow */}
              <div className="absolute -top-20 -left-20 w-72 h-72 bg-violet-600/20 rounded-full blur-[100px] pointer-events-none" />
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 mb-2 backdrop-blur-md shadow-[0_0_15px_rgba(139,92,246,0.1)]"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                </span>
                <span className="text-xs font-bold tracking-widest uppercase text-violet-300">AI-Powered Election Guide</span>
              </motion.div>
              
              <h1 className="text-6xl md:text-[5.5rem] lg:text-8xl font-black tracking-tighter leading-[0.9] mb-6 relative z-10 drop-shadow-2xl">
                Navigate Your <br/> Vote with <span className="text-premium">Confidence</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-300 max-w-lg leading-relaxed mb-8 font-light tracking-wide">
                The most advanced, step-by-step assistant for the Indian election process. Personalized, non-partisan, and completely free.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4 relative z-10">
                <div className="flex items-center gap-2 text-sm text-slate-200 font-semibold glass px-5 py-3 rounded-2xl hover:bg-white/10 transition-colors cursor-default border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
                  <ShieldCheck className="w-5 h-5 text-blue-400"/> Non-Partisan
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-200 font-semibold glass px-5 py-3 rounded-2xl hover:bg-white/10 transition-colors cursor-default border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
                  <MapPin className="w-5 h-5 text-violet-400"/> 28 States
                </div>
                <a href="/guide" className="flex items-center gap-2 text-sm font-bold text-white bg-violet-600/20 px-6 py-3 rounded-2xl border border-violet-500/30 hover:bg-violet-600/40 hover:border-violet-500/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all group">
                  Deep Dive Guide <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            <div className="animate-float glass-card p-8 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
              <Onboarding onComplete={handleOnboardComplete} />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="w-full max-w-7xl h-[90vh]"
          >
            <Dashboard userProfile={userProfile} journey={journey} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
