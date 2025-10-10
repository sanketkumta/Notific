/**
 * NOTIFICATION SCORING SYSTEM
 * 
 * Standard Formula Format:
 * Score = (Weight1 × Param1) + (Weight2 × Param2) + (Weight3 × Param3) + ...
 * 
 * Rules:
 * 1. All Weights are in range [0, 1] and must sum to 1.0
 * 2. All Parameters are in range [1, 10]
 * 3. Maximum possible Score = 10.0 (when all params = 10 and weights sum to 1)
 * 
 * Example:
 * If using 3 parameters with weights 0.33, 0.33, 0.33:
 * Score = (0.33 × Param1) + (0.33 × Param2) + (0.33 × Param3)
 * Max Score = (0.33 × 10) + (0.33 × 10) + (0.33 × 10) = 9.9 ≈ 10.0
 */

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

export interface ScoringWeights {
  categoryImportance?: number;
  cashValue?: number;
  relevance?: number;
  recency?: number;
  priority?: number;
  appRelevance?: number;
  consequence?: number;
  timePhaseBound?: number;
  impact?: number;
}

export interface FormulaConfig {
  name: string;
  description: string;
  formula: string;
  weights: ScoringWeights;
  maxScore: number;
  normalizedMax: number;
  parameters: string[];
  enabled: boolean;
}

