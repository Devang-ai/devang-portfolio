import { useState, useEffect } from 'react';
import { Wallet, RefreshCw, ArrowRightLeft, Shield, TrendingUp, History, Info, Code, Cpu, Database, Award, ArrowUpRight, Check, ArrowRight } from 'lucide-react';
import cryptoImg from '../assets/crypto_mockup.png';

export default function Crypto() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [connecting, setConnecting] = useState(false);
  const [activeTokenChart, setActiveTokenChart] = useState('BTC');
  
  // Ticking token prices state
  const [tokens, setTokens] = useState([
    { id: 'btc', name: 'Bitcoin', symbol: 'BTC', price: 68420.50, change: 2.4, history: 'up' },
    { id: 'eth', name: 'Ethereum', symbol: 'ETH', price: 3842.20, change: 1.8, history: 'up' },
    { id: 'sol', name: 'Solana', symbol: 'SOL', price: 172.85, change: 5.6, history: 'up' },
    { id: 'matic', name: 'Polygon', symbol: 'MATIC', price: 0.74, change: -1.2, history: 'down' },
    { id: 'dot', name: 'Polkadot', symbol: 'DOT', price: 6.88, change: -0.4, history: 'down' }
  ]);

  // Swapper states
  const [fromToken, setFromToken] = useState('ETH');
  const [toToken, setToToken] = useState('SOL');
  const [swapAmount, setSwapAmount] = useState('1');
  const [swapResult, setSwapResult] = useState('22.22');
  const [gasFee, setGasFee] = useState('0.002');
  const [swapStatus, setSwapStatus] = useState('idle'); // idle, swapping, success

  // Transaction Ledger history state
  const [transactions, setTransactions] = useState([
    { id: 1, time: "10:14:22 AM", pair: "ETH ➔ SOL", amount: "0.5 ETH", received: "11.11 SOL", txHash: "0xfa72a...912a", status: "Success" },
    { id: 2, time: "09:44:05 AM", pair: "BTC ➔ USDT", amount: "0.01 BTC", received: "684.20 USDT", txHash: "0x9812e...62ba", status: "Success" }
  ]);

  // Mock historical chart coordinates mapping (selectedToken: [height values out of 100])
  const chartData = {
    BTC: [40, 45, 42, 58, 52, 60, 56, 75, 70, 85],
    ETH: [30, 38, 35, 48, 42, 55, 52, 62, 58, 68],
    SOL: [20, 28, 25, 42, 38, 58, 50, 72, 65, 82],
    MATIC: [65, 62, 58, 55, 50, 48, 45, 42, 38, 32],
    DOT: [50, 48, 46, 48, 44, 42, 40, 38, 35, 30]
  };

  // Simulated live ticker rates
  useEffect(() => {
    const interval = setInterval(() => {
      setTokens(prev => prev.map(t => {
        const pct = (Math.random() * 0.4 - 0.2); // fluctuation between -0.2% and +0.2%
        const delta = t.price * (pct / 100);
        const newPrice = +(t.price + delta).toFixed(2);
        const isUp = delta >= 0;
        
        return {
          ...t,
          price: newPrice,
          change: +(t.change + pct).toFixed(2),
          history: isUp ? 'up' : 'down'
        };
      }));
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Update swap calculation
  useEffect(() => {
    const amt = parseFloat(swapAmount) || 0;
    if (amt <= 0) {
      setSwapResult('0.00');
      return;
    }
    
    const tokenPrices = {
      BTC: tokens.find(t => t.symbol === 'BTC')?.price || 68420,
      ETH: tokens.find(t => t.symbol === 'ETH')?.price || 3842,
      SOL: tokens.find(t => t.symbol === 'SOL')?.price || 172.85,
      MATIC: tokens.find(t => t.symbol === 'MATIC')?.price || 0.74,
      DOT: tokens.find(t => t.symbol === 'DOT')?.price || 6.88
    };

    const fromPrice = tokenPrices[fromToken];
    const toPrice = tokenPrices[toToken];
    
    if (fromPrice && toPrice) {
      const conversion = (amt * fromPrice) / toPrice;
      setSwapResult(conversion.toFixed(4));
      setGasFee((0.0012 * amt).toFixed(5));
    }
  }, [swapAmount, fromToken, toToken, tokens]);

  const handleWalletConnect = () => {
    if (walletConnected) {
      setWalletConnected(false);
      setWalletAddress('');
      return;
    }

    setConnecting(true);
    setTimeout(() => {
      setConnecting(false);
      setWalletConnected(true);
      setWalletAddress('0x8a25...60f3');
    }, 1200);
  };

  const handleSwap = (e) => {
    e.preventDefault();
    if (swapStatus !== 'idle') return;
    if (!walletConnected) {
      alert("Please connect your wallet first!");
      return;
    }
    
    setSwapStatus('swapping');
    setTimeout(() => {
      const newTx = {
        id: Date.now(),
        time: new Date().toLocaleTimeString(),
        pair: `${fromToken} ➔ ${toToken}`,
        amount: `${swapAmount} ${fromToken}`,
        received: `${swapResult} ${toToken}`,
        txHash: `0x${Math.random().toString(16).substr(2, 6)}...${Math.random().toString(16).substr(2, 4)}`,
        status: "Success"
      };

      setTransactions([newTx, ...transactions]);
      setSwapStatus('success');
      setTimeout(() => {
        setSwapStatus('idle');
      }, 2500);
    }, 2000);
  };

  // Convert chart array values into SVG points path
  const getSvgPath = (data) => {
    const width = 500;
    const height = 150;
    const padding = 10;
    const pointsCount = data.length;
    
    return data.map((val, idx) => {
      const x = padding + (idx * (width - 2 * padding)) / (pointsCount - 1);
      const y = height - padding - (val * (height - 2 * padding)) / 100;
      return `${x},${y}`;
    }).join(' ');
  };

  const currentPoints = chartData[activeTokenChart] || chartData.BTC;
  const svgPathPoints = getSvgPath(currentPoints);

  return (
    <div className="bg-[#080809] text-zinc-100 min-h-screen pb-32 selection:bg-rose-500 selection:text-white font-sans">
      {/* Mini Top Status Bar */}
      <div className="bg-zinc-950 border-b border-zinc-900/60 px-6 py-3 flex items-center justify-between font-mono text-[10px] text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
          <span>CRYPTOSPHERE ROUTER ONLINE</span>
        </div>
        <button 
          className={`flex items-center gap-1.5 border px-3 py-1 rounded transition-all cursor-pointer ${
            walletConnected 
              ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400' 
              : 'border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700'
          }`} 
          onClick={handleWalletConnect} 
          disabled={connecting}
        >
          <Wallet size={10} />
          <span>{connecting ? 'CONNECTING...' : walletConnected ? walletAddress : 'CONNECT WALLET'}</span>
        </button>
      </div>

      {/* Immersive Case Study Hero */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-20 pb-16 overflow-hidden border-b border-zinc-900 grid-bg">
        <div className="absolute inset-0 bg-gradient-to-b from-rose-950/5 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[10px] uppercase font-mono tracking-widest font-bold">
                Interactive Prototype
              </span>
              <span className="px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700 text-zinc-400 text-[10px] uppercase font-mono tracking-widest">
                DeFi Sandbox
              </span>
            </div>
            
            <h1 className="font-syne font-extrabold text-5xl md:text-7xl leading-tight tracking-tight text-white mb-6">
              CryptoSphere <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-rose-300">Swapper</span>
            </h1>
            
            <p className="text-base text-zinc-400 leading-relaxed max-w-xl mb-8 font-light">
              An interactive Web3 mempool router client built to demonstrate sub-second price fluctuations, automated slippage checks, and high-frequency token routing logic.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a href="#sandbox" className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold tracking-wider rounded transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-rose-950/40">
                SWAP SANDBOX
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
                <img src={cryptoImg} alt="CryptoSphere Swap Mockup" className="w-full h-64 object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700" />
                <div className="border-t border-zinc-800/80 p-5 bg-zinc-950/60 flex justify-around text-center text-xs font-mono">
                  <div>
                    <span className="block text-[9px] text-zinc-500 uppercase tracking-wider font-bold">24h Vol</span>
                    <strong className="block text-base text-rose-500 mt-1">$2.4B</strong>
                  </div>
                  <div className="w-px bg-zinc-800" />
                  <div>
                    <span className="block text-[9px] text-zinc-500 uppercase tracking-wider font-bold">Latency</span>
                    <strong className="block text-base text-zinc-200 mt-1">12ms</strong>
                  </div>
                  <div className="w-px bg-zinc-800" />
                  <div>
                    <span className="block text-[9px] text-zinc-500 uppercase tracking-wider font-bold">Uptime</span>
                    <strong className="block text-base text-emerald-400 mt-1">99.9%</strong>
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
                In Web3 ecosystems, price slip changes and blockchain latency lead to failed operations or sandwich front-running. Visualizing how calculations react to sub-second updates is crucial for blockchain developers building robust interfaces.
              </p>
            </div>
            
            <div className="p-6 bg-zinc-900/30 border border-zinc-800/80 rounded-lg">
              <h3 className="font-mono text-xs font-bold text-rose-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Cpu size={14} /> My Design Approach
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-light">
                Created a background ticking client loop simulating mempool feeds. Architected a dynamic pricing engine linking from/to ratios dynamically, generating clean coordinate streams rendered inside inline vector SVGs without external dashboard dependencies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* System Logic Section */}
      <section id="logic" className="py-24 max-w-6xl mx-auto px-6 border-b border-zinc-900">
        <span className="font-mono text-xs text-rose-500 tracking-widest font-bold uppercase block mb-2 text-center">02 / ARCHITECTURE</span>
        <h2 className="font-syne font-bold text-3xl text-white text-center mb-16">System Logic & Pricing Flow</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Visual Data Flow Diagram */}
          <div className="lg:col-span-7 flex flex-col justify-between p-8 bg-zinc-900/20 border border-zinc-800/80 rounded-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full filter blur-3xl pointer-events-none" />
            <div>
              <h3 className="font-mono text-xs font-bold text-rose-400 uppercase tracking-widest mb-6">MOCK DATA INGESTION CYCLE</h3>
              
              <div className="flex flex-col gap-6 font-mono text-xs relative">
                <div className="flex items-center gap-4 bg-zinc-950/60 p-4 border border-zinc-800/60 rounded">
                  <span className="w-8 h-8 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-500 font-bold">1</span>
                  <div>
                    <strong className="block text-zinc-200">Simulated WebSocket Poller</strong>
                    <span className="text-[10px] text-zinc-500">Interval ticks every 2.5s applying token delta changes</span>
                  </div>
                </div>
                
                <div className="h-4 w-px bg-rose-500/30 ml-8" />
                
                <div className="flex items-center gap-4 bg-zinc-950/60 p-4 border border-zinc-800/60 rounded">
                  <span className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 font-bold">2</span>
                  <div>
                    <strong className="block text-zinc-200">Slippage & Routing Estimator</strong>
                    <span className="text-[10px] text-zinc-500">Formula maps input * price / target to output state</span>
                  </div>
                </div>
                
                <div className="h-4 w-px bg-rose-500/30 ml-8" />
                
                <div className="flex items-center gap-4 bg-zinc-950/60 p-4 border border-zinc-800/60 rounded">
                  <span className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 font-bold">3</span>
                  <div>
                    <strong className="block text-zinc-200">Dynamic SVG Path Generator</strong>
                    <span className="text-[10px] text-zinc-500">Converts height arrays to 500x150 polyline coordinates</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-zinc-800/60 flex items-center justify-between text-xs font-mono text-zinc-500">
              <span>Routing Path: Pathfinding Simulation</span>
              <span>Price Updates: React-bound triggers</span>
            </div>
          </div>
          
          {/* Engineering Code Card */}
          <div className="lg:col-span-5 p-8 bg-zinc-950 border border-zinc-800/80 rounded-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                  <Code size={14} className="text-rose-500" /> routing hook
                </h3>
                <span className="w-2 h-2 rounded-full bg-rose-500 shadow-md shadow-rose-950" />
              </div>
              
              <pre className="font-mono text-[11px] text-zinc-300 bg-zinc-900/30 p-4 rounded border border-zinc-900 overflow-x-auto leading-relaxed">
{`useEffect(() => {
  const amt = parseFloat(swapAmount) || 0;
  if (amt <= 0) return;
  const tokenPrices = {
    BTC: tokens.find(t => t.symbol === 'BTC')?.price,
    ETH: tokens.find(t => t.symbol === 'ETH')?.price,
    SOL: tokens.find(t => t.symbol === 'SOL')?.price
  };
  const fromPrice = tokenPrices[fromToken];
  const toPrice = tokenPrices[toToken];
  if (fromPrice && toPrice) {
    setSwapResult(((amt * fromPrice) / toPrice).toFixed(4));
    setGasFee((0.0012 * amt).toFixed(5));
  }
}, [swapAmount, fromToken, toToken, tokens]);`}
              </pre>
            </div>
            
            <p className="text-xs text-zinc-500 font-light mt-4">
              Connecting dependency hooks directly to ticker updates ensures swaps adjust coordinates and conversion states immediately.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Sandbox Workstation */}
      <section id="sandbox" className="py-24 max-w-6xl mx-auto px-6 border-b border-zinc-900">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <span className="font-mono text-xs text-rose-500 tracking-widest font-bold uppercase block mb-2">03 / SANDBOX DEMO</span>
            <h2 className="font-syne font-bold text-3xl text-white">Interactive Swap Aggregator</h2>
          </div>
          
          <div className="flex items-center gap-2 mt-4 md:mt-0 font-mono text-[10px] text-zinc-500 bg-zinc-900/20 px-3 py-1.5 border border-zinc-800/80 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
            <span>ROUTER STAGING ENGINE</span>
          </div>
        </div>

        {/* Dashboard Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left panel: Token List & Chart */}
          <div className="lg:col-span-7 p-6 bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl">
            <div className="flex justify-between items-center pb-4 mb-6 border-b border-zinc-800/80">
              <h4 className="font-mono text-xs font-bold text-zinc-300 tracking-wider">LIVE MEMPOOL RATES</h4>
              <span className="font-mono text-[10px] text-rose-500 flex items-center gap-1.5 font-bold">
                <RefreshCw size={10} className="animate-spin" /> TICKING REALTIME
              </span>
            </div>

            <div className="flex flex-col gap-2 font-mono">
              <div className="grid grid-cols-4 text-[9px] text-zinc-500 tracking-wider pb-2 border-b border-zinc-900">
                <span>ASSET</span>
                <span className="text-right">PRICE (USD)</span>
                <span className="text-right">24H CHANGE</span>
                <span className="text-center">ACTION</span>
              </div>

              {tokens.map((t) => (
                <div key={t.id} className="grid grid-cols-4 items-center text-xs py-3.5 border-b border-zinc-900/60">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bold text-rose-500 text-[10px]">
                      {t.symbol[0]}
                    </span>
                    <div>
                      <strong className="text-zinc-200 block leading-none">{t.name}</strong>
                      <span className="text-[9px] text-zinc-500">{t.symbol}</span>
                    </div>
                  </div>
                  <strong className="text-right text-zinc-300">$ {t.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong>
                  <span className={`text-right font-bold ${t.history === 'up' ? 'text-emerald-400' : 'text-rose-500'}`}>
                    {t.change >= 0 ? '+' : ''}{t.change}%
                  </span>
                  <button 
                    onClick={() => setActiveTokenChart(t.symbol)}
                    className={`text-[9px] font-bold px-2 py-1 rounded mx-auto transition-all cursor-pointer ${
                      activeTokenChart === t.symbol 
                        ? 'bg-rose-600 text-white shadow-md' 
                        : 'border border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    CHART
                  </button>
                </div>
              ))}
            </div>

            {/* SVG Interactive Chart */}
            <div className="mt-8 border-t border-zinc-900 pt-6">
              <div className="flex justify-between items-baseline mb-4 font-mono">
                <span className="text-[10px] text-zinc-500">METRIC: {activeTokenChart} / USD TRENDLINE</span>
                <span className="text-[9px] text-zinc-600">STAGING FEED</span>
              </div>
              <div className="bg-zinc-900/10 rounded border border-zinc-900 p-2 flex items-center justify-center">
                <svg viewBox="0 0 500 150" className="w-full h-24 overflow-visible">
                  <defs>
                    <linearGradient id="rose-gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#e11d48" stopOpacity="0.2"/>
                      <stop offset="100%" stopColor="#e11d48" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  <line x1="0" y1="30" x2="500" y2="30" stroke="#27272a" strokeWidth="0.5" strokeDasharray="3,3" />
                  <line x1="0" y1="75" x2="500" y2="75" stroke="#27272a" strokeWidth="0.5" strokeDasharray="3,3" />
                  <line x1="0" y1="120" x2="500" y2="120" stroke="#27272a" strokeWidth="0.5" strokeDasharray="3,3" />

                  <path
                    d={`M 10,140 L ${svgPathPoints} L 490,140 Z`}
                    fill="url(#rose-gradient)"
                  />
                  
                  <polyline
                    fill="none"
                    stroke="#e11d48"
                    strokeWidth="1.5"
                    points={svgPathPoints}
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Right panel: Swap Form */}
          <div className="lg:col-span-5 p-6 bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl flex flex-col justify-between min-h-[420px]">
            <h4 className="font-mono text-xs font-bold text-zinc-300 tracking-wider pb-4 border-b border-zinc-800/80 mb-6 uppercase">
              Swap Aggregator
            </h4>
            
            {swapStatus === 'success' ? (
              <div className="text-center py-10 flex flex-col items-center justify-center h-full">
                <div className="w-12 h-12 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 flex items-center justify-center mb-4">
                  <Check size={20} />
                </div>
                <h4 className="font-mono text-xs font-bold text-zinc-200 mb-1">TRANSACTION DISPATCHED</h4>
                <p className="font-mono text-[9px] text-zinc-500 mb-6">HASH: 0x9f4a12c8...8a25</p>
                <div className="border-t border-zinc-800 w-full pt-4 text-left font-mono">
                  <span className="text-[9px] text-zinc-500 block">ROUTED RECEIPT:</span>
                  <strong className="text-xs text-rose-500 block leading-normal mt-1 flex items-center gap-1.5">
                    {swapAmount} {fromToken} <ArrowRight size={12} /> {swapResult} {toToken}
                  </strong>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSwap} className="flex-1 flex flex-col justify-between font-mono">
                <div className="flex flex-col gap-4">
                  <div className="bg-zinc-900/30 border border-zinc-900 rounded p-4">
                    <label className="text-[9px] text-zinc-500 block mb-2 font-bold">DISPATCH FROM</label>
                    <div className="flex justify-between items-center gap-4">
                      <input 
                        type="number" 
                        value={swapAmount} 
                        onChange={e => setSwapAmount(e.target.value)}
                        placeholder="0.0"
                        className="bg-transparent border-none outline-none text-zinc-200 text-lg font-bold w-1/2"
                        disabled={swapStatus === 'swapping'}
                      />
                      <select 
                        value={fromToken} 
                        onChange={e => setFromToken(e.target.value)} 
                        className="bg-zinc-950 border border-zinc-800 text-zinc-300 text-xs py-1.5 px-3 rounded outline-none cursor-pointer"
                        disabled={swapStatus === 'swapping'}
                      >
                        <option>ETH</option>
                        <option>BTC</option>
                        <option>SOL</option>
                        <option>MATIC</option>
                        <option>DOT</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-center text-rose-500 py-1">
                    <ArrowRightLeft size={16} />
                  </div>

                  <div className="bg-zinc-900/30 border border-zinc-900 rounded p-4">
                    <label className="text-[9px] text-zinc-500 block mb-2 font-bold">TARGET DESTINATION</label>
                    <div className="flex justify-between items-center gap-4">
                      <input 
                        type="text" 
                        readOnly 
                        value={swapResult} 
                        className="bg-transparent border-none outline-none text-zinc-200 text-lg font-bold w-1/2"
                      />
                      <select 
                        value={toToken} 
                        onChange={e => setToToken(e.target.value)} 
                        className="bg-zinc-950 border border-zinc-800 text-zinc-300 text-xs py-1.5 px-3 rounded outline-none cursor-pointer"
                        disabled={swapStatus === 'swapping'}
                      >
                        <option>SOL</option>
                        <option>ETH</option>
                        <option>BTC</option>
                        <option>MATIC</option>
                        <option>DOT</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 py-4 border-t border-b border-zinc-900 text-[10px] text-zinc-400">
                    <div className="flex justify-between"><span>Aggregator Path</span><strong>{fromToken} ➔ USDC ➔ {toToken}</strong></div>
                    <div className="flex justify-between"><span>Simulated Gas Fee</span><span>{gasFee} ETH</span></div>
                    <div className="flex justify-between"><span>Slippage Limit</span><span>0.5% (Automated)</span></div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-rose-600 text-white font-mono text-xs font-bold py-4 rounded shadow-lg hover:bg-rose-500 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer mt-4" 
                  disabled={swapStatus === 'swapping'}
                >
                  {swapStatus === 'swapping' ? 'ROUTING METRIC...' : walletConnected ? 'DISPATCH SWAP' : 'CONNECT WALLET TO SWAP'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Ledger History Ledger */}
      <section className="max-w-5xl mx-auto px-6 mt-12">
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 shadow-2xl font-mono">
          <div className="flex items-center gap-2 pb-4 mb-6 border-b border-zinc-800/80">
            <History size={16} className="text-rose-500" />
            <h4 className="text-xs font-bold text-zinc-300 tracking-wider">SWAP HISTORY LEDGER</h4>
          </div>
          
          <div className="flex flex-col gap-2 overflow-x-auto">
            <div className="min-w-[500px]">
              <div className="grid grid-cols-5 text-[9px] text-zinc-500 tracking-wider pb-2 border-b border-zinc-900">
                <span>TIMESTAMP</span>
                <span>TOKEN PAIR</span>
                <span>PAID</span>
                <span>RECEIVED</span>
                <span>TRANSACTION HASH</span>
              </div>
              {transactions.map((tx) => (
                <div key={tx.id} className="grid grid-cols-5 items-center text-xs py-3.5 border-b border-zinc-900/60">
                  <span className="text-zinc-500">{tx.time}</span>
                  <strong className="text-zinc-200">{tx.pair}</strong>
                  <span>{tx.amount}</span>
                  <span>{tx.received}</span>
                  <span className="text-rose-500">{tx.txHash}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Security alert block */}
      <section className="max-w-5xl mx-auto px-6 mt-8">
        <div className="bg-zinc-900/20 border border-zinc-800/80 rounded-xl p-6 flex gap-4 items-center">
          <div className="w-10 h-10 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center flex-shrink-0">
            <Shield size={18} className="text-rose-500" />
          </div>
          <div>
            <h5 className="font-mono text-xs font-bold text-zinc-300 mb-1.5 flex items-center gap-2">
              <Info size={12} className="text-rose-500" /> TRANSACTION SECURITY REPORT
            </h5>
            <p className="text-[10px] text-zinc-500 leading-relaxed font-light">
              Mempool monitoring ensures trades avoid MEV bot front-running. The gas fee calculations simulate real-time mainnet prices via simple linear multipliers.
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
            <h3 className="font-syne font-semibold text-lg text-white mb-2">Pricing Loop & Core Swapper Form</h3>
            <p className="text-sm text-zinc-400 font-light leading-relaxed">
              Designed ticker loops, reactive swap computations, local ledgers, wallet connection states, and static trendline coordinate charts.
            </p>
          </div>

          {/* Milestone 2: Progress */}
          <div className="mb-12 pl-6 relative">
            <span className="absolute -left-3.5 top-0 w-7 h-7 rounded-full bg-zinc-900 border border-rose-500 flex items-center justify-center font-mono text-[9px] text-rose-500 font-bold animate-pulse">
              ●
            </span>
            <span className="font-mono text-[9px] text-rose-400 uppercase tracking-widest block mb-1">MODULE 02 — IN PROGRESS</span>
            <h3 className="font-syne font-semibold text-lg text-white mb-2">MetaMask / Ethers Provider Connection</h3>
            <p className="text-sm text-zinc-400 font-light leading-relaxed">
              Integrating RPC providers and connection drivers to allow querying real Ethereum network balances using window.ethereum.
            </p>
          </div>

          {/* Milestone 3: Future */}
          <div className="pl-6 relative">
            <span className="absolute -left-3.5 top-0 w-7 h-7 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center font-mono text-[9px] text-zinc-600 font-bold">
              ○
            </span>
            <span className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest block mb-1">MODULE 03 — PLANNED</span>
            <h3 className="font-syne font-semibold text-lg text-zinc-500 mb-2">Uniswap Smart Order Router SDK</h3>
            <p className="text-sm text-zinc-500 font-light leading-relaxed">
              Build cross-pool multi-hop pathfinding strategies to discover the absolute lowest swap fee routes for ERC-20 assets.
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
              {['React.js', 'Tailwind CSS', 'SVG Coordinate Mapping', 'Mempool Ticker', 'Wallet Ingestion Simulation', 'Gas Calculation Formula'].map((tech) => (
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
                <span>Connecting background intervals directly to state hooks without race conditions requires clearing timers on unmount.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rose-500 mt-1">▪</span>
                <span>Calculating conversion values inside dependency hooks instead of trigger handlers keeps the system interface synchronized.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rose-500 mt-1">▪</span>
                <span>Constructing dynamic SVG paths programmatically based on live state offers lightweight graphic generation with zero package overhead.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
