import { createContext, useState, ReactNode, useContext } from 'react';

type Note = {
  id: string;
  title: string;
  content: string;
  createdAt?: Date;
};

// defining the context type
type NoteContext = {
  notes: Note[];
  addNote: (note: Omit<Note, 'id' | 'createdAt'>) => void;
  updateNote: (id: string, note: Omit<Note, 'id' | 'createdAt'>) => void;
  deleteNote: (id: string) => void;
};

// creating the context
const NoteContext = createContext<NoteContext | undefined>(undefined);

export function NoteProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);

  // function to add a new note
  const addNote = (note: Omit<Note, 'id' | 'createdAt'>) => {
    const newNote: Note = {
        ...note,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setNotes([newNote, ...notes]);
  }

  // function to update an existing note
  const updateNote = (id: string, updatedNote: Omit<Note, 'id' | 'createdAt'>) => {
    setNotes(notes.map((note) => 
      note.id === id ? { ...updatedNote, id, createdAt: note.createdAt } : note
    ));
  }

  // function to delete a note
  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
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


