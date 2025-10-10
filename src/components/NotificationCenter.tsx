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
  background: #f5f5f5;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease-in-out;
  z-index: 2000;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  background: #eeeeee;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #333333;
  border-bottom: 1px solid #e0e0e0;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #333333;
`;

const Controls = styled.div`
  display: flex;
  gap: 12px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: #666666;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
`;

const FilterContainer = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid #e0e0e0;
`;

const FilterButton = styled.button<{ active: boolean }>`
  background: ${props => props.active ? '#cccccc' : '#e0e0e0'};
  border: none;
  color: #333333;
  padding: 6px 12px;
  margin: 4px;
  border-radius: 16px;
  font-size: 12px;
  cursor: pointer;
`;

const NotificationList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px 20px;
`;

const EmptyState = styled.div`
  text-align: center;
  color: #999999;
  padding: 40px 20px;
`;

const Badge = styled.span`
  background: #999999;
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
  background: ${props => props.hasNotifications ? '#999999' : '#cccccc'};
  border: none;
  color: white;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  z-index: 1999;
  display: none; /* Hidden: notification center button disabled */
  align-items: center;
  justify-content: center;
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