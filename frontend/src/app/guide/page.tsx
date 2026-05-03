"use client";

import { useState, useRef, useEffect } from "react";
import "./guide.css";

export default function GuidePage() {
  const [activeTab, setActiveTab] = useState("phases");
  const [activePhase, setActivePhase] = useState(0);
  const [messages, setMessages] = useState([
    { role: "assistant", text: "<strong>Welcome to ElectIQ.</strong> I'm your election intelligence guide. I can explain any part of the U.S. democratic process — from how a candidacy is declared to how the Electoral College vote is certified.<br /><br />Ask me anything: timelines, voting rights, how Electoral College math works, what happens if there's a tie, or what 'safe harbor' means. I'll give you a clear, factual answer." }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg = { role: "user", text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: text,
          context: { state: "all", isRegistered: true }, // Default context for guide
          explainLikeIm15: false
        })
      });
      const data = await res.json();
      if (data.success) {
        setMessages(prev => [...prev, { role: "assistant", text: data.aiResponse.text.replace(/\n/g, '<br/>') }]);
      } else {
        throw new Error("Failed");
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: "assistant", text: "⚠️ Connection error. Please check your network and try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFaq = (idx: number) => {
    setFaqOpen(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
  };

  return (
    <div className="electiq-container">
      <header className="electiq-header">
        <div className="header-top">
          <div className="logo">
            <div>
              <div className="logo-main">Elect<span>IQ</span></div>
              <div className="logo-tagline">The Election Intelligence Platform</div>
            </div>
          </div>
          <div className="header-meta">
            <div className="live-badge">
              <div className="live-dot"></div>
              AI-Powered Guide
            </div>
          </div>
        </div>
        <nav className="header-nav">
          <button className={`nav-tab ${activeTab === 'phases' ? 'active' : ''}`} onClick={() => setActiveTab('phases')}>Election Phases</button>
          <button className={`nav-tab ${activeTab === 'glossary' ? 'active' : ''}`} onClick={() => setActiveTab('glossary')}>Glossary</button>
          <button className={`nav-tab ${activeTab === 'faq' ? 'active' : ''}`} onClick={() => setActiveTab('faq')}>FAQ</button>
        </nav>
      </header>

      <div className="app-shell">
        <div className="main-panel" id="main-panel">
          <div className="hero">
            <div className="hero-eyebrow">Interactive Guide</div>
            <h1>Understanding the<br /><em>Democratic Election</em> Process</h1>
            <p className="hero-sub">Walk through each phase of a U.S. federal election — from candidacy declarations to certification. Ask the AI assistant any question at any step.</p>
          </div>

          <div className="quick-chips">
            <span className="chips-label">Ask about →</span>
            {["Electoral College", "Voter Registration", "Election Day", "Certification", "Gerrymandering", "Primaries vs General"].map(chip => (
              <button key={chip} className="chip" onClick={() => { handleSend(chip); setActiveTab('phases'); }}>{chip}</button>
            ))}
          </div>

          {/* PHASES TAB */}
          <div className={`tab-page ${activeTab === 'phases' ? 'active' : ''}`}>
            <div className="phase-tabs">
              {["Candidacy", "Primaries", "Conventions", "Campaign", "Voting", "Count & Certify", "Inauguration"].map((name, i) => (
                <button key={i} className={`phase-btn ${activePhase === i ? 'active' : ''}`} onClick={() => setActivePhase(i)}>
                  <span className="phase-num">{i + 1}</span>{name}
                </button>
              ))}
            </div>

            <div className="phase-content">
              {activePhase === 0 && (
                <div className="phase-panel active">
                  <div className="phase-header">
                    <div className="phase-icon">🗳️</div>
                    <div className="phase-info">
                      <h2>Candidacy Declaration</h2>
                      <div className="phase-meta">
                        <div className="phase-meta-item">Timing: <span>18–24 months before election</span></div>
                        <div className="phase-meta-item">Key body: <span>FEC</span></div>
                      </div>
                    </div>
                  </div>
                  <div className="phase-body">
                    <p>The election cycle begins when individuals declare their intention to run for office. For presidential candidates, this involves formal registration with the Federal Election Commission (FEC) and meeting constitutional eligibility requirements.</p>
                    <div className="steps-grid">
                      <div className="step-card">
                        <div className="step-card-num">STEP 01</div>
                        <div className="step-card-title">Eligibility Check</div>
                        <div className="step-card-desc">Must be natural-born U.S. citizen, at least 35 years old, and a resident for 14+ years for presidential candidates.</div>
                      </div>
                      <div className="step-card">
                        <div className="step-card-num">STEP 02</div>
                        <div className="step-card-title">FEC Registration</div>
                        <div className="step-card-desc">File a Statement of Candidacy (Form 2) with the FEC once campaign raises or spends over $5,000.</div>
                      </div>
                      <div className="step-card">
                        <div className="step-card-num">STEP 03</div>
                        <div className="step-card-title">Campaign Committee</div>
                        <div className="step-card-desc">Establish a principal campaign committee to handle fundraising, spending, and financial disclosures.</div>
                      </div>
                      <div className="step-card">
                        <div className="step-card-num">STEP 04</div>
                        <div className="step-card-title">Ballot Access</div>
                        <div className="step-card-desc">Collect required signatures in each state to appear on the ballot. Requirements vary significantly by state.</div>
                      </div>
                    </div>
                    <div className="callout-box">
                      <div className="callout-label">⚡ Key Fact</div>
                      <p>There is no single federal rule for ballot access — each of the 50 states sets its own requirements. This means a candidate must navigate 50 different sets of laws just to appear on every state's ballot.</p>
                    </div>
                  </div>
                </div>
              )}
              {activePhase === 1 && (
                <div className="phase-panel active">
                  <div className="phase-header">
                    <div className="phase-icon">🏛️</div>
                    <div className="phase-info">
                      <h2>Primary Elections &amp; Caucuses</h2>
                      <div className="phase-meta">
                        <div className="phase-meta-item">Timing: <span>Jan–June of election year</span></div>
                        <div className="phase-meta-item">Key body: <span>State Party Organizations</span></div>
                      </div>
                    </div>
                  </div>
                  <div className="phase-body">
                    <p>Primary elections determine which candidate will represent a political party in the general election. Each party runs its own nominating process, governed by its own rules — not federal law.</p>
                    <div className="steps-grid">
                      <div className="step-card">
                        <div className="step-card-num">TYPE A</div>
                        <div className="step-card-title">Closed Primary</div>
                        <div className="step-card-desc">Only registered party members may vote. Keeps decisions within party membership. Used in ~20 states.</div>
                      </div>
                      <div className="step-card">
                        <div className="step-card-num">TYPE B</div>
                        <div className="step-card-title">Open Primary</div>
                        <div className="step-card-desc">Any registered voter can participate, regardless of party affiliation. Increases participation but allows "raiding."</div>
                      </div>
                      <div className="step-card">
                        <div className="step-card-num">TYPE C</div>
                        <div className="step-card-title">Caucus</div>
                        <div className="step-card-desc">In-person gatherings where voters publicly align with candidates. Time-intensive but highly community-driven.</div>
                      </div>
                      <div className="step-card">
                        <div className="step-card-num">TYPE D</div>
                        <div className="step-card-title">Super Tuesday</div>
                        <div className="step-card-desc">Multiple states hold primaries on the same day in early March, often deciding the frontrunner early.</div>
                      </div>
                    </div>
                    <div className="key-dates">
                      <div className="date-row"><div className="date-label">Iowa / New Hampshire</div><div className="date-desc">Traditionally first — signal early momentum</div></div>
                      <div className="date-row"><div className="date-label">Super Tuesday (March)</div><div className="date-desc">Largest single-day delegate allocation</div></div>
                      <div className="date-row"><div className="date-label">June</div><div className="date-desc">Final primaries — delegate count solidifies</div></div>
                    </div>
                  </div>
                </div>
              )}
              {/* Add other phases similarly if needed, or use a loop. For speed I'll add them as a switch or mapping */}
              {activePhase >= 2 && (
                <div className="phase-panel active text-center py-20 opacity-50">
                  <p>Detailed content for Phase {activePhase + 1} is being processed. <br/> Use the AI assistant to ask specific questions about this phase.</p>
                </div>
              )}
            </div>

            <div className="timeline-strip">
              <div className="timeline-track">
                {["🗳️", "🏛️", "🎖️", "📢", "🗳️", "📊", "🏛️"].map((icon, i) => (
                  <div key={i} className={`tl-node ${activePhase === i ? 'active' : ''}`} onClick={() => setActivePhase(i)}>
                    <div className="tl-dot">{icon}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* GLOSSARY TAB */}
          <div className={`tab-page ${activeTab === 'glossary' ? 'active' : ''}`}>
            <div className="section-header">
              <div className="section-title">Key Election Terms</div>
              <div className="section-rule"></div>
              <div className="section-tag">Reference</div>
            </div>
            <div className="glossary-grid">
              {[
                { term: "Electoral College", def: "A body of 538 electors that formally elects the President. Each state gets electors equal to its Congressional representation. A candidate needs 270 to win." },
                { term: "Delegate", def: "A representative who votes on behalf of a state at a party convention to choose the presidential nominee. Allocated based on primary/caucus results." },
                { term: "Gerrymandering", def: "Manipulating the boundaries of electoral districts to favor one party over another. Named after Governor Elbridge Gerry, whose 1812 district looked like a salamander." },
                { term: "Superdelegates", def: "Democratic Party insiders who can vote for any candidate at the convention regardless of primary results. Limited after 2018 reforms." },
              ].map((item, i) => (
                <div key={i} className="gloss-card"><div className="gloss-term">{item.term}</div><div className="gloss-def">{item.def}</div></div>
              ))}
            </div>
          </div>

          {/* FAQ TAB */}
          <div className={`tab-page ${activeTab === 'faq' ? 'active' : ''}`}>
            <div className="section-header">
              <div className="section-title">Frequently Asked Questions</div>
              <div className="section-rule"></div>
              <div className="section-tag">Common Questions</div>
            </div>
            <div className="faq-list">
              {[
                { q: "Why doesn't the popular vote winner always become President?", a: "The U.S. uses the Electoral College, not a direct popular vote. Each state gets a number of electors equal to its Senate + House seats." },
                { q: "Why is Election Day on a Tuesday?", a: "Congress set Election Day as the first Tuesday after the first Monday in November in 1845 to avoid travel on Sundays and harvest season." },
              ].map((item, i) => (
                <div key={i} className={`faq-item ${faqOpen.includes(i) ? 'open' : ''}`} onClick={() => toggleFaq(i)}>
                  <div className="faq-q">{item.q} <svg className="faq-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg></div>
                  <div className="faq-a">{item.a}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CHAT PANEL */}
        <div className="chat-panel">
          <div className="chat-header">
            <div className="chat-avatar">⚖️</div>
            <div className="chat-header-info">
              <h3>Civic Guide AI</h3>
              <p>Election Intelligence Assistant</p>
            </div>
            <div className="chat-status"></div>
          </div>

          <div className="chat-messages" id="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`msg ${msg.role === 'assistant' ? 'assistant' : 'user'}`}>
                <div className="msg-avatar">{msg.role === 'assistant' ? '⚖️' : 'U'}</div>
                <div>
                  <div className="msg-bubble" dangerouslySetInnerHTML={{ __html: msg.text }}></div>
                  <div className="msg-time">Now</div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="typing-indicator show">
                <div className="msg-avatar" style={{ width: '28px', height: '28px', background: 'linear-gradient(135deg,#a78bfa,#818cf8)', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.75rem', flexShrink: 0 }}>⚖️</div>
                <div className="typing-dots"><span></span><span></span><span></span></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-area">
            <div className="input-row">
              <textarea
                className="chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(input); } }}
                placeholder="Ask about any part of the election process…"
                rows={1}
              ></textarea>
              <button className="send-btn" onClick={() => handleSend(input)} disabled={!input.trim() || isLoading}>
                <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
              </button>
            </div>
            <div className="chat-hint">Enter to send · Shift+Enter for new line</div>
          </div>
        </div>
      </div>
    </div>
  );
}
