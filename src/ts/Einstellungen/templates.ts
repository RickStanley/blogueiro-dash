import { html, TemplateResult } from "lit-html";
import '../../styles/Einstellungen.css';
import MediumEditor from "medium-editor";
import Pickr from "@simonwep/pickr";
import { ist } from "../gemeinsam";
import { naechstesForm } from "./actions";

/**
 * Tipos de campos disponíveis da API.
 */
enum Feldtypen {
  AreaTexto = "areatexto",
  Texto = "texto",
  Selecao = "selecao",
}

/**
 * Para campo de opção, valor e label.
 */
interface Optionen {
  wert?: string;
  label?: string;
}

// @todo O ideal é ter uma interface pra
// consumo da API e POST da API e POST com
// campos obrigatórios
/**
 * Um campo.
 */
interface Feld {
  id?: number;
  label: string;
  typ: Feldtypen;
  hinweis?: string;
  options?: Optionen[];
}

/**
 * Retrona o Alias do campo pro usuário final.
 */
const Feldtyp = (Art: Feldtypen) => {
  switch (Art) {
    case Feldtypen.AreaTexto:
      return "Área de texto";
    case Feldtypen.Texto:
      return "Texto";
    case Feldtypen.Selecao:
      return "Seleção";
    default:
      return "Não definido"
  }
};

/**
 * Renderiza o campo.
 */
const Feldstruktur = (Feld: Feld, Optionen?: Optionen[]) => {
  let Grund: TemplateResult;
  let Feldname = Feldtyp(Feld.typ);
  const Labelid = Feld.id || ~~(Math.random() * 101);

  Grund = html`
  <fieldset class="Feld">
    <legend class="Feld__Untertitel unselectable">
      ${Feldname}
    </legend>
    <label class="unselectable" for="Feldname-${Labelid}">Nome do campo:</label>
    <input required name="label" id="Feldname-${Labelid}" value=${Feld.label} placeholder="Nome do campo">
    ${Optionen && html`
      <div class="Feldsoptionen">
      ${Optionen.map((Option, index) => html`
        <input type="hidden" name="opcao[][valor]" value=${Option.wert}>
        <label class="unselectable" for="Feldoption-${Labelid}">Opção ${index + 1}:</label>
        <input required id="Feldoption-${Labelid}" type="text" name="opcao[][label]" value=${Option.label} placeholder="Valor da opção">
      `)}
        <button type="button" class="Flexible Flexible--a-center hinzufuegen">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" fill="currentColor"><defs/><path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>
          <span>Adicionar opção</span>
        </button>
      </div>
    `}
    <input type="hidden" name="id" value="${Feld.id}">
    <input type="hidden" name="tipo" value="${Feld.typ}">
    <button type="button" class="Papierkorb">
      <span class="Deckel"></span>
      <span class="Dose"></span>
    </button>
  </fieldset>
  `;

  return Grund;
};

/**
 * Renderiza os campos.
 */
function FelderBauen() {
  // Debug only
  const Felder: Feld[] = [
    {
      id: 0,
      hinweis: '',
      label: 'Default',
      typ: Feldtypen.Texto,
    },
    {
      id: 1,
      hinweis: '',
      label: 'Descrição',
      typ: Feldtypen.AreaTexto,
    },
    {
      label: '',
      typ: Feldtypen.Selecao,
      options: [
        {
          label: '',
          wert: ''
        }
      ]
    }
  ];

  return Felder.map(Feld => Feldstruktur(Feld, Feld.options));
}

/**
 * Chamar após renderizar na View principal.
 */
function nachRendern() {
  let Originalfarbe = '#42445a';

  const editor = new MediumEditor('.Inhalt', {
    placeholder: {
      text: 'Digite um texto.'
    },
    anchor: {
      placeholderText: 'Coloque um link aqui'
    },
    toolbar: {
      buttons: ['bold', 'italic', 'underline',]
    },
  });

  const pickr = Pickr.create({
    el: '.color-picker',
    theme: 'nano',
    strings: {
      save: 'Salvar',
      cancel: 'Reverter'
    },
    lockOpacity: true,
    default: Originalfarbe,
    components: {
      preview: true,
      hue: true,
      interaction: {
        input: true,
        save: true,
        cancel: true,
      }
    }
  });

  pickr.on('init', () => {
    const span = document.createElement('span');
    span.classList.add('picker-output');
    span.innerText = pickr.getColor().toHEXA().toString();
    // @ts-ignore reportar isso pros devs da lib
    pickr.getRoot().root.appendChild(span);
  });

  pickr.on('save', () => {
    (ist('.Theme_Einstellungen_Form') as any).elements.reset.disabled = false;
    (ist('.Theme_Einstellungen_Form') as any).elements.submit.disabled = false;
    (ist('.picker-output') as HTMLElement).innerText = pickr.getColor().toHEXA().toString();
  });

  // @todo Melhorar essa parte, usar o lit-html se possível
  ist('.Theme_Einstellungen_Form').addEventListener('reset', function (e) {
    pickr.setColor(Originalfarbe);
  });
}

