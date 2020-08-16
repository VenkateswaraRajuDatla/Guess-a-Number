import React, {useState} from 'react';
import {View,Text,StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert, Dimensions} from "react-native";
import Card from '../components/Card';
import Colors from '../constants/colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';


const StartGameScreen = props =>{
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(
                'Invalid number!',
                'Number has to be within 1 and 99',
                 [{text:'Okay', style:'destructive',
                 onPress: resetInputHandler}]);
            return;
        }
        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue('');
        Keyboard.dismiss();
    };

    let confirmedOutput;

    if(confirmed) {
    confirmedOutput = (
        <Card style={styles.summaryContainer}>
            <Text>Selected Number</Text>
            <NumberContainer>{selectedNumber}</NumberContainer>
            <MainButton onPress={() => props.onStartGame(selectedNumber)}>START GAME</MainButton>
        </Card>
        );
    }

    return(
        <TouchableWithoutFeedback onPress={ () =>{
            Keyboard.dismiss();
        }}>
        <View style={styles.screen}>
            <TitleText style = {styles.title}>Start a new game!</TitleText>

            <Card style={styles.inputContainer}>
                <BodyText >Select a Number</BodyText>
                <Input style={styles.input}
                 blurOnSubmit
                 autoCapitalize='none'
                 autoCorrect={false}
                 keyboardType="number-pad"
                 maxLength={2}
                 onChangeText={numberInputHandler}
                 value={enteredValue}/>

                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button title="Reset" onPress={resetInputHandler} color={Colors.accent}></Button>
                    </View>
                    <View style={styles.button}>
                        <Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary}></Button>
                    </View>
                </View>
            </Card>
            {confirmedOutput}
        </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        padding: 10,
        alignItems:'center'
    },
    title:{
        fontSize:20,
        marginVertical:10,
        fontFamily: 'open-sans-bold' // expo cant support fontWeight here as we are using custom fonts
    },
    inputContainer:{
        width:'80%',
        maxWidth:'95%',
        minWidth: 300,
        alignItems:'center'
    },
    buttonContainer:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-between',
        paddingHorizontal:10
    },
    button:{
        //use window, as it excludes the status bar in android
        //alternative way rather than defining width: '40%'
        width: Dimensions.get("window").width/4
    },
    input: {
        width: 50,
        textAlign: "center"
    },
    summaryContainer: {
        marginTop: 20,
        alignItems:'center'
    }
    /*text: {
        fontFamily: 'open-sans' //Drawback: will not work in views, will applied to only the text component, that's why we use BodyText defined component
    }*/
});

export default StartGameScreen;