import {View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useWorkout } from '../../src/contexts/WorkoutContext';
import Header from '../../src/components/Header';
import ExerciseItem from '../../src/components/ExerciseItem';
import Timer from '../../src/components/Timer';

export default function SessionScreen() {
  const { currentWorkout, setCurrentWorkout } = useWorkout();
  // determine initial seconds for timer based on workout duration
  const timerInitialSeconds = currentWorkout && currentWorkout.duration ? currentWorkout.duration * 60 : 60;

  const handleEndSession = () => {
    setCurrentWorkout(null);
    Alert.alert('Workout Finished!');
  };

  const handleTimerComplete = () => {
    Alert.alert('Timer Complete!');
  };

  if (!currentWorkout) {
    return (
      <View style={styles.container}>
        <Header title='Session' />
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No workout selected</Text>
          <Text style={styles.emptySubtext}>
            Go to Workouts tab and tap a workout to start training
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title='Current Session' />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.workoutInfo}>
          <Text style={styles.workoutName}>{currentWorkout.name}</Text>
          {currentWorkout.duration && (
            <Text style={styles.duration}>
              Target: {currentWorkout.duration} min
            </Text>
          )}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Session Timer</Text>
          <Timer initialSeconds={timerInitialSeconds} onComplete={handleTimerComplete} />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Exercises</Text>
          {currentWorkout.exercises.map((exercise: any, index: number) => (
            <ExerciseItem key={index} exercise={exercise} />
          ))}
        </View>
        <TouchableOpacity
          style={styles.completeButton}
          onPress={handleEndSession}
        >
          <Text style={styles.completeButtonText}>Complete Workout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 120,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#999',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  workoutInfo: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  workoutName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  duration: {
    fontSize: 14,
    color: '#999',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  completeButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 32,
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
