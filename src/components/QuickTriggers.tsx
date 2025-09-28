import React from 'react';
import styled from 'styled-components';
import { AlertTriangle, Plane, Wifi, ShoppingBag } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';
import { Notification, NotificationCategory, PriorityLevel } from '../types/notification';

const Container = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const QuickButton = styled.button<{ priority: PriorityLevel }>`
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
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 11px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

const quickTriggers = [
  {
    icon: <AlertTriangle size={14} />,
    label: 'Emergency',
    app: 'Flight Safety',
    category: NotificationCategory.SAFETY,
    priority: PriorityLevel.CRITICAL,
    message: 'Emergency: Please return to your seats immediately',
    trigger: 'Emergency alert'
  },
  {
    icon: <Plane size={14} />,
    label: 'Flight Info',
    app: 'Flight Operations',
    category: NotificationCategory.OPERATIONAL_INFO,
    priority: PriorityLevel.HIGH,
    message: 'Flight update: Beginning descent - Arrival in 25 minutes',
    trigger: 'Flight phase change'
  },
  {
    icon: <Wifi size={14} />,
    label: 'WiFi',
    app: 'Network Services',
    category: NotificationCategory.SYSTEM,
    priority: PriorityLevel.MEDIUM,
    message: 'WiFi service temporarily unavailable - Restoring connection',
    trigger: 'Network maintenance'
  },
  {
    icon: <ShoppingBag size={14} />,
    label: 'Promo',
    app: 'Duty Free',
    category: NotificationCategory.NON_SAFETY_PROMOTIONAL,
    priority: PriorityLevel.LOW,
    message: 'Last chance: 50% off select items - Offer ends in 10 minutes',
    trigger: 'Promotional alert'
  }
];

export function QuickTriggers() {
  const { dispatch } = useNotification();

  const handleQuickTrigger = (trigger: typeof quickTriggers[0]) => {
    const notification: Notification = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      app: trigger.app,
      category: trigger.category,
      priority: trigger.priority,
      priorityScore: Math.floor(Math.random() * 40) + 10,
      timePhaseBound: Math.floor(Math.random() * 10) + 1,
      relevance: Math.floor(Math.random() * 10) + 1,
      consequence: Math.floor(Math.random() * 10) + 1,
      recency: 10,
      trigger: trigger.trigger,
      message: trigger.message,
      timestamp: new Date(),
      isRead: false,
      isVisible: true,
    };

    dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
  };

  return (
    <Container>
      {quickTriggers.map((trigger, index) => (
        <QuickButton
          key={index}
          priority={trigger.priority}
          onClick={() => handleQuickTrigger(trigger)}
          title={`Trigger ${trigger.label} notification`}
        >
          {trigger.icon}
          {trigger.label}
        </QuickButton>
      ))}
    </Container>
  );
}