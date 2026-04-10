import { Link } from 'react-router-dom';
import './Features.css';

const featureSections = [
  {
    label: 'Core Intelligence',
    title: 'AI that understands construction project language',
    sub: 'Not just keyword matching — Lexx AI reasons through construction project context the way a trained construction paralegal would.',
    bg: 'light',
    features: [
      { title: 'Construction Document NLP', desc: 'Lexx understands construction-specific language: RFIs, change orders, schedule narratives, daily logs, deposition Q&A. Trained on the document types you actually deal with — not generic legal text.' },
      { title: 'Unified Case Timelines', desc: 'Every event from every document merged into one chronological view, with source attribution on every entry. See the whole case in order for the first time.' },
      { title: 'Contradiction Detection', desc: 'Lexx actively hunts for contradictions across your case file: date mismatches, conflicting delay attribution, dollar amounts that don\'t reconcile, fault allocation that shifts between letters. Every flag comes with an explanation and source citations.' },
      { title: 'Smart Flagging', desc: 'Auto-flags missing information, high-significance deposition admissions, follow-up questions, and contradictions across documents. Manual flagging available on any passage.' },
    ],
  },
  {
    label: 'Workflow',
    title: 'Built into how your firm actually works',
    sub: "Lexx AI doesn't replace your workflow — it powers it.",
    bg: 'dark',
    features: [
      { title: 'Natural Language Q&A', desc: 'Case-scoped chat with inline citations. Ask anything about the file — "when did the owner first know about the cracking?" — and get answers with the source document linked. Hard scoped to the current matter only.' },
      { title: 'One-Click Export', desc: 'Every draft — claim letter, delay narrative, defect summary, mediation brief outline, deposition outline, motion outline, client update — exports as a real Word document ready for your letterhead.' },
    ],
  },
];

export default function Features() {
  return (
    <main className="feat-page">

      {/* HERO */}
      <section className="feat-hero">
        <div className="feat-hero__label">Features</div>
        <h1 className="feat-hero__headline">
          Everything your team needs<br />
          <span className="feat-hero__accent">to master construction case files.</span>
        </h1>
        <p className="feat-hero__sub">
          Lexx AI is a complete construction case file intelligence platform — not just a summarizer.
          Here's what's under the hood.
        </p>
      </section>

      {/* FEATURE SECTIONS */}
      {featureSections.map((section) => (
        <section
          key={section.label}
          className={`feat-section ${section.bg === 'dark' ? 'feat-section--dark' : section.bg === 'alt' ? 'feat-section--alt' : ''}`}
        >
          <div className="feat-section__header">
            <div className="feat-section__label">{section.label}</div>
            <h2>{section.title}</h2>
            <p>{section.sub}</p>
          </div>
          <div className="feat-grid">
            {section.features.map(f => (
              <div key={f.title} className="feat-card">
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="feat-cta">
        <h2>See every feature in action</h2>
        <p>Book a live demo tailored to your practice area. No generic walkthroughs.</p>
        <Link to="/contact" className="feat-cta__btn">Request a Live Demo →</Link>
      </section>
    </main>
  );
}
