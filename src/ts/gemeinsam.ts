// Interfaces
interface Foto {
    readonly ID: number;
    readonly Miniaturansicht: string;
    readonly URL: string;
    readonly Felder: { [s: string]: string };
    readonly IstLiebling: boolean;
}

// Funktionen
function isNavigationPath(path: string) {
    return !!path && !path.startsWith('javascript:void');
}

function isExternalPath(path: string) {
    return /^https?:\/\//.test(path);
}

function isApplicationPath(path: string) {
    return isNavigationPath(path) && !isExternalPath(path);
}

function fertig(f: Function) {
    /in/.test(document.readyState) ? setTimeout(fertig, 5, f) : f();
}

function ist(Kriterien: string, Kontext?: Element) {
    return (Kontext || document).querySelector(Kriterien);
}

function sind(Kriterien: string, Kontext?: Element) {
    return (Kontext || document).querySelectorAll(Kriterien);
}

function Elternteil(node: Element, wo: string) {
    let Aktuell = node;
    while (Aktuell.parentNode) {
        if (wo === Aktuell.id || Aktuell.classList.contains(wo)) {
            return Aktuell;
        }
        Aktuell = <Element>Aktuell.parentNode;
    }
}

export {
    Foto,
    isApplicationPath,
    fertig,
    ist,
    sind,
    Elternteil
};