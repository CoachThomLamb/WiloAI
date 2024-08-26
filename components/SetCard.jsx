import React from 'react';
import {View, Text, TextInput} from 'react-native';




const SetCard = ({ set, index}) => {
    const [load, setLoad] = React.useState(set.load);
    const [reps, setReps] = React.useState(set.reps);
    // console.log("Set", set);

    return (
        <View className="flex-row justify-between gap-4 p-2">
            <Text className="border rounded-lg p-2  flex-1">{index}</Text>
            <Text className="border rounded-lg p-2 m-2 gap-4 flex-1">{set.previous}</Text>
            <TextInput className="border rounded-lg p-2  m-2 flex-1" 
                defaultValue={load.toString()}
                placeholder={load}
                onChangeText={(text) => setLoad(text)}
                inputMode='numeric'
            
            />
            
            <TextInput className="border rounded-lg p-2 m-2 flex-1"         
                defaultValue={reps.toString()}
                onChangeText={(text) => setReps(text)}
                inputMode='numeric'  
            
            />
        </View>

    )
}
export default SetCard;
