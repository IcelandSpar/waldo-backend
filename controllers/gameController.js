const { getImages, createPlayerInLeaderboard, getItemCoords, getWaldoItemsList, createPlayerItems, findPlayerItems, updatePlayerFoundItem } = require('../db/queries.js');

const getImagesList = async (req, res) => {
  const images = await getImages();
  res.json(images);
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


module.exports = {
  getImagesList,
  createPlayer,
  getPlayerItems,
  getAndCreatePlayerItems,
  getWaldoItems,
  checkIfCorrectCoord,
}