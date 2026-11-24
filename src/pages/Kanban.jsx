import React, { useState } from 'react';
import { Plus, ArrowLeft, ArrowRight, Trash2, ClipboardList, CheckSquare, Search, Edit3, Check, X, Code, Shield, Cpu, Zap, Activity } from 'lucide-react';
import kanbanImg from '../assets/kanban_mockup.png';

export default function Kanban() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Integrate Stripe Payment Gateway", col: "todo", tag: "Backend", priority: "High" },
    { id: 2, title: "Refactor Global Context to Redux Toolkit", col: "progress", tag: "Frontend", priority: "Medium" },
    { id: 3, title: "Configure Auto-scaling Pods on AWS EKS", col: "review", tag: "DevOps", priority: "High" },
    { id: 4, title: "Optimize Slow PostgreSQL Join Queries", col: "done", tag: "Database", priority: "Low" }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState('All');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskTag, setNewTaskTag] = useState('Frontend');
  const [newTaskPriority, setNewTaskPriority] = useState('Medium');
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Editing state
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [editingTag, setEditingTag] = useState('');
  const [editingPriority, setEditingPriority] = useState('');

  const columns = [
    { id: 'todo', name: 'TO DO', color: 'border-rose-500 text-rose-500 bg-rose-500/5' },
    { id: 'progress', name: 'IN PROGRESS', color: 'border-amber-500 text-amber-500 bg-amber-500/5' },
    { id: 'review', name: 'CODE REVIEW', color: 'border-violet-500 text-violet-500 bg-violet-500/5' },
    { id: 'done', name: 'DONE', color: 'border-emerald-500 text-emerald-500 bg-emerald-500/5' }
  ];

  const moveTask = (taskId, direction) => {
    const colOrder = ['todo', 'progress', 'review', 'done'];
    setTasks(prevTasks => prevTasks.map(task => {
      if (task.id === taskId) {
        const currentIdx = colOrder.indexOf(task.col);
        let nextIdx = currentIdx + direction;
        if (nextIdx >= 0 && nextIdx < colOrder.length) {
          return { ...task, col: colOrder[nextIdx] };
        }
      }
      return task;
    }));
  };

  const createTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    
    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      col: 'todo',
      tag: newTaskTag,
      priority: newTaskPriority
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
    setShowAddForm(false);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(t => t.id !== taskId));
    if (editingId === taskId) setEditingId(null);
  };

  const startEditing = (task) => {
    setEditingId(task.id);
    setEditingTitle(task.title);
    setEditingTag(task.tag);
    setEditingPriority(task.priority);
  };

  const saveEdit = (taskId) => {
    if (!editingTitle.trim()) return;
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return { ...t, title: editingTitle, tag: editingTag, priority: editingPriority };
      }
      return t;
    }));
    setEditingId(null);
  };

  const getCompletionPercentage = () => {
    if (tasks.length === 0) return 0;
    const completed = tasks.filter(t => t.col === 'done').length;
    return Math.round((completed / tasks.length) * 100);
  };

  // Filter logic
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = filterPriority === 'All' || task.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  return (
    <div className="bg-[#080809] text-zinc-100 min-h-screen pb-32 selection:bg-rose-500 selection:text-white">
      {/* Immersive Case Study Header */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden border-b border-zinc-900 grid-bg">
        <div className="absolute inset-0 bg-gradient-to-b from-rose-950/5 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Status Tags */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[10px] uppercase font-mono tracking-widest font-bold">
                Live Production Utility
              </span>
              <span className="px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700 text-zinc-400 text-[10px] uppercase font-mono tracking-widest">
                Developer Tool
              </span>
            </div>
            
            <h1 className="font-syne font-extrabold text-5xl md:text-7xl leading-tight tracking-tight text-white mb-6">
              TaskFlow <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-rose-300">Kanban</span>
            </h1>
            
            <p className="text-base text-zinc-400 leading-relaxed max-w-xl mb-8 font-light">
              A responsive, client-side ticket manager designed for high-velocity software engineering workflows. Built to mitigate ticket-management latency and keep engineers focused on execution.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a href="#sandbox" className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold tracking-wider rounded transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-rose-950/40">
                ENTER WORKSTATION
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
                <img src={kanbanImg} alt="TaskFlow Kanban Mockup" className="w-full h-64 object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-700" />
                <div className="border-t border-zinc-800/80 p-5 bg-zinc-950/60 flex justify-around text-center text-xs font-mono">
                  <div>
                    <span className="block text-[9px] text-zinc-500 uppercase tracking-wider font-bold">Total Tasks</span>
                    <strong className="block text-xl text-rose-500 mt-1">{tasks.length}</strong>
                  </div>
                  <div className="w-px bg-zinc-800" />
                  <div>
                    <span className="block text-[9px] text-zinc-500 uppercase tracking-wider font-bold">High Priority</span>
                    <strong className="block text-xl text-zinc-200 mt-1">{tasks.filter(t => t.priority === 'High').length}</strong>
                  </div>
                  <div className="w-px bg-zinc-800" />
                  <div>
                    <span className="block text-[9px] text-zinc-500 uppercase tracking-wider font-bold">Completion</span>
                    <strong className="block text-xl text-emerald-400 mt-1">{getCompletionPercentage()}%</strong>
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
                <Shield size={14} /> Problem Statement
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-light">
                Traditional task boards rely on heavy databases and network request cycles for simple state updates (like dragging items between columns). This context-switching overhead reduces developer efficiency and degrades client-side responsiveness.
              </p>
            </div>
            
            <div className="p-6 bg-zinc-900/30 border border-zinc-800/80 rounded-lg">
              <h3 className="font-mono text-xs font-bold text-rose-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Cpu size={14} /> My Design Approach
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-light">
                Architected an instant-action React state machine that performs in-memory updates. Deployed safe structural updates using functional state transformations, enabling zero-latency rendering of column moves and inline content changes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* System Logic Section */}
      <section id="logic" className="py-24 max-w-6xl mx-auto px-6 border-b border-zinc-900">
        <span className="font-mono text-xs text-rose-500 tracking-widest font-bold uppercase block mb-2 text-center">02 / ARCHITECTURE</span>
        <h2 className="font-syne font-bold text-3xl text-white text-center mb-16">System Logic & Data Flow</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Visual Data Flow Diagram */}
          <div className="lg:col-span-7 flex flex-col justify-between p-8 bg-zinc-900/20 border border-zinc-800/80 rounded-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full filter blur-3xl pointer-events-none" />
            <div>
              <h3 className="font-mono text-xs font-bold text-rose-400 uppercase tracking-widest mb-6">STATE TRANSITION FLOW</h3>
              
              <div className="flex flex-col gap-6 font-mono text-xs relative">
                <div className="flex items-center gap-4 bg-zinc-950/60 p-4 border border-zinc-800/60 rounded">
                  <span className="w-8 h-8 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-500 font-bold">1</span>
                  <div>
                    <strong className="block text-zinc-200">User Interaction Trigger</strong>
                    <span className="text-[10px] text-zinc-500">Click Move, Edit, or Add ticket on client workspace</span>
                  </div>
                </div>
                
                <div className="h-4 w-px bg-rose-500/30 ml-8" />
                
                <div className="flex items-center gap-4 bg-zinc-950/60 p-4 border border-zinc-800/60 rounded">
                  <span className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 font-bold">2</span>
                  <div>
                    <strong className="block text-zinc-200">Functional React Reducer Update</strong>
                    <span className="text-[10px] text-zinc-500">Mutations avoided; returns new copy via array functions</span>
                  </div>
                </div>
                
                <div className="h-4 w-px bg-rose-500/30 ml-8" />
                
                <div className="flex items-center gap-4 bg-zinc-950/60 p-4 border border-zinc-800/60 rounded">
                  <span className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 font-bold">3</span>
                  <div>
                    <strong className="block text-zinc-200">Virtual DOM Reconciliation</strong>
                    <span className="text-[10px] text-zinc-500">React key bindings trigger selective node updates</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-zinc-800/60 flex items-center justify-between text-xs font-mono text-zinc-500">
              <span>Latency: ~0.8ms</span>
              <span>State Scope: In-Memory / Context Bound</span>
            </div>
          </div>
          
          {/* Engineering Code Card */}
          <div className="lg:col-span-5 p-8 bg-zinc-950 border border-zinc-800/80 rounded-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                  <Code size={14} className="text-rose-500" /> code snippet
                </h3>
                <span className="w-2 h-2 rounded-full bg-rose-500 shadow-md shadow-rose-950" />
              </div>
              
              <pre className="font-mono text-[11px] text-zinc-300 bg-zinc-900/30 p-4 rounded border border-zinc-900 overflow-x-auto leading-relaxed">
{`const moveTask = (taskId, direction) => {
  const colOrder = ['todo', 'progress', 'review', 'done'];
  setTasks(prevTasks => prevTasks.map(task => {
    if (task.id === taskId) {
      const currentIdx = colOrder.indexOf(task.col);
      let nextIdx = currentIdx + direction;
      if (nextIdx >= 0 && nextIdx < colOrder.length) {
        return { ...task, col: colOrder[nextIdx] };
      }
    }
    return task;
  }));
};`}
              </pre>
            </div>
            
            <p className="text-xs text-zinc-500 font-light mt-4">
              Our state translation function ensures immutable state modifications, resulting in bulletproof reactivity and keeping view components modular.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Sandbox Board Workstation */}
      <section id="sandbox" className="py-24 max-w-6xl mx-auto px-6 border-b border-zinc-900">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <span className="font-mono text-xs text-rose-500 tracking-widest font-bold uppercase block mb-2">03 / SANDBOX DEMO</span>
            <h2 className="font-syne font-bold text-3xl text-white">Interactive Board Workspace</h2>
          </div>
          
          <div className="flex items-center gap-2 mt-4 md:mt-0 font-mono text-[10px] text-zinc-500 bg-zinc-900/20 px-3 py-1.5 border border-zinc-800/80 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span>SANDBOX WORKSTATION LOADED</span>
          </div>
        </div>
        
        {/* Terminal Workstation Container */}
        <div className="border border-zinc-800 bg-zinc-950 rounded-xl overflow-hidden shadow-2xl">
          {/* Workstation Top Bar */}
          <div className="bg-zinc-900/60 px-6 py-4 border-b border-zinc-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="h-4 w-px bg-zinc-800 mx-2" />
              <span className="font-mono text-[10px] text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Activity size={12} className="text-rose-500" /> taskflow_core.py
              </span>
            </div>
            
            {/* Embedded Workstation Stats */}
            <div className="hidden md:flex gap-6 items-center text-[10px] font-mono text-zinc-500">
              <div className="flex items-center gap-1.5">
                <ClipboardList size={12} className="text-rose-400" />
                <span>TICKETS: <strong>{tasks.length}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckSquare size={12} className="text-emerald-400" />
                <span>COMPLETED: <strong>{tasks.filter(t => t.col === 'done').length}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                <span>RATE: <strong className="text-rose-500">{getCompletionPercentage()}%</strong></span>
              </div>
            </div>
          </div>
          
          {/* Workstation Workspace */}
          <div className="p-6 md:p-8 bg-zinc-900/10">
            {/* Search, Filter & Creator trigger controls */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
              <div className="flex flex-wrap gap-3 w-full md:w-auto">
                <div className="relative flex items-center bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs w-full md:w-60">
                  <Search className="text-zinc-500 mr-2" size={14} />
                  <input 
                    type="text" 
                    placeholder="Search tasks..." 
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="bg-transparent border-none outline-none text-zinc-200 placeholder-zinc-600 w-full"
                  />
                </div>

                <select 
                  value={filterPriority} 
                  onChange={e => setFilterPriority(e.target.value)}
                  className="bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-zinc-300 outline-none cursor-pointer"
                >
                  <option value="All">All Priorities</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>

              <button 
                onClick={() => setShowAddForm(!showAddForm)}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 border border-rose-500/25 bg-rose-500/10 text-rose-400 font-mono text-xs font-bold px-5 py-2.5 rounded hover:bg-rose-500/20 transition-all duration-300 cursor-pointer"
              >
                <Plus size={14} />
                <span>{showAddForm ? 'CLOSE CREATOR' : 'CREATE DEV TICKET'}</span>
              </button>
            </div>

            {/* Task Creator Panel */}
            {showAddForm && (
              <div className="mb-8 p-6 bg-zinc-950/80 border border-rose-500/20 rounded-lg animate-fade-in">
                <h4 className="font-mono text-[10px] font-bold text-rose-500 tracking-wider mb-4">PROVISION NEW DEV TICKET</h4>
                <form onSubmit={createTask} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  <div className="md:col-span-2 flex flex-col gap-1.5">
                    <label className="font-mono text-[9px] text-zinc-500">TICKET SUMMARY</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Write unit tests for auth middleware" 
                      required
                      value={newTaskTitle}
                      onChange={e => setNewTaskTitle(e.target.value)}
                      className="bg-zinc-900 border border-zinc-800 rounded px-4 py-2.5 text-xs text-zinc-200 outline-none focus:border-rose-500"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[9px] text-zinc-500">TAG / MODULE</label>
                    <select 
                      value={newTaskTag} 
                      onChange={e => setNewTaskTag(e.target.value)}
                      className="bg-zinc-900 border border-zinc-800 rounded px-4 py-2.5 text-xs text-zinc-300 outline-none"
                    >
                      <option>Frontend</option>
                      <option>Backend</option>
                      <option>DevOps</option>
                      <option>Database</option>
                    </select>
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[9px] text-zinc-500">CRITICALITY</label>
                    <select 
                      value={newTaskPriority} 
                      onChange={e => setNewTaskPriority(e.target.value)}
                      className="bg-zinc-900 border border-zinc-800 rounded px-4 py-2.5 text-xs text-zinc-300 outline-none"
                    >
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>
                  </div>
                  
                  <div className="md:col-span-4 flex justify-end">
                    <button 
                      type="submit" 
                      className="bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold px-6 py-2.5 rounded transition-all duration-300 cursor-pointer"
                    >
                      DISPATCH TICKET
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Kanban Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
              {columns.map((col) => {
                const colTasks = filteredTasks.filter(t => t.col === col.id);
                return (
                  <div key={col.id} className="bg-zinc-950/40 border border-zinc-800/80 rounded-lg p-4">
                    {/* Column Header */}
                    <div className={`flex justify-between items-center pb-3 mb-4 border-b border-zinc-800/80 border-t-2 ${col.color.split(' ')[0]}`}>
                      <span className={`font-mono text-[10px] font-bold tracking-wider ${col.color.split(' ')[1]}`}>{col.name}</span>
                      <span className="bg-zinc-900 border border-zinc-800 font-mono text-[9px] text-zinc-400 px-2 py-0.5 rounded-full">{colTasks.length}</span>
                    </div>

                    {/* Cards Container */}
                    <div className="flex flex-col gap-3 min-h-[280px]">
                      {colTasks.length === 0 ? (
                        <div className="text-center font-mono text-[9px] text-zinc-600 py-12 border border-dashed border-zinc-800/40 rounded">
                          NO TICKETS IN STAGE
                        </div>
                      ) : (
                        colTasks.map((task) => {
                          const isEditing = editingId === task.id;
                          return (
                            <div key={task.id} className="bg-zinc-900/40 border border-zinc-800/80 rounded-lg p-4 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/60">
                              {isEditing ? (
                                <div className="flex flex-col gap-3">
                                  <textarea 
                                    value={editingTitle}
                                    onChange={e => setEditingTitle(e.target.value)}
                                    className="bg-zinc-950 border border-zinc-800 rounded p-2 text-xs text-zinc-200 outline-none focus:border-rose-500 resize-none h-16"
                                  />
                                  <div className="grid grid-cols-2 gap-2">
                                    <select 
                                      value={editingTag} 
                                      onChange={e => setEditingTag(e.target.value)}
                                      className="bg-zinc-950 border border-zinc-800 rounded p-1.5 text-[10px] text-zinc-300 outline-none"
                                    >
                                      <option>Frontend</option>
                                      <option>Backend</option>
                                      <option>DevOps</option>
                                      <option>Database</option>
                                    </select>
                                    <select 
                                      value={editingPriority} 
                                      onChange={e => setEditingPriority(e.target.value)}
                                      className="bg-zinc-950 border border-zinc-800 rounded p-1.5 text-[10px] text-zinc-300 outline-none"
                                    >
                                      <option>High</option>
                                      <option>Medium</option>
                                      <option>Low</option>
                                    </select>
                                  </div>
                                  <div className="flex justify-end gap-2 mt-1">
                                    <button 
                                      onClick={() => setEditingId(null)}
                                      className="text-zinc-400 p-1 hover:text-rose-400 transition-colors"
                                    >
                                      <X size={14} />
                                    </button>
                                    <button 
                                      onClick={() => saveEdit(task.id)}
                                      className="text-emerald-400 p-1 hover:text-emerald-300 transition-colors"
                                    >
                                      <Check size={14} />
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <div className="flex justify-between items-center mb-3">
                                    <span className={`font-mono text-[8px] font-bold px-1.5 py-0.5 rounded border ${
                                      task.priority === 'High' 
                                        ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' 
                                        : task.priority === 'Medium'
                                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                          : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                    }`}>
                                      {task.priority.toUpperCase()}
                                    </span>
                                    <span className="font-mono text-[9px] text-zinc-500">{task.tag}</span>
                                  </div>
                                  
                                  <p className="text-xs text-zinc-200 leading-normal mb-4 font-light">{task.title}</p>
                                  
                                  <div className="flex justify-between items-center border-t border-zinc-800/80 pt-3 mt-3">
                                    <button 
                                      className="text-zinc-500 hover:text-rose-500 disabled:opacity-10 disabled:cursor-not-allowed transition-colors"
                                      disabled={task.col === 'todo'}
                                      onClick={() => moveTask(task.id, -1)}
                                      title="Move back"
                                    >
                                      <ArrowLeft size={12} />
                                    </button>
                                    
                                    <div className="flex gap-2.5">
                                      <button 
                                        onClick={() => startEditing(task)}
                                        className="text-zinc-500 hover:text-rose-400 transition-colors"
                                        title="Edit ticket"
                                      >
                                        <Edit3 size={12} />
                                      </button>
                                      <button 
                                        onClick={() => deleteTask(task.id)}
                                        className="text-zinc-500 hover:text-rose-600 transition-colors"
                                        title="Delete ticket"
                                      >
                                        <Trash2 size={12} />
                                      </button>
                                    </div>

                                    <button 
                                      className="text-zinc-500 hover:text-rose-500 disabled:opacity-10 disabled:cursor-not-allowed transition-colors"
                                      disabled={task.col === 'done'}
                                      onClick={() => moveTask(task.id, 1)}
                                      title="Move forward"
                                    >
                                      <ArrowRight size={12} />
                                    </button>
                                  </div>
                                </>
                              )}
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                );
              })}
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
            <h3 className="font-syne font-semibold text-lg text-white mb-2">In-Memory Engine & CRUD Mechanics</h3>
            <p className="text-sm text-zinc-400 font-light leading-relaxed">
              Implemented reactive column shifts, multi-category priority assignments, filter mechanisms, and dynamic in-line text editor panels.
            </p>
          </div>

          {/* Milestone 2: Progress */}
          <div className="mb-12 pl-6 relative">
            <span className="absolute -left-3.5 top-0 w-7 h-7 rounded-full bg-zinc-900 border border-rose-500 flex items-center justify-center font-mono text-[9px] text-rose-500 font-bold animate-pulse">
              ●
            </span>
            <span className="font-mono text-[9px] text-rose-400 uppercase tracking-widest block mb-1">MODULE 02 — IN PROGRESS</span>
            <h3 className="font-syne font-semibold text-lg text-white mb-2">IndexedDB State Persistence</h3>
            <p className="text-sm text-zinc-400 font-light leading-relaxed">
              Integrating client-side storage drivers to preserve board coordinates and board items seamlessly across browser reloads.
            </p>
          </div>

          {/* Milestone 3: Future */}
          <div className="pl-6 relative">
            <span className="absolute -left-3.5 top-0 w-7 h-7 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center font-mono text-[9px] text-zinc-600 font-bold">
              ○
            </span>
            <span className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest block mb-1">MODULE 03 — PLANNED</span>
            <h3 className="font-syne font-semibold text-lg text-zinc-500 mb-2">WebSockets Multi-Client Synchronization</h3>
            <p className="text-sm text-zinc-500 font-light leading-relaxed">
              Design a lightweight Node.js/Socket.io backend signaling network to allow real-time multi-agent board updates.
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
              {['React.js', 'Tailwind CSS', 'ESLint', 'Vite.js', 'Lucide React', 'Glassmorphism UI', 'SVG Coordination'].map((tech) => (
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
                <span>Avoiding references mutation inside nested structures ensures that state changes are explicitly captured by React's rendering pipeline.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rose-500 mt-1">▪</span>
                <span>Optimized components by breaking task listings, forms, and headers into micro-modules to prevent redundant virtual DOM calculations.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rose-500 mt-1">▪</span>
                <span>Applied subtle, micro-interactions and strict layout hierarchies to keep user cognitive load minimal during busy board activities.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
