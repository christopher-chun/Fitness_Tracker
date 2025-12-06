import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type NoteCardProps = {
  note: any;
  onPress?: () => void;
};

export default function NoteCard({ note, onPress }: NoteCardProps) {
  const formatDate = (date?: Date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
    >
      <View style={styles.header}>
        <Text style={styles.name}>{note.title}</Text>
        {note.createdAt && (
          <Text style={styles.date}>{formatDate(note.createdAt)}</Text>
        )}
      </View>
      <Text style={styles.content} numberOfLines={3}>
        {note.content}
      </Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000ff',
    flex: 1,
  },
  date: {
    fontSize: 12,
    color: '#666',
    marginLeft: 8,
  },
  content: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});
