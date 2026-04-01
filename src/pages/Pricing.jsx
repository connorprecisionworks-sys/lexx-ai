import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Pricing.css';

const plans = [
  {
    name: 'Starter',
    volume: '2–5 cases/month',
    desc: 'For solo practitioners and small firms beginning to explore AI-powered record review.',
    features: [
      'AI chronology generation',
      'Clinical event extraction',
      'PDF & Word export',
      'Natural language Q&A',
      'Email support',
    ],
    cta: 'Book a Call',
    highlight: false,
  },
  {
    name: 'Growth',
    volume: '5–18 cases/month',
    desc: 'For growing litigation firms handling more volume and needing team collaboration tools.',
    features: [
      'Everything in Starter',
      'Smart causation flagging',
      'Team collaboration tools',
      'Priority support + onboarding',
      'Practice management integrations',
    ],
    cta: 'Book a Call',
    highlight: true,
    badge: 'Most Popular',
  },
  {
    name: 'Scale',
    volume: '18+ cases/month',
    desc: 'For high-volume firms and mass tort practices that need unlimited capacity and dedicated support.',
    features: [
      'Everything in Growth',
      'Unlimited case volume',
      'Dedicated success manager',
      'Custom AI tuning',
      'White-label available',
    ],
    cta: 'Book a Call',
    highlight: false,
  },
];

const faqs = [
  { q: 'Is there a free trial?', a: "Yes — all tiers include a 14-day free trial. No credit card required. We'll onboard your team and process a sample case set during the trial." },
  { q: 'How does billing work?', a: 'We offer monthly and annual billing. Annual plans include a discount. Pricing is discussed on your onboarding call based on your firm\'s specific needs.' },
  { q: 'Can I change tiers later?', a: 'Absolutely. You can upgrade or downgrade at any time. Upgrades take effect immediately; downgrades apply at the next billing cycle.' },
  { q: 'What counts as a case?', a: 'A case is a single matter or plaintiff. You can upload unlimited records per case.' },
  { q: 'Is my data used to train AI models?', a: 'No. Your records and case data are never used to train Lexx AI or any third-party models. Your data is yours, always.' },
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
            Every firm is different. Pick the tier that fits your volume and we'll walk you through pricing on a 20-minute call.
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
