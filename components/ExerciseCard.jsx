import React from 'react';
import { useStore } from '../app/store';
import { ScrollView, View, Text, FlatList, TextInput , Modal   } from 'react-native';
import SetCard from './SetCard';
import MyButton from './DefaultButton';




export default function ExerciseCard({exercise: {name, sets, order_in_workout, exercise_id}}) {
    const {addSet, changeExerciseName} = useStore();
    const [modalVisible, setModalVisible] = React.useState(false);
    const [exerciseName, setExerciseName] = React.useState('');
    

   //I feel very focused this morning which feels nice 


    return (
        <View className="mb-20">
        
            <TextInput className="font-bold text-xl mb-5"
                defaultValue={name}
                onChangeText={(text) => changeExerciseName(exercise_id, text)}

            />
            <TextInput 
                className="border rounded-lg p-2" 
                placeholder="Add notes" 
            />
            

            <FlatList
                data={sets}
                renderItem={({ item, index }) => {
                    console.log("item", item);
                    console.log("exercise_id", exercise_id);
                    return (
                        <>
                         <SetCard  set={item} index={index} />
                        </>
                    )
                }}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={

                    <View className="flex flex-row pb-5 justify-between">
                        <Text className="flex-1 p-2">Sets</Text>
                        <Text className="flex-1 p-2">Previous</Text>
                        <Text className="flex-1 p-2">Load</Text>
                        <Text className="flex-1 p-2">Reps</Text>
                    </View>
                }
            />
            <MyButton   title="Add Set" className="mt-4 p-60" onPress={()=> addSet(exercise_id)}/>


          
            
        </View>
    )
};

