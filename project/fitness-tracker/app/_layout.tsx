import { Stack } from 'expo-router';
import { WorkoutProvider } from '../src/contexts/WorkoutContext';
import { NoteProvider } from '../src/contexts/NoteContext';

export default function AppLayout() {
  return (
    <WorkoutProvider>
      <NoteProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
          <Stack.Screen
            name='(modals)/CreateWorkout'
            options={{
              presentation: 'modal',
              title: 'New Workout',
              headerShown: true,
            }}
          />
          <Stack.Screen
            name='(modals)/EditWorkout'
            options={{
              presentation: 'modal',
              title: 'Edit Workout',
              headerShown: true,
            }}
          />
          <Stack.Screen
            name='(modals)/CreateNote'
            options={{
              presentation: 'modal',
              title: 'New Note',
              headerShown: true,
            }}
          />
          <Stack.Screen
            name='(modals)/EditNote'
            options={{
              presentation: 'modal',
              title: 'Edit Note',
              headerShown: true,
            }}
          />
        </Stack>
      </NoteProvider>
    </WorkoutProvider>
  );
}
