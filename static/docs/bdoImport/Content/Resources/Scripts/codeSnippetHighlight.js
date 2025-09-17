// Function to decode HTML entities
function decodeHTMLEntities(text) {
	const textarea = document.createElement('textarea');
	textarea.innerHTML = text;
	return textarea.value;
}

// Function to highlight text inside <code> tags
function highlightTextInCodeTags() {
	// Select all <code> elements on the page
	const codeElements = document.querySelectorAll('code');

	codeElements.forEach(codeElement => {
		// Decode the innerHTML to handle escaped characters
		const decodedText = decodeHTMLEntities(codeElement.innerHTML);

	// Regular expressions for !!, $$, and ??
	const regexes = [
		{ regex: /!!(.*?)!!/g, style: 'color: #E02D45 !important; font-weight: bold !important;' },  // Red bold
		{ regex: /\$\$(.*?)\$\$/g, style: 'color: #17438D !important; font-weight: bold !important;' },  // Blue bold
		{ regex: /\?\?(.*?)\?\?/g, style: 'color: #046739 !important; font-weight: bold !important;' }  // Green bold
		];

	// Apply all regex replacements
	let updatedText = decodedText;
	regexes.forEach(({ regex, style }) => {
updatedText = updatedText.replace(regex, (match, p1) => {
return `<span style = "${style}" >${p1}</span>`;
	});
	});

		// Update the innerHTML of the <code> tag with the modified and encoded text
codeElement.innerHTML = updatedText;
});
	}

// Call the function to highlight the text
highlightTextInCodeTags();