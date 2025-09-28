# Inflight Entertainment Notification System

A React-based prototype demonstrating a comprehensive notification system for inflight entertainment systems. This application showcases different types of notifications with priority-based management and real-time interactions.

## Features

### 🔔 Notification System
- **Priority-based notifications** with 6 levels (Critical to Minimal)
- **Category filtering** (Safety, Operational, Cross-app, System, Promotional)
- **Real-time notification display** with toast notifications
- **Notification center** with full history and management
- **Priority scoring algorithm** based on relevance, consequence, recency, and time phase

### 🛩️ Inflight Entertainment Interface
- **Flight information display** with real-time data
- **Entertainment dashboard** with multiple app categories
- **Professional airline UI/UX** with modern styling
- **Responsive design** optimized for seatback screens

### 📊 Notification Categories

Based on the provided CSV data, the system handles:

1. **Safety Notifications** (Priority 1-2)
   - Seatbelt warnings
   - Turbulence alerts
   - Medical emergencies
   - Landing preparations

2. **Operational Information** (Priority 2-3)
   - Flight delays
   - Gate changes
   - Immigration forms
   - Baggage information

3. **Cross-App Notifications** (Priority 3-4)
   - Upgrade confirmations
   - Ride share assignments
   - Hotel bookings
   - Car rentals

4. **System Notifications** (Priority 4-5)
   - WiFi status
   - Entertainment system updates
   - Seat controls
   - Power management

5. **Promotional/In-App** (Priority 5-6)
   - Duty-free sales
   - Meal upgrades
   - Loyalty programs
   - Shopping offers

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd D:\Claude_Sri\Notification\inflight-notification-system
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
src/
├── components/
│   ├── ActiveNotifications.tsx     # Toast notifications overlay
│   ├── EntertainmentDashboard.tsx  # Main app grid
│   ├── FlightInfo.tsx             # Flight status display
│   ├── NotificationCard.tsx       # Individual notification component
│   ├── NotificationCenter.tsx     # Notification management panel
│   └── NotificationSimulator.tsx  # Demo notification generator
├── context/
│   └── NotificationContext.tsx    # State management
├── data/
│   └── notificationData.ts        # Sample notification data
├── types/
│   └── notification.ts            # TypeScript interfaces
└── App.tsx                        # Main application component
```

## Usage

### Viewing Notifications
- Click the **notification bell** (top-right) to open the notification center
- **Active notifications** appear as toast messages on the left side
- **Critical notifications** have special animations and styling

### Managing Notifications
- **Mark as read**: Click the checkmark button
- **Dismiss**: Click the X button
- **Filter by category**: Use the filter buttons in the notification center
- **Clear all**: Use the filter icon in the notification center header

### Demo Features
- **Notification Simulator**: Use the controls (bottom-left) to generate random notifications
- **Start/Stop**: Control automatic notification generation
- **Reset**: Clear all notifications and reload sample data

## Technical Implementation

### Priority Algorithm
Notifications are scored based on multiple factors:
- **Priority Level** (1-6)
- **Relevance** (1-10)
- **Consequence** (1-10)
- **Recency** (1-10)
- **Time Phase Bound** (1-10)

### State Management
- React Context API for global notification state
- useReducer for complex state updates
- TypeScript for type safety

### Styling
- Styled-components for component-scoped CSS
- Gradient backgrounds and modern UI elements
- Responsive design principles
- Accessibility considerations

## Data Source

The notification data is based on the provided CSV file containing:
- 42 different notification scenarios
- Real-world inflight entertainment use cases
- Priority scoring and categorization
- Comprehensive trigger conditions

## Future Enhancements

- Sound notifications
- Vibration support for mobile devices
- User preference settings
- Analytics and notification effectiveness tracking
- Integration with real airline systems
- Multi-language support
- Accessibility improvements

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

This project is a prototype demonstration for educational purposes.