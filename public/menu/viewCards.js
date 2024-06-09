const elencoCards = document.getElementById("elencoCards");
import {estraiNominativiConNumeri} from '../fetch.js';

/*
const atleta = [
  {
    nome: "Laura",
    cognome: "Grandi",
    nickname: "Aru",
    numero: "16",
    anno: "2005",
    ruolo: "portatore",
    linea: "attacco",
    immagine: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Red_flag.svg/2560px-Red_flag.svg.png",
    descrizione: "lalalala",
    nPaperelle: 0,
    capitano: 0
  },
  {
    nome: "Benedetta",
    cognome: "Guzzi",
    nickname: "Alef",
    numero: "08",
    anno: "2003",
    ruolo: "portatore",
    linea: "attacco",
    immagine: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Red_flag.svg/2560px-Red_flag.svg.png",
    descrizione: "lulululul",
    nPaperelle: 4,
    capitano: 0
  },
  {
    nome: "Alice",
    cognome: "Ravasio",
    nickname: "Yoshi",
    numero: "05",
    anno: "2007",
    ruolo: "cutter",
    linea: "difesa",
    immagine: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Red_flag.svg/2560px-Red_flag.svg.png",
    descrizione: "lelelel",
    nPaperelle: 2,
    capitano: 1
  },
];*/

const src = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Red_flag.svg/2560px-Red_flag.svg.png";

  
const renderCards = async(div) => {
  console.log("dentro giocatori");

  let template = ` 
  <div class="col">
<div class="card" style="width: 940px; height: 240px; margin-left: 270px; margin-top:%DISTANZA;">
  <div class="row g-0">
    <div class="col-md-1 pers">
    </div>
    <div class="col-md-3" style="position: relative;">
      <div style="margin-top: -55px; margin-left: 5px; position: absolute;">
        <img src="%SRC" style="height: 270px; width: 200px;" class="img-fluid rounded-start" alt="...">
      </div>
    </div>
    <div class="col-md-7">
      <div class="card-body" style="padding-top: 20px; padding-left: 20px;"> <!-- Aggiunto padding al card-body -->
        <h5 class="card-title" style="padding-top:30px; font-size: 30px">%NICK</h5>
        <p class="card-text"  style="color: #6e6e6e;font-size: 15px">%INTR</p>
        <p class="card-text">
        <br>
          <button style="color: #6e6e6e; background-color: transparent; border: none; outline: none; cursor: pointer; padding: 0;" class="btn atletaBut" id="buttons" type="button">Vai all'atleta -> 
        </p>
      </div>
    </div>
    </div>
    </div>
  </div>
`

const elencoNomieNumeri = await estraiNominativiConNumeri();
//console.log(elencoNomieNumeri.nomi);
//console.log(elencoNomieNumeri.numeri);

  let html = "";
  
  for(let i=0; i<elencoNomieNumeri.nomi.length; i++){
    let row = template;
   //   console.log(elencoNomieNumeri.nomi[i])
    //  console.log(elencoNomieNumeri.numeri[i]);
      if (i === 0) {
        row = row.replace("%DISTANZA", "60px");
      } else {
        row = row.replace("%DISTANZA", "80px");
      }
      row = row.replace("%NICK", elencoNomieNumeri.nomi[i]);
      row = row.replace("%SRC", src);
      row = row.replace("%INTR", "Atleta numero #" + elencoNomieNumeri.numeri[i]);
      console.log(row);
    html += row;
  };
  div.innerHTML = html;

  const atletaButtons = div.querySelectorAll(".atletaBut");
  atletaButtons.forEach((button, index) => {
    button.onclick =() => {
      console.log("pers");
      window.location.href = "./atleta.html";
    };
  });
};

renderCards(elencoCards);
