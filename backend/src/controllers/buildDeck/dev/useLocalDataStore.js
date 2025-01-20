import path from "path";
import { readLocalDataStore, findCardInfo, processDeckLines, finalizeDeck, } from "../../../helper/buildDeckHelper.js";
import regex from "../../../configs/regex.config.js";
import httpStatusCodes from "../../../configs/httpCode.config.js";

const __dirname = import.meta.dirname

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
    res.status(httpStatusCodes.NO_CONTENT).send("Error reading data");
    return;
  }
  try {
    const cardDataStore = await readLocalDataStore(dataStorePath);
    try {
      const cardInfo = findCardInfo(processedDeck, cardDataStore);
      try {
        const finalDeck = finalizeDeck(cardInfo);
        console.log(finalDeck.length);
        res.send(finalDeck);
      } catch (err) {
        console.error("Error finalizing deck:", err);
        res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send("Error finalizing deck");
      }
    } catch (err) {
      console.error("Error finding card info:", err);
      res.status(httpStatusCodes.BAD_REQUEST).send("Error finding card info");
    }
  } catch (err) {
    console.error("Error reading card data store:", err);
    res.status(httpStatusCodes.SERVICE_UNAVAILABLE).send("Error reading card data store");
  }
};
export default useLocalDataStore;