const express = require('express');
const {createWorkout, getWorkouts, getAllWorkouts, updateWorkout, deleteWorkout} = require('../controllers/workoutControllers')

const router = express.Router();

// GET all workoutw
router.get('/', getAllWorkouts)

// GET a  single workout
router.get('/:id', getWorkouts)

// POST a new workout
router.post('/', createWorkout)

// DELETE a workout
router.delete('/:id', deleteWorkout)

// UPDATE a workout
router.patch('/:id', updateWorkout)





module.exports = router;