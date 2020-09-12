//custom wrapper component which wraps Text with the desired font-family which we can use it anywhere.
import React from 'react';
import {Text, StyleSheet} from 'react-native';

//merge or override the styles using the object type and ... (spread operator)
const TitleText = props => <Text style={{...styles.title, ...props.style}}>{props.children}</Text>;

const styles = StyleSheet.create({
    title: {
        //fontFamily: 'open-sans-bold',
        fontSize: 18
    }
});

export default TitleText;