"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function AIChat({ userProfile }: { userProfile: any }) {
  const [messages, setMessages] = useState([
    { role: "ai", text: `Hi! I'm your Election Navigator. I see you're from ${userProfile.state || 'your state'}. How can I help you today?` }
  ]);
  const [input, setInput] = useState("");
  const [explainLike15, setExplainLike15] = useState(false);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    setMessages(prev => [...prev, { role: "user", text }]);
    setInput("");
    setLoading(true);

    // Call the backend API
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: text,
          context: userProfile,
          explainLikeIm15: explainLike15
        })
      });
      
      const data = await res.json();
      
      if (data.success) {
        setMessages(prev => [...prev, { role: "ai", text: data.aiResponse.text }]);
      } else {
        throw new Error('Failed to get AI response');
      }
      setLoading(false);
    } catch (error) {
      setMessages(prev => [...prev, { role: "ai", text: "Sorry, I'm having trouble connecting to the server." }]);
      setLoading(false);
    }
  };

  const suggestions = [
    "What ID do I need?",
    "Where is my polling place?",
    "Am I registered?"
  ];

  return (
    <Card className="glass-card border-none h-full flex flex-col">
      <CardHeader className="pb-3 border-b border-white/5 bg-white/[0.02]">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Bot className="text-violet-400 w-5 h-5" />
            <span className="text-premium">AI Assistant</span>
          </CardTitle>
          <div className="flex items-center space-x-3">
            <div className="flex flex-col items-end">
              <Label htmlFor="eli5" className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1 cursor-pointer">
                ELI15 Mode
              </Label>
              <Switch 
                id="eli5" 
                checked={explainLike15}
                onCheckedChange={setExplainLike15}
                className="data-[state=checked]:bg-violet-500 scale-90"
              />
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
        {messages.map((msg, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-md transition-all ${
              msg.role === 'user' 
                ? 'premium-gradient text-white rounded-tr-sm shadow-[0_4px_15px_rgba(167,139,250,0.3)]' 
                : 'bg-black/30 text-slate-200 rounded-tl-sm border border-white/10 backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.2)] hover:border-white/20 hover:bg-black/40'
            }`}>
              {msg.text}
            </div>
          </motion.div>
        ))}
        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/10 flex gap-1.5 shadow-lg">
              <span className="w-2 h-2 bg-violet-500/50 rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-violet-500/50 rounded-full animate-bounce delay-150" />
              <span className="w-2 h-2 bg-violet-500/50 rounded-full animate-bounce delay-300" />
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </CardContent>

      <div className="p-6 bg-white/[0.02] border-t border-white/5">
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
          {suggestions.map((s, i) => (
            <button 
              key={i}
              onClick={() => handleSend(s)}
              className="whitespace-nowrap text-xs font-bold bg-black/30 hover:bg-white/10 text-slate-300 px-4 py-2 rounded-xl border border-white/5 hover:border-white/20 transition-all active:scale-95 shadow-sm"
            >
              {s}
            </button>
          ))}
        </div>
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
          className="relative group"
        >
          <Input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about voting..." 
            className="h-12 bg-black/40 border-white/10 pr-12 focus-visible:ring-1 focus-visible:ring-violet-500/50 rounded-xl transition-all focus:bg-black/60 shadow-inner text-white placeholder:text-slate-500"
          />
          <button 
            type="submit"
            disabled={!input.trim() || loading}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-violet-500 text-white flex items-center justify-center disabled:opacity-30 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-violet-500/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </Card>
  );
}
