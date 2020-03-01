import { render, html } from "lit-html";
import { browserRouter } from "prouter";
import { Foto, isApplicationPath, fertig, ist } from "./gemeinsam";
import { InhaltBauen } from "./Viewer/templates";
import { DashBauen } from "./Dash/templates";

interface BeobachtenDetails {
  wen: string;
  was: Function;
}

const Bilden: Foto[] = [
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

fertig(() => {
  const router = browserRouter(),
    Viewer = ist('.Viewer'),
    Wurzel = ist('#Wurzel');

  //#region Router
  router
    .use('/', (req, resp) => {
      resp.end();
    })
    .use('/foto/:id(\\d+)', (req, resp) => {
      render(InhaltBauen(Bilden[req.params.id], true), Viewer);
      resp.end();
    });

  router.listen();
  //#endregion Router

  // Erster Scrhitt
  render(DashBauen(), Wurzel);

  //#region Events
  document.addEventListener('Viewer__schließen', () => {
    router.push('/');
    render(html``, Viewer);
  });

  document.addEventListener('Beobachten', (event: CustomEvent) => {
    const { wen, was }: BeobachtenDetails = event.detail;

    const callback = (mutationList: MutationRecord[], observer: MutationObserver) => {
      const record = mutationList.find(record => record.type === 'childList');
      if (record && (record.addedNodes.length > 0)) {
        was();
        observer.disconnect();
      }
    };

    const O_O = new MutationObserver(callback);

    const config: MutationObserverInit = {
      childList: true,
      subtree: false,
      attributes: false,
      characterData: false
    };

    const Elemente = ist(wen);

    O_O.observe(Elemente, config);
  });

  document.addEventListener('click', (evt) => {
    const target = evt.target as Element;
    let link: Element;

    if (target.nodeName === 'A') {
      link = target;
    } else {
      link = target.closest('a');
      if (!link) return;
    }

    const url = link.getAttribute('href');

    if (!isApplicationPath(url)) return;

    evt.preventDefault();

    router.push(url);
  });
  //#endregion Events

});