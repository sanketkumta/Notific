import React from 'react';
import styled from 'styled-components';
import { useNotification } from '../context/NotificationContext';
import { generateAppNotification } from '../data/notificationData';
import {
  Play,
  ShoppingBag,
  Utensils,
} from 'lucide-react';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 16px;
  padding: 20px;
`;

const AppTile = styled.div`
  background: #f5f5f5;
  border-radius: 16px;
  padding: 20px;
  color: #333333;
  text-align: center;
  cursor: pointer;
  border: 1px solid #e0e0e0;

  &:nth-child(1) {
    background: #f5f5f5;
  }

  &:nth-child(2) {
    background: #eeeeee;
  }

  &:nth-child(3) {
    background: #e0e0e0;
  }
`;

const AppIcon = styled.div`
  margin-bottom: 12px;
`;

const AppName = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

const AppDescription = styled.div`
  font-size: 11px;
  color: #999999;
  margin-top: 4px;
`;



const apps = [
  {
    icon: <Play size={32} />,
    name: 'Movies & TV',
    description: '500+ titles',
    id: 'movies'
  },
  {
    icon: <Utensils size={32} />,
    name: 'Food & Drinks',
    description: 'Order to seat',
    id: 'food'
  },
  {
    icon: <ShoppingBag size={32} />,
    name: 'Duty Free',
    description: 'Shop & save',
    id: 'duty-free'
  }
];


interface EntertainmentDashboardProps {
  onAppOpen: (appId: string) => void;
}

export function EntertainmentDashboard({ onAppOpen }: EntertainmentDashboardProps) {
  const { dispatch } = useNotification();

  const handleAppClick = (appId: string) => {
    onAppOpen(appId);

    // Trigger context-aware notification after app opens
    setTimeout(() => {
      const notification = generateAppNotification(appId);
      dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
    }, 2000); // 2 second delay to simulate app loading
  };

  return (
    <Container>
      {apps.map((app, index) => (
        <AppTile key={index} onClick={() => handleAppClick(app.id)}>
          <AppIcon>{app.icon}</AppIcon>
          <AppName>{app.name}</AppName>
          <AppDescription>{app.description}</AppDescription>
        </AppTile>
      ))}
    </Container>
  );
}