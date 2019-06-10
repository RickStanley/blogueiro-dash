// import { render, html } from "lit-html";
import MediumEditor from "medium-editor";
import FontPicker from "font-picker";

function fertig(f) {
	/in/.test(document.readyState) ? setTimeout(fertig, 5, f) : f();
}

fertig(() => {
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
		'AIzaSyAh12VudYrLvBIGF_rNN0q1jGyaWTrTLOw', // Google API key
		"Open Sans", // Default font
		{ limit: 30 }, // Additional options
	  );
});