import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import DeckList from '../components/Deck/DeckList';

const ConfirmForm = ({ route, navigation }) => {
    const deck = route.params?.deck

    const handleConfirm = () => {
        // Handle confirmation logic here
        console.log('Form confirmed');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Confirm Your Details</Text>
            <DeckList deckData={deck} />
            <Button title="Confirm" onPress={handleConfirm} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
    },
});

export default ConfirmForm;