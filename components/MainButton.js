import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform} from 'react-native';
import Colors from '../constants/colors';

//custom button component
//button is a combination of view, text and touchableCapacity
//TouchableOpacity is used to give feedback to the user that the button has been clicked or to register on press event.
//Text component can accept icons as props children
const MainButton = props => {
    let ButtonComponent = TouchableOpacity;
    if(Platform.OS == 'android' && Platform.Version >=21) {
        ButtonComponent = TouchableNativeFeedback;
    }
    return (
        <View style={styles.buttonContainer}>
            <ButtonComponent activityOpacity={0.6} onPress={props.onPress}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>{props.children}</Text>
                </View>
            </ButtonComponent>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 25,
        overflow: 'hidden' //any child component which goes beyond this will clip
    },
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25
    },
    buttonText: {
        color:'white',
       // fontFamily: 'open-sans',
        fontSize: 18
    }
});

export default MainButton;