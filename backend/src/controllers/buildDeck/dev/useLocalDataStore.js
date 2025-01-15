const fs = require("fs").promises;
const path = require("path");
const { readLocalDataStore, findCardInfo, processDeckLines } = require("../../../helper/buildDeckHelper");
const regex = require("../../../configs/regex.config");

const useLocalDataStore = async (req, res) => {

  const dataStorePath = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "..",
    "data",
    "default-cards-20250112224609.json"
  );

  let processedDeck = [];

  try {
    const data = req.body;
    const lines = data.split("\n");
    processedDeck = processDeckLines(lines, regex.titleAndQuant);
  } catch (err) {
    res.status(500).send("Error reading data");
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

module.exports = useLocalDataStore;