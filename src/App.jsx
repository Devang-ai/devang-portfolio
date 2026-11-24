import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Portfolio from './pages/Portfolio';
import Restaurant from './pages/Restaurant';
import Fashion from './pages/Fashion';
import RealEstate from './pages/RealEstate';
import Dashboard from './pages/Dashboard';
import Crypto from './pages/Crypto';
import Kanban from './pages/Kanban';
import MaaKiRasoi from './pages/MaaKiRasoi';
import Vakancy from './pages/Vakancy';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) { element.scrollIntoView({ behavior: 'smooth' }); return; }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0A0A0A' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/project/restaurant" element={<Restaurant />} />
            <Route path="/project/fashion" element={<Fashion />} />
            <Route path="/project/realestate" element={<RealEstate />} />
            <Route path="/project/dashboard" element={<Dashboard />} />
            <Route path="/project/crypto" element={<Crypto />} />
            <Route path="/project/kanban" element={<Kanban />} />
            <Route path="/project/maakirasoi" element={<MaaKiRasoi />} />
            <Route path="/project/vakancy" element={<Vakancy />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
