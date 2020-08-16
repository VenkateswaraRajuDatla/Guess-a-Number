import React from 'react';
import {View, Text, StyleSheet, Button, Image, Dimensions, ScrollView} from 'react-native';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import Colors from '../constants/colors';
import MainButton from '../components/MainButton';

//can use tow types of image -> local image or Network image
//For the local images, we use 'require' and specifying the path of the image. Uses the original image's width and height
// if the width and height we defined, doesn't meet the aspect ratio of orginal image, we use resizeMode.
//we can apply styles like border radius to the image by enclosing it inside the view and applying to the view itself.
//overflow property is used when any child in the container overflows the container, is actually clipped.

//we can declare multiple text components inside a text component, Styles like font family declared in parent view component is not inherited to childrem.
//But for multilevel text components styles are inherited.
const GameOverScreen = props => {

    return (
    <ScrollView>
    <View style = {styles.screen}>
        <TitleText>Game is Over!</TitleText>
        <View style={styles.imageContainer}>
            <Image 
                source={require('../assets/success.png')} // this is for local image
                //source={{uri: 'https://pixabay.com/photos/matterhorn-alpine-zermatt-mountains-1516733/'}} //used for web image
                style = {styles.image}
                resizeMode="cover">
            </Image> 
        </View>
        <View style={styles.resultContainer}>
            <BodyText style={styles.resultText}>Your phone needed <Text style={styles.highlight}>{props.roundsNumber} </Text> 
            rounds to guess the number <Text style={styles.highlight} > {props.userNumber}</Text> </BodyText>
        </View>
        <MainButton onPress={props.onGameRestart}>NEW GAME</MainButton>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems : 'center'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    imageContainer: {
        borderRadius: Dimensions.get('window').width * 0.7 / 2,
        borderWidth: 3,
        borderColor: 'black',
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height / 30
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    },
    resultContainer : {
        marginHorizontal : 30,
        marginVertical: Dimensions.get('window').height / 60
    },
    resultText : {
        textAlign : 'center',
        fontSize: Dimensions.get('window').height < 400 ? 16 : 20
    }
});

export default GameOverScreen;