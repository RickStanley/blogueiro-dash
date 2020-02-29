import { html } from "lit-html";
import { asyncAppend } from "lit-html/directives/async-append";
import { Galerie } from "../Galerie/templates";
import { EinstellungenBauen } from "../Einstellugen/templates";

// Endpoint that returns a billion digits of PI, streamed.
const url =
    'https://cors-anywhere.herokuapp.com/http://stuff.mit.edu/afs/sipb/contrib/pi/pi-billion.txt';

const streamingResponse = (async () => {
  const response = await fetch(url);
  return response.body.getReader();
})();

const adminPruefen = async () => {
    try {
        const response = await fetch('https://reqres.in/api/users/1');
        const json = await response.json();
        console.log(json);
        
        if (json.id === 1) {
           const template = await import('../Einstellugen/templates');
           return template.EinstellungenBauen();
        } else {
            return '';
        }

    } catch (error) {
        return '';
    }
}

function DashBauen() {
    return html`
        <header class="Main__Kopf Flexible Flexible--a-center">
        <h1 class="Main__Titel">Blogueiros Namorados</h1>
        <div class="Tasten Flexible">
            <button onclick="this.parentElement.parentElement.classList.remove('wechseln');" type="button" class="Flexible Flexible--a-center Kopf__Thema-btn">
                Envios
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24"><circle cx="12" cy="14" r="1.5"/><path d="M19 7h-3V5.5A2.5 2.5 0 0 0 13.5 3h-3A2.5 2.5 0 0 0 8 5.5V7H5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-8a3 3 0 0 0-3-3zm-9-1.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V7h-4zm2 12a3.5 3.5 0 1 1 3.5-3.5 3.5 3.5 0 0 1-3.5 3.5z"/></svg>
            </button>
            <button onclick="this.parentElement.parentElement.classList.add('wechseln');" class="Kopf__Thema-btn Flexible Flexible--a-center btn--tomate btn--rotate" type="button">
                Configurações
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24"><circle cx="12" cy="12" r="1.5"/><path d="M20.32 9.37h-1.09c-.14 0-.24-.11-.3-.26a.34.34 0 0 1 0-.37l.81-.74a1.63 1.63 0 0 0 .5-1.18 1.67 1.67 0 0 0-.5-1.19L18.4 4.26a1.67 1.67 0 0 0-2.37 0l-.77.74a.38.38 0 0 1-.41 0 .34.34 0 0 1-.22-.29V3.68A1.68 1.68 0 0 0 13 2h-1.94a1.69 1.69 0 0 0-1.69 1.68v1.09c0 .14-.11.24-.26.3a.34.34 0 0 1-.37 0L8 4.26a1.72 1.72 0 0 0-1.19-.5 1.65 1.65 0 0 0-1.18.5L4.26 5.6a1.67 1.67 0 0 0 0 2.4l.74.74a.38.38 0 0 1 0 .41.34.34 0 0 1-.29.22H3.68A1.68 1.68 0 0 0 2 11.05v1.89a1.69 1.69 0 0 0 1.68 1.69h1.09c.14 0 .24.11.3.26a.34.34 0 0 1 0 .37l-.81.74a1.72 1.72 0 0 0-.5 1.19 1.66 1.66 0 0 0 .5 1.19l1.34 1.36a1.67 1.67 0 0 0 2.37 0l.77-.74a.38.38 0 0 1 .41 0 .34.34 0 0 1 .22.29v1.09A1.68 1.68 0 0 0 11.05 22h1.89a1.69 1.69 0 0 0 1.69-1.68v-1.09c0-.14.11-.24.26-.3a.34.34 0 0 1 .37 0l.76.77a1.72 1.72 0 0 0 1.19.5 1.65 1.65 0 0 0 1.18-.5l1.34-1.34a1.67 1.67 0 0 0 0-2.37l-.73-.73a.34.34 0 0 1 0-.37.34.34 0 0 1 .29-.22h1.09A1.68 1.68 0 0 0 22 13v-1.94a1.69 1.69 0 0 0-1.68-1.69zM12 15.5a3.5 3.5 0 1 1 3.5-3.5 3.5 3.5 0 0 1-3.5 3.5z"/></svg>
            </button>
        </div>
        </header>
        <div class="Schaufenstern Flexible">
            ${Galerie()}
            ${asyncAppend(streamingResponse)}
        </div>`;
}

export {
    DashBauen
};