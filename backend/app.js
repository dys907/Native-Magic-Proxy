//for local testing on phone use this
//ngrok http --url=renewed-ape-kindly.ngrok-free.app 3000

import express from "express";
import fs from "fs/promises";
import path from "path";
import dotenv from "dotenv";

const __dirname = import.meta.dirname

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

//routers
// const buildDeckRouter = require("./src/routes/buildDeckRouter");
import  buildDeckRouter  from "./src/routes/buildDeckRouter.js";

//use routers

//middleware
app.use(express.text())

app.use("/buildDeck", buildDeckRouter);

app.get("/", (req, res) => {
  res.send(
    "You are currently on the Magic Commander Proxy Deck Creater Server"
  );
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
