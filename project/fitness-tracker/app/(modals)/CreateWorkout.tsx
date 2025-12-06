import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { useWorkout } from '../../src/contexts/WorkoutContext';
import ExerciseItem from '../../src/components/ExerciseItem';

export default function CreateWorkout() {
  const { addWorkout } = useWorkout();
  const [workoutName, setWorkoutName] = useState('');
  const [duration, setDuration] = useState('');
  const [exercises, setExercises] = useState<any[]>([]);
  const [exerciseName, setExerciseName] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [weights, setWeights] = useState('');

  const handleAddExercise = () => {
    if (!exerciseName.trim()) return;
    const newExercise = {
      name: exerciseName,
      sets: sets ? parseInt(sets) : undefined,
      reps: reps ? parseInt(reps) : undefined,
      weight: weights ? parseInt(weights) : undefined,
    };
    setExercises([...exercises, newExercise]);
    // need to reset exercise input fields after adding
    setExerciseName('');
    setSets('');
    setReps('');
    setWeights('');
  };

  const handleRemoveExercise = (index: number) => {
    setExercises(exercises.filter((_: any, i: number) => i !== index));
  };

  const handleCreateWorkout = () => {
    if (!workoutName.trim() || exercises.length === 0) {
      alert('Please enter a workout name and add at least one exercise.');
      return;
    }
    addWorkout({
      name: workoutName,
      exercises,
      duration: duration ? parseInt(duration) : undefined,
    });
    router.back();
  };

  return (
    <View style={styles.container}>
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
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
      <TouchableOpacity
        style={styles.createButton}
        onPress={handleCreateWorkout}
      >
        <Text style={styles.createButtonText}>Create Workout</Text>
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
    paddingBottom: 32,
  },
  section: {
    marginBottom: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 4,
  },
  addButton: {
    backgroundColor: '#000000ff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  createButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
