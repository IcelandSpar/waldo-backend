const { test, getItemCoords } = require('../db/queries.js');

const gameController = async (req, res) => {
  const results = await test();
  res.json(results);
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

}


module.exports = {
  gameController,
  checkIfCorrectCoord,
}