const { Router } = require('express');
const gameRouter = Router();

const { getImagesList, getImagePath,getLeaderboard, getGameLeaderboard, createPlayer, checkIfCorrectCoord, getWaldoItems, getAndCreatePlayerItems, getPlayerItems, checkIfAllItemsFound, submitPlayerName, checkIfPlayerMadeTopTen } = require('../controllers/gameController.js');


gameRouter.get('/images', getImagesList);

gameRouter.get('/get-image-path/:imageId', getImagePath);

gameRouter.get('/get-leaderboard', getLeaderboard);

gameRouter.get('/get-game-leaderboard/:imageId', getGameLeaderboard);

gameRouter.get('/get-waldo-items/:imageId', getWaldoItems);

gameRouter.post('/create-player/:imageId', createPlayer);

gameRouter.get('/get-player-items/:imageId/:playerId', getPlayerItems);

gameRouter.post('/create-player-items/:imageId/:playerId', getAndCreatePlayerItems);


gameRouter.post('/check-if-correct-coord', checkIfCorrectCoord);

gameRouter.get('/check-if-all-items-found/:imageId/:playerId', checkIfAllItemsFound);

gameRouter.get('/check-if-top-ten/:imageId/:playerId', checkIfPlayerMadeTopTen);

gameRouter.put('/submit-player-name', submitPlayerName);

module.exports = gameRouter;