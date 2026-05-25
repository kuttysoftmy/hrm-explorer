import React from 'react';
import { ShieldAlert, RefreshCw, Layers, CheckCircle, Info } from 'lucide-react';

export default function HierarchyGraph({
  presetTitle,
  nodes,
  links,
  selectedNodeId,
  onSelectNode,
  activeStep
}) {

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return { stroke: '#10b981', fill: '#064e3b', text: '#34d399', badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' };
      case 'active':
        return { stroke: '#3b82f6', fill: '#1e3a8a', text: '#60a5fa', badge: 'bg-blue-500/10 text-blue-400 border-blue-500/30' };
      case 'fallback':
        return { stroke: '#f59e0b', fill: '#78350f', text: '#fbbf24', badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30' };
      case 'failed':
        return { stroke: '#ef4444', fill: '#7f1d1d', text: '#fca5a5', badge: 'bg-red-500/10 text-red-400 border-red-500/30' };
      default:
        return { stroke: '#475569', fill: '#1e293b', text: '#94a3b8', badge: 'bg-slate-500/10 text-slate-400 border-slate-500/20' };
    }
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden relative shadow-inner flex-1 flex flex-col min-h-[480px]">
      {/* Grid background overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Top Legend Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 px-5 py-3.5 bg-slate-900/60 backdrop-blur-sm z-10">
        <div className="flex items-center space-x-2">
          <Layers className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
            Multi-Scale Reasoning Hierarchy
          </span>
        </div>
        <div className="flex items-center space-x-3 text-[11px] font-mono">
          <div className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-emerald-400" />
            <span className="text-slate-400">Completed</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 border border-blue-400 animate-pulse" />
            <span className="text-slate-400">Active</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 border border-amber-400" />
            <span className="text-slate-400">Fallback Plan</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 border border-red-400" />
            <span className="text-slate-400">Failed State</span>
          </div>
        </div>
      </div>

      {/* SVG Workspace Container */}
      <div className="flex-1 relative flex items-center justify-center min-h-[380px]">
        <svg className="w-full h-full min-h-[400px] select-none" viewBox="0 0 800 400">
          {/* Level indicators background labels */}
          <text x="20" y="55" fill="#475569" className="font-mono text-[10px] tracking-wider font-bold">LEVEL 0: MACRO OBJECTIVE (10²s)</text>
          <line x1="10" y1="65" x2="790" y2="65" stroke="#1e293b" strokeDasharray="4 4" />

          <text x="20" y="165" fill="#475569" className="font-mono text-[10px] tracking-wider font-bold">LEVEL 1: TEMPORAL SUB-GOALS (10¹s)</text>
          <line x1="10" y1="175" x2="790" y2="175" stroke="#1e293b" strokeDasharray="4 4" />

          <text x="20" y="285" fill="#475569" className="font-mono text-[10px] tracking-wider font-bold">LEVEL 2: ATOMIC EXECUTION (10⁰s)</text>
          <line x1="10" y1="295" x2="790" y2="295" stroke="#1e293b" strokeDasharray="4 4" />

          {/* Graph Connections (Links) */}
          {links.map((link, idx) => {
            const sourceNode = nodes.find(n => n.id === link.source);
            const targetNode = nodes.find(n => n.id === link.target);
            if (!sourceNode || !targetNode) return null;

            const isLinkActive = sourceNode.status === 'active' || targetNode.status === 'active';
            const isFallback = sourceNode.status === 'fallback' || targetNode.status === 'fallback';

            return (
              <g key={`link-${idx}`}>
                {/* Main Curve Path */}
                <path
                  d={`M ${sourceNode.x} ${sourceNode.y} C ${sourceNode.x} ${(sourceNode.y + targetNode.y) / 2}, ${targetNode.x} ${(sourceNode.y + targetNode.y) / 2}, ${targetNode.x} ${targetNode.y}`}
                  fill="none"
                  stroke={isFallback ? '#f59e0b' : isLinkActive ? '#3b82f6' : '#334155'}
                  strokeWidth={isLinkActive ? 2.5 : 1.5}
                  strokeDasharray={isFallback ? '5 3' : 'none'}
                  className="transition-all duration-500"
                />
                {/* Animated transmission pulse along active paths */}
                {isLinkActive && (
                  <circle r="4" fill="#60a5fa">
                    <animateMotion
                      path={`M ${sourceNode.x} ${sourceNode.y} C ${sourceNode.x} ${(sourceNode.y + targetNode.y) / 2}, ${targetNode.x} ${(sourceNode.y + targetNode.y) / 2}, ${targetNode.x} ${targetNode.y}`}
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
              </g>
            );
          })}

          {/* Graph Nodes */}
          {nodes.map((node) => {
            const colorMap = getStatusColor(node.status);
            const isSelected = selectedNodeId === node.id;
            const radius = node.level === 'macro' ? 24 : node.level === 'subgoal' ? 18 : 14;

            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                className="cursor-pointer group"
                onClick={() => onSelectNode(node)}
              >
                {/* Outer Glow Ring on Highlight or Active */}
                {(isSelected || node.status === 'active') && (
                  <circle
                    r={radius + 8}
                    fill="none"
                    stroke={isSelected ? '#818cf8' : colorMap.stroke}
                    strokeWidth={1.5}
                    strokeOpacity={0.4}
                    className={node.status === 'active' ? 'pulsing-glow' : ''}
                  />
                )}

                {/* Core Node Circle */}
                <circle
                  r={radius}
                  fill={colorMap.fill}
                  stroke={isSelected ? '#e0e7ff' : colorMap.stroke}
                  strokeWidth={isSelected ? 3 : 2}
                  className="transition-all duration-300 ease-in-out hover:brightness-125"
                />

                {/* Micro level icon/initial inside node */}
                <text
                  dy=".3em"
                  textAnchor="middle"
                  fill="#f1f5f9"
                  fontSize={node.level === 'macro' ? '12px' : '9px'}
                  fontWeight="bold"
                  className="font-mono pointer-events-none"
                >
                  {node.level === 'macro' ? 'H0' : node.level === 'subgoal' ? 'H1' : 'H2'}
                </text>

                {/* Label Box underneath */}
                <foreignObject
                  x={-80}
                  y={radius + 5}
                  width={160}
                  height={50}
                  className="pointer-events-none"
                >
                  <div className="text-center">
                    <p className={`text-[10px] font-semibold leading-tight px-1 rounded transition-colors duration-200 truncate ${
                      isSelected ? 'text-indigo-300 bg-slate-900 border border-slate-700' : 'text-slate-200'
                    }`}>
                      {node.label}
                    </p>
                    <p className="text-[8px] text-slate-500 font-mono tracking-tight mt-0.5 capitalize">
                      {node.status}
                    </p>
                  </div>
                </foreignObject>
              </g>
            );
          })}
        </svg>

        {/* Hint bar in bottom right */}
        <div className="absolute bottom-3 right-4 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-md text-[10px] text-slate-400 flex items-center space-x-1">
          <Info className="w-3 h-3 text-indigo-400" />
          <span>Tip: Click nodes to inspect temporal state representations</span>
        </div>
      </div>
    </div>
  );
}