import { html, render } from "lit-html";
import { ist } from "../gemeinsam";
import "../../styles/Einstellungenmodal.css";

const Befestigungspunkt = "AllgemeineEinstellungen";

const handler = function (this: HTMLElement, e: Event) {
  const target = e.target as HTMLElement;
  if (this === e.target || !this.contains(target) || target.closest('.Viewer__schließen')) {
    render(html``, ist(`.${Befestigungspunkt}`));
    return;
  }
};

const HinweisBauen = (Text: string) => html`
<aside class="Einstellunghinweis unselectable">
  <svg xmlns="http://www.w3.org/2000/svg" style="isolation:isolate;" viewBox="0 0 48 48"><path fill="#C0BBCD" fill-rule="nonzero" d="M22 34h4V22h-4v12zm2-30C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.82 0-16-7.18-16-16S15.18 8 24 8s16 7.18 16 16-7.18 16-16 16zm-2-22h4v-4h-4v4z"></path></svg>
  <p>${Text}</p>
</aside>
`;

function Einstellungen() {
  return html`
    <div @click=${handler} class="Allgemeinemodal__Hintergrund Einstellungenmodal" role="dialog">
      <div class="Allgemeinemodal__innherhalb">
        <header class="Viewer__Handlugen">
          <h2 class="Titel--sekundaer unselectable">Configurações gerais</h2>
          <button class="Viewer__schließen" type="button">
              <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"
                  />
              </svg>
          </button>
        </header>
        <div class="Formen">
          <p class="unselectable">Cliente</p>
          ${HinweisBauen("Aqui você define a aparência padrão do aplicativo.")}
          <form class="Theme_Einstellungen_Form">
              <input accept="image/*" type="file" name="fundo" id="logo-all">
              <label tabindex="1" class="Flexible--inline Flexible--a-center file_label" for="logo-all">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" fill="currentColor"><path d="M18 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3zM8 7a1.5 1.5 0 1 1-1.5 1.5A1.5 1.5 0 0 1 8 7zm11 10.83A1.09 1.09 0 0 1 18 19H6l7.57-6.82a.69.69 0 0 1 .93 0l4.5 4.48z"/></svg>
                  <span>
                    Logo
                  </span>
              </label>
              <input accept="image/*" type="file" name="fundo" id="fundo-all">
              <label tabindex="1" class="Flexible--inline Flexible--a-center file_label" for="fundo-all">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" fill="currentColor"><path d="M18 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3zM8 7a1.5 1.5 0 1 1-1.5 1.5A1.5 1.5 0 0 1 8 7zm11 10.83A1.09 1.09 0 0 1 18 19H6l7.57-6.82a.69.69 0 0 1 .93 0l4.5 4.48z"/></svg>
                  <span>Fundo padrão do cabeçalho inicial</span>
              </label>
              <label>Cor do tema</label>

              <button name="submit" type="submit" disabled="">Salvar</button>
              <button name="reset" class="kontur" type="reset" disabled="">Resetar</button>
          </form>
          <p class="unselectable">Templates</p>
          <form>
          </form>
          <p class="unselectable">Campos</p>
          ${HinweisBauen("Todos os campos que foram criados.")}
          <form>
          </form>
          <p class="unselectable">Eventos</p>
          ${HinweisBauen("Aqui você cria eventos para usar em algum template. (Exemplo: datas festivas ou promoções.)")}
          <form>
          </form>
        </div>
      </div>
    </div>
  `;
}

export {
  Einstellungen,
  Befestigungspunkt
};