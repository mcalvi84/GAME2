import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";

import Header from "./src/components/Header";
import GameScreen from "./src/screens/GameScreen";
import StartGameScreen from "./src/screens/StartGameScreen";
import ResultScreen from "./src/screens/ResultScreen";

export default function App() {
  const [loaded] = useFonts({
    DancingScriptRegular: require("./src/assets/fonts/DancingScript-Regular.ttf"),
  });
  const [userNumber, setUserNumber] = useState();
  const [winOrLose, setWinOrLose] = useState(false);
  const [result, setResult] = useState("");

  const handleStartGame = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };

  const handleFinishGame = (selection, number) => {
    if (
      (selection === "menor" && userNumber < number) ||
      (selection === "mayor" && userNumber > number)
    ) {
      setResult("Ganaste");
    } else {
      setResult("Perdiste");
    }
    setWinOrLose(true);
  };

  let content = <StartGameScreen onStartGame={handleStartGame} />;

  if (userNumber && winOrLose === true) {
    content = <ResultScreen result={result} />;
  } else if (userNumber) {
    content = <GameScreen handleResult={handleFinishGame} />;
  }

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header
        title={"Adivina el Numero"}
        newStyles={{ fontFamily: "DancingScriptRegular" }}
      />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
