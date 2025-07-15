require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const gameRouter = require('./routes/gameRouter.js');

app.use(cors());

app.use('/game', gameRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});