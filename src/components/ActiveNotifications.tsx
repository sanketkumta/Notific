import React from 'react';
import styled from 'styled-components';
import { AlertTriangle, X, ChevronRight } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';
import { PriorityLevel } from '../types/notification';

const Container = styled.div`
  position: fixed;
  top: 80px;
  right: 20px;
  width: 400px;
  z-index: 500;
  pointer-events: none;
  max-height: calc(100vh - 160px);
  overflow: visible;
  display: flex;
  flex-direction: column-reverse;
  gap: 8px;
`;

const NotificationToast = styled.div<{ priority: PriorityLevel; index: number }>`
  background: ${props => {
    switch (props.priority) {
      case PriorityLevel.CRITICAL:
        return 'linear-gradient(135deg, #ff4757 0%, #ff3742 100%)';
      case PriorityLevel.HIGH:
        return 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)';
      default:
        return 'linear-gradient(135deg, #4834d4 0%, #686de0 100%)';
    }
  }};
  color: white;
  border-radius: 12px;
  padding: 12px 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  pointer-events: all;
  width: 100%;
  position: relative;

  animation: slideInFromBottom 0.6s ease-out;
  animation-delay: ${props => props.index * 0.1}s;
  animation-fill-mode: both;

  @keyframes slideInFromBottom {
    0% {
      transform: translateY(100px) scale(0.8);
      opacity: 0;
    }
    60% {
      transform: translateY(-10px) scale(1.05);
      opacity: 0.8;
    }
    100% {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
  }

  ${props => props.priority === PriorityLevel.CRITICAL && `
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 12px;
      box-shadow: 0 0 20px rgba(255, 71, 87, 0.6);
      animation: criticalPulse 2s ease-in-out infinite;
      pointer-events: none;
      z-index: -1;
    }

    @keyframes criticalPulse {
      0%, 100% {
        box-shadow: 0 0 20px rgba(255, 71, 87, 0.3);
      }
      50% {
        box-shadow: 0 0 30px rgba(255, 71, 87, 0.8);
      }
    }
  `}

  transition: all 0.3s ease;

  &:hover {
    transform: translateX(-5px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
  }
`;

const Content = styled.div`
  flex: 1;
  margin-right: 16px;
`;

const AppName = styled.div`
  font-size: 12px;
  opacity: 0.9;
  margin-bottom: 4px;
  font-weight: 600;
`;

const Message = styled.div`
  font-size: 14px;
  line-height: 1.3;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  opacity: 0.8;
  transition: all 0.2s;

  &:hover {
    opacity: 1;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const SeeMoreButton = styled.button`
  background: linear-gradient(135deg, #4834d4 0%, #686de0 100%);
  border: none;
  color: white;
  padding: 12px 20px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  margin-top: 8px;
  transition: all 0.3s ease;
  pointer-events: all;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    background: linear-gradient(135deg, #5a4fcf 0%, #7b6feb 100%);
  }

  &:active {
    transform: translateY(0);
  }
`;

const SeeMoreText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const SeeMoreCount = styled.span`
  font-size: 12px;
  opacity: 0.9;
  margin-top: 2px;
`;

const IconContainer = styled.div<{ priority: PriorityLevel }>`
  margin-right: 12px;
  animation: ${props => props.priority === PriorityLevel.CRITICAL ? 'shake 0.5s ease-in-out infinite' : 'none'};

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-2px); }
    75% { transform: translateX(2px); }
  }
`;

interface ActiveNotificationsProps {
  onOpenNotificationCenter: () => void;
}

export function ActiveNotifications({ onOpenNotificationCenter }: ActiveNotificationsProps) {
  const { state, dispatch } = useNotification();

  const handleDismiss = (id: string) => {
    dispatch({ type: 'DISMISS_NOTIFICATION', payload: id });
  };

  if (state.activeNotifications.length === 0) {
    return null;
  }

  const visibleNotifications = state.activeNotifications.slice(0, 6);
  const remainingCount = state.activeNotifications.length - 6;
  const totalUnreadCount = state.notifications.filter(n => !n.isRead).length;

  return (
    <Container>
      {visibleNotifications.map((notification, index) => (
        <NotificationToast key={notification.id} priority={notification.priority} index={index}>
          {notification.priority === PriorityLevel.CRITICAL && (
            <IconContainer priority={notification.priority}>
              <AlertTriangle size={20} />
            </IconContainer>
          )}
          <Content>
            <AppName>{notification.app}</AppName>
            <Message>{notification.message}</Message>
          </Content>
          <CloseButton onClick={() => handleDismiss(notification.id)}>
            <X size={16} />
          </CloseButton>
        </NotificationToast>
      ))}

      {remainingCount > 0 && (
        <SeeMoreButton onClick={onOpenNotificationCenter}>
          <SeeMoreText>
            <div>See More Notifications</div>
            <SeeMoreCount>+{remainingCount} more ({totalUnreadCount} total unread)</SeeMoreCount>
          </SeeMoreText>
          <ChevronRight size={20} />
        </SeeMoreButton>
      )}
    </Container>
  );
}