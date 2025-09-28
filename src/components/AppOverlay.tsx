import React from 'react';
import styled from 'styled-components';
import { X, ArrowLeft } from 'lucide-react';
import { NotificationTrigger } from './NotificationTrigger';
import { AnimatedNotifications } from './AnimatedNotifications';
import { NotificationCenter } from './NotificationCenter';
import { NotificationStatus } from './NotificationStatus';

// Import app pages
import { FlightSafetySystem } from '../pages/FlightSafetySystem';
import { FlightManagement } from '../pages/FlightManagement';
import { EntertainmentHub } from '../pages/EntertainmentHub';
import { WiFiManagement } from '../pages/WiFiManagement';
import { DutyFreeShop } from '../pages/DutyFreeShop';
import { CabinService } from '../pages/CabinService';

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  z-index: 1500;
  display: ${props => props.isOpen ? 'flex' : 'none'};
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled.div`
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  position: relative;
  z-index: 1600;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const BackButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
  }
`;

const AppTitle = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: 300;
`;

const AppSubtitle = styled.p`
  margin: 4px 0 0 0;
  opacity: 0.8;
  font-size: 14px;
`;

const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }
`;

const ContentArea = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
`;

const AppContent = styled.div`
  height: 100%;
  overflow-y: auto;
`;

interface AppOverlayProps {
  isOpen: boolean;
  appId: string | null;
  onClose: () => void;
  isNotificationCenterOpen: boolean;
  onToggleNotificationCenter: () => void;
}

const getAppInfo = (appId: string) => {
  const appMap: Record<string, { title: string; subtitle: string }> = {
    'movies': { title: 'Movies & TV', subtitle: 'Stream 500+ titles' },
    'music': { title: 'Music', subtitle: 'Unlimited streaming' },
    'games': { title: 'Games', subtitle: 'Arcade & puzzles' },
    'duty-free': { title: 'Duty Free Shop', subtitle: 'Shop & save' },
    'food': { title: 'Food & Drinks', subtitle: 'Order to seat' },
    'internet': { title: 'Internet', subtitle: 'High-speed WiFi' },
    'map': { title: 'Flight Map', subtitle: 'Live tracking' },
    'photos': { title: 'Photo Gallery', subtitle: 'Destination pics' },
    'audiobooks': { title: 'Audio Books', subtitle: 'Best sellers' },
    'lounge': { title: 'Lounge Services', subtitle: 'VIP experience' },
  };
  return appMap[appId] || { title: 'App', subtitle: 'Loading...' };
};

const renderAppContent = (appId: string) => {
  switch (appId) {
    case 'duty-free':
      return <DutyFreeShop />;
    case 'internet':
      return <WiFiManagement />;
    case 'food':
      return <CabinService />;
    case 'movies':
      return <EntertainmentHub />;
    case 'music':
      return <EntertainmentHub />;
    case 'games':
      return <EntertainmentHub />;
    case 'map':
      return <FlightManagement />;
    case 'photos':
      return <EntertainmentHub />;
    case 'audiobooks':
      return <EntertainmentHub />;
    case 'lounge':
      return <CabinService />;
    default:
      return (
        <div style={{
          padding: '40px',
          color: 'white',
          textAlign: 'center',
          minHeight: '400px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <h2>Welcome to {getAppInfo(appId).title}!</h2>
          <p>This app is fully functional with all features available.</p>
          <p>You can trigger and view notifications while using this app.</p>
          <p>Try using the notification triggers on the left side!</p>
        </div>
      );
  }
};

export function AppOverlay({
  isOpen,
  appId,
  onClose,
  isNotificationCenterOpen,
  onToggleNotificationCenter
}: AppOverlayProps) {
  if (!appId) return null;

  const appInfo = getAppInfo(appId);

  return (
    <Overlay isOpen={isOpen}>
      <Header>
        <HeaderLeft>
          <BackButton onClick={onClose}>
            <ArrowLeft size={16} />
            Back to Dashboard
          </BackButton>
          <div>
            <AppTitle>{appInfo.title}</AppTitle>
            <AppSubtitle>{appInfo.subtitle}</AppSubtitle>
          </div>
        </HeaderLeft>
        <CloseButton onClick={onClose}>
          <X size={20} />
        </CloseButton>
      </Header>

      <ContentArea>
        <AppContent>
          {renderAppContent(appId)}
        </AppContent>

        {/* Notification system remains accessible in app overlay */}
        <NotificationStatus />
        <AnimatedNotifications onOpenNotificationCenter={onToggleNotificationCenter} />
        <NotificationCenter
          isOpen={isNotificationCenterOpen}
          onToggle={onToggleNotificationCenter}
        />
        <NotificationTrigger />
      </ContentArea>
    </Overlay>
  );
}