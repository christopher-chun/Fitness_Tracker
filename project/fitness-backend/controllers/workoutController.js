import { Workout } from '../models/Workout.js';

export const getAllWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find().sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getWorkoutById = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createWorkout = async (req, res) => {
  try {
    const { name, duration, exercises } = req.body;
    if (!name || !exercises) {
      return res.status(400).json({ message: 'Name and exercises are required' });
    }
    const newWorkout = new Workout({ name, duration, exercises });
    const savedWorkout = await newWorkout.save();
    res.status(201).json(savedWorkout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateWorkout = async (req, res) => {
  try {
    const { name, duration, exercises } = req.body;
    const updatedWorkout = await Workout.findByIdAndUpdate(
      req.params.id,
      { name, duration, exercises },
      { new: true }
    );
    if (!updatedWorkout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.status(200).json(updatedWorkout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteWorkout = async (req, res) => {
  try {
    const deletedWorkout = await Workout.findByIdAndDelete(req.params.id);
    if (!deletedWorkout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.status(200).json({ message: 'Workout deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
