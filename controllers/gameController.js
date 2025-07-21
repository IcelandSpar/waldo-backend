const { test, getItemCoords, getWaldoItemsList } = require('../db/queries.js');

const gameController = async (req, res) => {
  const results = await test();
  res.json(results);
};

const getWaldoItems = async (req, res) => {
  const waldoItems = await getWaldoItemsList('c47243b9-4e73-47ac-97ab-8f5c66235609');
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
  gameController,
  getWaldoItems,
  checkIfCorrectCoord,
}