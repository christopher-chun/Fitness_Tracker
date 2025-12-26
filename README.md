# Fitness Tracker App

A full-stack mobile fitness application built with React Native and Node.js that allows users to create custom workouts, track workout sessions, and maintain fitness notes and goals.

## Features

### Workout Management
- **Create Custom Workouts**: Build personalized workouts with multiple exercises
- **Exercise Details**: Track sets, reps, and weight for each exercise
- **Edit & Delete**: Modify or remove workouts as needed
- **Workout Library**: Browse and manage all saved workouts

### Session Tracking
- **Active Workout Timer**: Session timer based on workout duration
- **Exercise List View**: See all exercises during active sessions
- **Push Notifications**: Get notified when workout timer completes (even when app is minimized)
- **Session Completion**: Mark workouts as complete

### Notes & Goals
- **Fitness Journal**: Record workout reflections, progress notes, and achievements
- **Goal Tracking**: Set and monitor fitness goals
- **Date Stamped**: All entries automatically timestamped

## Tech Stack

### Frontend
- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: Expo Router (file-based routing)
- **State Management**: React Context API
- **Notifications**: Expo Notifications API
- **Styling**: React Native StyleSheet

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (MongoDB Atlas)
- **Architecture**: MVC Pattern (Models, Controllers, Routes)

## Project Structure

```
fitness-tracker/
├── frontend/
│   ├── app/
│   │   ├── (tabs)/           # Tab navigation screens
│   │   │   ├── index.tsx     # Workout Library
│   │   │   ├── session.tsx   # Active Session
│   │   │   └── progress.tsx  # Notes & Goals
│   │   ├── (modals)/         # Modal screens
│   │   │   ├── create-workout.tsx
│   │   │   ├── edit-workout.tsx
│   │   │   ├── create-note.tsx
│   │   │   └── edit-note.tsx
│   │   └── _layout.tsx       # Root layout with providers
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── Header.tsx
│   │   │   ├── WorkoutCard.tsx
│   │   │   ├── ExerciseItem.tsx
│   │   │   ├── Timer.tsx
│   │   │   └── NoteCard.tsx
│   │   ├── context/          # Global state management
│   │   │   ├── WorkoutContext.tsx
│   │   │   ├── NoteContext.tsx
│   │   │   └── NotificationContext.tsx
│   │   └── config.ts         # API configuration
│   └── package.json
│
└── backend/
    ├── models/               # MongoDB schemas
    │   ├── Workout.js
    │   └── Note.js
    ├── controllers/          # Business logic
    │   ├── workoutController.js
    │   └── noteController.js
    ├── routes/               # API endpoints
    │   ├── workouts.js
    │   └── notes.js
    ├── index.js              # Express server entry point
    └── package.json
```

## API Endpoints

### Workouts
- `GET /api/workouts` - Get all workouts
- `GET /api/workouts/:id` - Get single workout
- `POST /api/workouts` - Create new workout
- `PUT /api/workouts/:id` - Update workout
- `DELETE /api/workouts/:id` - Delete workout

### Notes
- `GET /api/notes` - Get all notes
- `GET /api/notes/:id` - Get single note
- `POST /api/notes` - Create new note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account
- Expo CLI
- Android Studio (for Android) or Xcode (for iOS)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
MONGODB_URI=your_mongodb_connection_string
PORT=3000
```

4. Start the server:
```bash
npm start
```

Server will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
EXPO_PUBLIC_API_URL=http://localhost:3000
```

4. Start the development server:
```bash
npx expo start
```

5. Run on device:
   - Scan QR code with Expo Go app (iOS/Android)
   - Press `i` for iOS simulator
   - Press `a` for Android emulator

## Building for Production

### Deploy Backend

1. Push code to GitHub
2. Deploy to hosting service (Render, Railway, etc.)
3. Set environment variables on hosting platform
4. Note the deployed backend URL

### Build Mobile App

1. Update frontend `.env` with production backend URL:
```env
EXPO_PUBLIC_API_URL=https://your-backend-url.com
```

2. Install EAS CLI:
```bash
npm install -g eas-cli
```

3. Configure EAS:
```bash
eas build:configure
```

4. Build APK:
```bash
npx eas build --platform android --profile preview
```

5. Download and install APK on Android device

## Key Features Implementation

### Context API for State Management
Global state is managed through React Context providers, eliminating the need for Redux:
- **WorkoutContext**: Manages workout CRUD operations and current workout state
- **NoteContext**: Handles note CRUD operations
- **NotificationContext**: Manages push notifications and permissions

### File-Based Routing
Uses Expo Router for intuitive navigation:
- Folders in parentheses like `(tabs)` create navigation groups
- File names become routes automatically
- Modals use `presentation: 'modal'` for proper UI behavior

### REST API Integration
Frontend communicates with backend through fetch API:
- Contexts handle all API calls internally
- Loading states provide user feedback
- Error handling with try-catch blocks

### Real-Time Notifications
Expo Notifications API provides background notifications:
- Requests permissions on app load
- Schedules notifications based on timer duration
- Cancels notifications when timer is paused/reset

## MongoDB Schema

### Workout Schema
```javascript
{
  name: String (required),
  duration: Number (optional),
  exercises: [
    {
      name: String (required),
      sets: Number,
      reps: Number,
      weight: Number
    }
  ],
  createdAt: Date (default: now)
}
```

### Note Schema
```javascript
{
  name: String (required),
  content: String (required),
  createdAt: Date (default: now)
}
```

## What I Learned

- Managing state across multiple contexts
- File-based routing with Expo Router
- Proper TypeScript typing for API responses
- MongoDB ID handling (_id vs id)
- Platform-specific considerations (iOS vs Android)
- Background notification handling
- Full-stack application deployment

## License

This project was created as part of a mobile development course.

## Acknowledgments

- Hadi Mohammadi
- Expo documentation and community
- MongoDB Atlas for database hosting
