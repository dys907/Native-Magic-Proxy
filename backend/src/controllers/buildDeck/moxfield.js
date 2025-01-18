/**
 * Used to build processed decks from Moxfield decklist imports (https://moxfield.com/).
 * Use the Copy for Moxfield button on the decklist page to get the decklist in plain text
 */

import got from "got";
import { processDeckLines, findCardInfo } from "../../helper/buildDeckHelper.js";
import regex from "../../configs/regex.config.js";

const scryfallApi = `https://api.scryfall.com/cards/named`
const scryfallOptions = {
    headers: {
        "User-Agent": "NativeMagicProxy/1.0",
        "Accept": "application/json"
      }
}

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
            await delay(100 * index)

            const scryfallUrl = new URL(scryfallApi);
            scryfallUrl.searchParams.append("exact", deckCard.name);
             const cardResponse = await got(scryfallUrl, scryfallOptions).json();

            return { ...deckCard, imageuri: cardResponse.image_uris.normal };
          });
      
          const cardDetails = await Promise.all(cardDetailsPromises);
          res.send(cardDetails);

    } catch (err) {
        res.status(500).send("Error querying card database");
        console.log(err);
        return;
    }
    
}

export default moxfield;