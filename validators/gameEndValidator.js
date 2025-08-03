const { body } = require('express-validator');

const validatePlayerName = [
  body('playerName').trim()
  .notEmpty().withMessage('Player Name must not be empty.')
  .isLength({min: 1, max: 12}).withMessage('Player Name must be between 1-12 characters.')
];

module.exports = {
  validatePlayerName,
}