
import { create } from 'zustand';
import {devtools} from 'zustand/middleware';
import {  v4 as uuidv4} from 'uuid';


export const useStore = create(devtools((set, get) => {
    return {
      counter: 0,
      workouts: [],
      exercises: [],
      sets: [],
      incrCounter: () => set((state) => ({ counter: state.counter + 1 })),
      addSet: (exercise_id)=> set((state) => {
        console.log("state1", state.exercises);
        console.log("exercise_id", exercise_id);
        const newSet = {load:'10', reps:'101', previous:'10X100'};
        const updatedExercise = state.exercises.find((exercise) => exercise.exercise_id === exercise_id);
        updatedExercise.sets.push(newSet);
        console.log("updatedExercise", updatedExercise);
        const oldExercises = state.exercises.filter((exercise) => exercise.exercise_id !== exercise_id);



        return ({
          exercises: [...oldExercises, updatedExercise],
        })
        //need to solve for the case of it not matching an existing one ? 
        //maybe I don't 

       
      }),
      addExercise: (exercise)=> set((state) => {
        const newExercise = { name: exercise, exercise_id:  state.exercises.length, sets: [{load:'10', reps:'101', previous:'10X100'}] };
        return ({
            exercises: [...state.exercises, newExercise],
        });
      }), 
      changeExerciseName: (exercise_id, name) => set((state) => {
        const updatedExercise = state.exercises.find((exercise) => exercise.exercise_id === exercise_id);
        updatedExercise.name = name;
        const oldExercises = state.exercises.filter((exercise) => exercise.exercise_id !== exercise_id);
        return ({
          exercises: [...oldExercises, updatedExercise],
        });
      }), 
      newWorkout: (title)=> set((state) => {
        console.log("title", title);
        console.log("state.workouts", state.workouts);
        return ({
            workouts: [...state.workouts, { title, workout_id: title }],});
      }),
      fetchWorkout: (workout_id) => get((state) => ({
        workouts: state.workouts.find((workout) => workout.workout_id === workout_id),
      })),
   

      fetchSets: async (exercise_id) => {
        const response = await fetch(`/api/sets/${exercise_id}`);
        const data = await response.json();
        set({ sets: data });
      },
      fetchExercises: (workout_id) => get((state) => ({
        exercises: state.exercises.filter((exercise) => exercise.workout_id === workout_id),
      })),
     
      fetchWorkouts: async () => {  
        const response = await fetch('/api/workouts');
        const data = await response.json();
        set({ workouts: data });
      },
  }}));
