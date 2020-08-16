import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../constants/colors';

//custom button component
//button is a combination of view, text and touchableCapacity
//TouchableOpacity is used to give feedback to the user that the button has been clicked or to register on press event.
//Text component can accept icons as props children
const MainButton = props => {
    return <TouchableOpacity activityOpacity={0.6} onPress={props.onPress}>
        <View style={styles.button}>
            <Text style ={styles.buttonText}>{props.children}</Text>
        </View>
    </TouchableOpacity>
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25
    },
    buttonText: {
        color:'white',
        fontFamily: 'open-sans',
        fontSize: 18
    }
});

export default MainButton;