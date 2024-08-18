import React, {useEffect, useState} from "react";
import { Text, View, TextInput, FlatList } from "react-native";
import { Link } from 'expo-router';
import {useStore} from '../store';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');






export default function Index() {
  const [workouts, setWorkouts] = useState([]);
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const recordWorkouts = await pb.collection('workouts').getList(1, 100, {});
        // console.log("Workout", recordWorkouts.items);
        setWorkouts(recordWorkouts.items);
      } catch (error) {
        console.error(error);
      }
    }
    fetchWorkouts();
  }, [])
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }} >
      <Text>List of workouts</Text>
      <FlatList
        data={workouts}
        renderItem={({ item }) => {
          return (
            <Link href={({ pathname: 'details', params: { slug: item.id } })} className="bg-blue-500 p-4 rounded-md max-w-96 mb-4">
              <Text className="text-white text-lg font-bold">{item.title}</Text>
            </Link>
          )
        }}
        />
    </View>
  );
  
}
