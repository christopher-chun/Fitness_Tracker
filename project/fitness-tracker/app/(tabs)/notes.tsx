import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useNotes } from '../../src/contexts/NoteContext';
import Header from '../../src/components/Header';
import NoteCard from '../../src/components/NoteCard';

export default function NotesScreen() {
  const { notes } = useNotes();

  const handleAddNote = () => {
    router.push('/(modals)/CreateNote');
  };

  const handleNotePress = (note: any) => {
    router.push({
      pathname: '/(modals)/EditNote',
      params: { noteId: note.id },
    });
  };

  return (
    <View style={styles.container}>
      <Header title='Progress & Notes' onAddPress={handleAddNote} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {notes.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No notes yet</Text>
            <Text style={styles.emptySubtext}>
              Tap + New to add your first journal entry or goal
            </Text>
          </View>
        ) : (
          <>
            <Text style={styles.sectionTitle}>All Notes</Text>
            {notes.map((note: any) => (
              <NoteCard
                key={note.id}
                note={note}
                onPress={() => handleNotePress(note)}
              />
            ))}
          </>
        )}
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
    justifyContent: 'center',
    paddingTop: 100,
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
});
