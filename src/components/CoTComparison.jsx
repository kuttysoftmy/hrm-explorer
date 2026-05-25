import React from 'react';
import { BarChart3, AlertTriangle, Zap, CheckCircle2 } from 'lucide-react';

export default function CoTComparison({ cotStats, hrmStats }) {
  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-lg h-full flex flex-col">
      <div className="bg-slate-900/80 px-4 py-3.5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BarChart3 className="w-4 h-4 text-indigo-400" />
          <h3 className="text-xs font-bold text-slate-200 tracking-wider uppercase font-mono">
            Standard CoT vs HRM Trace
          </h3>
        </div>
        <span className="bg-emerald-500/10 text-emerald-400 text-[10px] px-2 py-0.5 rounded font-mono border border-emerald-500/20">
          Efficiency Gain
        </span>
      </div>

      <div className="p-5 space-y-6 text-xs flex-1 flex flex-col justify-between">
        <p className="text-slate-400 leading-relaxed">
          Flat <strong>Chain-of-Thought (CoT)</strong> forces the LLM to process every microscopic execution step within a single monolithic window, leading to context explosion and fragile failure recovery. 
        </p>

        {/* Comparisons Side by Side */}
        <div className="grid grid-cols-2 gap-4">
          {/* CoT Panel */}
          <div className="bg-slate-900/50 p-4 rounded-lg border border-red-950/40 space-y-3">
            <div className="flex items-center space-x-1.5 text-red-400">
              <AlertTriangle className="w-4 h-4" />
              <span className="font-bold font-mono text-[11px] uppercase tracking-wider">Flat CoT Trace</span>
            </div>

            <div className="space-y-2 font-mono text-slate-300 text-[11px]">
              <div>
                <span className="text-slate-500 block text-[10px]">Total Steps Evaluated:</span>
                <span className="text-red-300 font-bold text-sm">{cotStats.steps} steps</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Token Consumed:</span>
                <span className="text-red-300 font-bold">{cotStats.tokens.toLocaleString()} t</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Context Strain:</span>
                <span className="text-red-300">{cotStats.contextStrain}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Slippage Recovery:</span>
                <span className="text-red-400/90 font-semibold">{cotStats.recoveryRate}</span>
              </div>
            </div>
          </div>

          {/* HRM Panel */}
          <div className="bg-indigo-950/25 p-4 rounded-lg border border-indigo-500/30 space-y-3 relative overflow-hidden">
            {/* Decorative background pulse glow */}
            <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl pointer-events-none" />

            <div className="flex items-center space-x-1.5 text-emerald-400">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span className="font-bold font-mono text-[11px] uppercase tracking-wider">HRM Sub-Tree</span>
            </div>

            <div className="space-y-2 font-mono text-slate-300 text-[11px]">
              <div>
                <span className="text-slate-500 block text-[10px]">Total Steps Evaluated:</span>
                <span className="text-emerald-400 font-bold text-sm">{hrmStats.steps} steps</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Token Consumed:</span>
                <span className="text-emerald-400 font-bold">{hrmStats.tokens.toLocaleString()} t</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Context Strain:</span>
                <span className="text-emerald-400">{hrmStats.contextStrain}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Slippage Recovery:</span>
                <span className="text-emerald-400 font-semibold">{hrmStats.recoveryRate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Token Efficiency Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-[11px] font-mono">
            <span className="text-slate-400">Context Overhead Reduction:</span>
            <span className="text-emerald-400 font-bold">-{Math.round((1 - hrmStats.tokens / cotStats.tokens) * 100)}%</span>
          </div>
          <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800 flex">
            <div 
              className="bg-emerald-500 h-full"
              style={{ width: `${(hrmStats.tokens / cotStats.tokens) * 100}%` }}
            />
            <div className="bg-red-500 h-full flex-1" />
          </div>
          <div className="flex justify-between text-[9px] text-slate-500 font-mono">
            <span>HRM Context footprint</span>
            <span>Standard CoT footprint</span>
          </div>
        </div>
      </div>
    </div>
  );
}