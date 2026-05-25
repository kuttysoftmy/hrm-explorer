import React, { useState, useEffect } from 'react';
import { Check, Edit3, ShieldAlert, Zap, Layers, RefreshCw } from 'lucide-react';

export default function StateInspector({
  selectedNode,
  onUpdateNodeLabel
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editLabel, setEditLabel] = useState('');

  useEffect(() => {
    if (selectedNode) {
      setEditLabel(selectedNode.label);
      setIsEditing(false);
    }
  }, [selectedNode]);

  if (!selectedNode) {
    return (
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 h-full flex flex-col items-center justify-center text-center">
        <Layers className="w-10 h-10 text-slate-700 mb-3 animate-pulse" />
        <h3 className="text-slate-300 font-mono text-xs font-bold uppercase tracking-wider">State Inspector Panel</h3>
        <p className="text-slate-500 text-xs max-w-xs mt-1">
          Select any reasoning node in the hierarchy trace to inspect its dynamic embedding, temporal scale, and adapt sub-goals on-the-fly.
        </p>
      </div>
    );
  }

  const handleSave = () => {
    onUpdateNodeLabel(selectedNode.id, editLabel);
    setIsEditing(false);
  };

  const getLevelBadge = (level) => {
    switch (level) {
      case 'macro':
        return 'bg-purple-500/10 text-purple-400 border border-purple-500/30';
      case 'subgoal':
        return 'bg-sky-500/10 text-sky-400 border border-sky-500/30';
      default:
        return 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30';
    }
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-lg h-full flex flex-col">
      {/* Header */}
      <div className="bg-slate-900/80 px-4 py-3.5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-indigo-500 pulsing-glow" />
          <h3 className="text-xs font-bold text-slate-200 tracking-wider uppercase font-mono">
            Temporal State Inspector
          </h3>
        </div>
        <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase ${getLevelBadge(selectedNode.level)}`}>
          {selectedNode.level} (Horizon)
        </span>
      </div>

      {/* Content body */}
      <div className="p-5 flex-1 space-y-5 overflow-y-auto text-xs">
        {/* Node Name & Interactive Edit Section */}
        <div className="space-y-2 bg-slate-900/40 p-3 rounded-lg border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-mono text-[10px] uppercase tracking-wider">Node Target Goal</span>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="text-indigo-400 hover:text-indigo-300 flex items-center space-x-1 text-[10px]"
              >
                <Edit3 className="w-3 h-3" />
                <span>Edit Subgoal</span>
              </button>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-2">
              <input
                type="text"
                value={editLabel}
                onChange={(e) => setEditLabel(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs px-2.5 py-1.5 rounded focus:outline-none focus:border-indigo-500 font-mono"
                autoFocus
              />
              <div className="flex items-center space-x-2 justify-end">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-2 py-1 bg-slate-800 text-slate-400 rounded text-[10px] hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[10px] font-semibold flex items-center space-x-1"
                >
                  <Check className="w-3 h-3" />
                  <span>Inject Modification</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              <p className="font-semibold text-slate-100 text-sm font-mono">{selectedNode.label}</p>
              <p className="text-[11px] text-slate-400 italic">{selectedNode.info}</p>
            </div>
          )}
        </div>

        {/* On-The-Fly Adaptation Notice if user edited */}
        {selectedNode.isEdited && (
          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-400 text-[11px] flex items-start space-x-2 animate-fade-in">
            <ShieldAlert className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Adaptive Deviation Injected</p>
              <p className="text-slate-300 text-[10px] mt-0.5">
                HRM supervisor detected goal drift. Dynamic micro-planner will recalibrate parent node context without resetting global state.
              </p>
            </div>
          </div>
        )}

        {/* State Latent Vector Embedding Visualization */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-mono text-[10px] uppercase tracking-wider">
              State Representation Vector (s_t)
            </span>
            <span className="text-[10px] text-indigo-400 font-mono">
              d_model = 12
            </span>
          </div>
          
          {/* Heatmap block visualization */}
          <div className="grid grid-cols-6 gap-1.5 bg-slate-900/50 p-2.5 rounded-lg border border-slate-800">
            {selectedNode.stateRepr.map((val, idx) => {
              const intensity = Math.floor(val * 100);
              return (
                <div 
                  key={idx}
                  className="h-7 rounded relative group flex flex-col items-center justify-center font-mono text-[9px] font-bold"
                  style={{
                    backgroundColor: `rgba(99, 102, 241, ${Math.max(0.1, val)})`,
                    border: `1px solid rgba(129, 140, 248, ${val})`
                  }}
                >
                  <span className="text-white drop-shadow">{val.toFixed(1)}</span>
                  {/* Tooltip detail */}
                  <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-slate-950 text-slate-300 text-[8px] rounded px-1.5 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20 border border-slate-700">
                    Dim {idx}: {val}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="text-[9px] text-slate-500 leading-tight">
            *This is the hierarchical level context slice representing local transition matrices. Shifting values simulate state space drift.
          </p>
        </div>

        {/* Metadata Details */}
        <div className="border-t border-slate-800/80 pt-4 space-y-2.5 text-[11px]">
          <div className="flex justify-between">
            <span className="text-slate-500 font-mono">Current Status:</span>
            <span className="font-bold text-slate-300 font-mono capitalize">{selectedNode.status}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 font-mono">Temporal Horizon Scale:</span>
            <span className="text-slate-300 font-mono">
              {selectedNode.level === 'macro' ? '10^2s (Slow Supervisor)' : selectedNode.level === 'subgoal' ? '10^1s (Middle Planner)' : '10^0s (Fast Execution)'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 font-mono">Node ID:</span>
            <span className="text-slate-400 font-mono">{selectedNode.id}</span>
          </div>
        </div>
      </div>
    </div>
  );
}