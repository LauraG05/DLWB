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


// Funzione ricorsiva per scansionare le cartelle
function scanDir(dirPath) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const fullPath = path.join(dirPath, file);

    if (fs.statSync(fullPath).isDirectory()) {
      // Se è una cartella, scansionala ricorsivamente
      scanDir(fullPath);
    } else {
      // Se è un file, salva il percorso relativo nel database
      const relativePath = path.relative(__dirname, fullPath);
      saveFilePathInDB(relativePath);
    }
  });
}

// Funzione per salvare il percorso dell'immagine nel database
async function saveFilePathInDB(filePath) {
  const fileName = path.basename(filePath);
  const sql = 'INSERT INTO Galleria (NomeFoto, PercorsoFoto) VALUES (?, ?)';
  
  try {
    await executeQuery(sql, [fileName, filePath]);
    console.log(`Percorso salvato nel database: ${filePath}`);
  } catch (err) {
    console.error(`Errore durante il salvataggio del percorso nel database: ${filePath}`, err);
  }
}


// Endpoint per avviare la scansione e il salvataggio nel database
app.get('/scan', (req, res) => {
  const rootDir = path.join(__dirname, 'public/uploads'); // Cambia 'your-image-folder' con la tua cartella principale
  scanDir(rootDir);
  res.send('Scansione completata e percorsi salvati nel database!');
});


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

// prendere ruolo, linea, badge capitano, descrizione
app.get('/specificheAtleta' , async (req, resp) => { 
  const sql = `SELECT Ruolo_Atleta, Linea, Capitano, Descrizione FROM Atleta`;
  try {
          const results = await executeQuery(sql);
          const elencoRuoli = results.map((rowQuery) => rowQuery.Ruolo_Atleta);
          const elencoCapitani = results.map((rowQuery) => rowQuery.Capitano)
          const elencoLinee = results.map((rowQuery) => rowQuery.Linea);
          const elencoDescrizioni = results.map((rowQuery) => rowQuery.Descrizione);
          resp.json({ result: "ok", ruoli: elencoRuoli, capitani: elencoCapitani, linee: elencoLinee, descrizioni: elencoDescrizioni });
          console.log({ query: sql });
      
  } catch (e) {
      console.error("Errore durante l'esecuzione della query dei nomi:", e);
      throw new Error("Errore durante l'esecuzione della query");
  }
});


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

