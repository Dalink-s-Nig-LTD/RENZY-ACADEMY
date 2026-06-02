import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";

import {
  LOGO_URL,
  WHATSAPP_LINK,
  BENEFITS,
  INDUSTRIES,
  AUDIENCE,
  TESTIMONIALS,
} from "../lib/constants";
import { findRelevantFAQ } from "../lib/faq";
import { SectionHeader } from "../components/SectionHeader";
import { ModalOverlay } from "../components/ModalOverlay";
import { SuccessConfirmation } from "../components/SuccessConfirmation";
import { ContactInfo } from "../components/ContactInfo";
import { AiAssistantIcon } from "../components/AiAssistantIcon";

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
              <AiAssistantIcon />
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
    console.log("Live chat request:", { name, email, message });
    setSubmitted(true);
    setTimeout(onClose, 3000);
  };

  if (submitted) {
    return (
      <SuccessConfirmation
        heading="Message Sent!"
        message="Our team will contact you shortly via WhatsApp or email."
      />
    );
  }

  return (
    <ModalOverlay onClose={onClose}>
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
        <ContactInfo variant="modal" />
      </div>
    </ModalOverlay>
  );
}

function EnrollForm({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", role: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Enrollment:", form);
    setSubmitted(true);
    setTimeout(onClose, 3000);
  };

  if (submitted) {
    return (
      <SuccessConfirmation
        heading="Application Received!"
        message="We will contact you within 24 hours."
      />
    );
  }

  return (
    <ModalOverlay onClose={onClose}>
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

      <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
        <ContactInfo variant="modal" />
      </div>
    </ModalOverlay>
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
          <AiAssistantIcon />
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
              <button onClick={() => setShowForm(true)} className="btn-primary">Start Your Journey &rarr;</button>
              <a href="#why" className="btn-secondary">Learn More</a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-card">
              <div className="card-header">
                <div className="card-icon">&#x1F4DC;</div>
                <div>
                  <div className="card-title">PMI-ACP Certified</div>
                  <div className="card-subtitle">Project Management Institute</div>
                </div>
              </div>
              <p className="card-desc">Validates your ability to work in Agile environments using:</p>
              <div className="frameworks-grid">
                {["Scrum", "Kanban", "Lean", "XP", "Hybrid Agile", "Iterative"].map((f) => (
                  <div key={f} className="framework-tag"><span className="check">&#x2713;</span>{f}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="why" className="why-section">
        <div className="container">
          <SectionHeader label="Why PMI-ACP" title="Why Professionals Are Pursuing PMI-ACP" />
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
          <SectionHeader label="Global Demand" title="In Demand Across Industries" />
          <div className="industries-grid">
            {INDUSTRIES.map((name) => (
              <div key={name} className="industry-card">{name}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="audience-section">
        <div className="container">
          <SectionHeader label="Who Should Enroll" title="Perfect For Professionals Like You" />
          <div className="audience-grid">
            {AUDIENCE.map((name) => (
              <div key={name} className="audience-card">{name}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="container">
          <SectionHeader label="Student Stories" title="Hear From Our Community" />
          <div className="testimonials-grid">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="testimonial-card">
                <span className="quote-mark">&ldquo;</span>
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
              <span className="fire">&#x1F525;</span>
              Limited Slots Available &mdash; Enroll Today
            </div>
            <h2>Position Yourself for Global Relevance</h2>
            <p>Do not wait until the market moves ahead without you.</p>
            <div className="cta-buttons">
              <button onClick={() => setShowForm(true)} className="btn-white">Enroll Now</button>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-outline-white">WhatsApp Us</a>
            </div>
            <ContactInfo variant="inline" />
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <a href="/" className="logo-img" style={{ justifyContent: "center", marginBottom: "1rem" }}>
            <img src={LOGO_URL} alt="Renzy Academy" />
            <span className="logo-text" style={{ color: "white" }}>RENZY<span style={{ color: "#E31B23" }}>.</span>ACADEMY</span>
          </a>
          <ContactInfo variant="footer" />
          <p>&copy; 2026 Renzy Academy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
