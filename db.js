const mysql = require("mysql2");
const conf = require("./conf.js");

const connection = mysql.createConnection(conf);

connection.connect((err) => {
  if (err) {
    console.error('Errore di connessione al database:', err);
  } else {
    console.log('Connesso al database con successo!');
  }
});

const executeQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, params, function (err, result) {
      if (err) {
        console.error(err + " - query: " +  sql);
        reject(err);
      } else {
        console.log(sql + " - done");
        resolve(result);
      }
    });
  });
};

module.exports = executeQuery;
