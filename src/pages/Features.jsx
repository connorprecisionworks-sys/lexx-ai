import { Link } from 'react-router-dom';
import './Features.css';

const featureSections = [
  {
    label: 'Core Intelligence',
    title: 'AI that understands clinical language',
    sub: 'Not just keyword matching — Lexx AI reasons through medical context the way a trained nurse-paralegal would.',
    bg: 'light',
    features: [
      { title: 'Clinical NLP Engine', desc: 'Understands ICD codes, CPT codes, drug names, anatomical terminology, and physician shorthand — across all specialties.' },
      { title: 'Automatic Chronologies', desc: 'Every medical event extracted and placed on a precise timeline. Gaps, overlaps, and conflicts flagged automatically.' },
      { title: 'Causation Analysis', desc: 'Lexx maps the injury chain from incident to treatment, identifying pre-existing conditions and inconsistencies that affect case value.' },
      { title: 'Smart Flagging', desc: 'Suspicious gaps, contradictory notes, missing records, and defense-side ammunition flagged before you ever open a file.' },
    ],
  },
  {
    label: 'Workflow',
    title: 'Built into how your firm actually works',
    sub: "Lexx AI doesn't replace your workflow — it powers it.",
    bg: 'dark',
    features: [
      { title: 'Natural Language Q&A', desc: 'Ask questions about any record in plain English. Get precise answers with citations back to the source document.' },
      { title: 'One-Click Export', desc: 'Export chronologies, summaries, and flagged records as formatted PDFs or Word docs — ready for demand letters, depositions, or mediation.' },

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
          <span className="feat-hero__accent">to master medical records.</span>
        </h1>
        <p className="feat-hero__sub">
          Lexx AI is a complete medical record intelligence platform — not just a summarizer.
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
