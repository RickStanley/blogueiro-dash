import { render, html } from "lit-html";
import MediumEditor from "medium-editor";
import FontPicker from "font-picker";
import { browserRouter } from "prouter";
import { GalerieBauen } from "./Galerie/templates";
import { Foto, isApplicationPath, fertig, ist } from "./gemeinsam";
import { InhaltBauen } from "./Viewer/templates";

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
		Viewer = ist('.Viewer');
	const editor = new MediumEditor('.Inhalt', {
		placeholder: {
			text: 'Digite um texto.'
		},
		anchor: {
			placeholderText: 'Coloque um link aqui'
		},
		toolbar: {
			buttons: ['bold', 'italic', 'underline', 'anchor', 'h2', 'h3']
		}
	});
	const fontPicker = new FontPicker(
		'[API_KEY]', // Google API key
		"Open Sans", // Default font
		{
			limit: 30
		},
	);
	router
		.use('/', (req, resp) => {
			resp.end();
		})
		.use('/foto/:id(\\d+)', (req, resp) => {
			render(InhaltBauen(Bilden[req.params.id], true), Viewer);
			resp.end();
		});

	router.listen();

	render(GalerieBauen(Bilden), ist('.Galerie__Bilden'));

	document.addEventListener('Viewer__schließen', () => {
		router.push('/');
		render(html``, Viewer);
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
});