import { html } from "lit-html";

function EinstellungenBauen() {
    return html`
        <section class="Einstellungen Flexible">
            <nav class="Einstellungen__Nav Flexible">
                <button onclick="this.parentElement.parentElement.classList.remove('thema-einstellungen');" class="Umschalten__Fenstern Flexible Flexible--a-center" type="button">
                    Telas
                </button>
                <button onclick="this.parentElement.parentElement.classList.add('thema-einstellungen');" class="Umschalten__Fenstern Flexible Flexible--a-center" type="button">
                    Tema
                </button>
            </nav>
            <div class="Fenstern_Einstellungen">
                <div class="Wichtigsten Flexible Flexible--j-center">
                    <div class="Wichtigsten__Home">
                        <div class="teste" style="height: 50%;background-size: cover;background-position: center;"></div>
                    </div>
                    <div class="Wichtigsten__Versand"></div>
                    <div class="Wichtigsten__Ende"></div>
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
                        <!-- <textarea name="boas-vindas"></textarea> -->
                        <div class="Inhalt" contenteditable="true">
                            Bem-vindo(a) ao Blogueiros Fermen.to.
                            Seu conteúdo é muito importante pra gente: tire fotos, faça vídeos, registre momentos e seja um influenciador nas nossas redes.
                        </div>
                        <input type="text" name="carregar" value="Carregar mídia">
                        <input type="text" name="como-funcion" value="como funciona?">
                    </form>
                    <form hidden>
                        <input type="text" name="agradecido" value="Muito obrigado!">
                        <div class="Inhalt" contenteditable="true">
                            A imagem foi enviada com sucesso!
                        </div>
                    </form>
                </div>
            </div>
            <div class="Theme_Einstellungen">
                <h2 class="Titel--sekundär">Configurações do tema</h2>
                <form>
                    <label for="nome">Título</label>
                    <input type="text" name="nome" id="nome" value="Blogueiros Namorados">
                    <label for="cor-tema">Cor tema</label>
                    <input type="color" name="cor-tem" id="cor-tema">
                    <div class="apply-font">Corolho</div>
                </form>
            </div>
        </section>`;
}

export {
    EinstellungenBauen,
};