import { html } from "lit-html";
import { until } from "lit-html/directives/until";
import { AdminPruefen } from "../gemeinsam";
import { neueVorlage, AllgemeineEinstellungenOffnen } from "./actions";

function NavBauen() {
  return html`
    <ul class="Nav__inhalt">
        ${until(AdminPruefen('https://reqres.in/api/users/1', () => html`
        <li class="Navigationspunkt">
            <a @click=${AllgemeineEinstellungenOffnen} href="#" class="Navigationslink">
                <svg role="presentation" class="Nav__Icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                    fill="currentColor" width="24">
                    <circle cx="12" cy="12" r="1.5"></circle>
                    <path
                    d="M20.32 9.37h-1.09c-.14 0-.24-.11-.3-.26a.34.34 0 0 1 0-.37l.81-.74a1.63 1.63 0 0 0 .5-1.18 1.67 1.67 0 0 0-.5-1.19L18.4 4.26a1.67 1.67 0 0 0-2.37 0l-.77.74a.38.38 0 0 1-.41 0 .34.34 0 0 1-.22-.29V3.68A1.68 1.68 0 0 0 13 2h-1.94a1.69 1.69 0 0 0-1.69 1.68v1.09c0 .14-.11.24-.26.3a.34.34 0 0 1-.37 0L8 4.26a1.72 1.72 0 0 0-1.19-.5 1.65 1.65 0 0 0-1.18.5L4.26 5.6a1.67 1.67 0 0 0 0 2.4l.74.74a.38.38 0 0 1 0 .41.34.34 0 0 1-.29.22H3.68A1.68 1.68 0 0 0 2 11.05v1.89a1.69 1.69 0 0 0 1.68 1.69h1.09c.14 0 .24.11.3.26a.34.34 0 0 1 0 .37l-.81.74a1.72 1.72 0 0 0-.5 1.19 1.66 1.66 0 0 0 .5 1.19l1.34 1.36a1.67 1.67 0 0 0 2.37 0l.77-.74a.38.38 0 0 1 .41 0 .34.34 0 0 1 .22.29v1.09A1.68 1.68 0 0 0 11.05 22h1.89a1.69 1.69 0 0 0 1.69-1.68v-1.09c0-.14.11-.24.26-.3a.34.34 0 0 1 .37 0l.76.77a1.72 1.72 0 0 0 1.19.5 1.65 1.65 0 0 0 1.18-.5l1.34-1.34a1.67 1.67 0 0 0 0-2.37l-.73-.73a.34.34 0 0 1 0-.37.34.34 0 0 1 .29-.22h1.09A1.68 1.68 0 0 0 22 13v-1.94a1.69 1.69 0 0 0-1.68-1.69zM12 15.5a3.5 3.5 0 1 1 3.5-3.5 3.5 3.5 0 0 1-3.5 3.5z">
                    </path>
                </svg>
                <span class="Nav__Text">CONFIGURAÇÕES</span>
            </a>
        </li>`)
  )}
      <li class="Navigationspunkt Navigationspunkt--aktiv">
        <a class="Navigationslink" href="#">
          <div class="Nav__Icon Nav__Vorlage_Vorschau"></div>
          <span class="Nav__Text">Blogueiros Namorados</span>
        </a>
      </li>
      <li class="Navigationspunkt">
        <a class="Navigationslink" href="#">
          <div class="Nav__Icon Nav__Vorlage_Vorschau"></div>
          <span class="Nav__Text">Lorem ipsum dolor sit amet.</span>
        </a>
      </li>
      ${until(AdminPruefen('https://reqres.in/api/users/1', () => html`
      <li class="Navigationspunkt">
        <a @click=${neueVorlage} class="Navigationslink" href="#">
          <svg role="presentation" class="Nav__Icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            fill="currentColor">
            <g data-name="Layer 2">
              <g data-name="plus-circle">
                <rect width="24" height="24" opacity="0" />
                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
                <path d="M15 11h-2V9a1 1 0 0 0-2 0v2H9a1 1 0 0 0 0 2h2v2a1 1 0 0 0 2 0v-2h2a1 1 0 0 0 0-2z" />
              </g>
            </g>
          </svg>
          <span class="Nav__Text">Novo template</span>
        </a>
      </li>`)
  )}
      <li class="Anerkennung">
        <a class="Navigationslink" href="https://fermen.to" target="_blank" rel="noopener noreferrer">
          <img class="Nav__Icon" width="50" height="50" loading="lazy"
            src="http://maru.fermen.to/marca/fermento-simbolo-animado.svg" alt="" role="presentation">
          <span class="Nav__Text">&copy; Blogueiros por <b>Fermen.to</b></span>
        </a>
      </li>
    </ul>
    `;
}

export {
  NavBauen,
};