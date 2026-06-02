import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { FAQ_DATABASE, findRelevantFAQ } from "@/lib/faq";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PMI-ACP Certification Training | Renzy Academy" },
      { name: "description", content: "Become PMI-ACP certified with Renzy Academy. Master Scrum, Kanban, Lean, XP and Hybrid Agile." },
      { property: "og:title", content: "PMI-ACP Certification Training | Renzy Academy" },
      { property: "og:description", content: "Become PMI-ACP certified with Renzy Academy." },
    ],
  }),
  component: Index,
});

const LOGO_URL = "/renzy-logo-mark.jpg";
const PHONE = "+234 901 069 2401";
const PHONE_RAW = "+2349010692401";
const EMAIL = "info@renzyacademy.com";
const WHATSAPP_LINK = "https://wa.me/2349010692401";

const BENEFITS = [
  ["Deliver Projects Faster", "Master Agile methodologies that accelerate delivery cycles."],
  ["Respond to Business Changes", "Develop adaptability to pivot when market conditions shift."],
  ["Improve Team Collaboration", "Lead cross-functional teams with transparency and accountability."],
  ["Increase Customer Satisfaction", "Put customer value at the center of every sprint."],
  ["Lead Agile Transformation", "Champion Agile practices at scale across departments."],
  ["Thrive in Digital Environments", "Excel in modern, remote-first workplaces."],
];

const INDUSTRIES = ["Technology", "Banking & Finance", "Telecommunications", "Healthcare", "Oil & Gas", "Consulting", "Manufacturing", "Startups"];

const AUDIENCE = ["Project Managers", "Business Analysts", "Product Managers", "Scrum Masters", "Team Leads", "Software Professionals", "Operations", "Career Transitioners"];

const TESTIMONIALS = [
  { text: "I do not know what I was reading before I came to Renzy Academy. The Agile concept makes a lot of sense to me now.", name: "Raul", role: "PMP Exam Prep" },
  { text: "Thank you for your patience in helping me break down concepts until I actually understood them. I am truly grateful.", name: "Aunty Esther", role: "Agile Graduate" },
  { text: "My lecture is going very well with Mr Tayo. Thank you to the entire Renzy Academy team for the support.", name: "Cohort Member", role: "PMI-ACP Trainee" },
];



interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "assistant";
  timestamp: Date;
  faqId?: number;
}

function AIAssistant({ onConnectToLiveChat }: { onConnectToLiveChat: () => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      text: "Hi! I am Renzy's AI Assistant. I can answer common questions about PMI-ACP training, pricing, prerequisites, and more. What would you like to know?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const relevantFAQ = findRelevantFAQ(input);
      let assistantResponse: ChatMessage;

      if (relevantFAQ) {
        assistantResponse = {
          id: (Date.now() + 1).toString(),
          text: relevantFAQ.answer,
          sender: "assistant",
          timestamp: new Date(),
          faqId: relevantFAQ.id,
        };
      } else {
        assistantResponse = {
          id: (Date.now() + 1).toString(),
          text: "I am not sure about that specific question. Would you like to connect with our live support team for a more detailed answer? They are available to help!",
          sender: "assistant",
          timestamp: new Date(),
        };
      }

      setMessages((prev) => [...prev, assistantResponse]);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="ai-assistant-container">
      <div className="ai-assistant">
        <div className="ai-header">
          <div className="ai-header-content">
            <div className="ai-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 8c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
                <path d="M12 14c-2.21 0-4 1.79-4 4v2h8v-2c0-2.21-1.79-4-4-4z" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </div>
            <div>
              <h3>Renzy AI Assistant</h3>
              <p>Instant answers to your questions</p>
            </div>
          </div>
        </div>

        <div className="ai-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`ai-message ${msg.sender}`}>
              <div className="message-bubble">{msg.text}</div>
            </div>
          ))}
          {isLoading && (
            <div className="ai-message assistant">
              <div className="message-bubble typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="ai-input-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            disabled={isLoading}
            className="ai-input"
          />
          <button type="submit" disabled={isLoading} className="ai-send-btn">
            Send
          </button>
        </form>

        <div className="ai-footer">
          <button onClick={onConnectToLiveChat} className="ai-live-chat-btn">
            Connect to Live Support
          </button>
          <p className="ai-footer-text">Cannot find what you need? Our team is ready to help!</p>
        </div>
      </div>
    </div>
  );
}

