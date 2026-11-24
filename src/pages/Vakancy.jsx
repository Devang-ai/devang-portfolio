import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ExternalLink,
  Briefcase,
  ShieldCheck,
  Layers,
  Search,
  CreditCard,
  Database,
  Sparkles,
  Building2,
  Code2,
  Server,
  Send,
  Check
} from 'lucide-react';

import vakancyHomescreen from '../assets/vakancy_homescreen.png';
import vakancyEmployers from '../assets/vakancy_employers.png';
import vakancyExecutive from '../assets/vakancy_executive.png';
import vakancyAbout from '../assets/vakancy_about.png';
import vakancyMobile from '../assets/vakancy_mobile.png';

export default function Vakancy() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const screenshots = {
    home: {
      title: 'Portal Home Screen (Desktop 1440px)',
      desc: 'The official live homepage of Vakancy.in featuring real-time category navigation, verified partner logos, search filters, and active job requisitions.',
      img: vakancyHomescreen,
      tag: 'HOME SCREEN'
    },
    employers: {
      title: 'For Employers Portal',
      desc: 'Dedicated employer recruitment suite enabling organizations to register, submit hiring requisitions, and access candidate pipelines.',
      img: vakancyEmployers,
      tag: 'FOR EMPLOYERS'
    },
    executive: {
      title: 'Executive Search & Leadership Hiring',
      desc: 'Confidential executive search workflows designed for C-suite and high-impact specialized talent acquisition.',
      img: vakancyExecutive,
      tag: 'EXECUTIVE SEARCH'
    },
    mobile: {
      title: 'Mobile-Optimized Experience (390px)',
      desc: 'Authentic mobile viewport presentation with responsive drawer navigation, touch-friendly job cards, and streamlined application flows.',
      img: vakancyMobile,
      tag: 'MOBILE VIEW'
    },
    about: {
      title: 'About Vakancy.in & Vision',
      desc: 'Company overview, methodology, trust credentials, and institutional recruitment process guidelines.',
      img: vakancyAbout,
      tag: 'ABOUT PORTAL'
    }
  };

  return (
    <div style={{ paddingTop: '70px', minHeight: '100vh', background: '#0A0A0A' }}>
      <section className="section grid-bg" style={{ minHeight: 'calc(100vh - 70px)', padding: 'clamp(40px,6vw,70px) 0', overflow: 'hidden', position: 'relative' }}>
        
        {/* Ambient Glows */}
        <div className="orb orb-blue" style={{ width: 'clamp(220px,35vw,500px)', height: 'clamp(220px,35vw,500px)', top: '-80px', right: '-40px', opacity: 0.16 }} />
        <div className="orb orb-cyan" style={{ width: 'clamp(180px,30vw,400px)', height: 'clamp(180px,30vw,400px)', bottom: '-60px', left: '-50px', opacity: 0.14 }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          
          {/* Top Bar Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '36px' }}>
            <button 
              onClick={() => navigate('/')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px', 
                background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.55)',
                fontFamily: 'Space Mono,monospace', fontSize: '12px', fontWeight: 700,
                letterSpacing: '0.1em', cursor: 'pointer',
                textTransform: 'uppercase', transition: 'color 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#3B82F6'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
            >
              <ArrowLeft size={16} /> Back to Portfolio
            </button>

            <a
              href="https://vakancy.in/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '9px 18px', background: 'linear-gradient(135deg, #1E40AF, #3B82F6)',
                color: '#fff', borderRadius: '50px', fontWeight: 700, fontSize: '13px',
                textDecoration: 'none', boxShadow: '0 4px 18px rgba(59,130,246,0.3)',
                transition: 'all 0.2s', cursor: 'pointer'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(59,130,246,0.45)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 18px rgba(59,130,246,0.3)'; }}
            >
              <ExternalLink size={15} /> Visit Live Platform
            </a>
          </div>

          {/* Hero Header */}
          <div style={{ maxWidth: '900px', marginBottom: '40px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', marginBottom: '18px' }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '4px 12px', background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.3)',
                borderRadius: '50px', fontSize: '11px', fontWeight: 700, color: '#60A5FA',
                fontFamily: 'Space Mono, monospace'
              }}>
                <Briefcase size={13} /> CLIENT PROJECT · FULL STACK
              </span>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '4px 12px', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)',
                borderRadius: '50px', fontSize: '11px', fontWeight: 700, color: '#4ADE80',
                fontFamily: 'Space Mono, monospace'
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 6px #22C55E' }} />
                PRODUCTION LIVE
              </span>
            </div>

            <h1 className="text-hero" style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)', lineHeight: 1.1, marginBottom: '20px' }}>
              Vakancy<span style={{ color: '#3B82F6' }}>.in</span>
              <br />
              <span style={{ fontSize: 'clamp(1.5rem, 3vw, 2.4rem)', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>
                Enterprise Recruitment & Talent Acquisition Platform
              </span>
            </h1>

            <p style={{ fontSize: 'clamp(14px,1.6vw,17px)', color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, marginBottom: '28px', maxWidth: '780px' }}>
              A full-stack recruitment ecosystem connecting job seekers with leading employers through automated pipelines, smart candidate filters, role-based workflows, and central administrative controls. Designed and delivered end-to-end as a commercial client project.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['React.js', 'Node.js', 'Express.js', 'MySQL', 'REST APIs', 'Razorpay', 'JWT Auth', 'Tailwind CSS'].map((t, i) => (
                <span key={i} className="tech-pill" style={{ fontSize: '12px', padding: '6px 14px' }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Key Metrics / Highlights Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '50px' }}>
            {[
              { icon: <Building2 size={22} color="#3B82F6" />, label: 'Architecture', val: '3 Unified Portals', sub: 'Guest, Candidate, Admin' },
              { icon: <Database size={22} color="#06B6D4" />, label: 'Database', val: 'MySQL Relational', sub: 'Indexed & transaction-safe' },
              { icon: <ShieldCheck size={22} color="#8B5CF6" />, label: 'Access Control', val: 'Role-Based RBAC', sub: 'Director, TL, BDM, Recruiter' },
              { icon: <CreditCard size={22} color="#22C55E" />, label: 'E-Commerce', val: 'Razorpay Gateway', sub: 'Secure employer payments' },
            ].map((m, i) => (
              <div key={i} className="glass-card" style={{ padding: '20px', borderLeft: '3px solid #3B82F6' }}>
                <div style={{ marginBottom: '12px' }}>{m.icon}</div>
                <div style={{ fontSize: '11px', fontFamily: 'Space Mono, monospace', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>{m.label}</div>
                <div style={{ fontSize: '17px', fontWeight: 800, color: '#fff', marginTop: '4px', marginBottom: '2px' }}>{m.val}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{m.sub}</div>
              </div>
            ))}
          </div>

          {/* ══ FEATURED SHOWCASE: HOME SCREEN OF PORTAL ══ */}
          <div style={{ marginBottom: '70px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
              <div>
                <div className="section-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={13} color="#06B6D4" /> Real Platform Interface
                </div>
                <h2 style={{ fontSize: 'clamp(20px,3vw,28px)', fontWeight: 800, color: '#fff', marginTop: '6px' }}>
                  {screenshots[activeTab].title}
                </h2>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', maxWidth: '650px', marginTop: '4px' }}>
                  {screenshots[activeTab].desc}
                </p>
              </div>

              {/* View Switcher Pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {Object.keys(screenshots).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontFamily: 'Space Mono, monospace',
                      fontWeight: 700,
                      cursor: 'pointer',
                      border: activeTab === key ? '1px solid #3B82F6' : '1px solid rgba(255,255,255,0.08)',
                      background: activeTab === key ? 'rgba(59,130,246,0.18)' : 'rgba(255,255,255,0.03)',
                      color: activeTab === key ? '#60A5FA' : 'rgba(255,255,255,0.6)',
                      transition: 'all 0.2s',
                    }}
                  >
                    {screenshots[key].tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Displayed Image Frame */}
            <div className="glass-card" style={{
              padding: '12px',
              borderRadius: '20px',
              border: '1px solid rgba(59,130,246,0.25)',
              background: 'rgba(15, 23, 42, 0.65)',
              boxShadow: '0 20px 50px -15px rgba(0,0,0,0.7)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'relative',
                borderRadius: '14px',
                overflow: 'hidden',
                background: '#0B132B',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <img 
                  src={screenshots[activeTab].img} 
                  alt={screenshots[activeTab].title} 
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '750px',
                    objectFit: 'contain',
                    display: 'block'
                  }}
                />
              </div>
            </div>
          </div>

          {/* ══ THREE CORE ROLES WORKFLOW ══ */}
          <div style={{ marginBottom: '70px' }}>
            <div style={{ textAlign: 'center', marginBottom: '36px' }}>
              <div className="section-tag">End-to-End Capabilities</div>
              <h2 className="text-h2">Engineered For <span className="grad-cyan">All Stakeholders</span></h2>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', maxWidth: '500px', margin: '8px auto 0' }}>
                Three purpose-built experiences unified by one robust backend engine.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '24px' }}>
              
              {/* Role 1: Job Seekers */}
              <div className="glass-card" style={{ padding: '32px 28px', borderTop: '3px solid #3B82F6' }}>
                <div style={{
                  width: '46px', height: '46px', borderRadius: '12px',
                  background: 'rgba(59,130,246,0.15)', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', marginBottom: '20px'
                }}>
                  <Search size={22} color="#3B82F6" />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#fff', marginBottom: '10px' }}>
                  Candidate Portal
                </h3>
                <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: '20px' }}>
                  Job discovery engine empowering seekers with real-time requisitions, interactive search, and career progression tools.
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    'Instant faceted search (Location, Experience, Salary range, Type)',
                    'Authenticated candidate dashboard with application stage tracking',
                    'One-click saved vacancies and direct application submission',
                    'AI-powered resume optimization suggestions and multilingual support'
                  ].map((feat, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: 'rgba(255,255,255,0.75)' }}>
                      <Check size={16} color="#3B82F6" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Role 2: Employers */}
              <div className="glass-card" style={{ padding: '32px 28px', borderTop: '3px solid #06B6D4' }}>
                <div style={{
                  width: '46px', height: '46px', borderRadius: '12px',
                  background: 'rgba(6,182,212,0.15)', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', marginBottom: '20px'
                }}>
                  <Briefcase size={22} color="#06B6D4" />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#fff', marginBottom: '10px' }}>
                  Employer & Hiring Suite
                </h3>
                <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: '20px' }}>
                  Comprehensive talent acquisition portal allowing corporate clients to post openings, review applicants, and coordinate hiring.
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    'Dynamic job posting creation with qualification specs & budget tags',
                    'Executive search and confidential leadership hiring request flows',
                    'Automated candidate matching and shortlisting pipelines',
                    'Razorpay integrated payments for premium job listing tiers'
                  ].map((feat, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: 'rgba(255,255,255,0.75)' }}>
                      <Check size={16} color="#06B6D4" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Role 3: Operations & Admin */}
              <div className="glass-card" style={{ padding: '32px 28px', borderTop: '3px solid #8B5CF6' }}>
                <div style={{
                  width: '46px', height: '46px', borderRadius: '12px',
                  background: 'rgba(139,92,246,0.15)', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', marginBottom: '20px'
                }}>
                  <ShieldCheck size={22} color="#8B5CF6" />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#fff', marginBottom: '10px' }}>
                  Agency Admin & RBAC
                </h3>
                <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: '20px' }}>
                  Centralized command console for directors, team leaders, BDMs, and recruiters to oversee hiring pipelines with audit safety.
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    'Hierarchical RBAC: Director, TL, BDM, and Recruiter tiers',
                    'Lead assignment, callback request management, and client onboarding',
                    'Recruitment conversion funnels and BDM acquisition analytics',
                    'Automated email notifications and system telemetry monitoring'
                  ].map((feat, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: 'rgba(255,255,255,0.75)' }}>
                      <Check size={16} color="#8B5CF6" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

          {/* ══ TECHNICAL ARCHITECTURE ══ */}
          <div className="glass-card" style={{ padding: 'clamp(28px,5vw,48px)', marginBottom: '60px' }}>
            <div className="section-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Code2 size={13} color="#22C55E" /> Engineering Deep Dive
            </div>
            <h2 style={{ fontSize: 'clamp(22px,3vw,30px)', fontWeight: 800, color: '#fff', marginTop: '6px', marginBottom: '24px' }}>
              Technical Implementation
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#60A5FA', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Layers size={18} /> Frontend Architecture
                </h4>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>
                  Built with React 19 and Vite for blazingly fast routing and hot reloads. Modular component hierarchy with reusable UI tokens, accessible modal systems, and responsive layout shells for mobile, tablet, and widescreen viewports.
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#4ADE80', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Server size={18} /> RESTful Backend & Security
                </h4>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>
                  Scalable Node.js & Express API layer with JWT authentication, HTTP-only cookie session handling, strict CORS policies, input validation, and transactional integrity for critical candidate pipeline updates.
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#C084FC', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Database size={18} /> Relational MySQL Engine
                </h4>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>
                  Normalized relational database schema modeling candidates, employers, applications, job requisitions, callback logs, and staff assignments with foreign key integrity and optimized search indexes.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Callout */}
          <div style={{ textAlign: 'center', padding: '40px 20px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px dashed rgba(255,255,255,0.1)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
              Interested in seeing Vakancy.in in action?
            </h3>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', maxWidth: '480px', margin: '0 auto 20px', lineHeight: 1.6 }}>
              Explore the live recruitment portal or connect with me to discuss full-stack application development.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <a 
                href="https://vakancy.in/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary" 
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
              >
                <ExternalLink size={16} /> Open Vakancy.in
              </a>
              <button 
                onClick={() => navigate('/#contact')} 
                className="btn-secondary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
              >
                <Send size={15} /> Contact Devang
              </button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
