// const express = require('express');

//dev-controllers
// const sampleDeck = require('../controllers/buildDeck/dev/sampleDeck');
// const useLocalDataStore = require('../controllers/buildDeck/dev/useLocalDataStore');

//prod-controllers
// const moxfield = require('../controllers/buildDeck/moxfield');

import express from 'express';
//dev-controllers
import sampleDeck from '../controllers/buildDeck/dev/sampleDeck.js';
import useLocalDataStore from '../controllers/buildDeck/dev/useLocalDataStore.js';
//prod-controllers
import moxfield from '../controllers/buildDeck/moxfield.js';

const buildDeckRouter = express.Router();

//DEV
buildDeckRouter.get('/sampleDeck', sampleDeck);
buildDeckRouter.post('/useLocalDataStore', useLocalDataStore);
//PROD
buildDeckRouter.post('/moxfield', moxfield);

export default buildDeckRouter;