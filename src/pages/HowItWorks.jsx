import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './HowItWorks.css';

const steps = [
  {
    num: '01',
    title: 'Upload Your Case File',
    desc: 'Drag and drop any file format — PDFs, scanned documents, Word files, and more. Lexx AI accepts them all and begins reading immediately.',
    detail: 'Supports PDF, TIFF, JPG, Word, and more',
    bg: 'dark',
  },
  {
    num: '02',
    title: 'AI Reads Every Page',
    desc: 'Our AI engine reads every page of the record — clinical notes, lab results, imaging reports, provider notes, billing records. Nothing gets skipped.',
    detail: 'Understands clinical language across all specialties',
    bg: 'light',
  },
  {
    num: '03',
    title: 'Records Get Processed',
    desc: 'Lexx extracts every medical event, diagnosis, treatment, medication, and date — structuring raw unorganized records into clean usable data.',
    detail: 'Structured extraction across all record types',
    bg: 'dark',
  },
  {
    num: '04',
    title: 'Chronology Generated',
    desc: 'A complete date-ordered medical timeline is built automatically — every event in sequence, gaps flagged, inconsistencies surfaced.',
    detail: 'Exportable as PDF or Word doc',
    bg: 'light',
  },
  {
    num: '05',
    title: 'Narrative Created',
    desc: 'Lexx writes a clear medical narrative summarizing the case — ready to drop into a demand letter, mediation brief, or case summary.',
    detail: 'Plain language, attorney-ready format',
    bg: 'dark',
  },
  {
    num: '06',
    title: 'Flags Reviewed',
    desc: 'Pre-existing conditions, causation gaps, missing records, contradictory notes, and defense-side ammunition are all flagged before you ever open a file.',
    detail: 'Priority flags highlighted for immediate review',
    bg: 'light',
  },
  {
    num: '07',
    title: 'Refine With the AI Chatbot',
    desc: 'Ask Lexx anything about the case in plain English. "What were the patient\'s medications at discharge?" "Were there any prior back injuries?" "What was the last treating physician\'s MMI opinion?" Get precise answers with citations.',
    detail: 'Natural language Q&A with source citations',
    bg: 'dark',
  },
  {
    num: '08',
    title: 'Download & Use',
    desc: 'Export your chronology, narrative, case summary, or flagged records as formatted PDFs or Word documents — ready for demand letters, depositions, or mediation.',
    detail: 'One-click export in your preferred format',
    bg: 'light',
  },
];

function TimelineStep({ step, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isDark = step.bg === 'dark';

  return (
    <div
      className={`timeline-step ${isDark ? 'timeline-step--dark' : 'timeline-step--light'}`}
    >
      <div
        ref={ref}
        className="timeline-step__inner"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(48px)',
          transition: `opacity 0.9s ease ${index * 80}ms, transform 0.9s ease ${index * 80}ms`,
        }}
      >
        <div className="timeline-step__num">{step.num}</div>
        <div className="timeline-step__content">
          <h2 className="timeline-step__title">{step.title}</h2>
          <p className="timeline-step__desc">{step.desc}</p>
          <div className="timeline-step__detail">
            <span className="timeline-step__check">✓</span>
            {step.detail}
          </div>
        </div>
        <div className="timeline-step__connector" />
      </div>
    </div>
  );
}

export default function HowItWorks() {
  const [heroRef, setHeroRef] = useState(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const [ctaRef, setCtaRef] = useState(null);
  const [ctaVisible, setCtaVisible] = useState(false);

  useEffect(() => {
    if (!heroRef) return;
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setHeroVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(heroRef);
    return () => observer.disconnect();
  }, [heroRef]);

  useEffect(() => {
    if (!ctaRef) return;
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setCtaVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    observer.observe(ctaRef);
    return () => observer.disconnect();
  }, [ctaRef]);

  return (
    <main className="hiw-page">

      {/* HERO */}
      <section className="hiw-hero">
        <div
          ref={setHeroRef}
          className="hiw-hero__inner"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? 'translateY(0)' : 'translateY(32px)',
            transition: 'opacity 0.9s ease, transform 0.9s ease',
          }}
        >
          <div className="hiw-hero__label">Process</div>
          <h1 className="hiw-hero__headline">
            From case file<br />
            <span className="hiw-hero__accent">to case-ready in minutes.</span>
          </h1>
          <p className="hiw-hero__sub">
            Lexx AI turns thousands of pages of unstructured medical records into
            organized, searchable, flagged case intelligence — automatically.
          </p>
        </div>
      </section>

      {/* TIMELINE */}
      <div className="timeline">
        {steps.map((step, i) => (
          <TimelineStep key={step.num} step={step} index={i} />
        ))}
      </div>

      {/* CTA */}
      <section className="hiw-cta">
        <div
          ref={setCtaRef}
          className="hiw-cta__inner"
          style={{
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? 'translateY(0)' : 'translateY(32px)',
            transition: 'opacity 0.9s ease, transform 0.9s ease',
          }}
        >
          <h2>See it work on a real case</h2>
          <p>Book a 20-minute demo and we'll run Lexx AI on a sample record set from your practice area.</p>
          <Link to="/contact" className="hiw-cta__btn">Book Your Demo →</Link>
        </div>
      </section>
    </main>
  );
}
