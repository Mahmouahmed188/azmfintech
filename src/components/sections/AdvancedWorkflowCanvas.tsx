"use client";

import React, { useState, useCallback, useRef, useEffect, useMemo } from "react";
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
} from "@dnd-kit/core";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
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
  Trash2,
  X,
  Link2,
  MousePointer2,
  Sparkles,
  Workflow,
  RotateCcw,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

// ============================================
// TYPES
// ============================================
interface ComponentType {
  id: string;
  type: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  category: "services" | "connections" | "infrastructure";
  description?: string;
}

interface NodeType {
  id: string;
  componentId: string;
  x: number;
  y: number;
  label: string;
  icon: React.ReactNode;
  color: string;
  createdAt: number;
}

interface ConnectionType {
  id: string;
  from: string;
  to: string;
  createdAt: number;
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
// AVAILABLE COMPONENTS
// ============================================
const availableComponents: ComponentType[] = [
  {
    id: "cloud",
    type: "cloud",
    label: "Cloud Service",
    icon: <Cloud size={20} />,
    color: "#3B82F6",
    category: "services",
    description: "Scalable cloud infrastructure",
  },
  {
    id: "database",
    type: "database",
    label: "Database",
    icon: <Database size={20} />,
    color: "#10B981",
    category: "infrastructure",
    description: "Secure data storage",
  },
  {
    id: "ai",
    type: "ai",
    label: "AI Engine",
    icon: <Cpu size={20} />,
    color: "#8B5CF6",
    category: "services",
    description: "Machine learning models",
  },
  {
    id: "api",
    type: "api",
    label: "API Gateway",
    icon: <Globe size={20} />,
    color: "#F59E0B",
    category: "connections",
    description: "API management & routing",
  },
  {
    id: "server",
    type: "server",
    label: "Server",
    icon: <Server size={20} />,
    color: "#EF4444",
    category: "infrastructure",
    description: "Compute resources",
  },
  {
    id: "security",
    type: "security",
    label: "Security",
    icon: <Shield size={20} />,
    color: "#EC4899",
    category: "services",
    description: "Protection & encryption",
  },
  {
    id: "automation",
    type: "automation",
    label: "Automation",
    icon: <Zap size={20} />,
    color: "#14B8A6",
    category: "services",
    description: "Workflow automation",
  },
  {
    id: "container",
    type: "container",
    label: "Container",
    icon: <Box size={20} />,
    color: "#6366F1",
    category: "infrastructure",
    description: "Containerized applications",
  },
];

// ============================================
// SPACE BACKGROUND COMPONENT
// ============================================
const SpaceBackground: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<ParticleType[]>([]);

  useEffect(() => {
    // Generate random particles
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
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
        animate={{
          x: mousePos.x * 0.5,
          y: mousePos.y * 0.5,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 30 }}
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <motion.div
        animate={{
          x: -mousePos.x * 0.3,
          y: -mousePos.y * 0.3,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 30 }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />
      <motion.div
        animate={{
          x: mousePos.x * 0.4,
          y: -mousePos.y * 0.4,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 30 }}
        className="absolute top-1/2 right-1/3 w-[400px] h-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)",
          filter: "blur(40px)",
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
          boxShadow: "0 0 10px 2px rgba(255,255,255,0.8), 0 0 20px 4px rgba(139,92,246,0.5)",
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
          boxShadow: "0 0 10px 2px rgba(255,255,255,0.8), 0 0 20px 4px rgba(59,130,246,0.5)",
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

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
        }}
      />
    </div>
  );
};

// ============================================
// TOOLBOX ITEM COMPONENT
// ============================================
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
      <div className="relative flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
        <motion.div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{
            backgroundColor: `${component.color}20`,
            color: component.color,
            boxShadow: `0 0 20px ${component.color}20`,
          }}
          whileHover={{
            boxShadow: `0 0 30px ${component.color}40`,
          }}
        >
          {component.icon}
        </motion.div>
        <div className="flex-1 min-w-0">
          <span className="text-sm font-medium text-gray-200 block truncate">
            {component.label}
          </span>
          <span className="text-xs text-gray-500 block truncate">
            {component.description}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================
