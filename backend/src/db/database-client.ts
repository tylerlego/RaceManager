const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

module.exports = mongoose.connect(`${process.env.DB_CONNECTION_STRING}/${process.env.DB_NAME}` || '');