import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PMI-ACP Certification Training | Renzy Academy" },
      { name: "description", content: "Become PMI-ACP certified with Renzy Academy. Master Scrum, Kanban, Lean, XP and Hybrid Agile to lead modern teams and unlock global career opportunities." },
      { property: "og:title", content: "PMI-ACP Certification Training | Renzy Academy" },
      { property: "og:description", content: "Become PMI-ACP certified with Renzy Academy. Master Scrum, Kanban, Lean, XP and Hybrid Agile to lead modern teams and unlock global career opportunities." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="renzy">
      <nav>
        <div className="nav-container">
          <a href="#" className="logo">Renzy<span>.</span>Academy</a>
          <a href="#enroll" className="nav-cta">Enroll Now</a>
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
              The world of work is changing fast. Companies want professionals who can adapt quickly, manage change, lead agile teams, and deliver value faster in uncertain environments.
            </p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">21%</span>
                <span className="stat-label">Higher Salary</span>
              </div>
              <div className="stat">
                <span className="stat-number">6</span>
                <span className="stat-label">Agile Frameworks</span>
              </div>
              <div className="stat">
                <span className="stat-number">Global</span>
                <span className="stat-label">Recognition</span>
              </div>
            </div>
            <div className="hero-cta-group">
              <a href="#enroll" className="btn-primary">Start Your Journey →</a>
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
                {["Scrum", "Kanban", "Lean", "XP", "Hybrid Agile", "Iterative & Incremental"].map((f) => (
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
            <h2 className="section-title">Why Professionals Are Pursuing PMI-ACP®</h2>
            <p className="section-subtitle">Employers are actively searching for professionals who can drive Agile transformation and deliver results in modern digital environments.</p>
          </div>
          <div className="benefits-grid">
            {[
              ["⚡","Deliver Projects Faster","Master Agile methodologies that accelerate delivery cycles and reduce time-to-market for products and services."],
              ["🔄","Respond to Business Changes","Develop the adaptability to pivot quickly when market conditions shift or new requirements emerge."],
              ["🤝","Improve Team Collaboration","Lead cross-functional teams with enhanced communication, transparency, and shared accountability."],
              ["⭐","Increase Customer Satisfaction","Put customer value at the center of every sprint with iterative feedback and continuous improvement."],
              ["🚀","Lead Agile Transformation","Drive organizational change by championing Agile practices at scale across departments."],
              ["🌐","Thrive in Digital Environments","Excel in modern, remote-first workplaces that demand flexibility and digital fluency."],
            ].map(([icon, title, desc]) => (
              <div key={title} className="benefit-card">
                <div className="benefit-icon">{icon}</div>
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
            <h2 className="section-title">In Demand Across Industries Worldwide</h2>
            <p className="section-subtitle">Organizations around the world are adopting Agile ways of working. PMI-ACP holders are needed everywhere.</p>
          </div>
          <div className="industries-grid">
            {[
              ["💻","Technology"],["🏦","Banking & Financial Services"],["📡","Telecommunications"],
              ["🏥","Healthcare"],["⛽","Oil and Gas"],["📊","Consulting"],
              ["🏭","Manufacturing"],["🚀","Startups & Digital Products"],
            ].map(([icon, name]) => (
              <div key={name} className="industry-card">
                <div className="industry-icon">{icon}</div>
                <div className="industry-name">{name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="why-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Career Growth</span>
            <h2 className="section-title">Better Opportunities Await Agile Professionals</h2>
            <p className="section-subtitle">Professionals with Agile knowledge now have access to a wider range of career opportunities and benefits.</p>
          </div>
          <div className="benefits-grid">
            {[
              ["📈","Career Growth","Accelerate your professional trajectory with credentials that open doors to senior roles."],
              ["🌍","International Opportunities","Work with global teams and organizations that recognize and value PMI-ACP certification."],
              ["🏠","Remote Jobs","Access flexible, location-independent roles in the growing remote work economy."],
              ["💰","Higher Earning Potential","Command premium salaries with a certification that demonstrates proven Agile expertise."],
              ["👑","Leadership Roles","Step into positions where you guide strategy, mentor teams, and shape organizational direction."],
              ["🎯","Faster Promotions","Stand out in performance reviews and move up the ladder quicker than your peers."],
            ].map(([icon, title, desc]) => (
              <div key={title} className="benefit-card">
                <div className="benefit-icon">{icon}</div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="audience-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Who Should Enroll</span>
            <h2 className="section-title">Perfect For Professionals Like You</h2>
            <p className="section-subtitle">Whether you are looking to upskill, transition careers, or strengthen your profile, PMI-ACP is for you.</p>
          </div>
          <div className="audience-grid">
            {[
              ["📋","Project Managers"],["📊","Business Analysts"],["🎨","Product Managers"],["🏉","Scrum Masters"],
              ["👥","Team Leads"],["💻","Software Professionals"],["⚙️","Operations Professionals"],["🔄","Career Transitioners"],
            ].map(([emoji, name]) => (
              <div key={name} className="audience-card">
                <span className="audience-emoji">{emoji}</span>
                <h4>{name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Renzy Academy</span>
            <h2 className="section-title">We Prepare You for Real-World Agile Excellence</h2>
            <p className="section-subtitle">At Renzy Academy, we do not just prepare you to pass an exam. We prepare you to understand Agile deeply and apply it confidently in real work environments.</p>
          </div>
          <div className="training-features">
            {[
              ["Expert-Led PMI-ACP Training","Learn from certified Agile practitioners with years of real-world industry experience."],
              ["Real-World Agile Scenarios","Practice with case studies and simulations drawn from actual Agile project environments."],
              ["Practical Framework Mastery","Gain hands-on understanding of Scrum, Kanban, Lean, and Hybrid Agile approaches."],
              ["Exam-Focused Preparation","Targeted study plans and strategies designed to maximize your exam success rate."],
              ["Mock Questions & Guidance","Extensive practice tests with detailed explanations to build your exam confidence."],
              ["Career Support & Mentorship","Receive personalized guidance to leverage your certification for career advancement."],
              ["Interactive & Engaging Classes","Participate in dynamic sessions that keep you involved, not just listening."],
              ["Supportive Learning Community","Join a network of peers and alumni who support your growth beyond the classroom."],
            ].map(([title, desc], i) => (
              <div key={title} className="training-card">
                <div className="training-number">{i + 1}</div>
                <div className="training-content">
                  <h4>{title}</h4>
                  <p>{desc}</p>
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
            <p>Do not wait until the market moves ahead without you. Become an Agile-certified professional and unlock a world of opportunities.</p>
            <div className="cta-buttons">
              <a href="https://wa.me/" className="btn-white">💬 WhatsApp Us</a>
              <a href="#" className="btn-outline-white">Send a DM</a>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <a href="#" className="logo">Renzy<span>.</span>Academy</a>
          <p>Preparing Agile professionals for global excellence. © 2026 Renzy Academy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
