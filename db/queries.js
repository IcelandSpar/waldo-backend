const pool = require('./pool.js');

async function test() {
  const { rows } = await pool.query("SELECT * from leaderboard");
  return rows;
};



async function getItemCoords() {
  const { rows } = await pool.query('SELECT * FROM waldo_item WHERE name="shell"')
  return rows;
}

module.exports = {
  test,
  getItemCoords,
};