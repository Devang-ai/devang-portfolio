import React, { useState, useRef, useEffect } from 'react';

export default function Terminal() {
  const [history, setHistory] = useState([
    { text: "Welcome to Devang's Developer Terminal [Version 1.0.4]", type: "system" },
    { text: "Type 'help' to see a list of available CLI commands.", type: "system" },
    { text: "", type: "break" }
  ]);
  const [input, setInput] = useState("");
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  const commands = {
    help: [
      "Available commands:",
      "  about        - Learn about Devang's background and engineering focus",
      "  skills       - Print the core technical stack and database expertise",
      "  projects     - List the 6 high-impact case study projects",
      "  contact      - Display contact links and social media accounts",
      "  clear        - Clear the terminal history",
      "  sudo-access  - Secret root access command"
    ],
    about: [
      "Profile: Devang Chauhan",
      "Role: Senior Full-Stack Engineer & Software Architect",
      "Focus: Building high-performance, distributed web applications, data dashboards, and robust APIs.",
      "Bio: Experienced in managing complex React frontends, robust Node/Express backends, and SQL/NoSQL databases. Known for optimizing performance, automating workflows, and building modular systems that scale."
    ],
    skills: [
      "Languages: JavaScript (ES6+), TypeScript, HTML5/CSS3, SQL, PHP",
      "Front-End: React.js, Redux, Vite, Next.js, TailwindCSS, CSS Variables",
      "Back-End:  Node.js, Express, REST APIs, GraphQL, WebSockets",
      "Databases: PostgreSQL, MySQL, MongoDB, Redis",
      "DevOps:    Docker, AWS, Git, CI/CD pipelines, Vercel"
    ],
    projects: [
      "Core Case Studies:",
      "  1. TaskFlow Kanban - React-state developer productivity board (Live Utility)",
      "  2. CryptoSphere    - DeFi mempool swapper with ticker prices loop (Prototype)",
      "  3. Velo Analytics  - Server telemetry analytics board with SVG charts (Prototype)",
      "  4. UrbanVoice      - Civic tech zoning budget comparison portal (Prototype)",
      "  5. Milcano Store   - Minimalist luxury storefront catalog & checkout (Concept)",
      "  6. Scan2Serve      - Contactless QR seated dine-in SaaS prototype (In Development)"
    ],
    contact: [
      "Let's build something together:",
      "  Email:      devang.chauhan@example.com",
      "  LinkedIn:   linkedin.com/in/devang-chauhan",
      "  GitHub:     github.com/devang-chauhan",
      "  WhatsApp:   +91 98765 43210"
    ],
    "sudo-access": [
      "Verifying security keys...",
      ".......................................",
      "Access Granted to Level-9 Subsystems.",
      "SYSTEM STATUS: System operating at peak performance.",
      "EASTER EGG: Thank you for trying this terminal! Let's get to work."
    ]
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const trimmedInput = input.trim().toLowerCase();

    if (!trimmedInput) return;

    const newHistory = [...history, { text: `visitor@devang.dev:~$ ${input}`, type: "command" }];

    if (trimmedInput === "clear") {
      setHistory([]);
    } else if (commands[trimmedInput]) {
      const commandLines = commands[trimmedInput].map(line => ({ text: line, type: "output" }));
      setHistory([...newHistory, ...commandLines, { text: "", type: "break" }]);
    } else {
      setHistory([
        ...newHistory,
        { text: `Command not found: '${input}'. Type 'help' for help.`, type: "error" },
        { text: "", type: "break" }
      ]);
    }

    setInput("");
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const getLineClass = (type) => {
    switch (type) {
      case 'system': return 'text-secondary-cyan';
      case 'command': return 'text-slate-100 font-bold';
      case 'output': return 'text-slate-400';
      case 'error': return 'text-red-400';
      default: return 'text-slate-200';
    }
  };

  return (
    <div 
      className="border border-slate-800 rounded-xl overflow-hidden w-full max-w-3xl mx-auto shadow-2xl bg-bg-obsidian/85 backdrop-blur-md transition-all duration-300 hover:border-slate-700 text-left"
      onClick={focusInput}
    >
      {/* Terminal Title Bar */}
      <div className="bg-slate-950/90 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500"></span>
          <span className="w-3 h-3 rounded-full bg-amber-500"></span>
          <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
        </div>
        <div className="font-mono text-[10px] text-slate-400 tracking-wider">bash - devang@portfolio</div>
        <div className="w-14"></div> {/* empty spacing balance */}
      </div>

      {/* Terminal Display Screen */}
      <div className="p-6 font-mono text-xs md:text-sm leading-relaxed h-[360px] overflow-y-auto bg-bg-obsidian/95">
        {history.map((line, idx) => {
          if (line.type === "break") {
            return <div key={idx} className="h-2" />;
          }
          return (
            <div key={idx} className={`whitespace-pre-wrap mb-1 ${getLineClass(line.type)}`}>
              {line.text}
            </div>
          );
        })}
        
        {/* Input prompt line */}
        <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 mt-2">
          <span className="text-accent-light font-bold whitespace-nowrap">visitor@devang.dev:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-slate-100 caret-accent-light font-mono"
            autoFocus
            autoComplete="off"
            spellCheck="false"
          />
        </form>
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
}
