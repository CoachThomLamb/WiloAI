import React, {useEffect, useState} from 'react';
import { useLocalSearchParams} from 'expo-router';
import { View, Text, FlatList } from 'react-native';
import PocketBase from 'pocketbase';
import MyButton from '../components/DefaultButton';
import ExerciseCard from '../components/ExerciseCard';
const pb = new PocketBase('http://127.0.0.1:8090');

const defaultWorkout = {
    id: 1,
    workout_name: "workout 1",
    exercises: [
        {
            id: 1,
            exercise_name: "squats",
            order_in_workout: 1,
            sets: [
                {
                    id: 1,
                    order: 1,
                    reps: 10,
                    load: 100,
                },
                {
                    id: 2,
                    order: 2,
                    reps: 10,
                    load: 100,
                },
                {
                    id: 3,
                    order: 3,
                    reps: 10,
                    load: 100,
                },
            ],
        },
        {
            id: 2,
            exercise_name: "bench press",
            order_in_workout: 2,
            sets: [
                {
                    id: 1,
                    order: 1,
                    reps: 10,
                    load: 100,
                },
                {
                    id: 2,
                    order: 2,
                    reps: 10,
                    load: 100,
                },
                {
                    id: 3,
                    order: 3,
                    reps: 10,
                    load: 100,
                },
            ],
        },
    ],
};

export default function WorkoutContainer() {
    const { slug} = useLocalSearchParams();
    const [workout, setWorkout] = useState(defaultWorkout);
    const fetchWorkout = async () => {
        try {
            const recordWorkouts = await pb.collection('workoutDetails').getFullList({
                filter: `workout_id = "${slug}"`,
            });

            if (recordWorkouts.length > 0) {
                const exercises = {};

                recordWorkouts.forEach(record => {
                    const { workout_exercise_id, order, exercise_name, ...set } = record;

                    if (!exercises[workout_exercise_id]) {
                        exercises[workout_exercise_id] = {
                            order,
                            workout_exercise_id,
                            exercise_name,
                            sets: [],
                        };
                    }

                    exercises[workout_exercise_id].sets.push(set);
                    console.log("exercises", JSON.stringify(Object.values(exercises), 0, 4));
                });

                // setWorkout({ exercises: Object.values(exercises) });
            } else {
                console.log("No records found for the given workout ID");
                // setWorkout({ exercises: [] });
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchWorkout();
    }, [slug]);
   
    return (
        <View className="flex-1 p-4">
            <View className="flex bg-gray-100 p-2 border rounded-lg">
                <WorkoutHeader workout={workout}/>
                <FlatList
                    data={workout.exercises}
                    renderItem={({ item }) => <ExerciseCard exercise={item} />}
                    keyExtractor={(item) => item.id.toString()}
                    />
                
            </View>
        </View>
    )
}
function WorkoutHeader({workout: {workout_name}}) {
    return (
        <View className="flex-row items-center justify-between border-b mb-2 pb-4 border-blue-100 ">
            <Text className="pr-4 font-bold text-xl">{workout_name}</Text>
            <Text className="text-lg">1:00:01</Text>
            <MyButton title="Pause" /> 
        </View>
    )
}