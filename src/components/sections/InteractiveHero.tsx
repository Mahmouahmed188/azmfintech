"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  ReactFlowProvider,
  MarkerType,
  NodeProps,
  Handle,
  Position,
  XYPosition,
  NodeTypes,
  ConnectionMode,
} from "@xyflow/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Cloud,
  Database,
  Cpu,
  Globe,
  Server,
  Zap,
  Shield,
  Box,
  Maximize2,
  Layers,
  Link2,
  RotateCcw,
  GripVertical,
  X,
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
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

interface AvailableService {
  id: string;
  type: string;
  iconName: string;
  color: string;
  category: "services" | "connections" | "infrastructure";
}

interface NodeData extends Record<string, unknown> {
  label: string;
  iconName: string;
  color: string;
  description: string;
}

// ============================================
// AVAILABLE SERVICES (Mini version for hero)
// ============================================
const availableServices: AvailableService[] = [
  {
    id: "cloud",
    type: "cloud",
    iconName: "Cloud",
    color: "#3B82F6",
    category: "services",
  },
  {
    id: "database",
    type: "database",
    iconName: "Database",
    color: "#10B981",
    category: "infrastructure",
  },
  {
    id: "ai",
    type: "ai",
    iconName: "Cpu",
    color: "#8B5CF6",
    category: "services",
  },
  {
    id: "api",
    type: "api",
    iconName: "Globe",
    color: "#F59E0B",
    category: "connections",
  },
  {
    id: "server",
    type: "server",
    iconName: "Server",
    color: "#EF4444",
    category: "infrastructure",
  },
  {
    id: "automation",
    type: "automation",
    iconName: "Zap",
    color: "#14B8A6",
    category: "services",
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
// CUSTOM NODE COMPONENT WITH FLOATING ANIMATION
// ============================================
const CustomNode: React.FC<NodeProps> = (props) => {
  const data = props.data as NodeData;
  const selected = props.selected;
  const color = data.color;
  const label = data.label;
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
        animate={{ y: [0, -3, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Main Node Card */}
        <div
          className={`
            relative px-3 py-2 rounded-xl border backdrop-blur-sm
            transition-all duration-300 cursor-grab active:cursor-grabbing
            ${
              selected
                ? "border-white/60 bg-white/20 shadow-xl"
                : "border-white/20 bg-white/10 hover:border-white/40 hover:bg-white/15"
            }
          `}
          style={{
            boxShadow: selected
              ? `0 0 30px ${color}40, inset 0 0 10px ${color}10`
              : `0 4px 15px -5px rgba(0,0,0,0.3)`,
            minWidth: "100px",
          }}
        >
          {/* Glow Effect */}
          <div
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-lg"
            style={{ backgroundColor: color }}
          />

          {/* Node Content */}
          <div className="flex items-center gap-2">
            <motion.div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{
                backgroundColor: `${color}25`,
                color: color,
                boxShadow: `0 0 15px ${color}30`,
              }}
              animate={{
                boxShadow: [
                  `0 0 8px ${color}20`,
                  `0 0 20px ${color}40`,
                  `0 0 8px ${color}20`,
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <IconComponent size={16} />
            </motion.div>
            <span className="text-xs font-medium text-white whitespace-nowrap">
              {label}
            </span>
          </div>

          {/* Connection Handles */}
          <Handle
            type="target"
            position={Position.Left}
            className="!w-2.5 !h-2.5 !bg-white/50 !border-2 !border-white/80 hover:!bg-[#9C4C9D] hover:!border-white transition-all"
            style={{ left: -5 }}
          />
          <Handle
            type="source"
            position={Position.Right}
            className="!w-2.5 !h-2.5 !bg-white/50 !border-2 !border-white/80 hover:!bg-[#9C4C9D] hover:!border-white transition-all"
            style={{ right: -5 }}
          />
          <Handle
            type="target"
            position={Position.Top}
            className="!w-2.5 !h-2.5 !bg-white/50 !border-2 !border-white/80 hover:!bg-[#9C4C9D] hover:!border-white transition-all opacity-0"
            style={{ top: -5 }}
          />
          <Handle
            type="source"
            position={Position.Bottom}
            className="!w-2.5 !h-2.5 !bg-white/50 !border-2 !border-white/80 hover:!bg-[#9C4C9D] hover:!border-white transition-all opacity-0"
            style={{ bottom: -5 }}
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
// SIDEBAR COMPONENT (Right Side)
// ============================================
interface SidebarProps {
  onDragStart: (event: React.DragEvent, service: AvailableService) => void;
  onExpand: () => void;
  onClear: () => void;
  nodesCount: number;
  edgesCount: number;
}

const Sidebar: React.FC<SidebarProps> = ({
  onDragStart,
  onExpand,
  onClear,
  nodesCount,
  edgesCount,
}) => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const handleDragStart = (event: React.DragEvent, service: AvailableService) => {
    setDraggedItem(service.id);
    onDragStart(event, service);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  return (
    <div className="w-16 flex flex-col items-center py-4 gap-3 border-l border-white/10 bg-gray-950/30 backdrop-blur-sm">
      {/* Draggable Components */}
      <div className="flex flex-col gap-2">
        {availableServices.map((service) => (
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
  );
};

// Draggable Item Component
interface DraggableItemProps {
  service: AvailableService;
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
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
      <div
        draggable
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        className={`
          w-10 h-10 rounded-xl flex items-center justify-center cursor-grab active:cursor-grabbing border transition-all
          ${isDragging ? "opacity-40" : "opacity-100 hover:border-white/40"}
        `}
        style={{
          backgroundColor: `${service.color}15`,
          borderColor: `${service.color}30`,
          color: service.color,
        }}
        title={service.id}
      >
        <IconComponent size={18} />
      </div>
    </motion.div>
  );
};

// ============================================
// MAIN INTERACTIVE HERO CANVAS COMPONENT
// ============================================
const InteractiveHeroCanvas: React.FC = () => {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Hero");
  const tServices = useTranslations("InteractiveHero");
  const isRtl = locale === "ar";

  // Global state from Zustand store
  const {
    nodes: storeNodes,
    edges: storeEdges,
    setNodes: setStoreNodes,
    setEdges: setStoreEdges,
    clearBoard,
  } = useWorkflowStore();

  // Local React Flow state - initialize from store only once on mount
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const hasHydrated = useRef(false);

  // Initialize from store once after hydration
  useEffect(() => {
    if (!hasHydrated.current) {
      setNodes(storeNodes);
      setEdges(storeEdges);
      hasHydrated.current = true;
    }
  }, []); // Empty dependency array - only run once on mount

  // Sync local changes back to store (debounced to avoid loops)
  const storeSyncTimeout = useRef<NodeJS.Timeout | null>(null);

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
          strokeWidth: 2,
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
  const onDragStart = (event: React.DragEvent, service: AvailableService) => {
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

      const service: AvailableService = JSON.parse(data);

      // Calculate exact drop position using React Flow's screenToFlowPosition
      const position: XYPosition = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const label = (tServices as any)(`services.${service.id}.label`);
      const description = (tServices as any)(`services.${service.id}.description`);

      // Create new node with unique ID
      const newNode: Node = {
        id: `node-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type: "custom",
        position,
        data: {
          label,
          iconName: service.iconName,
          color: service.color,
          description,
        },
      };

      // Add node to state - THIS MAKES IT PERSISTENT
      setNodes((nds: Node[]) => [...nds, newNode]);
    },
    [reactFlowInstance, setNodes, tServices],
  );

  // Handle expand to full workflow
  const handleExpand = useCallback(() => {
    router.push(`/${locale}/workflow-demo`);
  }, [router, locale]);

  // Handle clear board
  const handleClear = useCallback(() => {
    clearBoard();
    setNodes([]);
    setEdges([]);
    // Keep isInitialized true since we've explicitly set the state
  }, [clearBoard, setNodes, setEdges]);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden  from-gray-900 via-gray-900 to-gray-800">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-1/4 ${isRtl ? "right-1/4" : "left-1/4"} -z-10 w-96 h-96 bg-primary/20 rounded-full blur-[120px]`}
        />
        <div
          className={`absolute bottom-1/4 ${isRtl ? "left-1/4" : "right-1/4"} -z-10 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]`}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-semibold mb-6 border border-primary/30">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-white">{t("badge")}</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white leading-[1.2] mb-8">
            {t("title_main")}{" "}
            <span className="text-primary italic">{t("title_highlight")}</span>{" "}
            {t("title_sub")}
          </h1>

          <p className="text-lg text-gray-300 mb-8 max-w-xl leading-relaxed">
            {t("description")}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/30 flex items-center justify-center gap-2 group">
              <span>{t("cta_consultation")}</span>
              <ArrowRight
                size={20}
                className={`group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform`}
              />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white/10 text-white font-bold rounded-2xl border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center gap-2 group backdrop-blur-sm">
              <span>{t("cta_case_studies")}</span>
              <ChevronRight
                size={20}
                className={`group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform text-gray-400`}
              />
            </button>
          </div>
        </motion.div>

        {/* Right Interactive Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative"
        >
          {/* Main Interactive Board */}
          <div className="relative z-10 bg-gray-950/40 backdrop-blur-xl rounded-[32px] border border-white/20 shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400">
                  {tServices("interactive_canvas")}
                </span>
                <motion.button
                  onClick={handleExpand}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-xs text-white hover:bg-white/20 hover:border-white/40 transition-all"
                >
                  <Maximize2 size={12} />
                  <span>{tServices("expand")}</span>
                </motion.button>
              </div>
            </div>

            {/* Canvas Area with React Flow */}
            <div className="flex h-100">
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
                  proOptions={{ hideAttribution: true }}
                >
                  {/* Custom Background */}
                  <Background
                    color="rgba(255,255,255,0.05)"
                    gap={30}
                    size={1}
                    className="bg-transparent"
                  />

                  {/* Grid Pattern Overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-30"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
                      `,
                      backgroundSize: "30px 30px",
                    }}
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
                            className="w-16 h-16 mx-auto mb-3 rounded-2xl border-2 border-dashed border-white/20 flex items-center justify-center backdrop-blur-sm"
                            animate={{
                              borderColor: [
                                "rgba(255,255,255,0.2)",
                                "rgba(156,76,157,0.5)",
                                "rgba(255,255,255,0.2)",
                              ],
                              boxShadow: [
                                "0 0 0px rgba(156,76,157,0)",
                                "0 0 20px rgba(156,76,157,0.3)",
                                "0 0 0px rgba(156,76,157,0)",
                              ],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Cloud size={28} className="text-white/30" />
                          </motion.div>
                          <p className="text-gray-400 text-sm font-medium">
                            {tServices("drop_components_here")}
                          </p>
                          <p className="text-gray-500 text-xs mt-1">
                            {tServices("drag_from_sidebar")}
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
                          className="px-6 py-3 rounded-xl bg-[#9C4C9D]/80 backdrop-blur-xl border border-white/30 text-white text-sm font-medium shadow-xl"
                        >
                          {tServices("drop_to_add")}
                        </motion.div>
                      </div>
                    )}
                  </AnimatePresence>
                </ReactFlow>
              </div>

              {/* Right Sidebar */}
              <Sidebar
                onDragStart={onDragStart}
                onExpand={handleExpand}
                onClear={handleClear}
                nodesCount={nodes.length}
                edgesCount={edges.length}
              />
            </div>
          </div>

          {/* Glow Effect */}
          <div className="absolute -inset-px rounded-[32px] bg-gradient-to-r from-primary/20 via-purple-500/20 to-blue-500/20 -z-10 blur-xl opacity-50" />

          {/* Background Glow */}
          <div className="absolute -inset-8 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-[50px] -z-20 blur-3xl" />
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// WRAPPER WITH PROVIDER
// ============================================
const InteractiveHero: React.FC = () => {
  return (
    <ReactFlowProvider>
      <InteractiveHeroCanvas />
    </ReactFlowProvider>
  );
};

export default InteractiveHero;
