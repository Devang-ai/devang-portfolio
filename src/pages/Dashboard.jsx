import React, { useState, useEffect } from 'react';
import { 
  Users, ArrowUp, ArrowDown, Activity, Settings, LayoutDashboard,
  Check, ShieldAlert, Cpu, Play, Pause, Info, Code, Database, Zap
} from 'lucide-react';
import dashboardImg from '../assets/dashboard_mockup.png';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [billingCycle, setBillingCycle] = useState('monthly'); // monthly, yearly
  const [isLive, setIsLive] = useState(true);
  const [tickSpeed, setTickSpeed] = useState(3000); // 1000ms, 3000ms, 6000ms
  
  // Real-time ticking metrics states
  const [mrr, setMrr] = useState(420000);
  const [activeUsers, setActiveUsers] = useState(8241);
  const [churnRate, setChurnRate] = useState(2.1);
  
  // Customer list state
  const [customers, setCustomers] = useState([
    { id: 1, name: "Acme Corp", plan: "Pro", mrr: 12000, status: "Active" },
    { id: 2, name: "TechStart Inc", plan: "Growth", mrr: 6500, status: "Active" },
    { id: 3, name: "RetailCo Ltd", plan: "Starter", mrr: 2000, status: "Trial" }
  ]);
  const [newCustName, setNewCustName] = useState('');
  const [newCustPlan, setNewCustPlan] = useState('Pro');

  // Chart data state
  const [chartData, setChartData] = useState([
    { day: "Day 1", value: 40000, height: 40 },
    { day: "Day 2", value: 60000, height: 60 },
    { day: "Day 3", value: 45000, height: 45 },
    { day: "Day 4", value: 80000, height: 80 },
    { day: "Day 5", value: 65000, height: 65 },
    { day: "Day 6", value: 90000, height: 90 },
    { day: "Day 7", value: 75000, height: 75 }
  ]);
  const [hoveredBar, setHoveredBar] = useState(null);

  // System logs for the Engine Logs Tab
  const [systemLogs, setSystemLogs] = useState([
    "INFO [00:39:10] Database connection established successfully.",
    "INFO [00:39:11] AI Analysis Engine initialized (Velo-GPT-4o).",
    "WARN [00:39:15] Server CPU spike detected (65% capacity). Auto-scaled node B.",
    "INFO [00:39:22] Synchronized metrics for 2,400 external integration nodes."
  ]);

  // Real-time state updates simulation
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      // Tick MRR
      setMrr(prev => prev + (Math.random() > 0.4 ? Math.floor(Math.random() * 800) : -Math.floor(Math.random() * 600)));
      // Tick Active Users
      setActiveUsers(prev => prev + (Math.random() > 0.5 ? Math.floor(Math.random() * 8) : -Math.floor(Math.random() * 7)));
      // Tick Churn
      setChurnRate(prev => Math.max(0.5, Math.min(5.0, +(prev + (Math.random() > 0.5 ? 0.04 : -0.04)).toFixed(2))));
      
      // Tick chart heights
      setChartData(prev => prev.map(item => {
        const heightDiff = (Math.random() > 0.5 ? Math.floor(Math.random() * 6) : -Math.floor(Math.random() * 6));
        const newHeight = Math.max(20, Math.min(100, item.height + heightDiff));
        return {
          ...item,
          height: newHeight,
          value: newHeight * 1000 // scale value
        };
      }));
      
      // Add a simulated log occasionally
      const timestamps = new Date().toTimeString().split(' ')[0];
      const randomLogs = [
        `INFO [${timestamps}] Ingestion pipeline sync complete. Captured 84 events.`,
        `SUCCESS [${timestamps}] Backup vault SOC2 Type II compliance check verified.`,
        `INFO [${timestamps}] Payment captured for webhook event ID: ev_7a18da29.`,
        `WARN [${timestamps}] Cache latency limit exceeded (164ms) on /v1/insights.`
      ];
      setSystemLogs(prev => [randomLogs[Math.floor(Math.random() * randomLogs.length)], ...prev.slice(0, 6)]);
    }, tickSpeed);

    return () => clearInterval(interval);
  }, [isLive, tickSpeed]);

  const addMockCustomer = (e) => {
    e.preventDefault();
    if (!newCustName.trim()) return;
    const mrrMap = { Starter: 2000, Growth: 6500, Pro: 12000 };
    const newCust = {
      id: Date.now(),
      name: newCustName,
      plan: newCustPlan,
      mrr: mrrMap[newCustPlan],
      status: "Active"
    };
    setCustomers([newCust, ...customers]);
    setNewCustName('');
  };

  return (
    <div className="bg-[#080809] text-zinc-100 min-h-screen pb-32 selection:bg-rose-500 selection:text-white">
      {/* Immersive Case Study Hero Header */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden border-b border-zinc-900 grid-bg">
        <div className="absolute inset-0 bg-gradient-to-b from-rose-950/5 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[10px] uppercase font-mono tracking-widest font-bold">
                Telemetry Prototype
              </span>
              <span className="px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700 text-zinc-400 text-[10px] uppercase font-mono tracking-widest">
                Simulated AI Engine
              </span>
            </div>
            
            <h1 className="font-syne font-extrabold text-5xl md:text-7xl leading-tight tracking-tight text-white mb-6">
              Velo <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-rose-300">CRM Telemetry</span>
            </h1>
            
            <p className="text-base text-zinc-400 leading-relaxed max-w-xl mb-8 font-light">
              An AI-assisted server telemetry dashboard simulating system loads, active user sessions, database logging, and high-performance charts in a single page.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a href="#sandbox" className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold tracking-wider rounded transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-rose-950/40">
                ENTER DASHBOARD
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
                <img src={dashboardImg} alt="Velo CRM Telemetry Mockup" className="w-full h-64 object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700" />
                <div className="border-t border-zinc-800/80 p-5 bg-zinc-950/60 flex justify-around text-center text-xs font-mono">
                  <div>
                    <span className="block text-[9px] text-zinc-500 uppercase tracking-wider font-bold">ARR</span>
                    <strong className="block text-base text-rose-500 mt-1">₹1.2Cr+</strong>
                  </div>
                  <div className="w-px bg-zinc-800" />
                  <div>
                    <span className="block text-[9px] text-zinc-500 uppercase tracking-wider font-bold">Retention</span>
                    <strong className="block text-base text-zinc-200 mt-1">98.4%</strong>
                  </div>
                  <div className="w-px bg-zinc-800" />
                  <div>
                    <span className="block text-[9px] text-zinc-500 uppercase tracking-wider font-bold">Query SLA</span>
                    <strong className="block text-base text-emerald-400 mt-1">250ms</strong>
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
                <ShieldAlert size={14} /> The Problem
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-light">
                High-frequency server logging dashboards experience massive bottlenecks. Fetching metric statistics on short intervals creates database locks and causes client interface freeze if updating the state in a naive way.
              </p>
            </div>
            
            <div className="p-6 bg-zinc-900/30 border border-zinc-800/80 rounded-lg">
              <h3 className="font-mono text-xs font-bold text-rose-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Cpu size={14} /> My Design Approach
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-light">
                Designed a lightweight React loop that updates MRR, active users, and system log queues locally. Built responsive CSS variables and isolated hooks to prevent unnecessary DOM renders across adjacent panels and menus.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* System Logic Section */}
      <section id="logic" className="py-24 max-w-6xl mx-auto px-6 border-b border-zinc-900">
        <span className="font-mono text-xs text-rose-500 tracking-widest font-bold uppercase block mb-2 text-center">02 / ARCHITECTURE</span>
        <h2 className="font-syne font-bold text-3xl text-white text-center mb-16">System Logic & Metric Pipeline</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Visual Data Flow Diagram */}
          <div className="lg:col-span-7 flex flex-col justify-between p-8 bg-zinc-900/20 border border-zinc-800/80 rounded-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full filter blur-3xl pointer-events-none" />
            <div>
              <h3 className="font-mono text-xs font-bold text-rose-400 uppercase tracking-widest mb-6">METRIC PIPELINE FLOW</h3>
              
              <div className="flex flex-col gap-6 font-mono text-xs relative">
                <div className="flex items-center gap-4 bg-zinc-950/60 p-4 border border-zinc-800/60 rounded">
                  <span className="w-8 h-8 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-500 font-bold">1</span>
                  <div>
                    <strong className="block text-zinc-200">System Telemetry Ingestion</strong>
                    <span className="text-[10px] text-zinc-500">Periodic ticks simulate network log triggers and metrics deltas</span>
                  </div>
                </div>
                
                <div className="h-4 w-px bg-rose-500/30 ml-8" />
                
                <div className="flex items-center gap-4 bg-zinc-950/60 p-4 border border-zinc-800/60 rounded">
                  <span className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 font-bold">2</span>
                  <div>
                    <strong className="block text-zinc-200">State Buffering & Log Queuing</strong>
                    <span className="text-[10px] text-zinc-500">Limits log stack to 6 entries to avoid memory bloating</span>
                  </div>
                </div>
                
                <div className="h-4 w-px bg-rose-500/30 ml-8" />
                
                <div className="flex items-center gap-4 bg-zinc-950/60 p-4 border border-zinc-800/60 rounded">
                  <span className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 font-bold">3</span>
                  <div>
                    <strong className="block text-zinc-200">Dynamic Height Scaling</strong>
                    <span className="text-[10px] text-zinc-500">Maps heights to percentage properties on rendering the bar chart</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-zinc-800/60 flex items-center justify-between text-xs font-mono text-zinc-500">
              <span>Telemetry state: Ticking Engine</span>
              <span>Memory cap: Strict queue bounds</span>
            </div>
          </div>
          
          {/* Engineering Code Card */}
          <div className="lg:col-span-5 p-8 bg-zinc-950 border border-zinc-800/80 rounded-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                  <Code size={14} className="text-rose-500" /> ingestion loop
                </h3>
                <span className="w-2 h-2 rounded-full bg-rose-500 shadow-md shadow-rose-950" />
              </div>
              
              <pre className="font-mono text-[11px] text-zinc-300 bg-zinc-900/30 p-4 rounded border border-zinc-900 overflow-x-auto leading-relaxed">
{`useEffect(() => {
  if (!isLive) return;
  const interval = setInterval(() => {
    setMrr(p => p + (Math.random() > 0.4 ? 800 : -600));
    setChartData(prev => prev.map(item => {
      const delta = (Math.random() > 0.5 ? 6 : -6);
      const newHt = Math.max(20, Math.min(100, item.height + delta));
      return { ...item, height: newHt, value: newHt * 1000 };
    }));
  }, tickSpeed);
  return () => clearInterval(interval);
}, [isLive, tickSpeed]);`}
              </pre>
            </div>
            
            <p className="text-xs text-zinc-500 font-light mt-4">
              Restricting ingestion rates dynamically via custom variables prevents browser loop overflows.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Sandbox Workstation */}
      <section id="sandbox" className="py-24 max-w-6xl mx-auto px-6 border-b border-zinc-900">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <span className="font-mono text-xs text-rose-500 tracking-widest font-bold uppercase block mb-2">03 / SANDBOX DEMO</span>
            <h2 className="font-syne font-bold text-3xl text-white">Interactive Telemetry Workstation</h2>
          </div>
          
          <div className="flex items-center gap-2 mt-4 md:mt-0 font-mono text-[10px] text-zinc-500 bg-zinc-900/20 px-3 py-1.5 border border-zinc-800/80 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
            <span>METRIC WORKSTATION ONLINE</span>
          </div>
        </div>

        {/* Dashboard Frame */}
        <div className="border border-zinc-800 bg-zinc-950 rounded-xl overflow-hidden shadow-2xl">
          {/* Workstation Top Bar */}
          <div className="bg-zinc-900/60 px-6 py-4 flex items-center justify-between border-b border-zinc-800/80">
            <div className="flex gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
            </div>
            <div className="font-mono text-[10px] text-zinc-500 bg-zinc-900 px-4 py-1 rounded">app.velo.io/telemetry</div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
            {/* Sidebar navigation */}
            <aside className="lg:col-span-3 bg-zinc-950 border-r border-zinc-800/80 p-6 flex flex-col justify-between">
              <div>
                <div className="font-syne text-xl font-bold text-white mb-8 tracking-wider">VE<span className="text-rose-500">LO</span></div>
                <ul className="flex flex-col gap-2 list-none p-0 m-0">
                  <li 
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-medium cursor-pointer transition-all ${activeTab === 'Overview' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200'}`}
                    onClick={() => setActiveTab('Overview')}
                  >
                    <LayoutDashboard size={14} /> <span>Overview</span>
                  </li>
                  <li 
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-medium cursor-pointer transition-all ${activeTab === 'Analytics' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200'}`}
                    onClick={() => setActiveTab('Analytics')}
                  >
                    <Activity size={14} /> <span>Engine Logs</span>
                  </li>
                  <li 
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-medium cursor-pointer transition-all ${activeTab === 'Customers' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200'}`}
                    onClick={() => setActiveTab('Customers')}
                  >
                    <Users size={14} /> <span>Customers</span>
                  </li>
                  <li 
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-medium cursor-pointer transition-all ${activeTab === 'Settings' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200'}`}
                    onClick={() => setActiveTab('Settings')}
                  >
                    <Settings size={14} /> <span>Settings</span>
                  </li>
                </ul>
              </div>

              <div className="border-t border-zinc-900 pt-4 font-mono">
                <span className="text-[9px] text-zinc-600 block mb-1">ENGINE STATE:</span>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1.5 font-bold">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span> ONLINE
                </span>
              </div>
            </aside>

            {/* Main Content Pane */}
            <main className="lg:col-span-9 p-8 bg-zinc-900/10">
              {activeTab === 'Overview' && (
                <div className="animate-fade-in space-y-8">
                  
                  {/* Metrics Row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-5">
                      <span className="font-mono text-[9px] text-zinc-500 tracking-wider block mb-2">MRR (TICKING)</span>
                      <h4 className="text-xl md:text-2xl font-bold font-mono text-zinc-100">₹ {mrr.toLocaleString('en-IN')}</h4>
                      <span className="text-[10px] text-emerald-400 font-medium inline-flex items-center gap-0.5 mt-2"><ArrowUp size={10} /> 12.4%</span>
                    </div>
                    <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-5">
                      <span className="font-mono text-[9px] text-zinc-500 tracking-wider block mb-2">ACTIVE USERS</span>
                      <h4 className="text-xl md:text-2xl font-bold font-mono text-zinc-100">{activeUsers.toLocaleString()}</h4>
                      <span className="text-[10px] text-emerald-400 font-medium inline-flex items-center gap-0.5 mt-2"><ArrowUp size={10} /> 8.1%</span>
                    </div>
                    <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-5">
                      <span className="font-mono text-[9px] text-zinc-500 tracking-wider block mb-2">CHURN RATE</span>
                      <h4 className="text-xl md:text-2xl font-bold font-mono text-zinc-100">{churnRate}%</h4>
                      <span className="text-[10px] text-rose-500 font-medium inline-flex items-center gap-0.5 mt-2"><ArrowDown size={10} /> 0.3%</span>
                    </div>
                  </div>

                  {/* Grid split chart & table */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                    
                    {/* Customer table */}
                    <div className="lg:col-span-7 bg-zinc-950 border border-zinc-800 rounded-lg p-5">
                      <span className="font-mono text-[9px] text-zinc-500 tracking-wider block mb-4">RECENT PAYMENTS</span>
                      <div className="flex flex-col gap-3 font-mono">
                        <div className="grid grid-cols-4 text-[8px] text-zinc-500 tracking-wider pb-2 border-b border-zinc-900">
                          <span>CUSTOMER</span>
                          <span>PLAN</span>
                          <span>MRR</span>
                          <span>STATUS</span>
                        </div>
                        {customers.map((c) => (
                          <div key={c.id} className="grid grid-cols-4 items-center text-xs py-2 border-b border-zinc-900/60">
                            <strong className="text-zinc-200">{c.name}</strong>
                            <span>{c.plan}</span>
                            <span>₹ {c.mrr.toLocaleString('en-IN')}</span>
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full text-center w-fit ${c.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>{c.status}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* SVG Chart */}
                    <div className="lg:col-span-5 bg-zinc-950 border border-zinc-800 rounded-lg p-5 relative">
                      <div className="flex justify-between items-baseline mb-4 font-mono">
                        <span className="text-[9px] text-zinc-500 tracking-wider">REVENUE TREND</span>
                        {hoveredBar && (
                          <span className="text-[9px] text-rose-500 font-bold">{hoveredBar.day}: ₹ {hoveredBar.value.toLocaleString('en-IN')}</span>
                        )}
                      </div>
                      
                      {/* Bar graph */}
                      <div className="flex items-end gap-2.5 h-36 pt-4 justify-between relative">
                        {chartData.map((bar, idx) => (
                          <div 
                            key={idx} 
                            className="flex-1 flex flex-col justify-end items-center h-full group"
                            onMouseEnter={() => setHoveredBar(bar)}
                            onMouseLeave={() => setHoveredBar(null)}
                          >
                            <div 
                              className={`w-full rounded-t transition-all duration-300 cursor-pointer ${
                                hoveredBar && hoveredBar.day === bar.day
                                  ? 'bg-rose-500 shadow-lg shadow-rose-950/20' 
                                  : 'bg-gradient-to-t from-zinc-900 to-rose-600'
                              }`}
                              style={{ height: `${bar.height}%` }}
                            ></div>
                            <span className="font-mono text-[9px] text-zinc-500 mt-2">{bar.day.split(' ')[1]}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {activeTab === 'Analytics' && (
                <div className="animate-fade-in">
                  <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-5 font-mono">
                    <div className="flex justify-between items-center pb-3 border-b border-zinc-900/80 mb-4">
                      <span className="text-[10px] text-zinc-500">Live Telemetry Ingestion Stream</span>
                      <button 
                        onClick={() => setIsLive(!isLive)}
                        className={`inline-flex items-center gap-1.5 font-mono text-[9px] font-bold px-3 py-1.5 rounded cursor-pointer transition-colors ${
                          isLive 
                            ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' 
                            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        }`}
                      >
                        {isLive ? <Pause size={10} /> : <Play size={10} />}
                        <span>{isLive ? 'PAUSE INGESTION' : 'RESUME STREAM'}</span>
                      </button>
                    </div>
                    <div className="flex flex-col gap-2.5 h-64 overflow-y-auto pr-2">
                      {systemLogs.map((log, idx) => (
                        <div key={idx} className="text-xs leading-normal text-rose-400/90 border-l border-zinc-800 pl-3">{log}</div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'Customers' && (
                <div className="animate-fade-in space-y-6">
                  <form onSubmit={addMockCustomer} className="bg-zinc-950 border border-zinc-800 rounded-lg p-5">
                    <h4 className="font-mono text-xs font-bold text-zinc-300 mb-4 uppercase">Provision Client Node</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-mono text-[9px] text-zinc-500">NODE NAME</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Innovate Web" 
                          required
                          value={newCustName}
                          onChange={e => setNewCustName(e.target.value)}
                          className="bg-zinc-900 border border-zinc-800 rounded px-4 py-2 text-xs text-zinc-200 outline-none focus:border-rose-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="font-mono text-[9px] text-zinc-500">MODULE PLAN</label>
                        <select 
                          value={newCustPlan} 
                          onChange={e => setNewCustPlan(e.target.value)}
                          className="bg-zinc-900 border border-zinc-800 rounded px-4 py-2 text-xs text-zinc-300 outline-none"
                        >
                          <option>Starter</option>
                          <option>Growth</option>
                          <option>Pro</option>
                        </select>
                      </div>
                      <button 
                        type="submit"
                        className="bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold py-2 rounded transition-all cursor-pointer"
                      >
                        PROVISION CLIENT
                      </button>
                    </div>
                  </form>

                  <div className="flex flex-col gap-2 max-h-56 overflow-y-auto">
                    {customers.map((c) => (
                      <div key={c.id} className="bg-zinc-950 border border-zinc-800 rounded-lg px-5 py-3 flex justify-between items-center">
                        <div className="font-mono">
                          <strong className="text-xs text-zinc-200 block">{c.name}</strong>
                          <span className="block text-[9px] text-zinc-500 mt-1">Plan: {c.plan} · Value: ₹ {c.mrr.toLocaleString('en-IN')}</span>
                        </div>
                        <span className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full text-center w-fit ${c.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>{c.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'Settings' && (
                <div className="animate-fade-in">
                  <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-6 flex flex-col gap-4">
                    <h4 className="font-mono text-xs font-bold text-zinc-300 mb-2 uppercase">DIAGNOSTICS CONFIGURATION</h4>
                    <div className="flex justify-between items-center pb-3 border-b border-zinc-900 font-mono text-xs">
                      <span className="text-zinc-400">Live Polling Rate</span>
                      <select 
                        value={tickSpeed} 
                        onChange={e => setTickSpeed(Number(e.target.value))}
                        className="bg-zinc-900 border border-zinc-800 rounded p-1.5 text-xs text-zinc-300 outline-none cursor-pointer"
                      >
                        <option value={1000}>Fast (1000ms)</option>
                        <option value={3000}>Normal (3000ms)</option>
                        <option value={6000}>Slow (6000ms)</option>
                      </select>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-zinc-900 font-mono text-xs">
                      <span className="text-zinc-400">Ingestion Router</span>
                      <span className="text-zinc-500">Round Robin</span>
                    </div>
                    <div className="flex justify-between items-center font-mono text-xs">
                      <span className="text-zinc-400">SOC2 Cryptography vault</span>
                      <span className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[9px] px-3 py-1 rounded">Vault Active</span>
                    </div>
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      </section>

      {/* Subscription Pricing Section */}
      <section className="py-24 bg-zinc-950 mt-16 border-t border-zinc-900" id="pricing">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12 flex flex-col items-center">
            <span className="font-mono text-[9px] text-rose-500 tracking-widest block mb-3 font-bold uppercase">Pricing Module</span>
            <h2 className="font-syne text-3xl md:text-4xl font-bold text-slate-100 mb-6">Choose Your Telemetry Plan</h2>
            
            <div className="inline-flex items-center gap-4 bg-zinc-900/40 border border-zinc-800 px-5 py-2.5 rounded-full">
              <span className={`font-mono text-[9px] font-bold ${billingCycle === 'monthly' ? 'text-zinc-200' : 'text-zinc-500'}`}>MONTHLY</span>
              <button 
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className="w-10 h-5 bg-zinc-800 rounded-full p-0.5 relative cursor-pointer"
                aria-label="Toggle billing cycle"
              >
                <span className={`block w-4 h-4 rounded-full bg-rose-600 transition-transform duration-200 ${billingCycle === 'yearly' ? 'translate-x-5 bg-rose-500' : ''}`}></span>
              </button>
              <span className={`font-mono text-[9px] font-bold ${billingCycle === 'yearly' ? 'text-zinc-200' : 'text-zinc-500'}`}>ANNUAL (SAVE 20%)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-zinc-900/20 border border-zinc-800/80 rounded-xl p-8 flex flex-col justify-between">
              <div>
                <span className="font-syne text-base font-bold text-zinc-300 block mb-3">Starter</span>
                <div className="font-mono text-3xl font-bold text-zinc-100 mb-4">
                  ₹ {billingCycle === 'monthly' ? '999' : '799'}
                  <span className="text-xs text-zinc-500 font-sans font-light"> / mo</span>
                </div>
                <p className="text-xs text-zinc-500 leading-normal mb-6 h-8 font-light">Perfect for small teams tracking database logs.</p>
                <ul className="flex flex-col gap-2.5 list-none p-0 mb-8 text-xs text-zinc-500 font-mono">
                  <li className="flex items-center gap-2">✓ Up to 5 team members</li>
                  <li className="flex items-center gap-2">✓ 10 dashboards</li>
                  <li className="flex items-center gap-2">✓ 30-day log history</li>
                  <li className="flex items-center gap-2">✓ Email support</li>
                </ul>
              </div>
              <button className="w-full border border-zinc-800 hover:border-rose-500 text-zinc-300 font-mono text-[10px] font-bold py-3 rounded cursor-pointer transition-all">CHOOSE STARTER</button>
            </div>

            <div className="bg-[#0c091a]/30 border-2 border-rose-600 rounded-xl p-8 flex flex-col justify-between relative shadow-xl shadow-rose-950/10">
              <span className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-rose-600 text-white font-mono text-[9px] font-bold px-4 py-1 rounded-full tracking-widest">PRO CHOICE</span>
              <div>
                <span className="font-syne text-base font-bold text-zinc-300 block mb-3">Growth</span>
                <div className="font-mono text-3xl font-bold text-zinc-100 mb-4">
                  ₹ {billingCycle === 'monthly' ? '3,499' : '2,799'}
                  <span className="text-xs text-zinc-500 font-sans font-light"> / mo</span>
                </div>
                <p className="text-xs text-zinc-500 leading-normal mb-6 h-8 font-light">For scaling firms who need predictive diagnostic intelligence.</p>
                <ul className="flex flex-col gap-2.5 list-none p-0 mb-8 text-xs text-zinc-400 font-mono">
                  <li className="flex items-center gap-2">✓ Up to 25 team members</li>
                  <li className="flex items-center gap-2">✓ Unlimited dashboards</li>
                  <li className="flex items-center gap-2">✓ 1-year log history</li>
                  <li className="flex items-center gap-2">✓ AI insights included</li>
                  <li className="flex items-center gap-2">✓ Priority support</li>
                </ul>
              </div>
              <button className="w-full bg-rose-600 hover:bg-rose-500 text-white font-mono text-[10px] font-bold py-3 rounded cursor-pointer transition-all">START FREE TRIAL</button>
            </div>

            <div className="bg-zinc-900/20 border border-zinc-800/80 rounded-xl p-8 flex flex-col justify-between">
              <div>
                <span className="font-syne text-base font-bold text-zinc-300 block mb-3">Enterprise</span>
                <div className="font-mono text-3xl font-bold text-zinc-100 mb-4">
                  CUSTOM
                </div>
                <p className="text-xs text-zinc-500 leading-normal mb-6 h-8 font-light">For large corporations with strict SLA requirements.</p>
                <ul className="flex flex-col gap-2.5 list-none p-0 mb-8 text-xs text-zinc-500 font-mono">
                  <li className="flex items-center gap-2">✓ Unlimited team members</li>
                  <li className="flex items-center gap-2">✓ Dedicated DB cluster</li>
                  <li className="flex items-center gap-2">✓ Custom API webhooks</li>
                  <li className="flex items-center gap-2">✓ SOC2 security vault</li>
                  <li className="flex items-center gap-2">✓ 24/7 SLA support</li>
                </ul>
              </div>
              <button className="w-full border border-zinc-800 hover:border-rose-500 text-zinc-300 font-mono text-[10px] font-bold py-3 rounded cursor-pointer transition-all">CONTACT SALES</button>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance banner */}
      <section className="max-w-5xl mx-auto px-6 mt-8">
        <div className="bg-zinc-900/20 border border-zinc-800/80 rounded-xl p-6 flex gap-4 items-center">
          <div className="w-10 h-10 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center flex-shrink-0">
            <ShieldAlert size={18} className="text-rose-500" />
          </div>
          <div>
            <h5 className="font-mono text-xs font-bold text-zinc-300 mb-1.5 flex items-center gap-2">
              <Info size={12} className="text-rose-500" /> SLA & CRYPTOGRAPHY METADATA
            </h5>
            <p className="text-[10px] text-zinc-500 leading-relaxed font-light">
              Compliance diagnostic algorithms run on automated background processes. The ingestion stream buffers metrics in volatile state hooks to prevent performance spikes during high ticks.
            </p>
          </div>
        </div>
      </section>

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
            <h3 className="font-syne font-semibold text-lg text-white mb-2">Simulated Metrics Engine & Multi-Tab Hub</h3>
            <p className="text-sm text-zinc-400 font-light leading-relaxed">
              Designed ticking revenue loops, isolated client provisioner panels, settings triggers, responsive SVG graphs, and scrolling diagnostic stream buffers.
            </p>
          </div>

          {/* Milestone 2: Progress */}
          <div className="mb-12 pl-6 relative">
            <span className="absolute -left-3.5 top-0 w-7 h-7 rounded-full bg-zinc-900 border border-rose-500 flex items-center justify-center font-mono text-[9px] text-rose-500 font-bold animate-pulse">
              ●
            </span>
            <span className="font-mono text-[9px] text-rose-400 uppercase tracking-widest block mb-1">MODULE 02 — IN PROGRESS</span>
            <h3 className="font-syne font-semibold text-lg text-white mb-2">PostgreSQL/InfluxDB Metrics Connector</h3>
            <p className="text-sm text-zinc-400 font-light leading-relaxed">
              Building lightweight Node.js polling routes to ingest actual hardware server statistics (CPU, RAM, cache hit rates) directly from external database nodes.
            </p>
          </div>

          {/* Milestone 3: Future */}
          <div className="pl-6 relative">
            <span className="absolute -left-3.5 top-0 w-7 h-7 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center font-mono text-[9px] text-zinc-600 font-bold">
              ○
            </span>
            <span className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest block mb-1">MODULE 03 — PLANNED</span>
            <h3 className="font-syne font-semibold text-lg text-zinc-500 mb-2">OpenAI Logs Interpreter Agent</h3>
            <p className="text-sm text-zinc-500 font-light leading-relaxed">
              Integrate vector embedding tools to query structural warnings directly in the console, generating immediate fixes using LLM chat agents.
            </p>
          </div>
        </div>
      </section>

      {/* Tech Stack & Engineering Takeaways */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Tech Stack pills */}
          <div className="md:col-span-5">
            <span className="font-mono text-xs text-rose-500 tracking-widest font-bold uppercase block mb-2">05 / STACK</span>
            <h2 className="font-syne font-bold text-3xl text-white mb-8">Integrated Technologies</h2>
            
            <div className="flex flex-wrap gap-2.5">
              {['React.js', 'Tailwind CSS', 'Dynamic Bar Scale rendering', 'Mempool Log Buffering', 'Telemetry State Loops', 'Isolated Navigation Hub'].map((tech) => (
                <span key={tech} className="px-3.5 py-2 rounded bg-zinc-900 border border-zinc-800/80 font-mono text-xs text-zinc-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          {/* Takeaways bullet grid */}
          <div className="md:col-span-7">
            <span className="font-mono text-xs text-rose-500 tracking-widest font-bold uppercase block mb-2">06 / LESSONS</span>
            <h2 className="font-syne font-bold text-3xl text-white mb-8">Engineering Takeaways</h2>
            
            <ul className="space-y-4 text-sm text-zinc-400 font-light leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-rose-500 mt-1">▪</span>
                <span>Restricting log queues using simple array slicing prevents infinite browser updates, protecting DOM nodes from memory leaks.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rose-500 mt-1">▪</span>
                <span>Writing custom bar height mapping functions removes heavy third-party dashboard packages (like ChartJS or Recharts), yielding lightning-fast page loading times.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rose-500 mt-1">▪</span>
                <span>Bundling active menus, logs, and settings under local toggle tabs keeps states clean and lets component files remain modular.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
