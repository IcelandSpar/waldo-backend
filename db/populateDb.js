require('dotenv').config();

const { Client } = require('pg');



const SQL = `
DROP TABLE IF EXISTS images CASCADE;
DROP TABLE IF EXISTS leaderboard CASCADE;
DROP TABLE IF EXISTS waldo_item CASCADE;
DROP TABLE IF EXISTS player_items;


CREATE TABLE IF NOT EXISTS images (
image_id uuid DEFAULT gen_random_uuid(),
image_name VARCHAR(255),
image_path VARCHAR(255),
difficulty VARCHAR(255),
PRIMARY KEY(image_id)
);

CREATE TABLE IF NOT EXISTS leaderboard (
player_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
name VARCHAR(12),
start_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
end_time TIMESTAMP WITH TIME ZONE,
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
recorded_image_width integer,
recorded_image_height integer,
item_name VARCHAR(255),
image_id uuid,
CONSTRAINT fk_image
  FOREIGN KEY(image_id)
    REFERENCES images(image_id)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS player_items (
item_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
is_found boolean DEFAULT false,
player_id uuid,
waldo_item_id uuid,
image_id uuid,
CONSTRAINT fk_player
  FOREIGN KEY(player_id)
  REFERENCES leaderboard(player_id)
  ON DELETE CASCADE,
CONSTRAINT fk_waldo_item
  FOREIGN KEY(waldo_item_id)
  REFERENCES waldo_item(waldo_item_id)
  ON DELETE CASCADE,
CONSTRAINT fk_image
  FOREIGN KEY(image_id)
  REFERENCES images(image_id)
  ON DELETE CASCADE
);



INSERT INTO images (image_name, image_path, difficulty)
VALUES
  ('Toys in the Attic', '../images/i_spy_10.jpg', 'easy');


INSERT INTO waldo_item (
top_left_x_coord, 
top_left_y_coord, 
bottom_right_x_coord, 
bottom_right_y_coord,
recorded_image_width,
recorded_image_height,
item_name,
image_id
)
VALUES (
336,
652,
421,
747,
878,
1067,
'shell',
(SELECT image_id FROM images WHERE image_name='Toys in the Attic')
),
(
296,
412,
407,
488,
878,
1067,
'horse that rocks',
(SELECT image_id FROM images WHERE image_name='Toys in the Attic')
),
(
510,
239,
737,
414,
878,
1067,
'horse with wheels',
(SELECT image_id FROM images WHERE image_name='Toys in the Attic')
),
(
355,
357,
389,
396,
709,
862,
'yellow dice',
(SELECT image_id FROM images WHERE image_name='Toys in the Attic')
),
(
659,
109,
697,
146,
709,
862,
'green dice',
(SELECT image_id FROM images WHERE image_name='Toys in the Attic')
);


INSERT INTO images (
image_name,
image_path,
difficulty
)
VALUES (
'Treehouse of Horror',
'../images/simpsons.jpeg',
'medium'
);


INSERT INTO waldo_item (
top_left_x_coord, 
top_left_y_coord, 
bottom_right_x_coord, 
bottom_right_y_coord,
recorded_image_width,
recorded_image_height,
item_name,
image_id
)
VALUES (
590,
634,
623,
682,
967,
739,
'El Barto',
(SELECT image_id FROM images WHERE image_name='Treehouse of Horror')
);



`;

// INSERT INTO waldo_item (
// top_left_x_coord, 
// top_left_y_coord, 
// bottom_right_x_coord, 
// bottom_right_y_coord,
// recorded_image_width,
// recorded_image_height,
// item_name,
// image_id
// )
// VALUES
//   (
//   305,
//   590,
//   384,
//   693,
//   811,
//   1088,
//   'shell',
//   '3871ebab-e930-44b2-9536-13a6e51683fa'
// );

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