const { Router } = require('express');
const gameRouter = Router();

const { gameController } = require('../controllers/gameController.js');

gameRouter.get('/', gameController);

module.exports = gameRouter;