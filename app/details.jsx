import React, {useEffect, useState} from 'react';
import { useStore } from './store';    
import { useLocalSearchParams} from 'expo-router';
import { Modal, ScrollView, View, Text, FlatList, TextInput } from 'react-native';
import { ActivityIndicator } from 'react-native';
import MyButton from '../components/DefaultButton';
import ExerciseCard from '../components/ExerciseCard';



export default function WorkoutContainer() {
    const { slug} = useLocalSearchParams();
    const {fetchWorkout, fetchExercises, addExercise, exercises} = useStore();
    const [workout, setWorkout] = useState(null)
    const [modalVisible, setModalVisible] = useState(false);
    const [exerciseTitle, setExerciseTitle] = useState('');

    const handleNewExercise = () => {
        console.log("create exercise", exerciseTitle);
        addExercise(exerciseTitle);
        setModalVisible(false);
    }
    useEffect(() => {
        async function getWorkout() {
            console.log("slug", slug);
            if (slug) {
                const fetchedWorkout = await fetchWorkout(slug.toString());
                await fetchExercises(slug.toString());
                console.log("fetchedWorkout", fetchedWorkout);
                setWorkout(fetchedWorkout);
            }
        }
        getWorkout();
    }, [slug]);
    if(!workout) {
        return <ActivityIndicator />
    }   
  
    return (
        <View style={{flex: 1, margin: 12, padding: 24,border: '1px lightblue solid'}}>
            
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View className="flex-1 justify-center align-center">
                        <TextInput 
                            placeholder={exerciseTitle.toString()} 
                            className="border-b mb-4"
                            value={exerciseTitle}
                            onChangeText={setExerciseTitle}
                            />
                        <MyButton title="Close" className="mt-4" onPress={() => setModalVisible(false)} />
                        <MyButton title="Create Exercise" onPress={() => handleNewExercise()} />
                    
                </View>
            </Modal>
                { (
                    <FlatList
                        data={exercises}
                        renderItem={({ item }) => {
                            //console.log("item", item);
                            return (<ExerciseCard exercise={item} />)
                        }}
                        keyExtractor={(item) => item.exercise_id.toString()}
                        ListHeaderComponent={() =>(
                            <View>
                                <WorkoutHeader workout={workout} />
                                {exercises.length === 0 && <Text className="text-lg">No exercises yet</Text>}
                                </View>
                        )}
                        ListFooterComponent={() => (
                            <>
                                <MyButton title="Add Exercise" onPress={() => setModalVisible(true)} />
                                <MyButton title="save workout" style={{backgroundColor: 'lightblue'}} onPress={()=>saveWorkout()}/>
                            </>
                        )}
                        contentContainerStyle={{flexGrow: 1}}
                    />
                )}
            
            
        </View>
    )
}
                 
    

function WorkoutHeader({workout: {title}}) {
    return (
        <View className="flex-row items-center justify-between border-b mb-2 pb-4 border-blue-100 ">
            <TextInput className="pr-4 text-xl"
        
            defaultValue={title}/>
            <Text className="text-lg">1:00:01</Text>
            <MyButton title="Pause" /> 
        </View>
    )
}