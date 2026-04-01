import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const links = [
    { to: '/how-it-works', label: 'How It Works' },
    { to: '/features', label: 'Features' },
    { to: '/pricing', label: 'Pricing' },
  ];

  return (
    <nav className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo">
          <img src="/logo.png" alt="Lexx AI" className="navbar__logo-img" />
          <span>Lexx <strong>AI</strong></span>
        </Link>

        <ul className={`navbar__links ${open ? 'open' : ''}`}>
          {links.map(l => (
            <li key={l.to}>
              <Link
                to={l.to}
                className={`navbar__link ${pathname === l.to ? 'active' : ''}`}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/contact" className="btn-primary" onClick={() => setOpen(false)}>
              Request Demo →
            </Link>
          </li>
        </ul>

        <button className="navbar__hamburger" onClick={() => setOpen(!open)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}
