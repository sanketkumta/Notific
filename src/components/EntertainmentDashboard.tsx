import React from 'react';
import styled from 'styled-components';
import { useNotification } from '../context/NotificationContext';
import { generateAppNotification } from '../data/notificationData';
import {
  Play,
  Music,
  Gamepad2,
  ShoppingBag,
  Utensils,
  Wifi,
  Map,
  Camera,
  Headphones,
  Coffee,
} from 'lucide-react';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 16px;
  padding: 20px;
`;

const AppTile = styled.div`
  background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
  border-radius: 16px;
  padding: 20px;
  color: white;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }

  &:nth-child(odd) {
    background: linear-gradient(135deg, #fd79a8 0%, #e84393 100%);
  }

  &:nth-child(3n) {
    background: linear-gradient(135deg, #fdcb6e 0%, #e17055 100%);
  }

  &:nth-child(4n) {
    background: linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%);
  }

  &:nth-child(5n) {
    background: linear-gradient(135deg, #00b894 0%, #00cec9 100%);
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
  opacity: 0.8;
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
    icon: <Music size={32} />,
    name: 'Music',
    description: 'Unlimited streaming',
    id: 'music'
  },
  {
    icon: <Gamepad2 size={32} />,
    name: 'Games',
    description: 'Arcade & puzzles',
    id: 'games'
  },
  {
    icon: <ShoppingBag size={32} />,
    name: 'Duty Free',
    description: 'Shop & save',
    id: 'duty-free'
  },
  {
    icon: <Utensils size={32} />,
    name: 'Food & Drinks',
    description: 'Order to seat',
    id: 'food'
  },
  {
    icon: <Wifi size={32} />,
    name: 'Internet',
    description: 'High-speed WiFi',
    id: 'internet'
  },
  {
    icon: <Map size={32} />,
    name: 'Flight Map',
    description: 'Live tracking',
    id: 'map'
  },
  {
    icon: <Camera size={32} />,
    name: 'Photo Gallery',
    description: 'Destination pics',
    id: 'photos'
  },
  {
    icon: <Headphones size={32} />,
    name: 'Audio Books',
    description: 'Best sellers',
    id: 'audiobooks'
  },
  {
    icon: <Coffee size={32} />,
    name: 'Lounge Services',
    description: 'VIP experience',
    id: 'lounge'
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