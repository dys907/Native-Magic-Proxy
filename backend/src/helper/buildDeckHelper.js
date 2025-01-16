// const fs = require("fs").promises;
import fs from "fs/promises";


//Functions using local files
export const readDeckFiles = async (filePath) => {
    const data = await fs.readFile(filePath, "utf8");
    return data.split('\n');
}

export const readLocalDataStore = async (filePath) => {
    const data = await fs.readFile(filePath, "utf8");
    const cardData = JSON.parse(data);
    return cardData
}

// Usecase 1 - Quantity and Title
export const processDeckLines = (lines, regex) => {
    return lines.map((line)=>{
        const match = line.match(regex);
        if(match){
            const quantity = parseInt(match[1], 10);
            const name = match[2].trim();
            return {quantity, name};
        }
        return null
    })
    .filter((entry) => entry !== null);
}

/**
 * ProcessedDeck is an array of objects with quantity and names of each card
 * DataStore is an array of objects with card information
 */
export const findCardInfo = (processedDeck, dataStore) => {
    return processedDeck.map((deckCard) => {
        const cardDetails = dataStore.find((card) => card.name === deckCard.name);
        return { ...deckCard, imageuri: cardDetails.image_uris.normal };
    })
}

