"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  ReactFlowProvider,
  Panel,
  MarkerType,
  NodeProps,
  Handle,
  Position,
  XYPosition,
  NodeTypes,
  ConnectionMode,
  OnNodesChange,
  OnEdgesChange,
} from "@xyflow/react";
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
  Link2,
  MousePointer2,
  Sparkles,
  Workflow,
  RotateCcw,
  GripVertical,
  GitBranch,
  ArrowRight,
  Home,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useWorkflowStore } from "@/stores/workflowStore";
import "@xyflow/react/dist/style.css";

// ============================================
// TYPES
// ============================================
interface ServiceItem {
  id: string;
  type: string;
  label: string;
  iconName: string;
  color: string;
  category: "services" | "connections" | "infrastructure";
  description: string;
}

interface NodeData extends Record<string, unknown> {
  label: string;
  iconName: string;
  color: string;
  description: string;
}

interface ParticleType {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

// ============================================
// AVAILABLE SERVICES
// ============================================
const availableServices: ServiceItem[] = [
  {
    id: "cloud",
    type: "cloud",
    label: "Cloud Service",
    iconName: "Cloud",
    color: "#3B82F6",
    category: "services",
    description: "Scalable cloud infrastructure",
  },
  {
    id: "database",
    type: "database",
    label: "Database",
    iconName: "Database",
    color: "#10B981",
    category: "infrastructure",
    description: "Secure data storage",
  },
  {
    id: "ai",
    type: "ai",
    label: "AI Engine",
    iconName: "Cpu",
    color: "#8B5CF6",
    category: "services",
    description: "Machine learning models",
  },
  {
    id: "api",
    type: "api",
    label: "API Gateway",
    iconName: "Globe",
    color: "#F59E0B",
    category: "connections",
    description: "API management & routing",
  },
  {
    id: "server",
    type: "server",
    label: "Server",
    iconName: "Server",
    color: "#EF4444",
    category: "infrastructure",
    description: "Compute resources",
  },
  {
    id: "security",
    type: "security",
    label: "Security",
    iconName: "Shield",
    color: "#EC4899",
    category: "services",
    description: "Protection & encryption",
  },
  {
    id: "automation",
    type: "automation",
    label: "Automation",
    iconName: "Zap",
    color: "#14B8A6",
    category: "services",
    description: "Workflow automation",
  },
  {
    id: "container",
    type: "container",
    label: "Container",
    iconName: "Box",
    color: "#6366F1",
    category: "infrastructure",
    description: "Containerized applications",
  },
];

// Icon mapping
const iconMap: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  Cloud,
  Database,
  Cpu,
  Globe,
  Server,
  Shield,
  Zap,
  Box,
};

