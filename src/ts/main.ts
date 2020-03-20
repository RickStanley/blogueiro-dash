import { render, html, nothing } from "lit-html";
import { browserRouter } from "prouter";
import { Foto, isApplicationPath, fertig, ist } from "./gemeinsam";
import { ViewerinhaltBauen } from "./Viewer/templates";
import { DashBauen } from "./Dash/templates";
import { NavBauen } from "./Nav/templates";

interface BeobachtenDetails {
  wen: string;
  was: Function;
}

fertig(() => {
  const router = browserRouter(),
    Viewer = ist('.Viewer'),
    Wurzel = ist('#Wurzel'),
    Nav = ist(".Nav");

  //#region Router
  router
    .use('/', (req, resp) => {
      if (!Wurzel.children.length)
        render(DashBauen(), Wurzel);
      if (!Nav.children.length)
        render(NavBauen(), Nav);
      resp.end();
    })
    .use('/foto/:id(\\d+)', (req, resp) => {
      // @todo Habilitar pra fazer update de navegação
      if (!Viewer.children.length)
        render(ViewerinhaltBauen(req.params.id), Viewer);
      resp.end();
    });

  router.listen();
  //#endregion Router

  //#region Events
  document.addEventListener("Viewer_offnen", (event: CustomEvent) => {
    const Foto: Foto = event.detail;
    render(ViewerinhaltBauen(Foto), Viewer);
    router.push(`/foto/${Foto.ID}`);
  });

  document.addEventListener('Viewer__schließen', () => {
    router.push('/');
    render(nothing, Viewer);
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