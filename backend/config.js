// backend/config.js
require('dotenv').config(); // Make sure to require dotenv at the top

module.exports = {
  port: process.env.PORT || 3000, // Use PORT from environment or default to 3000
  db: {
    uri: process.env.DB_URI || 'mongodb://localhost:27017/mydatabase', // Use DB_URI from environment or default to local
  },
  JWT_SECRET: process.env.JWT_SECRET || 'versus', // Use JWT_SECRET from environment or default
};
