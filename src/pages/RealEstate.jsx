import React, { useState } from 'react';
import { Search, MapPin, CheckCircle, PhoneCall, ArrowUpDown, Scale, X, Code, Shield, Cpu, Info, Zap } from 'lucide-react';
import villaImg from '../assets/skyline_home_mockup.png';
import apartmentImg from '../assets/skyline_apartment.png';
import valleyVillaImg from '../assets/green_valley_villa.png';
import urbanNestImg from '../assets/urban_nest.png';
import corporateHubImg from '../assets/corporate_hub.png';
import serenePalmsImg from '../assets/serene_palms.png';

export default function RealEstate() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('Public Facility');
  const [filterLoc, setFilterLoc] = useState('All');
  const [filterBhk, setFilterBhk] = useState('All'); // maps to impact rating: 2-Low, 3-Medium, 4-High, 5-Critical
  const [sortOrder, setSortOrder] = useState('none'); // none, asc, desc
  
  const [consultForm, setConsultForm] = useState({ name: '', phone: '', query: '', budget: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Project comparison state
  const [compareList, setCompareList] = useState([]);
  const [isCompareDrawerOpen, setIsCompareDrawerOpen] = useState(false);

  const civicProjects = [
    {
      id: 1,
      name: "Prestige Public Library Hub",
      loc: "SG Highway Ward, Ahmedabad",
      city: "Ahmedabad",
      bhk: "3", // Medium Impact
      sqft: "12,450", // sq ft area
      price: 12000000,
      priceLabel: "₹ 1.2 Cr Allocation",
      type: "Public Facility",
      badge: "Approved",
      badgeType: "sale",
      image: apartmentImg
    },
    {
      id: 2,
      name: "Green Valley Public Park",
      loc: "Bopal District, Ahmedabad",
      city: "Ahmedabad",
      bhk: "4", // High Impact
      sqft: "28,000",
      price: 28000000,
      priceLabel: "₹ 2.8 Cr Allocation",
      type: "Public Facility",
      badge: "New Proposal",
      badgeType: "new",
      image: valleyVillaImg
    },
    {
      id: 3,
      name: "Satellite Community Center",
      loc: "Satellite Ward, Ahmedabad",
      city: "Ahmedabad",
      bhk: "2", // Low Impact
      sqft: "4,980",
      price: 220000,
      priceLabel: "₹ 2.2 Lakh / yr Maintenance",
      type: "Community Program",
      badge: "In Review",
      badgeType: "rent",
      image: urbanNestImg
    },
    {
      id: 4,
      name: "Central Transit Station",
      loc: "C.G. Road Ward, Ahmedabad",
      city: "Ahmedabad",
      bhk: "3", // Medium Impact
      sqft: "18,850",
      price: 15000000,
      priceLabel: "₹ 1.5 Cr Allocation",
      type: "Capital Infrastructure",
      badge: "Priority Approved",
      badgeType: "sale",
      image: corporateHubImg
    },
    {
      id: 5,
      name: "Koba Road Eco-Preserve",
      loc: "Koba Road Ward, Gandhinagar",
      city: "Gandhinagar",
      bhk: "5", // Critical Impact
      sqft: "42,000",
      price: 48000000,
      priceLabel: "₹ 4.8 Cr Allocation",
      type: "Capital Infrastructure",
      badge: "New Proposal",
      badgeType: "new",
      image: serenePalmsImg
    }
  ];

  const handleConsultSubmit = (e) => {
    e.preventDefault();
    if (!consultForm.name || !consultForm.phone) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setConsultForm({ name: '', phone: '', query: '', budget: '' });
    }, 3000);
  };

  const toggleCompare = (project) => {
    if (compareList.some(p => p.id === project.id)) {
      setCompareList(compareList.filter(p => p.id !== project.id));
    } else {
      if (compareList.length >= 3) {
        alert("You can compare a maximum of 3 proposals side-by-side.");
        return;
      }
      setCompareList([...compareList, project]);
    }
  };

  const clearComparison = () => {
    setCompareList([]);
    setIsCompareDrawerOpen(false);
  };

  // Search, Filter & Sort logic
  const filteredAndSortedProperties = (() => {
    let result = civicProjects.filter(prop => {
      const matchesSearch = prop.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            prop.loc.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = prop.type === filterType;
      const matchesLoc = filterLoc === 'All' || prop.city === filterLoc;
      const matchesBhk = filterBhk === 'All' || prop.bhk === filterBhk;

      return matchesSearch && matchesType && matchesLoc && matchesBhk;
    });

    if (sortOrder === 'asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  })();

  return (
    <div className="bg-[#080809] text-zinc-100 min-h-screen pb-32 selection:bg-rose-500 selection:text-white">
      {/* Floating Compare Drawer Trigger */}
      {compareList.length > 0 && (
        <button 
          onClick={() => setIsCompareDrawerOpen(true)}
          className="fixed bottom-8 right-8 bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold py-3.5 px-6 rounded-full shadow-2xl flex items-center gap-2 cursor-pointer z-50 transition-all duration-300"
        >
          <Scale size={14} />
          <span>COMPARE PROPOSALS ({compareList.length})</span>
        </button>
      )}

      {/* Immersive Case Study Hero Header */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden border-b border-zinc-900 grid-bg">
        <div className="absolute inset-0 bg-gradient-to-b from-rose-950/5 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[10px] uppercase font-mono tracking-widest font-bold">
                Working Prototype
              </span>
              <span className="px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700 text-zinc-400 text-[10px] uppercase font-mono tracking-widest">
                Civic Tech System
              </span>
            </div>
            
            <h1 className="font-syne font-extrabold text-5xl md:text-7xl leading-tight tracking-tight text-white mb-6">
              UrbanVoice <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-rose-300">Zoning</span>
            </h1>
            
            <p className="text-base text-zinc-400 leading-relaxed max-w-xl mb-8 font-light">
              A public citizen zoning budget lookup system and infrastructure planner prototype. Enabling transparency in budget allocations and community projects.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a href="#sandbox" className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold tracking-wider rounded transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-rose-950/40">
                BROWSE WARD PLAN
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
                <img src={villaImg} alt="UrbanVoice Map Mockup" className="w-full h-64 object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700" />
                <div className="border-t border-zinc-800/80 p-5 bg-zinc-950/60 flex justify-around text-center text-xs font-mono">
                  <div>
                    <span className="block text-[9px] text-zinc-500 uppercase tracking-wider font-bold">Verified Wards</span>
                    <strong className="block text-xl text-rose-500 mt-1">12+</strong>
                  </div>
                  <div className="w-px bg-zinc-800" />
                  <div>
                    <span className="block text-[9px] text-zinc-500 uppercase tracking-wider font-bold">Total Budget</span>
                    <strong className="block text-xl text-zinc-200 mt-1">₹50Cr+</strong>
                  </div>
                  <div className="w-px bg-zinc-800" />
                  <div>
                    <span className="block text-[9px] text-zinc-500 uppercase tracking-wider font-bold">Feedback Rate</span>
                    <strong className="block text-xl text-emerald-400 mt-1">92%</strong>
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
                Municipal planning records and budget sheets are traditionally locked in opaque databases, hindering public critique. Citizens lack access to compare municipal proposals side-by-side or file local ward requests.
              </p>
            </div>
            
            <div className="p-6 bg-zinc-900/30 border border-zinc-800/80 rounded-lg">
              <h3 className="font-mono text-xs font-bold text-rose-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Cpu size={14} /> My Design Approach
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-light">
                Created a multi-parameter municipal lookup schema. Programmed state comparison matrices that stack public facilities and transit budget nodes side-by-side, caching inputs client-side via react memory states.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* System Logic Section */}
      <section id="logic" className="py-24 max-w-6xl mx-auto px-6 border-b border-zinc-900">
        <span className="font-mono text-xs text-rose-500 tracking-widest font-bold uppercase block mb-2 text-center">02 / ARCHITECTURE</span>
        <h2 className="font-syne font-bold text-3xl text-white text-center mb-16">System Logic & Query Schema</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Visual Data Flow Diagram */}
          <div className="lg:col-span-7 flex flex-col justify-between p-8 bg-zinc-900/20 border border-zinc-800/80 rounded-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full filter blur-3xl pointer-events-none" />
            <div>
              <h3 className="font-mono text-xs font-bold text-rose-400 uppercase tracking-widest mb-6">CITIZEN INQUIRY FLOW</h3>
              
              <div className="flex flex-col gap-6 font-mono text-xs relative">
                <div className="flex items-center gap-4 bg-zinc-950/60 p-4 border border-zinc-800/60 rounded">
                  <span className="w-8 h-8 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-500 font-bold">1</span>
                  <div>
                    <strong className="block text-zinc-200">Zoning Parameter Select</strong>
                    <span className="text-[10px] text-zinc-500">Citizen filters records by ward, project type, and impact size</span>
                  </div>
                </div>
                
                <div className="h-4 w-px bg-rose-500/30 ml-8" />
                
                <div className="flex items-center gap-4 bg-zinc-950/60 p-4 border border-zinc-800/60 rounded">
                  <span className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 font-bold">2</span>
                  <div>
                    <strong className="block text-zinc-200">Dynamic Proposal Comparison Stack</strong>
                    <span className="text-[10px] text-zinc-500">Adds/removes items from selected array (max 3) for side-by-side overlay</span>
                  </div>
                </div>
                
                <div className="h-4 w-px bg-rose-500/30 ml-8" />
                
                <div className="flex items-center gap-4 bg-zinc-950/60 p-4 border border-zinc-800/60 rounded">
                  <span className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 font-bold">3</span>
                  <div>
                    <strong className="block text-zinc-200">Municipal Feedback Register</strong>
                    <span className="text-[10px] text-zinc-500">Citizen feedback dispatches simulated API queue triggers</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-zinc-800/60 flex items-center justify-between text-xs font-mono text-zinc-500">
              <span>Database state: In-Memory JSON</span>
              <span>API Routing: simulated post routes</span>
            </div>
          </div>
          
          {/* Engineering Code Card */}
          <div className="lg:col-span-5 p-8 bg-zinc-950 border border-zinc-800/80 rounded-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                  <Code size={14} className="text-rose-500" /> comparison hook
                </h3>
                <span className="w-2 h-2 rounded-full bg-rose-500 shadow-md shadow-rose-950" />
              </div>
              
              <pre className="font-mono text-[11px] text-zinc-300 bg-zinc-900/30 p-4 rounded border border-zinc-900 overflow-x-auto leading-relaxed">
{`const toggleCompare = (project) => {
  if (compareList.some(p => p.id === project.id)) {
    setCompareList(compareList.filter(p => p.id !== project.id));
  } else {
    if (compareList.length >= 3) {
      alert("Maximum 3 proposals can be compared.");
      return;
    }
    setCompareList([...compareList, project]);
  }
};`}
              </pre>
            </div>
            
            <p className="text-xs text-zinc-500 font-light mt-4">
              Array matching logic prevents key collision inside the comparative drawer overlay window.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Sandbox Portal */}
      <section id="sandbox" className="py-24 max-w-6xl mx-auto px-6 border-b border-zinc-900">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <span className="font-mono text-xs text-rose-500 tracking-widest font-bold uppercase block mb-2">03 / SANDBOX DEMO</span>
            <h2 className="font-syne font-bold text-3xl text-white">Interactive Zoning Portal</h2>
          </div>
          
          <div className="flex items-center gap-2 mt-4 md:mt-0 font-mono text-[10px] text-zinc-500 bg-zinc-900/20 px-3 py-1.5 border border-zinc-800/80 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
            <span>MUNICIPAL SEARCH PORTAL RUNNING</span>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 shadow-2xl relative z-10 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 font-mono">
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] text-zinc-500 tracking-wider">SEARCH PROJECT</label>
              <div className="relative flex items-center">
                <Search size={14} className="absolute left-0 text-rose-500" />
                <input 
                  type="text" 
                  placeholder="project name, locality..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="bg-transparent border-b border-zinc-800 focus:border-rose-500 text-zinc-200 text-xs py-2 pl-6 outline-none w-full"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] text-zinc-500 tracking-wider">PROJECT CLASSIFICATION</label>
              <select 
                value={filterType} 
                onChange={e => setFilterType(e.target.value)}
                className="bg-transparent border-b border-zinc-800 focus:border-rose-500 text-zinc-300 text-xs py-2 outline-none cursor-pointer"
              >
                <option>Public Facility</option>
                <option>Community Program</option>
                <option>Capital Infrastructure</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] text-zinc-500 tracking-wider">WARD / CITY</label>
              <select 
                value={filterLoc} 
                onChange={e => setFilterLoc(e.target.value)}
                className="bg-transparent border-b border-zinc-800 focus:border-rose-500 text-zinc-300 text-xs py-2 outline-none cursor-pointer"
              >
                <option value="All">All Cities</option>
                <option value="Ahmedabad">Ahmedabad</option>
                <option value="Gandhinagar">Gandhinagar</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] text-zinc-500 tracking-wider">CIVIC IMPACT</label>
              <select 
                value={filterBhk} 
                onChange={e => setFilterBhk(e.target.value)}
                className="bg-transparent border-b border-zinc-800 focus:border-rose-500 text-zinc-300 text-xs py-2 outline-none cursor-pointer"
              >
                <option value="All">All Levels</option>
                <option value="2">Low Impact</option>
                <option value="3">Medium Impact</option>
                <option value="4">High Impact</option>
                <option value="5">Critical Impact</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5 justify-end">
              <button 
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="flex items-center justify-between border border-zinc-800 hover:border-rose-500/40 text-zinc-300 text-xs py-2 px-3 rounded cursor-pointer transition-colors"
              >
                <span>SORT BY BUDGET</span>
                <ArrowUpDown size={12} className="text-rose-500" />
              </button>
            </div>

          </div>
        </div>

        {/* Project Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedProperties.length === 0 ? (
            <div className="col-span-full border border-dashed border-zinc-800 bg-zinc-900/10 rounded-xl p-12 text-center text-zinc-500 font-mono text-xs">
              No civic proposals match your search parameters.
            </div>
          ) : (
            filteredAndSortedProperties.map((prop) => (
              <div key={prop.id} className="border border-zinc-800 bg-zinc-950 rounded-xl overflow-hidden hover:border-rose-500 transition-all duration-300 group flex flex-col justify-between">
                <div className="h-48 relative bg-zinc-900 flex items-center justify-center text-5xl border-b border-zinc-800 overflow-hidden">
                  <img src={prop.image} alt={prop.name} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 to-transparent pointer-events-none" />
                  <span className={`absolute top-4 left-4 font-mono text-[9px] font-bold px-2.5 py-1 rounded bg-zinc-950 border border-zinc-800 text-rose-500`}>
                    {prop.badge}
                  </span>
                </div>
                
                <div className="p-6 text-left">
                  <h3 className="font-syne text-base font-bold text-zinc-100 mb-2 truncate">{prop.name}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500 mb-4">
                    <MapPin size={12} className="text-rose-500" />
                    <span>{prop.loc}</span>
                  </div>

                  <div className="flex gap-4 border-b border-zinc-900 pb-4 mb-4 text-[10px] text-zinc-500 font-mono">
                    <div>Impact: <strong className="text-zinc-300">{prop.bhk === '2' ? 'Low' : prop.bhk === '3' ? 'Medium' : prop.bhk === '4' ? 'High' : 'Critical'}</strong></div>
                    <div className="w-px bg-zinc-900" />
                    <div>Area: <strong className="text-zinc-300">{prop.sqft} sqft</strong></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="font-mono text-sm text-rose-500 font-bold">{prop.priceLabel}</span>
                    <button 
                      onClick={() => toggleCompare(prop)}
                      className={`font-mono text-[9px] font-bold px-3 py-1.5 rounded cursor-pointer transition-colors ${
                        compareList.some(p => p.id === prop.id)
                          ? 'bg-rose-600 text-white shadow-md'
                          : 'border border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700'
                      }`}
                    >
                      COMPARE
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Comparative Drawer Modal Overlay */}
      {isCompareDrawerOpen && (
        <div className="fixed inset-0 bg-[#080809]/80 backdrop-blur-sm z-50 flex items-center justify-center p-6" onClick={() => setIsCompareDrawerOpen(false)}>
          <div className="bg-zinc-950 border border-zinc-800 w-full max-w-4xl rounded-xl shadow-2xl p-8" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center border-b border-zinc-800 pb-4 mb-6">
              <h3 className="font-syne text-lg font-bold text-zinc-100 flex items-center gap-2">
                <Scale className="text-rose-500" size={20} />
                <span>ZONING PROPOSALS COMPARISON</span>
              </h3>
              <button onClick={() => setIsCompareDrawerOpen(false)} className="text-zinc-500 hover:text-zinc-300">
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-4 gap-4 text-xs font-mono text-center">
              <div className="text-left font-bold text-zinc-500 flex flex-col gap-6 justify-end pb-4 border-r border-zinc-900">
                <span>PROJECT</span>
                <span>CLASSIFICATION</span>
                <span>IMPACT RATING</span>
                <span>LAND ALLOCATION</span>
                <span>ESTIMATED BUDGET</span>
              </div>
              
              {compareList.map((prop) => (
                <div key={prop.id} className="flex flex-col gap-6 pb-4 border-b border-zinc-900 relative group text-zinc-300">
                  <button 
                    onClick={() => toggleCompare(prop)} 
                    className="absolute top-0 right-2 text-zinc-500 hover:text-rose-500 transition-colors"
                    title="Remove"
                  >
                    <X size={14} />
                  </button>
                  <strong className="text-zinc-100 text-sm font-syne font-bold leading-tight truncate">{prop.name.split(' ')[0]} Hub</strong>
                  <span>{prop.type.split(' ')[0]}</span>
                  <span>{prop.bhk === '2' ? 'Low' : prop.bhk === '3' ? 'Medium' : prop.bhk === '4' ? 'High' : 'Critical'}</span>
                  <span>{prop.sqft} Sqft</span>
                  <strong className="text-rose-500">{prop.priceLabel.split(' ')[0]} {prop.priceLabel.split(' ')[1]}</strong>
                </div>
              ))}

              {Array.from({ length: 3 - compareList.length }).map((_, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center border border-dashed border-zinc-800/40 rounded-lg py-12 text-[10px] text-zinc-600">
                  Select item to compare
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center border-t border-zinc-800/80 pt-6 mt-6">
              <button onClick={clearComparison} className="font-mono text-[9px] text-zinc-500 hover:text-rose-500 cursor-pointer">
                CLEAR ALL
              </button>
              <button 
                onClick={() => setIsCompareDrawerOpen(false)}
                className="bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold px-6 py-2 rounded shadow-lg cursor-pointer"
              >
                CLOSE UTILITY
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Citizen Feedback Forum */}
      <section className="py-24 bg-zinc-950 mt-16 border-t border-zinc-900" id="consult">
        <div className="max-w-5xl mx-auto px-6">
          <div className="border border-zinc-800 bg-zinc-900/10 rounded-xl grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 md:p-14 shadow-2xl">
            <div className="text-left">
              <span className="font-mono text-[10px] text-rose-500 tracking-widest block mb-3 font-bold uppercase">Feedback Register</span>
              <h2 className="font-syne text-3xl font-bold text-white leading-tight">Submit Feedback to Council</h2>
              <p className="text-xs text-zinc-500 leading-relaxed mt-4 mb-8 font-light">
                Submit zoning queries, proposal support, or feedback on public facility structures to Ahmedabad Council.
              </p>
              <div className="flex items-center gap-3 border-l-2 border-rose-500 pl-4 mt-8">
                <PhoneCall size={18} className="text-rose-500" />
                <div>
                  <strong className="block font-mono text-[9px] text-zinc-500 tracking-wider">CITIZEN ADVOCATE LINE</strong>
                  <span className="block text-sm text-zinc-300 font-semibold mt-0.5">+91 98765 43210</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center min-h-[260px]">
              {isSubmitted ? (
                <div className="text-center py-6 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl mb-4">✓</div>
                  <h4 className="font-syne text-lg text-zinc-200 mb-2">FEEDBACK REGISTERED</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed font-light">Your civic query has been recorded. It will be logged in the public ward agenda.</p>
                </div>
              ) : (
                <form onSubmit={handleConsultSubmit} className="flex flex-col gap-4 text-left">
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[9px] text-zinc-400 font-bold uppercase">Your Full Name</label>
                    <input 
                      type="text" 
                      placeholder="Your Full Name" 
                      required 
                      value={consultForm.name} 
                      onChange={e => setConsultForm({...consultForm, name: e.target.value})}
                      className="bg-zinc-950 border border-zinc-800 rounded px-4 py-2.5 text-xs text-zinc-200 outline-none focus:border-rose-500 transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[9px] text-zinc-400 font-bold uppercase">WhatsApp Contact</label>
                    <input 
                      type="tel" 
                      placeholder="WhatsApp Number" 
                      required
                      value={consultForm.phone}
                      onChange={e => setConsultForm({...consultForm, phone: e.target.value})}
                      className="bg-zinc-950 border border-zinc-800 rounded px-4 py-2.5 text-xs text-zinc-200 outline-none focus:border-rose-500 transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[9px] text-zinc-400 font-bold uppercase">Feedback & Ward Proposal Note</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Need eco-center status on ward 4 center" 
                      value={consultForm.query}
                      onChange={e => setConsultForm({...consultForm, query: e.target.value})}
                      className="bg-zinc-950 border border-zinc-800 rounded px-4 py-2.5 text-xs text-zinc-200 outline-none focus:border-rose-500 transition-colors"
                    />
                  </div>
                  <button type="submit" className="w-full bg-rose-600 text-white font-mono text-xs font-bold py-3.5 rounded shadow-lg hover:bg-rose-500 transition-all cursor-pointer mt-2">SUBMIT ZONING RECORD</button>
                </form>
              )}
            </div>
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
            <h3 className="font-syne font-semibold text-lg text-white mb-2">Dynamic Zoning Lookup & Proposal Compare</h3>
            <p className="text-sm text-zinc-400 font-light leading-relaxed">
              Designed ward filter indexes, impact thresholds, side-by-side comparative drawers, and simulated citizen feedback registry portals.
            </p>
          </div>

          {/* Milestone 2: Progress */}
          <div className="mb-12 pl-6 relative">
            <span className="absolute -left-3.5 top-0 w-7 h-7 rounded-full bg-zinc-900 border border-rose-500 flex items-center justify-center font-mono text-[9px] text-rose-500 font-bold animate-pulse">
              ●
            </span>
            <span className="font-mono text-[9px] text-rose-400 uppercase tracking-widest block mb-1">MODULE 02 — IN PROGRESS</span>
            <h3 className="font-syne font-semibold text-lg text-white mb-2">Leaflet JS Ward GIS Map Overlay</h3>
            <p className="text-sm text-zinc-400 font-light leading-relaxed">
              Integrating spatial mapping controls to render budget pins and zone shapes overlayed on actual Ahmedabad geo-coordinate vectors.
            </p>
          </div>

          {/* Milestone 3: Future */}
          <div className="pl-6 relative">
            <span className="absolute -left-3.5 top-0 w-7 h-7 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center font-mono text-[9px] text-zinc-600 font-bold">
              ○
            </span>
            <span className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest block mb-1">MODULE 03 — PLANNED</span>
            <h3 className="font-syne font-semibold text-lg text-zinc-500 mb-2">Citizen Grievance Ledger & Auto-Routing</h3>
            <p className="text-sm text-zinc-500 font-light leading-relaxed">
              Build an automated zoning grievance system routing claims to local municipal offices based on spatial ward boundary intersections.
            </p>
          </div>
        </div>
      </section>

      {/* Tech Stack & Takeaways */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Tech Stack pills */}
          <div className="md:col-span-5">
            <span className="font-mono text-xs text-rose-500 tracking-widest font-bold uppercase block mb-2">05 / STACK</span>
            <h2 className="font-syne font-bold text-3xl text-white mb-8">Integrated Technologies</h2>
            
            <div className="flex flex-wrap gap-2.5 text-left">
              {['React.js', 'Tailwind CSS', 'Municipal Schema Ingest', 'Comparative Matrix Overlay', 'Feedback Dispatch Simulator'].map((tech) => (
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
                <span>Structuring complex data filters with multiple query dimensions requires memoized lookups to avoid rendering lag.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rose-500 mt-1">▪</span>
                <span>Handling modal arrays (like comparison matrices) using modular states keeps layouts responsive across devices and screens.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rose-500 mt-1">▪</span>
                <span>Simplifying municipal schemas into clean JSON key mappings helps build civic tech prototypes that can be integrated with actual databases quickly.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
