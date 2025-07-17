const { Router } = require('express');
const gameRouter = Router();

const { gameController, checkIfCorrectCoord } = require('../controllers/gameController.js');

gameRouter.get('/', gameController);


gameRouter.post('/check-if-correct-coord', checkIfCorrectCoord);

module.exports = gameRouter;