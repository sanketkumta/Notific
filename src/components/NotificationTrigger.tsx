import React, { useState } from 'react';
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
  Gamepad2
} from 'lucide-react';
import { useNotification } from '../context/NotificationContext';
import { Notification, NotificationCategory, PriorityLevel } from '../types/notification';
import { generateAppNotification } from '../data/notificationData';

const Container = styled.div<{ isExpanded: boolean }>`
  position: fixed;
  top: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(15px);
  border-radius: 16px;
  padding: 20px;
  color: white;
  width: ${props => props.isExpanded ? '450px' : '280px'};
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  max-height: ${props => props.isExpanded ? '85vh' : '70px'};
  overflow: hidden;
  z-index: 900;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  cursor: pointer;
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
  color: white;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const Content = styled.div`
  max-height: calc(85vh - 100px);
  overflow-y: auto;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
  }
`;

const Section = styled.div`
  margin-bottom: 24px;
`;

const SectionTitle = styled.h4`
  margin: 0 0 12px 0;
  font-size: 14px;
  color: #64B5F6;
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
        return 'linear-gradient(135deg, #ff4757 0%, #ff3742 100%)';
      case PriorityLevel.HIGH:
        return 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)';
      case PriorityLevel.MEDIUM:
        return 'linear-gradient(135deg, #4834d4 0%, #686de0 100%)';
      default:
        return 'linear-gradient(135deg, #30336b 0%, #535c68 100%)';
    }
  }};
  border: none;
  color: white;
  padding: 14px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 11px;
  font-weight: 500;
  text-align: center;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  min-height: 90px;
  justify-content: center;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
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
  opacity: 0.8;
  line-height: 1.1;
  text-align: center;
`;

const CustomTriggerSection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
`;

const InputGroup = styled.div`
  margin-bottom: 12px;
`;

const Label = styled.label`
  display: block;
  font-size: 12px;
  margin-bottom: 4px;
  opacity: 0.8;
`;

const Input = styled.input`
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  padding: 8px;
  color: white;
  font-size: 12px;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    outline: none;
    border-color: #64B5F6;
  }
`;

const Select = styled.select`
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  padding: 8px;
  color: white;
  font-size: 12px;

  &:focus {
    outline: none;
    border-color: #64B5F6;
  }

  option {
    background: #333;
    color: white;
  }
`;

const CreateButton = styled.button`
  background: linear-gradient(135deg, #2ed573 0%, #1dd1a1 100%);
  border: none;
  color: white;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  width: 100%;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
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
  const { dispatch } = useNotification();
  const [isExpanded, setIsExpanded] = useState(true);
  const [customTrigger, setCustomTrigger] = useState({
    app: '',
    message: '',
    category: NotificationCategory.OPERATIONAL_INFO,
    priority: PriorityLevel.MEDIUM
  });

  const createNotification = (scenario: TriggerScenario): Notification => {
    // Generate realistic scoring based on category and priority
    let timePhaseBound, relevance, consequence, recency;

    switch (scenario.category) {
      case NotificationCategory.SAFETY:
        timePhaseBound = Math.floor(Math.random() * 2) + 9; // 9-10 (very urgent)
        relevance = Math.floor(Math.random() * 2) + 9; // 9-10 (highly relevant)
        consequence = Math.floor(Math.random() * 2) + 9; // 9-10 (severe consequence)
        recency = 10; // Always current
        break;
      case NotificationCategory.OPERATIONAL_INFO:
        timePhaseBound = Math.floor(Math.random() * 3) + 7; // 7-9 (time-sensitive)
        relevance = Math.floor(Math.random() * 3) + 7; // 7-9 (relevant to flight)
        consequence = Math.floor(Math.random() * 3) + 6; // 6-8 (moderate consequence)
        recency = Math.floor(Math.random() * 2) + 9; // 9-10 (recent)
        break;
      case NotificationCategory.SYSTEM:
        timePhaseBound = Math.floor(Math.random() * 4) + 5; // 5-8 (moderate urgency)
        relevance = Math.floor(Math.random() * 3) + 6; // 6-8 (somewhat relevant)
        consequence = Math.floor(Math.random() * 4) + 4; // 4-7 (variable consequence)
        recency = Math.floor(Math.random() * 3) + 8; // 8-10 (recent)
        break;
      case NotificationCategory.CROSS_APP:
        timePhaseBound = Math.floor(Math.random() * 4) + 4; // 4-7 (less urgent)
        relevance = Math.floor(Math.random() * 4) + 6; // 6-9 (user-specific relevance)
        consequence = Math.floor(Math.random() * 3) + 5; // 5-7 (moderate consequence)
        recency = Math.floor(Math.random() * 3) + 7; // 7-9 (fairly recent)
        break;
      default: // NON_SAFETY_PROMOTIONAL
        timePhaseBound = Math.floor(Math.random() * 4) + 2; // 2-5 (low urgency)
        relevance = Math.floor(Math.random() * 6) + 3; // 3-8 (variable relevance)
        consequence = Math.floor(Math.random() * 4) + 2; // 2-5 (low consequence)
        recency = Math.floor(Math.random() * 5) + 5; // 5-9 (variable recency)
        break;
    }

    return {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      app: scenario.app,
      category: scenario.category,
      priority: scenario.priority,
      priorityScore: Math.floor(Math.random() * 40) + 10,
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
    <Container isExpanded={isExpanded}>
      <Header onClick={() => setIsExpanded(!isExpanded)}>
        <Title>
          <Bell size={16} />
          Notification Triggers
        </Title>
        <ExpandButton>
          {isExpanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
        </ExpandButton>
      </Header>

      <Content>
        <Section>
          <SectionTitle>🚨 Safety Critical</SectionTitle>
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
              </TriggerButton>
            ))}
          </TriggerGrid>
        </Section>

        <Section>
          <SectionTitle>✈️ Operational</SectionTitle>
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
              </TriggerButton>
            ))}
          </TriggerGrid>
        </Section>

        <Section>
          <SectionTitle>⚙️ System</SectionTitle>
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
              </TriggerButton>
            ))}
          </TriggerGrid>
        </Section>

        <Section>
          <SectionTitle>🔄 Cross-App</SectionTitle>
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
              </TriggerButton>
            ))}
          </TriggerGrid>
        </Section>

        <Section>
          <SectionTitle>🛍️ Promotional</SectionTitle>
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
              </TriggerButton>
            ))}
          </TriggerGrid>
        </Section>

        <Section>
          <SectionTitle>📱 App-Specific (In-App)</SectionTitle>
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