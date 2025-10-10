import React, { useState } from 'react';
import styled from 'styled-components';
import { AlertTriangle, X, ChevronRight, Bell } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';
import { PriorityLevel } from '../types/notification';

const Container = styled.div`
  position: fixed;
  bottom: 0;
  right: 20px;
  width: 400px;
  height: 40vh;
  z-index: 500;
  pointer-events: none;
  overflow: visible;
  display: flex;
  flex-direction: column-reverse;
  gap: 8px;
  padding-bottom: 20px;
`;

const NotificationToast = styled.div<{
  priority: PriorityLevel;
  index: number;
  isRemoving: boolean;
}>`
  background: ${props => {
    switch (props.priority) {
      case PriorityLevel.CRITICAL:
        return '#999999';
      case PriorityLevel.HIGH:
        return '#b3b3b3';
      default:
        return '#cccccc';
    }
  }};
  color: #333333;
  border-radius: 12px;
  padding: 12px 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  pointer-events: all;
  width: 100%;
  position: relative;
  border: 1px solid #e0e0e0;

  ${props => props.isRemoving ? `
    animation: slideOutRight 0.4s ease-in-out forwards;

    @keyframes slideOutRight {
      0% {
        transform: translateX(0) scale(1);
        opacity: 1;
      }
      100% {
        transform: translateX(100%) scale(0.8);
        opacity: 0;
      }
    }
  ` : `
    animation: slideInFromBottom 0.6s ease-out;
    animation-delay: ${props.index * 0.1}s;
    animation-fill-mode: both;

    @keyframes slideInFromBottom {
      0% {
        transform: translateY(60px) scale(0.8);
        opacity: 0;
      }
      60% {
        transform: translateY(-8px) scale(1.05);
        opacity: 0.8;
      }
      100% {
        transform: translateY(0) scale(1);
        opacity: 1;
      }
    }
  `}
`;

const Content = styled.div`
  flex: 1;
  margin-right: 16px;
`;

const AppName = styled.div`
  font-size: 12px;
  color: #666666;
  margin-bottom: 4px;
  font-weight: 600;
`;

const Message = styled.div`
  font-size: 14px;
  line-height: 1.3;
  color: #333333;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #666666;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
`;

const SeeMoreButton = styled.button`
  background: #e0e0e0;
  border: 1px solid #cccccc;
  color: #333333;
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
  pointer-events: all;
`;

const SeeMoreText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const SeeMoreCount = styled.span`
  font-size: 12px;
  color: #666666;
  margin-top: 2px;
`;

const TopButton = styled.button`
  background: #cccccc;
  border: 1px solid #b3b3b3;
  color: #333333;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  margin-bottom: 8px;
  pointer-events: all;
`;

const TopButtonText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  line-height: 1.2;
`;

const IconContainer = styled.div<{ priority: PriorityLevel }>`
  margin-right: 12px;
`;

interface ActiveNotificationsProps {
  onOpenNotificationCenter: () => void;
}

export function AnimatedNotifications({ onOpenNotificationCenter }: ActiveNotificationsProps) {
  const { state, dispatch } = useNotification();
  const [removingIds, setRemovingIds] = useState<Set<string>>(new Set());

  const handleDismiss = (id: string) => {
    setRemovingIds(prev => new Set(prev).add(id));

    setTimeout(() => {
      dispatch({ type: 'DISMISS_NOTIFICATION', payload: id });
      setRemovingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }, 400);
  };

  if (state.activeNotifications.length === 0) {
    return null;
  }

  const visibleNotifications = state.activeNotifications.slice(0, 6).reverse();
  const remainingCount = state.activeNotifications.length - 6;
  const totalUnreadCount = state.notifications.filter(n => !n.isRead).length;

  return (
    <Container>
      {visibleNotifications.map((notification, index) => (
        <NotificationToast
          key={notification.id}
          priority={notification.priority}
          index={index}
          isRemoving={removingIds.has(notification.id)}
        >
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

      {remainingCount > 0 && (
        <TopButton onClick={onOpenNotificationCenter}>
          <Bell size={14} />
          <TopButtonText>
            <div>Notification Center</div>
            <div style={{ fontSize: '10px', color: '#666666' }}>+{remainingCount} more</div>
          </TopButtonText>
        </TopButton>
      )}
    </Container>
  );
}
