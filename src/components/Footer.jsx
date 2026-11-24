import React from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './SocialIcons';

export default function Footer() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const navLinks = [
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Experience', id: 'experience' },
    { label: 'Services', id: 'services' },
    { label: 'Contact', id: 'contact' },
  ];

  const socials = [
    { label: 'GitHub', href: 'https://github.com/Devang-ai/', icon: <GithubIcon size={15} /> },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/devang-chauhan-82a770226', icon: <LinkedinIcon size={15} /> },
    { label: 'Instagram', href: 'https://www.instagram.com/___.devanggg?igsh=MTgwaWprbTd0MnQ4Mw%3D%3D&utm_source=qr', icon: <InstagramIcon size={15} /> },
    { label: 'chauhandevang075@gmail.com', href: 'mailto:chauhandevang075@gmail.com', icon: <Mail size={15} /> },
  ];

  return (
    <footer style={{
      background: '#07070C',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      padding: 'clamp(40px,6vw,64px) 0 clamp(16px,3vw,24px)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Top glow */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: 'clamp(200px,50vw,500px)', height: '150px',
        background: 'radial-gradient(ellipse, rgba(6,182,212,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Main footer grid: 3-col on desktop, 1-col on mobile ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'clamp(24px,4vw,48px)',
          marginBottom: 'clamp(28px,4vw,48px)',
        }} className="footer-main-grid">

          {/* Brand */}
          <div>
            <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{
                width: '34px', height: '34px', minWidth: '34px', borderRadius: '9px',
                background: 'linear-gradient(135deg, #06B6D4, #0891B2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Outfit,sans-serif', fontWeight: 900, fontSize: '15px', color: '#fff',
              }}>D</div>
              <span style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 800, fontSize: 'clamp(15px,2vw,17px)', color: '#fff', letterSpacing: '-0.02em' }}>
                Devang
                <span style={{ color: '#06B6D4' }}>.dev</span>
              </span>
            </Link>
            <p className="footer-desc" style={{ fontSize: 'clamp(12px,1.5vw,13px)', color: 'rgba(255,255,255,0.38)', lineHeight: 1.75, maxWidth: '230px', marginBottom: '14px' }}>
              Full Stack Web & Mobile App Developer based in Ahmedabad. Building scalable digital products.
            </p>
            <div className="footer-pills" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {['React', 'Node.js', 'React Native', 'MongoDB'].map((t, i) => (
                <span key={i} className="tech-pill" style={{ fontSize: '11px' }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div style={{ fontFamily: 'Space Mono,monospace', fontSize: '10px', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.18em', marginBottom: '16px', textTransform: 'uppercase' }}>
              Navigation
            </div>
            <ul className="footer-nav-list" style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {navLinks.map(link => (
                <li key={link.id}>
                  <a href={`#${link.id}`}
                    onClick={e => { e.preventDefault(); scrollTo(link.id); }}
                    style={{ fontFamily: 'Outfit,sans-serif', fontSize: 'clamp(12px,1.5vw,13px)', color: 'rgba(255,255,255,0.45)', textDecoration: 'none', transition: 'color 0.2s', cursor: 'pointer' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#06B6D4'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect + Hire Me */}
          <div>
            <div style={{ fontFamily: 'Space Mono,monospace', fontSize: '10px', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.18em', marginBottom: '16px', textTransform: 'uppercase' }}>
              Connect
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
              {socials.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', fontFamily: 'Outfit,sans-serif', fontSize: 'clamp(12px,1.5vw,13px)', color: 'rgba(255,255,255,0.45)', textDecoration: 'none', transition: 'color 0.2s', wordBreak: 'break-all' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#06B6D4'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}>
                  <span style={{ flexShrink: 0 }}>{s.icon}</span>
                  <span>{s.label}</span>
                </a>
              ))}
            </div>
            <a href="#contact" onClick={e => { e.preventDefault(); scrollTo('contact'); }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: 'linear-gradient(135deg, #06B6D4, #0891B2)', color: '#fff', fontFamily: 'Outfit,sans-serif', fontWeight: 700, fontSize: 'clamp(12px,1.5vw,13px)', borderRadius: '50px', textDecoration: 'none', transition: 'all 0.2s', width: 'fit-content', cursor: 'pointer' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 28px rgba(6,182,212,0.35)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <Mail size={14} /> Hire Me
            </a>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)', marginBottom: 'clamp(16px,2vw,24px)' }} />

        {/* Bottom bar */}
        <div className="footer-bottom" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 'clamp(11px,1.5vw,13px)', color: 'rgba(255,255,255,0.28)', textAlign: 'center', width: '100%' }}>
            © {new Date().getFullYear()} <span style={{ color: 'rgba(255,255,255,0.45)' }}>Devang Chauhan</span>. All rights reserved.
          </div>
        </div>
      </div>

      {/* Footer responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .footer-main-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
          .footer-desc {
            max-width: 100% !important;
          }
        }
      `}</style>
    </footer>
  );
}
