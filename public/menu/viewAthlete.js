const paginaAtleta = document.getElementById("paginaAtleta"); // div che conterrà la pagina
import {estraiNominativiConNumeri, specificheAtleta} from '../fetch.js';
import {getIndexExp} from './viewCards.js';

const specifiche = await specificheAtleta();
const elencoNomieNumeri = await estraiNominativiConNumeri();

console.log(specifiche.ruoli);
console.log(specifiche.capitani);
console.log(specifiche.linee);
console.log(elencoNomieNumeri.nomi);

const renderAtletaPersonale = async(div) => {
  console.log(getIndexExp());
  console.log("dentro il giocatore");

  let template = `
    <div class="container">
      <div id="top-right-button">
        <button class="btn" onclick="window.location.href='giocatori.html'" id="back">
          <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"/>
            <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"/>
          </svg>
        </button>
      </div>
      <div class="col-md-1"></div>
      <h1 style="text-align: left; font-size: 45px; padding-top: 70px; padding-bottom:40px; padding-left: 70px;">%NOME</h1>
      <div id="CartaDellAtleta" class="container mt-5">
        <div class="row">
          <div class="col-md-1"></div>
          <div class="col-md-4">
            <img style="height: 370px; width: 340px; padding-right:30px" src="%IMG" class="img-fluid" style="max-width: 100%; height: auto;">
          </div>
          <div class="col-md-5 d-flex flex-column justify-content-center">
            <p>%TESTO</p>
            <div class="row">
              <div class="mt-3">
                <button type="button" style="margin-right:10px" class="btn btn-primary non-clickable-button">%RUOLO</button>
                <button type="button" style="margin-right:10px" class="btn btn-primary non-clickable-button">%LINEA</button>
                <div id="capitanoOrNot" style="display:%CAPITANO_DISPLAY;">
                  <button type="button" style="margin-right:10px" class="btn btn-primary non-clickable-button">%CAPITANO</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const testoProva = `Il Giuseppe Garibaldi fu un incrociatore leggero della Regia Marina, seconda e ultima unità della classe Duca degli Abruzzi.
    <br> Fu varato dai cantieri Riuniti dell'Adriatico nell'aprile 1936.
    <br> Dopo aver partecipato all'occupazione dell'Albania nell'aprile 1939,<br><br> fu assegnato alla 1ª Squadra delle forze da battaglia italiane e fu così presente ai primi scontri navali contro la Royal Navy nel mar Mediterraneo durante la seconda guerra mondiale, senza cogliere particolari successi.`;

  const immagineProva = "https://img.freepik.com/premium-photo/abstract-red-background-christmas-valentines-layout-design-studio-room-web-template-business-report-with-smooth-circle-gradient-color_1258-681.jpg";

  const nome = elencoNomieNumeri.nomi[getIndexExp()];
  const ruolo = specifiche.ruoli[getIndexExp()];
  const linea = specifiche.linee[getIndexExp()];
  const isCapitano = specifiche.capitani[getIndexExp()] === 1;
  const descrizione = specifiche.descrizioni[getIndexExp()];

  let row = template;
  row = row.replace("%NOME", nome);
  row = row.replace("%IMG", immagineProva);
  row = row.replace("%TESTO", descrizione);
  row = row.replace("%RUOLO", ruolo);
  row = row.replace("%LINEA", linea);
  row = row.replace("%CAPITANO_DISPLAY", isCapitano ? "block" : "none");
  row = row.replace("%CAPITANO", "Capitano");

  div.innerHTML = row;
};

renderAtletaPersonale(paginaAtleta);
