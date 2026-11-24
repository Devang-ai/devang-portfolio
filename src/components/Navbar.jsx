import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Mail } from 'lucide-react';
// Navbar – cyan accent

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setIsOpen(false);
    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(`/#${id}`);
    }
  };

  const navLinks = [
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Experience', id: 'experience' },
    { label: 'Services', id: 'services' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      padding: scrolled ? '12px 0' : '18px 0',
      background: scrolled ? 'rgba(10,10,10,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #06B6D4, #0891B2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '16px', color: '#fff',
          }}>D</div>
          <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '18px', color: '#fff', letterSpacing: '-0.02em' }}>
            Devang<span style={{ background: 'linear-gradient(135deg, #06B6D4, #0891B2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>.dev</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <ul style={{ display: 'flex', alignItems: 'center', gap: '6px', listStyle: 'none', margin: 0, padding: 0 }}
          className="desktop-nav">
          {navLinks.map(link => (
            <li key={link.id}>
              <a href={`#${link.id}`} onClick={(e) => handleNavClick(e, link.id)}
                style={{ display: 'block', padding: '8px 14px', fontFamily: 'Outfit, sans-serif', fontSize: '14px', fontWeight: 500, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', borderRadius: '8px', transition: 'all 0.2s', cursor: 'pointer' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; e.currentTarget.style.background = 'transparent'; }}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA + Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}
            style={{ display: 'none', alignItems: 'center', gap: '6px', padding: '10px 20px', background: 'linear-gradient(135deg, #06B6D4, #0891B2)', color: '#fff', fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '13px', borderRadius: '50px', textDecoration: 'none', transition: 'all 0.2s', whiteSpace: 'nowrap', cursor: 'pointer' }}
            className="hire-btn"
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(6,182,212,0.35)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
            <Mail size={14} /> Hire Me
          </a>

          <button onClick={() => setIsOpen(!isOpen)}
            style={{ display: 'none', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px', cursor: 'pointer', color: '#fff', transition: 'all 0.2s' }}
            className="hamburger-btn"
            aria-label="Toggle menu">
            {isOpen ? (
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            ) : (
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'rgba(10,10,10,0.97)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '20px 24px' }}>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {navLinks.map(link => (
              <li key={link.id}>
                <a href={`#${link.id}`} onClick={(e) => handleNavClick(e, link.id)}
                  style={{ display: 'block', padding: '12px 16px', fontFamily: 'Outfit, sans-serif', fontSize: '15px', fontWeight: 500, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', borderRadius: '10px', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#06B6D4'; e.currentTarget.style.background = 'rgba(6,182,212,0.06)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; e.currentTarget.style.background = 'transparent'; }}>
                  {link.label}
                </a>
              </li>
            ))}
            <li style={{ marginTop: '12px' }}>
              <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '12px 16px', background: 'linear-gradient(135deg, #06B6D4, #0891B2)', color: '#fff', fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '14px', borderRadius: '10px', textDecoration: 'none', textAlign: 'center' }}>
                <Mail size={15} /> Hire Me
              </a>
            </li>
          </ul>
        </div>
      )}

      <style>{`
        @media (min-width: 900px) {
          .desktop-nav { display: flex !important; }
          .hire-btn { display: flex !important; }
          .hamburger-btn { display: none !important; }
        }
        @media (max-width: 899px) {
          .desktop-nav { display: none !important; }
          .hire-btn { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
