"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface UserProfile {
  age: string;
  state: string;
  isRegistered: boolean | null;
}

export default function Onboarding({ onComplete }: { onComplete: (profile: any) => void }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    age: "",
    state: "",
    isRegistered: null,
  });

  const handleNext = async () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setLoading(true);
      // Simulate backend processing
      setTimeout(() => {
        onComplete(profile);
        setLoading(false);
      }, 1500);
    }
  };

  const variants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <Card className="glass border-none shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
      <CardHeader className="text-center pb-2">
        <div className="flex justify-center mb-2">
          <div className="p-2 bg-violet-500/20 rounded-full">
            <Sparkles className="w-5 h-5 text-violet-400" />
          </div>
        </div>
        <CardTitle className="text-3xl font-black tracking-tight text-white">Let's get started</CardTitle>
        <CardDescription className="text-slate-400 font-medium">Step {step} of 3</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="w-full bg-white/5 h-1 rounded-full mb-8 overflow-hidden">
          <motion.div 
            className="premium-gradient h-full"
            initial={{ width: "33%" }}
            animate={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" variants={variants} initial="initial" animate="animate" exit="exit" className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="age" className="text-sm font-bold uppercase tracking-widest text-slate-400">How old are you?</Label>
                <Input 
                  id="age" 
                  type="number" 
                  placeholder="e.g. 18" 
                  value={profile.age}
                  onChange={(e) => setProfile({...profile, age: e.target.value})}
                  className="h-14 bg-black/40 border-white/10 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 rounded-2xl text-lg font-medium transition-all shadow-inner text-white placeholder:text-slate-500"
                />
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" variants={variants} initial="initial" animate="animate" exit="exit" className="space-y-6">
              <div className="space-y-3">
                <Label className="text-sm font-bold uppercase tracking-widest text-slate-400">Which state do you live in?</Label>
                <Select onValueChange={(val: string | null) => val && setProfile({...profile, state: val})}>
                  <SelectTrigger className="w-full h-14 bg-black/40 border-white/10 text-slate-200 rounded-2xl text-base font-medium focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 transition-all shadow-inner">
                    <SelectValue placeholder="Select an Indian state" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-white/10 text-white max-h-72 overflow-y-auto rounded-2xl">
                    <SelectItem value="AP">Andhra Pradesh</SelectItem>
                    <SelectItem value="AR">Arunachal Pradesh</SelectItem>
                    <SelectItem value="AS">Assam</SelectItem>
                    <SelectItem value="BR">Bihar</SelectItem>
                    <SelectItem value="CG">Chhattisgarh</SelectItem>
                    <SelectItem value="GA">Goa</SelectItem>
                    <SelectItem value="GJ">Gujarat</SelectItem>
                    <SelectItem value="HR">Haryana</SelectItem>
                    <SelectItem value="HP">Himachal Pradesh</SelectItem>
                    <SelectItem value="JH">Jharkhand</SelectItem>
                    <SelectItem value="KA">Karnataka</SelectItem>
                    <SelectItem value="KL">Kerala</SelectItem>
                    <SelectItem value="MP">Madhya Pradesh</SelectItem>
                    <SelectItem value="MH">Maharashtra</SelectItem>
                    <SelectItem value="MN">Manipur</SelectItem>
                    <SelectItem value="ML">Meghalaya</SelectItem>
                    <SelectItem value="MZ">Mizoram</SelectItem>
                    <SelectItem value="NL">Nagaland</SelectItem>
                    <SelectItem value="OD">Odisha</SelectItem>
                    <SelectItem value="PB">Punjab</SelectItem>
                    <SelectItem value="RJ">Rajasthan</SelectItem>
                    <SelectItem value="SK">Sikkim</SelectItem>
                    <SelectItem value="TN">Tamil Nadu</SelectItem>
                    <SelectItem value="TG">Telangana</SelectItem>
                    <SelectItem value="TR">Tripura</SelectItem>
                    <SelectItem value="UP">Uttar Pradesh</SelectItem>
                    <SelectItem value="UK">Uttarakhand</SelectItem>
                    <SelectItem value="WB">West Bengal</SelectItem>
                    <SelectItem value="DL">Delhi (NCT)</SelectItem>
                    <SelectItem value="JK">Jammu & Kashmir</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" variants={variants} initial="initial" animate="animate" exit="exit" className="space-y-6">
              <div className="space-y-3">
                <Label className="text-sm font-bold uppercase tracking-widest text-slate-400">Are you registered to vote?</Label>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setProfile({...profile, isRegistered: true})}
                    className={`h-16 rounded-2xl border font-bold transition-all ${profile.isRegistered === true ? 'bg-violet-600/90 border-violet-400 text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]' : 'bg-black/40 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20'}`}
                  >
                    Yes
                  </button>
                  <button 
                    onClick={() => setProfile({...profile, isRegistered: false})}
                    className={`h-16 rounded-2xl border font-bold transition-all ${profile.isRegistered === false ? 'bg-violet-600/90 border-violet-400 text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]' : 'bg-black/40 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20'}`}
                  >
                    No / Not Sure
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-4 pt-10">
          {step > 1 && (
            <Button 
              variant="outline" 
              onClick={() => setStep(step - 1)}
              className="flex-1 h-14 rounded-2xl border-white/10 bg-transparent text-slate-300 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all shadow-[0_4px_15px_rgba(0,0,0,0.2)]"
            >
              <ChevronLeft className="w-5 h-5 mr-1" /> Back
            </Button>
          )}
          <Button 
            onClick={handleNext} 
            disabled={loading || (step === 1 && !profile.age) || (step === 2 && !profile.state) || (step === 3 && profile.isRegistered === null)}
            className="flex-[2] h-14 rounded-2xl premium-gradient text-white font-bold hover:opacity-100 hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] border border-white/10 disabled:opacity-50 disabled:hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </div>
            ) : (
              <div className="flex items-center text-lg tracking-wide">
                {step === 3 ? "Launch Journey" : "Next Step"}
                <ChevronRight className="w-5 h-5 ml-1" />
              </div>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
