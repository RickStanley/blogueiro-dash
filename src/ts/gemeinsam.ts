import { html, TemplateResult } from "lit-html";

// Interfaces
interface Foto {
  readonly ID: number;
  readonly Miniaturansicht: string;
  readonly URL: string;
  readonly Felder: { [s: string]: string };
  readonly IstLiebling: boolean;
}

// Funktionen
const isNavigationPath = (path: string) => !!path && !path.startsWith('javascript:void');

const isExternalPath = (path: string) => /^https?:\/\//.test(path);

const isApplicationPath = (path: string) => isNavigationPath(path) && !isExternalPath(path);

const fertig = (f: Function) => {
  /in/.test(document.readyState) ? setTimeout(fertig, 5, f) : f();
};

const ist = (Kriterien: string, Kontext?: Element) => (Kontext || document).querySelector(Kriterien);

const sind = (Kriterien: string, Kontext?: Element) => (Kontext || document).querySelectorAll(Kriterien);

const Elternteil = (node: Element, wo: string) => {
  let Aktuell = node;
  while (Aktuell.parentNode) {
    if (wo === Aktuell.id || Aktuell.classList.contains(wo)) {
      return Aktuell;
    }
    Aktuell = <Element>Aktuell.parentNode;
  }
};

const loadImage = (src: string) => html`<img src="${src}" onload="this.parentElement.classList.remove('spinner');">`;;

const AdminPruefen = async (url: string, callback: Function): Promise<TemplateResult> => {
  try {
    const Antwort = await fetch(url, { method: "HEAD" });

    if (Antwort.ok) {
      try {
        return await callback();
      } catch (error) {
        return html``;
      }
    } else {
      return html``;
    }
  } catch (error) {
    return html``;
  }
};

const holenAsync = async (url: string) =>
  await (await fetch(url)).json();

export {
  Foto,
  isApplicationPath,
  fertig,
  ist,
  sind,
  Elternteil,
  loadImage,
  AdminPruefen,
  holenAsync
};