import { Stack } from "expo-router";
import { WorkoutProvider } from "../src/contexts/WorkoutContext";
import { NoteProvider } from "../src/contexts/NoteContext";

export default function AppLayout() {
  return (
    <WorkoutProvider>
      <NoteProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(modals)/create-workout"
            options={{
              presentation: "modal",
              title: "New Workout",
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="(modals)/edit-workout"
            options={{
              presentation: "modal",
              title: "Edit Workout",
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="(modals)/create-note"
            options={{
              presentation: "modal",
              title: "New Note",
              headerShown: true,
            }}
          />
        </Stack>
      </NoteProvider>
    </WorkoutProvider>
  );
}
