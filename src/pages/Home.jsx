import { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';
import './Home.css';

const ROTATING_WORDS = [
  "to claim letter",
  "to delay narrative",
  "to timeline",
  "to case summary",
];

const problems = [
  {
    title: 'Thousands of pages per case',
    desc: 'Contracts, RFIs, daily logs, change orders, schedule updates, and depositions scattered across every contractor, subcontractor, and project phase — with no way to see it all at once.'
  },
  {
    title: 'Manual review burns paralegal hours',
    desc: "Building delay timelines and chasing contradictions by hand takes weeks. That time doesn't scale, and it pulls your best people away from work that actually moves cases forward."
  },
  {
    title: 'Critical contradictions get missed',
    desc: 'The date in the daily log that contradicts the change order. The delay attribution that quietly shifts between letters. These details win and lose cases — and they hide in plain sight.'
  },
];

const solutions = [
  { label: 'AI-Powered Extraction' },
  { label: 'Instant Timelines' },
  { label: 'Built for Construction Litigators' },
];

function useFadeUp(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FadeUpCard({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(36px)',
      transition: `opacity 0.85s ease ${delay}ms, transform 0.85s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [wordHeight, setWordHeight] = useState(80);
  const firstWordRef = useRef(null);

  const [clientsRef, clientsVisible] = useFadeUp(0.2);
  const [problemsRef, problemsVisible] = useFadeUp();
  const [solutionRef, solutionVisible] = useFadeUp();
  const [ctaRef, ctaVisible] = useFadeUp();
  const [dashboardRef, dashboardVisible] = useFadeUp(0.05);

  const revealRef = useRef(null);
  const [revealAnimated, setRevealAnimated] = useState(false);

  useEffect(() => {
    if (firstWordRef.current) {
      setWordHeight(firstWordRef.current.offsetHeight);
    }
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const el = revealRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const revealFeatures = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="9" y1="13" x2="15" y2="13"/>
          <line x1="9" y1="17" x2="12" y2="17"/>
        </svg>
      ),
      label: 'AI-Powered Extraction',
      desc: 'Contracts, RFIs, daily logs, change orders, and depositions parsed automatically — every fact, date, and dollar amount pulled and structured.',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <line x1="8" y1="6" x2="21" y2="6"/>
          <line x1="8" y1="12" x2="21" y2="12"/>
          <line x1="8" y1="18" x2="21" y2="18"/>
          <line x1="3" y1="6" x2="3.01" y2="6"/>
          <line x1="3" y1="12" x2="3.01" y2="12"/>
          <line x1="3" y1="18" x2="3.01" y2="18"/>
        </svg>
      ),
      label: 'Instant Timelines',
      desc: 'Every event from every document merged into one chronological view, with source attribution on every entry.',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2"/>
          <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
        </svg>
      ),
      label: 'Built for Construction Litigators',
      desc: 'Delay claims, defect cases, payment disputes, contractor disputes — case-type-specific checklists and draft generation for all four.',
    },
  ];

  return (
    <main>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&family=DM+Sans:wght@300;400;500&display=swap');

        .lexx-hero * { box-sizing: border-box; }

        .lexx-hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 120px 60px 80px;
          text-align: center;
          background: #f8f8f6;
          font-family: "DM Sans", sans-serif;
        }

        .lexx-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #0a0a0a;
          color: #f8f8f6;
          padding: 6px 16px;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 40px;
          animation: lexxFadeUp 0.8s ease both;
        }

        .lexx-badge::before {
          content: "";
          width: 6px; height: 6px;
          background: #f8f8f6;
          border-radius: 50%;
          opacity: 0.7;
        }

        .lexx-headline {
          font-family: "Playfair Display", serif;
          font-size: clamp(2.8rem, 6vw, 5rem);
          font-weight: 900;
          line-height: 1.05;
          color: #0a0a0a;
          margin: 0;
          animation: lexxFadeUp 0.8s ease 0.15s both;
        }

        .lexx-rotating-wrapper {
          display: block;
          overflow: hidden;
          position: relative;
        }

        .lexx-rotating-inner {
          display: flex;
          flex-direction: column;
          transition: transform 0.55s cubic-bezier(0.77, 0, 0.175, 1);
        }

        .lexx-rotating-word {
          display: flex;
          align-items: center;
          justify-content: center;
          font-style: italic;
          color: #0a0a0a;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .lexx-suffix { display: block; color: #a0a09e; }

        .lexx-sub {
          margin-top: 32px;
          font-size: 1.1rem;
          color: #606060;
          font-weight: 300;
          max-width: 520px;
          line-height: 1.7;
          animation: lexxFadeUp 0.8s ease 0.3s both;
        }

        .lexx-actions {
          display: flex;
          gap: 16px;
          margin-top: 40px;
          animation: lexxFadeUp 0.8s ease 0.45s both;
        }

        .lexx-btn-primary {
          background: #0a0a0a;
          color: #f8f8f6;
          padding: 14px 32px;
          border-radius: 8px;
          font-size: 0.95rem;
          font-weight: 500;
          font-family: "DM Sans", sans-serif;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 2px 16px rgba(0,0,0,0.15);
        }

        .lexx-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        }

        .lexx-btn-secondary {
          background: transparent;
          color: #0a0a0a;
          padding: 14px 32px;
          border-radius: 8px;
          font-size: 0.95rem;
          font-weight: 400;
          font-family: "DM Sans", sans-serif;
          text-decoration: none;
          border: 1.5px solid #d8d8d6;
          transition: border-color 0.2s, background 0.2s;
        }

        .lexx-btn-secondary:hover {
          border-color: #0a0a0a;
          background: #f0f0ee;
        }

        .lexx-early-access {
          display: flex;
          gap: 32px;
          margin-top: 56px;
          padding-top: 40px;
          border-top: 1px solid #d8d8d6;
          animation: lexxFadeUp 0.8s ease 0.6s both;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
        }

        .lexx-early-tag {
          background: #0a0a0a;
          color: #f8f8f6;
          padding: 8px 20px;
          border-radius: 100px;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .lexx-early-text {
          font-size: 0.92rem;
          color: #606060;
          line-height: 1.6;
          max-width: 380px;
          margin: 0;
        }

        .lexx-early-text strong { color: #0a0a0a; }

        /* Dashboard */
        .lexx-dashboard {
          width: 100%;
          max-width: 900px;
          margin-top: 64px;
          position: relative;
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 1.2s ease, transform 1.2s ease;
        }

        .lexx-dashboard.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .lexx-dashboard-label {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: #0a0a0a;
          color: #f8f8f6;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 4px 14px;
          border-radius: 100px;
          white-space: nowrap;
          font-family: "DM Sans", sans-serif;
        }

        .lexx-dashboard-img {
          width: 100%;
          border-radius: 14px;
          border: 1px solid #d8d8d6;
          box-shadow: 0 4px 6px rgba(0,0,0,0.04), 0 24px 48px rgba(0,0,0,0.1), 0 48px 80px rgba(0,0,0,0.06);
          display: block;
        }

        /* Testimonial */
        .lexx-testimonial {
          background: #f0f0ee;
          border-top: 1px solid #d8d8d6;
          border-bottom: 1px solid #d8d8d6;
          padding: 64px 60px;
          text-align: center;
        }

        .lexx-testimonial__inner {
          max-width: 680px;
          margin: 0 auto;
        }

        .lexx-testimonial__quote {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.3rem, 3vw, 1.8rem);
          font-weight: 700;
          font-style: italic;
          color: #0a0a0a;
          line-height: 1.5;
          margin: 0 0 24px;
        }

        .lexx-testimonial__meta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          font-size: 0.85rem;
          color: #606060;
          flex-wrap: wrap;
        }

        .lexx-testimonial__tag {
          background: #0a0a0a;
          color: #f8f8f6;
          padding: 4px 12px;
          border-radius: 100px;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        /* Clients deserve better section */
        .clients-section {
          background: #0a0a0a;
          padding: 100px 60px;
          text-align: center;
        }

        .clients-section__inner {
          max-width: 760px;
          margin: 0 auto;
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 1s ease, transform 1s ease;
        }

        .clients-section__inner.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .clients-section__label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.1);
          color: #f8f8f6;
          padding: 5px 14px;
          border-radius: 100px;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 32px;
          font-family: "DM Sans", sans-serif;
        }

        .clients-section__headline {
          font-family: "Playfair Display", serif;
          font-size: clamp(2.2rem, 5vw, 3.8rem);
          font-weight: 900;
          color: #f8f8f6;
          line-height: 1.1;
          margin: 0 0 24px;
        }

        .clients-section__headline em {
          font-style: italic;
          color: #a0a09e;
        }

        .clients-section__sub {
          font-size: 1.05rem;
          color: rgba(248,248,246,0.6);
          line-height: 1.75;
          max-width: 540px;
          margin: 0 auto 40px;
          font-family: "DM Sans", sans-serif;
        }

        .clients-section__cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #f8f8f6;
          color: #0a0a0a;
          padding: 14px 32px;
          border-radius: 8px;
          font-size: 0.95rem;
          font-weight: 600;
          font-family: "DM Sans", sans-serif;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 2px 16px rgba(255,255,255,0.1);
        }

        .clients-section__cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(255,255,255,0.15);
        }

        /* Fade up utility */
        .fade-up {
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 0.85s ease, transform 0.85s ease;
        }

        .fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes lexxFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .lexx-hero { padding: 100px 24px 60px; }
          .lexx-early-access { gap: 16px; }
          .lexx-actions { flex-direction: column; width: 100%; }
          .lexx-btn-primary, .lexx-btn-secondary { justify-content: center; }
          .clients-section { padding: 72px 24px; }
        }

        /* ── ONE-SHOT REVEAL SECTION ── */
        .reveal-section {
          background: #f8f8f6;
          border-top: 1px solid #d8d8d6;
          padding: 100px 0;
        }

        .reveal-layout {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 60px;
          display: flex;
          align-items: center;
        }

        .reveal-copy {
          flex: 0 0 40%;
          display: flex;
          flex-direction: column;
          gap: 36px;
          z-index: 2;
        }

        .reveal-eyebrow {
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #606060;
          margin: 0 0 4px;
          font-family: "DM Sans", sans-serif;
        }

        .reveal-bullet {
          display: flex;
          align-items: flex-start;
          gap: 18px;
          opacity: 0;
          transform: translateY(20px);
        }

        .reveal-bullet__icon {
          flex-shrink: 0;
          width: 42px;
          height: 42px;
          border-radius: 10px;
          background: #0a0a0a;
          color: #f8f8f6;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 1px;
        }

        .reveal-bullet__text strong {
          display: block;
          font-size: 1rem;
          font-weight: 600;
          color: #0a0a0a;
          margin-bottom: 6px;
          font-family: "DM Sans", sans-serif;
          line-height: 1.3;
        }

        .reveal-bullet__text p {
          font-size: 0.88rem;
          color: #606060;
          line-height: 1.7;
          margin: 0;
          font-family: "DM Sans", sans-serif;
        }

        .reveal-image-wrap {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .reveal-image-img {
          width: 100%;
          max-width: 640px;
          border-radius: 14px;
          border: 1px solid #d8d8d6;
          box-shadow: 0 4px 6px rgba(0,0,0,0.04), 0 24px 48px rgba(0,0,0,0.1), 0 48px 80px rgba(0,0,0,0.06);
          display: block;
          background: #e8e8e6;
          min-height: 360px;
        }

        /* Animate only when motion is OK — triggered by .reveal-animated class */
        @media (prefers-reduced-motion: no-preference) {
          .reveal-image-wrap {
            will-change: transform;
            transition: transform 700ms ease-out;
          }
          .reveal-animated .reveal-image-wrap {
            transform: translateX(14%);
          }
          .reveal-bullet {
            will-change: opacity, transform;
            transition: opacity 600ms ease-out, transform 600ms ease-out;
          }
          .reveal-animated .reveal-bullet {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Reduced motion: skip transitions, show final state immediately */
        @media (prefers-reduced-motion: reduce) {
          .reveal-bullet { opacity: 1; transform: none; }
          .reveal-image-wrap { transform: translateX(14%); }
        }

        /* Mobile: static stacked layout, no animation */
        @media (max-width: 768px) {
          .reveal-section { padding: 60px 0; }
          .reveal-layout { flex-direction: column; padding: 0 24px; gap: 40px; align-items: stretch; }
          .reveal-copy { flex: none; width: 100%; gap: 28px; }
          .reveal-bullet { opacity: 1 !important; transform: none !important; transition: none !important; }
          .reveal-image-wrap { flex: none; width: 100%; transform: none !important; transition: none !important; order: -1; }
          .reveal-image-img { max-width: 100%; min-height: 200px; }
        }
      `}</style>

      {/* HERO */}
      <section className="lexx-hero">
        <div className="lexx-badge">Now in Beta</div>

        <h1 className="lexx-headline">
          <span style={{ display: "block" }}>From case file</span>
          <span className="lexx-rotating-wrapper" style={{ height: wordHeight + "px" }}>
            <span
              className="lexx-rotating-inner"
              style={{ transform: `translateY(-${current * wordHeight}px)` }}
            >
              {[...ROTATING_WORDS, ROTATING_WORDS[0]].map((word, i) => (
                <span
                  key={i}
                  ref={i === 0 ? firstWordRef : null}
                  className="lexx-rotating-word"
                  style={{ height: wordHeight + "px" }}
                >
                  {word}
                </span>
              ))}
            </span>
          </span>
          <span className="lexx-suffix">in minutes.</span>
        </h1>

        <p className="lexx-sub">
          AI-powered intelligence for construction litigation. Upload contracts, RFIs,
          daily logs, change orders, and depositions — get timelines, contradictions,
          and draft-ready output in minutes.
        </p>

        <div className="lexx-actions">
          <Link to="/contact" className="lexx-btn-primary">Join the Waitlist &rarr;</Link>
          <Link to="/how-it-works" className="lexx-btn-secondary">See How It Works</Link>
        </div>

        <div className="lexx-early-access">
          <span className="lexx-early-tag">Early Access</span>
          <p className="lexx-early-text">
            We're recruiting <strong>design partners</strong> from South Florida construction litigation boutiques. Join the waitlist to get early access and shape the product with us.
          </p>
        </div>

        <div
          ref={dashboardRef}
          className={`lexx-dashboard${dashboardVisible ? ' visible' : ''}`}
        >
          <span className="lexx-dashboard-label">Live Dashboard</span>
          <img
            src="/images/dashboard-main.png"
            alt="Lexx dashboard showing active construction litigation matters, document counts, and recent activity"
            className="lexx-dashboard-img"
          />
        </div>
      </section>

      {/* YOUR CLIENTS DESERVE BETTER */}
      <section className="clients-section">
        <div
          ref={clientsRef}
          className={`clients-section__inner${clientsVisible ? ' visible' : ''}`}
        >
          <div className="clients-section__label">Why it matters</div>
          <h2 className="clients-section__headline">
            Your clients deserve<br /><em>better than buried case files.</em>
          </h2>
          <p className="clients-section__sub">
            Contracts, RFIs, daily logs, change orders, schedules, depositions — scattered across thousands of pages, filed by dozens of parties. Critical contradictions and timeline gaps hide in plain sight. Your client's case depends on finding them. Lexx AI makes sure you do.
          </p>
          <Link to="/contact" className="clients-section__cta">
            Get Early Access &rarr;
          </Link>
        </div>
      </section>

      {/* ONE-SHOT REVEAL FEATURE SECTION */}
      <section
        ref={revealRef}
        className={`reveal-section${revealAnimated ? ' reveal-animated' : ''}`}
        aria-label="Feature highlights"
      >
        <div className="reveal-layout">

          {/* LEFT: staggered feature bullets */}
          <div className="reveal-copy">
            <p className="reveal-eyebrow">What Lexx does</p>
            {revealFeatures.map((f, i) => (
              <div
                key={f.label}
                className="reveal-bullet"
                style={{ transitionDelay: `${i * 200}ms` }}
              >
                <div className="reveal-bullet__icon">{f.icon}</div>
                <div className="reveal-bullet__text">
                  <strong>{f.label}</strong>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: screenshot — slides right on first reveal */}
          <div className="reveal-image-wrap">
            <img
              src="/images/dashboard-detail.png"
              alt="Lexx case-scoped chat generating an in-depth case summary with citations to source documents"
              className="reveal-image-img"
            />
          </div>

        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="lexx-testimonial">
        <div className="lexx-testimonial__inner">
          <blockquote className="lexx-testimonial__quote">
            "Building a delay timeline by hand means opening 40 different files and hoping you catch every contradiction. One missed change order date and the whole argument falls apart."
          </blockquote>
          <div className="lexx-testimonial__meta">
            — Paralegal, Construction Litigation Boutique
            <span className="lexx-testimonial__tag">Why firms are switching to Lexx</span>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="section problem-section">
        <div className="container">
          <div
            ref={problemsRef}
            className={`problem-section__header fade-up${problemsVisible ? ' visible' : ''}`}
          >
            <h2>Construction case file review<br />shouldn't be this hard</h2>
            <p>Your team is spending days on work that should take minutes. There's a better way.</p>
          </div>
          <div className="problem-section__grid">
            {problems.map((p, i) => (
              <FadeUpCard key={p.title} delay={i * 120}>
                <div className="problem-card">
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </div>
              </FadeUpCard>
            ))}
          </div>
          <div
            ref={solutionRef}
            className={`solution-callout fade-up${solutionVisible ? ' visible' : ''}`}
          >
            <div className="solution-callout__check">How Lexx AI Solves This</div>
            <div className="solution-callout__row">
              {solutions.map(s => (
                <div key={s.label} className="solution-callout__item">
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
          <div
            ref={ctaRef}
            className={`bottom-cta__inner fade-up${ctaVisible ? ' visible' : ''}`}
          >
            <h2>Be one of the first firms to use Lexx AI.</h2>
            <p>We're accepting a limited number of beta firms. Join the waitlist or book a call to see it live.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn-teal">Join the Waitlist →</Link>
              <Link to="/contact" className="btn-secondary" style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}>Book a Demo Call</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
