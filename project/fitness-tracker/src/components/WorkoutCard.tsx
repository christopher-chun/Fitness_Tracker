import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

type WorkoutCardProps = {
  workout: any;
  onPress: () => void;
  onLongPress?: () => void;
};

export default function WorkoutCard({ workout, onPress, onLongPress }: WorkoutCardProps) {
  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={onPress}
      onLongPress={onLongPress}
      delayLongPress={500}
    > 
      <View style={styles.cardHeader}>
        <Text style={styles.workoutName}>{workout.name}</Text>
        {workout.duration && (
          <Text style={styles.duration}>{workout.duration} min</Text>
        )}
      </View>
      <View style={styles.exerciseList}>
        {workout.exercises.slice(0, 3).map((exercise: any, index: number) => (
          <Text key={index} style={styles.exerciseText}>
            {exercise.name}
            {exercise.sets && exercise.reps && ` - ${exercise.sets}x${exercise.reps}`}
          </Text>
        ))}
        {workout.exercises.length > 3 && (
          <Text style={styles.moreText}>
            +{workout.exercises.length - 3} more exercises
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  workoutName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  duration: {
    fontSize: 14,
    color: '#888',
    marginLeft: 8,
  },
  exerciseList: {
    gap: 4,
  },
  exerciseText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  moreText: {
    fontSize: 14,
    color: '#000000ff',
    fontStyle: 'italic',
    marginTop: 4,
  },
});