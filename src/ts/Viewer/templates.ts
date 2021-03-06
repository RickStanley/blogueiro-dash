import { html } from "lit-html";
import { Foto, loadImage, holenAsync } from "../gemeinsam";
import { until } from "lit-html/directives/until";
import { handler } from "./actions";

const InhaltBauen = (Foto: Foto) => html`
<figure class="Viewer__Bild spinner">
    ${loadImage(Foto.URL)}
</figure>
<div class="Viewer__beschreibung">
  <header class="Viewer__Handlugen">
    <button class="Sterntaster" type="button">
      <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M17.56 21a1 1 0 0 1-.46-.11L12 18.22l-5.1 2.67a1 1 0 0 1-1.45-1.06l1-5.63-4.12-4a1 1 0 0 1-.25-1 1 1 0 0 1 .81-.68l5.7-.83 2.51-5.13a1 1 0 0 1 1.8 0l2.54 5.12 5.7.83a1 1 0 0 1 .81.68 1 1 0 0 1-.25 1l-4.12 4 1 5.63a1 1 0 0 1-.4 1 1 1 0 0 1-.62.18z"
          />
      </svg>
      <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M17.56 21a1 1 0 0 1-.46-.11L12 18.22l-5.1 2.67a1 1 0 0 1-1.45-1.06l1-5.63-4.12-4a1 1 0 0 1-.25-1 1 1 0 0 1 .81-.68l5.7-.83 2.51-5.13a1 1 0 0 1 1.8 0l2.54 5.12 5.7.83a1 1 0 0 1 .81.68 1 1 0 0 1-.25 1l-4.12 4 1 5.63a1 1 0 0 1-.4 1 1 1 0 0 1-.62.18zM12 16.1a.92.92 0 0 1 .46.11l3.77 2-.72-4.21a1 1 0 0 1 .29-.89l3-2.93-4.2-.62a1 1 0 0 1-.71-.56L12 5.25 10.11 9a1 1 0 0 1-.75.54l-4.2.62 3 2.93a1 1 0 0 1 .29.89l-.72 4.16 3.77-2a.92.92 0 0 1 .5-.04z"
          />
      </svg>
    </button>
    <button class="Viewer__schließen" type="button">
      <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"
          />
      </svg>
    </button>
  </header>
  <hr>
  <div class="beschreibung__inhalt">
      ${Object.entries(Foto.Felder).map(Feld => html`
          <p class="inhalt__label">${Feld[0]}</p>
          <p class="inhalt__Wert">${Feld[1]}</p>
      `)}
  </div>
</div>
`;

function ViewerinhaltBauen(Foto: Foto) {
  let promise: Promise<Foto> = typeof Foto === "string" ? holenAsync("https://reqres.in/api/users/1") : null;
  return html`
    <div class="Allgemeinemodal__Hintergrund" @click=${handler} role="dialog">
      <div class="Allgemeinemodal__innherhalb">
          ${promise ? until(promise.then(foto => InhaltBauen(foto))) : InhaltBauen(Foto)}
      </div>
    </div>
    `;
}

export {
  ViewerinhaltBauen
};