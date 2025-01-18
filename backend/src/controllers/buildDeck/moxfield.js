/**
 * Used to build processed decks from Moxfield decklist imports (https://moxfield.com/).
 * Use the Copy for Moxfield button on the decklist page to get the decklist in plain text
 */

import {
  processDeckLines,
  categorizeType,
  finalizeDeck
} from "../../helper/buildDeckHelper.js";
import {scryfallQuery} from "../../helper/buildDeckApi.js";
import regex from "../../configs/regex.config.js";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const moxfield = async (req, res) => {
  let processedDeck = [];
  try {
    const data = req.body;
    const lines = data.split("\n");
    processedDeck = processDeckLines(lines, regex.titleAndQuant);
  } catch (err) {
    res.status(500).send("Error reading data or parsing data");
    return;
  }
  //api call to get card data from scryfall api
  try {
    const cardDetailsPromises = processedDeck.map(async (deckCard, index) => {
      //honouring 10 calls or  less a second
      await delay(100 * index);
      
      const cardResponse = await scryfallQuery(deckCard.name);
      const rawCardTypes = cardResponse.type_line;
      const cardTypes = categorizeType(rawCardTypes);

      /*
      quantity, name, imageuri, type, rawTypes
      */
      return {
        ...deckCard,
        imageuri: cardResponse.image_uris.normal,
        type: cardTypes,
        rawTypes: rawCardTypes,
      };
    });

    processedDeck = await Promise.all(cardDetailsPromises);

    const finalDeck = finalizeDeck(processedDeck);
    console.log(finalDeck.length);


    res.send(finalDeck);
  } catch (err) {
    res.status(500).send("Error querying card database");
    console.log(err);
    return;
  }


};

export default moxfield;
