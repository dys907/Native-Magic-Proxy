// const express = require("express");
// const fs = require("fs").promises;
// const path = require("path");
// const dotenv = require("dotenv");

import express from "express";
import fs from "fs/promises";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

//routers
const buildDeckRouter = require("./src/routes/buildDeckRouter");


//use routers

//middleware
app.use(express.text())

app.use("/buildDeck", buildDeckRouter);

app.get("/", (req, res) => {
  res.send(
    "You are currently on the Magic Commander Proxy Deck Creater Server"
  );
});


app.post("/newDeckList", async (req, res) => {
  const localstore = [];
  let processedDeck = [];

  try {
    const data = req.body
    localstore.push(data);
    const lines = localstore[0].split("\n");
    const deck = lines
      .map((line) => {
        const match = line.match(/^(\d+)\s+([^()]+)\s+\([^()]+\)/);
        if (match) {
          const quantity = parseInt(match[1], 10);
          const name = match[2].trim();
          return { quantity, name };
        }
        return null;
      })
      .filter((entry) => entry !== null);
    processedDeck = deck;
  } catch (err) {
    res.status(500).send("Error reading data");
    return;
  }

  const dataPath = path.join(
    __dirname,
    "data",
    "default-cards-20250112224609.json"
  );
  try {
    const data = await fs.readFile(dataPath, "utf8");
    const cardData = JSON.parse(data);
    const cardInfo = processedDeck.map((deckCard) => {
      const cardDetails = cardData.find((card) => card.name === deckCard.name);
      return { ...deckCard, imageuri: cardDetails.image_uris.normal };
    });

    res.send(cardInfo);
  } catch (err) {
    res.status(500).send("Error querying card database");
    return;
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
