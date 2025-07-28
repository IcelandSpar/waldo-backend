const pool = require('./pool.js');

async function getImages() {
  const { rows } = await pool.query("SELECT * FROM images");
  return rows;
}

async function getAllImagesLeaderboard(limit = 10) {
const { rows } = await pool.query("SELECT *, EXTRACT(EPOCH FROM (end_time - start_time)) AS difference FROM leaderboard JOIN images ON images.image_id=leaderboard.image_id WHERE end_time IS NOT null ORDER BY difference DESC LIMIT $1", [limit]);
return rows;
};

async function getWaldoItemsList(imageId) {
  const { rows } = await pool.query("SELECT * FROM waldo_item WHERE image_id=$1", [imageId]);
  return rows;
};

async function createPlayerInLeaderboard(imageId) {
  const { rows } = await pool.query("INSERT INTO leaderboard (name, image_id) VALUES ('Anon', $1) RETURNING player_id", [imageId]);
  return rows;
}


async function findPlayerItems(imageId, playerId) {
  const { rows } = await pool.query("SELECT * FROM player_items JOIN waldo_item ON player_items.waldo_item_id = waldo_item.waldo_item_id WHERE player_items.image_id=$1 AND player_id=$2", [imageId, playerId])
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

async function updatePlayerFoundItem(imageId, playerId, itemId) {
  await pool.query("UPDATE player_items SET is_found=true WHERE image_id=$1 AND player_id=$2 AND waldo_item_id=$3",[imageId, playerId, itemId]);
}


async function getItemCoords(itemName) {
  const { rows } = await pool.query('SELECT * FROM waldo_item WHERE item_name=$1', [itemName])
  return rows;
}

async function returnPlayerItemsNotFound(imageId, playerId) {
  const { rows } = await pool.query("SELECT * FROM player_items WHERE is_found=false AND image_id=$1 AND player_id=$2", [imageId, playerId]);
  return rows;
}

async function endGameAndReturnResults(imageId, playerId) {
  const { rows } = await pool.query("UPDATE leaderboard SET end_time=current_timestamp WHERE image_id=$1 AND player_id=$2 RETURNING *", [imageId, playerId]);
  return rows;
}

module.exports = {
  getImages,
  getAllImagesLeaderboard,
  findPlayerItems,
  createPlayerInLeaderboard,
  createPlayerItems,
  updatePlayerFoundItem,
  getWaldoItemsList,
  getItemCoords,
  returnPlayerItemsNotFound,
  endGameAndReturnResults,
};