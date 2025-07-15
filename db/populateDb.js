require('dotenv').config();

const { Client } = require('pg');


const SQL = `
CREATE TABLE IF NOT EXISTS leaderboard (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
name VARCHAR(12)
);

INSERT INTO leaderboard (name)
VALUES
  ('Player 1'),
  ('Player 2'),
  ('Player 3');
`;

async function main() {
  console.log('seeding...');
  const client = new Client({
    connectionString: process.env.PG_CONNECTION_STR,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log('done');
};

main();