// ============================================
// SPACE BACKGROUND COMPONENT
// ============================================
const SpaceBackground: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<ParticleType[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Deep space gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />

      {/* Animated nebula clouds */}
      <motion.div
        animate={{ x: mousePos.x * 0.5, y: mousePos.y * 0.5 }}
        transition={{ type: "spring", stiffness: 50, damping: 30 }}
        className="absolute top-1/4 left-1/4 w-[800px] h-[800px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <motion.div
        animate={{ x: -mousePos.x * 0.3, y: -mousePos.y * 0.3 }}
        transition={{ type: "spring", stiffness: 50, damping: 30 }}
        className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <motion.div
        animate={{ x: mousePos.x * 0.4, y: -mousePos.y * 0.4 }}
        transition={{ type: "spring", stiffness: 50, damping: 30 }}
        className="absolute top-1/2 right-1/3 w-[500px] h-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Stars */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            boxShadow: `0 0 ${particle.size * 2}px rgba(255,255,255,0.8)`,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Shooting stars */}
      <motion.div
        className="absolute w-1 h-1 bg-white rounded-full"
        style={{
          boxShadow:
            "0 0 10px 2px rgba(255,255,255,0.8), 0 0 20px 4px rgba(139,92,246,0.5)",
        }}
        animate={{
          x: ["0vw", "100vw"],
          y: ["10vh", "80vh"],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 8,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute w-1 h-1 bg-white rounded-full"
        style={{
          boxShadow:
            "0 0 10px 2px rgba(255,255,255,0.8), 0 0 20px 4px rgba(59,130,246,0.5)",
        }}
        animate={{
          x: ["20vw", "90vw"],
          y: ["5vh", "60vh"],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          repeatDelay: 12,
          delay: 5,
          ease: "linear",
        }}
      />
    </div>
  );
};

// ============================================
// CUSTOM NODE COMPONENT WITH FLOATING ANIMATION
// ============================================
const CustomNode: React.FC<NodeProps> = (props) => {
  const data = props.data as NodeData;
  const selected = props.selected;
  const color = data.color;
  const label = data.label;
  const description = data.description;
  const iconName = data.iconName;

  const IconComponent = iconMap[iconName] || Box;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group"
    >
      {/* Floating Animation Wrapper */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Main Node Card */}
        <div
          className={`
            relative px-5 py-4 rounded-2xl border-2 backdrop-blur-xl
            transition-all duration-300 cursor-grab active:cursor-grabbing
            ${
              selected
                ? "border-white/60 bg-white/20 shadow-2xl"
                : "border-white/10 bg-white/10 hover:border-white/30 hover:bg-white/15"
            }
          `}
          style={{
            boxShadow: selected
              ? `0 0 40px ${color}50, inset 0 0 20px ${color}10, 0 25px 50px -12px rgba(0,0,0,0.5)`
              : `0 10px 30px -10px rgba(0,0,0,0.5)`,
            minWidth: "160px",
          }}
        >
          {/* Glow Effect */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"
            style={{ backgroundColor: color }}
          />

          {/* Node Content */}
          <div className="flex items-center gap-3">
            <motion.div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                backgroundColor: `${color}25`,
                color: color,
                boxShadow: `0 0 20px ${color}30`,
              }}
              animate={{
                boxShadow: [
                  `0 0 10px ${color}20`,
                  `0 0 25px ${color}50`,
                  `0 0 10px ${color}20`,
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <IconComponent size={22} />
            </motion.div>
            <div className="flex-1 min-w-0">
              <span className="text-sm font-semibold text-white block truncate">
                {label}
              </span>
              <span className="text-xs text-gray-400 block truncate">
                {description}
              </span>
            </div>
          </div>

          {/* Connection Handles */}
          <Handle
            type="target"
            position={Position.Left}
            className="!w-3 !h-3 !bg-white/50 !border-2 !border-white/80 hover:!bg-[#9C4C9D] hover:!border-white transition-all"
            style={{ left: -6 }}
          />
          <Handle
            type="source"
            position={Position.Right}
            className="!w-3 !h-3 !bg-white/50 !border-2 !border-white/80 hover:!bg-[#9C4C9D] hover:!border-white transition-all"
            style={{ right: -6 }}
          />
          <Handle
            type="target"
            position={Position.Top}
            className="!w-3 !h-3 !bg-white/50 !border-2 !border-white/80 hover:!bg-[#9C4C9D] hover:!border-white transition-all opacity-0"
            style={{ top: -6 }}
          />
          <Handle
            type="source"
            position={Position.Bottom}
            className="!w-3 !h-3 !bg-white/50 !border-2 !border-white/80 hover:!bg-[#9C4C9D] hover:!border-white transition-all opacity-0"
            style={{ bottom: -6 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

// Node types registration
const nodeTypes: NodeTypes = {
  custom: CustomNode,
};

// ============================================
// SIDEBAR COMPONENT
// ============================================
interface SidebarProps {
  onDragStart: (event: React.DragEvent, service: ServiceItem) => void;
  onBackToHome?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onDragStart, onBackToHome }) => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const handleDragStart = (event: React.DragEvent, service: ServiceItem) => {
    setDraggedItem(service.id);
    onDragStart(event, service);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  return (
    <motion.div
      initial={{ x: -320, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-80 bg-slate-950/60 backdrop-blur-2xl border-r border-white/10 flex flex-col h-full"
    >
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-3">
            <motion.div
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#9C4C9D] to-purple-600 flex items-center justify-center"
              whileHover={{ scale: 1.05, rotate: 5 }}
              animate={{
                boxShadow: [
                  "0 0 20px rgba(156,76,157,0.3)",
                  "0 0 40px rgba(156,76,157,0.5)",
                  "0 0 20px rgba(156,76,157,0.3)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Workflow className="text-white" size={20} />
            </motion.div>
            <div>
              <span className="block">Components</span>
              <span className="text-xs text-gray-400 font-normal">
                Drag to canvas
              </span>
            </div>
          </h2>
          {onBackToHome && (
            <motion.button
              onClick={onBackToHome}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:border-white/40 transition-all text-sm"
              title="Back to Home"
            >
              <Home size={16} />
              {/* <span>Home</span> */}
            </motion.button>
          )}
        </div>
      </div>

      {/* Components List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Services Category */}
        <div>
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-2 flex items-center gap-2">
            <Sparkles size={12} />
            Services
          </h3>
          <div className="space-y-2">
            {availableServices
              .filter((s) => s.category === "services")
              .map((service) => (
                <DraggableItem
                  key={service.id}
                  service={service}
                  isDragging={draggedItem === service.id}
                  onDragStart={(e) => handleDragStart(e, service)}
                  onDragEnd={handleDragEnd}
                />
              ))}
          </div>
        </div>

        {/* Infrastructure Category */}
        <div>
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-2 flex items-center gap-2">
            <Server size={12} />
            Infrastructure
          </h3>
          <div className="space-y-2">
            {availableServices
              .filter((s) => s.category === "infrastructure")
              .map((service) => (
                <DraggableItem
                  key={service.id}
                  service={service}
                  isDragging={draggedItem === service.id}
                  onDragStart={(e) => handleDragStart(e, service)}
                  onDragEnd={handleDragEnd}
                />
              ))}
          </div>
        </div>

        {/* Connections Category */}
        <div>
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-2 flex items-center gap-2">
            <GitBranch size={12} />
            Connections
          </h3>
          <div className="space-y-2">
            {availableServices
              .filter((s) => s.category === "connections")
              .map((service) => (
                <DraggableItem
                  key={service.id}
                  service={service}
                  isDragging={draggedItem === service.id}
                  onDragStart={(e) => handleDragStart(e, service)}
                  onDragEnd={handleDragEnd}
                />
              ))}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="p-4 border-t border-white/10 bg-black/20">
        <div className="text-xs text-gray-500 space-y-2">
          <p className="flex items-center gap-2">
            <MousePointer2 size={12} className="text-[#9C4C9D]" />
            <span>Drag nodes to reposition</span>
          </p>
          <p className="flex items-center gap-2">
            <Link2 size={12} className="text-blue-400" />
            <span>Drag handles to connect nodes</span>
          </p>
          <p className="flex items-center gap-2">
            <ArrowRight size={12} className="text-green-400" />
            <span>Double-click node to delete</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// Draggable Item Component
interface DraggableItemProps {
  service: ServiceItem;
  isDragging: boolean;
  onDragStart: (event: React.DragEvent) => void;
  onDragEnd: () => void;
}

const DraggableItem: React.FC<DraggableItemProps> = ({
  service,
  isDragging,
  onDragStart,
  onDragEnd,
}) => {
  const IconComponent = iconMap[service.iconName] || Box;

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className={`
        relative group cursor-grab active:cursor-grabbing transition-all duration-200
        hover:scale-[1.02] hover:translate-x-1
        ${isDragging ? "opacity-40" : "opacity-100"}
      `}
    >
      <div className="relative flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-shadow duration-300"
          style={{
            backgroundColor: `${service.color}20`,
            color: service.color,
            boxShadow: `0 0 15px ${service.color}20`,
          }}
        >
          <IconComponent size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-sm font-medium text-gray-200 block truncate">
            {service.label}
          </span>
          <span className="text-xs text-gray-500 block truncate">
            {service.description}
          </span>
        </div>
        <GripVertical
          size={14}
          className="text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </div>
    </div>
  );
};

// ============================================
// STATS BAR COMPONENT
// ============================================
interface StatsBarProps {
  nodesCount: number;
  edgesCount: number;
  onClear: () => void;
}

const StatsBar: React.FC<StatsBarProps> = ({
  nodesCount,
  edgesCount,
  onClear,
}) => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="flex items-center gap-4"
    >
      {/* Nodes Counter */}
      <motion.div
        className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl"
        whileHover={{ scale: 1.02 }}
      >
        <Box size={18} className="text-[#9C4C9D]" />
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-400">Services</span>
          <motion.span
            className="text-xl font-bold text-white min-w-[20px] text-center"
            key={nodesCount}
            initial={{ scale: 1.5, color: "#9C4C9D" }}
            animate={{ scale: 1, color: "#ffffff" }}
            transition={{ duration: 0.3 }}
          >
            {nodesCount}
          </motion.span>
        </div>
      </motion.div>

      {/* Edges Counter */}
      <motion.div
        className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl"
        whileHover={{ scale: 1.02 }}
      >
        <Link2 size={18} className="text-blue-400" />
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-400">Connections</span>
          <motion.span
            className="text-xl font-bold text-white min-w-[20px] text-center"
            key={edgesCount}
            initial={{ scale: 1.5, color: "#60A5FA" }}
            animate={{ scale: 1, color: "#ffffff" }}
            transition={{ duration: 0.3 }}
          >
            {edgesCount}
          </motion.span>
        </div>
      </motion.div>

      {/* Divider */}
      <div className="w-px h-10 bg-white/10" />

      {/* Clear Button */}
      <motion.button
        onClick={onClear}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-5 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all text-sm font-medium"
      >
        <RotateCcw size={16} />
        Clear Board
      </motion.button>
    </motion.div>
  );
};

// ============================================
// MAIN WORKFLOW CANVAS COMPONENT
// ============================================
const WorkflowCanvasContent: React.FC = () => {
  const router = useRouter();
  const locale = useLocale();

  // Global state from Zustand store
  const {
    nodes: storeNodes,
    edges: storeEdges,
    setNodes: setStoreNodes,
    setEdges: setStoreEdges,
    clearBoard,
  } = useWorkflowStore();

  // Local React Flow state - initialize empty, hydrate from store once
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const hasHydrated = useRef(false);
  const storeSyncTimeout = useRef<NodeJS.Timeout | null>(null);

  // Initialize from store once after mount
  useEffect(() => {
    if (!hasHydrated.current) {
      setNodes(storeNodes);
      setEdges(storeEdges);
      hasHydrated.current = true;
    }
  }, []); // Empty dependency array - only run once on mount

  // Sync local changes back to store (debounced to avoid loops)
  useEffect(() => {
    if (hasHydrated.current) {
      if (storeSyncTimeout.current) clearTimeout(storeSyncTimeout.current);
      storeSyncTimeout.current = setTimeout(() => {
        setStoreNodes(nodes);
      }, 300);
    }
    return () => {
      if (storeSyncTimeout.current) clearTimeout(storeSyncTimeout.current);
    };
  }, [nodes, setStoreNodes]);

  useEffect(() => {
    if (hasHydrated.current) {
      if (storeSyncTimeout.current) clearTimeout(storeSyncTimeout.current);
      storeSyncTimeout.current = setTimeout(() => {
        setStoreEdges(edges);
      }, 300);
    }
    return () => {
      if (storeSyncTimeout.current) clearTimeout(storeSyncTimeout.current);
    };
  }, [edges, setStoreEdges]);

  // Handle connections between nodes
  const onConnect = useCallback(
    (connection: Connection) => {
      const newEdge: Edge = {
        id: `edge-${Date.now()}`,
        source: connection.source!,
        target: connection.target!,
        sourceHandle: connection.sourceHandle,
        targetHandle: connection.targetHandle,
        type: "smoothstep",
        animated: true,
        style: {
          stroke: "#9C4C9D",
          strokeWidth: 3,
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: "#9C4C9D",
        },
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges],
  );

  // Handle node removal on double click
  const onNodeDoubleClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      setNodes((nds) => nds.filter((n: Node) => n.id !== node.id));
      setEdges((eds) =>
        eds.filter((e: Edge) => e.source !== node.id && e.target !== node.id),
      );
    },
    [setNodes, setEdges],
  );

  // Handle drag start from sidebar
  const onDragStart = (event: React.DragEvent, service: ServiceItem) => {
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(service),
    );
    event.dataTransfer.effectAllowed = "copy";
  };

  // Handle drag over canvas
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
    setIsDraggingOver(true);
  }, []);

  // Handle drag leave
  const onDragLeave = useCallback(() => {
    setIsDraggingOver(false);
  }, []);

  // Handle drop on canvas - PERSISTENT LOGIC
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      setIsDraggingOver(false);

      const data = event.dataTransfer.getData("application/reactflow");
      if (!data || !reactFlowInstance) return;

      const service: ServiceItem = JSON.parse(data);

      // Calculate exact drop position using React Flow's screenToFlowPosition
      const position: XYPosition = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      // Create new node with unique ID
      const newNode: Node = {
        id: `node-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type: "custom",
        position,
        data: {
          label: service.label,
          iconName: service.iconName,
          color: service.color,
          description: service.description,
        },
      };

      // Add node to state - THIS MAKES IT PERSISTENT
      setNodes((nds: Node[]) => [...nds, newNode]);
    },
    [reactFlowInstance, setNodes],
  );

  // Clear all nodes and edges
  const handleClear = useCallback(() => {
    clearBoard();
    setNodes([]);
    setEdges([]);
  }, [clearBoard, setNodes, setEdges]);

  // Navigate back to home
  const handleBackToHome = useCallback(() => {
    router.push(`/${locale}`);
  }, [router, locale]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-slate-950">
      {/* Space Background */}
      <SpaceBackground />

      {/* Main Layout */}
      <div className="relative z-10 flex h-full">
        {/* Sidebar */}
        <Sidebar onDragStart={onDragStart} onBackToHome={handleBackToHome} />

        {/* React Flow Canvas */}
        <div className="flex-1 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onNodeDoubleClick={onNodeDoubleClick}
            nodeTypes={nodeTypes}
            fitView
            attributionPosition="bottom-right"
            className="bg-transparent"
            snapToGrid={true}
            snapGrid={[15, 15]}
            connectionMode={ConnectionMode.Loose}
            defaultEdgeOptions={{
              type: "smoothstep",
              animated: true,
            }}
          >
            {/* Custom Background */}
            <Background
              color="rgba(255,255,255,0.05)"
              gap={50}
              size={1}
              className="bg-transparent"
            />

            {/* Grid Pattern Overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-30"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
                `,
                backgroundSize: "50px 50px",
              }}
            />

            {/* Controls */}
            <Controls className="!bg-slate-950/50 !border-white/10 !backdrop-blur-xl" />

            {/* Mini Map */}
            <MiniMap
              className="!bg-slate-950/50 !border-white/10 !backdrop-blur-xl !rounded-xl"
              nodeStrokeWidth={3}
              zoomable
              pannable
              nodeColor={(node) => (node.data?.color as string) || "#9C4C9D"}
              maskColor="rgba(0,0,0,0.7)"
            />

            {/* Drop Zone Indicator */}
            <AnimatePresence>
              {nodes.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center"
                  >
                    <motion.div
                      className="w-28 h-28 mx-auto mb-6 rounded-3xl border-2 border-dashed border-white/20 flex items-center justify-center backdrop-blur-sm"
                      animate={{
                        borderColor: [
                          "rgba(255,255,255,0.2)",
                          "rgba(156,76,157,0.5)",
                          "rgba(255,255,255,0.2)",
                        ],
                        boxShadow: [
                          "0 0 0px rgba(156,76,157,0)",
                          "0 0 30px rgba(156,76,157,0.3)",
                          "0 0 0px rgba(156,76,157,0)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Layers size={48} className="text-white/30" />
                    </motion.div>
                    <p className="text-gray-300 text-xl font-semibold">
                      Drop components here
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                      Drag items from the sidebar to start building
                    </p>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            {/* Drag Over Indicator */}
            <AnimatePresence>
              {isDraggingOver && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="px-8 py-4 rounded-2xl bg-[#9C4C9D]/80 backdrop-blur-xl border border-white/30 text-white text-lg font-medium shadow-2xl"
                  >
                    Drop to add component
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            {/* Stats Bar - Bottom Panel */}
            <Panel position="bottom-center" className="m-4">
              <StatsBar
                nodesCount={nodes.length}
                edgesCount={edges.length}
                onClear={handleClear}
              />
            </Panel>
          </ReactFlow>
        </div>
      </div>
    </div>
  );
};

// ============================================
// WRAPPER WITH PROVIDER
// ============================================
const ReactFlowCanvas: React.FC = () => {
  return (
    <ReactFlowProvider>
      <WorkflowCanvasContent />
    </ReactFlowProvider>
  );
};

export default ReactFlowCanvas;
