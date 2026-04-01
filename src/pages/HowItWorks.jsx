import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './HowItWorks.css';

const steps = [
  { num: '01', title: 'Upload Your Case File', desc: 'Drag and drop any file format — PDFs, scanned documents, Word files, and more. Lexx AI accepts them all and begins reading immediately.' },
  { num: '02', title: 'AI Reads Every Page', desc: 'Our AI engine reads every page — clinical notes, lab results, imaging reports, provider notes, billing records. Nothing gets skipped.' },
  { num: '03', title: 'Records Get Processed', desc: 'Lexx extracts every medical event, diagnosis, treatment, medication, and date — structuring raw records into clean usable data.' },
  { num: '04', title: 'Chronology Generated', desc: 'A complete date-ordered medical timeline is built automatically — every event in sequence, gaps flagged, inconsistencies surfaced.' },
  { num: '05', title: 'Narrative Created', desc: 'Lexx writes a clear medical narrative summarizing the case — ready for a demand letter, mediation brief, or case summary.' },
  { num: '06', title: 'Flags Reviewed', desc: 'Pre-existing conditions, causation gaps, missing records, and contradictory notes are all flagged before you ever open a file.' },
  { num: '07', title: 'Refine With the AI Chatbot', desc: 'Ask Lexx anything in plain English — medications at discharge, prior injuries, MMI opinions. Get precise answers with source citations.' },
  { num: '08', title: 'Download & Use', desc: 'Export your chronology, narrative, case summary, or flagged records as formatted PDFs or Word docs — ready for demand letters or depositions.' },
];

// SVG path for the zigzag line
// The viewBox is 600 wide. Cards sit at x=50 (left) and x=350 (right), centered at x=300
// Each row is 180px tall. We alternate: start center-top → left card → center → right card → center → etc.
function buildZigzagPath(steps) {
  const W = 600;
  const centerX = W / 2;
  const leftX = 110;
  const rightX = W - 110;
  const rowH = 200;
  const dotY = (i) => i * rowH + 60; // vertical center of each card

  let d = `M ${centerX} 0`;

  steps.forEach((_, i) => {
    const y = dotY(i);
    const isLeft = i % 2 === 0;
    const cardX = isLeft ? leftX : rightX;
    const prevY = i === 0 ? 0 : dotY(i - 1);
    const midY = (prevY + y) / 2;

    if (i === 0) {
      d += ` C ${centerX} ${midY}, ${cardX} ${midY}, ${cardX} ${y}`;
    } else {
      const prevX = (i - 1) % 2 === 0 ? leftX : rightX;
      d += ` C ${prevX} ${midY}, ${cardX} ${midY}, ${cardX} ${y}`;
    }
  });

  // end line going down
  const lastY = dotY(steps.length - 1);
  const lastX = (steps.length - 1) % 2 === 0 ? leftX : rightX;
  d += ` L ${lastX} ${lastY + 60}`;

  return d;
}

export default function HowItWorks() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const [pathLength, setPathLength] = useState(0);
  const [heroVisible, setHeroVisible] = useState(false);
  const heroRef = useRef(null);
  const [ctaVisible, setCtaVisible] = useState(false);
  const ctaRef = useRef(null);

  const ROW_H = 200;
  const DOT_OFFSET = 60;
  const W = 600;
  const leftX = 110;
  const rightX = W - 110;

  const getDotPos = (i) => ({
    x: i % 2 === 0 ? leftX : rightX,
    y: i * ROW_H + DOT_OFFSET,
  });

  const svgHeight = steps.length * ROW_H + 120;
  const pathD = buildZigzagPath(steps);

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

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
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const sectionH = rect.height;
      const progress = Math.max(0, Math.min(1,
        (window.scrollY + window.innerHeight * 0.55 - sectionTop) / (sectionH * 0.9)
      ));
      setScrollProgress(progress);

      // Which steps are revealed
      const newVisible = [];
      steps.forEach((_, i) => {
        const dotFraction = (i * ROW_H + DOT_OFFSET) / svgHeight;
        if (progress >= dotFraction * 0.95) newVisible.push(i);
      });
      setVisibleSteps(newVisible);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathLength, svgHeight]);

  const strokeDashoffset = pathLength > 0
    ? pathLength * (1 - scrollProgress)
    : pathLength;

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

      {/* ZIGZAG TIMELINE */}
      <section className="hiw-timeline-section" ref={sectionRef}>
        <div className="hiw-timeline-wrap">

          {/* SVG line layer */}
          <svg
            className="hiw-svg"
            viewBox={`0 0 ${W} ${svgHeight}`}
            preserveAspectRatio="xMidYMid meet"
            style={{ height: svgHeight }}
          >
            {/* Ghost track */}
            <path
              d={pathD}
              fill="none"
              stroke="#e8e8e6"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Animated fill */}
            <path
              ref={pathRef}
              d={pathD}
              fill="none"
              stroke="#0a0a0a"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={pathLength}
              strokeDashoffset={strokeDashoffset}
              style={{ transition: 'stroke-dashoffset 0.08s linear' }}
            />
            {/* Dots */}
            {steps.map((_, i) => {
              const pos = getDotPos(i);
              const isActive = visibleSteps.includes(i);
              return (
                <circle
                  key={i}
                  cx={pos.x}
                  cy={pos.y}
                  r={isActive ? 7 : 5}
                  fill={isActive ? '#0a0a0a' : '#e8e8e6'}
                  stroke={isActive ? '#0a0a0a' : '#d0d0ce'}
                  strokeWidth="2"
                  style={{ transition: 'r 0.3s ease, fill 0.3s ease' }}
                />
              );
            })}
          </svg>

          {/* Cards layer — absolutely positioned over SVG */}
          <div
            className="hiw-cards-layer"
            style={{ height: svgHeight }}
          >
            {steps.map((step, i) => {
              const pos = getDotPos(i);
              const isLeft = i % 2 === 0;
              const isVisible = visibleSteps.includes(i);
              return (
                <div
                  key={i}
                  className={`hiw-card-wrap ${isLeft ? 'hiw-card-wrap--left' : 'hiw-card-wrap--right'}`}
                  style={{
                    top: pos.y - 44,
                    left: isLeft ? '0%' : '50%',
                  }}
                >
                  <div
                    className="hiw-card"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible
                        ? 'translateX(0) scale(1)'
                        : `translateX(${isLeft ? '-20px' : '20px'}) scale(0.97)`,
                      transition: 'opacity 0.55s ease, transform 0.55s ease',
                    }}
                  >
                    <div className="hiw-card__num">{step.num}</div>
                    <h3 className="hiw-card__title">{step.title}</h3>
                    <p className="hiw-card__desc">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
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
