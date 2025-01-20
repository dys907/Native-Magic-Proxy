// const fs = require("fs").promises;
import fs from "fs/promises";

//Functions using local files
export const readDeckFiles = async (filePath) => {
  const data = await fs.readFile(filePath, "utf8");
  return data.split("\n");
};

export const readLocalDataStore = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    const cardData = JSON.parse(data);
    return cardData;
  } catch (error) {
    console.error("Error reading local data store:", error);
    throw error;
  }
};

// Usecase 1 - Quantity and Title
export const processDeckLines = (lines, regex) => {
  try {
    return lines
      .map((line) => {
        const match = line.match(regex);
        if (match) {
          const quantity = parseInt(match[1], 10);
          const name = match[2].trim();
          return { quantity, name };
        }
        return null;
      })
      .filter((entry) => entry !== null);
  } catch (error) {
    console.error("Error processing deck lines:", error);
    throw error;
  }
};

/**
 * ProcessedDeck is an array of objects with quantity and names of each card
 * DataStore is an array of objects with card information
 */
export const findCardInfo = (processedDeck, dataStore) => {
  try {
    return processedDeck.map((deckCard) => {
      const cardDetails = dataStore.find((card) => card.name === deckCard.name);
      const rawCardTypes = cardDetails.type_line;
      const image = imageSelector(cardDetails.image_uris)
      const cardTypes = categorizeType(rawCardTypes);
      return {
        ...deckCard,
        imageuri: image,
        type: cardTypes,
        rawTypes: rawCardTypes,
      };
    });
  } catch (error) {
    console.error("Error finding card info:", error);
    throw error;
  }

};

//make sure that the uris can be accessed and nothing crashes
export const imageSelector = (cardImage) => {
  const placeholder = 'https://placehold.co/488x680/pnk?text=No+Image+Available';
  //normal > large > small > png > art_crop > border_crop
  if (cardImage) {
    const imageTypes = ['normal', 'large', 'small', 'png', 'art_crop', 'border_crop'];
    for (const type of imageTypes) {
      if (cardImage[type]) return cardImage[type];
    }
    return placeholder;
  }
  else return placeholder;
}

export const categorizeType = (types) => {
  try {
    const typeArray = [];
    const words = types.split(" ");
    words.map((word) => {
      if (
        word === "Creature" ||
        word === "Land" ||
        word === "Sorcery" ||
        word === "Artifact" ||
        word === "Enchantment" ||
        word === "Planeswalker" ||
        word === "Instant" ||
        word === "saga"
      ) {
        typeArray.push(word);
      }
    });

    return typeArray;
  } catch (error) {
    console.error("Error categorizing types:", error);
    return [];
  }
};

//create a deck to uniquely identify each card, even if duplicated
export const finalizeDeck = (deck) => {
  
  try {
    const finalDeck = [];
    let id = 1;
    deck.map((card) => {
      for (let i = 0; i < card.quantity; i++) {
        const newCard = { id, ...card };
        delete newCard.quantity;
        finalDeck.push(newCard);
        id++;
      }
    });
    return finalDeck;
  } catch (error) {
    console.error("Error finalizing deck:", error);
    throw error;
  }


}
