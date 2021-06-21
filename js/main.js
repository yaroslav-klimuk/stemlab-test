const requestURL = 'https://api.tachyon-analytics.com/predict/';
const imgWrapper = document.getElementById('img-wrapper');
function sendRequest(method, url, body) {
	return fetch(url, { method, body }).then((response) => {
		if (response.ok) {
			return response.json().then((text) => {
				imgWrapper.innerHTML = `<img src="https://api.tachyon-analytics.com/predict/${text.url}" alt="graph" id="imgDiv"></img>`;
			});
		}
		return response.text().then((error) => {
			const err = new Error();
			err.data = error;
			throw err;
		});
	});
}

const form = document.getElementById('form');
form.addEventListener('submit', (e) => {
	e.preventDefault();
	const formData = new FormData(form);
	sendRequest('POST', requestURL, formData)
		.then((data) => console.log(data))
		.catch((err) => console.log(err));
});
