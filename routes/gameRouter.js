const { Router } = require('express');
const gameRouter = Router();

const { getImagesList, createPlayer, checkIfCorrectCoord, getWaldoItems, getAndCreatePlayerItems, getPlayerItems, checkIfAllItemsFound } = require('../controllers/gameController.js');

gameRouter.get('/images', getImagesList);

gameRouter.get('/get-waldo-items/:imageId', getWaldoItems);

gameRouter.post('/create-player/:imageId', createPlayer);

gameRouter.get('/get-player-items/:imageId/:playerId', getPlayerItems);

gameRouter.post('/create-player-items/:imageId/:playerId', getAndCreatePlayerItems);


gameRouter.post('/check-if-correct-coord', checkIfCorrectCoord);

gameRouter.get('/check-if-all-items-found/:imageId/:playerId', checkIfAllItemsFound);

module.exports = gameRouter;