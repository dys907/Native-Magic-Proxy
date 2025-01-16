/**
 * Used to build processed decks from Moxfield decklist imports (https://moxfield.com/).
 * Use the Copy for Moxfield button on the decklist page to get the decklist in plain text
 */

// const got = require("got");
// const { processDeckLines, findCardInfo } = require("../../../helper/buildDeckHelper");
import got from "got";
import { processDeckLines, findCardInfo } from "../../helper/buildDeckHelper.js";
import regex from "../../configs/regex.config.js";

//https://api.scryfall.com/cards/named?fuzzy=aust+com
const scryfallApi = new URL(`https://api.scryfall.com/cards/named`)
const scryfallParams = scryfallApi.searchParams;
// scryfallApi.searchParams.append("exact", "Sam, Loyal Attendant")


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

        const cardDetailsPromises = processedDeck.map(async (deckCard) => {
            scryfallParams.set("exact", deckCard.name);
            const cardResponse = await got.get(scryfallApi, {	timeout: {
                request: 100
            }});
            const cardResponseBody = cardResponse.body;
            console.log(cardResponseBody);
            const cardData = JSON.parse(cardResponseBody);
            return { ...deckCard, imageuri: cardData.image_uris.normal };
            // return scryfallApi
          });
      
          const cardDetails = await Promise.all(cardDetailsPromises);
        // const cardResponse = await got.get('https://api.scryfall.com/cards/named' + `?exact=${processedDeck[0].name}`);
        // const cardResponse = await got.get(scryfallApi);
        console.log(cardDetails);
        // const cardData = JSON.parse(cardResponse.body);
          res.send(cardDetails);

    } catch (err) {
        res.status(500).send("Error querying card database");
        return;
    }
    console.log(scryfallApi);
    res.send("send")
    
}

export default moxfield;