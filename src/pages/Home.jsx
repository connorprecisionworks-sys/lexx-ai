import { useEffect, useRef, useState } from "react";
import Lenis from '@studio-freight/lenis';
import { Link } from 'react-router-dom';
import './Home.css';

const ROTATING_WORDS = [
  "to demand letter",
  "to narrative",
  "to chronology",
  "to case summary",
];

const problems = [
  {
    title: 'Medical records are dense and disorganized',
    desc: 'Thousands of pages of unstructured clinical notes, lab results, imaging reports, and billing codes buried across multiple providers.'
  },
  {
    title: 'Manual review is costing you billable hours',
    desc: "Paralegals and associates spend weeks manually reading records — time that doesn't scale and eats into your firm's profitability."
  },
  {
    title: 'Critical details get missed',
    desc: 'Pre-existing conditions, causation gaps, and inconsistencies buried on page 847 of 1,200 can sink a case or delay settlement.'
  },
];

const solutions = [
  { label: 'AI-Powered Extraction' },
  { label: 'Instant Chronologies' },
  { label: 'Built for Litigators' },
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

  useEffect(() => {
    if (firstWordRef.current) {
      setWordHeight(firstWordRef.current.offsetHeight);
    }
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

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
      `}</style>

      {/* HERO */}
      <section className="lexx-hero">
        <div className="lexx-badge">Now in Beta</div>

        <h1 className="lexx-headline">
          <span style={{ display: "block" }}>From record pile</span>
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
          Lexx AI reads, extracts, and summarizes medical records so your team
          can focus on strategy — not paperwork. Built for personal injury and
          anyone who needs to process records at scale.
        </p>

        <div className="lexx-actions">
          <Link to="/contact" className="lexx-btn-primary">Join the Waitlist &rarr;</Link>
          <Link to="/how-it-works" className="lexx-btn-secondary">See How It Works</Link>
        </div>

        <div className="lexx-early-access">
          <span className="lexx-early-tag">Early Access</span>
          <p className="lexx-early-text">
            We're onboarding our first beta firms now. <strong>Join the waitlist</strong> to get early access and shape the product with us.
          </p>
        </div>

        <div
          ref={dashboardRef}
          className={`lexx-dashboard${dashboardVisible ? ' visible' : ''}`}
        >
          <span className="lexx-dashboard-label">Live Dashboard</span>
          <img
            src="/dashboard.png"
            alt="Lexx AI Case Review Dashboard"
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
            Your clients deserve<br /><em>better than buried records.</em>
          </h2>
          <p className="clients-section__sub">
            Every missed detail is a missed opportunity — for your case, your client, and your firm.
            Lexx AI makes sure nothing gets left on the table.
          </p>
          <Link to="/contact" className="clients-section__cta">
            Get Early Access &rarr;
          </Link>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="section problem-section">
        <div className="container">
          <div
            ref={problemsRef}
            className={`problem-section__header fade-up${problemsVisible ? ' visible' : ''}`}
          >
            <h2>Medical record review<br />shouldn't be this hard</h2>
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
