# Mood Journal - React Native App

A comprehensive mobile journaling application built with React Native, allowing users to track their mood, write journal entries, attach images, and visualize their emotional patterns over time.

## Overview

Mood Journal is a personal journaling application that helps users track their emotional wellbeing and daily experiences. The app provides an intuitive interface for creating, editing, and reviewing journal entries with mood tracking, image attachment capabilities, and data visualization features.

## Features

### Core Functionality
- **Journal Entry Management**: Create, read, update, and delete journal entries
- **Mood Tracking**: Select from five mood options (Amazing, Good, Okay, Poor, Terrible)
- **Image Attachment**: Add images to entries from device gallery
- **Persistent Storage**: Entries are stored locally on the device
- **Chronological Organization**: Entries are grouped by date for easy navigation

### Data Visualization
- **Mood Distribution Chart**: Pie chart showing distribution of mood entries
- **Weekly Activity Patterns**: Bar chart displaying journaling frequency by day of week
- **Journaling Stats**: Track total entries, monthly entries, and daily streaks
- **Personalized Insights**: Dynamic insights based on journaling patterns

### User Experience
- **Intuitive Navigation**: Tab-based navigation and stack navigation for detailed views
- **Responsive UI**: Adapts to different screen sizes and orientations
- **Clean Design**: Modern, minimalist interface with mood-specific color coding
- **Real-time Feedback**: Loading states and error handling

## Architecture

The application follows a modern React Native architecture with the following components:

### Component Structure
- **Context API**: Global state management using React Context
- **Navigation**: Stack and tab navigation for intuitive app flow
- **Screens**: Separate screen components for different app views
- **Storage**: AsyncStorage for persistent data management

### Data Flow
```
User Input → Component State → Context API → AsyncStorage → Context API → UI Rendering
```

## Setup and Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator or Android Emulator (or physical device with Expo Go app)

### Installation Steps
1. Clone the repository
   ```bash
   https://github.com/DeshaniDureksha/JournalMood.git
   cd JournalMood
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server
   ```bash
   expo start
   ```

4. Run on desired platform
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on physical device

## App Walkthrough

### Journal List Screen
- View all journal entries organized by date
- Quick actions for editing and deleting entries
- Floating action button to add new entries

### Add Entry Screen
- Select current mood with emoji representation
- Write journal content with multi-line support
- Attach images from gallery
- Save entry with real-time validation

### Entry Detail Screen
- View complete entry with timestamp and mood indicator
- Image display with proper formatting
- Options to edit or delete the entry

### Dashboard Screen
- View mood distribution in pie chart format
- Analyze weekday journaling patterns via bar chart
- Track journaling stats and streaks
- Receive personalized insights based on journaling habits

## Technical Decisions

### React Native + Expo
Chose React Native with Expo for rapid development, cross-platform compatibility, and easy access to device features like the image picker. Expo streamlines the development workflow and provides consistent behavior across devices.

### Context API vs Redux
Opted for Context API over Redux for state management due to:
- Appropriate complexity level for the app's needs
- Reduced boilerplate code
- Easier integration with React's lifecycle
- Sufficient performance for the expected data volume

### AsyncStorage
Selected AsyncStorage for data persistence as it:
- Provides simple key-value storage
- Is well-integrated with React Native
- Sufficient for the app's offline-first approach
- Doesn't require complex database setup

### Functional Components with Hooks
Used modern React patterns with functional components and hooks:
- Cleaner, more readable code
- Better performance through memoization
- Simplified state management and side effects

## Third-Party Libraries

| Library | Purpose | Justification |
|---------|---------|---------------|
| @react-navigation | Navigation | Industry standard for navigation in React Native with excellent TypeScript support |
| expo-image-picker | Image selection | Provides cross-platform consistent API for accessing device gallery |
| react-native-chart-kit | Data visualization | Lightweight charting library optimized for React Native |
| date-fns | Date manipulation | Modular alternative to Moment.js with smaller bundle size |
| react-native-uuid | ID generation | Creates unique identifiers for entries without backend dependency |
| @react-native-async-storage/async-storage | Data persistence | Reliable storage solution that works across platforms |

## State Management

The app uses a centralized state management approach via React's Context API:

- **AppContext**: Provides global state and methods for all components
- **useState**: Manages component-level state for UI interactions
- **useEffect**: Handles side effects like data loading and persistence
- **useMemo**: Optimizes derived data calculations for charts and statistics
- **useCallback**: Prevents unnecessary re-renders for function references

The context provides several key operations:
- Entry CRUD operations (Create, Read, Update, Delete)
- Data transformation methods for visualization
- Image picking functionality
- Error handling

## Data Persistence

Data is persisted locally using AsyncStorage with the following approach:

- All journal entries are stored as a JSON array under a single key
- Data is loaded on app initialization
- Changes are immediately persisted to storage
- Optimistic updates for better user experience
- Error handling with user-friendly messages

## UI/UX Design Approach

The app follows these design principles:

- **Mood-based Color Coding**: Each mood has a distinct color for visual identification
- **Card-based Layout**: Information is presented in organized, digestible cards
- **Consistent Visual Language**: Uniform spacing, typography, and interactive elements
- **Contextual Actions**: Functions are presented where users expect them
- **Loading States**: Clear indicators when data is being processed
- **Empty States**: Helpful guidance when no data is available
- **Error Handling**: User-friendly error messages with recovery options

## Known Limitations

- **Offline Only**: No cloud synchronization or backup
- **Image Storage**: Images stored as URI references which may break if files are moved
- **Performance with Large Datasets**: May slow down with hundreds of entries
- **Chart Responsiveness**: Charts may not render optimally on all screen sizes
- **Limited Analytics**: Basic analytics without advanced pattern recognition

## Future Improvements

### Short-term Enhancements
- **Data Export/Import**: Allow users to backup and restore their journal data
- **Rich Text Support**: Format journal entries with different styles
- **Multiple Images**: Support for multiple images per entry
- **Tags/Categories**: Categorize entries for better organization
- **Search Functionality**: Find entries by content or mood

### Long-term Vision
- **Cloud Sync**: Synchronize data across devices
- **Advanced Analytics**: More insightful mood pattern recognition
- **Reminder System**: Customizable reminders to encourage journaling habits
- **Custom Moods**: Allow users to define their own mood categories
- **Journal Templates**: Pre-defined templates for different types of reflection

## Testing Strategy

The application can be tested using:
- **Jest**: For unit and integration testing
- **React Native Testing Library**: For component testing
- **Detox**: For end-to-end testing
- **Manual Testing**: For UX verification on actual devices

## Project Structure

```
mood-journal/
├── App.js                  # Entry point
├── app.json                # Expo configuration
├── assets/                 # Static assets
├── components/             # Reusable UI components
├── context/                # Context providers
│   └── AppContext.js       # Main state management
├── navigation/             # Navigation configuration
│   ├── AppNavigator.js     # Main navigator
│   └── JournalStack.js     # Journal screen stack
├── screens/                # App screens
│   ├── AddEntryScreen.js   # Create new entry
│   ├── DashboardScreen.js  # Stats and charts
│   ├── EditEntryScreen.js  # Modify existing entry
│   ├── EntryDetailScreen.js # View single entry
│   └── JournalListScreen.js # List of entries
└── utils/                  # Helper functions
```
