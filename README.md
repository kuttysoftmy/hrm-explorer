# HRM-Explorer

An interactive visual debugger and execution playground for the Hierarchical Reasoning Model (HRM). 

Instead of analyzing raw console logs, HRM-Explorer provides a real-time graph visualization that displays how the model decomposes complex, long-horizon goals into multi-timescale sub-tasks. Developers can step through the reasoning hierarchy frame-by-frame, inspect state representations at different temporal levels, edit sub-goals on-the-fly to test model adaptability, and directly compare HRM's execution tree with standard Chain-of-Thought traces.

### Tech Stack Used
- React
- Tailwind CSS
- Vite
- Lucide React (for developer-oriented iconography)
- Custom SVG-based Interactive Tree Visualizer (D3-like dynamic coordinates)