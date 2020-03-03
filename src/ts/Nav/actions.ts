import { render } from "lit-html";
import { ist } from "../gemeinsam";

let AllgemeineEinstellungen: typeof import("d:/DEV/blogueiro-dash/src/ts/AllgemeineEinstellungen/templates");

const neueVorlage = async function (this: Element, e: Event) {
    e.preventDefault();
};

const AllgemeineEinstellungenOffnen = async function (this: Element, e: Event) {
    e.preventDefault();
    if (!AllgemeineEinstellungen) {
        this.classList.add("spinner");
        try {
            AllgemeineEinstellungen = await import("../AllgemeineEinstellungen/templates");
        } catch (error) {
        } finally {
            this.classList.remove("spinner");
        }
        const Befestigungspunkt = document.createElement("div");
        Befestigungspunkt.classList.add(AllgemeineEinstellungen.Befestigungspunkt);
        document.body.appendChild(Befestigungspunkt.cloneNode());
    }
    render(AllgemeineEinstellungen.Einstellungen(), ist(`.${AllgemeineEinstellungen.Befestigungspunkt}`));
    // document.dispatchEvent(new CustomEvent("neueVorlage"));
};

export {
    neueVorlage,
    AllgemeineEinstellungenOffnen,
};