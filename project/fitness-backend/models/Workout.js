import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    sets: {
      type: Number,
    },
    reps: {
      type: Number,
    },
    weight: {
      type: Number,
    },
  }, { _id: false });

const workoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
  },
  exercises: [exerciseSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Workout = mongoose.model('Workout', workoutSchema);
