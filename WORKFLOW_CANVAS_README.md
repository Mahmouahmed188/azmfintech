# Advanced Workflow Canvas

A sophisticated, interactive drag-and-drop workflow builder component for Next.js with space-themed animations and dynamic connections.

## Features

### 🎯 Core Functionality

#### 1. **Persistent Drag & Drop**
- Components stay exactly where dropped on the canvas
- Smooth animations during drag operations
- Visual feedback when dragging over the drop zone
- RTL (Right-to-Left) support for Arabic language

#### 2. **Node Connections**
- Click on a node's connection point, then click another node to create a connection
- Animated energy-flow lines between connected nodes
- Bezier curves for smooth visual paths
- Lines update dynamically as nodes move

#### 3. **Idle Animations**
- Nodes have a gentle floating/breathing animation
- Pulsing glow effects on icons
- Smooth scaling on hover
- Each node has slightly different animation timing for organic feel

#### 4. **Stats Dashboard**
- Real-time counter for total nodes
- Real-time counter for total connections
- Animated number transitions when counts change
- Sleek glassmorphism design

#### 5. **Clear Board Functionality**
- "Clear All" button to reset the entire canvas
- Removes all nodes and connections
- Resets counters to zero
- Smooth exit animations

### 🎨 Visual Design

#### Space-Themed Background
- Deep space gradient with nebula clouds
- Animated stars with twinkling effects
- Shooting stars animation
- Parallax effect responding to mouse movement
- Subtle grid overlay

#### Glassmorphism UI
- Translucent panels with backdrop blur
- Glowing borders and shadows
- Modern color palette with primary purple accents
- Dark theme optimized for workflow visualization

#### Component Styling
- 8 predefined component types with unique colors:
  - 🔵 Cloud Service (Blue)
  - 🟢 Database (Green)
  - 🟣 AI Engine (Purple)
  - 🟡 API Gateway (Orange)
  - 🔴 Server (Red)
  - 🩷 Security (Pink)
  - 🩵 Automation (Teal)
  - 🔵 Container (Indigo)

## Usage

### As a Full Page
```tsx
// app/[locale]/workflow-demo/page.tsx
import AdvancedWorkflowCanvas from "@/components/sections/AdvancedWorkflowCanvas";

export default function WorkflowDemoPage() {
  return <AdvancedWorkflowCanvas />;
}
```

### State Management

The component uses React hooks for state management:

```typescript
const [nodes, setNodes] = useState<NodeType[]>([]);
const [connections, setConnections] = useState<ConnectionType[]>([]);
const [selectedNode, setSelectedNode] = useState<string | null>(null);
const [connectingFrom, setConnectingFrom] = useState<string | null>(null);
```

### Key Functions

- **handleDragEnd**: Handles dropping new nodes and moving existing ones
- **handleConnectStart**: Manages connection creation between nodes
- **handleRemoveNode**: Removes a node and its connections
- **handleClearAll**: Resets the entire canvas

## Technical Stack

- **Framework**: Next.js 16+ with App Router
- **Styling**: Tailwind CSS with custom animations
- **Drag & Drop**: @dnd-kit/core, @dnd-kit/sensors
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **i18n**: next-intl for internationalization

## File Structure

```
src/components/sections/
├── AdvancedWorkflowCanvas.tsx    # Main workflow canvas component
├── InteractiveHero.tsx           # Smaller hero section version
└── WorkflowBuilder.tsx           # Alternative full-page version
```

## Customization

### Adding New Components

Edit the `availableComponents` array in `AdvancedWorkflowCanvas.tsx`:

```typescript
{
  id: "new-component",
  type: "new-type",
  label: "New Component",
  icon: <Icon size={20} />,
  color: "#HEXCODE",
  category: "services", // or "infrastructure" or "connections"
  description: "Description here",
}
```

### Modifying Background Animation

The `SpaceBackground` component handles all background animations:
- Adjust particle count in the useEffect hook
- Modify nebula colors and positions
- Change star animation durations
- Customize shooting star timing

### Styling Changes

The component uses Tailwind CSS classes:
- Colors reference CSS variables or Tailwind's color palette
- Glassmorphism effects use `backdrop-blur` and opacity classes
- Glow effects use box-shadow with color values

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Considerations

- Background particles are limited to 50 for performance
- Animations use CSS transforms and opacity for GPU acceleration
- Connections use SVG with minimal DOM updates
- Components are memoized where appropriate

## Accessibility

- Keyboard navigation support via @dnd-kit
- High contrast mode support
- Screen reader compatible labels
- Focus indicators on interactive elements
