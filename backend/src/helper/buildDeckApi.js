const scryfallApi = `https://api.scryfall.com/cards/named`;
const scryfallUrl = new URL(scryfallApi);
import got from "got";

const scryfallOptions = {
    headers: {
      "User-Agent": "NativeMagicProxy/1.0",
      Accept: "application/json",
    },
  };


export const scryfallQuery = async (cardName) => {

    scryfallUrl.searchParams.append("exact", cardName);
    const cardResponse = await got(scryfallUrl, scryfallOptions).json();
    scryfallUrl.searchParams.delete("exact");

    return cardResponse
}