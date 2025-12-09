import { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { BASE_URL } from '../config';

const API_URL = `${BASE_URL}/api`;

type Exercise = {
  name: string;
  sets?: number;
  reps?: number;
  weight?: number;
};

type Workout = {
  _id: string;
  name: string;
  duration?: number; 
  exercises: Exercise[];
  createdAt?: Date;
};

// input type for creating/updating workouts
type WorkoutInput = {
  name: string;
  duration?: number;
  exercises: Exercise[];
};


// defining the context type
type WorkoutContext = {
  workouts: Workout[];
  currentWorkout: Workout | null;
  addWorkout: (workout: WorkoutInput) => Promise<void>;
  updateWorkout: (id: string, workout: WorkoutInput) => Promise<void>;
  deleteWorkout: (id: string) => Promise<void>;
  setCurrentWorkout: (workout: Workout | null) => void;
};

// creating the context
const WorkoutContext = createContext<WorkoutContext | undefined>(undefined);

export function WorkoutProvider({ children }: { children: ReactNode }) {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null);

  // load workouts on mount
  useEffect(() => {
    loadWorkouts();
  }, []);

  const loadWorkouts = async () => {
    try {
      const response = await fetch(`${API_URL}/workouts`);
      const data: Workout[] = await response.json();
      setWorkouts(data);
    } catch (error) {
      console.error('Failed to load workouts:', error);
    }
  };

  // function to add a new workout
  const addWorkout = async (workout: WorkoutInput) => {
    try {
      const response = await fetch(`${API_URL}/workouts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workout),
      });
      const newWorkout: Workout = await response.json();
      setWorkouts([newWorkout, ...workouts]);
    } catch (error) {
      console.error('Failed to add workout:', error);
    }
  }

  // function to update an existing workout
  const updateWorkout = async (id: string, workout: WorkoutInput) => {
    try {
      const response = await fetch(`${API_URL}/workouts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workout),
      });
      const updatedWorkout: Workout = await response.json();
      setWorkouts(workouts.map((workout) => (workout._id === id ? updatedWorkout : workout)));
    } catch (error) {
      console.error('Failed to update workout:', error);
    }
  }

  // function to delete a workout
  const deleteWorkout = async (id: string) => {
    try {
      await fetch(`${API_URL}/workouts/${id}`, {
        method: 'DELETE',
      });
      setWorkouts(workouts.filter((workout) => workout._id !== id));
      if (currentWorkout?._id === id) {
        setCurrentWorkout(null);
      }
    } catch (error) {
      console.error('Failed to delete workout:', error);
    }
  }

  const value: WorkoutContext = {
    workouts,
    currentWorkout,
    addWorkout,
    updateWorkout,
    deleteWorkout,
    setCurrentWorkout,
  };

  return (
    <WorkoutContext.Provider value={value}>
      {children}
    </WorkoutContext.Provider>
  );
}

// custom hook to use the WorkoutContext
export function useWorkout() {
  const ctx = useContext(WorkoutContext);
  if (!ctx) {
    throw new Error('useWorkout must be used within a WorkoutProvider');
  }
  return ctx;
}
