import { useState } from 'react';
import './Contact.css';

const practiceAreas = [
  'Personal Injury', 'Mass Tort', 'Medical Malpractice',
  'Workers\' Compensation', 'Pharmaceutical Litigation',
  'Construction Injury', 'Other',
];

const caseVolumes = [
  '1–10 cases/month',
  '10–50 cases/month', 
  '50–200 cases/month',
  '200+ cases/month',
];

const recordVolumes = [
  'Under 500 pages/case',
  '500–2,000 pages/case',
  '2,000–5,000 pages/case',
  '5,000+ pages/case',
];

const painPoints = [
  'Manual record review taking too long',
  'Missing critical details in records',
  'Paralegal time being wasted on paperwork',
  'Scaling to handle more cases',
  'Building demand letters and chronologies',
];

const expectItems = [
  {
    step: '01',
    title: '20-minute live walkthrough',
    desc: 'We process a real record set from your practice area — not a scripted demo.',
  },
  {
    step: '02',
    title: 'Built around your firm',
    desc: 'We\'ll focus on the case types and workflows that matter most to your team.',
  },
  {
    step: '03',
    title: 'Same-day trial access',
    desc: 'If you\'re ready, we can spin up your firm\'s account before the call ends.',
  },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
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

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
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
            The average Lexx AI firm saves 48 hours of paralegal time per month. 
            In a 20-minute call, we'll show you exactly what that looks like for your caseload.
          </p>
          <div className="contact-hero__proof">
            <div className="proof-item">
              <span className="proof-number">85%</span>
              <span className="proof-label">Faster record review</span>
            </div>
            <div className="proof-divider" />
            <div className="proof-item">
              <span className="proof-number">48 hrs</span>
              <span className="proof-label">Saved per month</span>
            </div>
            <div className="proof-divider" />
            <div className="proof-item">
              <span className="proof-number">$1,440</span>
              <span className="proof-label">In paralegal time</span>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="contact-body">
        <div className="contact-layout">

          {/* LEFT — What to expect */}
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
              <div className="trust-item">HIPAA compliant platform</div>
              <div className="trust-item">14-day free trial included</div>
            </div>

            <blockquote className="contact-quote">
              "We cut our record review time from 3 days to 3 hours. 
              The ROI was clear within the first week."
              <cite>— Senior Paralegal, Personal Injury Firm</cite>
            </blockquote>
          </div>

          {/* RIGHT — Form */}
          <div className="contact-form-wrap">
            {submitted ? (
              <div className="contact-success">
                <div className="contact-success__icon"></div>
                <h3>You're on the list.</h3>
                <p>
                  We'll reach out to <strong>{form.email}</strong> within 1 business day 
                  to schedule your demo. We've noted your focus on <strong>{form.area || 'your practice area'}</strong> — 
                  we'll make sure the walkthrough is relevant.
                </p>
                <div className="success-next">
                  <p>While you wait — here's what to have ready:</p>
                  <ul>
                    <li>A recent case with medical records</li>
                    <li>Your current record review workflow</li>
                    <li>Any specific record types you deal with most</li>
                  </ul>
                </div>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-header">
                  <h3>Book your demo</h3>
                  <p>Takes 2 minutes. We use this to personalize your walkthrough.</p>
                </div>

                {/* Basic info */}
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

                {/* Practice */}
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
                    <label>Monthly Case Volume</label>
                    <select name="caseVolume" value={form.caseVolume} onChange={handleChange}>
                      <option value="">Select range...</option>
                      {caseVolumes.map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Avg. Medical Record Size Per Case</label>
                  <select name="recordVolume" value={form.recordVolume} onChange={handleChange}>
                    <option value="">Select range...</option>
                    {recordVolumes.map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>

                {/* Pain points */}
                <div className="form-section-label">What's slowing you down? <span className="form-section-hint">(select all that apply)</span></div>
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

                {/* Message */}
                <div className="form-group" style={{ marginTop: '1.25rem' }}>
                  <label>Anything specific you want to see?</label>
                  <textarea
                    name="message"
                    rows={3}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="e.g. We handle a lot of TBI cases and want to see how Lexx handles neurology records..."
                  />
                </div>

                <button type="submit" className="form-submit-btn">
                  Book My Demo →
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
