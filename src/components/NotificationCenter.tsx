import React, { useState } from 'react';
import styled from 'styled-components';
import { Bell, X, Trash2 } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';
import { NotificationCard } from './NotificationCard';
import { NotificationCategory } from '../types/notification';

const Container = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: ${props => props.isOpen ? '0' : '-400px'};
  width: 400px;
  height: 100vh;
  background: linear-gradient(180deg, #1e3c72 0%, #2a5298 100%);
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.3);
  transition: right 0.3s ease-in-out;
  z-index: 2000;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  background: rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Title = styled.h2`
  margin: 0;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Controls = styled.div`
  display: flex;
  gap: 12px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const FilterContainer = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const FilterButton = styled.button<{ active: boolean }>`
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
  border: none;
  color: white;
  padding: 6px 12px;
  margin: 4px;
  border-radius: 16px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const NotificationList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px 20px;
`;

const EmptyState = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  padding: 40px 20px;
`;

const Badge = styled.span`
  background: #ff4757;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
  margin-left: 8px;
`;

const ToggleButton = styled.button<{ hasNotifications: boolean }>`
  position: fixed;
  top: 20px;
  right: 20px;
  background: ${props => props.hasNotifications ? 'linear-gradient(135deg, #ff4757 0%, #ff3742 100%)' : 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)'};
  border: none;
  color: white;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  z-index: 1999;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.1);
  }

  ${props => props.hasNotifications && `
    animation: pulse 2s infinite;

    @keyframes pulse {
      0% {
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
      }
      50% {
        box-shadow: 0 4px 20px rgba(255, 71, 87, 0.4);
      }
      100% {
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
      }
    }
  `}
`;

interface NotificationCenterProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function NotificationCenter({ isOpen, onToggle }: NotificationCenterProps) {
  const { state, dispatch } = useNotification();
  const [selectedCategory, setSelectedCategory] = useState<NotificationCategory | 'ALL'>('ALL');

  const filteredNotifications = state.notifications.filter(notification => {
    // Only show visible notifications (not dismissed)
    if (!notification.isVisible) return false;

    if (selectedCategory === 'ALL') return true;
    return notification.category === selectedCategory;
  });

  const unreadCount = state.notifications.filter(n => !n.isRead && n.isVisible).length;

  const handleMarkAsRead = (id: string) => {
    dispatch({ type: 'MARK_AS_READ', payload: id });
  };

  const handleDismiss = (id: string) => {
    dispatch({ type: 'DISMISS_NOTIFICATION', payload: id });
  };

  const categories: (NotificationCategory | 'ALL')[] = [
    'ALL',
    NotificationCategory.SAFETY,
    NotificationCategory.OPERATIONAL_INFO,
    NotificationCategory.CROSS_APP,
    NotificationCategory.SYSTEM,
    NotificationCategory.NON_SAFETY_PROMOTIONAL,
  ];

  return (
    <>
      <ToggleButton hasNotifications={unreadCount > 0} onClick={onToggle}>
        <Bell size={24} />
        {unreadCount > 0 && <Badge>{unreadCount}</Badge>}
      </ToggleButton>

      <Container isOpen={isOpen}>
        <Header>
          <Title>
            <Bell size={20} />
            Notifications
            {unreadCount > 0 && <Badge>{unreadCount}</Badge>}
          </Title>
          <Controls>
            <IconButton
              onClick={() => dispatch({ type: 'CLEAR_ALL_NOTIFICATIONS' })}
              title="Clear all notifications"
            >
              <Trash2 size={18} />
            </IconButton>
            <IconButton onClick={onToggle}>
              <X size={18} />
            </IconButton>
          </Controls>
        </Header>

        <FilterContainer>
          {categories.map(category => (
            <FilterButton
              key={category}
              active={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            >
              {category.replace('_', ' ')}
            </FilterButton>
          ))}
        </FilterContainer>

        <NotificationList>
          {filteredNotifications.length === 0 ? (
            <EmptyState>
              <Bell size={48} style={{ opacity: 0.3, marginBottom: '16px' }} />
              <div>No notifications</div>
            </EmptyState>
          ) : (
            filteredNotifications.map(notification => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onMarkAsRead={handleMarkAsRead}
                onDismiss={handleDismiss}
              />
            ))
          )}
        </NotificationList>
      </Container>
    </>
  );
}