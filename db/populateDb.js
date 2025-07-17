require('dotenv').config();

const { Client } = require('pg');



const SQL = `
DROP TABLE IF EXISTS images CASCADE;
DROP TABLE IF EXISTS leaderboard;
DROP TABLE IF EXISTS waldo_item;


CREATE TABLE IF NOT EXISTS images (
image_id uuid DEFAULT gen_random_uuid(),
image_name VARCHAR(255),
image_width integer,
image_height integer,
image_path VARCHAR(255),
difficulty VARCHAR(255),
PRIMARY KEY(image_id)
);

CREATE TABLE IF NOT EXISTS leaderboard (
player_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
name VARCHAR(12),
start_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
end_time TIMESTAMP,
image_id uuid,
CONSTRAINT fk_image
  FOREIGN KEY(image_id)
    REFERENCES images(image_id)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS waldo_item (
waldo_item_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
top_left_x_coord integer,
top_left_y_coord integer,
bottom_right_x_coord integer,
bottom_right_y_coord integer,
item_name VARCHAR(255),
image_id uuid,
CONSTRAINT fk_image
  FOREIGN KEY(image_id)
    REFERENCES images(image_id)
    ON DELETE CASCADE
);

INSERT INTO leaderboard (name)
VALUES
  ('Player 1'),
  ('Player 2'),
  ('Player 3');

INSERT INTO images (image_name, image_width, image_height, image_path, difficulty)
VALUES
  ('Toys in the Attic', 694, 931, '../images/i_spy_10.jpg', 'easy');
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