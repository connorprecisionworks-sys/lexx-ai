import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './HowItWorks.css';

const steps = [
  {
    num: '01',
    title: 'Upload Your Case File',
    desc: 'Drag and drop any file format — PDFs, scanned documents, Word files, and more. Lexx AI accepts them all and begins reading immediately.',
  },
  {
    num: '02',
    title: 'AI Reads Every Page',
    desc: 'Our AI engine reads every page — clinical notes, lab results, imaging reports, provider notes, billing records. Nothing gets skipped.',
  },
  {
    num: '03',
    title: 'Records Get Processed',
    desc: 'Lexx extracts every medical event, diagnosis, treatment, medication, and date — structuring raw records into clean usable data.',
  },
  {
    num: '04',
    title: 'Chronology Generated',
    desc: 'A complete date-ordered medical timeline is built automatically — every event in sequence, gaps flagged, inconsistencies surfaced.',
  },
  {
    num: '05',
    title: 'Narrative Created',
    desc: 'Lexx writes a clear medical narrative summarizing the case — ready to drop into a demand letter, mediation brief, or case summary.',
  },
  {
    num: '06',
    title: 'Flags Reviewed',
    desc: 'Pre-existing conditions, causation gaps, missing records, and contradictory notes are all flagged before you ever open a file.',
  },
  {
    num: '07',
    title: 'Refine With the AI Chatbot',
    desc: 'Ask Lexx anything in plain English — medications at discharge, prior injuries, MMI opinions. Get precise answers with source citations.',
  },
  {
    num: '08',
    title: 'Download & Use',
    desc: 'Export your chronology, narrative, case summary, or flagged records as formatted PDFs or Word docs — ready for demand letters or depositions.',
  },
];

export default function HowItWorks() {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const stepRefs = useRef([]);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [lineHeight, setLineHeight] = useState(0);
  const [heroVisible, setHeroVisible] = useState(false);
  const heroRef = useRef(null);
  const [ctaVisible, setCtaVisible] = useState(false);
  const ctaRef = useRef(null);

  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setHeroVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(heroEl);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const ctaEl = ctaRef.current;
    if (!ctaEl) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setCtaVisible(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(ctaEl);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      const line = lineRef.current;
      if (!container || !line) return;

      const containerRect = container.getBoundingClientRect();
      const containerTop = containerRect.top + window.scrollY;
      const containerHeight = containerRect.height;
      const scrollY = window.scrollY;
      const windowH = window.innerHeight;

      // How far through the container we've scrolled (0 to 1)
      const progress = Math.max(0, Math.min(1,
        (scrollY + windowH * 0.6 - containerTop) / containerHeight
      ));

      const newHeight = progress * containerHeight;
      setLineHeight(newHeight);

      // Check each step dot position
      const newVisible = [];
      stepRefs.current.forEach((ref, i) => {
        if (!ref) return;
        const dotRect = ref.getBoundingClientRect();
        const dotTop = dotRect.top + window.scrollY;
        const dotRelative = dotTop - containerTop;
        if (newHeight >= dotRelative + 20) {
          newVisible.push(i);
        }
      });
      setVisibleSteps(newVisible);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="hiw-page">

      {/* HERO */}
      <section className="hiw-hero">
        <div
          ref={heroRef}
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
      <section className="hiw-timeline-section">
        <div className="hiw-timeline" ref={containerRef}>

          {/* The animated line */}
          <div className="hiw-line-track">
            <div
              ref={lineRef}
              className="hiw-line-fill"
              style={{ height: `${lineHeight}px` }}
            />
          </div>

          {/* Steps */}
          {steps.map((step, i) => {
            const isVisible = visibleSteps.includes(i);
            const isLeft = i % 2 === 0;
            return (
              <div
                key={step.num}
                className={`hiw-step ${isLeft ? 'hiw-step--left' : 'hiw-step--right'}`}
              >
                {/* Card */}
                <div
                  className="hiw-card"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible
                      ? 'translateX(0) translateY(0)'
                      : `translateX(${isLeft ? '-24px' : '24px'}) translateY(8px)`,
                    transition: 'opacity 0.6s ease, transform 0.6s ease',
                  }}
                >
                  <div className="hiw-card__num">{step.num}</div>
                  <h3 className="hiw-card__title">{step.title}</h3>
                  <p className="hiw-card__desc">{step.desc}</p>
                </div>

                {/* Dot on the line */}
                <div
                  ref={el => stepRefs.current[i] = el}
                  className={`hiw-dot ${isVisible ? 'hiw-dot--active' : ''}`}
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="hiw-cta">
        <div
          ref={ctaRef}
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
