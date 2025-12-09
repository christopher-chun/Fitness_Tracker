import { useEffect, useState } from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useNotes } from '../../src/contexts/NoteContext';

export default function EditNote() {
  const { noteId } = useLocalSearchParams();
  const { notes, updateNote, deleteNote } = useNotes();
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');

  // populate fields with existing note data
  useEffect(() => {
    const note = notes.find((n) => n._id === noteId);
    if (note) {
      setNoteTitle(note.title);
      setNoteContent(note.content);
    }
  }, [noteId, notes]);

  const handleUpdateNote = () => {
    if (!noteTitle.trim() || !noteContent.trim()) {
      alert('Please enter a note title and content.');
      return;
    }

    // note gets updated using method from context
    updateNote(noteId as string, {
      title: noteTitle,
      content: noteContent,
    });
    router.back();
  };

  // same confirmation alert pattern as EditWorkout modal
  const handleDeleteNote = () => {
    Alert.alert('Delete Note', 'Are you sure you want to delete this note?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          deleteNote(noteId as string);
          router.back();
        },
      },
    ]);
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
    >
      <View style={styles.section}>
        <Text style={styles.label}>Note Title</Text>
        <TextInput
          style={styles.input}
          placeholder='Enter note title'
          value={noteTitle}
          onChangeText={setNoteTitle}
          multiline
          textAlignVertical='top'
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Note Content</Text>
        <TextInput
          style={styles.input}
          placeholder='Enter note content'
          value={noteContent}
          onChangeText={setNoteContent}
          multiline
          textAlignVertical='top'
        />
      </View>
      {/* same format as CreateNote modal up to here */}
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdateNote}>
        <Text style={styles.updateButtonText}>Update Note</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteNote}>
        <Text style={styles.deleteButtonText}>Delete Note</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginLeft: 16,
    marginRight: 16,
  },
  scrollView: {
    flex: 1,
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
    height: 150,
    marginBottom: 4,
  },
  updateButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
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
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
