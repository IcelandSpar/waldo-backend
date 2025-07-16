require('dotenv').config();

const { Client } = require('pg');



const SQL = `
DROP TABLE IF EXISTS leaderboard;
DROP TABLE IF EXISTS images CASCADE;
DROP TABLE IF EXISTS waldo_item;

CREATE TABLE IF NOT EXISTS leaderboard (
player_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
name VARCHAR(12),
start_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
end_time TIMESTAMP
);

CREATE TABLE IF NOT EXISTS images (
image_id uuid DEFAULT gen_random_uuid(),
image_name VARCHAR(255),
image_path VARCHAR(255),
difficulty VARCHAR(255),
PRIMARY KEY(image_id)
);

CREATE TABLE IF NOT EXISTS waldo_item (
waldo_item_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
top_left_coord integer,
bottom_right_coord integer,
image_id uuid,
CONSTRAINT fk_image
  FOREIGN KEY(image_id)
    REFERENCES images(image_id)
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