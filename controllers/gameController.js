const { test } = require('../db/queries.js');

const gameController = async (req, res) => {
  const results = await test();
  res.json(results);
};


module.exports = {
  gameController,
}