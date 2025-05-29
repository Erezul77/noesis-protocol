
// ReflectionCausalGraph.tsx
// Simple React component to render causal reflection DAG

'use client'
import React from 'react'
import ReactFlow, { MiniMap, Controls, Background } from 'reactflow'
import 'reactflow/dist/style.css'

const testData = {
  nodes: [
    { id: 'R1', position: { x: 50, y: 50 }, data: { label: 'R1 (ψ: 0.8)' }, style: { backgroundColor: '#d0f0ff' } },
    { id: 'R2', position: { x: 250, y: 150 }, data: { label: 'R2 (ψ: 0.9)' }, style: { backgroundColor: '#ffd0f0' } },
    { id: 'R3', position: { x: 450, y: 80 }, data: { label: 'R3 (ψ: 0.7)' }, style: { backgroundColor: '#e0ffe0' } },
  ],
  edges: [
    { id: 'e1-2', source: 'R1', target: 'R2', label: 'Δψ: +0.1, ΔP: +0.2', animated: true },
    { id: 'e2-3', source: 'R2', target: 'R3', label: 'Δψ: -0.2, ΔP: +0.1', animated: true },
  ],
}

export default function ReflectionCausalGraph() {
  return (
    <div style={{ height: 500 }}>
      <ReactFlow nodes={testData.nodes} edges={testData.edges} fitView>
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  )
}
