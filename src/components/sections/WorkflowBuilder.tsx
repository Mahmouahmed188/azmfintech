"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  DndContext,
  DragOverlay,
  useDraggable,
  useDroppable,
  DragStartEvent,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  defaultDropAnimationSideEffects,
  DragOverlayProps,
} from "@dnd-kit/core";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cloud,
  Database,
  Cpu,
  Globe,
  Server,
  Shield,
  Zap,
  Box,
  Layers,
  Workflow,
  Trash2,
  X,
} from "lucide-react";

// Types
interface ComponentType {
  id: string;
  type: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  category: "services" | "connections";
}

interface NodeType {
  id: string;
  componentId: string;
  x: number;
  y: number;
  label: string;
  icon: React.ReactNode;
  color: string;
}

interface ConnectionType {
  id: string;
  from: string;
  to: string;
}

// Available components for the toolbox
const availableComponents: ComponentType[] = [
  {
    id: "cloud",
    type: "cloud",
    label: "Cloud Service",
    icon: <Cloud size={20} />,
    color: "#3B82F6",
    category: "services",
  },
  {
    id: "database",
    type: "database",
    label: "Database",
    icon: <Database size={20} />,
    color: "#10B981",
    category: "services",
  },
  {
    id: "ai",
    type: "ai",
    label: "AI Engine",
    icon: <Cpu size={20} />,
    color: "#8B5CF6",
    category: "services",
  },
  {
    id: "api",
    type: "api",
    label: "API Gateway",
    icon: <Globe size={20} />,
    color: "#F59E0B",
    category: "connections",
  },
  {
    id: "server",
    type: "server",
    label: "Server",
    icon: <Server size={20} />,
    color: "#EF4444",
    category: "services",
  },
  {
    id: "security",
    type: "security",
    label: "Security",
    icon: <Shield size={20} />,
    color: "#EC4899",
    category: "services",
  },
  {
    id: "automation",
    type: "automation",
    label: "Automation",
    icon: <Zap size={20} />,
    color: "#14B8A6",
    category: "services",
  },
  {
    id: "container",
    type: "container",
    label: "Container",
    icon: <Box size={20} />,
    color: "#6366F1",
    category: "services",
  },
];

