import React from 'react';
import { View, Text, FlatList    } from 'react-native';
import SetCard from './SetCard';




export default function ExerciseCard({exercise: {exercise_name, sets, order_in_workout}}) {
    // console.log("ExerciseCard", exercise_name, sets, order_in_workout);
    return (
        <View className="mb-20">
            <Text className="font-bold text-xl mb-5">
                {exercise_name}
            </Text>
            <SetCard set={sets[0]}/>
            <FlatList
                data={sets}
                renderItem={({ item }) => <SetCard set={item} />}
                keyExtractor={(item) => item.id.toString()}
                />
            
        </View>
    )
};

