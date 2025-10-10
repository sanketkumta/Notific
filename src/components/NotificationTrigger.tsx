import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import {
  AlertTriangle,
  Plane,
  Settings,
  Zap,
  ShoppingBag,
  Bell,
  Wifi,
  Coffee,
  MapPin,
  Volume2,
  ChevronDown,
  ChevronUp,
  Play,
  Gamepad2,
  Move
} from 'lucide-react';
import { useNotification } from '../context/NotificationContext';
import { Notification, NotificationCategory, PriorityLevel, calculateWeightedScore } from '../types/notification';
import { generateAppNotification } from '../data/notificationData';

const Container = styled.div<{ isExpanded: boolean; isDragging: boolean }>`
  position: fixed;
  background: #f5f5f5;
  border-radius: 16px;
  padding: 20px;
  color: #333333;
  width: ${props => props.isExpanded ? '450px' : '280px'};
  border: 1px solid #e0e0e0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: ${props => props.isDragging ? 'none' : 'all 0.3s ease'};
  max-height: ${props => props.isExpanded ? '85vh' : '70px'};
  overflow: hidden;
  z-index: 900;
  cursor: ${props => props.isDragging ? 'grabbing' : 'default'};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  cursor: grab;
  user-select: none;

  &:active {
    cursor: grabbing;
  }
`;

const DragHandle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #999999;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ExpandButton = styled.button`
  background: none;
  border: none;
  color: #666666;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
`;

const Content = styled.div`
  max-height: calc(85vh - 100px);
  overflow-y: auto;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #e0e0e0;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #cccccc;
    border-radius: 3px;
  }
`;

const Section = styled.div`
  margin-bottom: 24px;
`;

const SectionTitle = styled.h4`
  margin: 0 0 12px 0;
  font-size: 14px;
  color: #666666;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const TriggerGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
`;

const TriggerButton = styled.button<{ priority: PriorityLevel }>`
  background: ${props => {
    switch (props.priority) {
      case PriorityLevel.CRITICAL:
        return '#999999';
      case PriorityLevel.HIGH:
        return '#b3b3b3';
      case PriorityLevel.MEDIUM:
        return '#cccccc';
      default:
        return '#e0e0e0';
    }
  }};
  border: 1px solid #cccccc;
  color: #333333;
  padding: 14px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 11px;
  font-weight: 500;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  min-height: 90px;
  justify-content: center;
`;

const TriggerIcon = styled.div`
  margin-bottom: 6px;
`;

const TriggerName = styled.div`
  font-weight: 600;
  line-height: 1.1;
  font-size: 11px;
`;

const TriggerDescription = styled.div`
  font-size: 9px;
  color: #666666;
  line-height: 1.1;
  text-align: center;
`;

const TriggerScore = styled.div`
  font-size: 10px;
  color: #666666;
  margin-top: 6px;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.3);
  padding: 2px 6px;
  border-radius: 4px;
`;

const FormulaDisplay = styled.div`
  background: #eeeeee;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 12px;
  margin-top: 12px;
  font-size: 11px;
  color: #666666;
`;

const FormulaTitle = styled.div`
  font-weight: 600;
  color: #333333;
  margin-bottom: 6px;
`;

const FormulaText = styled.div`
  font-family: 'Courier New', monospace;
  color: #666666;
  font-size: 11px;
  line-height: 1.4;
`;

const CustomTriggerSection = styled.div`
  background: #eeeeee;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
  border: 1px solid #e0e0e0;
`;

const InputGroup = styled.div`
  margin-bottom: 12px;
`;

const Label = styled.label`
  display: block;
  font-size: 12px;
  margin-bottom: 4px;
  color: #666666;
`;

const Input = styled.input`
  width: 100%;
  background: #ffffff;
  border: 1px solid #cccccc;
  border-radius: 4px;
  padding: 8px;
  color: #333333;
  font-size: 12px;

  &::placeholder {
    color: #999999;
  }

  &:focus {
    outline: none;
    border-color: #999999;
  }
`;

const Select = styled.select`
  width: 100%;
  background: #ffffff;
  border: 1px solid #cccccc;
  border-radius: 4px;
  padding: 8px;
  color: #333333;
  font-size: 12px;

  &:focus {
    outline: none;
    border-color: #999999;
  }

  option {
    background: #ffffff;
    color: #333333;
  }
`;

const CreateButton = styled.button`
  background: #cccccc;
  border: 1px solid #b3b3b3;
  color: #333333;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  width: 100%;
