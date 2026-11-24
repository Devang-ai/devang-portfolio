import React, { useState } from 'react';
import { ShoppingBag, X, Plus, Minus, Trash2, CheckCircle, Code, Shield, Cpu, Info, Zap } from 'lucide-react';
import fashionHero from '../assets/noir_fashion_mockup.png';
import dressImg from '../assets/linen_dress.png';
import blazerImg from '../assets/slim_blazer.png';
import bagImg from '../assets/tote_bag.png';
import shirtImg from '../assets/button_shirt.png';

export default function Fashion() {
  const [filter, setFilter] = useState('All');
  const [selectedSizes, setSelectedSizes] = useState({}); // productId: size
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Checkout flow states: cart, shipping, payment, success
  const [checkoutStep, setCheckoutStep] = useState('cart');
  const [shipping, setShipping] = useState({ name: '', address: '', phone: '' });
  const [payment, setPayment] = useState({ card: '', expiry: '', cvv: '' });
  
  // Promo code states
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // e.g. 0.20 for 20%
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  const products = [
    { id: 1, name: "Linen Wrap Dress", cat: "Women", price: 3490, originalPrice: null, tag: "New", color: "Beige", image: dressImg },
    { id: 2, name: "Slim Fit Blazer", cat: "Men", price: 4200, originalPrice: 6999, tag: "Sale", color: "Charcoal", image: blazerImg },
    { id: 3, name: "Structured Tote Bag", cat: "Accessories", price: 5800, originalPrice: null, tag: "New", color: "Tan", image: bagImg },
    { id: 4, name: "Oxford Button Shirt", cat: "Men", price: 1990, originalPrice: null, tag: null, color: "Navy Blue", image: shirtImg }
  ];

  const filteredProducts = filter === 'All'
    ? products
    : filter === 'Sale'
      ? products.filter(p => p.tag === 'Sale')
      : products.filter(p => p.cat === filter);

  const handleSizeSelect = (productId, size) => {
    setSelectedSizes({ ...selectedSizes, [productId]: size });
  };

  const addToCart = (product) => {
    const size = selectedSizes[product.id] || 'M';
    
    const existingIndex = cart.findIndex(item => item.id === product.id && item.size === size);
    if (existingIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[existingIndex].qty += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, size, qty: 1 }]);
    }
    setCheckoutStep('cart'); // reset checkout flow on item add
    setIsCartOpen(true);
  };

  const updateQty = (idx, amount) => {
    const updatedCart = [...cart];
    updatedCart[idx].qty += amount;
    if (updatedCart[idx].qty <= 0) {
      updatedCart.splice(idx, 1);
    }
    setCart(updatedCart);
  };

  const removeFromCart = (idx) => {
    const updatedCart = [...cart];
    updatedCart.splice(idx, 1);
    setCart(updatedCart);
  };

  const applyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'DISCOUNT20') {
      setAppliedDiscount(0.20);
      setPromoSuccess('DISCOUNT20 applied! 20% discount activated.');
      setPromoError('');
    } else {
      setPromoError('Invalid code. Use DISCOUNT20.');
      setPromoSuccess('');
    }
  };

  const getSubtotal = () => {
    return cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  };

  const getDiscountAmount = () => {
    return getSubtotal() * appliedDiscount;
  };

  const getTotal = () => {
    const subtotal = getSubtotal();
    const discount = getDiscountAmount();
    const shippingCost = subtotal > 2000 ? 0 : 150;
    return subtotal - discount + shippingCost;
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (checkoutStep === 'cart') {
      setCheckoutStep('shipping');
    } else if (checkoutStep === 'shipping') {
      if (!shipping.name || !shipping.address || !shipping.phone) return;
      setCheckoutStep('payment');
    } else if (checkoutStep === 'payment') {
      if (!payment.card || !payment.expiry || !payment.cvv) return;
      setCheckoutStep('success');
      setTimeout(() => {
        // Complete checkout reset
        setCart([]);
        setAppliedDiscount(0);
        setPromoCode('');
        setPromoSuccess('');
        setShipping({ name: '', address: '', phone: '' });
        setPayment({ card: '', expiry: '', cvv: '' });
        setCheckoutStep('cart');
        setIsCartOpen(false);
      }, 4000);
    }
  };

  return (
    <div className="bg-[#080809] text-zinc-100 min-h-screen pb-32 selection:bg-rose-500 selection:text-white">
      {/* Floating Cart Trigger */}
      <button 
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-rose-600 hover:bg-rose-500 text-white border-none cursor-pointer flex items-center justify-center shadow-xl z-40 transition-all duration-300"
        aria-label="View shopping bag"
      >
        <ShoppingBag size={18} />
        {cart.length > 0 && (
          <span className="absolute -top-1.5 -right-1.5 bg-white text-rose-600 text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center font-mono">
            {cart.reduce((a, b) => a + b.qty, 0)}
          </span>
        )}
      </button>

      {/* Immersive Case Study Hero Header */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden border-b border-zinc-900 grid-bg">
        <div className="absolute inset-0 bg-gradient-to-b from-rose-950/5 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[10px] uppercase font-mono tracking-widest font-bold">
                Concept Storefront
              </span>
              <span className="px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700 text-zinc-400 text-[10px] uppercase font-mono tracking-widest">
                Design Stage System
              </span>
            </div>
            
            <h1 className="font-syne font-extrabold text-5xl md:text-7xl leading-tight tracking-tight text-white mb-6">
              Milcano <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-rose-300">Catalog</span>
            </h1>
            
            <p className="text-base text-zinc-400 leading-relaxed max-w-xl mb-8 font-light">
              A premium, minimalist storefront catalogue concept built to explore checkout pipeline state transitions, custom voucher validation, and responsive cart drawers.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a href="#sandbox" className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold tracking-wider rounded transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-rose-950/40">
                BROWSE PRODUCTS
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
                <img src={fashionHero} alt="Milcano Collection Mockup" className="w-full h-64 object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700" />
                <div className="border-t border-zinc-800/80 p-5 bg-zinc-950/60 flex justify-around text-center text-xs font-mono">
                  <div>
                    <span className="block text-[9px] text-zinc-500 uppercase tracking-wider font-bold">Category</span>
                    <strong className="block text-xl text-rose-500 mt-1">Minimal</strong>
                  </div>
                  <div className="w-px bg-zinc-800" />
                  <div>
                    <span className="block text-[9px] text-zinc-500 uppercase tracking-wider font-bold">Checkout Nodes</span>
                    <strong className="block text-xl text-zinc-200 mt-1">4 Stages</strong>
                  </div>
                  <div className="w-px bg-zinc-800" />
                  <div>
                    <span className="block text-[9px] text-zinc-500 uppercase tracking-wider font-bold">Voucher Scale</span>
                    <strong className="block text-xl text-emerald-400 mt-1">Active</strong>
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
                Complex e-commerce checkout flows are prone to step failure, data drops, and conversion friction. Building isolated local states that cleanly shift users from cart review to payment confirmation is critical.
              </p>
            </div>
            
            <div className="p-6 bg-zinc-900/30 border border-zinc-800/80 rounded-lg">
              <h3 className="font-mono text-xs font-bold text-rose-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Cpu size={14} /> My Design Approach
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-light">
                Developed a clean step-driven React checkout wizard (`cart ➔ shipping ➔ payment ➔ success`). Integrated strict verification checks for vouchers and required input forms before routing users to successive views.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* System Logic Section */}
      <section id="logic" className="py-24 max-w-6xl mx-auto px-6 border-b border-zinc-900">
        <span className="font-mono text-xs text-rose-500 tracking-widest font-bold uppercase block mb-2 text-center">02 / ARCHITECTURE</span>
        <h2 className="font-syne font-bold text-3xl text-white text-center mb-16">System Logic & E-Commerce Flow</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Visual Data Flow Diagram */}
          <div className="lg:col-span-7 flex flex-col justify-between p-8 bg-zinc-900/20 border border-zinc-800/80 rounded-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full filter blur-3xl pointer-events-none" />
            <div>
              <h3 className="font-mono text-xs font-bold text-rose-400 uppercase tracking-widest mb-6">CHECKOUT STATE ROUTER</h3>
              
              <div className="flex flex-col gap-6 font-mono text-xs relative">
                <div className="flex items-center gap-4 bg-zinc-950/60 p-4 border border-zinc-800/60 rounded">
                  <span className="w-8 h-8 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-500 font-bold">1</span>
                  <div>
                    <strong className="block text-zinc-200">Cart Review & Discount Node</strong>
                    <span className="text-[10px] text-zinc-500">Calculates subtotal, applying 20% discount on coupon code validation</span>
                  </div>
                </div>
                
                <div className="h-4 w-px bg-rose-500/30 ml-8" />
                
                <div className="flex items-center gap-4 bg-zinc-950/60 p-4 border border-zinc-800/60 rounded">
                  <span className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 font-bold">2</span>
                  <div>
                    <strong className="block text-zinc-200">Shipping Form Verification</strong>
                    <span className="text-[10px] text-zinc-500">Form fields check validation metrics before proceeding to checkout</span>
                  </div>
                </div>
                
                <div className="h-4 w-px bg-rose-500/30 ml-8" />
                
                <div className="flex items-center gap-4 bg-zinc-950/60 p-4 border border-zinc-800/60 rounded">
                  <span className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 font-bold">3</span>
                  <div>
                    <strong className="block text-zinc-200">Simulated Payment Token Dispatch</strong>
                    <span className="text-[10px] text-zinc-500">Concludes checkout and resets states after success interval</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-zinc-800/60 flex items-center justify-between text-xs font-mono text-zinc-500">
              <span>Checkout State: Step Router</span>
              <span>Coupon Trigger: In-line checker</span>
            </div>
          </div>
          
          {/* Engineering Code Card */}
          <div className="lg:col-span-5 p-8 bg-zinc-950 border border-zinc-800/80 rounded-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                  <Code size={14} className="text-rose-500" /> cart reducer
                </h3>
                <span className="w-2 h-2 rounded-full bg-rose-500 shadow-md shadow-rose-950" />
              </div>
              
              <pre className="font-mono text-[11px] text-zinc-300 bg-zinc-900/30 p-4 rounded border border-zinc-900 overflow-x-auto leading-relaxed">
{`const addToCart = (product) => {
  const size = selectedSizes[product.id] || 'M';
  const existingIdx = cart.findIndex(
    item => item.id === product.id && item.size === size
  );
  if (existingIdx > -1) {
    const updatedCart = [...cart];
    updatedCart[existingIdx].qty += 1;
    setCart(updatedCart);
  } else {
    setCart([...cart, { ...product, size, qty: 1 }]);
  }
};`}
              </pre>
            </div>
            
            <p className="text-xs text-zinc-500 font-light mt-4">
              Finding existing index items prevents duplicate product entries inside the cart array stack.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Sandbox Workstation */}
      <section id="sandbox" className="py-24 max-w-6xl mx-auto px-6 border-b border-zinc-900">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <span className="font-mono text-xs text-rose-500 tracking-widest font-bold uppercase block mb-2">03 / SANDBOX DEMO</span>
            <h2 className="font-syne font-bold text-3xl text-white">Interactive Storefront Console</h2>
          </div>
          
          <div className="flex items-center gap-2 mt-4 md:mt-0 font-mono text-[10px] text-zinc-500 bg-zinc-900/20 px-3 py-1.5 border border-zinc-800/80 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
            <span>CATALOG WORKSTATION LOADED</span>
          </div>
        </div>

        {/* Minimal Store Frame */}
        <div className="border border-zinc-800 bg-zinc-950 rounded-xl overflow-hidden shadow-2xl p-6 md:p-8 text-left">
          
          {/* Internal Header */}
          <div className="flex justify-between items-center pb-6 mb-8 border-b border-zinc-900">
            <div className="font-syne text-xl font-extrabold text-white tracking-widest">MILCANO</div>
            
            <div className="flex gap-4 font-mono text-[10px]">
              {['All', 'Women', 'Men', 'Sale'].map(cat => (
                <button 
                  key={cat} 
                  className={`pb-1 border-b cursor-pointer transition-colors ${filter === cat ? 'border-rose-500 text-rose-500 font-bold' : 'border-transparent text-zinc-500 hover:text-zinc-300'}`}
                  onClick={() => setFilter(cat)}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>

            <button onClick={() => setIsCartOpen(true)} className="relative text-zinc-400 hover:text-white transition-colors cursor-pointer font-mono text-[10px] flex items-center gap-1.5">
              <span>BAG ({cart.reduce((a, b) => a + b.qty, 0)})</span>
            </button>
          </div>

          {/* Catalog grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map(prod => (
              <div key={prod.id} className="flex flex-col justify-between border border-zinc-900 bg-zinc-900/10 p-4 rounded-lg hover:border-zinc-800 transition-all duration-300">
                <div className="h-64 bg-zinc-950 rounded overflow-hidden relative flex items-center justify-center mb-4">
                  <img src={prod.image} alt={prod.name} className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500" />
                  {prod.tag && (
                    <span className="absolute top-3 left-3 text-[8px] font-mono font-bold tracking-widest px-2.5 py-1 text-white bg-rose-600 rounded">
                      {prod.tag.toUpperCase()}
                    </span>
                  )}
                </div>
                
                <div>
                  <span className="font-mono text-[8px] text-zinc-500 block mb-1">{prod.cat.toUpperCase()}</span>
                  <h3 className="font-syne text-sm font-bold text-zinc-200 mb-2">{prod.name}</h3>
                  
                  <div className="flex items-baseline gap-2 mb-4 font-mono">
                    <strong className="text-sm text-zinc-300">₹ {prod.price.toLocaleString('en-IN')}</strong>
                    {prod.originalPrice && (
                      <span className="line-through text-xs text-zinc-600">₹ {prod.originalPrice.toLocaleString('en-IN')}</span>
                    )}
                  </div>

                  {/* Sizing dots */}
                  <div className="flex gap-1.5 mb-4">
                    {['S', 'M', 'L', 'XL'].map(sz => (
                      <button 
                        key={sz} 
                        onClick={() => handleSizeSelect(prod.id, sz)}
                        className={`w-7 h-7 border text-[9px] font-mono font-bold flex items-center justify-center transition-all cursor-pointer ${
                          (selectedSizes[prod.id] || 'M') === sz 
                            ? 'border-rose-500 bg-rose-500/10 text-rose-500' 
                            : 'border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>

                  <button 
                    onClick={() => addToCart(prod)}
                    className="w-full border border-rose-500/30 bg-rose-500/5 hover:bg-rose-600 hover:text-white text-rose-500 text-[9px] font-mono font-bold tracking-widest py-3 transition-all cursor-pointer rounded"
                  >
                    ADD TO BAG
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cart drawer overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-[#080809]/80 backdrop-blur-sm z-50 flex justify-end" onClick={() => setIsCartOpen(false)}>
          <div className="w-[420px] max-w-full h-full bg-zinc-950 border-l border-zinc-800 flex flex-col justify-between shadow-2xl" onClick={e => e.stopPropagation()}>
            
            {/* Drawer Header */}
            <div className="p-6 border-b border-zinc-900 flex justify-between items-center bg-zinc-950">
              <h3 className="font-syne text-xs font-bold tracking-widest text-zinc-300 uppercase">
                {checkoutStep === 'cart' && `YOUR BAG (${cart.reduce((a, b) => a + b.qty, 0)})`}
                {checkoutStep === 'shipping' && 'SHIPPING DETAILS'}
                {checkoutStep === 'payment' && 'CARD PROCESSING'}
                {checkoutStep === 'success' && 'ORDER CONFIRMED'}
              </h3>
              <button onClick={() => setIsCartOpen(false)} className="text-zinc-500 hover:text-white">
                <X size={18} />
              </button>
            </div>

            {/* Steps views */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 text-left">
              {checkoutStep === 'success' && (
                <div className="text-center py-12 flex flex-col items-center justify-center h-full">
                  <CheckCircle size={44} className="text-emerald-500 mb-4" />
                  <h4 className="font-syne text-base font-bold text-zinc-200 mb-2">ORDER CONCLUDED</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed max-w-[280px]">
                    Checkout flow successfully validated. Cart variables and address tokens have been reset.
                  </p>
                </div>
              )}

              {checkoutStep === 'cart' && (
                cart.length === 0 ? (
                  <div className="text-center py-16 text-zinc-600 font-mono text-xs">Your bag is empty.</div>
                ) : (
                  <>
                    <div className="flex flex-col gap-4">
                      {cart.map((item, idx) => (
                        <div key={idx} className="flex gap-4 border-b border-zinc-900 pb-4 relative">
                          <div className="w-14 h-16 bg-zinc-900 border border-zinc-800 rounded overflow-hidden flex items-center justify-center">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 text-left font-mono">
                            <h4 className="font-syne text-xs font-bold text-zinc-200 leading-tight">{item.name}</h4>
                            <span className="text-[8px] text-zinc-500 block mb-2">SIZE: {item.size}</span>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center border border-zinc-800 bg-zinc-900 rounded">
                                <button onClick={() => updateQty(idx, -1)} className="px-2 py-1 text-zinc-500 hover:text-white"><Minus size={8} /></button>
                                <span className="text-xs font-bold px-1.5 text-zinc-300">{item.qty}</span>
                                <button onClick={() => updateQty(idx, 1)} className="px-2 py-1 text-zinc-500 hover:text-white"><Plus size={8} /></button>
                              </div>
                              <strong className="text-xs text-zinc-300">₹ {(item.price * item.qty).toLocaleString('en-IN')}</strong>
                            </div>
                          </div>
                          <button onClick={() => removeFromCart(idx)} className="absolute top-0 right-0 text-zinc-600 hover:text-rose-500 transition-colors">
                            <Trash2 size={13} />
                          </button>
                        </div>
                      ))}
                    </div>

                    <form onSubmit={applyPromo} className="border-t border-zinc-900 pt-4 mt-2 font-mono">
                      <label className="text-[9px] text-zinc-500 block mb-2 font-bold">COUPON VOUCHER?</label>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          placeholder="e.g. DISCOUNT20" 
                          value={promoCode}
                          onChange={e => setPromoCode(e.target.value)}
                          className="flex-1 bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-zinc-200 outline-none focus:border-rose-500 uppercase rounded"
                        />
                        <button type="submit" className="bg-rose-600 hover:bg-rose-500 text-white text-[10px] font-bold px-4 rounded transition-all cursor-pointer">APPLY</button>
                      </div>
                      {promoError && <p className="text-[9px] text-rose-500 mt-2">{promoError}</p>}
                      {promoSuccess && <p className="text-[9px] text-emerald-500 mt-2">{promoSuccess}</p>}
                    </form>
                  </>
                )
              )}

              {checkoutStep === 'shipping' && (
                <form onSubmit={handleNextStep} className="flex flex-col gap-4 font-mono text-left">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] text-zinc-500">RECIPIENT FULL NAME</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Priyal Shah"
                      value={shipping.name}
                      onChange={e => setShipping({ ...shipping, name: e.target.value })}
                      className="bg-zinc-900 border border-zinc-800 rounded px-3.5 py-2.5 text-xs text-zinc-200 outline-none focus:border-rose-500"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] text-zinc-500">DELIVERY ADDRESS</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. 104, Bopal Road, Ahmedabad"
                      value={shipping.address}
                      onChange={e => setShipping({ ...shipping, address: e.target.value })}
                      className="bg-zinc-900 border border-zinc-800 rounded px-3.5 py-2.5 text-xs text-zinc-200 outline-none focus:border-rose-500"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] text-zinc-500">MOBILE CONTACT</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="WhatsApp Number"
                      value={shipping.phone}
                      onChange={e => setShipping({ ...shipping, phone: e.target.value })}
                      className="bg-zinc-900 border border-zinc-800 rounded px-3.5 py-2.5 text-xs text-zinc-200 outline-none focus:border-rose-500"
                    />
                  </div>
                  <button type="submit" className="hidden" id="ship-submit"></button>
                </form>
              )}

              {checkoutStep === 'payment' && (
                <form onSubmit={handleNextStep} className="flex flex-col gap-4 font-mono text-left">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] text-zinc-500">CARD NUMBER</label>
                    <input 
                      type="text" 
                      required
                      placeholder="4111 2222 3333 4444"
                      maxLength="19"
                      value={payment.card}
                      onChange={e => setPayment({ ...payment, card: e.target.value })}
                      className="bg-zinc-900 border border-zinc-800 rounded px-3.5 py-2.5 text-xs text-zinc-200 outline-none focus:border-rose-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] text-zinc-500">EXPIRY DATE</label>
                      <input 
                        type="text" 
                        required
                        placeholder="MM/YY"
                        maxLength="5"
                        value={payment.expiry}
                        onChange={e => setPayment({ ...payment, expiry: e.target.value })}
                        className="bg-zinc-900 border border-zinc-800 rounded px-3.5 py-2.5 text-xs text-zinc-200 outline-none focus:border-rose-500"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] text-zinc-500">CVV</label>
                      <input 
                        type="password" 
                        required
                        placeholder="***"
                        maxLength="3"
                        value={payment.cvv}
                        onChange={e => setPayment({ ...payment, cvv: e.target.value })}
                        className="bg-zinc-900 border border-zinc-800 rounded px-3.5 py-2.5 text-xs text-zinc-200 outline-none focus:border-rose-500"
                      />
                    </div>
                  </div>
                  <button type="submit" className="hidden" id="pay-submit"></button>
                </form>
              )}
            </div>

            {/* Drawer Footer Calculations */}
            {cart.length > 0 && checkoutStep !== 'success' && (
              <div className="p-6 bg-zinc-950 border-t border-zinc-900 font-mono">
                <div className="flex flex-col gap-2.5 mb-6 text-xs text-zinc-400">
                  <div className="flex justify-between">
                    <span className="text-[9px]">BAG SUBTOTAL</span>
                    <span>₹ {getSubtotal().toLocaleString('en-IN')}</span>
                  </div>
                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-rose-500">
                      <span className="text-[9px]">COUPON (20% OFF)</span>
                      <span>− ₹ {getDiscountAmount().toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-[9px]">SHIPPING</span>
                    <span>{getSubtotal() > 2000 ? 'FREE' : '₹ 150'}</span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold border-t border-zinc-900 pt-2.5 mt-1 text-white">
                    <span className="text-[10px]">TOTAL VALUE</span>
                    <strong>₹ {getTotal().toLocaleString('en-IN')}</strong>
                  </div>
                </div>

                {checkoutStep === 'cart' && (
                  <button 
                    onClick={() => setCheckoutStep('shipping')}
                    className="w-full bg-rose-600 hover:bg-rose-500 text-white font-mono text-[10px] font-bold py-4 rounded tracking-widest cursor-pointer transition-all duration-300"
                  >
                    PROCEED TO SHIPPING
                  </button>
                )}

                {checkoutStep === 'shipping' && (
                  <button 
                    onClick={() => document.getElementById('ship-submit').click()}
                    className="w-full bg-rose-600 hover:bg-rose-500 text-white font-mono text-[10px] font-bold py-4 rounded tracking-widest cursor-pointer transition-all duration-300"
                  >
                    PROCEED TO PAYMENT
                  </button>
                )}

                {checkoutStep === 'payment' && (
                  <button 
                    onClick={() => document.getElementById('pay-submit').click()}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-[10px] font-bold py-4 rounded tracking-widest cursor-pointer transition-all duration-300"
                  >
                    CONFIRM CHECKOUT
                  </button>
                )}
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
            <h3 className="font-syne font-semibold text-lg text-white mb-2">Checkout Pipeline Wizard & Cart System</h3>
            <p className="text-sm text-zinc-400 font-light leading-relaxed">
              Implemented size selections, reactive cart item increments, promo validations, step transitions, and responsive side drawers.
            </p>
          </div>

          {/* Milestone 2: Progress */}
          <div className="mb-12 pl-6 relative">
            <span className="absolute -left-3.5 top-0 w-7 h-7 rounded-full bg-zinc-900 border border-rose-500 flex items-center justify-center font-mono text-[9px] text-rose-500 font-bold animate-pulse">
              ●
            </span>
            <span className="font-mono text-[9px] text-rose-400 uppercase tracking-widest block mb-1">MODULE 02 — IN PROGRESS</span>
            <h3 className="font-syne font-semibold text-lg text-white mb-2">Stripe Checkout SDK Pipeline</h3>
            <p className="text-sm text-zinc-400 font-light leading-relaxed">
              Integrating Stripe SDK token dispatchers to safely communicate card values directly with mock payment gateways.
            </p>
          </div>

          {/* Milestone 3: Future */}
          <div className="pl-6 relative">
            <span className="absolute -left-3.5 top-0 w-7 h-7 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center font-mono text-[9px] text-zinc-600 font-bold">
              ○
            </span>
            <span className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest block mb-1">MODULE 03 — PLANNED</span>
            <h3 className="font-syne font-semibold text-lg text-zinc-500 mb-2">GraphQL Apollo Ingestion Network</h3>
            <p className="text-sm text-zinc-500 font-light leading-relaxed">
              Design a GraphQL schema mapping product stock levels to client queries, allowing fast updates on inventory changes.
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
              {['React.js', 'Tailwind CSS', 'E-Commerce State Schema', 'Voucher Validator Node', 'Step Router Wizard'].map((tech) => (
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
                <span>Deploying nested state routers prevents view pollution, helping isolate checkout logic from regular product grids.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rose-500 mt-1">▪</span>
                <span>Using pure-function arrays (like map and filter) to edit quantity indexes maintains state immutability.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rose-500 mt-1">▪</span>
                <span>Optimized design layouts using responsive grid tokens to ensure a premium shopping experience across dynamic screen dimensions.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
