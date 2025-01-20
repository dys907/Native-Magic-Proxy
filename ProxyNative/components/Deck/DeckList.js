import { FlatList, View, StyleSheet } from "react-native"
import DeckItem from "./DeckItem"

const renderDeckItem = ({item}) => {
    return <DeckItem item ={item} />
}   

const DeckList = ({deckData}) => {



    console.log(deckData);
    
    return (
        <View style={styles.container}>
        <FlatList
          data={deckData}
          keyExtractor={(item) => item.id}
          renderItem={renderDeckItem}
        />
      </View>
    ); 
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
    },
  });

export default DeckList