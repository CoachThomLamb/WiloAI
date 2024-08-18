import { Pressable, Text, StyleSheet } from "react-native";

export default function MyButton(props){
    const { onPress, title = 'Add Exercise'} = props;
   
    return (
      <Pressable className="flex-2 bg-blue-300 p-2 rounded w-24 h-12 items-center" onPress={onPress}>
        <Text className="text-white text-lg font-bold " >{title}</Text>
      </Pressable>
    );
  }

