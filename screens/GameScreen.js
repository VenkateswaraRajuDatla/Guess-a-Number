import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Alert, ScrollView, Dimensions} from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import DefaultStyles from '../constants/default-styles';
import MainButton from '../components/MainButton';
import {Ionicons} from '@expo/vector-icons'; //used for icons, refer documentation for more icons
import BodyText from '../components/BodyText';

//map method is used to extract each element from a list to the view
//scrollview nested in a view work in ios but not in android, to work android also we need to add style flex : 1 to the outer view 
//scrollview internally uses flexbox
// (offical doc) contentContainerStyle is used to control layout inside the scrollview. Also supported  byy flatlist.
//diff b/w flex and flexgrow. flex takes space in all direction, flexgrow takes space in the direction it grows
// we can also use flatlist (performance optimized) here instead of scrollview (performance less)
//Flatlist expects object where it can extracts the elements and render. Used for long lists. keying will be done by react native in flatlist

const generateRandomNum = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random()*(max-min)) + min;
    if(rndNum == exclude) {
        return generateRandomNum(min, max, exclude);
    }
    else {
        return rndNum;
    }
};

const renderListItem = (value, numOfRound) => (
    <View key={value} style={styles.listItem}>
        <BodyText>#{numOfRound}</BodyText>
        <BodyText>{value}</BodyText>
    </View> 
);

const GameScreen = props => {
    const initialGuess = generateRandomNum(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    // usestate (above and below lines), all these cose rereun when the component reruns but the way state works it only initializes for the first time. (detached state handling)
    const [pastGuesses, setPastGuesses] = useState([initialGuess]);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    //props destructuing
    const {userChoice, onGameOver} = props;

    //2nd param is array of dependencies of the function in 1st param
    //this will run everytime after the component re-rendering
    // only one of the dependencies changes, then only the effect  will rerun
    useEffect(() => {
        if(currentGuess === props.userChoice) {
            props.onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        if((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert('Don\'t lie !', 'This is wrong...', [
                {text: 'Sorry', style: 'cancel'}
            ]);
            return;
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = generateRandomNum(currentLow.current, currentHigh.current, currentGuess);
        //setRounds(curRounds => curRounds+1);
        setCurrentGuess(nextNumber);
        setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses]);
    };

    //Ionicons name is taken from the documentation ex: md-remove here
    // If we want to control height, width of scrollview, dont add style directly to list items or scrollview, instead wrap the scrollview in a view and apply style to the outer view.
    return (
        <View style = {styles.screen}>
            <Text style={DefaultStyles.title}>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style ={styles.buttonContainer}>
                <MainButton  onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name="md-remove" size={24} color="white"/>
                </MainButton>
                <MainButton  onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons name="md-add" size={24} color="white"/>
                </MainButton>
            </Card>

            <View style={styles.listContainer}>
                <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess,pastGuesses.length - index))}
                </ScrollView>
            </View>
        </View>
    );

};

const styles = StyleSheet.create({
    screen: {
        padding: 10,
        alignItems: 'center',
        flex: 1
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop:Dimensions.get('window').height > 600 ? 20 : 5,
        width: 400,
        maxWidth: '90%'
    },
    listItem: {
        borderColor: '#ccc',
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '60%'
    },
    listContainer: {
        flex: 1,
        width: Dimensions.get('window').width > 350 ? '60%' : '80%'
    },
    list: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
});

export default GameScreen;