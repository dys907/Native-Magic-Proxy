import { View, Text, StyleSheet, Image } from "react-native";

const DeckItem = ({ item }) => {
    return (
        <View style={styles.container}>
        <Image style={styles.image} source={{ uri: item.imageuri }} />
        <View style={styles.textContainer}>
          <Text style={styles.id}>{item.id}</Text>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.rawTypes}>{item.rawTypes}</Text>
        </View>
      </View>
    );
  };
  
export default DeckItem;

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      alignItems: 'center',
    },
    image: {
      width: 200,
      height: 200,
      marginRight: 10,
      resizeMode: 'contain',
    },
    textContainer: {
      flex: 1,
      flexDirection: 'column',
    },
    id: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#333',
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    rawTypes: {
      fontSize: 14,
      color: '#666',
    },
  });