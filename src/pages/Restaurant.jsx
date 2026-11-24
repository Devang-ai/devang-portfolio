import React, { useState } from 'react';
import { Calendar, Users, Clock, AlertCircle, Check, Trash2, HelpCircle, X, Minus, Plus, Code, Shield, Cpu, Info, Zap, UtensilsCrossed } from 'lucide-react';
import dishImg from '../assets/spice_route_dish.png';

export default function Restaurant() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [vegOnly, setVegOnly] = useState(false);
  const [booking, setBooking] = useState({ name: '', email: '', phone: '', date: '', time: '7:00 PM', guests: '2 People' });
  const [status, setStatus] = useState('idle'); // idle, validation-error, success
  const [tableNumber, setTableNumber] = useState(null);

  // Table order simulator state
  const [tableOrder, setTableOrder] = useState([]);
  const [isOrderSidebarOpen, setIsOrderSidebarOpen] = useState(false);

  const menuItems = [
    { id: 1, cat: "Starters", name: "Tandoori Lamb Chops", desc: "Slow-marinated overnight in a blend of 14 spices, char-grilled in our tandoor.", price: 850, isVeg: false },
    { id: 2, cat: "Mains", name: "Dal Makhani Royal", desc: "Black lentils simmered for 72 hours on a slow flame. A recipe unchanged for 30 years.", price: 620, isVeg: true },
    { id: 3, cat: "Chef's Special", name: "Raan-e-Shahi", desc: "Whole slow-roasted leg of lamb, served with saffron rice and house-made chutneys.", price: 2200, isVeg: false },
    { id: 4, cat: "Breads", name: "Stuffed Kulcha Trio", desc: "Three house kulchas — paneer, aloo masala, and mixed vegetable. Served with cultured butter.", price: 320, isVeg: true },
    { id: 5, cat: "Desserts", name: "Gulab Jamun Cheesecake", desc: "A fusion of classic gulab jamun soaked in rose syrup, layered on mascarpone base.", price: 380, isVeg: true },
    { id: 6, cat: "Beverages", name: "Signature Masala Chai", desc: "Our award-winning blend of Darjeeling leaves, fresh ginger, cardamom and jaggery.", price: 180, isVeg: true }
  ];

  const categories = ['All', 'Starters', 'Mains', 'Breads', 'Desserts', 'Beverages'];

  const filteredMenu = menuItems.filter(item => {
    const matchesCat = activeCategory === 'All' || item.cat === activeCategory;
    const matchesVeg = !vegOnly || item.isVeg;
    return matchesCat && matchesVeg;
  });

  const handleBooking = (e) => {
    e.preventDefault();
    if (!booking.name || !booking.email || !booking.phone || !booking.date) {
      setStatus('validation-error');
      return;
    }
    // Auto allocate table number (random 1 to 20)
    setTableNumber(Math.floor(Math.random() * 20) + 1);
    setStatus('success');
  };

  const addToTableOrder = (item) => {
    const existingIdx = tableOrder.findIndex(o => o.id === item.id);
    if (existingIdx > -1) {
      const updated = [...tableOrder];
      updated[existingIdx].qty += 1;
      setTableOrder(updated);
    } else {
      setTableOrder([...tableOrder, { ...item, qty: 1 }]);
    }
    setIsOrderSidebarOpen(true);
  };

  const updateOrderQty = (idx, amount) => {
    const updated = [...tableOrder];
    updated[idx].qty += amount;
    if (updated[idx].qty <= 0) {
      updated.splice(idx, 1);
    }
    setTableOrder(updated);
  };

  const removeFromOrder = (idx) => {
    const updated = [...tableOrder];
    updated.splice(idx, 1);
    setTableOrder(updated);
  };

  const getSubtotal = () => {
    return tableOrder.reduce((acc, item) => acc + (item.price * item.qty), 0);
  };

  return (
    <div className="bg-[#080809] text-zinc-100 min-h-screen pb-32 selection:bg-rose-500 selection:text-white">
      {/* Floating Order Trigger */}
      {tableNumber && (
        <button 
          onClick={() => setIsOrderSidebarOpen(true)}
          className="fixed bottom-8 right-8 bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold py-3.5 px-6 rounded-full shadow-2xl flex items-center gap-2 cursor-pointer z-50 transition-all duration-300"
        >
          <span>TABLE #{tableNumber} ORDERS ({tableOrder.reduce((a, b) => a + b.qty, 0)})</span>
        </button>
      )}

      {/* Immersive Case Study Hero Header */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden border-b border-zinc-900 grid-bg">
        <div className="absolute inset-0 bg-gradient-to-b from-rose-950/5 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[10px] uppercase font-mono tracking-widest font-bold">
                In Development SaaS
              </span>
              <span className="px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700 text-zinc-400 text-[10px] uppercase font-mono tracking-widest">
                Dine-in System
              </span>
            </div>
            
            <h1 className="font-syne font-extrabold text-5xl md:text-7xl leading-tight tracking-tight text-white mb-6">
              Scan2Serve <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-rose-300">SaaS</span>
            </h1>
            
            <p className="text-base text-zinc-400 leading-relaxed max-w-xl mb-8 font-light">
              A contactless, table-routed dine-in QR ordering system prototype designed to streamline menu browsing, guest session binding, and direct-to-kitchen order transmission.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a href="#sandbox" className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold tracking-wider rounded transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-rose-950/40">
                MENU WORKSPACE
              </a>
              <a href="#logic" className="px-6 py-3 border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900 text-zinc-300 font-mono text-xs font-bold tracking-wider rounded transition-all duration-300">
                SYSTEM LOGIC
              </a>
            </div>
          </div>
          
          <div className="lg:col-span-5 w-full flex justify-center">
            <div className="relative group w-full max-w-md">
              <div className="absolute inset-0 bg-rose-500/10 rounded-2xl filter blur-2xl group-hover:bg-rose-500/15 transition-all duration-500" />
              <div className="relative border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-md rounded-xl overflow-hidden shadow-2xl">
                <img src={dishImg} alt="Scan2Serve Dish Mockup" className="w-full h-64 object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700" />
                <div className="border-t border-zinc-800/80 p-5 bg-zinc-950/60 flex justify-around text-center text-xs font-mono">
                  <div>
                    <span className="block text-[9px] text-zinc-500 uppercase tracking-wider font-bold">QR Tables</span>
                    <strong className="block text-xl text-rose-500 mt-1">20 Assigned</strong>
                  </div>
                  <div className="w-px bg-zinc-800" />
                  <div>
                    <span className="block text-[9px] text-zinc-500 uppercase tracking-wider font-bold">Latency</span>
                    <strong className="block text-xl text-zinc-200 mt-1">&lt; 10ms</strong>
                  </div>
                  <div className="w-px bg-zinc-800" />
                  <div>
                    <span className="block text-[9px] text-zinc-500 uppercase tracking-wider font-bold">Status</span>
                    <strong className="block text-xl text-emerald-400 mt-1">Staged</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Section: Problem & Approach */}
      <section className="py-24 max-w-6xl mx-auto px-6 border-b border-zinc-900">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4 flex flex-col justify-start">
            <span className="font-mono text-xs text-rose-500 tracking-widest font-bold uppercase mb-2">01 / OVERVIEW</span>
            <h2 className="font-syne font-bold text-3xl text-white">The Challenge & Engineering Strategy</h2>
          </div>
          
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="p-6 bg-zinc-900/30 border border-zinc-800/80 rounded-lg">
              <h3 className="font-mono text-xs font-bold text-rose-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Shield size={14} /> The Problem
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-light">
                Traditional dine-in ordering processes rely heavily on waitstaff availability, causing delayed feedback loops, error-prone order registers, and payment processing friction during busy service windows.
              </p>
            </div>
            
            <div className="p-6 bg-zinc-900/30 border border-zinc-800/80 rounded-lg">
              <h3 className="font-mono text-xs font-bold text-rose-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Cpu size={14} /> My Design Approach
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-light">
                Created a contactless order broker in React. Bound active customer sessions to auto-allocated table numbers upon reservation, allowing users to queue food metrics to the kitchen instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* System Logic Section */}
      <section id="logic" className="py-24 max-w-6xl mx-auto px-6 border-b border-zinc-900">
        <span className="font-mono text-xs text-rose-500 tracking-widest font-bold uppercase block mb-2 text-center">02 / ARCHITECTURE</span>
        <h2 className="font-syne font-bold text-3xl text-white text-center mb-16">System Logic & Session Routing</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Visual Data Flow Diagram */}
          <div className="lg:col-span-7 flex flex-col justify-between p-8 bg-zinc-900/20 border border-zinc-800/80 rounded-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full filter blur-3xl pointer-events-none" />
            <div>
              <h3 className="font-mono text-xs font-bold text-rose-400 uppercase tracking-widest mb-6">DINE-IN TRANSACTION FLOW</h3>
              
              <div className="flex flex-col gap-6 font-mono text-xs relative">
                <div className="flex items-center gap-4 bg-zinc-950/60 p-4 border border-zinc-800/60 rounded">
                  <span className="w-8 h-8 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-500 font-bold">1</span>
                  <div>
                    <strong className="block text-zinc-200">Table Allocation Request</strong>
                    <span className="text-[10px] text-zinc-500">Citizen reserves table date and details, returning a unique Table ID</span>
                  </div>
                </div>
                
                <div className="h-4 w-px bg-rose-500/30 ml-8" />
                
                <div className="flex items-center gap-4 bg-[#121214] p-4 border border-zinc-800/60 rounded">
                  <span className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 font-bold">2</span>
                  <div>
                    <strong className="block text-zinc-200">Session Menu Ingestion</strong>
                    <span className="text-[10px] text-zinc-500">Menu renders matching category queries with toggleable vegetarian exclusions</span>
                  </div>
                </div>
                
                <div className="h-4 w-px bg-rose-500/30 ml-8" />
                
                <div className="flex items-center gap-4 bg-[#121214] p-4 border border-zinc-800/60 rounded">
                  <span className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 font-bold">3</span>
                  <div>
                    <strong className="block text-zinc-200">Direct Kitchen Queue Ingestion</strong>
                    <span className="text-[10px] text-zinc-500">Transmits transaction array payload directly to simulated KDS router</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-zinc-800/60 flex items-center justify-between text-xs font-mono text-zinc-500">
              <span>Ingestion Type: Client state payload</span>
              <span>Kitchen Sync: simulated HTTP post</span>
            </div>
          </div>
          
          {/* Engineering Code Card */}
          <div className="lg:col-span-5 p-8 bg-zinc-950 border border-zinc-800/80 rounded-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                  <Code size={14} className="text-rose-500" /> menu compiler
                </h3>
                <span className="w-2 h-2 rounded-full bg-rose-500 shadow-md shadow-rose-950" />
              </div>
              
              <pre className="font-mono text-[11px] text-zinc-300 bg-zinc-900/30 p-4 rounded border border-zinc-900 overflow-x-auto leading-relaxed">
{`const filteredMenu = menuItems.filter(item => {
  const matchesCat = 
    activeCategory === 'All' || 
    item.cat === activeCategory;
  const matchesVeg = 
    !vegOnly || 
    item.isVeg;
  return matchesCat && matchesVeg;
});`}
              </pre>
            </div>
            
            <p className="text-xs text-zinc-500 font-light mt-4">
              Our lightweight compiler logic handles fast client-side filtering without requesting server data recursively.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Sandbox Portal */}
      <section id="sandbox" className="py-24 max-w-6xl mx-auto px-6 border-b border-zinc-900">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <span className="font-mono text-xs text-rose-500 tracking-widest font-bold uppercase block mb-2">03 / SANDBOX DEMO</span>
            <h2 className="font-syne font-bold text-3xl text-white">Interactive Menu Workspace</h2>
          </div>
          
          <div className="flex items-center gap-2 mt-4 md:mt-0 font-mono text-[10px] text-zinc-500 bg-zinc-900/20 px-3 py-1.5 border border-zinc-800/80 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
            <span>SAAS CLIENT ENGINE BOUND</span>
          </div>
        </div>

        {/* Booking reservations section */}
        <div className="max-w-3xl mx-auto mb-16 text-center" id="reserve">
          {status === 'success' ? (
            <div className="bg-zinc-950 border border-rose-500/30 rounded-xl p-8 animate-fade-in text-center">
              <div className="w-12 h-12 rounded-full border border-rose-500/20 bg-rose-500/5 text-rose-500 flex items-center justify-center text-xl mx-auto mb-6">✓</div>
              <h3 className="font-syne text-lg font-bold tracking-wider text-zinc-200 mb-6">DINE-IN SESSION ESTABLISHED</h3>
              
              <div className="flex flex-col gap-4 max-w-sm mx-auto border-t border-b border-zinc-900 py-6 mb-8 text-left text-xs font-mono">
                <div className="flex justify-between"><span>GUEST ACCOUNT:</span><strong>{booking.name.toUpperCase()}</strong></div>
                <div className="flex justify-between"><span>ASSIGNED QR TABLE:</span><strong className="text-rose-500 font-bold">TABLE #{tableNumber}</strong></div>
                <div className="flex justify-between"><span>GUESTS CAPACITY:</span><strong>{booking.guests}</strong></div>
                <div className="flex justify-between"><span>DATE & TIMING:</span><strong>{booking.date} @ {booking.time}</strong></div>
              </div>

              <p className="text-[11px] text-zinc-500 mb-6 max-w-xs mx-auto leading-relaxed">
                Table mapping complete. You can now add dishes to your assigned Table #{tableNumber} using the action buttons in the catalog below.
              </p>
              
              <button 
                onClick={() => { setStatus('idle'); setTableNumber(null); setTableOrder([]); }}
                className="bg-rose-600 hover:bg-rose-500 text-white font-mono text-[10px] font-bold px-6 py-3 rounded transition-all cursor-pointer"
              >
                DISCONNECT & RESET SESSION
              </button>
            </div>
          ) : (
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-8 shadow-2xl">
              <h3 className="font-syne text-sm font-bold tracking-widest text-zinc-300 uppercase mb-6 text-left">
                1. Establish Dine-In Session
              </h3>
              
              <form onSubmit={handleBooking} className="flex flex-col gap-4 text-left font-mono">
                {status === 'validation-error' && (
                  <div className="bg-rose-950/20 border border-rose-500/20 text-rose-400 p-3 rounded text-xs flex items-center gap-2 mb-2">
                    <AlertCircle size={14} /> Fill in name, email, phone, and date fields.
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="First Name" 
                    required
                    value={booking.name} 
                    onChange={e => setBooking({ ...booking, name: e.target.value })}
                    className="bg-zinc-900 border border-zinc-800 rounded p-3 text-xs text-zinc-200 outline-none focus:border-rose-500"
                  />
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    required
                    value={booking.email} 
                    onChange={e => setBooking({ ...booking, email: e.target.value })}
                    className="bg-zinc-900 border border-zinc-800 rounded p-3 text-xs text-zinc-200 outline-none focus:border-rose-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    type="tel" 
                    placeholder="Phone Number" 
                    required
                    value={booking.phone} 
                    onChange={e => setBooking({ ...booking, phone: e.target.value })}
                    className="bg-zinc-900 border border-zinc-800 rounded p-3 text-xs text-zinc-200 outline-none focus:border-rose-500"
                  />
                  <input 
                    type="date" 
                    required
                    value={booking.date} 
                    onChange={e => setBooking({ ...booking, date: e.target.value })}
                    className="bg-zinc-900 border border-zinc-800 rounded p-3 text-xs text-zinc-300 outline-none focus:border-rose-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative flex items-center bg-zinc-900 border border-zinc-800 rounded">
                    <Clock size={13} className="absolute left-4 text-rose-500" />
                    <select 
                      value={booking.time} 
                      onChange={e => setBooking({ ...booking, time: e.target.value })}
                      className="w-full bg-transparent p-3 pl-10 text-xs text-zinc-300 outline-none cursor-pointer"
                    >
                      <option>12:00 PM</option>
                      <option>1:00 PM</option>
                      <option>7:00 PM</option>
                      <option>8:00 PM</option>
                      <option>9:00 PM</option>
                    </select>
                  </div>
                  
                  <div className="relative flex items-center bg-zinc-900 border border-zinc-800 rounded">
                    <Users size={13} className="absolute left-4 text-rose-500" />
                    <select 
                      value={booking.guests} 
                      onChange={e => setBooking({ ...booking, guests: e.target.value })}
                      className="w-full bg-transparent p-3 pl-10 text-xs text-zinc-300 outline-none cursor-pointer"
                    >
                      <option>1 Person</option>
                      <option>2 People</option>
                      <option>3–4 People</option>
                      <option>5–6 People</option>
                      <option>7+ People</option>
                    </select>
                  </div>
                </div>
                
                <button type="submit" className="w-full bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold py-4 mt-2 transition-all rounded cursor-pointer">
                  DISPATCH TABLE ASSIGNMENT
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Dynamic Menu catalog */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 md:p-8 shadow-2xl text-left" id="menu">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-8 border-b border-zinc-900 pb-6">
            <div>
              <h3 className="font-syne text-sm font-bold tracking-widest text-zinc-300 uppercase">
                2. Browse Digital Menu Catalog
              </h3>
            </div>
            
            <div className="flex flex-wrap gap-4 items-center mt-4 md:mt-0 font-mono text-[10px]">
              {categories.map(cat => (
                <button 
                  key={cat} 
                  className={`font-bold tracking-widest pb-1 border-b cursor-pointer transition-colors ${activeCategory === cat ? 'border-rose-500 text-rose-500' : 'border-transparent text-zinc-500 hover:text-zinc-300'}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat.toUpperCase()}
                </button>
              ))}

              <button 
                onClick={() => setVegOnly(!vegOnly)}
                className={`font-bold border px-3 py-1 rounded transition-colors cursor-pointer ${vegOnly ? 'border-emerald-500 bg-emerald-500/5 text-emerald-400' : 'border-zinc-800 text-zinc-500 hover:text-zinc-300'}`}
              >
                VEG ONLY
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredMenu.map(item => (
              <div key={item.id} className="border border-zinc-900 bg-zinc-900/10 rounded-lg p-6 flex flex-col justify-between hover:border-rose-500/20 transition-all duration-300 group">
                <div className="text-left">
                  <div className="flex justify-between items-baseline mb-3">
                    <span className="font-mono text-[8px] text-rose-500 tracking-wider uppercase font-bold">{item.cat}</span>
                    {item.isVeg && <span className="w-3.5 h-3.5 rounded border border-emerald-500 flex items-center justify-center font-bold text-[8px] text-emerald-400">V</span>}
                  </div>
                  <div className="flex justify-between items-baseline gap-4 mb-2">
                    <h4 className="font-syne text-base font-bold text-zinc-200">{item.name}</h4>
                    <span className="font-mono text-sm text-rose-500 font-bold">₹ {item.price}</span>
                  </div>
                  <p className="text-xs text-zinc-500 leading-normal font-light mb-6 h-8 overflow-hidden">{item.desc}</p>
                </div>

                {tableNumber ? (
                  <button 
                    onClick={() => addToTableOrder(item)}
                    className="w-full border border-rose-500/30 bg-rose-500/5 hover:bg-rose-600 hover:text-white text-rose-500 text-[9px] font-mono font-bold py-2.5 transition-colors cursor-pointer rounded"
                  >
                    ADD TO TABLE ORDER
                  </button>
                ) : (
                  <a 
                    href="#reserve" 
                    className="w-full text-center border border-zinc-800 hover:border-rose-500/40 text-zinc-500 hover:text-rose-500 font-mono text-[9px] font-bold py-2.5 transition-all rounded"
                  >
                    ESTABLISH SESSION TO ORDER
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Table order sidebar */}
      {isOrderSidebarOpen && (
        <div className="fixed inset-0 bg-[#080809]/80 backdrop-blur-sm z-50 flex justify-end" onClick={() => setIsOrderSidebarOpen(false)}>
          <div className="w-[420px] max-w-full h-full bg-zinc-950 border-l border-zinc-800 flex flex-col justify-between shadow-2xl" onClick={e => e.stopPropagation()}>
            
            <div className="p-6 border-b border-zinc-900 flex justify-between items-center bg-zinc-950">
              <h3 className="font-syne text-xs font-bold tracking-wider text-zinc-300 uppercase">
                TABLE #{tableNumber} COURSE ORDERS
              </h3>
              <button onClick={() => setIsOrderSidebarOpen(false)} className="text-zinc-500 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5 text-left">
              {tableOrder.length === 0 ? (
                <div className="text-center py-16 text-zinc-600 font-mono text-xs">No dishes added to your table.</div>
              ) : (
                tableOrder.map((item, idx) => (
                  <div key={idx} className="flex gap-4 border-b border-zinc-900 pb-4 relative items-center font-mono">
                    <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded flex items-center justify-center text-rose-500"><UtensilsCrossed size={20} /></div>
                    <div className="flex-1">
                      <h4 className="font-syne text-xs font-bold text-zinc-200">{item.name}</h4>
                      <div className="flex justify-between items-center mt-2.5">
                        <div className="flex items-center border border-zinc-800 bg-zinc-900 rounded">
                          <button onClick={() => updateOrderQty(idx, -1)} className="px-2 py-1 text-xs text-rose-500"><Minus size={8} /></button>
                          <span className="text-xs font-bold px-1.5 text-zinc-300">{item.qty}</span>
                          <button onClick={() => updateOrderQty(idx, 1)} className="px-2 py-1 text-xs text-rose-500"><Plus size={8} /></button>
                        </div>
                        <strong className="text-xs text-rose-500">₹ {item.price * item.qty}</strong>
                      </div>
                    </div>
                    <button onClick={() => removeFromOrder(idx)} className="absolute top-0 right-0 text-zinc-500 hover:text-rose-500 transition-colors">
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {tableOrder.length > 0 && (
              <div className="p-6 bg-zinc-950 border-t border-zinc-900">
                <div className="flex justify-between items-baseline mb-6 font-mono text-xs border-b border-zinc-900 pb-4 text-zinc-400">
                  <span>BILLING SUBTOTAL</span>
                  <strong className="text-lg text-rose-500">₹ {getSubtotal()}</strong>
                </div>
                <button 
                  onClick={() => { alert("Order transmitted to kitchen display screen! Prep session started."); setTableOrder([]); setIsOrderSidebarOpen(false); }}
                  className="w-full bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold py-4 rounded tracking-widest cursor-pointer transition-all duration-300"
                >
                  TRANSMIT TO KITCHEN
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Vertical Roadmap Timeline */}
      <section className="py-24 max-w-6xl mx-auto px-6 border-b border-zinc-900">
        <span className="font-mono text-xs text-rose-500 tracking-widest font-bold uppercase block mb-2 text-center">04 / ROADMAP</span>
        <h2 className="font-syne font-bold text-3xl text-white text-center mb-16">Future Enhancements & Features</h2>
        
        <div className="max-w-3xl mx-auto relative border-l border-zinc-800 ml-4 md:ml-auto">
          {/* Milestone 1: Done */}
          <div className="mb-12 pl-6 relative">
            <span className="absolute -left-3.5 top-0 w-7 h-7 rounded-full bg-rose-950 border border-rose-500 flex items-center justify-center font-mono text-[9px] text-rose-500 font-bold">
              ✓
            </span>
            <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest block mb-1">MODULE 01 — COMPLETED</span>
            <h3 className="font-syne font-semibold text-lg text-white mb-2">QR Seat Routing & Ordering Sandbox</h3>
            <p className="text-sm text-zinc-400 font-light leading-relaxed">
              Designed table reservation state drivers, local order lists, veg filter tags, and direct kitchen routing simulations.
            </p>
          </div>

          {/* Milestone 2: Progress */}
          <div className="mb-12 pl-6 relative">
            <span className="absolute -left-3.5 top-0 w-7 h-7 rounded-full bg-zinc-900 border border-rose-500 flex items-center justify-center font-mono text-[9px] text-rose-500 font-bold animate-pulse">
              ●
            </span>
            <span className="font-mono text-[9px] text-rose-400 uppercase tracking-widest block mb-1">MODULE 02 — IN PROGRESS</span>
            <h3 className="font-syne font-semibold text-lg text-white mb-2">Dynamic Table QR Code Deep Linking</h3>
            <p className="text-sm text-zinc-400 font-light leading-relaxed">
              Integrating canvas libraries to render table-specific QR vectors that append hash params for automatic seating on code scans.
            </p>
          </div>

          {/* Milestone 3: Future */}
          <div className="pl-6 relative">
            <span className="absolute -left-3.5 top-0 w-7 h-7 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center font-mono text-[9px] text-zinc-600 font-bold">
              ○
            </span>
            <span className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest block mb-1">MODULE 03 — PLANNED</span>
            <h3 className="font-syne font-semibold text-lg text-zinc-500 mb-2">Kitchen Display Router & Stripe Checkout</h3>
            <p className="text-sm text-zinc-500 font-light leading-relaxed">
              Develop a separate merchant KDS page dashboard listing ticket flows and compile with Stripe Checkout for table tab payments.
            </p>
          </div>
        </div>
      </section>

      {/* Tech Stack & Engineering Takeaways */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Tech Stack pills */}
          <div className="md:col-span-5 text-left">
            <span className="font-mono text-xs text-rose-500 tracking-widest font-bold uppercase block mb-2">05 / STACK</span>
            <h2 className="font-syne font-bold text-3xl text-white mb-8">Integrated Technologies</h2>
            
            <div className="flex flex-wrap gap-2.5">
              {['React.js', 'Tailwind CSS', 'Guest Session Binding', 'Simulated Kitchen Ingest', 'Mobile-first Grid'].map((tech) => (
                <span key={tech} className="px-3.5 py-2 rounded bg-zinc-900 border border-zinc-800/80 font-mono text-xs text-zinc-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          {/* Takeaways bullet grid */}
          <div className="md:col-span-7 text-left">
            <span className="font-mono text-xs text-rose-500 tracking-widest font-bold uppercase block mb-2">06 / LESSONS</span>
            <h2 className="font-syne font-bold text-3xl text-white mb-8">Engineering Takeaways</h2>
            
            <ul className="space-y-4 text-sm text-zinc-400 font-light leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-rose-500 mt-1">▪</span>
                <span>Generating mock session identifiers (Table IDs) upon reservation mimics real API behaviors and prepares the client for database integrations.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rose-500 mt-1">▪</span>
                <span>Optimizing search and veg queries inside isolated react components prevents render bloat in the main menu catalog.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rose-500 mt-1">▪</span>
                <span>Designing table bills to calculate dynamically using simple array aggregates avoids data mismatches between client cart views and checkout summaries.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
