import React, { useEffect } from 'react';
import { ArrowLeft, GraduationCap, ChefHat } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import dishImg from '../assets/spice_route_dish.png';

export default function MaaKiRasoi() {
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ paddingTop: '70px', minHeight: '100vh' }}>
      <section className="section grid-bg" style={{ minHeight: 'calc(100vh - 70px)', padding: 'clamp(40px,6vw,80px) 0', overflow: 'hidden', position: 'relative' }}>
        
        {/* Background Glows */}
        <div className="orb orb-cyan" style={{ width: 'clamp(200px,35vw,480px)', height: 'clamp(200px,35vw,480px)', top: '-100px', right: '-60px', opacity: 0.15 }} />
        <div className="orb orb-purple" style={{ width: 'clamp(160px,28vw,360px)', height: 'clamp(160px,28vw,360px)', bottom: '-60px', left: '-40px', opacity: 0.12 }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          
          <button 
            onClick={() => navigate('/')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px', 
              background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.5)',
              fontFamily: 'Space Mono,monospace', fontSize: '12px', fontWeight: 700,
              letterSpacing: '0.1em', cursor: 'pointer', marginBottom: '40px',
              textTransform: 'uppercase', transition: 'color 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#F97316'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
          >
            <ArrowLeft size={16} /> Back to Portfolio
          </button>

          <div className="hero-grid" style={{ gap: '60px', alignItems: 'center' }}>
            {/* Text Side */}
            <div style={{ animation: 'fadeLeft 0.75s ease both' }}>
              <div className="hero-badge" style={{ display: 'flex', marginBottom: '22px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.25)', borderRadius: '50px' }}>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#F97316', display: 'inline-block', boxShadow: '0 0 8px #F97316', animation: 'glowPulse 2s infinite' }} />
                  <span style={{ fontFamily: 'Space Mono,monospace', fontSize: 'clamp(9px,1.5vw,11px)', color: '#F97316', fontWeight: 700, letterSpacing: '0.1em' }}>IN ACTIVE DEVELOPMENT</span>
                </div>
              </div>

              <h1 className="text-hero" style={{ marginBottom: '20px', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
                Maa Ki <br />
                <span style={{ color: '#F97316' }}>Rasoi</span>
              </h1>

              <p style={{ fontSize: 'clamp(14px,1.5vw,16px)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, maxWidth: '500px', marginBottom: '28px' }}>
                A food delivery platform designed for PG students and hostelers, connecting them with home chefs. The platform empowers women and housewives who cannot go outside for work due to family commitments, allowing them to earn a sustainable income by cooking homemade meals.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '40px' }}>
                {['React Native', 'Node.js', 'Express.js', 'MySQL'].map((t, i) => (
                  <span key={i} className="tech-pill" style={{ fontSize: '12px', padding: '6px 12px' }}>{t}</span>
                ))}
              </div>
            </div>

            {/* Image Side */}
            <div style={{ animation: 'fadeRight 0.75s ease both', width: '100%' }}>
              <div className="project-img-wrap" style={{ borderRadius: '24px', padding: '8px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', height: '400px' }}>
                <img src={dishImg} alt="Maa Ki Rasoi" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
              </div>
            </div>
          </div>

          <div style={{ marginTop: '80px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            <div className="glass-card" style={{ padding: '40px', borderTop: '2px solid #F97316' }}>
              <div style={{
                width: '56px', height: '56px', borderRadius: '14px',
                background: 'rgba(249,115,22,0.12)', display: 'flex', alignItems: 'center',
                justifyContent: 'center', marginBottom: '20px'
              }}>
                <GraduationCap size={30} color="#F97316" />
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>For Students</h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px', lineHeight: 1.7 }}>
                Get healthy, affordable, and delicious home-cooked meals delivered straight to your PG or hostel. 
                Say goodbye to unhealthy junk food and experience the authentic taste of home cooking away from home.
              </p>
            </div>
            
            <div className="glass-card" style={{ padding: '40px', borderTop: '2px solid #E11D48' }}>
              <div style={{
                width: '56px', height: '56px', borderRadius: '14px',
                background: 'rgba(225,29,72,0.12)', display: 'flex', alignItems: 'center',
                justifyContent: 'center', marginBottom: '20px'
              }}>
                <ChefHat size={30} color="#E11D48" />
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>For Home Chefs</h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px', lineHeight: 1.7 }}>
                Empowering housewives and mothers to earn an independent income by cooking what they love. 
                A zero-investment platform to start a cloud kitchen from home without neglecting family responsibilities.
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
