const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

const localstore = [];
let processedDeck = []

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.get('/readfile', (req, res) => {
    const filePath = path.join(__dirname, 'samplemox.txt');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
            return;
        }
        localstore.push(data);
    });
});

app.get('/readLocal', (req, res) => {

    const lines = localstore[0].split('\n');
        const deck = lines.map(line => {
            const match = line.match(/^(\d+)\s+([^()]+)\s+\([^()]+\)/);
            if (match) {
                const quantity = parseInt(match[1], 10);
                const name = match[2].trim();
                return { quantity, name };
            }
            return null;
        }).filter(entry => entry !== null);
        processedDeck = deck

        res.send(deck);

 });

 app.get('/magiccards', (req, res) => {
    const filePath = path.join(__dirname, 'data', 'default-cards-20250112224609.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading card data');
            return;
        }
        const cardData = JSON.parse(data);
        const cardInfo = processedDeck.map(deckCard => {
            const cardDetails = cardData.find(card => card.name === deckCard.name);
            return { ...deckCard, imageuri: cardDetails.image_uris.normal };
        });

        res.send(cardInfo);
    });
 });


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

