/**
 * Uses a local text file to generate a sample deck
 * and returns the deck with card images.
 * A local json file is used as the datastore
 *  This is a get request.
 */
const path = require("path");
const {
  readDeckFiles,
  processDeckLines,
  readLocalDataStore,
  findCardInfo,
} = require("../../../helper/buildDeckHelper");
const regex = require("../../../configs/regex.config");

const sampleDeck = async (req, res) => {
  let processedDeck = [];
  const filePath = path.join(__dirname, "..","..", "..", "..", "samplemox.txt");
  const dataStorePath = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "data",
    "default-cards-20250112224609.json"
  );

  try {
    const lines = await readDeckFiles(filePath);
    processedDeck = processDeckLines(lines, regex.titleAndQuant);
  } catch (err) {
    res.status(500).send("Error reading file");
    return;
  }

  try {
    const cardDataStore = await readLocalDataStore(dataStorePath);
    const cardInfo = findCardInfo(processedDeck, cardDataStore);
    res.send(cardInfo);
  } catch (err) {
    res.status(500).send("Error querying card database");
    return;
  }
};

module.exports = sampleDeck;
