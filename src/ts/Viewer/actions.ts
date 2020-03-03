const handler = function (this: HTMLElement, e: Event) {
  const target = e.target as HTMLElement;
  if (this === e.target || !this.contains(target) || target.closest('.Viewer__schließen')) {
    document.dispatchEvent(new CustomEvent('Viewer__schließen'));
    return;
  }
};

export {
  handler,
};