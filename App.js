import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import * as Font from 'expo-font'; //Font obj
import {AppLoading} from 'expo'; // it prolongs the default loading screen to stay active until certain task is done. 

//doesn't need to be recreated for every component recycle.
const fetchFonts = () => {
  //loadAsync returns promise which takes some time to load for the first rerender cycle, that's the reason we will use AppLoading
  return Font.loadAsync({
    //can name anything, here I named it as open-sans
    // we wre telling the react native where these fonts live and later we can use with these. 
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    // fetchFonts needs to be a function and this should return the promise
    return (
    <AppLoading 
      startAsync = {fetchFonts} 
      onFinish={() => setDataLoaded(true)}
      onError={(err) => console.log(err)}/> 
    );
  }
 
  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  };

  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  }

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
  };

  let content = <StartGameScreen onStartGame={startGameHandler}/>;

  if (userNumber && guessRounds == 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler}/>;
  }
  else if(guessRounds > 0) {
    content = <GameOverScreen roundsNumber={guessRounds} userNumber={userNumber} onGameRestart = {configureNewGameHandler}/>;
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess a Number"/>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen:{
    flex:1
  }
});
