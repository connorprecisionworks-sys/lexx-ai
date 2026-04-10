import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Pricing.css';

const plans = [
  {
    name: 'Starter',
    volume: '2–5 matters/month',
    desc: 'For solo construction litigators and boutiques getting started with AI-powered timeline building, contradiction detection, and draft generation.',
    features: [
      'Unified timeline generation',
      'Contradiction and gap detection',
      'Deposition analysis',
      'Draft generation (claim letters, delay narratives)',
      'PDF & Word export',
      'Email support',
    ],
    cta: 'Book a Call',
    highlight: false,
  },
  {
    name: 'Growth',
    volume: '5–18 matters/month',
    desc: 'For established construction litigation boutiques running multiple active matters — defect, delay, payment, and contractor disputes — simultaneously.',
    features: [
      'Everything in Starter',
      'All eight construction draft types',
      'Cross-matter contradiction detection',
      'Team collaboration tools',
      'Priority support + onboarding',
    ],
    cta: 'Book a Call',
    highlight: true,
    badge: 'Most Popular',
  },
  {
    name: 'Scale',
    volume: '18+ matters/month',
    desc: 'For construction practice groups at general civil firms running high volume across defect, delay, payment dispute, and contractor matters.',
    features: [
      'Everything in Growth',
      'Unlimited matter volume',
      'Dedicated success manager',
      'Custom AI tuning for your case types',
      'White-label available',
    ],
    cta: 'Book a Call',
    highlight: false,
  },
];

const faqs = [
  { q: 'What document types does Lexx handle?', a: 'Contracts, RFIs, daily logs, change orders, schedule updates, depositions, correspondence, and expert reports. PDF, DOCX, and TXT are all supported. Lexx identifies each document type automatically and applies the right extraction logic.' },
  { q: 'How does Lexx handle confidentiality and attorney work product?', a: 'Your case files are processed in a single-tenant environment scoped to your matters only. Nothing you upload is ever used to train Lexx or any third-party model. All output is protected attorney work product.' },
  { q: 'Can I try it before committing?', a: "Yes. We run a design partner program for South Florida construction litigation boutiques — you get full access, we get feedback, and we build around your real matters. Book a call to apply." },
  { q: 'How is this different from ediscovery tools like Relativity or Everlaw?', a: "Lexx isn't ediscovery. It sits on top of your existing document stack and does the analysis and drafting work paralegals currently do by hand — unified timelines, contradiction detection across every document in the matter, and draft generation across eight construction-specific output types." },
  { q: 'What kinds of construction matters does it support?', a: 'Construction defect, delay claims, payment disputes, and contractor disputes. Lexx understands all four case types and runs case-type-specific checklists — so the contradictions and gaps it flags are the ones that actually matter for your theory of the case.' },
];

export default function Pricing() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <main className="pricing-page">

      {/* HERO */}
      <section className="pricing-hero">
        <div className="pricing-hero__inner">
          <div className="pricing-hero__label">Pricing</div>
          <h1 className="pricing-hero__headline">
            Simple tiers.<br />
            <span className="pricing-hero__accent">Pricing on a call.</span>
          </h1>
          <p className="pricing-hero__sub">
            Every construction litigation firm is different. Pick the tier that fits your case volume and we'll walk you through pricing on a 20-minute call.
          </p>
        </div>
      </section>

      {/* PLANS */}
      <section className="pricing-plans">
        <div className="pricing-grid">
          {plans.map(p => (
            <div key={p.name} className={`pricing-card ${p.highlight ? 'highlight' : ''}`}>
              {p.badge && <div className="pricing-badge">{p.badge}</div>}
              <div className="pricing-card__name">{p.name}</div>
              <div className="pricing-card__volume">{p.volume}</div>
              <p className="pricing-card__desc">{p.desc}</p>
              <Link to="/contact" className={p.highlight ? 'pricing-btn-primary' : 'pricing-btn-secondary'}>
                {p.cta} →
              </Link>
              <ul className="pricing-card__features">
                {p.features.map(f => (
                  <li key={f}><span className="check">✓</span> {f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="pricing-faq">
        <div className="pricing-faq__inner">
          <div className="pricing-faq__header">
            <div className="pricing-label">FAQ</div>
            <h2>Frequently asked questions</h2>
          </div>
          <div className="faq-list">
            {faqs.map((f, i) => (
              <div
                key={i}
                className={`faq-item ${openFaq === i ? 'open' : ''}`}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div className="faq-item__q">
                  <span>{f.q}</span>
                  <span className="faq-chevron">{openFaq === i ? '−' : '+'}</span>
                </div>
                {openFaq === i && <div className="faq-item__a">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="pricing-cta">
        <div className="pricing-cta__inner">
          <h2>Not sure which tier fits?</h2>
          <p>Book a call and we'll figure it out together based on your caseload and workflow.</p>
          <Link to="/contact" className="pricing-btn-white">Book a Call →</Link>
        </div>
      </section>
    </main>
  );
}
