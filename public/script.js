// HOME
const conoscici = document.getElementById("knowAbUs");
const calendario = document.getElementById("calendario");
const ig = document.getElementById("instagramRef");
const github = document.getElementById("githubRef");
const telegram = document.getElementById("telegramRef");

const chiave = document.getElementById("AREAPRIVATA");
const apriModalAccesso = document.getElementById("apriModalAccesso");

const accediLiberoButton = document.getElementById("accedi");
const sidebarDiv = document.getElementById("sidebar");

const input = document.getElementById("password");

const aperturamenu = document.getElementById("APERTURAMENU");
const treLinee = document.getElementById("treLinee");

const giocatori = document.getElementById("giocatori");

// dentro area privata c'è apriModalAccesso (chiave),
// se va a accesso si aprono treLinee, che contengonno il menù

// salvare la chiave (accesso deve rimanere) in sessione!!

// se fallito non succede nulla, chiave si illumina di rosso


conoscici.onclick = () => {
  window.location.href = "https://www.instagram.com/donkeyladies_um/";
}

apriModalAccesso.onclick = () => {
  console.log("chiave premuta");
}

import { verificaToken } from "./fetch.js";
console.log(password.value);

accediLiberoButton.onclick = async () => {
  let password = input.value;
  try {
    let risposta = await verificaToken(password);
    console.log(password);
    console.log("accesso premuto");

    if (risposta.result === "password approvata") {
      console.log(risposta.result);
      aperturamenu.removeAttribute("hidden");
    }else {
      console.log(risposta.result);
    }
    
  } catch (error) {
  console.error("Errore durante la verifica del token:", error);
  }
}

treLinee.onclick = () => {
  console.log("apri menu");
}
calendario.onclick = () => {
  console.log("CALENZ");
}

ig.onclick = () => {
  window.location.href = "https://www.instagram.com/_cia.batta_/";
}

github.onclick = () => {
  window.location.href = "https://github.com/LauraG05";
}

telegram.onclick = () => {
  window.location.href = "https://t.me/LauraGrandi";
}


