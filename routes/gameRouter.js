const { Router } = require('express');
const gameRouter = Router();

const { getImagesList, createPlayer, checkIfCorrectCoord, getWaldoItems } = require('../controllers/gameController.js');

gameRouter.get('/images', getImagesList);

gameRouter.get('/get-waldo-items', getWaldoItems);

gameRouter.post('/create-player/:imageId', createPlayer);


gameRouter.post('/check-if-correct-coord', checkIfCorrectCoord);

module.exports = gameRouter;