const pool = require('./pool.js');

async function getImages() {
  const { rows } = await pool.query("SELECT * FROM images");
  return rows;
}

async function createPlayerInLeaderboard(imageId) {
  const { rows } = await pool.query("INSERT INTO leaderboard (name, image_id) VALUES ('Anon', $1) RETURNING player_id", [imageId]);
  return rows;
}


async function getWaldoItemsList(imageId) {
  const { rows } = await pool.query("SELECT * FROM waldo_item WHERE image_id=$1", [imageId]);
  return rows;
};

// async function getPlayerItems() {
//   const { rows } = await pool.query("SELECT * FROM player_items")
// }



async function getItemCoords(itemName) {
  const { rows } = await pool.query('SELECT * FROM waldo_item WHERE item_name=$1', [itemName])
  return rows;
}

module.exports = {
  getImages,
  createPlayerInLeaderboard,
  getWaldoItemsList,
  getItemCoords,
};