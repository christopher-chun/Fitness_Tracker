import { View, StyleSheet, ScrollView, Text } from "react-native";
import { router } from "expo-router";
import { useWorkout } from "../../src/contexts/WorkoutContext";
import Header from "../../src/components/Header";
import WorkoutCard from "../../src/components/WorkoutCard";

export default function WorkoutsScreen() {
  const { workouts, setCurrentWorkout } = useWorkout();

  const handleWorkoutPress = (workout: any) => {
    setCurrentWorkout(workout);
    router.push("/(tabs)/session");
  };

  // TODO: navigate to edit workout modal
  const handleWorkoutLongPress = (workout: any) => {
    router.push({
      pathname: "/(modals)/edit-workout",
      params: { workoutId: workout.id },
    });
  };

  const handleAddWorkout = () => {
    router.push("/(modals)/create-workout");
  };

  return (
    <View style={styles.container}>
      <Header title=" My Workouts" onAddPress={handleAddWorkout} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {workouts.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No workouts yet</Text>
            <Text style={styles.emptySubtext}>
              Tap + New to create your first workout
            </Text>
          </View>
        ) : (
          workouts.map((workout: any) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
              onPress={() => handleWorkoutPress(workout)}
              onLongPress={() => handleWorkoutLongPress(workout)}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#999",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#666",
  },
});
