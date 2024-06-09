
const executeQuery = require("./db.js");
const fs = require('fs');

// import di tutti i giocatori
const inserisciEs = async (nomi, cognomi, nick, numero, ruolo, capitano, capitanoA, capitanoD) => {
    let sqlStatements = [];
    for (let i = 0; i < nomi.length; i++) {
        let sql = `INSERT INTO Atleta (Nome_Atleta, Cognome_Atleta, Nick_Atleta, Numero_Atleta, Ruolo_Atleta, Capitano, CapitanoA, CapitanoD) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        let params = [nomi[i], cognomi[i], nick[i], numero[i], ruolo[i], capitano[i], capitanoA[i], capitanoD[i]];
        sqlStatements.push({ sql, params });
    }
 
    try {
        for (let { sql, params } of sqlStatements) {
            await executeQuery(sql, params);
            console.log({ query: sql, params });
        }
        return { response: "ok" };
    } catch (e) {
        console.error("Errore durante l'esecuzione della query:", e);
        throw new Error("Errore durante l'esecuzione della query");
    }
 };
 // rivedere numeri
 app.post('/inserisciEs', async (req, res) => {
    const nomi = ["Francesca", "Elena", "Francesca", "Martina", "Sarah", "Alessandra", "Francesca", "Laura", "Benedetta", "Sofia", "Viola", "Alice", "Marta", "Lisa", "Gaia", "Teresa"];
    const cognomi = ["Arduini", "Beneduci", "D asti", "Fantasia", "Fayed", "Foglio", "Gaimo", "Grandi", "Guzzi", "Lapiscopia", "Paluffi", "Ravasio", "Rota", "Rubino", "Trovo", "Villa"];
    const nick = ["Piras", "Undi", "Veleno", "Mina", "Blabla", "Foglio", "Pippi", "Aru", "Alef", "Lapis", "Phepls", "Yoshi", "Kiwi", "Nik", "Romi", "Colla"];
    const numero = [22, 11, 23, 17, 30, 0, 57, 16, 8, 2, 25, 5, 3, 99, 18, 88];
    const ruolo = ["Portatore", "Portatore", "Cutter", "Cutter", "Portatore", "Portatore", "Cutter", "Portatore", "Portatore", "Cutter", "Portatore", "Cutter", "Cutter", "Cutter", "Cutter", "Cutter"];
    const capitano = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0];
    const capitanoA = [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const capitanoD = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0];
 
    try {
        const response = await inserisciEs(nomi, cognomi, nick, numero, ruolo, capitano, capitanoA, capitanoD);
        res.json(response);
    } catch (error) {
        console.error("Errore nell'esecuzione della query:", error);
        res.status(500).json({ error: "Errore durante l'esecuzione della query" });
    }
 });
  