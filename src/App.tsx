import React, { useState } from 'react';
import styled from 'styled-components';
import { NotificationProvider, useNotification } from './context/NotificationContext';
import { NotificationCenter } from './components/NotificationCenter';
import { AnimatedNotifications } from './components/AnimatedNotifications';
import { FlightInfo } from './components/FlightInfo';
import { EntertainmentDashboard } from './components/EntertainmentDashboard';
import { NotificationTrigger } from './components/NotificationTrigger';
import { QuickTriggers } from './components/QuickTriggers';
import { NotificationStatus } from './components/NotificationStatus';
import { AppOverlay } from './components/AppOverlay';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
`;

const Header = styled.header`
  background: rgba(0, 0, 0, 0.1);
  color: white;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  backdrop-filter: blur(10px);
`;

const Title = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: 300;
`;

const Subtitle = styled.p`
  margin: 4px 0 0 0;
  opacity: 0.8;
  font-size: 14px;
`;

const MainContent = styled.main`
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
`;

const WelcomeSection = styled.section`
  text-align: center;
  color: white;
  margin-bottom: 32px;
`;

const WelcomeTitle = styled.h2`
  font-size: 28px;
  margin-bottom: 8px;
  font-weight: 300;
`;

const WelcomeText = styled.p`
  font-size: 16px;
  opacity: 0.9;
  margin-bottom: 24px;
`;

function AppContent() {
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState(false);
  const [currentApp, setCurrentApp] = useState<string | null>(null);
  const { dispatch } = useNotification();

  const toggleNotificationCenter = () => {
    setIsNotificationCenterOpen(!isNotificationCenterOpen);
  };

  const handleAppOpen = (appId: string) => {
    setCurrentApp(appId);
    dispatch({ type: 'SET_CURRENT_APP', payload: appId });
  };

  const handleAppClose = () => {
    setCurrentApp(null);
    dispatch({ type: 'SET_CURRENT_APP', payload: null });
  };

  return (
    <AppContainer>
      <Header>
        <div>
          <Title>SkyConnect Entertainment</Title>
          <Subtitle>Inflight Entertainment & Services</Subtitle>
        </div>
        <QuickTriggers />
      </Header>

      <MainContent>
        <WelcomeSection>
          <WelcomeTitle>Welcome Aboard!</WelcomeTitle>
          <WelcomeText>
            Enjoy our comprehensive entertainment system and stay connected throughout your journey.
          </WelcomeText>
        </WelcomeSection>

        <FlightInfo />
        <EntertainmentDashboard onAppOpen={handleAppOpen} />
      </MainContent>

      {/* Only show notification system on main dashboard when no app is open */}
      {!currentApp && (
        <>
          <NotificationStatus />
          <AnimatedNotifications onOpenNotificationCenter={() => setIsNotificationCenterOpen(true)} />
          <NotificationCenter
            isOpen={isNotificationCenterOpen}
            onToggle={toggleNotificationCenter}
          />
          <NotificationTrigger />
        </>
      )}

      {/* App overlay with its own notification system */}
      <AppOverlay
        isOpen={!!currentApp}
        appId={currentApp}
        onClose={handleAppClose}
        isNotificationCenterOpen={isNotificationCenterOpen}
        onToggleNotificationCenter={toggleNotificationCenter}
      />
    </AppContainer>
  );
}

function App() {
  return (
    <NotificationProvider>
      <AppContent />
    </NotificationProvider>
  );
}

export default App;
