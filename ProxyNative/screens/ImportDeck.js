// going to start here because this the only api call i have

import {
    Button,
  Keyboard,
  Linking,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const ImportDeck = (params) => {

  const handleLinkPress = () => {
    Linking.openURL("https://moxfield.com/");
  };

  const handleImport = () => {

  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Import Deck</Text>
        <TextInput
          style={styles.textInput}
          multiline
          numberOfLines={20}
          placeholder="Paste your deck here"
        />
        <TouchableOpacity onPress={handleLinkPress}>
          <Text style={styles.linkText}>
            Use Moxfield download on complete decklists. {'\n'}
            Does not include sideboards
          </Text>
        </TouchableOpacity>
        <Button title="Import" onPress={handleImport} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ImportDeck;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: "80%",
    height: "60%",
    margin: 10,
  },
});
