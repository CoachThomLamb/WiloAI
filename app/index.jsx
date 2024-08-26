import React, {useEffect, useState} from "react";
import { Modal, Text, View, TextInput, FlatList } from "react-native";
import { Link } from 'expo-router';
import {useStore} from './store';
import PocketBase from 'pocketbase';
import MyButton from "../components/DefaultButton";


//



export default function Index() {
  const { workouts, newWorkout } = useStore((state) => ({
    workouts: state.workouts,
    newWorkout: state.newWorkout,
  }));
  const [modalVisible, setModalVisible] = useState(false);
  const [workoutTitle, setWorkoutTitle] = useState('');
  
  const handleNewWorkout = () => {  
    newWorkout(workoutTitle);
    setModalVisible(true);
  }

  return (
    <View
      className="flex flex-col items-center justify-center p-8">
        <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View 
                  className="flex flex-1 justify-center items-center">
                    <View style={{ width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
                        <Text>Add Workout</Text>
                        <TextInput 
                            placeholder={workoutTitle.toString()} 
                            style={{ borderBottomWidth: 1, marginBottom: 10 }} 
                            value={workoutTitle}
                            onChangeText={setWorkoutTitle}
                            />
                        <MyButton title="Close" onPress={() => setModalVisible(false)} />
                        <MyButton title="Create Workout" onPress={() => handleNewWorkout()} />
                    </View>
                </View>
            </Modal>

      <Text>List of workouts</Text>
      <FlatList
        data={workouts}
        renderItem={({ item }) => {
          return (
            <Link href={({ pathname: 'details', params: { slug: item.workout_id } })} className="bg-blue-500 p-4 rounded-md max-w-96 mb-4">
              <Text className="text-white text-lg font-bold">{item.title}</Text>
            </Link>
          )
        }}
        />
        <MyButton title="New Workout" onPress={() =>setModalVisible(true)}/>
    </View>
  );
  
}
