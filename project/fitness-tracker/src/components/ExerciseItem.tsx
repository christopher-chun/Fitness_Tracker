import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

type ExerciseItemProps = {
  exercise: any;
  onRemove?: () => void;
  showRemoveButton?: boolean;
};

export default function ExerciseItem({ exercise, onRemove, showRemoveButton = false }: ExerciseItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.name}>{exercise.name}</Text>
        <View style={styles.details}>
          {exercise.sets && (
            <Text style={styles.detailText}>{exercise.sets} sets</Text>
          )}
          {exercise.reps && (
            <Text style={styles.detailText}>{exercise.reps} reps</Text>
          )}
          {exercise.weight && (
            <Text style={styles.detailText}>{exercise.weight} lbs</Text>
          )}
        </View>
      </View>
      {showRemoveButton && onRemove && (
        <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
          <Text style={styles.removeText}>X</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  details: {
    flexDirection: 'row',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
  },
  removeButton: {
    padding: 4,
    marginLeft: 8,
  },
  removeText: {
    fontSize: 20,
    color: '#E74C3C',
    fontWeight: 'bold',
  },
});