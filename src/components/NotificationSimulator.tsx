import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';
import { Notification, NotificationCategory, PriorityLevel } from '../types/notification';

const Container = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 16px;
  color: white;
  min-width: 200px;
`;

const Title = styled.h3`
  margin: 0 0 12px 0;
  font-size: 14px;
  opacity: 0.8;
`;

const Controls = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
`;

const Button = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const Status = styled.div`
  font-size: 12px;
  opacity: 0.7;
`;

const sampleNotifications = [
  {
    app: 'Flight Safety System',
    category: NotificationCategory.SAFETY,
    priority: PriorityLevel.CRITICAL,
    message: 'Please fasten your seatbelt - Turbulence detected ahead',
    trigger: 'Weather radar alert'
  },
  {
    app: 'Meal Service',
    category: NotificationCategory.OPERATIONAL_INFO,
    priority: PriorityLevel.HIGH,
    message: 'Lunch service will begin in 15 minutes',
    trigger: 'Service schedule'
  },
  {
    app: 'WiFi System',
    category: NotificationCategory.SYSTEM,
    priority: PriorityLevel.MEDIUM,
    message: 'WiFi connection restored - Enjoy browsing!',
    trigger: 'Network status change'
  },
  {
    app: 'Duty Free Shop',
    category: NotificationCategory.NON_SAFETY_PROMOTIONAL,
    priority: PriorityLevel.LOW,
    message: 'Limited time offer: 25% off fragrances',
    trigger: 'Promotional campaign'
  },
  {
    app: 'Hotel Booking',
    category: NotificationCategory.CROSS_APP,
    priority: PriorityLevel.MEDIUM,
    message: 'Your hotel room is ready for early check-in',
    trigger: 'Hotel confirmation'
  }
];

export function NotificationSimulator() {
  const { dispatch } = useNotification();
  const [isRunning, setIsRunning] = React.useState(false);
  const [intervalId, setIntervalId] = React.useState<number | null>(null);

  const generateRandomNotification = (): Notification => {
    const sample = sampleNotifications[Math.floor(Math.random() * sampleNotifications.length)];
    return {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      app: sample.app,
      category: sample.category,
      priority: sample.priority,
      priorityScore: Math.floor(Math.random() * 40) + 10,
      timePhaseBound: Math.floor(Math.random() * 10) + 1,
      relevance: Math.floor(Math.random() * 10) + 1,
      consequence: Math.floor(Math.random() * 10) + 1,
      recency: Math.floor(Math.random() * 10) + 1,
      trigger: sample.trigger,
      message: sample.message,
      timestamp: new Date(),
      isRead: false,
      isVisible: true,
    };
  };

  const startSimulation = () => {
    if (intervalId) return;

    setIsRunning(true);
    const id = window.setInterval(() => {
      const notification = generateRandomNotification();
      dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
    }, 5000);

    setIntervalId(id);
  };

  const stopSimulation = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setIsRunning(false);
  };

  const resetNotifications = () => {
    dispatch({ type: 'CLEAR_ALL_NOTIFICATIONS' });
    dispatch({ type: 'LOAD_SAMPLE_NOTIFICATIONS' });
  };

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return (
    <Container>
      <Title>Notification Demo</Title>
      <Controls>
        {!isRunning ? (
          <Button onClick={startSimulation}>
            <Play size={12} />
            Start
          </Button>
        ) : (
          <Button onClick={stopSimulation}>
            <Pause size={12} />
            Stop
          </Button>
        )}
        <Button onClick={resetNotifications}>
          <RotateCcw size={12} />
          Reset
        </Button>
      </Controls>
      <Status>
        {isRunning ? 'Simulating notifications...' : 'Click Start to simulate notifications'}
      </Status>
    </Container>
  );
}