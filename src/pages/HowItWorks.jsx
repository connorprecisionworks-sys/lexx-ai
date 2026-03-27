import { Link } from 'react-router-dom';
import './HowItWorks.css';

const steps = [
  {
    num: '01',
    title: 'Upload Your Medical Records',
    desc: 'Drag and drop any file format — PDFs, scanned documents, DICOM reports, billing records, pharmacy logs. Lexx AI handles them all. Records are encrypted immediately on upload.',
    detail: 'Supports: PDF, TIFF, JPG, Word, HL7, DICOM, and more',
  },
  {
    num: '02',
    title: 'AI Reads and Extracts Everything',
    desc: 'Our clinical AI engine reads every page, identifies key medical events, diagnoses, treatments, medications, and provider notes. It understands clinical language the same way a trained medical reviewer would — but in seconds.',
    detail: '99.2% extraction accuracy across 80+ medical specialties',
  },
  {
    num: '03',
    title: 'Get a Complete Case Chronology',
    desc: 'Lexx AI generates a structured, date-ordered timeline of all medical events, flagging causation gaps, pre-existing conditions, treatment gaps, and inconsistencies between providers automatically.',
    detail: 'Exportable as PDF, Word, or structured data',
  },
  {
    num: '04',
    title: 'Review, Flag & Collaborate',
    desc: 'Your team reviews the AI output inside Lexx — annotate, highlight, ask follow-up questions in natural language ("Were there any prior back injuries before the accident?"), and export case-ready summaries.',
    detail: 'Multi-user access with role-based permissions',
  },
];

const useCases = [
  { icon: '🏥', title: 'Personal Injury', desc: 'Causation analysis, gap identification, treating vs. IME discrepancies.' },
  { icon: '⚗️', title: 'Mass Tort', desc: 'Scale record review across thousands of plaintiffs with consistent AI analysis.' },
  { icon: '👶', title: 'Medical Malpractice', desc: 'Standard of care analysis, event sequencing, and provider note extraction.' },
  { icon: '🧑‍🦽', title: 'Workers\' Comp', desc: 'Disability timelines, return-to-work documentation, and injury causation.' },
  { icon: '💊', title: 'Pharmaceutical Litigation', desc: 'Drug event timelines, adverse reaction documentation, and dosage histories.' },
  { icon: '🏗️', title: 'Construction Injury', desc: 'Trauma record analysis, surgical history, and long-term prognosis extraction.' },
];

export default function HowItWorks() {
  return (
    <main>
      <section className="hiw-hero section">
        <div className="container">
          <div className="section-label"><span>●</span> Process</div>
          <h1>From record pile<br /><span style={{ color: 'var(--teal)', fontStyle: 'italic' }}>to case-ready in minutes.</span></h1>
          <p className="hiw-hero__sub">
            Lexx AI turns thousands of pages of unstructured medical records into organized, searchable, flagged case intelligence — automatically.
          </p>
        </div>
      </section>

      {/* STEPS */}
      <section className="section hiw-steps">
        <div className="container">
          {steps.map((s, i) => (
            <div key={s.num} className={`hiw-step ${i % 2 === 1 ? 'reverse' : ''}`}>
              <div className="hiw-step__content">
                <div className="hiw-step__num">{s.num}</div>
                <h2>{s.title}</h2>
                <p>{s.desc}</p>
                <div className="hiw-step__detail">✓ {s.detail}</div>
              </div>
              <div className="hiw-step__visual">
                <div className="hiw-step__box">
                  <div className="hiw-step__box-label">Step {s.num}</div>
                  <div className="hiw-step__box-icon">
                    {['📤', '🧠', '📋', '🔍'][i]}
                  </div>
                  <div className="hiw-step__box-title">{s.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* USE CASES */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="section-label"><span>●</span> Practice Areas</div>
            <h2>Built for every case type</h2>
            <p style={{ color: 'var(--slate)', marginTop: '0.75rem' }}>Lexx AI is trained on clinical data across all major personal injury and litigation practice areas.</p>
          </div>
          <div className="uc-grid">
            {useCases.map(u => (
              <div key={u.title} className="card uc-card">
                <div className="uc-card__icon">{u.icon}</div>
                <h3>{u.title}</h3>
                <p>{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2>See it work on a real case</h2>
          <p style={{ color: 'var(--slate)', margin: '1rem 0 2rem', fontSize: '1.05rem' }}>
            Book a 20-minute demo and we'll run Lexx AI on a sample record set from your practice area.
          </p>
          <Link to="/contact" className="btn-primary">Book Your Demo →</Link>
        </div>
      </section>
    </main>
  );
}
