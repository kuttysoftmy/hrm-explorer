export const PRESETS = {
  rover_assembly: {
    title: "Mars Rover Chassis Assembly",
    scenario: "Multi-stage physical manipulator tasks requiring fine spatial realignment upon joint slip simulation.",
    cotStats: { steps: 24, tokens: 94200, contextStrain: "88%", recoveryRate: "Low (Requires Full Reset)" },
    hrmStats: { steps: 9, tokens: 18400, contextStrain: "14%", recoveryRate: "Instantaneous (Local Subtree Fallback)" },
    steps: [
      {
        stepIndex: 0,
        description: "Initialize high-level objective: Assemble Mars Rover main payload bay. Subgoal level 1 initialized.",
        nodes: [
          { id: 'n0', label: 'Assemble Payload Bay', level: 'macro', x: 400, y: 50, status: 'active', info: 'Macro horizon. 10^3 steps capacity.', stateRepr: [0.8, 0.1, 0.9, 0.4, 0.2, 0.5, 0.7, 0.1, 0.3, 0.9, 0.4, 0.2] },
          { id: 'n1', label: 'Align Manipulator Arm', level: 'subgoal', x: 180, y: 160, status: 'pending', info: 'Aligning multi-joint kinematics.', stateRepr: [0.2, 0.3, 0.1, 0.1, 0.8, 0.2, 0.1, 0.9, 0.4, 0.2, 0.0, 0.1] },
          { id: 'n2', label: 'Fetch Chassis Core', level: 'subgoal', x: 400, y: 160, status: 'pending', info: 'Coordinate storage access.', stateRepr: [0.1, 0.9, 0.4, 0.5, 0.6, 0.7, 0.3, 0.1, 0.2, 0.8, 0.5, 0.9] },
          { id: 'n3', label: 'Calibrate Joint Torques', level: 'subgoal', x: 620, y: 160, status: 'pending', info: 'Torque adaptation baseline.', stateRepr: [0.5, 0.5, 0.5, 0.5, 0.1, 0.1, 0.9, 0.9, 0.2, 0.3, 0.4, 0.5] }
        ],
        links: [
          { source: 'n0', target: 'n1' },
          { source: 'n0', target: 'n2' },
          { source: 'n0', target: 'n3' }
        ]
      },
      {
        stepIndex: 1,
        description: "Chassis acquisition initiates. Subgoal 'Fetch Chassis Core' spawns Level 2 Atomic Actions.",
        nodes: [
          { id: 'n0', label: 'Assemble Payload Bay', level: 'macro', x: 400, y: 50, status: 'active', info: 'Macro objective progressing.', stateRepr: [0.82, 0.11, 0.91, 0.39, 0.2, 0.5, 0.7, 0.1, 0.3, 0.9, 0.4, 0.2] },
          { id: 'n1', label: 'Align Manipulator Arm', level: 'subgoal', x: 180, y: 160, status: 'pending', info: 'Awaiting prior steps.', stateRepr: [0.2, 0.3, 0.1, 0.1, 0.8, 0.2, 0.1, 0.9, 0.4, 0.2, 0.0, 0.1] },
          { id: 'n2', label: 'Fetch Chassis Core', level: 'subgoal', x: 400, y: 160, status: 'active', info: 'Activating atomic physical paths.', stateRepr: [0.15, 0.95, 0.42, 0.58, 0.6, 0.7, 0.3, 0.1, 0.2, 0.8, 0.5, 0.9] },
          { id: 'n3', label: 'Calibrate Joint Torques', level: 'subgoal', x: 620, y: 160, status: 'pending', info: 'Awaiting execution sequence.', stateRepr: [0.5, 0.5, 0.5, 0.5, 0.1, 0.1, 0.9, 0.9, 0.2, 0.3, 0.4, 0.5] },
          { id: 'n4', label: 'Scan RFID Storage', level: 'atomic', x: 300, y: 280, status: 'completed', info: 'Chassis located at Bin 4-B.', stateRepr: [0.99, 0.99, 0.1, 0.1, 0.2, 0.4, 0.5, 0.6, 0.1, 0.2, 0.8, 0.9] },
          { id: 'n5', label: 'Engage Gripper Clamps', level: 'atomic', x: 500, y: 280, status: 'active', info: 'Applying 40N vacuum grip force.', stateRepr: [0.33, 0.88, 0.77, 0.44, 0.5, 0.6, 0.7, 0.8, 0.1, 0.2, 0.3, 0.4] }
        ],
        links: [
          { source: 'n0', target: 'n1' },
          { source: 'n0', target: 'n2' },
          { source: 'n0', target: 'n3' },
          { source: 'n2', target: 'n4' },
          { source: 'n2', target: 'n5' }
        ]
      },
      {
        stepIndex: 2,
        description: "SUDDEN ERROR DETECTED: Slippage detected on mechanical clamps. HRM triggers local sub-tree repair!",
        nodes: [
          { id: 'n0', label: 'Assemble Payload Bay', level: 'macro', x: 400, y: 50, status: 'active', info: 'Macro objective unaffected by micro-fault.', stateRepr: [0.85, 0.1, 0.9, 0.35, 0.2, 0.5, 0.7, 0.1, 0.3, 0.9, 0.4, 0.2] },
          { id: 'n1', label: 'Align Manipulator Arm', level: 'subgoal', x: 180, y: 160, status: 'pending', info: 'Suspended.', stateRepr: [0.2, 0.3, 0.1, 0.1, 0.8, 0.2, 0.1, 0.9, 0.4, 0.2, 0.0, 0.1] },
          { id: 'n2', label: 'Fetch Chassis Core', level: 'subgoal', x: 400, y: 160, status: 'fallback', info: 'Entering correction branch.', stateRepr: [0.05, 0.85, 0.32, 0.48, 0.99, 0.11, 0.2, 0.8, 0.9, 0.8, 0.5, 0.9] },
          { id: 'n3', label: 'Calibrate Joint Torques', level: 'subgoal', x: 620, y: 160, status: 'pending', info: 'Awaiting execution sequence.', stateRepr: [0.5, 0.5, 0.5, 0.5, 0.1, 0.1, 0.9, 0.9, 0.2, 0.3, 0.4, 0.5] },
          { id: 'n4', label: 'Scan RFID Storage', level: 'atomic', x: 260, y: 280, status: 'completed', info: 'Chassis located.', stateRepr: [0.99, 0.99, 0.1, 0.1, 0.2, 0.4, 0.5, 0.6, 0.1, 0.2, 0.8, 0.9] },
          { id: 'n5', label: 'Engage Gripper Clamps', level: 'atomic', x: 400, y: 280, status: 'failed', info: 'Friction coefficient low. Target slipped.', stateRepr: [0.11, 0.11, 0.99, 0.99, 0.0, 0.0, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1] },
          { id: 'n6', label: 'Retry: Friction Grip Modulator', level: 'atomic', x: 540, y: 280, status: 'active', info: 'Adaptive response: Increased pneumatic pressure to 65N + surface texturing alignment.', stateRepr: [0.95, 0.25, 0.85, 0.9, 0.3, 0.4, 0.8, 0.9, 0.2, 0.3, 0.4, 0.5] }
        ],
        links: [
          { source: 'n0', target: 'n1' },
          { source: 'n0', target: 'n2' },
          { source: 'n0', target: 'n3' },
          { source: 'n2', target: 'n4' },
          { source: 'n2', target: 'n5' },
          { source: 'n2', target: 'n6' }
        ]
      },
      {
        stepIndex: 3,
        description: "Grip modulated successfully. Macro goal achieved using minimal context. Subtasks transition cleanly.",
        nodes: [
          { id: 'n0', label: 'Assemble Payload Bay', level: 'macro', x: 400, y: 50, status: 'completed', info: 'Successfully assembled!', stateRepr: [0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99] },
          { id: 'n1', label: 'Align Manipulator Arm', level: 'subgoal', x: 180, y: 160, status: 'completed', info: 'Completed.', stateRepr: [0.95, 0.95, 0.95, 0.1, 0.8, 0.2, 0.1, 0.9, 0.4, 0.2, 0.0, 0.1] },
          { id: 'n2', label: 'Fetch Chassis Core', level: 'subgoal', x: 400, y: 160, status: 'completed', info: 'Fully recovered and retrieved.', stateRepr: [0.99, 0.99, 0.99, 0.99, 0.6, 0.7, 0.3, 0.1, 0.2, 0.8, 0.5, 0.9] },
          { id: 'n3', label: 'Calibrate Joint Torques', level: 'subgoal', x: 620, y: 160, status: 'completed', info: 'Complete.', stateRepr: [0.99, 0.99, 0.99, 0.9, 0.1, 0.1, 0.9, 0.9, 0.2, 0.3, 0.4, 0.5] }
        ],
        links: [
          { source: 'n0', target: 'n1' },
          { source: 'n0', target: 'n2' },
          { source: 'n0', target: 'n3' }
        ]
      }
    ]
  },
  decentralized_finance: {
    title: "Smart Contract Multi-Vault Arbitrage",
    scenario: "Complex atomic step transactions with instant routing adjustments on sudden slippage threshold breaches.",
    cotStats: { steps: 58, tokens: 215400, contextStrain: "96%", recoveryRate: "None (Transaction Abort)" },
    hrmStats: { steps: 12, tokens: 34100, contextStrain: "18%", recoveryRate: "High (Subgoal Level Routing Swap)" },
    steps: [
      {
        stepIndex: 0,
        description: "Initialize high-level Arbitrage Loop. HRM sets dynamic context thresholds for subgoals.",
        nodes: [
          { id: 'n0', label: 'Optimize Vault Yield', level: 'macro', x: 400, y: 50, status: 'active', info: 'Targeting > 12.5% delta.', stateRepr: [0.5, 0.9, 0.1, 0.4, 0.8, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7] },
          { id: 'n1', label: 'Scan Liquidity Pools', level: 'subgoal', x: 250, y: 160, status: 'active', info: 'Querying gas/volume matrix.', stateRepr: [0.9, 0.1, 0.2, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.1, 0.2, 0.3] },
          { id: 'n2', label: 'Assess Gas Estimates', level: 'subgoal', x: 550, y: 160, status: 'pending', info: 'Checking gas limits.', stateRepr: [0.1, 0.1, 0.1, 0.1, 0.2, 0.2, 0.3, 0.3, 0.4, 0.4, 0.5, 0.5] }
        ],
        links: [
          { source: 'n0', target: 'n1' },
          { source: 'n0', target: 'n2' }
        ]
      },
      {
        stepIndex: 1,
        description: "Liquidity Pool scanner isolates two high-yield flash loan routes. Commencing sub-routing execution.",
        nodes: [
          { id: 'n0', label: 'Optimize Vault Yield', level: 'macro', x: 400, y: 50, status: 'active', info: 'Targeting > 12.5% delta.', stateRepr: [0.5, 0.9, 0.1, 0.4, 0.8, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7] },
          { id: 'n1', label: 'Scan Liquidity Pools', level: 'subgoal', x: 250, y: 160, status: 'completed', info: 'Gas matrix retrieved.', stateRepr: [0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99] },
          { id: 'n2', label: 'Assess Gas Estimates', level: 'subgoal', x: 550, y: 160, status: 'active', info: 'Compiling simulated call-stacks.', stateRepr: [0.15, 0.22, 0.33, 0.44, 0.55, 0.66, 0.77, 0.88, 0.99, 0.11, 0.22, 0.33] },
          { id: 'n3', label: 'Query Uniswap V3 Pool', level: 'atomic', x: 150, y: 280, status: 'completed', info: 'Slippage margin: 0.15%.', stateRepr: [0.1, 0.1, 0.1, 0.9, 0.9, 0.9, 0.1, 0.1, 0.1, 0.8, 0.8, 0.8] },
          { id: 'n4', label: 'Query Balancer Multi-hop', level: 'atomic', x: 350, y: 280, status: 'completed', info: 'Route weight: 0.72.', stateRepr: [0.2, 0.2, 0.2, 0.8, 0.8, 0.8, 0.2, 0.2, 0.2, 0.9, 0.9, 0.9] }
        ],
        links: [
          { source: 'n0', target: 'n1' },
          { source: 'n0', target: 'n2' },
          { source: 'n1', target: 'n3' },
          { source: 'n1', target: 'n4' }
        ]
      },
      {
        stepIndex: 2,
        description: "FLASH CRASH EVENT: Network gas fees jump 400%. Flat CoT models trigger absolute failure; HRM dynamically re-allocates collateral boundaries at the Level 1 supervisor.",
        nodes: [
          { id: 'n0', label: 'Optimize Vault Yield', level: 'macro', x: 400, y: 50, status: 'active', info: 'Targeting > 12.5% delta.', stateRepr: [0.5, 0.9, 0.1, 0.4, 0.8, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7] },
          { id: 'n1', label: 'Scan Liquidity Pools', level: 'subgoal', x: 250, y: 160, status: 'completed', info: 'Gas matrix retrieved.', stateRepr: [0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99] },
          { id: 'n2', label: 'Assess Gas Estimates', level: 'subgoal', x: 550, y: 160, status: 'fallback', info: 'Triggered Dynamic Gas Modulator.', stateRepr: [0.99, 0.11, 0.11, 0.99, 0.5, 0.5, 0.2, 0.2, 0.8, 0.8, 0.9, 0.9] },
          { id: 'n5', label: 'Trigger Fallback GSN Route', level: 'atomic', x: 550, y: 280, status: 'active', info: 'Routing via gas-station network partner protocol.', stateRepr: [0.88, 0.88, 0.11, 0.11, 0.99, 0.99, 0.55, 0.55, 0.33, 0.33, 0.44, 0.44] }
        ],
        links: [
          { source: 'n0', target: 'n1' },
          { source: 'n0', target: 'n2' },
          { source: 'n2', target: 'n5' }
        ]
      }
    ]
  },
  autonomous_defense: {
    title: "Cloud Infrastructure Fault Recovery",
    scenario: "Rooting node container errors and executing instant traffic routing mitigations on critical microservice clusters.",
    cotStats: { steps: 35, tokens: 145000, contextStrain: "91%", recoveryRate: "Moderate (Human in the loop)" },
    hrmStats: { steps: 8, tokens: 21000, contextStrain: "12%", recoveryRate: "Full (Automated self-healing)" },
    steps: [
      {
        stepIndex: 0,
        description: "Initialize Recovery Agent: Detect anomalous spikes in Node latency (>450ms).",
        nodes: [
          { id: 'n0', label: 'Recover Node Cluster Latency', level: 'macro', x: 400, y: 50, status: 'active', info: 'Recovering SLAs under 200ms.', stateRepr: [0.1, 0.1, 0.8, 0.9, 0.5, 0.4, 0.2, 0.1, 0.9, 0.9, 0.2, 0.5] },
          { id: 'n1', label: 'Isolate Pod Failures', level: 'subgoal', x: 250, y: 160, status: 'active', info: 'Scanning Kubernetes cluster namespaces.', stateRepr: [0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.0, 0.1, 0.2] },
          { id: 'n2', label: 'Reroute Edge Ingress', level: 'subgoal', x: 550, y: 160, status: 'pending', info: 'Awaiting fault localization.', stateRepr: [0.0, 0.0, 0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9] }
        ],
        links: [
          { source: 'n0', target: 'n1' },
          { source: 'n0', target: 'n2' }
        ]
      },
      {
        stepIndex: 1,
        description: "Identified root cause: Pod k8s-dep-9b78 memory leak. Spawning hot-swap atomic tasks.",
        nodes: [
          { id: 'n0', label: 'Recover Node Cluster Latency', level: 'macro', x: 400, y: 50, status: 'active', info: 'System level health is 72%.', stateRepr: [0.3, 0.1, 0.8, 0.9, 0.5, 0.4, 0.2, 0.1, 0.9, 0.9, 0.2, 0.5] },
          { id: 'n1', label: 'Isolate Pod Failures', level: 'subgoal', x: 250, y: 160, status: 'completed', info: 'Pod k8s-dep-9b78 isolated.', stateRepr: [0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99] },
          { id: 'n2', label: 'Reroute Edge Ingress', level: 'subgoal', x: 550, y: 160, status: 'active', info: 'Modifying NGINX weights.', stateRepr: [0.22, 0.44, 0.66, 0.88, 0.11, 0.33, 0.55, 0.77, 0.99, 0.12, 0.34, 0.56] },
          { id: 'n3', label: 'Spin up Canary Pod', level: 'atomic', x: 450, y: 280, status: 'active', info: 'Provisioning micro-image v1.4.2-patch.', stateRepr: [0.55, 0.55, 0.99, 0.11, 0.22, 0.33, 0.44, 0.55, 0.66, 0.77, 0.88, 0.99] },
          { id: 'n4', label: 'Drain Conn: Faulty Pod', level: 'atomic', x: 650, y: 280, status: 'active', info: 'Draining 40 connections/sec.', stateRepr: [0.11, 0.11, 0.22, 0.22, 0.33, 0.33, 0.44, 0.44, 0.55, 0.55, 0.66, 0.66] }
        ],
        links: [
          { source: 'n0', target: 'n1' },
          { source: 'n0', target: 'n2' },
          { source: 'n2', target: 'n3' },
          { source: 'n2', target: 'n4' }
        ]
      }
    ]
  }
};