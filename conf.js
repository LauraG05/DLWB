const fs = require('fs');
require('dotenv').config();
module.exports = {
  type: 'module',
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: {
    ca: fs.readFileSync(process.env.SSL_CA_FILE),
    rejectUnauthorized: true,
  },
  tokenMegaSegreto: process.env.TOKEN_MEGA_SEGRETO
};
