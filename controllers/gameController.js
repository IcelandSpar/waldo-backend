const { test, getItemCoords } = require('../db/queries.js');

const gameController = async (req, res) => {
  const results = await test();
  res.json(results);
};


const checkIfCorrectCoord = (req, res) => {
  console.log(getItemCoords())
  console.log(req.body)
  res.json(req.body);
}


module.exports = {
  gameController,
  checkIfCorrectCoord,
}