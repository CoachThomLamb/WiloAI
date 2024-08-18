import React from 'react';
import {View, Text, TextInput} from 'react-native';




const SetCard = ({ set}) => {
    const [load, setLoad] = React.useState(set.load);
    const [reps, setReps] = React.useState(set.reps);
    // console.log("Set", set);

    return (
        <View className="flex-row p-5">
            <Text className="flex-1">{set.order}</Text>
            <TextInput className="flex-1 border rounded-lg p-2" 
                defaultValue={load.toString()}
                placeholder={load}
                onChangeText={(text) => setLoad(text)}
                // inputMode='numeric'
            
            />
            
             <TextInput className="flex-1 border rounded-lg p-2 text-red-500"         
                defaultValue={reps.toString()}
                onChangeText={(text) => setReps(text)}
                inputMode='numeric'  
            
            />

        </View>
    )
}
export default SetCard;
