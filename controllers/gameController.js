const { getImages, getAllImagesLeaderboard, createPlayerInLeaderboard, getItemCoords, getWaldoItemsList, createPlayerItems, findPlayerItems, updatePlayerFoundItem, returnPlayerItemsNotFound, endGameAndReturnResults, updatePlayerName, returnGameLeaderboard } = require('../db/queries.js');

const getImagesList = async (req, res) => {
  const images = await getImages();
  res.json(images);
}

const getLeaderboard = async (req, res) => {
  const leaderboard = await getAllImagesLeaderboard(10);
  res.json(leaderboard);
};

const getGameLeaderboard = async (req, res) => {
  const gameLeaderboard = await returnGameLeaderboard(10, req.params.imageId);
  res.json(gameLeaderboard);
}

const createPlayer = async (req, res) => {
  const [player] = await createPlayerInLeaderboard(req.params.imageId);
  res.json(player);
}

const getWaldoItems = async (req, res) => {
  const waldoItems = await getWaldoItemsList(req.params.imageId);
  res.json(waldoItems)
};

const getPlayerItems = async (req, res) => {
  const playerItems = await findPlayerItems(req.params.imageId, req.params.playerId);
  res.json(playerItems);
};

const getAndCreatePlayerItems = async (req, res) => {
  const playerItems = await createPlayerItems(req.params.imageId, req.params.playerId);
  console.log(playerItems)
  res.json(playerItems);
}


const noarmalizeCoordsToWindowSize = (frontEndClickPosition, storedCoords) => {

const normalizedPositions = {
  xCoord: (storedCoords.recorded_image_width / frontEndClickPosition.windowWidth) * frontEndClickPosition.xCoord,
  yCoord: (storedCoords.recorded_image_height / frontEndClickPosition.windowHeight) * frontEndClickPosition.yCoord
}
return normalizedPositions;
};

const checkIfCorrectCoord = async (req, res) => {
  try {
      const [waldoItem] = await getItemCoords(req.body.itemName);
      const normalizedPositions = noarmalizeCoordsToWindowSize(req.body, waldoItem)
  if(waldoItem.bottom_right_x_coord >= normalizedPositions.xCoord &&
    waldoItem.bottom_right_y_coord >= normalizedPositions.yCoord &&
    normalizedPositions.xCoord >= waldoItem.top_left_x_coord &&
    normalizedPositions.yCoord >= waldoItem.top_left_y_coord
  ) {
    console.log(req.body)
    updatePlayerFoundItem(req.body.imageId, req.body.playerId, waldoItem.waldo_item_id)
    res.json({
      coordResult: true,
      waldoItemId: waldoItem.waldo_item_id
    })
  } else {
    res.json({
      coordResult: false
    })
  }
  } catch(err) {
    console.error(err)
  }
  res.end();

};

const checkIfAllItemsFound = async (req, res) => {
  let endGameResults = [];
  const playerItemsNotFound = await returnPlayerItemsNotFound(req.params.imageId, req.params.playerId);
  // end game
  if(playerItemsNotFound.length == 0) {
    endGameResults = await endGameAndReturnResults(req.params.imageId, req.params.playerId);
  }
  await 
  res.json({
    endGameResults,
    allItemsFound: playerItemsNotFound.length == 0,
  }) ;
};

const submitPlayerName = async (req, res) => {
  const updatedPlayer = await updatePlayerName(req.body.playerId, req.body.playerName);
  res.json({
    updatedPlayer,
  })
};


module.exports = {
  getImagesList,
  getLeaderboard,
  getGameLeaderboard,
  createPlayer,
  getPlayerItems,
  getAndCreatePlayerItems,
  getWaldoItems,
  checkIfCorrectCoord,
  checkIfAllItemsFound,
  submitPlayerName,
}