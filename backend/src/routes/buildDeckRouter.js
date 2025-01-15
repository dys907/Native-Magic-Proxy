const express = require('express');
//dev-controllers
const sampleDeck = require('../controllers/buildDeck/dev/sampleDeck');
const useLocalDataStore = require('../controllers/buildDeck/dev/useLocalDataStore');
//prod-controllers
const moxfield = require('../controllers/buildDeck/moxfield');


const buildDeckRouter = express.Router();

//DEV
buildDeckRouter.get('/sampleDeck', sampleDeck);
buildDeckRouter.post('/useLocalDataStore', useLocalDataStore);
//PROD
buildDeckRouter.post('/moxfield', moxfield);
module.exports = buildDeckRouter;