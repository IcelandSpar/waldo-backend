const { getImages, createPlayerInLeaderboard,getItemCoords, getWaldoItemsList } = require('../db/queries.js');

const getImagesList = async (req, res) => {
  const images = await getImages();
  res.json(images);
}

const createPlayer = async (req, res) => {
  const [player] = await createPlayerInLeaderboard(req.params.imageId);
  res.json(player);
}

const getWaldoItems = async (req, res) => {
  const waldoItems = await getWaldoItemsList('2bb3d3c9-3e2a-4cb1-a135-c4bb6009c84a');
  console.log(waldoItems)
  res.json(waldoItems)
};


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
  getWaldoItems,
  checkIfCorrectCoord,
}