// Draggable Toolbox Item
const ToolboxItem: React.FC<{ component: ComponentType }> = ({ component }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `toolbox-${component.id}`,
    data: { component, isToolbox: true },
  });

  return (
    <motion.div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      whileHover={{ scale: 1.02, x: 4 }}
      whileTap={{ scale: 0.98 }}
      className={`relative group cursor-grab active:cursor-grabbing ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="relative flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{
            backgroundColor: `${component.color}20`,
            color: component.color,
          }}
        >
          {component.icon}
        </div>
        <span className="text-sm font-medium text-gray-200">
          {component.label}
        </span>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
};

// Canvas Node Component
const CanvasNode: React.FC<{
  node: NodeType;
  isSelected: boolean;
  onSelect: () => void;
  onRemove: () => void;
  onConnectStart: (nodeId: string) => void;
}> = ({ node, isSelected, onSelect, onRemove, onConnectStart }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: node.id,
    data: { node },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <motion.div
      ref={setNodeRef}
      style={{
        ...style,
        left: node.x,
        top: node.y,
      }}
      {...listeners}
      {...attributes}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      whileHover={{ scale: 1.05 }}
      className={`absolute cursor-grab active:cursor-grabbing z-10 ${
        isSelected ? "z-20" : ""
      }`}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      <div
        className={`relative group px-4 py-3 rounded-xl border transition-all duration-300 ${
          isSelected
            ? "border-white/50 bg-white/20 shadow-lg shadow-white/10"
            : "border-white/10 bg-white/10 hover:border-white/30 hover:bg-white/15"
        }`}
        style={{
          boxShadow: isSelected ? `0 0 30px ${node.color}30` : undefined,
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              backgroundColor: `${node.color}30`,
              color: node.color,
            }}
          >
            {node.icon}
          </div>
          <span className="text-xs font-medium text-white whitespace-nowrap">
            {node.label}
          </span>
        </div>

        {/* Connection point */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onConnectStart(node.id);
          }}
          className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white/50 hover:bg-white hover:scale-125 transition-all opacity-0 group-hover:opacity-100"
        />

        {/* Remove button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500/80 hover:bg-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
        >
          <X size={12} className="text-white" />
        </button>

        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"
          style={{ backgroundColor: node.color }}
        />
      </div>
    </motion.div>
  );
};

// Main Workflow Builder Component
const WorkflowBuilder: React.FC = () => {
  const [nodes, setNodes] = useState<NodeType[]>([]);
  const [connections, setConnections] = useState<ConnectionType[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [connectingFrom, setConnectingFrom] = useState<string | null>(null);
  const [activeDragItem, setActiveDragItem] = useState<any>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 250, tolerance: 5 },
    })
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveDragItem(event.active.data.current);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over, delta } = event;

      if (!over) {
        setActiveDragItem(null);
        return;
      }

      // Handle dropping toolbox item onto canvas
      if (active.data.current?.isToolbox && over.id === "canvas") {
        const component = active.data.current.component as ComponentType;
        const canvasRect = canvasRef.current?.getBoundingClientRect();

        if (canvasRect) {
          const newNode: NodeType = {
            id: `node-${Date.now()}`,
            componentId: component.id,
            x: delta.x + 100,
            y: delta.y + 100,
            label: component.label,
            icon: component.icon,
            color: component.color,
          };
          setNodes((prev) => [...prev, newNode]);
        }
      }

      // Handle moving existing nodes
      if (active.data.current?.node && over.id === "canvas") {
        const nodeId = active.id as string;
        setNodes((prev) =>
          prev.map((n) =>
            n.id === nodeId ? { ...n, x: n.x + delta.x, y: n.y + delta.y } : n
          )
        );
      }

      setActiveDragItem(null);
    },
    []
  );

  const handleConnectStart = useCallback((nodeId: string) => {
    if (connectingFrom === null) {
      setConnectingFrom(nodeId);
    } else if (connectingFrom !== nodeId) {
      // Create connection
      const existingConnection = connections.find(
        (c) => c.from === connectingFrom && c.to === nodeId
      );
      if (!existingConnection) {
        setConnections((prev) => [
          ...prev,
          { id: `conn-${Date.now()}`, from: connectingFrom, to: nodeId },
        ]);
      }
      setConnectingFrom(null);
    }
  }, [connectingFrom, connections]);

  const handleRemoveNode = useCallback((nodeId: string) => {
    setNodes((prev) => prev.filter((n) => n.id !== nodeId));
    setConnections((prev) =>
      prev.filter((c) => c.from !== nodeId && c.to !== nodeId)
    );
    if (selectedNode === nodeId) setSelectedNode(null);
  }, [selectedNode]);

  const handleClearAll = useCallback(() => {
    setNodes([]);
    setConnections([]);
    setSelectedNode(null);
    setConnectingFrom(null);
  }, []);

  // Generate SVG paths for connections
  const renderConnections = () => {
    return connections.map((conn) => {
      const fromNode = nodes.find((n) => n.id === conn.from);
      const toNode = nodes.find((n) => n.id === conn.to);

      if (!fromNode || !toNode) return null;

      const x1 = fromNode.x + 140; // Approximate center
      const y1 = fromNode.y + 28;
      const x2 = toNode.x + 20;
      const y2 = toNode.y + 28;

      const midX = (x1 + x2) / 2;
      const path = `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`;

      return (
        <motion.path
          key={conn.id}
          d={path}
          fill="none"
          stroke="url(#connectionGradient)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="pointer-events-none"
        />
      );
    });
  };

  const { setNodeRef } = useDroppable({
    id: "canvas",
  });

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px]" />
      </div>

      {/* Header */}
      <div className="relative z-10 px-8 py-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
              <Workflow className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">
                Workflow Builder
              </h1>
              <p className="text-sm text-gray-400">
                Drag components to build your workflow
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleClearAll}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all text-sm"
            >
              <Trash2 size={16} />
              Clear All
            </button>
            <button className="px-6 py-2 rounded-lg bg-primary hover:bg-primary/90 text-white font-medium transition-all">
              Deploy Workflow
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="relative z-10 flex h-[calc(100vh-100px)]">
          {/* Sidebar / Toolbox */}
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-72 bg-gray-900/50 backdrop-blur-xl border-r border-white/10 flex flex-col"
          >
            <div className="p-6 border-b border-white/10">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Layers size={20} className="text-primary" />
                Components
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                Drag to add to canvas
              </p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Services Category */}
              <div>
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3 px-2">
                  Services
                </h3>
                <div className="space-y-2">
                  {availableComponents
                    .filter((c) => c.category === "services")
                    .map((component) => (
                      <ToolboxItem key={component.id} component={component} />
                    ))}
                </div>
              </div>

              {/* Connections Category */}
              <div>
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3 px-2">
                  Connections
                </h3>
                <div className="space-y-2">
                  {availableComponents
                    .filter((c) => c.category === "connections")
                    .map((component) => (
                      <ToolboxItem key={component.id} component={component} />
                    ))}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="p-4 border-t border-white/10">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-lg bg-white/5">
                  <div className="text-2xl font-bold text-white">
                    {nodes.length}
                  </div>
                  <div className="text-xs text-gray-400">Nodes</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-white/5">
                  <div className="text-2xl font-bold text-white">
                    {connections.length}
                  </div>
                  <div className="text-xs text-gray-400">Connections</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Canvas */}
          <div className="flex-1 relative overflow-hidden">
            <div
              ref={(node) => {
                setNodeRef(node);
                if (canvasRef) {
                  (canvasRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
                }
              }}
              className="absolute inset-4 rounded-2xl bg-gray-950/50 backdrop-blur-sm border border-white/10 overflow-hidden"
              onClick={() => {
                setSelectedNode(null);
                setConnectingFrom(null);
              }}
            >
              {/* Grid Pattern */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
                  `,
                  backgroundSize: "40px 40px",
                }}
              />

              {/* Drop Zone Indicator */}
              {nodes.length === 0 && !activeDragItem && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-2xl border-2 border-dashed border-white/20 flex items-center justify-center">
                      <Layers size={32} className="text-white/30" />
                    </div>
                    <p className="text-gray-400 text-lg font-medium">
                      Drop components here
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                      Drag items from the sidebar to start building
                    </p>
                  </div>
                </motion.div>
              )}

              {/* SVG Layer for Connections */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                <defs>
                  <linearGradient
                    id="connectionGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#9C4C9D" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                {renderConnections()}
              </svg>

              {/* Nodes Layer */}
              <AnimatePresence>
                {nodes.map((node) => (
                  <CanvasNode
                    key={node.id}
                    node={node}
                    isSelected={selectedNode === node.id}
                    onSelect={() => {
                      setSelectedNode(node.id);
                      if (connectingFrom && connectingFrom !== node.id) {
                        handleConnectStart(node.id);
                      }
                    }}
                    onRemove={() => handleRemoveNode(node.id)}
                    onConnectStart={handleConnectStart}
                  />
                ))}
              </AnimatePresence>

              {/* Connection Mode Indicator */}
              {connectingFrom && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-primary/90 text-white text-sm font-medium shadow-lg"
                >
                  Click another node to connect, or click the same node to cancel
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Drag Overlay */}
        <DragOverlay dropAnimation={{ sideEffects: defaultDropAnimationSideEffects({}) }}>
          {activeDragItem?.component ? (
            <div className="w-48 p-4 rounded-xl bg-white/10 backdrop-blur-xl border border-white/30 shadow-2xl">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{
                    backgroundColor: `${activeDragItem.component.color}30`,
                    color: activeDragItem.component.color,
                  }}
                >
                  {activeDragItem.component.icon}
                </div>
                <span className="text-sm font-medium text-white">
                  {activeDragItem.component.label}
                </span>
              </div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </section>
  );
};

export default WorkflowBuilder;
