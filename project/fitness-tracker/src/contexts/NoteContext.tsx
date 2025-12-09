import { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { BASE_URL } from '../config';

const API_URL = `${BASE_URL}/api`;

type Note = {
  _id: string;
  title: string;
  content: string;
  createdAt?: Date;
};

// input type for creating/updating notes
type NoteInput = {
  title: string;
  content: string;
};

// defining the context type
type NoteContext = {
  notes: Note[];
  addNote: (note: NoteInput) => Promise<void>;
  updateNote: (id: string, note: NoteInput) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
};

// creating the context
const NoteContext = createContext<NoteContext | undefined>(undefined);

export function NoteProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);

  // load notes on mount
  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const response = await fetch(`${API_URL}/notes`);
      const data: Note[] = await response.json();
      setNotes(data);
    } catch (error) {
      console.error('Failed to load notes:', error);
    }
  };

  // function to add a new note
  const addNote = async (note: NoteInput) => {
    try {
      const response = await fetch(`${API_URL}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(note),
      });
      const newNote: Note = await response.json();
      setNotes([newNote, ...notes]);
    } catch (error) {
      console.error('Failed to add note:', error);
    }
  }

  // function to update an existing note
  const updateNote = async (id: string, note: NoteInput) => {
    try {
      const response = await fetch(`${API_URL}/notes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(note),
      });
      const updatedNote: Note = await response.json();
      setNotes(notes.map((note) => (note._id === id ? updatedNote : note)));
    } catch (error) {
      console.error('Failed to update note:', error);
    }
  }

  // function to delete a note
  const deleteNote = async (id: string) => {
    try {
      await fetch(`${API_URL}/notes/${id}`, {
        method: 'DELETE',
      });
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  }

  const value: NoteContext = {
    notes,
    addNote,
    updateNote,
    deleteNote,
  };

  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
}

export function useNotes() {
  const ctx = useContext(NoteContext);
  if (!ctx) { 
    throw new Error('useNotes must be used within a NoteProvider');
  }
  return ctx;
}


