import { createContext, useState, ReactNode, useContext } from 'react';

type Exercise = {
  name: string;
  sets?: number;
  reps?: number;
  weight?: number;
};

type Workout = {
  id: string;
  name: string;
  duration?: number; 
  exercises: Exercise[];
  createdAt?: Date;
};

// defining the context type
type WorkoutContext = {
  workouts: Workout[];
  currentWorkout: Workout | null;
  addWorkout: (Workout: Omit<Workout, 'id' | 'createdAt'>) => void;
  updateWorkout: (id: string, workout: Omit<Workout, 'id' | 'createdAt'>) => void;
  deleteWorkout: (id: string) => void;
  setCurrentWorkout: (workout: Workout | null) => void;
};

// creating the context
const WorkoutContext = createContext<WorkoutContext | undefined>(undefined);

export function WorkoutProvider({ children }: { children: ReactNode }) {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null);

  // function to add a new workout
  const addWorkout = (workout: Omit<Workout, 'id' | 'createdAt'>) => {
    const newWorkout: Workout = {
        ...workout,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setWorkouts([newWorkout, ...workouts]);
  }

  // function to update an existing workout
  const updateWorkout = (id: string, updatedWorkout: Omit<Workout, 'id' | 'createdAt'>) => {
    setWorkouts(workouts.map((workout) => 
      workout.id === id ? { ...updatedWorkout, id, createdAt: workout.createdAt } : workout
    ));
  }

  // function to delete a workout
  const deleteWorkout = (id: string) => {
    setWorkouts(workouts.filter((workout) => workout.id !== id));
    if (currentWorkout?.id === id) {
      setCurrentWorkout(null);
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
