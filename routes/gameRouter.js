const { Router } = require('express');
const gameRouter = Router();

const { getImagesList, createPlayer, checkIfCorrectCoord, getWaldoItems, getAndCreatePlayerItems } = require('../controllers/gameController.js');

gameRouter.get('/images', getImagesList);

gameRouter.get('/get-waldo-items/:imageId', getWaldoItems);

gameRouter.post('/create-player/:imageId', createPlayer);

gameRouter.post('/create-player-items/:imageId/:playerId', getAndCreatePlayerItems);

gameRouter.post('/check-if-correct-coord', checkIfCorrectCoord);

module.exports = gameRouter;