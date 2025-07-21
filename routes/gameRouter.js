const { Router } = require('express');
const gameRouter = Router();

const { gameController, checkIfCorrectCoord, getWaldoItems } = require('../controllers/gameController.js');

gameRouter.get('/', gameController);

gameRouter.get('/get-waldo-items', getWaldoItems);


gameRouter.post('/check-if-correct-coord', checkIfCorrectCoord);

module.exports = gameRouter;