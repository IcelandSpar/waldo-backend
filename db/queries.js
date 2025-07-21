const pool = require('./pool.js');

async function test() {
  const { rows } = await pool.query("SELECT * from leaderboard");
  return rows;
};

async function getWaldoItemsList(imageId) {
  const { rows } = await pool.query("SELECT * FROM waldo_item WHERE image_id=$1", [imageId]);
  return rows;
};



async function getItemCoords(itemName) {
  const { rows } = await pool.query('SELECT * FROM waldo_item WHERE item_name=$1', [itemName])
  return rows;
}

module.exports = {
  test,
  getWaldoItemsList,
  getItemCoords,
};