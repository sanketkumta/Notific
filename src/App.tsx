import React, { useState } from 'react';
import styled from 'styled-components';
import { NotificationProvider, useNotification } from './context/NotificationContext';
import { NotificationCenter } from './components/NotificationCenter';
import { AnimatedNotifications } from './components/AnimatedNotifications';
import { EntertainmentDashboard } from './components/EntertainmentDashboard';
import { NotificationTrigger } from './components/NotificationTrigger';
import { NotificationStatus } from './components/NotificationStatus';
import { AppOverlay } from './components/AppOverlay';
import { ScoringSystemManager } from './components/ScoringSystemManager';

const AppContainer = styled.div`
  min-height: 100vh;
  background: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
`;

const Header = styled.header`
  background: #f5f5f5;
  color: #333333;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: 300;
  color: #333333;
`;

const Subtitle = styled.p`
  margin: 4px 0 0 0;
  opacity: 0.8;
  font-size: 14px;
  color: #666666;
`;

const MainContent = styled.main`
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
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

  const handleScoringUpdate = (formulaType: string, newFormula: any) => {
    dispatch({
      type: 'UPDATE_SCORING_CONFIG',
      payload: {
        [formulaType]: newFormula
      }
    });
  };

  return (
    <AppContainer>
      <Header>
        <div>
          <Title>SkyConnect Entertainment</Title>
          <Subtitle>Inflight Entertainment & Services</Subtitle>
        </div>
      </Header>

      <MainContent>
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

             {/* Scoring System Manager - Always visible */}
             <ScoringSystemManager onFormulaUpdate={handleScoringUpdate} />

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
