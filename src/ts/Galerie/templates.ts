import { html } from "lit-html";
import { guard } from "lit-html/directives/guard";
import { Foto, loadImage, holenAsync } from "../gemeinsam";
import { until } from "lit-html/directives/until";
import { ViewerOffnen } from "./actions";

let Bilden: Foto[] = [
  {
    ID: 0,
    URL: 'https://placekitten.com/1200/675',
    Miniaturansicht: 'https://placekitten.com/300/300',
    IstLiebling: false,
    Felder: {
      Nome: 'Lucia Medeiros',
      Localização: 'Manaus - AM',
      Descrição: 'A derrota vem primeiro que a vitória'
    }
  },
  {
    ID: 1,
    URL: 'https://placekitten.com/1920/720',
    Miniaturansicht: 'https://placekitten.com/300/300',
    IstLiebling: true,
    Felder: {
      Nome: 'Lucia Medeirosss',
      Localização: 'Manaus - AM',
      Descrição: 'A derrota vem primeiro que a vitória'
    }
  },
  {
    ID: 2,
    URL: 'https://placekitten.com/1366/768',
    Miniaturansicht: 'https://placekitten.com/300/300',
    IstLiebling: true,
    Felder: {
      Nome: 'Lucia Medeiros',
      Localização: 'Manaus - AM',
      Descrição: 'A derrota vem primeiro que a vitória'
    }
  },
];

function AbbildungBauen(Foto: Foto) {
  const FotoEintraege = Object.entries(Foto.Felder);
  return html`
    <figure ?Liebling=${Foto.IstLiebling}>
      <div class="Bildaktionen">
          <button class="Sterntaster" type="button" ?Liebling=${Foto.IstLiebling}>
              <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17.56 21a1 1 0 0 1-.46-.11L12 18.22l-5.1 2.67a1 1 0 0 1-1.45-1.06l1-5.63-4.12-4a1 1 0 0 1-.25-1 1 1 0 0 1 .81-.68l5.7-.83 2.51-5.13a1 1 0 0 1 1.8 0l2.54 5.12 5.7.83a1 1 0 0 1 .81.68 1 1 0 0 1-.25 1l-4.12 4 1 5.63a1 1 0 0 1-.4 1 1 1 0 0 1-.62.18z" data-name="star"/></svg>
              <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17.56 21a1 1 0 0 1-.46-.11L12 18.22l-5.1 2.67a1 1 0 0 1-1.45-1.06l1-5.63-4.12-4a1 1 0 0 1-.25-1 1 1 0 0 1 .81-.68l5.7-.83 2.51-5.13a1 1 0 0 1 1.8 0l2.54 5.12 5.7.83a1 1 0 0 1 .81.68 1 1 0 0 1-.25 1l-4.12 4 1 5.63a1 1 0 0 1-.4 1 1 1 0 0 1-.62.18zM12 16.1a.92.92 0 0 1 .46.11l3.77 2-.72-4.21a1 1 0 0 1 .29-.89l3-2.93-4.2-.62a1 1 0 0 1-.71-.56L12 5.25 10.11 9a1 1 0 0 1-.75.54l-4.2.62 3 2.93a1 1 0 0 1 .29.89l-.72 4.16 3.77-2a.92.92 0 0 1 .5-.04z" data-name="star"/></svg>
          </button>
      </div>
      <a @click=${(e: Event) => ViewerOffnen.call(e.target, e, { ...Foto })} href="/foto/${Foto.ID}" class="Bild-Link spinner">
          ${loadImage(Foto.Miniaturansicht)}
      </a>
      <figcaption class="beschreibung__inhalt">
          ${guard(FotoEintraege, () => FotoEintraege.map(Feld => html`
              <p class="inhalt__label">${Feld[0]}</p>
              <p class="inhalt__Wert">${Feld[1]}</p>
          `))}
      </figcaption>
    </figure>`;
}

const GalerieGridBauen = (Fotos: Foto[]) => html`${Fotos.map(AbbildungBauen)}`;

function Galerie() {
  return html`
    <section class="Galerie Flexible">
      <header class="Galerie__Kopf Flexible Flexible--a-center">
        <h2 class="Titel--sekundaer unselectable">Galeria</h2>
        <div class="Galerie__Kontrolle Flexible Flexible--a-center">
          <button onclick="this.parentElement.parentElement.parentElement.classList.toggle('Liebling');this.toggleAttribute('Liebling');" class="Sterntaster" type="button">
            <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17.56 21a1 1 0 0 1-.46-.11L12 18.22l-5.1 2.67a1 1 0 0 1-1.45-1.06l1-5.63-4.12-4a1 1 0 0 1-.25-1 1 1 0 0 1 .81-.68l5.7-.83 2.51-5.13a1 1 0 0 1 1.8 0l2.54 5.12 5.7.83a1 1 0 0 1 .81.68 1 1 0 0 1-.25 1l-4.12 4 1 5.63a1 1 0 0 1-.4 1 1 1 0 0 1-.62.18z" data-name="star"/></svg>
            <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17.56 21a1 1 0 0 1-.46-.11L12 18.22l-5.1 2.67a1 1 0 0 1-1.45-1.06l1-5.63-4.12-4a1 1 0 0 1-.25-1 1 1 0 0 1 .81-.68l5.7-.83 2.51-5.13a1 1 0 0 1 1.8 0l2.54 5.12 5.7.83a1 1 0 0 1 .81.68 1 1 0 0 1-.25 1l-4.12 4 1 5.63a1 1 0 0 1-.4 1 1 1 0 0 1-.62.18zM12 16.1a.92.92 0 0 1 .46.11l3.77 2-.72-4.21a1 1 0 0 1 .29-.89l3-2.93-4.2-.62a1 1 0 0 1-.71-.56L12 5.25 10.11 9a1 1 0 0 1-.75.54l-4.2.62 3 2.93a1 1 0 0 1 .29.89l-.72 4.16 3.77-2a.92.92 0 0 1 .5-.04z" data-name="star"/></svg>
          </button>
          <span style="align-self: stretch;width: 1px;background-color: #212121;"></span>
          <button onclick="this.parentElement.parentElement.parentElement.classList.toggle('Listenansicht');" class="Kontrolle__btn btn--Grid" type="button" aktiv>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" fill="currentColor" viewBox="0 0 24 24"><path d="M9 3H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM5 9V5h4v4zM19 3h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-4 6V5h4v4zM9 13H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2zm-4 6v-4h4v4zM19 13h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2zm-4 6v-4h4v4z"/></svg>
          </button>
          <button onclick="this.parentElement.parentElement.parentElement.classList.toggle('Listenansicht');" class="Kontrolle__btn btn--Liste" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" fill="currentColor" viewBox="0 0 24 24"><circle cx="4" cy="7" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="17" r="1"/><rect width="14" height="2" x="7" y="11" rx=".94" ry=".94"/><rect width="14" height="2" x="7" y="16" rx=".94" ry=".94"/><rect width="14" height="2" x="7" y="6" rx=".94" ry=".94"/></svg>
          </button>
        </div>
      </header>
      <div class="Galerie__Bilden">
      ${Bilden.length ?
      until(holenAsync("https://reqres.in/api/users/1").then(res => GalerieGridBauen(Bilden)), html`<p>Pegando envios...</p>`) :
      GalerieGridBauen(Bilden)
    }</div>
  </section>`;
}

export {
  AbbildungBauen,
  GalerieGridBauen,
  Galerie
};