export interface ScoringSystemConfig {
  crossApp: FormulaConfig;
  userSystem: FormulaConfig;
  safetyOperational: FormulaConfig;
  withinApp: FormulaConfig;
  globalSettings: {
    enabled: boolean;
    debugMode: boolean;
    showCalculations: boolean;
  };
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

// Category-specific grading formulas normalized to 0-10 scale based on the provided screenshots
export function calculateWeightedScore(notification: Notification, currentAppContext?: string): number {
  // Determine if this is a Cross-App or In-App notification based on current context
  const isCurrentApp = currentAppContext &&
    (notification.app.toLowerCase().includes(currentAppContext.toLowerCase()) ||
     currentAppContext.toLowerCase().includes(notification.app.toLowerCase()));

  // Determine if this should be treated as cross-app or within-app
  const isCrossApp = currentAppContext && !isCurrentApp;
  const isWithinApp = currentAppContext && isCurrentApp;

  let rawScore = 0;
  let maxPossibleScore = 10;

  switch (notification.category) {
    case NotificationCategory.SAFETY:
      // Safety and operational formula: Priority + Impact on passengers + Consequence to passenger of not having this info
      // Using relevance as "Impact on passengers" as per screenshot
      // Max: 1 + 10 + 10 = 21, Min: 10 + 1 + 1 = 12 (since priority 1-10, but 1 is highest)
      rawScore = notification.priority + notification.relevance + notification.consequence;
      maxPossibleScore = 21;
      break;

    case NotificationCategory.OPERATIONAL_INFO:
      // Safety and operational formula: Priority + Impact on passengers + Consequence to passenger of not having this info
      // Using relevance as "Impact on passengers" as per screenshot
      rawScore = notification.priority + notification.relevance + notification.consequence;
      maxPossibleScore = 21;
      break;

    case NotificationCategory.SYSTEM:
      // User system formula: Priority + How relevant is to which app user is on + Consequence to passenger for not having this info
      const appRelevance = isWithinApp ? 10 : notification.relevance;
      rawScore = notification.priority + appRelevance + notification.consequence;
      maxPossibleScore = 21; // 1 + 10 + 10
      break;

    case NotificationCategory.CROSS_APP:
      if (isCrossApp) {
        // Cross app notifications formula: 0.40 × Category Importance + 0.25 × Cash Value + 0.20 × Relevance + 0.15 × Recency
        const categoryImportance = getCategoryImportance(notification.category);
        const cashValue = notification.priorityScore / 10; // Cash value in ((current$/max$)*10)
        rawScore = (0.40 * categoryImportance) + (0.25 * cashValue) + (0.20 * notification.relevance) + (0.15 * notification.recency);
        maxPossibleScore = (0.40 * 3) + (0.25 * 4) + (0.20 * 10) + (0.15 * 10); // 5.7
      } else {
        // If within same app, use within app formula
        rawScore = notification.timePhaseBound + notification.relevance + notification.consequence + notification.recency;
        maxPossibleScore = 40; // 10 + 10 + 10 + 10
      }
      break;

    case NotificationCategory.IN_APP:
      if (isWithinApp) {
        // Within app notifications formula: Time or Phase-bound + How relevant is to what user is doing in the app + Consequence + How recent
        rawScore = notification.timePhaseBound + notification.relevance + notification.consequence + notification.recency;
        maxPossibleScore = 40; // 10 + 10 + 10 + 10
      } else {
        // If from different app, use cross-app formula
        const categoryImportance = getCategoryImportance(notification.category);
        const cashValue = notification.priorityScore / 10;
        rawScore = (0.40 * categoryImportance) + (0.25 * cashValue) + (0.20 * notification.relevance) + (0.15 * notification.recency);
        maxPossibleScore = (0.40 * 3) + (0.25 * 4) + (0.20 * 10) + (0.15 * 10); // 5.7
      }
      break;

    case NotificationCategory.NON_SAFETY_PROMOTIONAL:
      // Promotional notifications - determine context dynamically
      if (isCrossApp) {
        // Cross app formula
        const categoryImportance = getCategoryImportance(notification.category);
        const cashValue = notification.priorityScore / 10;
        rawScore = (0.40 * categoryImportance) + (0.25 * cashValue) + (0.20 * notification.relevance) + (0.15 * notification.recency);
        maxPossibleScore = (0.40 * 3) + (0.25 * 4) + (0.20 * 10) + (0.15 * 10); // 5.7
      } else {
        // Within app or no context - use within app formula
        rawScore = notification.timePhaseBound + notification.relevance + notification.consequence + notification.recency;
        maxPossibleScore = 40;
      }
      break;

    default:
      // Default formula based on context
      if (isCrossApp) {
        // Cross-app scenario
        const categoryImportance = getCategoryImportance(notification.category);
        const cashValue = notification.priorityScore / 10;
        rawScore = (0.40 * categoryImportance) + (0.25 * cashValue) + (0.20 * notification.relevance) + (0.15 * notification.recency);
        maxPossibleScore = (0.40 * 3) + (0.25 * 4) + (0.20 * 10) + (0.15 * 10); // 5.7
      } else {
        // Within-app scenario or no context
        rawScore = notification.timePhaseBound + notification.relevance + notification.consequence + notification.recency;
        maxPossibleScore = 40;
      }
      break;
  }

  // Normalize to 0-10 scale
  // For priority-based scores (Safety, Operational, System), invert since lower priority number = higher importance
  if (notification.category === NotificationCategory.SAFETY ||
      notification.category === NotificationCategory.OPERATIONAL_INFO ||
      (notification.category === NotificationCategory.SYSTEM && !isCrossApp)) {
    // Invert priority component: convert 1-10 priority to 10-1 scoring
    const invertedPriority = 11 - notification.priority;
    const appRelevance = isWithinApp && notification.category === NotificationCategory.SYSTEM ? 10 : notification.relevance;
    const adjustedScore = invertedPriority + notification.relevance + notification.consequence;
    if (notification.category === NotificationCategory.SYSTEM) {
      // System uses app relevance instead of just relevance
      const systemScore = invertedPriority + appRelevance + notification.consequence;
      return Math.min(10, Math.max(0, (systemScore / 30) * 10)); // Max: 10 + 10 + 10 = 30
    }
    return Math.min(10, Math.max(0, (adjustedScore / 30) * 10)); // Max: 10 + 10 + 10 = 30
  }

  // For other formulas, normalize directly
  return Math.min(10, Math.max(0, (rawScore / maxPossibleScore) * 10));
}

// Category importance values for cross-app formula (1 to 3 scale as per screenshot)
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