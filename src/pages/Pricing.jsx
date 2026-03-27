import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Pricing.css';

const plans = [
  {
    name: 'Starter',
    price: { monthly: 299, annual: 249 },
    desc: 'For solo practitioners and small PI firms getting started with AI-powered review.',
    features: [
      'Up to 50 cases/month',
      'AI chronology generation',
      'Clinical event extraction',
      'PDF & Word export',
      '2 user seats',
      'Email support',
    ],
    cta: 'Start Free Trial',
    ctaLink: '/contact',
    highlight: false,
  },
  {
    name: 'Firm',
    price: { monthly: 799, annual: 649 },
    desc: 'For growing litigation firms handling higher volume and needing team collaboration.',
    features: [
      'Up to 250 cases/month',
      'Everything in Starter',
      'Natural language Q&A',
      'Smart causation flagging',
      'Team collaboration tools',
      '10 user seats',
      'Practice management integrations',
      'Priority support + onboarding',
    ],
    cta: 'Start Free Trial',
    ctaLink: '/contact',
    highlight: true,
    badge: 'Most Popular',
  },
  {
    name: 'Enterprise',
    price: { monthly: null, annual: null },
    desc: 'For mass tort practices, litigation finance, and firms with custom security or volume requirements.',
    features: [
      'Unlimited cases',
      'Everything in Firm',
      'Custom AI model tuning',
      'Dedicated infrastructure option',
      'SAML/SSO',
      'Unlimited seats',
      'White-label available',
      'Dedicated success manager',
      'SLA guarantees',
      'Custom BAA',
    ],
    cta: 'Contact Sales',
    ctaLink: '/contact',
    highlight: false,
  },
];

const faqs = [
  { q: 'Is there a free trial?', a: 'Yes — Starter and Firm plans include a 14-day free trial. No credit card required. We\'ll onboard your team and process a sample case set during the trial.' },
  { q: 'How does billing work?', a: 'We bill monthly or annually. Annual plans save approximately 20%. Invoices are issued at the start of each billing cycle. Enterprise contracts are custom.' },
  { q: 'Can I change plans later?', a: 'Absolutely. You can upgrade or downgrade at any time. Upgrades take effect immediately; downgrades apply at the next billing cycle.' },
  { q: 'What counts as a "case"?', a: 'A case is a single matter/plaintiff. You can upload unlimited records per case. Cases reset monthly on your billing date.' },
  { q: 'Is my data used to train AI models?', a: 'No. Your records and case data are never used to train Lexx AI or any third-party models. Your data is yours, always.' },
  { q: 'Do you offer a BAA for HIPAA compliance?', a: 'Yes. A Business Associate Agreement is included with all paid plans. Enterprise clients receive a custom negotiated BAA.' },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <main>
      <section className="pricing-hero section" style={{ background: 'linear-gradient(160deg, #f8fafc 0%, #eef4f4 100%)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="section-label" style={{ margin: '0 auto 1.25rem' }}><span>●</span> Pricing</div>
          <h1>Transparent pricing.<br /><span style={{ color: 'var(--teal)', fontStyle: 'italic' }}>No surprises.</span></h1>
          <p style={{ color: 'var(--slate)', marginTop: '1rem', fontSize: '1.05rem' }}>Start free. Scale as your caseload grows.</p>
          <div className="pricing-toggle">
            <span className={!annual ? 'active' : ''}>Monthly</span>
            <button className={`toggle-btn ${annual ? 'on' : ''}`} onClick={() => setAnnual(!annual)} aria-label="Toggle billing">
              <span />
            </button>
            <span className={annual ? 'active' : ''}>Annual <em>Save 20%</em></span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="pricing-grid">
            {plans.map(p => (
              <div key={p.name} className={`pricing-card ${p.highlight ? 'highlight' : ''}`}>
                {p.badge && <div className="pricing-badge">{p.badge}</div>}
                <div className="pricing-card__name">{p.name}</div>
                <div className="pricing-card__price">
                  {p.price.monthly
                    ? <><span className="price-num">${annual ? p.price.annual : p.price.monthly}</span><span className="price-per">/mo</span></>
                    : <span className="price-custom">Custom</span>
                  }
                </div>
                <p className="pricing-card__desc">{p.desc}</p>
                <Link to={p.ctaLink} className={p.highlight ? 'btn-teal' : 'btn-secondary'} style={{ width: '100%', justifyContent: 'center', marginBottom: '1.5rem' }}>
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
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="section-label" style={{ margin: '0 auto 1.25rem' }}><span>●</span> FAQ</div>
            <h2>Frequently asked questions</h2>
          </div>
          <div className="faq-list">
            {faqs.map((f, i) => (
              <div key={i} className={`faq-item ${openFaq === i ? 'open' : ''}`} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
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

      <section className="section" style={{ textAlign: 'center' }}>
        <div className="container">
          <h2>Not sure which plan is right for you?</h2>
          <p style={{ color: 'var(--slate)', margin: '1rem 0 2rem', fontSize: '1.05rem' }}>Talk to our team and we'll recommend the right fit based on your case volume and practice area.</p>
          <Link to="/contact" className="btn-primary">Talk to Sales →</Link>
        </div>
      </section>
    </main>
  );
}