`;

interface TriggerScenario {
  icon: React.ReactNode;
  name: string;
  description: string;
  app: string;
  category: NotificationCategory;
  priority: PriorityLevel;
  message: string;
  trigger: string;
}

const triggerScenarios: TriggerScenario[] = [
  // Safety (Critical)
  {
    icon: <AlertTriangle size={16} />,
    name: 'Seatbelt Alert',
    description: 'Turbulence warning',
    app: 'Flight Safety System',
    category: NotificationCategory.SAFETY,
    priority: PriorityLevel.CRITICAL,
    message: 'Severe turbulence ahead - Return to seat and fasten seatbelt immediately',
    trigger: 'Weather radar detection'
  },
  {
    icon: <AlertTriangle size={16} />,
    name: 'Medical Emergency',
    description: 'Healthcare needed',
    app: 'Emergency Alert System',
    category: NotificationCategory.SAFETY,
    priority: PriorityLevel.CRITICAL,
    message: 'Medical emergency - Healthcare professionals please press call button',
    trigger: 'Emergency button pressed'
  },

  // Operational (High)
  {
    icon: <Plane size={16} />,
    name: 'Flight Delay',
    description: 'Schedule change',
    app: 'Flight Management',
    category: NotificationCategory.OPERATIONAL_INFO,
    priority: PriorityLevel.HIGH,
    message: 'Flight departure delayed by 30 minutes due to air traffic control',
    trigger: 'ATC communication'
  },
  {
    icon: <MapPin size={16} />,
    name: 'Gate Change',
    description: 'Terminal update',
    app: 'Airport Operations',
    category: NotificationCategory.OPERATIONAL_INFO,
    priority: PriorityLevel.HIGH,
    message: 'Gate change: Your connecting flight now departs from Gate C15',
    trigger: 'Airport operations'
  },

  // System (Medium)
  {
    icon: <Wifi size={16} />,
    name: 'WiFi Restored',
    description: 'Network active',
    app: 'WiFi Management',
    category: NotificationCategory.SYSTEM,
    priority: PriorityLevel.MEDIUM,
    message: 'WiFi connection restored - High-speed internet now available',
    trigger: 'Network status change'
  },
  {
    icon: <Settings size={16} />,
    name: 'System Update',
    description: 'Entertainment restart',
    app: 'Entertainment System',
    category: NotificationCategory.SYSTEM,
    priority: PriorityLevel.MEDIUM,
    message: 'Entertainment system updating - Service will resume in 2 minutes',
    trigger: 'Scheduled maintenance'
  },

  // Cross-App (Medium)
  {
    icon: <Zap size={16} />,
    name: 'Upgrade Success',
    description: 'Seat enhancement',
    app: 'Airline Services',
    category: NotificationCategory.CROSS_APP,
    priority: PriorityLevel.MEDIUM,
    message: 'Congratulations! Your upgrade to Business Class has been confirmed',
    trigger: 'Bid upgrade result'
  },
  {
    icon: <Coffee size={16} />,
    name: 'Meal Service',
    description: 'Food announcement',
    app: 'Cabin Service',
    category: NotificationCategory.CROSS_APP,
    priority: PriorityLevel.MEDIUM,
    message: 'Meal service will begin in 10 minutes - Please prepare your tray table',
    trigger: 'Service schedule'
  },

  // Promotional (Low)
  {
    icon: <ShoppingBag size={16} />,
    name: 'Duty Free Sale',
    description: 'Limited offer',
    app: 'Duty Free Shop',
    category: NotificationCategory.NON_SAFETY_PROMOTIONAL,
    priority: PriorityLevel.LOW,
    message: 'Flash sale: 40% off luxury perfumes - Valid for next 20 minutes only',
    trigger: 'Promotional campaign'
  },
  {
    icon: <Volume2 size={16} />,
    name: 'Premium Content',
    description: 'Entertainment unlock',
    app: 'Entertainment Hub',
    category: NotificationCategory.NON_SAFETY_PROMOTIONAL,
    priority: PriorityLevel.LOW,
    message: 'Premium movie collection unlocked - 100+ latest releases available',
    trigger: 'Content library update'
  },

  // Additional individual triggers
  {
    icon: <Plane size={16} />,
    name: 'Landing Prep',
    description: 'Descent started',
    app: 'Flight Operations',
    category: NotificationCategory.OPERATIONAL_INFO,
    priority: PriorityLevel.HIGH,
    message: 'Descent has begun - Please return seats to upright position',
    trigger: 'Flight phase change'
  },
  {
    icon: <Settings size={16} />,
    name: 'Power Issue',
    description: 'Outlet offline',
    app: 'Seat Management',
    category: NotificationCategory.SYSTEM,
    priority: PriorityLevel.MEDIUM,
    message: 'Power outlet at your seat is temporarily unavailable',
    trigger: 'Hardware diagnostic'
  },
  {
    icon: <Wifi size={16} />,
    name: 'WiFi Purchase',
    description: 'Payment required',
    app: 'WiFi Store',
    category: NotificationCategory.NON_SAFETY_PROMOTIONAL,
    priority: PriorityLevel.LOW,
    message: 'Your WiFi session has expired - Purchase to continue browsing',
    trigger: 'Session timeout'
  },
  {
    icon: <Coffee size={16} />,
    name: 'Drink Service',
    description: 'Beverage cart',
    app: 'Cabin Service',
    category: NotificationCategory.CROSS_APP,
    priority: PriorityLevel.MEDIUM,
    message: 'Complimentary beverage service starting - Please have your order ready',
    trigger: 'Service schedule'
  },
  {
    icon: <MapPin size={16} />,
    name: 'Weather Update',
    description: 'Destination info',
    app: 'Weather Service',
    category: NotificationCategory.OPERATIONAL_INFO,
    priority: PriorityLevel.MEDIUM,
    message: 'Weather at destination: Sunny, 22°C - No delays expected',
    trigger: 'Weather data update'
  },
  {
    icon: <ShoppingBag size={16} />,
    name: 'Loyalty Points',
    description: 'Miles earned',
    app: 'Frequent Flyer',
    category: NotificationCategory.NON_SAFETY_PROMOTIONAL,
    priority: PriorityLevel.LOW,
    message: 'Congratulations! You earned 2,500 bonus miles on this flight',
    trigger: 'Flight completion'
  }
];

export function NotificationTrigger() {
  const { dispatch, state } = useNotification();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const dragRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef({ x: 0, y: 0 });
  const [customTrigger, setCustomTrigger] = useState({
    app: '',
    message: '',
    category: NotificationCategory.OPERATIONAL_INFO,
    priority: PriorityLevel.MEDIUM
  });

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (dragRef.current) {
      setIsDragging(true);
      const rect = dragRef.current.getBoundingClientRect();
      offsetRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && dragRef.current) {
        const newX = e.clientX - offsetRef.current.x;
        const newY = e.clientY - offsetRef.current.y;
        
        // Boundary checks
        const maxX = window.innerWidth - dragRef.current.offsetWidth;
        const maxY = window.innerHeight - dragRef.current.offsetHeight;
        
        setPosition({
          x: Math.max(0, Math.min(newX, maxX)),
          y: Math.max(0, Math.min(newY, maxY))
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Helper to calculate score for a scenario (creates a temporary notification to calculate score)
  const calculateScenarioScore = (scenario: TriggerScenario): number => {
    // Create a temporary notification with typical values for this scenario
    const tempNotification = createNotification(scenario);
    return calculateWeightedScore(tempNotification, state.currentApp || undefined);
  };

  // Helper to generate formula display for each category
  // Standard Format: (Weight1 × Param1) + (Weight2 × Param2) + ... = Score
  // Weights: 0-1 (sum = 1), Parameters: 1-10
  const getFormulaDisplay = (category: NotificationCategory): { title: string; formula: string } => {
    switch (category) {
      case NotificationCategory.SAFETY:
      case NotificationCategory.OPERATIONAL_INFO:
        return {
          title: 'Safety & Operational Formula',
          formula: 'Score = (0.33 × Priority) + (0.33 × Impact) + (0.33 × Consequence)'
        };
      case NotificationCategory.SYSTEM:
        return {
          title: 'User System Formula',
          formula: 'Score = (0.33 × Priority) + (0.33 × AppRelevance) + (0.33 × Consequence)'
        };
      case NotificationCategory.CROSS_APP:
        return {
          title: 'Cross-App Formula',
          formula: 'Score = (0.40 × CategoryImportance) + (0.25 × CashValue) + (0.20 × Relevance) + (0.15 × Recency)'
        };
      case NotificationCategory.IN_APP:
        return {
          title: 'In-App (Within App) Formula',
          formula: 'Score = (0.25 × TimeBound) + (0.25 × Relevance) + (0.25 × Consequence) + (0.25 × Recency)'
        };
      case NotificationCategory.NON_SAFETY_PROMOTIONAL:
        return {
          title: 'Promotional Formula',
          formula: 'Score = (0.40 × Category) + (0.25 × Cash) + (0.20 × Relevance) + (0.15 × Recency)'
        };
      default:
        return { title: 'Unknown Formula', formula: 'N/A' };
    }
  };

  // Helper to generate a deterministic seed from scenario name
  const getScenarioSeed = (scenario: TriggerScenario): number => {
    let hash = 0;
    const str = scenario.name + scenario.category;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  };

  // Helper to get deterministic value based on seed (replaces Math.random())
  const getSeededValue = (seed: number, index: number, min: number, max: number): number => {
    const x = Math.sin(seed + index) * 10000;
    const random = x - Math.floor(x);
    return Math.floor(random * (max - min + 1)) + min;
  };

  const createNotification = (scenario: TriggerScenario): Notification => {
    // Generate DETERMINISTIC scoring based on scenario (not random!)
    // This ensures the score on the button matches the score in notification center
    const seed = getScenarioSeed(scenario);
    let timePhaseBound, relevance, consequence, recency;

    switch (scenario.category) {
      case NotificationCategory.SAFETY:
        timePhaseBound = getSeededValue(seed, 1, 9, 10); // 9-10 (very urgent)
        relevance = getSeededValue(seed, 2, 9, 10); // 9-10 (highly relevant)
        consequence = getSeededValue(seed, 3, 9, 10); // 9-10 (severe consequence)
        recency = 10; // Always current
        break;
      case NotificationCategory.OPERATIONAL_INFO:
        timePhaseBound = getSeededValue(seed, 1, 7, 9); // 7-9 (time-sensitive)
        relevance = getSeededValue(seed, 2, 7, 9); // 7-9 (relevant to flight)
        consequence = getSeededValue(seed, 3, 6, 8); // 6-8 (moderate consequence)
        recency = getSeededValue(seed, 4, 9, 10); // 9-10 (recent)
        break;
      case NotificationCategory.SYSTEM:
        timePhaseBound = getSeededValue(seed, 1, 5, 8); // 5-8 (moderate urgency)
        relevance = getSeededValue(seed, 2, 6, 8); // 6-8 (somewhat relevant)
        consequence = getSeededValue(seed, 3, 4, 7); // 4-7 (variable consequence)
        recency = getSeededValue(seed, 4, 8, 10); // 8-10 (recent)
        break;
      case NotificationCategory.CROSS_APP:
        timePhaseBound = getSeededValue(seed, 1, 4, 7); // 4-7 (less urgent)
        relevance = getSeededValue(seed, 2, 6, 9); // 6-9 (user-specific relevance)
        consequence = getSeededValue(seed, 3, 5, 7); // 5-7 (moderate consequence)
        recency = getSeededValue(seed, 4, 7, 9); // 7-9 (fairly recent)
        break;
      default: // NON_SAFETY_PROMOTIONAL
        timePhaseBound = getSeededValue(seed, 1, 2, 5); // 2-5 (low urgency)
        relevance = getSeededValue(seed, 2, 3, 8); // 3-8 (variable relevance)
        consequence = getSeededValue(seed, 3, 2, 5); // 2-5 (low consequence)
        recency = getSeededValue(seed, 4, 5, 9); // 5-9 (variable recency)
        break;
    }

    return {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      app: scenario.app,
      category: scenario.category,
      priority: scenario.priority,
      priorityScore: getSeededValue(seed, 5, 10, 50),
      timePhaseBound,
      relevance,
      consequence,
      recency,
      trigger: scenario.trigger,
      message: scenario.message,
      timestamp: new Date(),
      isRead: false,
      isVisible: true,
    };
  };

  const handleTrigger = (scenario: TriggerScenario) => {
    const notification = createNotification(scenario);
    dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
  };

  const handleCustomTrigger = () => {
    if (!customTrigger.app || !customTrigger.message) return;

    // Use the same realistic scoring logic for custom notifications
    const customScenario: TriggerScenario = {
      icon: <Bell size={16} />,
      name: 'Custom',
      description: 'Manual trigger',
      app: customTrigger.app,
      category: customTrigger.category,
      priority: customTrigger.priority,
      message: customTrigger.message,
      trigger: 'Manual trigger'
    };

    const notification = createNotification(customScenario);
    dispatch({ type: 'ADD_NOTIFICATION', payload: notification });

    setCustomTrigger({
      app: '',
      message: '',
      category: NotificationCategory.OPERATIONAL_INFO,
      priority: PriorityLevel.MEDIUM
    });
  };

  const safetyScenarios = triggerScenarios.filter(s => s.category === NotificationCategory.SAFETY);
  const operationalScenarios = triggerScenarios.filter(s => s.category === NotificationCategory.OPERATIONAL_INFO);
  const systemScenarios = triggerScenarios.filter(s => s.category === NotificationCategory.SYSTEM);
  const crossAppScenarios = triggerScenarios.filter(s => s.category === NotificationCategory.CROSS_APP);
  const promotionalScenarios = triggerScenarios.filter(s => s.category === NotificationCategory.NON_SAFETY_PROMOTIONAL);

  return (
    <Container 
      ref={dragRef}
      isExpanded={isExpanded}
      isDragging={isDragging}
      style={{ left: position.x, top: position.y }}
    >
      <Header onMouseDown={handleMouseDown}>
        <DragHandle>
          <Move size={14} />
          <Title>
            <Bell size={16} />
            Notification Triggers
          </Title>
        </DragHandle>
        <ExpandButton 
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          {isExpanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
        </ExpandButton>
      </Header>

      <Content>
        <Section>
          <SectionTitle>🚨 Safety Critical</SectionTitle>
          <FormulaDisplay>
            <FormulaTitle>{getFormulaDisplay(NotificationCategory.SAFETY).title}</FormulaTitle>
            <FormulaText>{getFormulaDisplay(NotificationCategory.SAFETY).formula}</FormulaText>
          </FormulaDisplay>
          <TriggerGrid>
            {safetyScenarios.map((scenario, index) => (
              <TriggerButton
                key={index}
                priority={scenario.priority}
                onClick={() => handleTrigger(scenario)}
              >
                <TriggerIcon>{scenario.icon}</TriggerIcon>
                <TriggerName>{scenario.name}</TriggerName>
                <TriggerDescription>{scenario.description}</TriggerDescription>
                <TriggerScore>Score: {calculateScenarioScore(scenario).toFixed(2)}</TriggerScore>
              </TriggerButton>
            ))}
          </TriggerGrid>
        </Section>

        <Section>
          <SectionTitle>✈️ Operational</SectionTitle>
          <FormulaDisplay>
            <FormulaTitle>{getFormulaDisplay(NotificationCategory.OPERATIONAL_INFO).title}</FormulaTitle>
            <FormulaText>{getFormulaDisplay(NotificationCategory.OPERATIONAL_INFO).formula}</FormulaText>
          </FormulaDisplay>
          <TriggerGrid>
            {operationalScenarios.map((scenario, index) => (
              <TriggerButton
                key={index}
                priority={scenario.priority}
                onClick={() => handleTrigger(scenario)}
              >
                <TriggerIcon>{scenario.icon}</TriggerIcon>
                <TriggerName>{scenario.name}</TriggerName>
                <TriggerDescription>{scenario.description}</TriggerDescription>
                <TriggerScore>Score: {calculateScenarioScore(scenario).toFixed(2)}</TriggerScore>
              </TriggerButton>
            ))}
          </TriggerGrid>
        </Section>

        <Section>
          <SectionTitle>⚙️ System</SectionTitle>
          <FormulaDisplay>
            <FormulaTitle>{getFormulaDisplay(NotificationCategory.SYSTEM).title}</FormulaTitle>
            <FormulaText>{getFormulaDisplay(NotificationCategory.SYSTEM).formula}</FormulaText>
          </FormulaDisplay>
          <TriggerGrid>
            {systemScenarios.map((scenario, index) => (
              <TriggerButton
                key={index}
                priority={scenario.priority}
                onClick={() => handleTrigger(scenario)}
              >
                <TriggerIcon>{scenario.icon}</TriggerIcon>
                <TriggerName>{scenario.name}</TriggerName>
                <TriggerDescription>{scenario.description}</TriggerDescription>
                <TriggerScore>Score: {calculateScenarioScore(scenario).toFixed(2)}</TriggerScore>
              </TriggerButton>
            ))}
          </TriggerGrid>
        </Section>

        <Section>
          <SectionTitle>🔄 Cross-App</SectionTitle>
          <FormulaDisplay>
            <FormulaTitle>{getFormulaDisplay(NotificationCategory.CROSS_APP).title}</FormulaTitle>
            <FormulaText>{getFormulaDisplay(NotificationCategory.CROSS_APP).formula}</FormulaText>
          </FormulaDisplay>
          <TriggerGrid>
            {crossAppScenarios.map((scenario, index) => (
              <TriggerButton
                key={index}
                priority={scenario.priority}
                onClick={() => handleTrigger(scenario)}
              >
                <TriggerIcon>{scenario.icon}</TriggerIcon>
                <TriggerName>{scenario.name}</TriggerName>
                <TriggerDescription>{scenario.description}</TriggerDescription>
                <TriggerScore>Score: {calculateScenarioScore(scenario).toFixed(2)}</TriggerScore>
              </TriggerButton>
            ))}
          </TriggerGrid>
        </Section>

        <Section>
          <SectionTitle>🛍️ Promotional</SectionTitle>
          <FormulaDisplay>
            <FormulaTitle>{getFormulaDisplay(NotificationCategory.NON_SAFETY_PROMOTIONAL).title}</FormulaTitle>
            <FormulaText>{getFormulaDisplay(NotificationCategory.NON_SAFETY_PROMOTIONAL).formula}</FormulaText>
          </FormulaDisplay>
          <TriggerGrid>
            {promotionalScenarios.map((scenario, index) => (
              <TriggerButton
                key={index}
                priority={scenario.priority}
                onClick={() => handleTrigger(scenario)}
              >
                <TriggerIcon>{scenario.icon}</TriggerIcon>
                <TriggerName>{scenario.name}</TriggerName>
                <TriggerDescription>{scenario.description}</TriggerDescription>
                <TriggerScore>Score: {calculateScenarioScore(scenario).toFixed(2)}</TriggerScore>
              </TriggerButton>
            ))}
          </TriggerGrid>
        </Section>

        <Section>
          <SectionTitle>📱 App-Specific (In-App)</SectionTitle>
          <FormulaDisplay>
            <FormulaTitle>{getFormulaDisplay(NotificationCategory.IN_APP).title}</FormulaTitle>
            <FormulaText>{getFormulaDisplay(NotificationCategory.IN_APP).formula}</FormulaText>
          </FormulaDisplay>
          <TriggerGrid>
            <TriggerButton
              priority={PriorityLevel.LOW}
              onClick={() => {
                const notification = generateAppNotification('duty-free');
                dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
              }}
            >
              <TriggerIcon><ShoppingBag size={16} /></TriggerIcon>
              <TriggerName>Duty Free</TriggerName>
              <TriggerDescription>Shop notifications</TriggerDescription>
              <TriggerScore>Score: {calculateWeightedScore(generateAppNotification('duty-free'), state.currentApp || undefined).toFixed(2)}</TriggerScore>
            </TriggerButton>

            <TriggerButton
              priority={PriorityLevel.MEDIUM}
              onClick={() => {
                const notification = generateAppNotification('food');
                dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
              }}
            >
              <TriggerIcon><Coffee size={16} /></TriggerIcon>
              <TriggerName>Food & Drinks</TriggerName>
              <TriggerDescription>Meal notifications</TriggerDescription>
              <TriggerScore>Score: {calculateWeightedScore(generateAppNotification('food'), state.currentApp || undefined).toFixed(2)}</TriggerScore>
            </TriggerButton>

            <TriggerButton
              priority={PriorityLevel.MINIMAL}
              onClick={() => {
                const notification = generateAppNotification('movies');
                dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
              }}
            >
              <TriggerIcon><Play size={16} /></TriggerIcon>
              <TriggerName>Movies & TV</TriggerName>
              <TriggerDescription>Entertainment alerts</TriggerDescription>
              <TriggerScore>Score: {calculateWeightedScore(generateAppNotification('movies'), state.currentApp || undefined).toFixed(2)}</TriggerScore>
            </TriggerButton>

            <TriggerButton
              priority={PriorityLevel.MINIMAL}
              onClick={() => {
                const notification = generateAppNotification('music');
                dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
              }}
            >
              <TriggerIcon><Volume2 size={16} /></TriggerIcon>
              <TriggerName>Music</TriggerName>
              <TriggerDescription>Playlist suggestions</TriggerDescription>
              <TriggerScore>Score: {calculateWeightedScore(generateAppNotification('music'), state.currentApp || undefined).toFixed(2)}</TriggerScore>
            </TriggerButton>

            <TriggerButton
              priority={PriorityLevel.MINIMAL}
              onClick={() => {
                const notification = generateAppNotification('games');
                dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
              }}
            >
              <TriggerIcon><Gamepad2 size={16} /></TriggerIcon>
              <TriggerName>Games</TriggerName>
              <TriggerDescription>Game recommendations</TriggerDescription>
              <TriggerScore>Score: {calculateWeightedScore(generateAppNotification('games'), state.currentApp || undefined).toFixed(2)}</TriggerScore>
            </TriggerButton>

            <TriggerButton
              priority={PriorityLevel.LOW}
              onClick={() => {
                const notification = generateAppNotification('internet');
                dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
              }}
            >
              <TriggerIcon><Wifi size={16} /></TriggerIcon>
              <TriggerName>WiFi</TriggerName>
              <TriggerDescription>Connection status</TriggerDescription>
              <TriggerScore>Score: {calculateWeightedScore(generateAppNotification('internet'), state.currentApp || undefined).toFixed(2)}</TriggerScore>
            </TriggerButton>
          </TriggerGrid>
        </Section>

        <Section>
          <SectionTitle>📦 Multi-Notification Triggers</SectionTitle>
          <TriggerGrid>
            <TriggerButton
              priority={PriorityLevel.HIGH}
              onClick={() => {
                // Trigger 3 flight-related notifications
                handleTrigger(triggerScenarios.find(s => s.name === 'Flight Delay')!);
                setTimeout(() => handleTrigger(triggerScenarios.find(s => s.name === 'Gate Change')!), 500);
                setTimeout(() => handleTrigger(triggerScenarios.find(s => s.name === 'Landing Prep')!), 1000);
              }}
            >
              <TriggerIcon><Plane size={16} /></TriggerIcon>
              <TriggerName>Flight Updates</TriggerName>
              <TriggerDescription>3 flight notifications</TriggerDescription>
            </TriggerButton>

            <TriggerButton
              priority={PriorityLevel.MEDIUM}
              onClick={() => {
                // Trigger 2 service notifications
                handleTrigger(triggerScenarios.find(s => s.name === 'Meal Service')!);
                setTimeout(() => handleTrigger(triggerScenarios.find(s => s.name === 'Drink Service')!), 700);
              }}
            >
              <TriggerIcon><Coffee size={16} /></TriggerIcon>
              <TriggerName>Service Bundle</TriggerName>
              <TriggerDescription>2 service notifications</TriggerDescription>
            </TriggerButton>

            <TriggerButton
              priority={PriorityLevel.LOW}
              onClick={() => {
                // Trigger 4 promotional notifications
                handleTrigger(triggerScenarios.find(s => s.name === 'Duty Free Sale')!);
                setTimeout(() => handleTrigger(triggerScenarios.find(s => s.name === 'Premium Content')!), 300);
                setTimeout(() => handleTrigger(triggerScenarios.find(s => s.name === 'WiFi Purchase')!), 600);
                setTimeout(() => handleTrigger(triggerScenarios.find(s => s.name === 'Loyalty Points')!), 900);
              }}
            >
              <TriggerIcon><ShoppingBag size={16} /></TriggerIcon>
              <TriggerName>Promo Pack</TriggerName>
              <TriggerDescription>4 promotional notifications</TriggerDescription>
            </TriggerButton>

            <TriggerButton
              priority={PriorityLevel.CRITICAL}
              onClick={() => {
                // Trigger all emergency notifications
                handleTrigger(triggerScenarios.find(s => s.name === 'Seatbelt Alert')!);
                setTimeout(() => handleTrigger(triggerScenarios.find(s => s.name === 'Medical Emergency')!), 400);
              }}
            >
              <TriggerIcon><AlertTriangle size={16} /></TriggerIcon>
              <TriggerName>Emergency</TriggerName>
              <TriggerDescription>2 critical alerts</TriggerDescription>
            </TriggerButton>

            <TriggerButton
              priority={PriorityLevel.MEDIUM}
              onClick={() => {
                // Trigger all system notifications
                handleTrigger(triggerScenarios.find(s => s.name === 'WiFi Restored')!);
                setTimeout(() => handleTrigger(triggerScenarios.find(s => s.name === 'System Update')!), 500);
                setTimeout(() => handleTrigger(triggerScenarios.find(s => s.name === 'Power Issue')!), 1000);
              }}
            >
              <TriggerIcon><Settings size={16} /></TriggerIcon>
              <TriggerName>System Status</TriggerName>
              <TriggerDescription>3 system notifications</TriggerDescription>
            </TriggerButton>

            <TriggerButton
              priority={PriorityLevel.HIGH}
              onClick={() => {
                // Trigger 5 mixed notifications
                handleTrigger(triggerScenarios.find(s => s.name === 'Upgrade Success')!);
                setTimeout(() => handleTrigger(triggerScenarios.find(s => s.name === 'Weather Update')!), 200);
                setTimeout(() => handleTrigger(triggerScenarios.find(s => s.name === 'WiFi Restored')!), 400);
                setTimeout(() => handleTrigger(triggerScenarios.find(s => s.name === 'Duty Free Sale')!), 600);
                setTimeout(() => handleTrigger(triggerScenarios.find(s => s.name === 'Meal Service')!), 800);
              }}
            >
              <TriggerIcon><Bell size={16} /></TriggerIcon>
              <TriggerName>Mixed Bundle</TriggerName>
              <TriggerDescription>5 mixed notifications</TriggerDescription>
            </TriggerButton>

            <TriggerButton
              priority={PriorityLevel.CRITICAL}
              onClick={() => {
                // Trigger one notification from each type (10 total)
                const notificationTypes = [
                  'Seatbelt Alert',      // Safety Critical
                  'Medical Emergency',   // Safety Critical
                  'Flight Delay',        // Operational High
                  'Gate Change',         // Operational High
                  'Landing Prep',        // Operational High
                  'WiFi Restored',       // System Medium
                  'System Update',       // System Medium
                  'Upgrade Success',     // Cross-App Medium
                  'Meal Service',        // Cross-App Medium
                  'Duty Free Sale'       // Promotional Low
                ];

                notificationTypes.forEach((notificationName, index) => {
                  const scenario = triggerScenarios.find(s => s.name === notificationName);
                  if (scenario) {
                    setTimeout(() => handleTrigger(scenario), index * 150);
                  }
                });
              }}
            >
              <TriggerIcon><AlertTriangle size={16} /></TriggerIcon>
              <TriggerName>All Types</TriggerName>
              <TriggerDescription>10 diverse notifications</TriggerDescription>
            </TriggerButton>
          </TriggerGrid>
        </Section>

        <CustomTriggerSection>
          <SectionTitle>🎛️ Custom Trigger</SectionTitle>
          <InputGroup>
            <Label>App Name</Label>
            <Input
              type="text"
              placeholder="e.g., Custom Service"
              value={customTrigger.app}
              onChange={(e) => setCustomTrigger({...customTrigger, app: e.target.value})}
            />
          </InputGroup>
          <InputGroup>
            <Label>Message</Label>
            <Input
              type="text"
              placeholder="Enter notification message"
              value={customTrigger.message}
              onChange={(e) => setCustomTrigger({...customTrigger, message: e.target.value})}
            />
          </InputGroup>
          <InputGroup>
            <Label>Category</Label>
            <Select
              value={customTrigger.category}
              onChange={(e) => setCustomTrigger({...customTrigger, category: e.target.value as NotificationCategory})}
            >
              <option value={NotificationCategory.SAFETY}>Safety</option>
              <option value={NotificationCategory.OPERATIONAL_INFO}>Operational Info</option>
              <option value={NotificationCategory.SYSTEM}>System</option>
              <option value={NotificationCategory.CROSS_APP}>Cross-App</option>
              <option value={NotificationCategory.NON_SAFETY_PROMOTIONAL}>Promotional</option>
            </Select>
          </InputGroup>
          <InputGroup>
            <Label>Priority</Label>
            <Select
              value={customTrigger.priority}
              onChange={(e) => setCustomTrigger({...customTrigger, priority: parseInt(e.target.value) as PriorityLevel})}
            >
              <option value={PriorityLevel.CRITICAL}>Critical (1)</option>
              <option value={PriorityLevel.HIGH}>High (2)</option>
              <option value={PriorityLevel.MEDIUM}>Medium (3)</option>
              <option value={PriorityLevel.LOW}>Low (4)</option>
              <option value={PriorityLevel.VERY_LOW}>Very Low (5)</option>
              <option value={PriorityLevel.MINIMAL}>Minimal (6)</option>
            </Select>
          </InputGroup>
          <CreateButton onClick={handleCustomTrigger}>
            Trigger Custom Notification
          </CreateButton>
        </CustomTriggerSection>
      </Content>
    </Container>
  );
}