import { useState, useEffect, useRef } from 'react';
import {
  ExternalLink,
  Eye,
  Construction,
  Mail,
  Download,
  GraduationCap,
  Briefcase,
  Rocket,
  MapPin,
  CheckCircle2,
  Send,
  Loader2,
  Lock,
  Globe,
  Smartphone,
  Layers,
  Palette,
  Server,
  Database,
  Code2,
  Cpu,
  Users,
  Wrench,
  Zap,
  Sparkles
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from '../components/SocialIcons';
import devangProfile from '../assets/devang_profile.png';
import dashboardMockup from '../assets/dashboard_mockup.png';
import realestateMockup from '../assets/skyline_home_mockup.png';
import restaurantMockup from '../assets/spice_route_dish.png';
import caraMockup from '../assets/tote_bag.png';
import connectifyMockup from '../assets/corporate_hub.png';
import milcanoPoster from '../assets/Logo (1)_page-0001.jpg';
import shitlaMockup from '../assets/green_valley_villa.png';
import vakancyHomescreen from '../assets/vakancy_homescreen.png';

/* ─── Counter ─── */
function useCounter(target, duration = 1800, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, active]);
  return count;
}

/* ─── Intersection Observer ─── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ─── Particles ─── */
function Particles() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let raf;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);
    const pts = Array.from({ length: 45 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.2 + 0.3,
      dx: (Math.random() - 0.5) * 0.22, dy: (Math.random() - 0.5) * 0.22,
      op: Math.random() * 0.3 + 0.07,
      c: ['6,182,212', '139,92,246', '59,130,246', '34,197,94'][Math.floor(Math.random() * 4)],
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => {
        p.x += p.dx / canvas.width; p.y += p.dy / canvas.height;
        if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0;
        if (p.y < 0) p.y = 1; if (p.y > 1) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x * canvas.width, p.y * canvas.height, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.c},${p.op})`; ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />;
}

/* ─── Animated Stats ─── */
function Stats() {
  const [ref, inView] = useInView(0.2);
  const p = useCounter(25, 1800, inView);
  const t = useCounter(15, 1800, inView);
  const c = useCounter(10, 1600, inView);
  const y = useCounter(2, 1200, inView);
  const items = [
    { n: p, s: '+', label: 'Projects', color: '#06B6D4' },
    { n: t, s: '+', label: 'Technologies', color: '#8B5CF6' },
    { n: c, s: '+', label: 'Clients', color: '#3B82F6' },
    { n: y, s: '+', label: 'Yrs Exp.', color: '#22C55E' },
  ];
  return (
    <div ref={ref} className="stats-grid">
      {items.map((s, i) => (
        <div key={i} className="glass-card" style={{ padding: '18px 12px', textAlign: 'center' }}>
          <div style={{ fontSize: 'clamp(1.5rem,4vw,2.2rem)', fontWeight: 800, color: s.color, lineHeight: 1 }}>
            {String(s.n).padStart(2, '0')}{s.s}
          </div>
          <div style={{ fontSize: 'clamp(11px,2vw,13px)', color: 'rgba(255,255,255,0.45)', marginTop: '5px', fontWeight: 500 }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

/* ─── Skill Card ─── */
function SkillCard({ icon, title, skills }) {
  return (
    <div className="skill-card">
      <div style={{
        marginBottom: '14px',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: '38px', height: '38px', borderRadius: '10px',
        background: 'rgba(6, 182, 212, 0.08)', border: '1px solid rgba(6, 182, 212, 0.2)',
        color: '#06B6D4'
      }}>{icon}</div>
      <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>{title}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {skills.map((s, i) => (
          <span key={i} className="tech-pill" style={{ fontSize: 'clamp(11px,1.5vw,12px)' }}>{s}</span>
        ))}
      </div>
    </div>
  );
}

/* ─── Project Card ─── */
function ProjectCard({ 
  title, 
  category, 
  desc, 
  tech, 
  image, 
  imagePosition = 'top center',
  demoLink, 
  demoText = 'Live Demo',
  internalLink, 
  secondaryLink,
  secondaryText = 'Case Overview',
  wip, 
  featured = false 
}) {
  return (
    <div className={`project-card ${featured ? 'featured-project' : ''}`}>
      <div className="project-img-wrap">
        <img 
          src={image} 
          alt={title} 
          loading="lazy" 
          style={{ objectPosition: imagePosition }}
        />
        <div className="project-overlay" />
        
        <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 2, display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
          {featured && (
            <span style={{
              padding: '4px 10px',
              background: 'rgba(6, 182, 212, 0.22)',
              border: '1px solid rgba(6, 182, 212, 0.5)',
              borderRadius: '50px',
              fontSize: '10px',
              fontWeight: 700,
              color: '#22D3EE',
              fontFamily: 'Space Mono, monospace',
              letterSpacing: '0.06em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              backdropFilter: 'blur(8px)',
            }}>
              <Sparkles size={11} /> FEATURED
            </span>
          )}
          <span style={{
            padding: '4px 10px',
            background: 'rgba(10, 10, 15, 0.82)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '50px',
            fontSize: '10px',
            fontWeight: 700,
            color: 'rgba(255, 255, 255, 0.85)',
            fontFamily: 'Space Mono, monospace',
            letterSpacing: '0.05em',
          }}>{category}</span>
        </div>

        {wip && (
          <span style={{
            position: 'absolute', top: '12px', right: '12px', zIndex: 2,
            padding: '4px 10px', background: 'rgba(245, 158, 11, 0.18)', border: '1px solid rgba(245, 158, 11, 0.45)',
            borderRadius: '50px', fontSize: '9px', fontWeight: 700, color: '#FBBF24',
            fontFamily: 'Space Mono, monospace', letterSpacing: '0.05em',
            display: 'flex', alignItems: 'center', gap: '6px',
            backdropFilter: 'blur(8px)',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#F59E0B', display: 'inline-block' }} />
            WIP
          </span>
        )}
      </div>

      <div style={{ padding: 'clamp(16px,3vw,20px)', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: 'clamp(16px,2.5vw,18px)', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>{title}</h3>
        <p style={{ fontSize: 'clamp(12px,1.5vw,13px)', color: 'rgba(255,255,255,0.52)', lineHeight: 1.65, marginBottom: '14px', flex: 1 }}>{desc}</p>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '16px' }}>
          {tech.map((t, i) => <span key={i} className="tech-pill" style={{ fontSize: '11px', padding: '3px 9px' }}>{t}</span>)}
        </div>

        <div style={{ display: 'flex', gap: '8px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {internalLink && (
            <a href={internalLink} style={{
              flex: 1, padding: '8px 12px',
              background: 'rgba(6, 182, 212, 0.12)', border: '1px solid rgba(6, 182, 212, 0.3)',
              color: '#22D3EE', borderRadius: '8px', fontWeight: 600, fontSize: '12px',
              textAlign: 'center', textDecoration: 'none', transition: 'all 0.2s',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
            }}>
              <Eye size={13} /> View Details
            </a>
          )}
          {secondaryLink && (
            <a href={secondaryLink} target="_blank" rel="noopener noreferrer" style={{
              flex: 1, padding: '8px 12px',
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)',
              color: 'rgba(255,255,255,0.75)', borderRadius: '8px', fontWeight: 600, fontSize: '12px',
              textAlign: 'center', textDecoration: 'none', transition: 'all 0.2s',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'; }}>
              <ExternalLink size={13} /> {secondaryText}
            </a>
          )}
          {demoLink && (
            <a href={demoLink} target="_blank" rel="noopener noreferrer" style={{
              flex: 1, padding: '8px 12px',
              background: wip ? 'rgba(255,255,255,0.05)' : (internalLink || secondaryLink ? 'rgba(6, 182, 212, 0.14)' : 'linear-gradient(135deg, #06B6D4, #0891B2)'),
              border: (wip || internalLink || secondaryLink) ? '1px solid rgba(6, 182, 212, 0.32)' : 'none',
              color: wip ? 'rgba(255,255,255,0.4)' : (internalLink || secondaryLink ? '#22D3EE' : '#fff'),
              borderRadius: '8px', fontWeight: 600, fontSize: '12px',
              textAlign: 'center', textDecoration: 'none', transition: 'all 0.2s',
              cursor: wip ? 'default' : 'pointer',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
            }}>
              {wip ? <><Construction size={13} /> In Progress</> : <><ExternalLink size={13} /> {demoText}</>}
            </a>
          )}
          {!internalLink && !demoLink && !secondaryLink && wip && (
            <span style={{
              flex: 1, padding: '8px 12px', background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.4)',
              border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', fontWeight: 600, fontSize: '12px',
              textAlign: 'center', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
            }}>
              <Construction size={13} /> In Development
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Service Card ─── */
function ServiceCard({ icon, title, desc }) {
  return (
    <div className="service-card">
      <div style={{
        marginBottom: '14px',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: '40px', height: '40px',
        background: 'rgba(6, 182, 212, 0.08)', border: '1px solid rgba(6, 182, 212, 0.2)',
        color: '#06B6D4', borderRadius: '10px',
      }}>{icon}</div>
      <h3 style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>{title}</h3>
      <p style={{ fontSize: 'clamp(12px,1.5vw,13px)', color: 'rgba(255,255,255,0.48)', lineHeight: 1.7 }}>{desc}</p>
    </div>
  );
}

const ROLES = ['Full Stack Developer', 'Mobile App Developer', 'React Specialist', 'Node.js Engineer'];

/* ══════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════ */
export default function Portfolio() {
  const [loaded, setLoaded] = useState(false);
  const [cursor, setCursor] = useState({ x: -500, y: -500 });
  const [typed, setTyped] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle');

  useEffect(() => { const t = setTimeout(() => setLoaded(true), 1600); return () => clearTimeout(t); }, []);

  useEffect(() => {
    const h = (e) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', h);
    return () => window.removeEventListener('mousemove', h);
  }, []);

  useEffect(() => {
    const role = ROLES[roleIdx];
    const speed = deleting ? 45 : 95;
    const t = setTimeout(() => {
      if (!deleting && charIdx < role.length) { setTyped(role.slice(0, charIdx + 1)); setCharIdx(c => c + 1); }
      else if (!deleting && charIdx === role.length) { setTimeout(() => setDeleting(true), 1600); }
      else if (deleting && charIdx > 0) { setTyped(role.slice(0, charIdx - 1)); setCharIdx(c => c - 1); }
      else { setDeleting(false); setRoleIdx(r => (r + 1) % ROLES.length); }
    }, speed);
    return () => clearTimeout(t);
  }, [charIdx, deleting, roleIdx]);

  // Contact Form Configuration
  // Option 1: Google Sheets + Email via Google Apps Script (Recommended)
  // Option 2: Web3Forms direct email forwarding
  const GOOGLE_SCRIPT_URL = ""; // Paste Google Apps Script Web App URL here to log to Google Sheets + Gmail
  const WEB3FORMS_ACCESS_KEY = "8f274d60-e02f-4719-ad93-6af91bd4e820"; // Web3Forms access key

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');

    try {
      if (GOOGLE_SCRIPT_URL) {
        // Submit to Google Sheets / Google Apps Script Web App
        const res = await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(form)
        });
        const data = await res.json().catch(() => ({}));
        if (data.result === 'success' || res.ok) {
          setFormStatus('success');
          setForm({ name: '', email: '', subject: '', message: '' });
          return;
        }
      }

      // Default: Web3Forms (forwards directly to email)
      const formData = new FormData();
      formData.append("access_key", WEB3FORMS_ACCESS_KEY);
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("subject", form.subject);
      formData.append("message", form.message);
      formData.append("from_name", `Portfolio Visitor (${form.name})`);

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      
      if (data.success) {
        setFormStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <>
      {/* Loading */}
      <div className={`loading-screen${loaded ? ' hidden' : ''}`}>
        <div className="loader-ring" />
        <span style={{ fontFamily: 'Space Mono,monospace', fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em' }}>LOADING...</span>
        <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: '11px', color: '#06B6D4', letterSpacing: '0.1em' }}>DEVANG CHAUHAN</span>
      </div>

      {/* Cursor glow */}
      <div style={{
        position: 'fixed', width: '380px', height: '380px', borderRadius: '50%',
        pointerEvents: 'none', zIndex: 9998,
        left: cursor.x, top: cursor.y, transform: 'translate(-50%,-50%)',
        background: 'radial-gradient(circle, rgba(6,182,212,0.055) 0%, transparent 68%)',
        transition: 'left 0.1s, top 0.1s',
      }} />

      <div style={{ paddingTop: '70px', opacity: loaded ? 1 : 0, transition: 'opacity 0.5s 0.1s' }}>

        {/* ══ HERO ══ */}
        <section id="home" className="section grid-bg" style={{ minHeight: 'calc(100vh - 70px)', display: 'flex', alignItems: 'center', overflow: 'hidden', padding: 'clamp(40px,6vw,80px) 0' }}>
          <Particles />
          <div className="orb orb-cyan"   style={{ width: 'clamp(200px,35vw,480px)', height: 'clamp(200px,35vw,480px)', top: '-100px', right: '-60px', opacity: 0.2 }} />
          <div className="orb orb-purple" style={{ width: 'clamp(160px,28vw,360px)', height: 'clamp(160px,28vw,360px)', bottom: '-60px', left: '-40px', opacity: 0.17 }} />

          <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
            <div className="hero-grid">

              {/* Text */}
              <div style={{ animation: 'fadeLeft 0.75s ease both' }}>
                {/* Badge */}
                <div className="hero-badge" style={{ display: 'flex', marginBottom: '22px' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: '50px' }}>
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22C55E', display: 'inline-block', boxShadow: '0 0 8px #22C55E', animation: 'glowPulse 2s infinite' }} />
                    <span style={{ fontFamily: 'Space Mono,monospace', fontSize: 'clamp(9px,1.5vw,11px)', color: '#22C55E', fontWeight: 700, letterSpacing: '0.1em' }}>AVAILABLE FOR PROJECTS</span>
                  </div>
                </div>

                <div style={{ fontSize: 'clamp(14px,2vw,18px)', fontWeight: 500, color: 'rgba(255,255,255,0.5)', marginBottom: '4px' }}>Hello, I'm</div>
                <h1 className="text-hero" style={{ marginBottom: '10px' }}>
                  <span className="grad-multi">Devang</span><br />
                  <span style={{ color: '#fff' }}>Chauhan</span>
                </h1>

                <div style={{ fontSize: 'clamp(0.95rem,2.5vw,1.25rem)', fontWeight: 600, color: 'rgba(255,255,255,0.8)', marginBottom: '16px', minHeight: '30px' }}>
                  <span className="grad-cyan typing-cursor">{typed}</span>
                </div>

                <p style={{ fontSize: 'clamp(13px,1.5vw,15px)', color: 'rgba(255,255,255,0.47)', lineHeight: 1.8, maxWidth: '480px', marginBottom: '28px' }}>
                  I build modern web applications, mobile apps, and scalable digital solutions using React, React Native, Node.js, Express.js, MongoDB, and MySQL.
                </p>

                <div className="hero-btns" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '28px' }}>
                  <a href="#contact" onClick={e => { e.preventDefault(); scrollTo('contact'); }} className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <Mail size={15} /> Hire Me
                  </a>
                  <a 
                    href="/resume.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-secondary" 
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  >
                    <Download size={15} /> Resume
                  </a>
                </div>

                <div className="hero-socials" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {[
                    { label: 'GitHub', href: 'https://github.com/Devang-ai/', icon: <GithubIcon size={15} /> },
                    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/devang-chauhan-82a770226', icon: <LinkedinIcon size={15} /> },
                    { label: 'Instagram', href: 'https://www.instagram.com/___.devanggg?igsh=MTgwaWprbTd0MnQ4Mw%3D%3D&utm_source=qr', icon: <InstagramIcon size={15} /> },
                  ].map((s, i) => (
                    <a key={i} href={s.href} style={{
                      display: 'inline-flex', alignItems: 'center', gap: '6px',
                      padding: '7px 13px', background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)', borderRadius: '50px',
                      fontSize: 'clamp(12px,1.5vw,13px)', color: 'rgba(255,255,255,0.6)',
                      textDecoration: 'none', transition: 'all 0.2s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#06B6D4'; e.currentTarget.style.borderColor = 'rgba(6,182,212,0.3)'; e.currentTarget.style.background = 'rgba(6,182,212,0.06)'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}>
                      {s.icon} <span>{s.label}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Profile */}
              <div className="hero-profile-area" style={{ animation: 'fadeRight 0.75s ease both', flexDirection: 'column', gap: '22px' }}>
                <div style={{ position: 'relative' }}>
                  {/* Soft Backlight Glow */}
                  <div style={{
                    position: 'absolute', inset: '-25px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(6,182,212,0.16) 0%, rgba(139,92,246,0.08) 50%, transparent 70%)',
                    filter: 'blur(35px)',
                    pointerEvents: 'none'
                  }} />
                  {/* Portrait Frame */}
                  <div className="profile-wrapper">
                    <div className="profile-img-inner">
                      <img src={devangProfile} alt="Devang Chauhan" />
                    </div>
                  </div>
                </div>

                {/* Grounded Stack Pills */}
                <div style={{
                  display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', maxWidth: '340px'
                }}>
                  {[
                    { name: 'React', icon: <Code2 size={13} color="#38BDF8" /> },
                    { name: 'Node.js', icon: <Server size={13} color="#4ADE80" /> },
                    { name: 'React Native', icon: <Smartphone size={13} color="#22D3EE" /> },
                    { name: 'MongoDB', icon: <Database size={13} color="#34D399" /> },
                    { name: 'MySQL', icon: <Database size={13} color="#A78BFA" /> },
                  ].map((tech, i) => (
                    <div key={i} style={{
                      display: 'inline-flex', alignItems: 'center', gap: '5px',
                      padding: '5px 12px',
                      background: 'rgba(10, 10, 15, 0.75)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '50px',
                      fontSize: '11px',
                      fontWeight: 600,
                      color: 'rgba(255, 255, 255, 0.75)'
                    }}>
                      {tech.icon}
                      <span>{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Scroll down */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '7px', marginTop: '40px', cursor: 'pointer', animation: 'fadeUp 1s ease 1.2s both' }} onClick={() => scrollTo('about')}>
              <span style={{ fontFamily: 'Space Mono,monospace', fontSize: '9px', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.2em' }}>SCROLL DOWN</span>
              <div style={{ width: '20px', height: '36px', border: '1.5px solid rgba(255,255,255,0.1)', borderRadius: '10px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '4px' }}>
                <div style={{ width: '3px', height: '8px', borderRadius: '2px', background: '#06B6D4', animation: 'scrollDot 2s ease infinite' }} />
              </div>
            </div>
          </div>
        </section>

        {/* ══ ABOUT ══ */}
        <section id="about" className="section">
          <div className="orb orb-purple" style={{ width: 'clamp(180px,30vw,340px)', height: 'clamp(180px,30vw,340px)', top: 0, right: '-40px', opacity: 0.12 }} />
          <div className="container">
            <div className="about-grid">
              {/* Left */}
              <div>
                <div className="section-tag">About Me</div>
                <h2 className="text-h2" style={{ marginBottom: '16px' }}>
                  Crafting <span className="grad-cyan">Digital</span><br />
                  Experiences That <span className="grad-purple">Matter</span>
                </h2>
                <p style={{ fontSize: 'clamp(13px,1.5vw,15px)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, marginBottom: '12px' }}>
                  I'm a passionate Full Stack Web & Mobile App Developer currently pursuing my <strong style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>MSc in Information Technology</strong>. I specialise in building scalable, production-ready applications.
                </p>
                <p style={{ fontSize: 'clamp(13px,1.5vw,15px)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, marginBottom: '24px' }}>
                  With <strong style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>2+ years of experience</strong> and active freelancing, I deliver real-world solutions with attention to detail and performance.
                </p>
                {[
                  { icon: <GraduationCap size={20} color="#8B5CF6" />, title: 'MSc IT Student', sub: 'Masters in Information Technology', color: '#8B5CF6' },
                  { icon: <Briefcase size={20} color="#3B82F6" />, title: '2+ Years Experience', sub: 'Full Stack Web & Mobile Development', color: '#3B82F6' },
                  { icon: <Rocket size={20} color="#22C55E" />, title: 'Active Freelancer', sub: 'Building custom solutions for clients', color: '#22C55E' },
                ].map((h, i) => (
                  <div key={i} className="highlight-row" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: i < 2 ? '16px' : 0 }}>
                    <div className="highlight-icon" style={{ width: '42px', height: '42px', minWidth: '42px', borderRadius: '12px', background: h.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{h.icon}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 'clamp(13px,1.8vw,14px)', color: '#fff', marginBottom: '2px' }}>{h.title}</div>
                      <div style={{ fontSize: 'clamp(12px,1.5vw,13px)', color: 'rgba(255,255,255,0.42)' }}>{h.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Right */}
              <div>
                <Stats />
                <div className="glass-card" style={{ padding: 'clamp(16px,3vw,22px)', marginTop: '14px' }}>
                  <div style={{ fontFamily: 'Space Mono,monospace', fontSize: '10px', color: 'rgba(255,255,255,0.3)', marginBottom: '8px', letterSpacing: '0.1em' }}>LOCATION</div>
                  <div style={{ fontSize: 'clamp(14px,2vw,17px)', fontWeight: 700, color: '#fff', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={17} color="#06B6D4" /> Ahmedabad, Gujarat
                  </div>
                  <div style={{ fontSize: 'clamp(12px,1.5vw,13px)', color: 'rgba(255,255,255,0.42)' }}>India · Open to Remote & On-site</div>
                  <div style={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {['React.js', 'Node.js', 'React Native', 'MongoDB'].map((t, i) => <span key={i} className="tech-pill">{t}</span>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ SKILLS ══ */}
        <section id="skills" className="section" style={{ background: 'rgba(255,255,255,0.01)', borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
          <div className="orb orb-blue" style={{ width: 'clamp(150px,25vw,280px)', height: 'clamp(150px,25vw,280px)', bottom: 0, left: '5%', opacity: 0.09 }} />
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 'clamp(32px,5vw,50px)' }}>
              <div className="section-tag">Skills & Expertise</div>
              <h2 className="text-h2">My <span className="grad-cyan">Tech</span> Stack</h2>
              <p style={{ fontSize: 'clamp(13px,1.5vw,14px)', color: 'rgba(255,255,255,0.42)', maxWidth: '400px', margin: '10px auto 0', lineHeight: 1.7 }}>Technologies I use to build impactful digital products</p>
            </div>
            <div className="skills-grid">
              <SkillCard icon={<Palette size={20} />} title="Frontend" skills={['React.js', 'Next.js', 'Tailwind CSS', 'JavaScript', 'HTML5', 'CSS3']} />
              <SkillCard icon={<Server size={20} />} title="Backend" skills={['Node.js', 'Express.js', 'REST APIs', 'JWT Auth', 'Socket.io']} />
              <SkillCard icon={<Database size={20} />} title="Database" skills={['MongoDB', 'MySQL', 'Mongoose', 'Sequelize']} />
              <SkillCard icon={<Smartphone size={20} />} title="Mobile Dev" skills={['React Native', 'Android Dev', 'Expo', 'Navigation']} />
            </div>
            {/* Badge cloud */}
            <div style={{ marginTop: '40px', display: 'flex', flexWrap: 'wrap', gap: '9px', justifyContent: 'center' }}>
              {['React', 'Node.js', 'Express', 'MongoDB', 'MySQL', 'JavaScript', 'TypeScript', 'Git', 'Postman', 'VS Code', 'Figma', 'GitHub'].map((t, i) => (
                <div key={i} style={{
                  padding: 'clamp(6px,1vw,7px) clamp(12px,2vw,15px)',
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '8px', fontSize: 'clamp(11px,1.5vw,13px)', color: 'rgba(255,255,255,0.6)', fontWeight: 500,
                  transition: 'all 0.2s', cursor: 'default',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(6,182,212,0.08)'; e.currentTarget.style.borderColor = 'rgba(6,182,212,0.3)'; e.currentTarget.style.color = '#06B6D4'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}>
                  {t}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ PROJECTS ══ */}
        <section id="projects" className="section">
          <div className="orb orb-cyan" style={{ width: 'clamp(150px,25vw,280px)', height: 'clamp(150px,25vw,280px)', top: '5%', right: '-40px', opacity: 0.1 }} />
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 'clamp(32px,5vw,50px)' }}>
              <div className="section-tag">Featured Projects</div>
              <h2 className="text-h2">My <span className="grad-purple">Latest</span> Work</h2>
              <p style={{ fontSize: 'clamp(13px,1.5vw,14px)', color: 'rgba(255,255,255,0.42)', maxWidth: '400px', margin: '10px auto 0', lineHeight: 1.7 }}>Real-world projects built with modern technologies</p>
            </div>
            <div className="projects-grid">
              <ProjectCard 
                title="Vakancy.in" 
                category="FULL STACK RECRUITMENT PLATFORM" 
                image={vakancyHomescreen}
                desc="A modern recruitment platform connecting job seekers and employers with intelligent hiring workflows, candidate pipelines, and admin operations."
                tech={['React.js', 'Node.js', 'Express.js', 'MySQL', 'REST APIs', 'Razorpay']} 
                demoLink="https://vakancy.in/" 
                internalLink="#/project/vakancy" 
                featured={true}
              />
              <ProjectCard 
                title="Milcano" 
                category="B2B DAIRY & SUPPLY CHAIN" 
                image={milcanoPoster}
                imagePosition="center"
                desc="A commercial B2B dairy ordering and supply platform. Features an active merchant mobile app on Google Play for retail orders and an operational admin panel for route-based delivery dispatch and inventory."
                tech={['React Native', 'Expo', 'Node.js', 'Express.js', 'MySQL', 'REST APIs']} 
                demoLink="https://play.google.com/store/apps/details?id=com.milcano.apps" 
                demoText="Google Play"
                secondaryLink="https://www.linkedin.com/posts/devang-chauhan-82a770226_recently-delivered-a-full-stack-dairy-business-ugcPost-7468719960136105984-kYuk/?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAADi1r6IBxuDMspsvUvH7wu8rPSDWcCEsE0A"
                secondaryText="Case Overview"
              />
              <ProjectCard 
                title="Shitla Real Estate" 
                category="REAL ESTATE" 
                image={shitlaMockup}
                desc="A modern real estate platform for discovering properties, managing listings, and connecting buyers with sellers."
                tech={['React', 'Node.js', 'MongoDB']} 
                demoLink="https://realestate-omega-nine.vercel.app/" 
              />
              <ProjectCard 
                title="Connectify" 
                category="SOCIAL MEDIA" 
                image={connectifyMockup}
                desc="A modern social media platform for connecting with friends, sharing updates, and discovering content."
                tech={['React', 'Node.js', 'MongoDB']} 
                demoLink="https://connectify-social-media-webapp.vercel.app/" 
              />
              <ProjectCard 
                title="Cara" 
                category="E-COMMERCE" 
                image={caraMockup}
                desc="Cara E-Commerce - Super Value Deals. Modern online store with complete shopping experience and responsive design."
                tech={['React', 'Vite', 'CSS']} 
                demoLink="https://e-com-one-rho.vercel.app/" 
              />
              <ProjectCard 
                title="UrbanVoice" 
                category="CIVIC TECH" 
                image={realestateMockup}
                desc="Civic Issue Reporting Platform. Raise proposals for road issues or city cleanliness, and track local problems with real-time updates."
                tech={['React', 'Node.js', 'MongoDB', 'Express']} 
                demoLink="https://urbanvoice.vercel.app/" 
              />
              <ProjectCard 
                title="Scan2Serve" 
                category="FOOD & BEVERAGE" 
                image={dashboardMockup}
                desc="A QR-based restaurant ordering platform with multi-role architecture (Customer, Staff, Admin) and real-time order tracking."
                tech={['React', 'Node.js', 'Express.js', 'MySQL']} 
                wip={true} 
              />
              <ProjectCard 
                title="Maa Ki Rasoi" 
                category="FOOD DELIVERY" 
                image={restaurantMockup}
                desc="A platform for PG students and women home chefs, enabling homemade food delivery while empowering housewives."
                tech={['React Native', 'Node.js', 'Express.js', 'MySQL']} 
                internalLink="#/project/maakirasoi" 
              />
            </div>
            
            <div style={{ marginTop: '50px', padding: '24px 20px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(255,255,255,0.1)', textAlign: 'center' }}>
              <div style={{ width: '46px', height: '46px', margin: '0 auto 12px', borderRadius: '12px', background: 'rgba(6,182,212,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Lock size={22} color="#06B6D4" />
              </div>
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>Other Internal & B2B Projects</h4>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', maxWidth: '500px', margin: '0 auto', lineHeight: 1.6 }}>
                Additionally, I have developed several complex internal SaaS and B2B platforms. Due to NDA and client confidentiality agreements, these projects are not publicly shared here.
              </p>
            </div>
          </div>
        </section>

        {/* ══ EXPERIENCE ══ */}
        <section id="experience" className="section" style={{ background: 'rgba(255,255,255,0.01)', borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 'clamp(32px,5vw,50px)' }}>
              <div className="section-tag">Experience</div>
              <h2 className="text-h2">My <span className="grad-cyan">Work</span> Journey</h2>
            </div>

            <div style={{ maxWidth: '760px', margin: '0 auto', position: 'relative' }}>
              {/* Timeline line */}
              <div className="exp-timeline-line" style={{ position: 'absolute', left: '28px', top: 0, bottom: 0, width: '1px', background: 'linear-gradient(to bottom, rgba(6,182,212,0.5), rgba(139,92,246,0.2), transparent)' }} />
              {/* Timeline dot */}
              <div className="exp-timeline-dot" style={{ position: 'absolute', left: '22px', top: '26px', width: '13px', height: '13px', borderRadius: '50%', background: '#06B6D4', boxShadow: '0 0 16px rgba(6,182,212,0.6)', zIndex: 1 }} />

              <div className="exp-timeline-wrap" style={{ paddingLeft: '60px' }}>
                <div className="exp-card">
                  <div className="exp-header-row">
                    <div>
                      <h3 style={{ fontSize: 'clamp(16px,2.5vw,20px)', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>Full Stack Developer Intern</h3>
                      <div style={{ fontSize: 'clamp(14px,2vw,16px)', color: '#06B6D4', fontWeight: 600 }}>Umang Barot Consultancy</div>
                    </div>
                    <span style={{ padding: '5px 12px', background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.2)', borderRadius: '50px', fontFamily: 'Space Mono,monospace', fontSize: 'clamp(10px,1.5vw,11px)', color: '#06B6D4', fontWeight: 700, whiteSpace: 'nowrap', flexShrink: 0 }}>Aug 2024 – Apr 2025</span>
                  </div>
                  <p style={{ fontSize: 'clamp(13px,1.5vw,14px)', color: 'rgba(255,255,255,0.48)', lineHeight: 1.75, marginBottom: '18px' }}>
                    Contributed to full-stack web development projects, collaborating with a team to build and deploy client-facing applications using React and Node.js.
                  </p>
                  <div className="exp-resp-grid">
                    {[
                      { icon: <Code2 size={18} color="#06B6D4" />, label: 'Frontend Dev', desc: 'React.js UI development' },
                      { icon: <Cpu size={18} color="#06B6D4" />, label: 'API Integration', desc: 'RESTful API connections' },
                      { icon: <Layers size={18} color="#06B6D4" />, label: 'React Dev', desc: 'Component architecture' },
                      { icon: <Users size={18} color="#06B6D4" />, label: 'Client Projects', desc: 'Real-world deliverables' },
                    ].map((r, i) => (
                      <div key={i} style={{ padding: 'clamp(12px,2vw,14px)', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <div style={{ marginBottom: '6px' }}>{r.icon}</div>
                        <div style={{ fontSize: 'clamp(12px,1.5vw,13px)', fontWeight: 700, color: '#fff', marginBottom: '2px' }}>{r.label}</div>
                        <div style={{ fontSize: 'clamp(11px,1.3vw,12px)', color: 'rgba(255,255,255,0.38)' }}>{r.desc}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: '16px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'Git'].map((t, i) => <span key={i} className="tech-pill" style={{ fontSize: '11px' }}>{t}</span>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ SERVICES ══ */}
        <section id="services" className="section">
          <div className="orb orb-green" style={{ width: 'clamp(140px,22vw,260px)', height: 'clamp(140px,22vw,260px)', top: '20%', left: '-40px', opacity: 0.09 }} />
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 'clamp(32px,5vw,50px)' }}>
              <div className="section-tag">Services</div>
              <h2 className="text-h2">What I <span className="grad-green">Offer</span></h2>
              <p style={{ fontSize: 'clamp(13px,1.5vw,14px)', color: 'rgba(255,255,255,0.42)', maxWidth: '400px', margin: '10px auto 0', lineHeight: 1.7 }}>End-to-end development solutions to grow your business</p>
            </div>
            <div className="services-grid">
              <ServiceCard icon={<Globe size={22} />} color="#3B82F6" title="Web Development" desc="Full-stack web apps with React, Next.js, Node.js & Express. Scalable, fast, production-ready." />
              <ServiceCard icon={<Smartphone size={22} />} color="#8B5CF6" title="Mobile App Dev" desc="Cross-platform mobile apps with React Native. Native performance for iOS & Android." />
              <ServiceCard icon={<Layers size={22} />} color="#06B6D4" title="UI/UX Implementation" desc="Pixel-perfect, responsive interfaces with smooth animations and clean code." />
              <ServiceCard icon={<Server size={22} />} color="#22C55E" title="API Development" desc="Robust RESTful APIs with auth, validation, and documentation. Secure backend services." />
              <ServiceCard icon={<Zap size={22} />} color="#F97316" title="Full Stack Solutions" desc="End-to-end ownership from DB design to deployment. Complete products on time." />
              <ServiceCard icon={<Wrench size={22} />} color="#EF4444" title="Maintenance & Support" desc="Ongoing bug fixes, performance optimisation, and feature additions." />
            </div>
          </div>
        </section>

        {/* ══ CONTACT ══ */}
        <section id="contact" className="section" style={{ background: 'rgba(255,255,255,0.01)', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <div className="orb orb-purple" style={{ width: 'clamp(150px,25vw,320px)', height: 'clamp(150px,25vw,320px)', bottom: '-40px', right: '-60px', opacity: 0.12 }} />
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 'clamp(32px,5vw,50px)' }}>
              <div className="section-tag">Contact</div>
              <h2 className="text-h2">Let's <span className="grad-cyan">Work</span> Together</h2>
              <p style={{ fontSize: 'clamp(13px,1.5vw,14px)', color: 'rgba(255,255,255,0.42)', maxWidth: '380px', margin: '10px auto 0', lineHeight: 1.7 }}>Have a project in mind? Let's build something great.</p>
            </div>

            <div className="contact-grid">
              {/* Info Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div className="glass-card" style={{ padding: 'clamp(18px,3vw,26px)' }}>
                  <h3 style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 700, marginBottom: '18px', color: '#fff' }}>Get In Touch</h3>
                  {[
                    { icon: <MapPin size={17} color="#06B6D4" />, label: 'Location', val: 'Ahmedabad, Gujarat, India', color: '#06B6D4' },
                    { icon: <Mail size={17} color="#3B82F6" />, label: 'Email', val: 'chauhandevang075@gmail.com', color: '#3B82F6' },
                    { icon: <Briefcase size={17} color="#22C55E" />, label: 'Status', val: 'Available for Freelance', color: '#22C55E' },
                  ].map((c, i) => (
                    <div key={i} className="contact-info-row" style={{ marginBottom: i < 2 ? '14px' : 0 }}>
                      <div className="contact-icon" style={{ width: '36px', height: '36px', minWidth: '36px', borderRadius: '10px', background: c.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{c.icon}</div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', fontFamily: 'Space Mono,monospace', letterSpacing: '0.05em', marginBottom: '2px' }}>{c.label}</div>
                        <div style={{ fontSize: 'clamp(12px,1.5vw,13px)', color: '#fff', fontWeight: 500, wordBreak: 'break-word' }}>{c.val}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="glass-card" style={{ padding: 'clamp(16px,3vw,22px)' }}>
                  <h4 style={{ fontSize: '10px', fontWeight: 700, marginBottom: '12px', color: 'rgba(255,255,255,0.38)', fontFamily: 'Space Mono,monospace', letterSpacing: '0.15em' }}>CONNECT</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[
                      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/devang-chauhan-82a770226', icon: <LinkedinIcon size={16} />, color: '#3B82F6' },
                      { label: 'GitHub', href: 'https://github.com/Devang-ai/', icon: <GithubIcon size={16} />, color: '#8B5CF6' },
                      { label: 'Instagram', href: 'https://www.instagram.com/___.devanggg?igsh=MTgwaWprbTd0MnQ4Mw%3D%3D&utm_source=qr', icon: <InstagramIcon size={16} />, color: '#06B6D4' },
                    ].map((s, i) => (
                      <a key={i} href={s.href} style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        padding: '10px 12px',
                        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                        borderRadius: '10px', textDecoration: 'none',
                        fontSize: 'clamp(13px,1.5vw,14px)', color: 'rgba(255,255,255,0.65)',
                        fontWeight: 500, transition: 'all 0.2s',
                      }}
                        onMouseEnter={e => { e.currentTarget.style.background = s.color + '12'; e.currentTarget.style.borderColor = s.color + '35'; e.currentTarget.style.color = s.color; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; }}>
                        <span style={{ display: 'inline-flex', color: s.color }}>{s.icon}</span> <span>{s.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="glass-card" style={{ padding: 'clamp(20px,4vw,34px)' }}>
                {formStatus === 'success' ? (
                  <div style={{ textAlign: 'center', padding: 'clamp(24px,4vw,40px) 16px' }}>
                    <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
                      <CheckCircle2 size={48} color="#22C55E" />
                    </div>
                    <h3 style={{ fontSize: 'clamp(16px,2.5vw,20px)', fontWeight: 800, color: '#22C55E', marginBottom: '8px' }}>Message Sent!</h3>
                    <p style={{ color: 'rgba(255,255,255,0.48)', fontSize: 'clamp(13px,1.5vw,14px)', marginBottom: '20px' }}>I'll get back to you within 24 hours.</p>
                    <button onClick={() => setFormStatus('idle')} className="btn-secondary" style={{ cursor: 'pointer' }}>Send Another</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {formStatus === 'error' && (
                      <div style={{ padding: '12px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', color: '#EF4444', fontSize: '13px', textAlign: 'center' }}>
                        Failed to send message. Please check your Access Key.
                      </div>
                    )}
                    <h3 style={{ fontSize: 'clamp(15px,2vw,18px)', fontWeight: 700, marginBottom: '2px' }}>Send a Message</h3>
                    <div className="form-row">
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', color: 'rgba(255,255,255,0.38)', marginBottom: '6px', fontFamily: 'Space Mono,monospace', letterSpacing: '0.05em' }}>YOUR NAME</label>
                        <input className="contact-input" required placeholder="John Doe" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', color: 'rgba(255,255,255,0.38)', marginBottom: '6px', fontFamily: 'Space Mono,monospace', letterSpacing: '0.05em' }}>EMAIL</label>
                        <input className="contact-input" type="email" required placeholder="john@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                      </div>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', color: 'rgba(255,255,255,0.38)', marginBottom: '6px', fontFamily: 'Space Mono,monospace', letterSpacing: '0.05em' }}>SUBJECT</label>
                      <input className="contact-input" required placeholder="Project Discussion / Freelance" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', color: 'rgba(255,255,255,0.38)', marginBottom: '6px', fontFamily: 'Space Mono,monospace', letterSpacing: '0.05em' }}>MESSAGE</label>
                      <textarea className="contact-input" required rows={5} placeholder="Tell me about your project..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ minHeight: '120px' }} />
                    </div>
                    <button type="submit" className="btn-primary" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} disabled={formStatus === 'sending'}>
                      {formStatus === 'sending' ? (
                        <>
                          <Loader2 size={16} className="animate-spin" /> Sending...
                        </>
                      ) : (
                        <>
                          <Send size={15} /> Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Ambient styles */}
      <style>{`
        @keyframes glowPulse { 0%,100%{opacity:0.3;} 50%{opacity:0.7;} }
      `}</style>
    </>
  );
}
