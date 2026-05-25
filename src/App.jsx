import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import HierarchyGraph from './components/HierarchyGraph.jsx';
import StateInspector from './components/StateInspector.jsx';
import CoTComparison from './components/CoTComparison.jsx';
import { PRESETS } from './data/presets.js';
import { Play, Pause, ChevronLeft, ChevronRight, Sliders, RefreshCw, Cpu, Layers } from 'lucide-react';

export default function App() {
  const [currentPresetKey, setCurrentPresetKey] = useState('rover_assembly');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(2500); // ms per step
  const [selectedNode, setSelectedNode] = useState(null);
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);

  const preset = PRESETS[currentPresetKey];
  const currentStep = preset.steps[currentStepIndex];

  // Load current step data into state so that users can edit subgoals
  useEffect(() => {
    if (currentStep) {
      // Preserve any edits made to the nodes if already modified in previous steps
      setNodes(currentStep.nodes);
      setLinks(currentStep.links);
      
      // Auto-select macro node on load or preserve selection index if matching
      const macroNode = currentStep.nodes.find(n => n.level === 'macro');
      setSelectedNode(macroNode || currentStep.nodes[0]);
    }
  }, [currentStepIndex, currentPresetKey]);

  // Handle simulation auto play interval
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStepIndex((prevIndex) => {
          if (prevIndex >= preset.steps.length - 1) {
            setIsPlaying(false);
            return prevIndex;
          }
          return prevIndex + 1;
        });
      }, playbackSpeed);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, preset.steps.length]);

  const handleUpdateNodeLabel = (nodeId, newLabel) => {
    setNodes(prevNodes =>
      prevNodes.map(node => {
        if (node.id === nodeId) {
          const updatedNode = { ...node, label: newLabel, isEdited: true };
          setSelectedNode(updatedNode);
          return updatedNode;
        }
        return node;
      })
    );
  };

  const handlePresetChange = (key) => {
    setCurrentPresetKey(key);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-white">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Control Sidebar & Scenario Selector */}
        <div className="lg:col-span-1 space-y-6 flex flex-col">
          
          {/* Scenario Selector */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 shadow-sm">
            <div className="flex items-center space-x-2 pb-2 border-b border-slate-850">
              <Cpu className="w-4.5 h-4.5 text-indigo-400" />
              <h2 className="text-xs font-bold text-slate-200 tracking-wider uppercase font-mono">
                Reasoning Presets
              </h2>
            </div>

            <div className="space-y-2">
              {Object.keys(PRESETS).map((key) => {
                const isActive = key === currentPresetKey;
                return (
                  <button
                    key={key}
                    onClick={() => handlePresetChange(key)}
                    className={`w-full text-left px-3 py-3 rounded-lg border text-xs transition-all duration-200 flex flex-col space-y-1.5 ${
                      isActive
                        ? 'bg-indigo-600/15 border-indigo-500 text-indigo-200 shadow-md shadow-indigo-950/20'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-bold font-mono tracking-wide text-[11px] text-slate-100">
                      {PRESETS[key].title}
                    </span>
                    <span className="text-[10px] leading-normal line-clamp-2 text-slate-400">
                      {PRESETS[key].scenario}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Controller & Frame Step-by-Step Dashboard */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 flex-1">
            <div className="flex items-center space-x-2 pb-2 border-b border-slate-850">
              <Sliders className="w-4.5 h-4.5 text-indigo-400" />
              <h2 className="text-xs font-bold text-slate-200 tracking-wider uppercase font-mono">
                Execution Control
              </h2>
            </div>

            {/* Timeline Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-slate-400">Step / Frame Progress:</span>
                <span className="text-indigo-400 font-bold">
                  {currentStepIndex + 1} / {preset.steps.length}
                </span>
              </div>
              <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="bg-indigo-500 h-full transition-all duration-300 ease-out"
                  style={{ width: `${((currentStepIndex + 1) / preset.steps.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Button Controls */}
            <div className="flex items-center justify-between gap-2">
              <button
                onClick={() => setCurrentStepIndex(prev => Math.max(0, prev - 1))}
                disabled={currentStepIndex === 0}
                className="flex-1 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 disabled:opacity-40 disabled:hover:bg-slate-900 px-2 py-2 rounded-lg text-xs font-semibold font-mono flex items-center justify-center space-x-1 transition-all"
                title="Previous step"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Step Back</span>
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`flex-1 px-2.5 py-2 rounded-lg text-xs font-bold font-mono flex items-center justify-center space-x-2 shadow transition-all ${
                  isPlaying
                    ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-950/20'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-950/20'
                }`}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isPlaying ? 'Pause' : 'Play Run'}</span>
              </button>

              <button
                onClick={() => setCurrentStepIndex(prev => Math.min(preset.steps.length - 1, prev + 1))}
                disabled={currentStepIndex === preset.steps.length - 1}
                className="flex-1 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 disabled:opacity-40 disabled:hover:bg-slate-900 px-2 py-2 rounded-lg text-xs font-semibold font-mono flex items-center justify-center space-x-1 transition-all"
                title="Next step"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Speed controller slider */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>Auto Step Interval:</span>
                <span>{(playbackSpeed / 1000).toFixed(1)}s</span>
              </div>
              <input
                type="range"
                min="1000"
                max="5000"
                step="500"
                value={playbackSpeed}
                onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>

            {/* Reset current trace button */}
            <button
              onClick={() => {
                setCurrentStepIndex(0);
                setIsPlaying(false);
              }}
              className="w-full bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-slate-300 border border-slate-800/80 rounded-lg py-1.5 text-[11px] font-mono flex items-center justify-center space-x-1.5 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Execution Steps</span>
            </button>
          </div>

          {/* Step description commentary log */}
          <div className="bg-indigo-950/10 border border-indigo-500/20 rounded-xl p-4 space-y-2">
            <div className="flex items-center space-x-1">
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-[10px] font-bold font-mono uppercase tracking-widest text-indigo-300">
                HRM Trace Diagnostics
              </span>
            </div>
            <p className="text-xs text-slate-300 font-mono leading-relaxed bg-slate-900/40 p-2.5 rounded border border-slate-800">
              {currentStep ? currentStep.description : "Loading..."}
            </p>
          </div>

        </div>

        {/* Main Graph Playground Canvas Area (Middle 2 Cols) */}
        <div className="lg:col-span-2 flex flex-col space-y-6">
          <HierarchyGraph
            presetTitle={preset.title}
            nodes={nodes}
            links={links}
            selectedNodeId={selectedNode ? selectedNode.id : null}
            onSelectNode={setSelectedNode}
            activeStep={currentStepIndex}
          />
        </div>

        {/* Right Sidebar - State Inspector & Dynamic CoT Comparison */}
        <div className="lg:col-span-1 space-y-6 flex flex-col">
          <StateInspector
            selectedNode={selectedNode}
            onUpdateNodeLabel={handleUpdateNodeLabel}
          />
          
          <CoTComparison
            cotStats={preset.cotStats}
            hrmStats={preset.hrmStats}
          />
        </div>
      </main>

      {/* Bottom status bar */}
      <footer className="border-t border-slate-900 bg-slate-950 py-3.5 px-6 text-center text-xs text-slate-500 font-mono flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>
          HRM-Explorer Debugger Interface © {new Date().getFullYear()} — Designed for LLM Execution Trees
        </span>
        <div className="flex items-center space-x-3 text-[11px]">
          <span className="text-indigo-400">Interactive Mode</span>
          <span className="text-slate-700">|</span>
          <a 
            href="#"
            onClick={(e) => { e.preventDefault(); alert("The Hierarchical Reasoning Model (HRM) structures subgoals locally so that if a low-level action slips, only that leaf branch undergoes regeneration, bypassing the token-heavy context overhead of flat Chain-of-Thought models."); }}
            className="text-slate-400 hover:text-slate-200 underline underline-offset-2"
          >
            How HRM Works
          </a>
        </div>
      </footer>
    </div>
  );
}