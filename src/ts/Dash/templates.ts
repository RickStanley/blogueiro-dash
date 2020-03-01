import { html } from "lit-html";
import { until } from "lit-html/directives/until";
import { Galerie } from "../Galerie/templates";
import { AdminPruefen } from "../gemeinsam";

function DashBauen() {
  return html`
    <header class="Main__Kopf Flexible Flexible--a-center">
    <h1 class="Main__Titel unselectable">Blogueiros Namorados</h1>
    <div class="Tasten Flexible unselectable">
        <button onclick="this.parentElement.parentElement.classList.remove('wechseln');" type="button" class="Flexible Flexible--a-center Kopf__Thema-btn">
            <svg role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24"><circle cx="12" cy="14" r="1.5"/><path d="M19 7h-3V5.5A2.5 2.5 0 0 0 13.5 3h-3A2.5 2.5 0 0 0 8 5.5V7H5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-8a3 3 0 0 0-3-3zm-9-1.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V7h-4zm2 12a3.5 3.5 0 1 1 3.5-3.5 3.5 3.5 0 0 1-3.5 3.5z"/></svg>
            <span>Envios</span>
        </button>
    ${
    until(AdminPruefen('https://reqres.in/api/users/1', () => html`
        <button onclick="this.parentElement.parentElement.classList.add('wechseln');" class="Kopf__Thema-btn Flexible Flexible--a-center btn--tomate btn--rotate" type="button">
            <svg width="24" role="presentation" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="color-palette"><rect width="24" height="24" opacity="0"/><path d="M19.54 5.08A10.61 10.61 0 0 0 11.91 2a10 10 0 0 0-.05 20 2.58 2.58 0 0 0 2.53-1.89 2.52 2.52 0 0 0-.57-2.28.5.5 0 0 1 .37-.83h1.65A6.15 6.15 0 0 0 22 11.33a8.48 8.48 0 0 0-2.46-6.25zM15.88 15h-1.65a2.49 2.49 0 0 0-1.87 4.15.49.49 0 0 1 .12.49c-.05.21-.28.34-.59.36a8 8 0 0 1-7.82-9.11A8.1 8.1 0 0 1 11.92 4H12a8.47 8.47 0 0 1 6.1 2.48 6.5 6.5 0 0 1 1.9 4.77A4.17 4.17 0 0 1 15.88 15z"/><circle cx="12" cy="6.5" r="1.5"/><path d="M15.25 7.2a1.5 1.5 0 1 0 2.05.55 1.5 1.5 0 0 0-2.05-.55z"/><path d="M8.75 7.2a1.5 1.5 0 1 0 .55 2.05 1.5 1.5 0 0 0-.55-2.05z"/><path d="M6.16 11.26a1.5 1.5 0 1 0 2.08.4 1.49 1.49 0 0 0-2.08-.4z"/></g></g></svg>
            <span>Editar template</span>
        </button>`)
    )
    }
    </div>
    </header>
    <div class="Schaufenstern Flexible" data-achtung="einstellungen">
      ${Galerie()}
      ${
    until(
      AdminPruefen('https://reqres.in/api/users/1', async () => {
        const module = await import('../Einstellungen/templates');

        document.dispatchEvent(new CustomEvent('Beobachten', {
          detail: {
            wen: '[data-achtung=einstellungen]',
            was: module.nachRendern
          }
        }));
        return module.EinstellungenBauen();
      })
    )
    }
    </div>`;
}

export {
  DashBauen
};