const pool = require('./pool.js');

async function getImages() {
  const { rows } = await pool.query("SELECT * FROM images");
  return rows;
}

async function getWaldoItemsList(imageId) {
  const { rows } = await pool.query("SELECT * FROM waldo_item WHERE image_id=$1", [imageId]);
  return rows;
};

async function createPlayerInLeaderboard(imageId) {
  const { rows } = await pool.query("INSERT INTO leaderboard (name, image_id) VALUES ('Anon', $1) RETURNING player_id", [imageId]);
  return rows;
}

async function createPlayerItems(imageId, playerId) {
  const result = await pool.query("SELECT * FROM waldo_item WHERE image_id=$1", [imageId]);
  const currentPlayerItems = await pool.query("SELECT * FROM player_items WHERE image_id=$1 AND player_id=$2", [imageId, playerId]);
  if(result.rows && currentPlayerItems.rows.length == 0) {
    result.rows.forEach(async (waldo_item) => {
      await pool.query("INSERT INTO player_items (is_found, player_id, waldo_item_id, image_id) VALUES (false, $1, $2, $3)", [playerId, waldo_item.waldo_item_id, imageId])
    })
  }
  const { rows } = await pool.query("SELECT * FROM player_items JOIN waldo_item ON player_items.waldo_item_id = waldo_item.waldo_item_id WHERE player_items.image_id=$1 AND player_id=$2", [imageId, playerId]);

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
  createPlayerItems,
  getWaldoItemsList,
  getItemCoords,
};