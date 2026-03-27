import { useState } from 'react';
import './Contact.css';

const practiceAreas = [
  'Personal Injury', 'Mass Tort', 'Medical Malpractice',
  'Workers\' Compensation', 'Pharmaceutical Litigation',
  'Construction Injury', 'Other',
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', firm: '', phone: '', area: '', caseVolume: '', message: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main>
      <section className="contact-hero section" style={{ background: 'linear-gradient(160deg, #f8fafc 0%, #eef4f4 100%)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section-label"><span>●</span> Request a Demo</div>
          <h1>Let's show you<br /><span style={{ color: 'var(--teal)', fontStyle: 'italic' }}>what Lexx can do.</span></h1>
          <p style={{ color: 'var(--slate)', marginTop: '1rem', fontSize: '1.05rem', maxWidth: '500px', lineHeight: 1.75 }}>
            Book a personalized 20-minute demo. We'll walk through a live case from your practice area and show you exactly how Lexx AI saves your team time.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-layout">
            {/* LEFT */}
            <div className="contact-info">
              <h2>What to expect</h2>
              {[
                ['📋', '20-minute live demo', 'We\'ll process a sample record set relevant to your practice area.'],
                ['💬', 'Q&A with our team', 'Ask anything — our team includes former paralegals and litigation support professionals.'],
                ['🎯', 'Personalized walkthrough', 'No generic demos. We\'ll show you what matters for your firm.'],
                ['🚀', 'Same-day access', 'If you\'re ready to start, we can spin up your trial the same day.'],
              ].map(([icon, title, desc]) => (
                <div key={title} className="expect-item">
                  <div className="expect-item__icon">{icon}</div>
                  <div>
                    <strong>{title}</strong>
                    <p>{desc}</p>
                  </div>
                </div>
              ))}

              <div className="contact-trust">
                <div className="trust-row">
                  <span>🔒 HIPAA Compliant</span>
                  <span>⚡ 14-day free trial</span>
                </div>
                <div className="trust-row">
                  <span>📞 No hard sell</span>
                  <span>✓ No credit card needed</span>
                </div>
              </div>
            </div>

            {/* FORM */}
            <div className="contact-form-wrap">
              {submitted ? (
                <div className="contact-success">
                  <div className="contact-success__icon">✓</div>
                  <h3>Request received!</h3>
                  <p>A member of our team will reach out within 1 business day to schedule your demo. Check your inbox at <strong>{form.email}</strong>.</p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <h3>Book your demo</h3>
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
                  <div className="form-group">
                    <label>Primary Practice Area *</label>
                    <select name="area" required value={form.area} onChange={handleChange}>
                      <option value="">Select practice area...</option>
                      {practiceAreas.map(a => <option key={a} value={a}>{a}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Monthly Case Volume (approx.)</label>
                    <select name="caseVolume" value={form.caseVolume} onChange={handleChange}>
                      <option value="">Select range...</option>
                      <option>1–10 cases</option>
                      <option>10–50 cases</option>
                      <option>50–200 cases</option>
                      <option>200+ cases</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Anything specific you'd like to see?</label>
                    <textarea name="message" rows={3} value={form.message} onChange={handleChange} placeholder="e.g. 'We handle a lot of traumatic brain injury cases and want to see how Lexx handles neurology records...'" />
                  </div>
                  <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.95rem' }}>
                    Request Demo →
                  </button>
                  <p className="form-disclaimer">By submitting, you agree to our Privacy Policy. We'll never share your information.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
