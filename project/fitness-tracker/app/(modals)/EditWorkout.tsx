import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useWorkout } from '../../src/contexts/WorkoutContext';
import ExerciseItem from '../../src/components/ExerciseItem';

// modal for editing an existing workout. very similar to CreateWorkout modal
export default function EditWorkout() {
  const { workoutId } = useLocalSearchParams();
  const { workouts, updateWorkout, deleteWorkout } = useWorkout();
  const [workoutName, setWorkoutName] = useState('');
  const [duration, setDuration] = useState('');
  const [exercises, setExercises] = useState<any[]>([]);
  const [exerciseName, setExerciseName] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [weights, setWeights] = useState('');

  useEffect(() => {
    const workout = workouts.find((w) => w.id === workoutId);
    if (workout) {
      setWorkoutName(workout.name);
      setDuration(workout.duration ? workout.duration.toString() : '');
      setExercises(workout.exercises);
    }
  }, [workoutId, workouts]);

  const handleAddExercise = () => {
    if (!exerciseName.trim()) return;
    const newExercise = {
      name: exerciseName,
      sets: sets ? parseInt(sets) : undefined,
      reps: reps ? parseInt(reps) : undefined,
      weight: weights ? parseInt(weights) : undefined,
    };
    setExercises([...exercises, newExercise]);
    // need to reset inputs like in CreateWorkout
    setExerciseName('');
    setSets('');
    setReps('');
    setWeights('');
  };

  const handleRemoveExercise = (index: number) => {
    setExercises(exercises.filter((_: any, i: number) => i !== index));
  };

  const handleUpdateWorkout = () => {
    if (!workoutName.trim() || exercises.length === 0) {
      alert('Please enter a workout name and add at least one exercise.');
      return;
    }
    // workout gets updated using method from context
    updateWorkout(workoutId as string, {
      name: workoutName,
      exercises,
      duration: duration ? parseInt(duration) : undefined,
    });
    router.back();
  };

  const handleDeleteWorkout = () => {
    // confirmation alert before deleting
    Alert.alert(
      'Delete Workout',
      'Are you sure you want to delete this workout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteWorkout(workoutId as string);
            router.back();
          },
        },
      ]
    );
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
    >
      <View style={styles.section}>
        <Text style={styles.label}>Workout Name</Text>
        <TextInput
          style={styles.input}
          placeholder='Enter workout name'
          value={workoutName}
          onChangeText={setWorkoutName}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Duration (minutes)</Text>
        <TextInput
          style={styles.input}
          placeholder='Enter duration'
          keyboardType='numeric'
          value={duration}
          onChangeText={setDuration}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Add Exercise</Text>
        <TextInput
          style={styles.input}
          placeholder='Exercise Name'
          value={exerciseName}
          onChangeText={setExerciseName}
        />
        <TextInput
          style={styles.input}
          placeholder='Sets'
          keyboardType='numeric'
          value={sets}
          onChangeText={setSets}
        />
        <TextInput
          style={styles.input}
          placeholder='Reps'
          keyboardType='numeric'
          value={reps}
          onChangeText={setReps}
        />
        <TextInput
          style={styles.input}
          placeholder='Weight (lbs)'
          keyboardType='numeric'
          value={weights}
          onChangeText={setWeights}
        />
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handleAddExercise}>
        <Text style={styles.addButtonText}>+ Add Exercise</Text>
      </TouchableOpacity>
      {exercises.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.label}>Exercises ({exercises.length})</Text>
          {exercises.map((exercise: any, index: number) => (
            <ExerciseItem
              key={index}
              exercise={exercise}
              onRemove={() => handleRemoveExercise(index)}
              showRemoveButton={true}
            />
          ))}
        </View>
      )}
      {/* same format as CreateWorkout modal up to here */}
      <TouchableOpacity
        style={styles.updateButton}
        onPress={handleUpdateWorkout}
      >
        <Text style={styles.updateButtonText}>Update Workout</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDeleteWorkout}
      >
        <Text style={styles.deleteButtonText}>Delete Workout</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => router.back()}
      >
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
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
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  addButton: {
    backgroundColor: '#000000ff',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  updateButton: {
    backgroundColor: '#000000ff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#E74C3C',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
});