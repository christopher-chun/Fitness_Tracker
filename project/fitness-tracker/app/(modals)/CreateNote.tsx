import { useState } from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useNotes } from '../../src/contexts/NoteContext';

export default function CreateNote() {
  const { addNote } = useNotes();
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');

  const handleCreateNote = () => {
    if (!noteTitle.trim() || !noteContent.trim()) {
      alert('Please enter a note title and content.');
      return;
    }
    addNote({
      title: noteTitle,
      content: noteContent,
    });
    router.back();
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
      <TouchableOpacity style={styles.createButton} onPress={handleCreateNote}>
        <Text style={styles.createButtonText}>Create Note</Text>
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
  createButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
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
