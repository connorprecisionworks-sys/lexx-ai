import { Link } from 'react-router-dom';
import './Home.css';

const trustItems = [
  { icon: '🔒', label: 'HIPAA Compliant' },
  { icon: '⚡', label: '10x Faster Review' },
  { icon: '⚖️', label: 'Built for Litigators' },
  { icon: '🧾', label: 'All Record Types' },
];

const problems = [
  {
    icon: '📁',
    title: 'Medical records are dense and disorganized',
    desc: 'Thousands of pages of unstructured clinical notes, lab results, imaging reports, and billing codes buried across multiple providers.'
  },
  {
    icon: '⏳',
    title: 'Manual review is costing you billable hours',
    desc: 'Paralegals and associates spend weeks manually reading records — time that doesn\'t scale and eats into your firm\'s profitability.'
  },
  {
    icon: '⚠️',
    title: 'Critical details get missed',
    desc: 'Pre-existing conditions, causation gaps, and inconsistencies buried on page 847 of 1,200 can sink a case or delay settlement.'
  },
];

const solutions = [
  { icon: '🧠', label: 'AI-Powered Extraction' },
  { icon: '🛡️', label: 'HIPAA-Grade Security' },
  { icon: '📊', label: 'Instant Chronologies' },
];

const stats = [
  { value: '85%', label: 'Reduction in review time' },
  { value: '3 min', label: 'Average processing per case' },
  { value: '99.2%', label: 'Accuracy on clinical extraction' },
  { value: '500+', label: 'Law firms onboarded' },
];

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero__inner">
            <div className="hero__content">
              <div className="section-label">
                <span>●</span> Purpose-built for personal injury &amp; mass tort
              </div>
              <h1>
                Medical records,<br />
                <span className="hero__accent">analyzed in minutes.</span>
              </h1>
              <p className="hero__sub">
                Lexx AI reads, extracts, and summarizes medical records so your team can focus on strategy — not paperwork. Upload a case, get a complete clinical timeline instantly.
              </p>
              <div className="hero__ctas">
                <Link to="/contact" className="btn-primary">Request a Demo →</Link>
                <Link to="/how-it-works" className="btn-secondary">See How It Works</Link>
              </div>
              <div className="hero__trust">
                {trustItems.map(t => (
                  <span key={t.label} className="hero__trust-item">
                    {t.icon} {t.label}
                  </span>
                ))}
              </div>
            </div>
            <div className="hero__visual">
              <div className="mock-ui">
                <div className="mock-ui__bar">
                  <span className="dot red"/><span className="dot yellow"/><span className="dot green"/>
                  <span className="mock-ui__title">Lexx AI — Case Review</span>
                </div>
                <div className="mock-ui__body">
                  <div className="mock-record">
                    <div className="mock-record__label">Plaintiff: Jane Doe</div>
                    <div className="mock-record__row"><span className="tag green">✓ Causation confirmed</span><span className="tag blue">Ortho · 14 records</span></div>
                  </div>
                  <div className="mock-timeline">
                    <div className="mock-tl-label">Clinical Timeline</div>
                    {[
                      ['03/14/2023', 'ER Admission — Cervical strain C4–C6'],
                      ['03/21/2023', 'MRI — Herniated disc L4–L5 confirmed'],
                      ['04/02/2023', 'PT initiated — 3x/week × 8 weeks'],
                      ['06/15/2023', 'IME — Dr. Harmon, causation noted'],
                    ].map(([date, note]) => (
                      <div key={date} className="mock-tl-row">
                        <span className="mock-tl-date">{date}</span>
                        <span className="mock-tl-note">{note}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mock-summary">
                    <div className="mock-summary__label">AI Summary</div>
                    <div className="mock-summary__text">
                      Patient sustained cervical and lumbar injuries consistent with mechanism of loss. No pre-existing spinal conditions identified in prior records (2018–2022). Causation chain intact across all treating providers.
                    </div>
                    <div className="mock-summary__chips">
                      <span>🚩 2 flags</span>
                      <span>📄 847 pages processed</span>
                      <span>⏱ 2m 14s</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-bar">
        <div className="container">
          <div className="stats-bar__grid">
            {stats.map(s => (
              <div key={s.label} className="stats-bar__item">
                <div className="stats-bar__value">{s.value}</div>
                <div className="stats-bar__label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="section problem-section">
        <div className="container">
          <div className="problem-section__header">
            <h2>Medical record review<br />shouldn't be this hard</h2>
            <p>Your team is spending days on work that should take minutes. There's a better way.</p>
          </div>
          <div className="problem-section__grid">
            {problems.map(p => (
              <div key={p.title} className="problem-card">
                <div className="problem-card__icon">{p.icon}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>

          {/* Solution callout */}
          <div className="solution-callout">
            <div className="solution-callout__check">✓ How Lexx AI Solves This</div>
            <div className="solution-callout__row">
              {solutions.map(s => (
                <div key={s.label} className="solution-callout__item">
                  <span>{s.icon}</span>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
            <p>"Focus on winning — not on reading."</p>
            <Link to="/how-it-works" className="solution-callout__link">See how it works →</Link>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="bottom-cta section">
        <div className="container">
          <div className="bottom-cta__inner">
            <h2>Ready to cut record review time by 85%?</h2>
            <p>Join 500+ law firms using Lexx AI to win more cases, faster.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn-teal">Request Your Demo →</Link>
              <Link to="/pricing" className="btn-secondary" style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}>View Pricing</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
