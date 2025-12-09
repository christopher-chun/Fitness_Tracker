import express from 'express';
import * as workoutController from '../controllers/workoutController.js';

const router = express.Router();

router.get('/', workoutController.getAllWorkouts);
router.get('/:id', workoutController.getWorkoutById);
router.post('/', workoutController.createWorkout);
router.put('/:id', workoutController.updateWorkout);
router.delete('/:id', workoutController.deleteWorkout);

export default router;