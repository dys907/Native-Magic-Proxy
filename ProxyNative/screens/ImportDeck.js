// going to start here because this the only api call i have

import {
    ActivityIndicator,
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
import { useNavigation } from '@react-navigation/native'
import { useState } from "react";
import axios from 'axios'

const ImportDeck = (params) => {
    const [deckList, setDeckList] = useState('')
    const [isLoading, setLoading] = useState(false)

    const navigation = useNavigation()

  const handleLinkPress = () => {
    Linking.openURL("https://moxfield.com/");
  };

  const handleImport = async () => {
    setLoading(true);
    try {
      const response = await axios.post(' https://renewed-ape-kindly.ngrok-free.app/buildDeck/useLocalDataStore', deckList, 
        {
          headers: {
            'Content-Type': 'text/plain',
          },
        }
      );
      const data = response.data;
      console.log(data);
      setLoading(false);
      navigation.navigate('NewScreen', { data });
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };



  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Import Deck</Text>
        <TextInput
          style={styles.textInput}
          multiline
          numberOfLines={20}
          placeholder="Paste your deck here"
          onChangeText={setDeckList}
        />
        <TouchableOpacity onPress={handleLinkPress}>
          <Text style={styles.linkText}>
            Use Moxfield downloadon complete decklists. {'\n'}
            Sideboards can be left in but not included
          </Text>
        </TouchableOpacity>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Button title="Import" onPress={handleImport} />
        )}
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
    linkText: {
      color: 'blue',
      marginTop: 10,
      textDecorationLine: 'underline',
    },
  });
