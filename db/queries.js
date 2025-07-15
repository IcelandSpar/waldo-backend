const pool = require('./pool.js');

async function test() {
  const { rows } = await pool.query("SELECT * from leaderboard");
  return rows;
};

module.exports = {
  test,
};