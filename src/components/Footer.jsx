import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <div className="footer__logo">
            <div className="footer__logo-mark">L</div>
            <span>Lexx <strong>AI</strong></span>
          </div>
          <p>Medical record intelligence<br />built for legal teams.</p>
          <p className="footer__hipaa">
            <span className="hipaa-badge">HIPAA Compliant</span>
            <span className="hipaa-badge">SOC 2 Ready</span>
          </p>
        </div>

        <div className="footer__col">
          <h4>Product</h4>
          <Link to="/how-it-works">How It Works</Link>
          <Link to="/features">Features</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/contact">Request Demo</Link>
        </div>

        <div className="footer__col">
          <h4>Company</h4>
          <span className="footer__link-placeholder">About</span>
          <span className="footer__link-placeholder">Blog</span>
          <span className="footer__link-placeholder">Careers</span>
          <span className="footer__link-placeholder">Press</span>
        </div>

        <div className="footer__col">
          <h4>Legal</h4>
          <span className="footer__link-placeholder">Privacy Policy</span>
          <span className="footer__link-placeholder">Terms of Service</span>
          <span className="footer__link-placeholder">BAA Agreement</span>
          <span className="footer__link-placeholder">Security</span>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container">
          <p>© {new Date().getFullYear()} Lexx AI. All rights reserved.</p>
          <p>Not legal advice. Results vary by case type and record complexity.</p>
        </div>
      </div>
    </footer>
  );
}