// CANVAS NODE COMPONENT
// ============================================
const CanvasNode: React.FC<{
  node: NodeType;
  isSelected: boolean;
  isConnecting: boolean;
  onSelect: () => void;
  onRemove: () => void;
  onConnectStart: () => void;
}> = ({ node, isSelected, isConnecting, onSelect, onRemove, onConnectStart }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
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
        position: "absolute",
      }}
      {...listeners}
      {...attributes}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      className={`cursor-grab active:cursor-grabbing z-10 ${
        isSelected ? "z-30" : "z-10"
      } ${isDragging ? "z-40" : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      <motion.div
        className={`relative group px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
          isSelected
            ? "border-white/60 bg-white/20 shadow-lg"
            : "border-white/10 bg-white/10 hover:border-white/30"
        } ${isConnecting ? "ring-2 ring-primary ring-offset-2 ring-offset-transparent" : ""}`}
        style={{
          boxShadow: isSelected ? `0 0 40px ${node.color}40, inset 0 0 20px ${node.color}10` : undefined,
          backdropFilter: "blur(10px)",
        }}
        animate={{
          y: [0, -3, 0],
        }}
        transition={{
          y: {
            duration: 3 + (node.createdAt % 3),
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        whileHover={{
          scale: 1.05,
          boxShadow: `0 0 30px ${node.color}50`,
        }}
      >
        <div className="flex items-center gap-3">
          <motion.div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{
              backgroundColor: `${node.color}30`,
              color: node.color,
            }}
            animate={{
              boxShadow: [
                `0 0 10px ${node.color}20`,
                `0 0 25px ${node.color}40`,
                `0 0 10px ${node.color}20`,
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {node.icon}
          </motion.div>
          <span className="text-sm font-medium text-white whitespace-nowrap">
            {node.label}
          </span>
        </div>

        {/* Connection points */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            onConnectStart();
          }}
          className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white/30 hover:bg-primary hover:scale-150 transition-all opacity-0 group-hover:opacity-100 border-2 border-white/50"
          whileHover={{ scale: 1.5 }}
          whileTap={{ scale: 0.9 }}
        />

        {/* Remove button */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500/80 hover:bg-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all border border-white/20"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X size={14} className="text-white" />
        </motion.button>

        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"
          style={{ backgroundColor: node.color }}
        />
      </motion.div>
    </motion.div>
  );
};

// ============================================
// STATS COUNTER COMPONENT
// ============================================
const StatsCounter: React.FC<{ nodes: number; connections: number }> = ({
  nodes,
  connections,
}) => {
  return (
    <div className="flex items-center gap-4">
      <motion.div
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        key={nodes}
      >
        <Box size={16} className="text-primary" />
        <span className="text-sm font-medium text-gray-300">Nodes:</span>
        <motion.span
          className="text-lg font-bold text-white"
          key={nodes}
          initial={{ scale: 1.5, color: "#9C4C9D" }}
          animate={{ scale: 1, color: "#ffffff" }}
          transition={{ duration: 0.3 }}
        >
          {nodes}
        </motion.span>
      </motion.div>

      <motion.div
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        key={connections}
      >
        <Link2 size={16} className="text-blue-400" />
        <span className="text-sm font-medium text-gray-300">Connections:</span>
        <motion.span
          className="text-lg font-bold text-white"
          key={connections}
          initial={{ scale: 1.5, color: "#60A5FA" }}
          animate={{ scale: 1, color: "#ffffff" }}
          transition={{ duration: 0.3 }}
        >
          {connections}
        </motion.span>
      </motion.div>
    </div>
  );
};

// ============================================
// MAIN ADVANCED WORKFLOW CANVAS
// ============================================
const AdvancedWorkflowCanvas: React.FC = () => {
  const t = useTranslations("Hero");
  const locale = useLocale();
  const isRtl = locale === "ar";

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

  // Handle drag start
  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveDragItem(event.active.data.current);
  }, []);

  // Handle drag end - PERSISTENT DROP
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
          // Calculate position relative to canvas
          const canvasX = isRtl 
            ? canvasRect.width - (active.rect.current.translated?.left || 0) + canvasRect.left - 100
            : (active.rect.current.translated?.left || 0) - canvasRect.left;
          const canvasY = (active.rect.current.translated?.top || 0) - canvasRect.top;

          const newNode: NodeType = {
            id: `node-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            componentId: component.id,
            x: Math.max(20, Math.min(canvasX, canvasRect.width - 150)),
            y: Math.max(20, Math.min(canvasY, canvasRect.height - 80)),
            label: component.label,
            icon: component.icon,
            color: component.color,
            createdAt: Date.now(),
          };
          setNodes((prev) => [...prev, newNode]);
        }
      }

      // Handle moving existing nodes - PERSISTENT POSITION
      if (active.data.current?.node && over.id === "canvas") {
        const nodeId = active.id as string;
        setNodes((prev) =>
          prev.map((n) =>
            n.id === nodeId
              ? {
                  ...n,
                  x: Math.max(20, n.x + delta.x),
                  y: Math.max(20, n.y + delta.y),
                }
              : n
          )
        );
      }

      setActiveDragItem(null);
    },
    [isRtl]
  );

  // Handle connection start
  const handleConnectStart = useCallback(
    (nodeId: string) => {
      if (connectingFrom === null) {
        setConnectingFrom(nodeId);
      } else if (connectingFrom === nodeId) {
        // Cancel connection
        setConnectingFrom(null);
      } else {
        // Create connection
        const existingConnection = connections.find(
          (c) =>
            (c.from === connectingFrom && c.to === nodeId) ||
            (c.from === nodeId && c.to === connectingFrom)
        );
        if (!existingConnection) {
          setConnections((prev) => [
            ...prev,
            {
              id: `conn-${Date.now()}`,
              from: connectingFrom,
              to: nodeId,
              createdAt: Date.now(),
            },
          ]);
        }
        setConnectingFrom(null);
      }
    },
    [connectingFrom, connections]
  );

  // Handle node removal
  const handleRemoveNode = useCallback(
    (nodeId: string) => {
      setNodes((prev) => prev.filter((n) => n.id !== nodeId));
      setConnections((prev) =>
        prev.filter((c) => c.from !== nodeId && c.to !== nodeId)
      );
      if (selectedNode === nodeId) setSelectedNode(null);
      if (connectingFrom === nodeId) setConnectingFrom(null);
    },
    [selectedNode, connectingFrom]
  );

  // Handle clear all
  const handleClearAll = useCallback(() => {
    setNodes([]);
    setConnections([]);
    setSelectedNode(null);
    setConnectingFrom(null);
  }, []);

  // Generate SVG paths for connections with animation
  const renderConnections = () => {
    return connections.map((conn, index) => {
      const fromNode = nodes.find((n) => n.id === conn.from);
      const toNode = nodes.find((n) => n.id === conn.to);

      if (!fromNode || !toNode) return null;

      // Calculate connection points
      const x1 = fromNode.x + 130;
      const y1 = fromNode.y + 28;
      const x2 = toNode.x + 20;
      const y2 = toNode.y + 28;

      // Create bezier curve
      const midX = (x1 + x2) / 2;
      const path = `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`;

      return (
        <g key={conn.id}>
          {/* Animated gradient line */}
          <motion.path
            d={path}
            fill="none"
            stroke="url(#energyGradient)"
            strokeWidth="3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
            className="pointer-events-none"
            style={{
              filter: "drop-shadow(0 0 8px rgba(156, 76, 157, 0.6))",
            }}
          />
          {/* Flow animation overlay */}
          <motion.path
            d={path}
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeDasharray="10 20"
            initial={{ pathLength: 1, strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: -300 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            className="pointer-events-none opacity-60"
          />
        </g>
      );
    });
  };

  const { setNodeRef, isOver } = useDroppable({
    id: "canvas",
  });

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Space Background */}
      <SpaceBackground />

      {/* Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-20 px-6 py-5 border-b border-white/10 backdrop-blur-md bg-black/20"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg"
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
              <Workflow className="text-white" size={24} />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold text-white">
                Workflow Builder
              </h1>
              <p className="text-sm text-gray-400">
                Drag components to build your architecture
              </p>
            </div>
          </div>

          {/* Stats & Actions */}
          <div className="flex items-center gap-6">
            <StatsCounter nodes={nodes.length} connections={connections.length} />
            
            <motion.button
              onClick={handleClearAll}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all text-sm font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <RotateCcw size={16} />
              Clear All
            </motion.button>
            
            <motion.button
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium transition-all shadow-lg shadow-primary/30"
              whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(156,76,157,0.5)" }}
              whileTap={{ scale: 0.98 }}
            >
              <Sparkles size={18} />
              Deploy
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="relative z-10 flex h-[calc(100vh-90px)]">
          {/* Sidebar / Toolbox */}
          <motion.div
            initial={{ x: -350, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="w-80 bg-slate-950/50 backdrop-blur-xl border-r border-white/10 flex flex-col"
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

              {/* Infrastructure Category */}
              <div>
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3 px-2">
                  Infrastructure
                </h3>
                <div className="space-y-2">
                  {availableComponents
                    .filter((c) => c.category === "infrastructure")
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

            {/* Instructions */}
            <div className="p-4 border-t border-white/10">
              <div className="text-xs text-gray-500 space-y-2">
                <p className="flex items-center gap-2">
                  <MousePointer2 size={12} />
                  Click node then click another to connect
                </p>
                <p className="flex items-center gap-2">
                  <Trash2 size={12} />
                  Hover and click × to remove
                </p>
              </div>
            </div>
          </motion.div>

          {/* Canvas */}
          <div className="flex-1 relative overflow-hidden p-6">
            <motion.div
              ref={(node) => {
                setNodeRef(node);
                if (canvasRef) {
                  (canvasRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
                }
              }}
              className={`relative h-full rounded-3xl bg-slate-950/30 backdrop-blur-sm border-2 overflow-hidden transition-all duration-500 ${
                isOver
                  ? "border-primary/50 bg-primary/5"
                  : "border-white/10"
              }`}
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
                    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
                  `,
                  backgroundSize: "50px 50px",
                }}
              />

              {/* Drop Zone Indicator */}
              <AnimatePresence>
                {nodes.length === 0 && !activeDragItem && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                    <div className="text-center">
                      <motion.div
                        className="w-24 h-24 mx-auto mb-6 rounded-3xl border-2 border-dashed border-white/20 flex items-center justify-center"
                        animate={{
                          borderColor: ["rgba(255,255,255,0.2)", "rgba(156,76,157,0.5)", "rgba(255,255,255,0.2)"],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Layers size={40} className="text-white/30" />
                      </motion.div>
                      <p className="text-gray-400 text-xl font-medium">
                        Drop components here
                      </p>
                      <p className="text-gray-500 text-sm mt-3">
                        Drag items from the sidebar to start building
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* SVG Layer for Connections */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
                <defs>
                  <linearGradient
                    id="energyGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#9C4C9D" stopOpacity="1" />
                    <stop offset="50%" stopColor="#3B82F6" stopOpacity="1" />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="1" />
                  </linearGradient>
                </defs>
                {renderConnections()}
              </svg>

              {/* Nodes Layer */}
              <AnimatePresence mode="popLayout">
                {nodes.map((node) => (
                  <CanvasNode
                    key={node.id}
                    node={node}
                    isSelected={selectedNode === node.id}
                    isConnecting={connectingFrom === node.id}
                    onSelect={() => {
                      if (connectingFrom && connectingFrom !== node.id) {
                        handleConnectStart(node.id);
                      } else {
                        setSelectedNode(node.id);
                      }
                    }}
                    onRemove={() => handleRemoveNode(node.id)}
                    onConnectStart={() => handleConnectStart(node.id)}
                  />
                ))}
              </AnimatePresence>

              {/* Connection Mode Indicator */}
              <AnimatePresence>
                {connectingFrom && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-primary/90 text-white text-sm font-medium shadow-2xl backdrop-blur-sm border border-white/20"
                  >
                    Click another node to connect, or click the same node to cancel
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Drag Overlay */}
        <DragOverlay dropAnimation={{ sideEffects: defaultDropAnimationSideEffects({}) }}>
          {activeDragItem?.component ? (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="w-56 p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/30 shadow-2xl"
              style={{
                boxShadow: `0 25px 50px -12px ${activeDragItem.component.color}40`,
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor: `${activeDragItem.component.color}40`,
                    color: activeDragItem.component.color,
                    boxShadow: `0 0 20px ${activeDragItem.component.color}40`,
                  }}
                >
                  {activeDragItem.component.icon}
                </div>
                <span className="text-sm font-medium text-white">
                  {activeDragItem.component.label}
                </span>
              </div>
            </motion.div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </section>
  );
};

export default AdvancedWorkflowCanvas;
