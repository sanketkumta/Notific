import React, { createContext, useContext, useReducer } from 'react';
import { Notification, NotificationSettings, FlightInfo, sortNotifications } from '../types/notification';
import { notificationData } from '../data/notificationData';

interface NotificationState {
  notifications: Notification[];
  settings: NotificationSettings;
  flightInfo: FlightInfo;
  activeNotifications: Notification[];
}

type NotificationAction =
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'MARK_AS_READ'; payload: string }
  | { type: 'DISMISS_NOTIFICATION'; payload: string }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<NotificationSettings> }
  | { type: 'CLEAR_ALL_NOTIFICATIONS' }
  | { type: 'LOAD_SAMPLE_NOTIFICATIONS' };

const initialState: NotificationState = {
  notifications: [],
  settings: {
    enableSound: true,
    enableVibration: true,
    safetyNotifications: true,
    operationalNotifications: true,
    promotionalNotifications: true,
    systemNotifications: true,
  },
  flightInfo: {
    flightNumber: 'AA123',
    origin: 'JFK',
    destination: 'LAX',
    departureTime: '14:30',
    arrivalTime: '18:45',
    currentAltitude: 35000,
    flightPhase: 'cruise',
  },
  activeNotifications: [],
};

function notificationReducer(state: NotificationState, action: NotificationAction): NotificationState {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      const newNotification = action.payload;
      const updatedNotifications = [newNotification, ...state.notifications];
      const sortedNotifications = sortNotifications(updatedNotifications);
      const activeNotifications = sortedNotifications
        .filter(n => !n.isRead && n.isVisible)
        .slice(0, 6); // Show up to 6 active notifications

      return {
        ...state,
        notifications: sortedNotifications,
        activeNotifications,
      };

    case 'MARK_AS_READ':
      const updatedNotificationsRead = state.notifications.map(n =>
        n.id === action.payload ? { ...n, isRead: true } : n
      );
      const sortedNotificationsRead = sortNotifications(updatedNotificationsRead);
      const activeNotificationsRead = sortedNotificationsRead
        .filter(n => !n.isRead && n.isVisible)
        .slice(0, 6);

      return {
        ...state,
        notifications: sortedNotificationsRead,
        activeNotifications: activeNotificationsRead,
      };

    case 'DISMISS_NOTIFICATION':
      const updatedNotificationsDismiss = state.notifications.map(n =>
        n.id === action.payload ? { ...n, isVisible: false } : n
      );
      const sortedNotificationsDismiss = sortNotifications(updatedNotificationsDismiss);
      const activeNotificationsDismiss = sortedNotificationsDismiss
        .filter(n => !n.isRead && n.isVisible)
        .slice(0, 6);

      return {
        ...state,
        notifications: sortedNotificationsDismiss,
        activeNotifications: activeNotificationsDismiss,
      };

    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: { ...state.settings, ...action.payload },
      };

    case 'CLEAR_ALL_NOTIFICATIONS':
      return {
        ...state,
        notifications: [],
        activeNotifications: [],
      };

    case 'LOAD_SAMPLE_NOTIFICATIONS':
      const sortedSampleNotifications = sortNotifications(notificationData);
      return {
        ...state,
        notifications: sortedSampleNotifications,
        activeNotifications: sortedSampleNotifications
          .filter(n => !n.isRead && n.isVisible)
          .slice(0, 6), // Show up to 6 sample notifications
      };

    default:
      return state;
  }
}

const NotificationContext = createContext<{
  state: NotificationState;
  dispatch: React.Dispatch<NotificationAction>;
} | null>(null);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(notificationReducer, initialState);


  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}