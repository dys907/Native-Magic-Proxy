/**
 * Used to build processed decks from Moxfield decklist imports (https://moxfield.com/).
 * Use the Copy for Moxfield button on the decklist page to get the decklist in plain text
 */

const got = require("got");
const { processDeckLines, findCardInfo } = require("../../../helper/buildDeckHelper");

const moxfield = async (req, res) => {
}

module.exports = moxfield;