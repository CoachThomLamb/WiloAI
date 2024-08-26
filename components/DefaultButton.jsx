import { Pressable, Text, View, } from "react-native";



export default function MyButton(props){
    const { onPress, title = 'Add Exercise'} = props;
    
   
    return (
      <Pressable className="flex-2 p-2 border rounded w-24 h-12 items-center" 
        style={{borderRadius: 8, backgroundColor: 'lightgreen', ':hover': { backgroundColor: 'darkgreen' }}}
        onPress={onPress}>
        <Text className="text-lg font-bold">{title}</Text>
      </Pressable>
    );
  }