/**
 * Renderiza View do administrador.
 */
function EinstellungenBauen() {
  return html`
    <section class="Einstellungen Flexible">
      <nav class="Einstellungen__Nav Flexible unselectable">
        <button onclick="this.parentElement.parentElement.classList.remove('thema-einstellungen');" class="Umschalten__Fenstern Flexible Flexible--a-center" type="button">
            Telas
        </button>
        <button onclick="this.parentElement.parentElement.classList.add('thema-einstellungen');" class="Umschalten__Fenstern Flexible Flexible--a-center" type="button">
            Tema
        </button>
      </nav>
      <div class="Fenstern_Einstellungen">
        <div class="Wichtigsten Flexible Flexible--j-center">
          <div @click=${naechstesForm} class="Wichtigsten__Vorschau Wichtigsten__Vorschau--aktiv Wichtigsten__Home">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 320 568"><defs/><path fill="#fff" d="M0 0h320v568H0z"/><path fill="#C4C4C4" d="M0 0h320v284H0z"/><path stroke="#C4C4C4" stroke-width="10" d="M44 318l232.009 1M44 335l232.009 1M44 354l232.009 1M44 372l232.009 1M120 390l80 1"/><path stroke="#C4C4C4" stroke-width="5" d="M120 545.5l80 1"/><path stroke="#C4C4C4" stroke-width="10" d="M115 480l90 1"/><path fill="#000" fill-opacity=".54" fill-rule="evenodd" d="M143.333 455c0-9.2 7.467-16.667 16.667-16.667 9.2 0 16.667 7.467 16.667 16.667 0 9.2-7.467 16.667-16.667 16.667-9.2 0-16.667-7.467-16.667-16.667zm18.334 1.667h6.666v-3.334h-6.666v-6.666h-3.334v6.666h-6.666v3.334h6.666v6.666h3.334v-6.666z" clip-rule="evenodd"/><path fill="#ABABAB" d="M72 91h175v101H72V91z"/></svg>
          </div>
          <div @click=${naechstesForm} class="Wichtigsten__Vorschau Wichtigsten__Versand">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 320 568"><defs/><path fill="#fff" d="M0 0h320v568H0z"/><path fill="#C4C4C4" d="M0 0h320v284H0z"/><rect width="105" height="34" x="28" y="505" fill="#C4C4C4" rx="3"/><rect width="105" height="34" x="186" y="504" fill="#C4C4C4" rx="3"/><path fill="#C4C4C4" d="M28 313h263v40H28z"/><path fill="#000" fill-opacity=".54" fill-rule="evenodd" d="M88.5 297.25c-3.45 0-6.25 2.8-6.25 6.25s2.8 6.25 6.25 6.25 6.25-2.8 6.25-6.25-2.8-6.25-6.25-6.25zm-.625 9.375v-1.25h1.25v1.25h-1.25zm0-6.25v3.75h1.25v-3.75h-1.25z" clip-rule="evenodd"/><path fill="#C4C4C4" d="M28 375h263v27H28zM28 362h50v8H28zM28 300h50v8H28zM28 426h263v27H28zM28 413h50v8H28z"/><path fill="#000" fill-opacity=".54" fill-rule="evenodd" d="M196.083 521.5c0-5.75 4.667-10.417 10.417-10.417s10.417 4.667 10.417 10.417-4.667 10.417-10.417 10.417-10.417-4.667-10.417-10.417zm11.459 1.042h4.166v-2.084h-4.166v-4.166h-2.084v4.166h-4.166v2.084h4.166v4.166h2.084v-4.166z" clip-rule="evenodd"/></svg>
          </div>
          <div @click=${naechstesForm} class="Wichtigsten__Vorschau Wichtigsten__Ende">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 320 568"><defs/><path fill="#fff" d="M0 0h320v568H0z"/><path stroke="#C4C4C4" stroke-width="10" d="M130 135l60 1M120 152l80 1"/><path stroke="#C4C4C4" stroke-width="8" d="M115 185l90 1M130 197l60 1"/><path stroke="#757575" stroke-width="2" d="M85 168h150"/><path stroke="#C4C4C4" stroke-width="10" d="M114 317l90 1"/><path fill="#000" fill-opacity=".54" fill-rule="evenodd" d="M142.333 292c0-9.2 7.467-16.667 16.667-16.667 9.2 0 16.667 7.467 16.667 16.667 0 9.2-7.467 16.667-16.667 16.667-9.2 0-16.667-7.467-16.667-16.667zm18.334 1.667h6.666v-3.334h-6.666v-6.666h-3.334v6.666h-6.666v3.334h6.666v6.666h3.334v-6.666zM135 90c0-13.8 11.2-25 25-25s25 11.2 25 25-11.2 25-25 25-25-11.2-25-25zm9.25 1.75l8.975 8.975c.975.975 2.575.975 3.525 0l18.975-18.975a2.49 2.49 0 000-3.525 2.49 2.49 0 00-3.525 0l-17.2 17.2-7.225-7.2a2.49 2.49 0 00-3.525 0 2.49 2.49 0 000 3.525z" clip-rule="evenodd"/><rect width="105" height="34" x="114" y="437" fill="#C4C4C4" rx="3"/><path fill="#757575" d="M130.417 461.833v-6.25h4.166v6.25h5.209V453.5h3.125l-10.417-9.375-10.417 9.375h3.125v8.333h5.209z"/></svg>
          </div>
        </div>
        <div class="Formen">
          <form>
            <input accept="image/*" type="file" name="fundo" id="fundo">
            <label tabindex="1" class="Flexible--inline Flexible--a-center file_label" for="fundo">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" fill="currentColor"><path d="M18 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3zM8 7a1.5 1.5 0 1 1-1.5 1.5A1.5 1.5 0 0 1 8 7zm11 10.83A1.09 1.09 0 0 1 18 19H6l7.57-6.82a.69.69 0 0 1 .93 0l4.5 4.48z"/></svg>
                Fundo
            </label>
            <input type="file" accept="image/*" name="logo" id="logo">
            <label tabindex="1" class="Flexible--inline Flexible--a-center file_label" for="logo">
                <svg width="14" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3zM6 5h12a1 1 0 0 1 1 1v8.36l-3.2-2.73a2.77 2.77 0 0 0-3.52 0L5 17.7V6a1 1 0 0 1 1-1z"/><circle cx="8" cy="8.5" r="1.5"/></svg>
                Destaque
            </label>
            <textarea class="Inhalt" name="boas-vindas" maxlength="180">
                Bem-vindo(a) ao Blogueiros <b>Fermen.to</b>.
                Seu conteúdo é muito importante pra gente: tire fotos, faça vídeos, registre momentos e seja um influenciador nas nossas redes.
            </textarea>
            <input type="text" name="carregar" value="Carregar mídia">
            <input type="text" name="como-funcion" value="como funciona?">
            <div class="Formularaktionen Flexible Flexible--j-evenly">
              <button type="submit">Salvar</button>
            </div>
          </form>
          <form hidden>
            ${FelderBauen()}
            <button class="Flexible Flexible--a-center hinzufuegen" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" fill="currentColor"><defs></defs><path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path></svg>
              <span>Adicionar campo</span>
            </button>
            <div class="Formularaktionen Flexible Flexible--j-evenly">
              <button type="submit">Salvar</button>
            </div>
          </form>
          <form hidden>
            <input type="text" name="agradecimentos" value="Muito obrigado!">
            <textarea name="mensagem_final" class="Inhalt">A imagem foi enviada com sucesso!</textarea>
            <div class="Formularaktionen Flexible Flexible--j-evenly">
              <button type="submit">Salvar</button>
            </div>
          </form>
        </div>
      </div>
      <div class="Theme_Einstellungen">
          <h2 class="Titel--sekundaer unselectable">Configurações do tema</h2>
          <form class="Theme_Einstellungen_Form">
            <label for="nome">Título</label>
            <input @input=${function (e) { this.form.elements.reset.disabled = this.form.elements.submit.disabled = false }} type="text" name="nome" id="nome" value="Blogueiros Namorados">
            <label for="cor-tema">Cor do tema</label>
            <div class="color-picker">
            </div>
            <button name="submit" type="submit" disabled>Salvar</button>
            <button name="reset" class="kontur" type="reset" disabled>Resetar</button>
          </form>
      </div>
    </section>`;
}

export {
  EinstellungenBauen,
  nachRendern
};