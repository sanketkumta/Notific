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

// Category-specific grading formulas based on the images
export function calculateWeightedScore(notification: Notification, currentAppContext?: string): number {
  // Determine if this is a Cross-App or In-App notification based on current context
  const isCurrentApp = currentAppContext &&
    (notification.app.toLowerCase().includes(currentAppContext.toLowerCase()) ||
     currentAppContext.toLowerCase().includes(notification.app.toLowerCase()));

  switch (notification.category) {
    case NotificationCategory.SAFETY:
      // Global: Priority + Impact on passengers + Consequence to passenger of not having this info
      return notification.priority + notification.relevance + notification.consequence;

    case NotificationCategory.SYSTEM:
      // User system: Priority + How relevant is to which app user is on + Consequence to passenger for not having this info
      const appRelevance = isCurrentApp ? 10 : notification.relevance;
      return notification.priority + appRelevance + notification.consequence;

    case NotificationCategory.OPERATIONAL_INFO:
      // Use system formula for operational notifications
      const opAppRelevance = isCurrentApp ? 10 : notification.relevance;
      return notification.priority + opAppRelevance + notification.consequence;

    case NotificationCategory.CROSS_APP:
      // Apply Cross-App formula when notification is from different app
      if (currentAppContext && !isCurrentApp) {
        const categoryImportance = getCategoryImportance(notification.category);
        const cashValue = notification.priorityScore / 10;
        return (0.40 * categoryImportance) + (0.25 * cashValue) + (0.20 * notification.relevance) + (0.15 * notification.recency);
      }
      // If it's actually from same app, treat as In-App
      return notification.timePhaseBound + notification.relevance + notification.consequence + notification.recency;

    case NotificationCategory.IN_APP:
      // Apply In-App formula when notification is from same app
      if (currentAppContext && isCurrentApp) {
        return notification.timePhaseBound + notification.relevance + notification.consequence + notification.recency;
      }
      // If it's actually from different app, treat as Cross-App
      const categoryImportance = getCategoryImportance(notification.category);
      const cashValue = notification.priorityScore / 10;
      return (0.40 * categoryImportance) + (0.25 * cashValue) + (0.20 * notification.relevance) + (0.15 * notification.recency);

    default:
      // Default formula for any other categories - determine context dynamically
      if (currentAppContext && !isCurrentApp) {
        // Cross-app scenario
        const categoryImportance = getCategoryImportance(notification.category);
        const cashValue = notification.priorityScore / 10;
        return (0.40 * categoryImportance) + (0.25 * cashValue) + (0.20 * notification.relevance) + (0.15 * notification.recency);
      } else {
        // In-app scenario or no context
        return notification.timePhaseBound + notification.relevance + notification.consequence + notification.recency;
      }
  }
}

function getCategoryImportance(category: NotificationCategory): number {
  switch (category) {
    case NotificationCategory.SAFETY: return 3;
    case NotificationCategory.OPERATIONAL_INFO: return 2.5;
    case NotificationCategory.SYSTEM: return 2;
    case NotificationCategory.CROSS_APP: return 1.5;
    case NotificationCategory.NON_SAFETY_PROMOTIONAL: return 1;
    case NotificationCategory.IN_APP: return 1;
    default: return 1;
  }
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

export function sortNotifications(notifications: Notification[], currentAppContext?: string): Notification[] {
  return notifications.sort((a, b) => {
    // First, sort by category priority
    const categoryPriorityA = CATEGORY_PRIORITY[a.category];
    const categoryPriorityB = CATEGORY_PRIORITY[b.category];

    if (categoryPriorityA !== categoryPriorityB) {
      return categoryPriorityA - categoryPriorityB;
    }

    // Within the same category, sort by weighted score (higher score first)
    const scoreA = calculateWeightedScore(a, currentAppContext);
    const scoreB = calculateWeightedScore(b, currentAppContext);
    return scoreB - scoreA;
  });
}