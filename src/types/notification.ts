export interface Notification {
  id: string;
  app: string;
  category: NotificationCategory;
  priority: PriorityLevel;
  priorityScore: number;
  timePhaseBound: number;
  relevance: number;
  consequence: number;
  recency: number;
  trigger: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  isVisible: boolean;
}

export enum NotificationCategory {
  SAFETY = 'Safety',
  OPERATIONAL_INFO = 'Operational Info',
  CROSS_APP = 'Cross-App',
  NON_SAFETY_PROMOTIONAL = 'Non-safety / Promotional',
  SYSTEM = 'System',
  IN_APP = 'In-app'
}

export enum PriorityLevel {
  CRITICAL = 1,
  HIGH = 2,
  MEDIUM = 3,
  LOW = 4,
  VERY_LOW = 5,
  MINIMAL = 6
}

export interface NotificationSettings {
  enableSound: boolean;
  enableVibration: boolean;
  safetyNotifications: boolean;
  operationalNotifications: boolean;
  promotionalNotifications: boolean;
  systemNotifications: boolean;
}

export interface FlightInfo {
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  currentAltitude: number;
  flightPhase: 'boarding' | 'taxi' | 'takeoff' | 'cruise' | 'descent' | 'landing' | 'arrived';
}

export interface NotificationWeights {
  timePhaseBound: number;
  relevance: number;
  consequence: number;
  recency: number;
}

export const DEFAULT_WEIGHTS: NotificationWeights = {
  timePhaseBound: 0.4,
  relevance: 0.3,
  consequence: 0.2,
  recency: 0.1
};

export function calculateWeightedScore(notification: Notification, weights: NotificationWeights = DEFAULT_WEIGHTS): number {
  return (
    weights.timePhaseBound * notification.timePhaseBound +
    weights.relevance * notification.relevance +
    weights.consequence * notification.consequence +
    weights.recency * notification.recency
  );
}

// Define category priority order
const CATEGORY_PRIORITY: Record<NotificationCategory, number> = {
  [NotificationCategory.SAFETY]: 1,
  [NotificationCategory.OPERATIONAL_INFO]: 2,
  [NotificationCategory.SYSTEM]: 3,
  [NotificationCategory.CROSS_APP]: 4,
  [NotificationCategory.NON_SAFETY_PROMOTIONAL]: 5,
  [NotificationCategory.IN_APP]: 6
};

export function sortNotifications(notifications: Notification[]): Notification[] {
  return notifications.sort((a, b) => {
    // First, sort by category priority
    const categoryPriorityA = CATEGORY_PRIORITY[a.category];
    const categoryPriorityB = CATEGORY_PRIORITY[b.category];

    if (categoryPriorityA !== categoryPriorityB) {
      return categoryPriorityA - categoryPriorityB;
    }

    // Within the same category, sort by weighted score (higher score first)
    const scoreA = calculateWeightedScore(a);
    const scoreB = calculateWeightedScore(b);
    return scoreB - scoreA;
  });
}