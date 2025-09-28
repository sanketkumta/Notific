import React from 'react';
import styled from 'styled-components';
import { AlertTriangle, Info, Settings, Zap, ShoppingBag, X, Check } from 'lucide-react';
import { Notification, NotificationCategory, PriorityLevel, calculateWeightedScore } from '../types/notification';
import { useNotification } from '../context/NotificationContext';

interface NotificationCardProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDismiss: (id: string) => void;
}

const Card = styled.div<{ priority: PriorityLevel; category: NotificationCategory }>`
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
  color: white;
  border-radius: 12px;
  padding: 16px;
  margin: 8px 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-left: 4px solid ${props => {
    switch (props.category) {
      case NotificationCategory.SAFETY:
        return '#ff4757';
      case NotificationCategory.OPERATIONAL_INFO:
        return '#3742fa';
      case NotificationCategory.CROSS_APP:
        return '#2ed573';
      case NotificationCategory.SYSTEM:
        return '#ffa502';
      default:
        return '#70a1ff';
    }
  }};
  position: relative;
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      transform: translateX(-100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`;

const IconContainer = styled.div`
  margin-right: 12px;
`;

const AppName = styled.div`
  font-size: 12px;
  opacity: 0.8;
  margin-bottom: 4px;
`;

const Message = styled.div`
  font-size: 14px;
  line-height: 1.4;
  margin-bottom: 12px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
  opacity: 0.7;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 6px;
  color: white;
  padding: 4px 8px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const PriorityBadge = styled.span<{ priority: PriorityLevel }>`
  background: ${props => {
    switch (props.priority) {
      case PriorityLevel.CRITICAL:
        return '#ff4757';
      case PriorityLevel.HIGH:
        return '#ff6b35';
      case PriorityLevel.MEDIUM:
        return '#4834d4';
      default:
        return '#30336b';
    }
  }};
  color: white;
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 10px;
  font-weight: bold;
`;

function getIcon(category: NotificationCategory) {
  switch (category) {
    case NotificationCategory.SAFETY:
      return <AlertTriangle size={20} />;
    case NotificationCategory.OPERATIONAL_INFO:
      return <Info size={20} />;
    case NotificationCategory.SYSTEM:
      return <Settings size={20} />;
    case NotificationCategory.CROSS_APP:
      return <Zap size={20} />;
    default:
      return <ShoppingBag size={20} />;
  }
}

function getPriorityLabel(priority: PriorityLevel): string {
  switch (priority) {
    case PriorityLevel.CRITICAL:
      return 'CRITICAL';
    case PriorityLevel.HIGH:
      return 'HIGH';
    case PriorityLevel.MEDIUM:
      return 'MEDIUM';
    case PriorityLevel.LOW:
      return 'LOW';
    case PriorityLevel.VERY_LOW:
      return 'VERY LOW';
    case PriorityLevel.MINIMAL:
      return 'MINIMAL';
    default:
      return 'UNKNOWN';
  }
}

export function NotificationCard({ notification, onMarkAsRead, onDismiss }: NotificationCardProps) {
  const timeAgo = Math.floor((Date.now() - notification.timestamp.getTime()) / 60000);
  const { state } = useNotification();
  const weightedScore = calculateWeightedScore(notification, state.currentApp || undefined);

  return (
    <Card priority={notification.priority} category={notification.category}>
      <Header>
        <IconContainer>
          {getIcon(notification.category)}
        </IconContainer>
        <ActionButtons>
          <ActionButton onClick={() => onMarkAsRead(notification.id)} title="Mark as read">
            <Check size={14} />
          </ActionButton>
          <ActionButton onClick={() => onDismiss(notification.id)} title="Dismiss">
            <X size={14} />
          </ActionButton>
        </ActionButtons>
      </Header>

      <AppName>{notification.app}</AppName>
      <Message>{notification.message}</Message>

      <Footer>
        <div>
          <PriorityBadge priority={notification.priority}>
            {getPriorityLabel(notification.priority)}
          </PriorityBadge>
          <span style={{ marginLeft: '8px' }}>Score: {weightedScore.toFixed(1)}</span>
        </div>
        <div>{timeAgo}m ago</div>
      </Footer>
    </Card>
  );
}