function LiveChatWidget({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire up to a backend endpoint (with CSRF protection)
    setSubmitted(true);
    setTimeout(onClose, 3000);
  };

  if (submitted) {
    return (
      <div className="live-chat-modal">
        <div className="live-chat-content" style={{ textAlign: "center", padding: "2rem" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
          <h3>Message Sent!</h3>
          <p>Our team will contact you shortly via WhatsApp or email.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="live-chat-modal" onClick={onClose}>
      <div className="live-chat-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="live-chat-header">
          <h3>Live Support</h3>
          <p>Connect with our team</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Your Name *</label>
            <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
          </div>
          <div className="form-group">
            <label>Email *</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" />
          </div>
          <div className="form-group">
            <label>Message *</label>
            <textarea required value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Describe your question or concern..." rows={4} />
          </div>
          <button type="submit" className="btn-primary" style={{ width: "100%" }}>
            Send to Support Team
          </button>
        </form>

        <div className="live-chat-footer">
          <p style={{ fontSize: "0.85rem", color: "var(--r-text-light)" }}>
            Or reach us directly:<br />
            <a href={`tel:${PHONE_RAW}`} style={{ color: "var(--r-accent)" }}>{PHONE}</a><br />
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ color: "var(--r-accent)" }}>WhatsApp</a>
          </p>
        </div>
      </div>
    </div>
  );
}

function EnrollForm({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", role: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire up to a backend endpoint (with CSRF protection)
    setSubmitted(true);
    setTimeout(onClose, 3000);
  };

  if (submitted) {
    return (
      <div className="enroll-modal">
        <div className="enroll-modal-content" style={{ textAlign: "center", padding: "3rem" }}>
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>✅</div>
          <h3>Application Received!</h3>
          <p>We will contact you within 24 hours.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="enroll-modal" onClick={onClose}>
      <div className="enroll-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h3>Enroll in PMI-ACP Training</h3>
        <p style={{ color: "var(--r-text-light)", marginBottom: "1.5rem" }}>Fill this form and we will reach out to you shortly.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name *</label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" />
          </div>
          <div className="form-group">
            <label>Email *</label>
            <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" />
          </div>
          <div className="form-group">
            <label>Phone Number *</label>
            <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+234 ..." />
          </div>
          <div className="form-group">
            <label>Current Role</label>
            <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="e.g. Project Manager" />
          </div>
          <div className="form-group">
            <label>Message (Optional)</label>
            <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Any questions or preferred cohort?" rows={3} />
          </div>
          <button type="submit" className="btn-primary" style={{ width: "100%" }}>Submit Application</button>
        </form>

        <div style={{ marginTop: "1.5rem", textAlign: "center", fontSize: "0.875rem", color: "var(--r-text-light)" }}>
          Or reach us directly:<br />
          <a href={`tel:${PHONE_RAW}`} style={{ color: "var(--r-accent)" }}>{PHONE}</a> · <a href={`mailto:${EMAIL}`} style={{ color: "var(--r-accent)" }}>{EMAIL}</a>
        </div>
      </div>
    </div>
  );
}

function Index() {
  const [showForm, setShowForm] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [showLiveChat, setShowLiveChat] = useState(false);

  return (
    <div className="renzy">
      {showForm && <EnrollForm onClose={() => setShowForm(false)} />}
      {showAI && <AIAssistant onConnectToLiveChat={() => { setShowAI(false); setShowLiveChat(true); }} />}
      {showLiveChat && <LiveChatWidget onClose={() => setShowLiveChat(false)} />}

      {!showAI && (
        <button 
          onClick={() => setShowAI(true)}
          className="ai-chat-button"
          title="Open AI Assistant"
          aria-label="Open AI Assistant"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 8c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
            <path d="M12 14c-2.21 0-4 1.79-4 4v2h8v-2c0-2.21-1.79-4-4-4z" />
            <circle cx="12" cy="12" r="10" />
          </svg>
        </button>
      )}

      <nav>
        <div className="nav-container">
          <a href="/" className="logo-img">
            <img src={LOGO_URL} alt="Renzy Academy" />
            <span className="logo-text">RENZY<span className="logo-dot">.</span>ACADEMY</span>
          </a>
          <button onClick={() => setShowForm(true)} className="nav-cta">Enroll Now</button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-container">
          <div>
            <div className="hero-badge">
              <span className="dot"></span>
              PMI Authorized Training Partner
            </div>
            <h1>
              PMI-ACP Certification Is No Longer Optional. It Is a{" "}
              <span className="highlight">Global Career Advantage.</span>
            </h1>
            <p className="hero-subtitle">
              Companies want professionals who can adapt quickly, manage change, lead agile teams, and deliver value faster in uncertain environments.
            </p>
            <div className="hero-stats">
              <div className="stat"><span className="stat-number">21%</span><span className="stat-label">Higher Salary</span></div>
              <div className="stat"><span className="stat-number">6</span><span className="stat-label">Agile Frameworks</span></div>
              <div className="stat"><span className="stat-number">Global</span><span className="stat-label">Recognition</span></div>
            </div>
            <div className="hero-cta-group">
              <button onClick={() => setShowForm(true)} className="btn-primary">Start Your Journey →</button>
              <a href="#why" className="btn-secondary">Learn More</a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-card">
              <div className="card-header">
                <div className="card-icon">📜</div>
                <div>
                  <div className="card-title">PMI-ACP Certified</div>
                  <div className="card-subtitle">Project Management Institute</div>
                </div>
              </div>
              <p className="card-desc">Validates your ability to work in Agile environments using:</p>
              <div className="frameworks-grid">
                {["Scrum", "Kanban", "Lean", "XP", "Hybrid Agile", "Iterative"].map((f) => (
                  <div key={f} className="framework-tag"><span className="check">✓</span>{f}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="why" className="why-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why PMI-ACP</span>
            <h2 className="section-title">Why Professionals Are Pursuing PMI-ACP</h2>
          </div>
          <div className="benefits-grid">
            {BENEFITS.map(([title, desc]) => (
              <div key={title} className="benefit-card">
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Global Demand</span>
            <h2 className="section-title">In Demand Across Industries</h2>
          </div>
          <div className="industries-grid">
            {INDUSTRIES.map((name) => (
              <div key={name} className="industry-card">{name}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="audience-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Who Should Enroll</span>
            <h2 className="section-title">Perfect For Professionals Like You</h2>
          </div>
          <div className="audience-grid">
            {AUDIENCE.map((name) => (
              <div key={name} className="audience-card">{name}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Student Stories</span>
            <h2 className="section-title">Hear From Our Community</h2>
          </div>
          <div className="testimonials-grid">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="testimonial-card">
                <span className="quote-mark">"</span>
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.name[0]}</div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="enroll" className="cta-section">
        <div className="container">
          <div className="cta-content">
            <div className="urgency-badge">
              <span className="fire">🔥</span>
              Limited Slots Available — Enroll Today
            </div>
            <h2>Position Yourself for Global Relevance</h2>
            <p>Do not wait until the market moves ahead without you.</p>
            <div className="cta-buttons">
              <button onClick={() => setShowForm(true)} className="btn-white">Enroll Now</button>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-outline-white">WhatsApp Us</a>
            </div>
            <div className="contact-bar">
              <a href={`tel:${PHONE_RAW}`}>📞 {PHONE}</a>
              <span>|</span>
              <a href={`mailto:${EMAIL}`}>✉️ {EMAIL}</a>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <a href="/" className="logo-img" style={{ justifyContent: "center", marginBottom: "1rem" }}>
            <img src={LOGO_URL} alt="Renzy Academy" />
            <span className="logo-text" style={{ color: "white" }}>RENZY<span style={{ color: "#E31B23" }}>.</span>ACADEMY</span>
          </a>
          <div className="footer-contact">
            <a href={`tel:${PHONE_RAW}`}>{PHONE}</a>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </div>
          <p>© 2026 Renzy Academy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
