const fs = require("fs");
const executeQuery = require("./db.js");
const conf = require("./conf.js");
const express = require("express");
const app = express();
const http = require("http");

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const path = require("path");
app.use("/", express.static(path.join(__dirname, "public")));

app.get('/estraiNominativiConNumeri' , async (req, resp) => { 
    const sql = `SELECT Nick_Atleta, Numero_Atleta FROM Atleta`;
    try {
            const results = await executeQuery(sql);
            const elencoNomi = results.map((rowQuery) => rowQuery.Nick_Atleta);
            const elencoNumeri = results.map((rowQuery) => rowQuery.Numero_Atleta);
            resp.json({ result: "ok", nomi: elencoNomi, numeri: elencoNumeri });
            console.log({ query: sql });
        
    } catch (e) {
        console.error("Errore durante l'esecuzione della query dei nomi:", e);
        throw new Error("Errore durante l'esecuzione della query");
    }
});

/*
const verificaToken = async (pass) => {
  const sql = `SELECT Password_Utente FROM Utenti`;
  try {
    const results = await executeQuery(sql);

    for (let result of results) {
      const match = await bcrypt.compare(pass, result.Password_Utente);
      if (match) {
        return { result: "ok" };
      }
    }
    return { result: "invalid" };
  } catch (e) {
    console.error("Errore durante l'esecuzione della query dei nomi:", e);
    throw new Error("Errore durante l'esecuzione della query");
  }
}

*/
console.log({conf: conf.tokenMegaSegreto});



app.post('/verificaToken', async (req, resp) => {
  const { password } = req.body;

  async function checkPass (password) {
    if (conf.tokenMegaSegreto===password) {
      return "password approvata";
    } else {
      return "password non approvata";
    }
  }
  
console.log({password: password});
  if (!password) {
    return resp.status(400).json({ error: "Password mancante" });
  }

  try {
    const result = await checkPass(password);
    resp.json({result});
  } catch (e) {
    resp.status(500).json({ error: e.message });
  }
});

const server = http.createServer(app);
server.listen(28117, async () => {
   console.log("---> server running on port 28117");
   // Test connessione al database
   try {
     await executeQuery("SELECT 1");
     console.log("Connessione al database verificata con successo.");
   } catch (e) {
     console.error("Errore durante la connessione al database:", e);
   }
});

