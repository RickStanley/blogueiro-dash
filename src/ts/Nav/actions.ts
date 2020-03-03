const neueVorlage = function (e: Event) {
    e.preventDefault();

    document.dispatchEvent(new CustomEvent("neueVorlage"));
};

const AllgemeineEinstellungenOffnen = function(e: Event) {
    e.preventDefault();

    document.dispatchEvent(new CustomEvent("AllgemeineEinstellungenOffnen"));
};

export {
    neueVorlage,
    AllgemeineEinstellungenOffnen,
};