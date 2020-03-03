/**
 * Referência fraca do preview com seu formulário.
 */
const FormulareMap: WeakMap<Element, Element> = new WeakMap();

/**
 * Mostra o próximo formulário do clique.
 */
const naechstesForm = function (this: HTMLDivElement, e: Event) {
  let Formular = FormulareMap.get(this);
  const Wichtigstenskinder = Array.from(this.parentElement.children);
  const Formulare = Array.from(document.querySelectorAll('.Formen form'));

  if (!Formular) {
    const index = Wichtigstenskinder.indexOf(this);
    FormulareMap.set(this, Formulare[index]);
    Formular = FormulareMap.get(this);
  }

  this.classList.add('Wichtigsten__Vorschau--aktiv');

  Formulare.forEach((Form, index) => {
    (Form as HTMLFormElement).hidden = Form !== Formular;
    if (Form !== Formular)
      Wichtigstenskinder[index].classList.remove('Wichtigsten__Vorschau--aktiv');
  });

};

export {
    naechstesForm,
};