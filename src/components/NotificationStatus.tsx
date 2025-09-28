import React from 'react';
import styled from 'styled-components';
import { Bell, Eye, Archive } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';

const Container = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 12px 20px;
  color: white;
  display: flex;
  align-items: center;
  gap: 20px;
  z-index: 600;
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 12px;
`;

const StatusItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
`;

const Count = styled.span<{ highlight?: boolean }>`
  background: ${props => props.highlight ? '#ff4757' : 'rgba(255, 255, 255, 0.2)'};
  color: white;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  min-width: 20px;
  text-align: center;
`;

export function NotificationStatus() {
  const { state } = useNotification();

  const totalNotifications = state.notifications.length;
  const activeNotifications = state.activeNotifications.length;
  const readNotifications = state.notifications.filter(n => n.isRead).length;
  const unreadNotifications = state.notifications.filter(n => !n.isRead).length;

  return (
    <Container>
      <StatusItem>
        <Eye size={14} />
        Active Toast:
        <Count highlight={activeNotifications >= 6}>{activeNotifications}</Count>
      </StatusItem>

      <StatusItem>
        <Bell size={14} />
        Total in Center:
        <Count>{totalNotifications}</Count>
      </StatusItem>

      <StatusItem>
        <Archive size={14} />
        Unread:
        <Count highlight={unreadNotifications > 0}>{unreadNotifications}</Count>
      </StatusItem>

      <StatusItem>
        Read: <Count>{readNotifications}</Count>
      </StatusItem>
    </Container>
  );
}