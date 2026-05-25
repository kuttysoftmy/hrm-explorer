import React from 'react';
import { Cpu, Server, Terminal, AlertCircle } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md px-6 py-4 sticky top-0 z-50 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="bg-indigo-600 p-2 rounded-lg text-white shadow-lg shadow-indigo-500/20">
          <Cpu className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-lg font-bold text-white tracking-wider uppercase font-mono">
              HRM-Explorer
            </h1>
            <span className="bg-indigo-500/10 text-indigo-400 text-[10px] uppercase tracking-widest px-2 py-0.5 rounded font-bold border border-indigo-500/20">
              v0.4 Preview
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Hierarchical Reasoning Model · Interactive Debugger & Playground
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="hidden md:flex items-center space-x-4 text-xs font-mono">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-slate-300">Execution Engine: Online</span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="flex items-center space-x-1">
            <Server className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400">Port: 8089 (Mock-HRM)</span>
          </div>
        </div>

        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            alert("Connected to repository 'HRM'. This local playground allows modifying sub-goals and evaluating dynamic task-tree rewrites real-time.");
          }}
          className="text-xs bg-slate-900 border border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600 transition-all px-3.5 py-2 rounded-md font-mono flex items-center space-x-2 shadow-sm"
        >
          <Terminal className="w-3.5 h-3.5 text-indigo-400" />
          <span>Repo Context</span>
        </a>
      </div>
    </header>
  );
}