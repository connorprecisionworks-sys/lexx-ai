import { useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

const SERVICE_ID = 'service_mfkwpvt';
const TEMPLATE_ID = 'template_vp44bo8';
const PUBLIC_KEY = 'rMSMaa_jaOYeCvYmU';

const practiceAreas = [
  'Construction Defect', 'Delay Claims',
  'Payment Disputes', 'Contractor Disputes',
  'General Construction Litigation', 'Other',
];

const caseVolumes = [
  '1–5 matters/month',
  '5–15 matters/month',
  '15–30 matters/month',
  '30+ matters/month',
];

const recordVolumes = [
  'Under 500 pages/matter',
  '500–2,000 pages/matter',
  '2,000–5,000 pages/matter',
  '5,000+ pages/matter',
];

const painPoints = [
  'Building delay timelines by hand',
  'Hunting contradictions across change orders and daily logs',
  'Paralegal hours lost to document review',
  'Drafting demand letters and claim narratives',
  'Scaling to handle more active matters',
];

const expectItems = [
  {
    step: '01',
    title: '15-minute walkthrough on a real case file',
    desc: 'We run Lexx on a sample construction case file — contracts, RFIs, daily logs, change orders, depositions. Not a scripted demo.',
  },
  {
    step: '02',
    title: 'Live contradiction detection on a delay claim',
    desc: "We'll show you how Lexx finds date mismatches, conflicting delay attribution, and shifting fault allocation across a real matter.",
  },
  {
    step: '03',
    title: 'Design partner — not just a customer',
    desc: "If it's a fit, we onboard you as a design partner. You get full access; we build around your actual matters and workflows.",
  },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '', email: '', firm: '', phone: '',
    area: '', caseVolume: '', recordVolume: '',
    painPoints: [],
    message: ''
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePainPoint = (point) => {
    const current = form.painPoints;
    if (current.includes(point)) {
      setForm({ ...form, painPoints: current.filter(p => p !== point) });
    } else {
      setForm({ ...form, painPoints: [...current, point] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          firm: form.firm,
          phone: form.phone || 'Not provided',
          area: form.area,
          caseVolume: form.caseVolume || 'Not provided',
          recordVolume: form.recordVolume || 'Not provided',
          painPoints: form.painPoints.length > 0 ? form.painPoints.join(', ') : 'Not selected',
          message: form.message || 'No additional message',
        },
        PUBLIC_KEY
      );
      setSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again or email us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="contact-page">

      {/* HERO CTA */}
      <section className="contact-hero">
        <div className="contact-hero__inner">
          <div className="contact-hero__label">Request a Demo</div>
          <h1 className="contact-hero__headline">
            See what your firm could<br />
            <span className="contact-hero__accent">save this month.</span>
          </h1>
          <p className="contact-hero__sub">
            We're onboarding our first beta construction litigation firms now. In a 20-minute call,
            we'll show you exactly how Lexx AI works on your case types.
          </p>
          <div className="contact-hero__proof">
            <div className="proof-item">
              <span className="proof-number">Beta</span>
              <span className="proof-label">Early access open</span>
            </div>
            <div className="proof-divider" />
            <div className="proof-item">
              <span className="proof-number">20 min</span>
              <span className="proof-label">Live demo call</span>
            </div>
            <div className="proof-divider" />
            <div className="proof-item">
              <span className="proof-number">Free</span>
              <span className="proof-label">No credit card needed</span>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="contact-body">
        <div className="contact-layout">

          {/* LEFT */}
          <div className="contact-info">
            <h2 className="contact-info__heading">What happens on the call</h2>
            <div className="expect-list">
              {expectItems.map(item => (
                <div key={item.step} className="expect-item">
                  <div className="expect-item__step">{item.step}</div>
                  <div className="expect-item__content">
                    <strong>{item.title}</strong>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="contact-trust">
              <div className="trust-item">No hard sell — ever</div>
              <div className="trust-item">No credit card required</div>
              <div className="trust-item">Built for construction litigation firms</div>
              <div className="trust-item">Early access — shape the product</div>
            </div>

            <blockquote className="contact-quote">
              "I used to spend two days just building the timeline on a delay claim. Now I spend that time on the argument itself."
              <cite>— Construction Litigation Partner, South Florida Boutique</cite>
            </blockquote>
          </div>

          {/* FORM */}
          <div className="contact-form-wrap">
            {submitted ? (
              <div className="contact-success">
                <div className="contact-success__icon">✓</div>
                <h3>You're on the list.</h3>
                <p>
                  We'll reach out to <strong>{form.email}</strong> within 1 business day
                  to schedule your demo. We've noted your focus on <strong>{form.area || 'your practice area'}</strong> —
                  we'll make sure the walkthrough is relevant.
                </p>
                <div className="success-next">
                  <p>While you wait — here's what to have ready:</p>
                  <ul>
                    <li>A recent case with construction case files</li>
                    <li>Your current case file review workflow</li>
                    <li>Any specific file types you deal with most</li>
                  </ul>
                </div>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-header">
                  <h3>Book your demo</h3>
                  <p>Takes 2 minutes. We use this to personalize your walkthrough.</p>
                </div>

                <div className="form-section-label">Your info</div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input type="text" name="name" required value={form.name} onChange={handleChange} placeholder="Jane Smith" />
                  </div>
                  <div className="form-group">
                    <label>Work Email *</label>
                    <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="jane@smithlaw.com" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Firm Name *</label>
                    <input type="text" name="firm" required value={form.firm} onChange={handleChange} placeholder="Smith & Associates" />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="(555) 000-0000" />
                  </div>
                </div>

                <div className="form-section-label">Your practice</div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Primary Practice Area *</label>
                    <select name="area" required value={form.area} onChange={handleChange}>
                      <option value="">Select area...</option>
                      {practiceAreas.map(a => <option key={a} value={a}>{a}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Active Matters</label>
                    <select name="caseVolume" value={form.caseVolume} onChange={handleChange}>
                      <option value="">Select range...</option>
                      {caseVolumes.map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Avg. Case File Size Per Case</label>
                  <select name="recordVolume" value={form.recordVolume} onChange={handleChange}>
                    <option value="">Select range...</option>
                    {recordVolumes.map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>

                <div className="form-section-label">
                  What's slowing you down? <span className="form-section-hint">(select all that apply)</span>
                </div>
                <div className="pain-points-grid">
                  {painPoints.map(point => (
                    <button
                      type="button"
                      key={point}
                      className={`pain-point-btn ${form.painPoints.includes(point) ? 'active' : ''}`}
                      onClick={() => handlePainPoint(point)}
                    >
                      {point}
                    </button>
                  ))}
                </div>

                <div className="form-group" style={{ marginTop: '1.25rem' }}>
                  <label>Anything specific you want to see?</label>
                  <textarea
                    name="message"
                    rows={3}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="e.g. What's the most painful part of building timelines, finding contradictions, or drafting demand letters across a construction case file?"
                  />
                </div>

                {error && (
                  <p style={{ color: '#c0392b', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
                    {error}
                  </p>
                )}

                <button type="submit" className="form-submit-btn" disabled={loading}>
                  {loading ? 'Sending...' : 'Book My Demo →'}
                </button>
                <p className="form-disclaimer">No spam. No hard sell. We'll never share your information.</p>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
