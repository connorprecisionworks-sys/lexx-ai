import { Link } from 'react-router-dom';
import './Features.css';

const featureSections = [
  {
    label: 'Core Intelligence',
    title: 'AI that understands clinical language',
    sub: 'Not just keyword matching — Lexx AI reasons through medical context the way a trained nurse-paralegal would.',
    features: [
      { icon: '🧠', title: 'Clinical NLP Engine', desc: 'Understands ICD codes, CPT codes, drug names, anatomical terminology, and physician shorthand — across all specialties.' },
      { icon: '📅', title: 'Automatic Chronologies', desc: 'Every medical event extracted and placed on a precise timeline. Gaps, overlaps, and conflicts flagged automatically.' },
      { icon: '🔎', title: 'Causation Analysis', desc: 'Lexx maps the injury chain from incident to treatment, identifying pre-existing conditions and inconsistencies that affect case value.' },
      { icon: '🚩', title: 'Smart Flagging', desc: 'Suspicious gaps, contradictory notes, missing records, and defense-side ammunition flagged before you ever open a file.' },
    ],
  },
  {
    label: 'Workflow',
    title: 'Built into how your firm actually works',
    sub: 'Lexx AI doesn\'t replace your workflow — it powers it.',
    features: [
      { icon: '💬', title: 'Natural Language Q&A', desc: 'Ask questions about any record: "Were there prior knee injuries?" or "What was the last treating physician\'s opinion on MMI?" Get precise answers with citations.' },
      { icon: '📤', title: 'One-Click Export', desc: 'Export chronologies, summaries, and flagged records as formatted PDFs or Word docs — ready for demand letters, depositions, or mediation.' },
      { icon: '👥', title: 'Team Collaboration', desc: 'Assign cases, leave annotations, track review status, and share outputs — all inside Lexx with role-based access control.' },
      { icon: '🔗', title: 'Practice Management Integrations', desc: 'Connect to Clio, MyCase, Filevine, and other leading case management platforms.' },
    ],
  },
  {
    label: 'Security & Compliance',
    title: 'HIPAA-grade security, by default',
    sub: 'Medical records are among the most sensitive data in existence. We treat them that way.',
    features: [
      { icon: '🔒', title: 'End-to-End Encryption', desc: 'All records encrypted at rest (AES-256) and in transit (TLS 1.3). No exceptions.' },
      { icon: '🏥', title: 'HIPAA Compliant', desc: 'Full BAA available. Built to satisfy HIPAA Privacy and Security Rule requirements for covered entities and business associates.' },
      { icon: '🗑️', title: 'Auto-Purge Controls', desc: 'Set automatic record deletion timelines per matter. Full audit logs of every access event.' },
      { icon: '🌐', title: 'SOC 2 Type II (In Progress)', desc: 'Infrastructure and controls designed to meet SOC 2 Type II requirements. Report available upon request.' },
    ],
  },
];

export default function Features() {
  return (
    <main>
      <section className="feat-hero section" style={{ background: 'linear-gradient(160deg, #f8fafc 0%, #eef4f4 100%)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section-label"><span>●</span> Features</div>
          <h1>Everything your team needs<br /><span style={{ color: 'var(--teal)', fontStyle: 'italic' }}>to master medical records.</span></h1>
          <p style={{ color: 'var(--slate)', fontSize: '1.05rem', maxWidth: '540px', lineHeight: 1.75, marginTop: '1rem' }}>
            Lexx AI is a complete medical record intelligence platform — not just a summarizer. Here's what's under the hood.
          </p>
        </div>
      </section>

      {featureSections.map((section, si) => (
        <section key={section.label} className={`section feat-section ${si % 2 === 1 ? 'feat-section--alt' : ''}`}>
          <div className="container">
            <div className="feat-section__header">
              <div className="section-label"><span>●</span> {section.label}</div>
              <h2>{section.title}</h2>
              <p>{section.sub}</p>
            </div>
            <div className="feat-grid">
              {section.features.map(f => (
                <div key={f.title} className="feat-card card">
                  <div className="feat-card__icon">{f.icon}</div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="section" style={{ textAlign: 'center' }}>
        <div className="container">
          <h2>See every feature in action</h2>
          <p style={{ color: 'var(--slate)', margin: '1rem 0 2rem', fontSize: '1.05rem' }}>Book a live demo tailored to your practice area. No generic walkthroughs — we demo on real record types.</p>
          <Link to="/contact" className="btn-primary">Request a Live Demo →</Link>
        </div>
      </section>
    </main>
  );
}
