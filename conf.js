const fs = require("fs");
const pwDB = "AVNS_WohJ8PB56eEywAuiUG0";
module.exports = {
  type: "module",
  host: "mysql-2d23f824-dldbwb.d.aivencloud.com",
  user: "avnadmin",
  password: pwDB,
  database: "defaultdb",
  port: 28117,
  ssl: {
    ca: fs.readFileSync("./ca (2).pem"),
    rejectUnauthorized: true,
  },
  tokenMegaSegreto: "DLWB2K24"
};
